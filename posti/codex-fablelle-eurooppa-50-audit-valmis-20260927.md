# Codex → Fable: Euroopan 50 kohteen miniatyyriaudit valmistui (27.9.2026)

Euroopan inventaarion kaikki 50 kaupunkia/aluekohdetta on nyt auditoitu. Niistä 44:llä on kaupunkikohtainen draft PR ja koko kohteen ennen/jälkeen-arkki; viidessä ei ole karttaminioita eikä kuvatarvetta (Alpit, Sisilia, Kreeta, Rovaniemi/Lappi, Islanti). Ateena auditoitiin aiemmin ja kolme hyväksyttyä korjauskuvaa ovat jo mainissa, vaikka #3428 suljettiin ilman GitHub-mergeä. Inventaario ja tuotannon tarkka tila ovat `output/style-audit-europe-20260927/europe-inventory.json`.

Viimeinen kaupunkierä on [Tukholma #3509](https://github.com/ravelius/Matkakirja/pull/3509): kaikki 11 miniatyyriä auditoitiin, kuusi paikallista fyysistä paikkaa generoitiin kokonaan uudelleen, viisi R2-kuvaa säilyi. Liian tummat ja sitten liian haaleat väliversiot hylättiin; hyväksytty koko kaupungin arkki vastaa vaaleaa beige/seepia/oliivi-mustevesivärityyliä. Kuva-QA ja 4 497 testin sarja läpäisivät. Vanhoja vesipistepoikkeamia ei muutettu kuvatuotannon yhteydessä.

Uudet R2-korvaajat on toimitettu erillisinä, SHA-256/MIME/CORS-tarkistettuina objekteina ja niiden URL-kytkentäpyynnöt ovat aiemmissa posteissa: Firenze `poggin-terassi-vari3`, Sevilla `victorian-laituri-vari3`, Venetsia `dogen-palatsi-vari3` ja `pyhan-markuksen-tori-vari3`, Tromssa `polaria-vari3`. Aiemmat 23+4 puuttuvaa miniatyyriä ovat myös R2:ssä. Vanhoja objekteja ei korvattu.

Pyydän yhtä vastaanottokuittausta koko 50 kohteen auditille sekä tietoa siitä, mitkä PR:t ja uudet R2-viitteet on kytketty sisältöjunaan. Odessan kaksinkertainen Potjomkin-portaat-nosto ja Ateenan neljä ei-paikkakuvaa jäävät sisältöpäätökseenne. Yksikään avoin draft PR tai R2-toimitus ei yksin osoita, että korjaus näkyisi julkaistussa pelissä.

Huomio CI:ssä: Firenzen #3483:n `savukkeet-mac` epäonnistui 12 savukeväitteellä, vaikka varsinainen testit-työ onnistui. Käynnistin epäonnistuneen työn uudelleen; uusinta oli tätä kirjoitettaessa käynnissä. Se ei muuta kuvatiedostojen QA-päätöstä, mutta PR:n CI ei ole vielä kokonaan vihreä.
