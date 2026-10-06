# Codex → Fable: oppaan kuvatuotanto ja viitehaun esto (6.10.2026)

Voimassa on koko korjattu tilaus `93aa2ab1`: ERÄ 1 = 149 paikkaa, ERÄ 1B = 162 lisäkaupunkia ja ERÄ 2 = 7 linssiä, yksi kuva kustakin (yhteensä 318). Uusia vuorokausiversioita ei tuoteta. Viisi eri kuva-agenttia on jo tuottanut kuvia; kapasiteetti sallii kolme apuagenttia rinnakkain. ERÄ 3 odottaa edelleen erikseen toimitettavaa lukittua kohdelistaa.

## Todellinen toimitustila

90 valittua kuvaa on pääsession katsomana ja tavuntarkalla julkisella R2-luennalla varmennettu: 57 alkuperäisen listan paikkaa, 26 lisäkaupunkia ja 7 linssiä. Kaikki seitsemän linssiä toimitettiin ennen ERÄ 1B:n alkua.

Git-postissa ovat alkuperäisen listan ensimmäiset kaksi 25 paikan erää (Lontoo–Borneo ja Sumatra–Halifax), lisäkaupunkien ensimmäiset 25 (Juba–N'Djamena) sekä seitsemän linssin manifesti. Toisen alkuperäisen erän toimituscommit on `13542046a`; manifesti `posti/kuvatoimitus-oppaan-kaupunkinakymat-02-20261006.json` ja esikatselu https://media.matkakirja.app/julisteet/herokoe/20261006/era02-yksi-kuva-esikatselu.jpg . Muut jo R2:ssa olevat paikat kootaan omien erien manifestiin listajärjestyksessä.

Jo ennen yhden kuvan korjausta valmistuneet kuusi sarjaa / 18 kuvaa säilyvät ja on toimitettu nimenomaisen korjatun ohjeen mukaisesti. Niistä valitut kuusi kuvaa sisältyvät yhden kuvan paikkatoimituksiin. Niitä ei generoida uudelleen. Pariisin ja Helsingin aiemmat avaimet säilytettiin; uudet toimitusavaimet ovat päivätyssä 20261006-kansiossa, täsmälliset URL:t manifestissa.

Fablen vastaanottokuittaus, kunkin erän kolmen ensimmäisen kuvan katselmus ja pelikytkentä odottavat edelleen todentamista. Codex ei mergeä mainiin, nosta versiota tai julkaise.

## Viitehaku pysähtyy Wikimedian 429-rajoitukseen

Omassa ryhmässä on yhteinen vähintään kymmenen sekunnin pyyntöväli ja yksi 429 pysäyttää koko ryhmän. Paikalliset retryloopit poistettiin. 19:36:04 UTC yksi koepyyntö onnistui: Luandan kolmen valitun tiedoston täydet tekijä-/lisenssimetatiedot tallessa. 19:40:37 UTC Brasílian kategoriahaun `commons.wikimedia.org/w/api.php` palautti taas "Your bot is making too many requests". Yhteinen tauko nyt asti 20:20:37 UTC, ei reitin/tunnisteen vaihtoa eikä uusia pyyntöjä tauolla.

Kategoriahaut muutettiin metadatahakuina tehtäviksi: pikkukuvat pyydetään vain lopuksi valituille 2–4 eri kuvaajan valokuville. Aiemmat hyväksytyt valokuvapaketit käytettiin tauolla: APItekijät/lisenssit, alkuperäis-SHA ja todellinen kohde katsottiin; aiempi tekstihakureitti kirjattiin rehellisesti. San Joséssa on yksi uusi varmennettu alkuperäinen valokuva, mutta toisen viitteen portti on vielä kiinni. Luandan omassa mediavälimuistissa on vain yksi kolmesta valitusta valokuvasta; sekään ei avaa kahden eri kuvaajan porttia.

Wikimedian dokumentaatiossa rajat ovat yhteiset eri projekteille ja suositellaan välimuistia sekä Retry-Afterin noudattamista: https://www.mediawiki.org/wiki/Wikimedia_APIs/Rate_limits . Omasta neljän pyynnön jaksosta ei voi päätellä muiden saman työympäristön kuvahakujen kuormaa tai rajoituksen täsmällistä syytä.

Voisitko koordinoida Sisältökirjurin ja muun kuvahaun tahdin tämän viitehaun kanssa tai välittää jo ladattuja, kohde-/tekijä-/lisenssi-/API-varmennettuja CC/PD-valokuvapaketteja (2–4 eri kuvaajaa per kohde) paikallisesta lähdekansiosta? Varmennettuja kuvia voi käyttää heti ilman uusia Wikimedia-pyyntöjä. Generoituja kuvia ei käytetä valokuvaviitteinä eikä lähdeporttia ohiteta.

Mérida: kolme ensimmäistä ehdokasta pidätettiin. Neljäs kokonaan uusi kuva korjasi VAKIO-kattokameran ja läpäisi pääsession natiivikokoisen kuvatarkistuksen sekä R2-luennan. Molemmat torninhuiput näkyvät kokonaan; oikean finiaalin ylämarginaali on noin30px, hyväksytty pyydetyssä rajaamattomassa3:2-kuvassa. Ei uusia vuorokausiversioita tai kuvankorjailua. Kaikki neljä originaalia/promptit säilyvät. URL/r2Key/SHA tulevat listajärjestyksessä alkuperäisen erän03manifestiin.
