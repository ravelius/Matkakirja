# Pulu ESP: raportti (pilviajo 9.10.2026)

- Vastauksia yhteensä 879: **vaihe 1: 280** (56 kohtaa × 5, 12 erää), **vaihe 2: 599** (linkkitaso, 8 erää).
- Kesto: noin 77 min seinäkelloa (vaihe 0 → paketti).
- Agentit: 21 Sonnet-agenttia (effort low, enintään 2 rinnakkain; erä 7 ajettiin kahdesti), tokenit yhteensä noin 3,11 milj. (vaihe 1 noin 1,33 milj., vaihe 2 noin 1,77 milj.).
- Agenttien ohjeessa olivat "Neljä järjestelmällistä virhettä" sekä ohjeet 5 (ei lähteettömiä matkaopasväitteitä) ja 6 (tarkka päivämäärä vain, jos lähteet ovat yhtä mieltä).

## Tarkistus
- `tarkista-era.mjs` vaihe 1 ensimmäisellä ajolla: 127 virhettä (121 johtui keskeneräisistä erästä: erä 7 jätti pois valmiit kysymykset ja kohdat 36–56 puuttuivat vielä; 10 käsitemääräkorjausta, kaikki yhden linkin vastauksia). Erä 7 ajettiin uudelleen kokonaan; yhden linkin vastauksiin lisättiin toinen linkki käsin. Lopputulos: 0 virhettä.
- `tarkista-era.mjs` vaihe 2: 7 virhettä (1 viittaus ohjeisiin, 6 yhden linkin vastausta), korjattu käsin → 0 virhettä.
- `tarkista-valmis.mjs`: 7 virhettä korjattu (rivinvaihto ilman tyhjää riviä 6.4, 2 × metalause "ohjeiden mukaan", 1 × "aineiston mukaan", 2 × huutomerkki lainauksessa, Euroopan ulkopuolinen linkki [[Mekkaa]] → tavallinen teksti).
- **Jäljellä 1 virhe (omistajan sallima yksittäinen käsitemäärävirhe):** V1 #47 "Mikä on mihrab?" (cordoban-moskeijakatedraali) sisältää vain 1 linkin, koska toinen linkki oli Euroopan ulkopuolinen (Mekka). Kymmenen varoitusta (Mekka, Marokko, Algeria, Intia, Brasilia mainintoja tekstissä) ovat sallittuja tavallisessa tekstissä.
- Faktapistokoe: ei tehty täysimittaisena (30 vastausta); tarkistettu vain ylätason väitteet (suurimmat/ensimmäiset, mm. Ebro syötteen mukaan oikein). Agentit ilmoittivat muistinvaraisiksi ja varoiksi sanotuiksi mm.: Pionono, Numancia/Oran, López Domínguezin pääministeriys 1906, Tabernas, Cartagenan teatteri, El Castillon ajoitus, Lascaux/Chauvet-vuodet, paavin bulla 1493 (vaihe 2 erät 6–7). Suositus: Päätoimittaja tarkistaa nämä pistokokeella ennen vientiä.
- Vaiheen 1 erä 1 raportoi itse oma-aloitteisista lisäyksistä (esim. 1.1 "poikansa aikana", 2.1 "1800-luvulla", 3.1 Gibraltarin asema, 4.2 kielioppivirhe, 5.2 epäselvä lause); niitä ei ole vielä korjattu, koska ohjeen tarkistukset eivät niitä havaitse.

## Paketti
- `pulu-esigenerointi/ESP/ESP.json` (56 kohtaa, 280 kysymysvastausta, 599 linkkivastausta), `pulu-esigenerointi/maat.json` päivitetty (ESP-rivi).
