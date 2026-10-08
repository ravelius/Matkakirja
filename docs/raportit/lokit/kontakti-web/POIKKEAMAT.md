# Poikkeamat — kontaktiarkin web-kaappaukset

- **kontakti-topografia**: onnistui suunnitellusti: linssi ja kamera ohjelmallisesti (lat 45, lng 10, 8000 km).
- **kontakti-vesistot**: onnistui suunnitellusti: linssi ja kamera ohjelmallisesti (lat 0, lng 20, 9000 km).
- **kontakti-satelliitti**: onnistui suunnitellusti: kamera asetettiin Pariisiin ennen avausta (window.matkakirja.ui.pallolauta.pallo.pointOfView), linssin oma avausajo (satelliitti-avaruus.js) sai 15 s asettua ennen kaappausta.
- **kontakti-keksinnot-1873**: onnistui suunnitellusti: aikajana käynnistettiin .aikajana-avaus-nappi-napautuksella, odotettiin ohjelmallisesti window.matkakirja.ui.aikajana.tila.i === 11 (KEKSINNOT[11] = vuosi 1873, paalu: true), joka pysäytti kellon itsestään merkkipaalun välinäytökseen (avaaValinaytos → pysayta()). Palvelin tarjosi js/aikajana.js:n nopeutetuilla ajastimilla (sama kaava kuin savuke-aikajana.mjs).
- **kontakti-keksinnot-loppu**: onnistui suunnitellusti: window.matkakirja.ui.aikajana.jatka() jatkoi merkkipaalusta, kello ajoi loput pysäkit sped-up-ajastimilla luonnollisesti loppuun asti (moottori kutsui itse lopeta()-metodia, joka lisää luokan "lopussa" ja vetää kameran koko kaaren näkymään) — kaikki 26 valoa palavat.
- **kontakti-ihmisen-matka-levantti**: onnistui suunnitellusti: esitys käynnistettiin .aikajana-avaus-nappi-napautuksella (esitys.aloita()), siirryttiin ohjelmallisesti jaksoon "levantti" kutsulla window.matkakirja.ui.aikajana.esitys.valitse('levantti') (sama API jota aikaselain-komponentti käyttää), odotettiin 6 s reaaliaikaa jakson sisällä ja pysäytettiin esitys.tauko()-kutsulla ("tauolla").
- **kontakti-vertailu-fin**: onnistui suunnitellusti: linssin avaus asetti Suomen valmiiksi automaattisesti (tahdistaVertailu-oletus), varmistettu myös eksplisiittisesti js/vertailu.js:n valitseVertailuMaa-logiikkaa vastaavalla ui.vertailuValinnat = ['FIN'] + piirraVertailuMaat(ui)-kutsulla.
- **kontakti-vertailu**: onnistui suunnitellusti: neljä maata (FIN, SWE, NOR, DNK) asetettu suoraan js/vertailu.js:n julkisen tilan (ui.vertailuValinnat) ja piirraVertailuMaat/rakennaVertailuPalkki-funktioiden kautta — sama tila, jonka valitseVertailuMaa(ui, iso) rakentaa napautuksesta.
- **kontakti-maatiedot**: onnistui suunnitellusti: maatiedot-tila avattiin linssillä (tahdistaMaatiedot automaattinen), Japani valittiin suoraan js/vertailu.js:n tilan (ui.maatiedotValittu) ja piirraMaatiedotMaat(ui)-kutsun kautta.

Sivuvirheitä (pageerror) koko ajon aikana: 0
