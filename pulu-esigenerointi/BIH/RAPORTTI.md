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
