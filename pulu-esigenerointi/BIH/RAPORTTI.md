# Pulu BIH: raportti (pilviajo, haara pulu-bih-pilvi)

- **Vastaukset:** vaihe 1 = 160 (32 kohtaa × 5), vaihe 2 = 341 linkkivastausta; yhteensä 501.
- **Kesto:** noin 40 min (aloitus–paketti).
- **Agenttien tokenit yhteensä:** noin 1,81 M (vaihe 1: 0,64 M; V1-korjaukset: 0,16 M; vaihe 2: 1,01 M). Kaikki Sonnet, effort low, enintään 2 rinnakkain.
- **Data:** `lataa-data.sh` käytti v625-versiota, jota ei enää ole ämpärissä (404); ajettiin versiolla v649 (väliaikainen kopio skriptistä, repon skriptiä ei muutettu). Julkaisijan kannattaa päivittää skriptin oletusversio.
- **Tarkistus:** `tarkista-era.mjs`: vaihe 1 = 0 virhettä, vaihe 2 = 0 virhettä.
  - Ensimmäisellä ajolla vaiheessa 1 oli 43 virhettä (42 × liian vähän [[käsitteitä]] ja 1 × yli 70 merkin uusi kysymys 26.5); kaikki korjattiin kahdella korjausagentilla.
  - Käsin korjattu: metalause "tietoruudussakin" (69), Euroopan ulkopuolisiksi tulkitut linkit (Perućica, Mali Ston) purettu tavalliseksi tekstiksi.
- **`tarkista-valmis.mjs`:** 1 virhe jäi: V1 #32 (sutjeska) linkki [[Perućican]] "Euroopan ulkopuolinen" **väärä hälytys** (nimessä merkkijono "Peru"; Perućica on Bosniassa). Linkki jätettiin, jotta vastauksessa on 2 käsitettä ja lisää-vastaus löytyy. Varoitukset (Peru/Mali/Iran/Meksiko-merkkijonot) luettu: kaikki Euroopan kohteita tai sivumainintoja.
- **Faktat:** muistinvaraisten faktojen 30 vastauksen pistokoetta ei ole tehty tässä ajossa; se kuuluu erikseen tehtäväksi.
- **Paketti:** `pulu-esigenerointi/BIH/BIH.json` (32 kohtaa, 160 + 341 vastausta). `pulu-esigenerointi/maat.json` päivitetty (vain BIH-rivi).

## Pistokoekorjaukset 10.10.

Sisältökirjurin pistokokeen korjaukset (vain aiheen mainitsevat vastaukset, vaihe 1 ja 2):

- **Ostrožac** (`vastaukset-1-7`, `vastaukset-2-5`; 9 vastausta): Berks on Bihaćin piirin johtaja (ei pormestari); vaimo Isabella oli syntyjään Adamović Čepinska (ei habsburgilainen); "syntymäpäivälahja" poistettu ja vaihdettu maininnaksi, että rakennus rahoitettiin vaimon myötäjäisillä; vuosiväli "noin 1900–1902" (ennen 1900–1906). Jatkokysymys "Mitä Habsburgien valtakunta oli?" vaihdettu muotoon "Mikä on myötäjäinen?".
- **Bobovac/Jajce** (`vastaukset-1-1`, `-1-2`, `-1-4`, `-2-1`, `-2-2`, `-2-3`, `-2-4`; 17 vastausta): Stjepan Tomašević kruunattiin Jajcessa 1461 ja pakeni sinne Bobovacista; Bobovac "antautui toukokuussa 1463" (kavallus- ja valloitus-/hävitysversiot sekä tarkka päivä 21.5. poistettu); jatkokysymys "Miksi Bobovac kavallettiin…" → "Miten Bobovac antautui osmaneille?".
- **Prokoško** (`vastaukset-1-6`, `vastaukset-2-4`; 4 vastausta): korkeus noin 1 640–1 660 m ("1 670" poistettu); Nadkrstac (noin 2 110 m) kohoaa järven juurella eikä "ympäröi" sitä.
- **Tarkistus:** `tarkista-era.mjs` vaihe 1 = 0 virhettä, vaihe 2 = 0 virhettä. `tarkista-valmis.mjs`: yksi tunnettu väärä hälytys (V1 #32, [[Perućican]] sisältää merkkijonon "Peru"). Paketti `BIH.json` koottu uudelleen.
- **Huomio Päätoimittajalle:** vaiheen 1 kysymys 32.1 ("Kenelle Bihaćin **pormestari** Lothar von Berks…") tulee pelin omasta syötteestä (`syote.json`) ja jätettiin ennalleen; vastaus korjaa asian. Lisäksi väite, että Tomašević "teloitettiin Jajcessa" (useissa Bosnia-vastauksissa), on tässä korjauksessa koskematta eikä kuulunut ohjeeseen; kannattaa tarkistaa.
