# Helsingin vanha rautatieasema #2327 — riippumaton kuvallinen QA

**Verdict: WARNING — pitkä takakatos on nyt dokumentoidusti näkyvissä, mutta sen täsmällistä vuoden1907 rakennetta ei hyväksytä tämän perusteella.** KK:n arvioitava malli, ei hyväksytty tai integroitu pelimalli.

Katsottu hyväksytty syöte `output/kadonneet-ryhma4-20261115/helsingin-vanha-rautatieasema/retry-2316/helsingin-vanha-rautatieasema-model-v2.png`, luettu sen QA ja source-preparation kokonaan sekä katsottu kaikki viisi `qa-browser/01-plusX.png`, `02-plusZ.png`, `03-minusX.png`, `04-minusZ.png`, `05-upper.png`.

- **Keskiosan hierarkia: PASS näkyvälle syötevastaavuudelle.** Etukuvassa keskiosa on korkein, siinä kolme varsinaista aukkotasoa ja niiden yläpuolella pyöreä päätyikkuna. Matalammat välisiivet ja niitä korkeammat päätypaviljongit erottuvat. V1:n kaksikerroksiseksi madaltumista ei näy samalla tavalla. Tarkat kerroskorkeudet ja julkisivun ikkunamäärä eivät ole mittavarmennettuja.
- **Pitkä ratapihakatoksen näkyvyys: PASS dokumentointivaatimukselle.** Erityisesti **03-minusX.png näyttää takasivun koko pitkän katoksen päästä päähän**, keskiosan ja molempien siipien/paviljonkien edessä. Se ei jää vain syötekuvan lyhyeksi vasemman päädyn pilkahdukseksi. Molemmat päätykuvat tukevat katoksen todellista sijoittumista samalle pitkälle takasivulle; etujulkisivulla ei ole vastaavaa toista katosta.
- **Katoksen historiallinen muoto: UNCERTAIN.** Tuettu, avoin katos on näkyvää kolmiulotteista rakennetta, mutta tukien määrä/jako, ulkonema, kattopinnan porrastukset sekä liittymät keskiosaan ja päätypaviljonkeihin eivät varmennu yhdestä etukulmasyötteestä. Takajulkisivun hyvin säännöllinen, osin etujulkisivua toistava aukotus on myös generaattorin tulkintaa. Takaosan näyttäminen ratkaisee näkyvyyskysymyksen, ei lähdetarkkuutta.
- **Kattopohja ja pinta: WARNING.** Yläkuva paljastaa koko moniosaisen kattosovituksen ja savupiippujen järjestelyn. Alkuperäisessä lähdepaketissa ei ollut ilmakuvaa/kattopohjaa, joten näitä piilokattoja ei hyväksytä historiallisesti oikeiksi. Pienet kulmapilarien kärjet ja listat ovat pehmeitä; neutraali vaalea pinta ja harmaa katto säilyvät ilman värihistoriallista väitettä.
- **Rajaus:** ei junia, lankoja/tolppia, kaupunkiympäristöä tai uutta Saarisen kellotornia. Päärunko ja katos muodostavat yhtenäisen kokonaisuuden; ei kuvissa näkyvää suurta leijuvaa rakennusosaa. Ovien/ikkunoiden läpäisevyyttä tai teknistä verkkolaatua ei testattu.

Neljä paikallista akselisuuntaa (+X, +Z, −X, −Z) ja yläviisto tarkastettu; niitä ei nimetä vahvistetuiksi maantieteellisiksi ilmansuunniksi. Ei fyysisten mittojen tai pelikameran hyväksyntää.

**KK-rivi:** Korkeimman keskiosan kolme aukkotasoa säilyvät ja koko pitkä ratapihakatoksen takasivu näkyy nyt kuvassa03; katoksen tarkka1907 kattomuoto/tukijako, takajulkisivu ja piilokattoliitokset jäävät lähteistä varmistamattomiksi.

Vain tämä QA kirjoitettu. Ei selainta, tuotantoa, mallimuutoksia, renderöintiä, generointia, postia tai yhteisen tilan muokkausta.
