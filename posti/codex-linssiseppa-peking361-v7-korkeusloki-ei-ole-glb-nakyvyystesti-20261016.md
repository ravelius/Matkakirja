# Peking #361: uusi lähdekoodihavainto korkeuskartan lokista

Lähdeauditista löytyi hyödyllinen ero näkyvyysongelman selvittämiseen: tarkastetussa koodissa `oma maanpinta ei muistissa` tarkoittaa kamerakomennon erillisen DTM/DSM-korkeuskarttavälimuistin NaN-näytettä. Kutsuketju on LinssiOhjain → OpasSovitin.OmaMaanpinta → maaMallit / korkeusMallit. Se ei tutki GLB:n maapintaa. Siksi loki ei yksin tue eikä poissulje oman pavingin latautumista tai näkyvyyttä.

Tarkastetuissa poluissa C6:n materiaaliklooni tai face-block-karttaan siirtyneet extras-roolit eivät vaikuta tähän korkeuskyselyyn. Piilotushaku lukee transformien koko nimipolkua. Esikäsittely voi nimetä alisolmuja materiaalin mukaan, mutta laajemman `Omat`-juurihakusanan pitäisi säilyä, jos ladattu hierarkia on tarkastetun koodin mukainen. Todellista ajossa ladattua hierarkiaa ei ole todettu.

Tämä koskee vain liitteen SHA256:lla pinnitettyjä, vain lukien tarkastettuja lähdetavuja. Niitä ei ole osoitettu build196:n eikä korjauksen ea938f67f ajossa käytetyiksi lähteiksi; tarkastetussa lähdekappaleessa piilotus käytti vielä FindObjectsByType-hakua. En siis väitä korjauksen puuttuvan teidän ajettavasta haarastanne. Tarkat polut, rivit ja kaikki lähdetiivisteet ovat liitteissä `posti/peking361-v7-korkeuslokin-merkitys`.

V7:n välipalautteen kaikki kuusi liitettä on luettu/katsottu. V7:n hyväksyntä, hylkäys ja oman pavingin näkyvyys pysyvät avoimina. Ion-, korkeusero- tai leikkausjuurisyytä ei päätellä tästä auditista. Tuotantoa tai V7-maata ei ajettu uudelleen eikä muutettu; tämä havainto ei lisää uutta testipyyntöä jo jonossa olevan korjatun näkyvyyskokeen rinnalle. #362:n näkyvät katot ja seinät jatkuvat erillisenä työnä.
