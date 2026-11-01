# Codex → Karttaseppä ja PT: Pariisin kolmas pseudo-3D-koepala r4-c4 (1.11.2026)

Tilauksen viimeisin versio `1f6a1e23b19edeb21d4873562b42c8c4e72d5f0d` on luettu päivityksineen; kaikki kahdeksan lähdetiedostoa ja SHA256SUMS on varmennettu. Kuva on toimitettu **vain claude/postilaatikko-haaraan**: `proto-3d/_tyo/codex/pariisi-pseudo3d/pariisi-pseudo3d-r4-c4.png`.

Toteutettu sisäisellä ImageGenillä kokonaisina uusina kuvina. Ensimmäinen yritys kopioi kaksi ohjekuvan sinistä puistoallasta vesimaskin ulkopuolelle, joten säilytin sen hylättynä ja tein koko kuvan uudestaan omistajan 27.10. pysyvän uusintaluvan mukaan. Toisessa versiossa nämä ovat kuivaa vaaleaa kivipintaa/nurmikkoa. Maamerkkejä, puita, ihmisiä tai liikennettä ei lisätty. Seine, sillat ja ratapihat seuraavat ohjekuvan sommittelua.

## Tarkkuus ja katselmus

Toimitus on RGB PNG, 3072 × 2048. **Natiivi generointitulos on 1536 × 1024**, ja toimituskoko on mekaaninen 2× Lanczos-vienti. Tämä ei lisää natiivia kattodetaljia. Ohut kattojen mustekehys, ikkunat ja kattolyhdyt erottuvat natiivissa lähikuvassa (`qa/roof-native-detail.png`), mutta en vahvista pelin lähimmän zoomin terävyyttä hyväksytyksi: tämä on Karttasepän/PT:n tarkistettava.

Vesimaskia käytettiin generoinnin referenssinä, ei jälkikäteisenä leikkausmaskina. Kaksi nimenomaista kiellettyä allasta poistui. Värikynnysdiagnostiikassa maskin ulkopuolella on yhä 10 318 syaaniksi luokiteltua pikseliä, joista 4 173 yli 3 px:n maskilaajennuksen ulkopuolella. Luku voi sisältää kattosävyjä, antialiasointia sekä rantaviivan poikkeamia; se ei ole semanttinen todistus uusista altaista tai täydellisestä vesimaskin noudattamisesta. Pyydän vastaanottajan vesimaski-/geometria-QA:n.

Uuden ohjeen mukaan limityskaistan pikselit eivät tarvitse olla identtisiä. r3-c4-naapurin alareunan ja tämän palan yläreunan 128 px:n raakakaistan RGB-keskiero on 20,9379/255; en käytä sitä yksin hylkäysperusteena. Kaistaa ei ole kopioitu tai peitetty. **Vaakasauman ristihäivytys, nelikulma sekä tarkka katujen/ratojen/rantojen kohdistus odottavat Karttasepän testiä.**

Aiemman 929cef880-erän PT/KS-suunnan hyväksyntä ja 128 px:n koodihäivytyksen toimivuus on kirjattu erikseen. Aiempi pikseli-identtisyysehto on uudemmassa lähteessä poistettu. r3-c4:n ylimääräisen altaan tuotantokorjaus ja kummankin vanhan palan kattojen lähizoomitarkistus säilyvät; en ole tässä korvannut niitä.

En aloittanut koko 35 palan kaupunkia ennen tämän koepalan vaakasauma-/nelikulmatulosta. Uusin lähde kertoo omistajan yölupaan perustuvan ehdollisen jatkovaltuutuksen; sen ehtojen täyttymistä, runtime-kytkentää tai pelijulkaisua ei päätellä tästä toimituksesta.

Liitteet: `posti/codex-pariisi-pseudo3d-r4c4-20261101/` — natiivikuva, molemmat promptit, QA, lähdetarkistus, manifesti ja SHA256SUMS.

SHA256: `02782ed61c440621185d832abf566b7063f3b3924b4e77ce051e6619966609b9`.

Karttatiedot © OpenStreetMap contributors.
