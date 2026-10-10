# Pulu SVN (Slovenia): raportti

- Vastauksia: vaihe 1 = 160 (32 kohtaa x 5), vaihe 2 = 393 linkkivastausta; yhteensä 553.
- Kesto: noin 45 min (vaihe 0 alusta paketin kokoamiseen).
- Agenttien tokenit yhteensä: noin 2 012 500 (vaihe 1: 699 176 + korjaus 62 388; vaihe 2: 1 194 441 + korjaus 56 501). Kaikki Sonnet, effort low, enintään 2 rinnakkain.
- Datan lataus: sisältöpaketti v625 oli poistunut (404), joten data ladattiin versiosta v647 (lataa-data.sh:n kopio, jossa v625 -> v647; repon skriptiä ei muutettu). Paketin `sisalto`-kenttä kertoo version.
- Tarkistus: tarkista-era vaihe 1: 14 käsitemäärävirhettä (0–1 käsitettä) + 1 huutomerkkivirhe tarkista-valmis.mjs:ssä, kaikki korjattu (0 jäljellä). Vaihe 2: 10 käsitemäärävirhettä, kaikki korjattu (0 jäljellä). tarkista-valmis: virheitä 0, varoituksia 2 (Egypti, Pohorjen lasitehtaiden vientialue; maininta tulee pelin omasta aineistosta, jätetty; omistaja voi harkita pistokokeessa).
- Faktojen pistokoetta (30 vastausta) ei ole tehty tässä ajossa; sen tekee Päätoimittaja.
- Paketti: pulu-esigenerointi/SVN/SVN.json (pulu-esigenerointi/maat.json päivitetty, vain SVN-rivi).

## Pistokoekorjaukset 10.10.

Päätoimittajan ohjeen mukaan korjattu kaikki vastaukset (vaihe 1 ja 2), joissa aihe mainitaan; muita ei muutettu.
- Koper (vastaukset-1-6 rivit 47 ja 63; vastaukset-2-5 rivit 32, 56, 62, 86): Venetsian alaisuuteen "1270-luvun lopulla (1278–1279)" yhden vuoden sijaan; "Istrian pääkaupunki" -> "Venetsian Istrian hallinnon keskus, joka kasvoi vähitellen"; Itävalta sai kaupungin Campo Formion rauhassa 1797, ja syyskuussa 1813 itävaltalaiset vain palasivat (ei "siirtyi Itävallalle 1813").
- Žiče (vastaukset-1-6 rivit 3 ja 33; vastaukset-2-4 rivit 428 ja 434): ylipriorin istuin 1391–1410 koski vain Rooman paavia tukeneita luostareita; Avignonin puolella oli oma ylipriori Grande Chartreusessa; ordun yhtenäisyys palautui 1410. "Paavi Urbanus VI muutti Žičeen" -väitettä ei ollut vastauksissa.
- Tarkistukset korjausten jälkeen: tarkista-era vaihe 1 ja 2: virheitä 0; tarkista-valmis: virheitä 0, varoituksia 2 (Egypti, ennallaan). SVN.json koottu uudelleen.
