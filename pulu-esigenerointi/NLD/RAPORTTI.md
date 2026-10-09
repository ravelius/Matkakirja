# Pulun vastaukset: NLD (pilviajo 9.10.2026)

- Vastauksia: vaihe 1 = 270 (54 kohtaa × 5), vaihe 2 = 620 (linkkitaso), yhteensä 890.
- Kesto: noin 70 min (vaihe 0 → paketti), kaksi Sonnet-agenttia (effort low) rinnakkain; 11 erää vaiheessa 1, 8 erää vaiheessa 2.
- Agenttien tokenit yhteensä: noin 3,05 miljoonaa (vaihe 1 ≈ 1,17 M, vaihe 2 ≈ 1,88 M).
- Tarkistukset: `tarkista-era.mjs vaihe1/vaihe2` ja `tarkista-valmis.mjs` lopussa: virheitä 0, varoituksia 23 (ulkomainen maininta tekstissä, esim. Itä-Intia VOC-yhteydessä; tarkoituksellisia).
- Löydetyt ja korjatut virheet:
  - Agenttien omat käsitemäärävirheet (liian vähän [[käsitettä]]) korjattu erissä; kolme jäännöstä (V1 #136, #137, #216) korjattu käsin.
  - Euroopan ulkopuoliset linkit (Itä-Intian kauppakomppania, Perunansyöjät-teoksen nimi) muutettu tavalliseksi tekstiksi vaiheissa 1 ja 2; vaihe 2 -vastauksiin 322 ja 437 lisätty korvaava linkki.
  - Pehmeä tavuviiva (vastaus 607) poistettu kaikista vastauksista.
  - Agentit jättivät pois ristiriitaiset/epävarmat faktat (esim. Schiermonnikoogin "ensimmäinen kansallispuisto", kaivausvuosi 1865/1685 kerrottu molempina).
- Faktojen pistokoetta (30 vastausta) ei tehty tässä ajossa: se jää Päätoimittajalle. Huomioitavaa: PAIKKA-rivit (Vaalserberg, Haag, Bourtange, Kröller-Müller, Maastricht, Kampen, Borger) ovat agenttien muistinvaraisia koordinaatteja; vaihe 1 -vastaukset 28.3 (Batavia/Uusi Hoorn) ja 50.1 (julkisivuvero, kirjattu varauksella) kannattaa katsoa silmin.
- Paketti: `pulu-esigenerointi/NLD/NLD.json` (54 kohtaa, 270 kysymysvastausta, 620 linkkivastausta); `pulu-esigenerointi/maat.json` päivitetty NLD-rivin osalta.
