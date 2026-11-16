# Faktatarkistus: Pulun kaupunki- ja maavastaukset (PT 9.11.2026)

Kansio F = /Users/Shared/Claude/wt/pulu-kaupungit-maat/pulu-esigenerointi/KAUMAA/fakta. Käytä VAIN Read- ja Write-työkaluja.

Tausta: Pulu (kyyhky) vastaa suomeksi pelaajan kysymyksiin Euroopan maista ja kaupungeista. Vastaukset on generoitu,
ja pistokokeessa 3/30:ssä oli väärä fakta (esim. "csikós" sanottiin paimeneksi, vaikka se on hevospaimen; Hallstattissa
"tuhansia hautoja", vaikka noin tuhat; Bulgarian "kuninkaallinen asetus" 1888, vaikka maa oli silloin ruhtinaskunta).
Tehtäväsi: tarkista JOKAINEN erän vastaus ja korjaa virheet muuttamalla vain virheellinen lause tai sen osa.

1. Lue F/era-N.txt kokonaan (osissa: offset/limit 250 riviä kerrallaan). Jokaisella kohdalla rivi "### <id>", KOHDE, KYSYMYS, VASTAUS
   (VASTAUS yhdellä rivillä, \n = rivinvaihto).
2. Etsi jokaisesta vastauksesta:
   - VÄÄRÄT FAKTAT: vuosiluvut, päivämäärät, luvut (asukkaat, korkeudet, määrät), nimet, arvonimet (kuningas/ruhtinas/keisari),
     "suurin/ensimmäinen/vanhin/ainoa", sanojen merkitykset, kuka teki mitä, missä jokin sijaitsee. Tarkista myös anakronismit
     (valtion muoto tai nimi väärältä ajalta) ja vanhentuneet tiedot (esim. lakkautettu, siirretty, nimetty uudelleen).
   - EPÄVARMAT YKSITYISKOHDAT: jos et ole varma luvusta tai väitteestä etkä voi vahvistaa sitä tiedoistasi, pehmennä ("noin",
     "lähteiden mukaan") tai poista yksityiskohta. Älä vaihda lukua toiseen arvaukseen.
   - LIIOITTELU: "kaikki", "aina", "maailman suurin" ilman perustetta.
   - SELVÄT KIELIVIRHEET: subjektiton lause, väärä sijamuoto, kömpelö keksitty yhdyssana, puuttuva sana.
   Älä korjaa makuasioita, Pulun puhetyyliä (puhekieliset avaukset ja kyyhky-loppukommentit ovat tarkoituksellisia) tai
   oikeita faktoja toisin sanoin. Jos vastaus on oikein, älä kirjoita siitä mitään.
3. SÄÄNNÖT KORJAUKSELLE:
   - VANHA on TARKKA katkelma vastauksesta merkki merkiltä (kopioi suoraan; sama kirjoitusasu, välimerkit ja [[ ]]-merkinnät),
     mahdollisimman lyhyt mutta yksiselitteinen (yleensä lause tai sen osa). Se ei saa ylittää vastauksen rajaa.
   - UUSI korvaa sen. [[käsite]]-merkintöjen joukko ei saa muuttua: jokainen VANHA:n [[merkintä]] on oltava UUDESSA täsmälleen
     samana, eikä uusia [[ ]]-merkintöjä lisätä. Jos virhe on itse linkin nimessä, kirjoita se SYY-riville ja jätä VANHA/UUSI pois:
     rivi "### <id>", rivi "VANHA: -", rivi "UUSI: -", rivi "SYY: LINKKI: <selitys>".
   - Ei rivinvaihtoja; älä lisää metalauseita ("lähteessä", "aineistossa").
   - Samaan vastaukseen voi tulla useampi korjaus: kukin omana lohkonaan samalla ### <id> -rivillä.
4. Kirjoita F/korjaukset-N.txt (N = eräsi numero) muodossa:
   ```
   ### v1-83
   VANHA: täällä ovat kaikkien pankkien pääkonttorit
   UUSI: täällä ovat monien pankkien pääkonttorit
   SYY: liioittelu
   ```
   Viimeiseksi riviksi "LOPPU: tarkistettu <määrä> vastausta, korjauksia <määrä>". Jos korjauksia on paljon, kirjoita tiedosto
   osissa (korjaukset-N.txt ja korjaukset-N-b.txt, kukin enintään 150 riviä); LOPPU-rivi viimeiseen.
5. Vastaa lopuksi yhdellä rivillä: erän numero, korjausten määrä, joista vakavia (väärä fakta).
