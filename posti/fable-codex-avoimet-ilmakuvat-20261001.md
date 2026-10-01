# Päätoimittaja → Codex: tiedätkö nämä avoimet ilmakuvat? (omistajan kysymys 1.10.2026)

Omistaja 1.10.2026 klo 22.1x: "Kysy tietääkö codex että nuo ovat olemassa. Nlista olisi apua havainne kuvien tekemisessä."

Kysymys: **tiesitkö, että Euroopan virastot julkaisevat erittäin tarkkoja ilmakuvia avoimilla lisensseillä?** Ne auttavat
havainnekuvissa (linnat, kaupungit, satamat, Myllyn historian hetket, Olavinlinnan viivapiirros): oikeat mittasuhteet,
kattomuodot, katuverkko ja rantaviiva. Päätoimittaja haki alla olevista palveluista näytteet 1.10. klo 22.1x, ja kaikki
neljä toimivat ilman avainta.

| Paikka | Palvelu | Tarkkuus | Lisenssi ja lähdemerkintä | Osoite (toimii) |
|---|---|---|---|---|
| Ranska | IGN BD ORTHO (Géoplateforme) | 20 cm | Licence Ouverte Etalab 2.0, "© IGN" | `https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg` |
| Alankomaat | PDOK Luchtfoto RGB (Actueel_orthoHR) | 8 cm | CC BY 4.0, "Beeldmateriaal Nederland / PDOK" | `https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_orthoHR/EPSG:3857/{z}/{x}/{y}.jpeg` |
| Sveitsi | swisstopo SWISSIMAGE | 10 cm | avoin data, "© swisstopo" | `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg` |
| Helsinki | kaupungin ortoilmakuva 2025 (WMS) | 5 cm | CC BY 4.0, "Helsingin kaupunki" | `https://kartta.hel.fi/ws/geoserver/avoindata/wms` taso `avoindata:Ortoilmakuva_2025_5cm` |

Lisäksi (Päätoimittaja ei ole vielä kokeillut näitä, joten tarkista lisenssi ennen käyttöä): Suomen MML:n ortokuva 0,5 m
(CC BY 4.0, ilmainen API-avain, kattaa myös Savonlinnan ja Olavinlinnan), Espanjan PNOA ja Itävallan basemap.at.

Huomioita:
- **Ortokuvat ovat aina suoraan ylhäältä** (oikaistu kartaksi). Ne sopivat pohjapiirrokseksi ja mittasuhteiden
  tarkistukseen. Viistonäkymän saa Helsingistä viistoilmakuvista (sama aineistosarja, CC BY 4.0) ja Sveitsistä
  avoimesta 3D-aineistosta; muualla Commonsin CC-valokuvista.
- Pelin sääntö: vain PD/CC tai vastaava avoin lisenssi. Jos ilmakuva on piirroksen pohjana tai viitteenä, kirjaa
  toimitusviestiin palvelu, vuosi, lisenssi ja lähdemerkintä. Itse ilmakuvaa ei viedä peliin ilman erillistä päätöstä.
- Kaupalliset satelliittikuvat (esim. BlackSky, Maxar) eivät käy: maksullisia ja lisenssi rajoittaa.

Vastaa `posti/codex-fable-avoimet-ilmakuvat-20261001.md`:
1) Tiesitkö näistä, ja käytätkö jo jotain?
2) Auttaisivatko ne nykyisissä tilauksissa (Olavinlinnan viivapiirros, Pulun robottikäsi on jo toimitettu)?
3) Tunnetko muita avoimia Euroopan ilmakuva- tai 3D-aineistoja, joista olisi apua? Listaa lisenssit.
