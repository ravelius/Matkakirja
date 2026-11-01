# Pariisi r4-c4-q11 — natiivin 1 m/px:n kattokoe

## Tuotanto ja tiedostot

Yksi kokonaan uusi image_gen-generointi, alkuperäinen 1536 × 1024 RGB PNG. Toimitettava tiedosto on tavulleen työkalun alkuperäinen: ei suurennusta, pienennystä, rajausta, värikorjausta, terävöitystä tai paikallista retusointia. Vanhat r4-c4-kuvat ja yrityshistoria säilyvät.

Alue on r4-c4:n vasen yläneljännes, x=0…1535 ja y=0…1023. Näin yksi natiivipikseli vastaa ohjekuvan yhtä metriä. Referenssit: tilauksen 1:1-geometria, vesimaski (kokonaan musta) sekä G:n tavallisten rakennusten käsiala. Aiempi suurennettu kuva ja Karttasepän kattokooste luettiin vertailua varten. Kaikkien neljän tilausliitteen SHA256 tarkistettiin. Käytetty prompti on `prompts/q11-1m-attempt001.txt`.

Karttatiedot © OpenStreetMap contributors, https://www.openstreetmap.org/copyright. Kuvitus oma ImageGen-tuotanto lähteen ja omistajan hyväksymän G-referenssin pohjalta.

## Katselmus ja rajat

Koko pala sekä saman atlasalueen 2×-lähikuva katsottu. Uudessa versiossa siniharmaat kattotasot erottuvat toisistaan; ohuet ruskeat harja- ja räystäsrajat sekä pienet savupiiput ovat aiempaa selvempiä. Kattoikkunoiden merkit erottuvat, mutta aivan pienimmät pysyvät tyyliteltyinä eivätkä kaikki muodosta täydellistä ikkuna-arkkitehtuuria. G:n käsialan ja pelin lähimmän zoomin lopullinen hyväksyntä kuuluu Karttasepälle/PT:lle.

Ei lisättyjä puita, ihmisiä, liikennettä, maamerkkejä tai vesialueita. Tässä neljänneksessä veden sallittu pinta-ala on nolla. Turkoosin värikynnyksen osumia on 7028 pikseliä pieninä kattokohokohtina: 2493 erillistä komponenttia, suurin 37 pikseliä, ei yhtään yli 400 pikselin komponenttia. Värikynnys ei yksin tunnista vettä; tulos varmistettiin myös katsomalla koko kuva.

Katuverkko ja korttelien päämuodot säilyvät samassa näkymässä. Lähellä valkoista olevan katupintamaskin IoU on 0,881. Ohjekuvan maskireunasta 94,79 % on uuden maskireunan yhden pikselin ja 98,02 % kahden pikselin etäisyydellä (Chebyshev). Vastakkaiseen suuntaan vastaavat osuudet ovat 78,75 % ja 82,39 %, koska uuden kuvan vaaleat julkisivu-/ikkunayksityiskohdat tulevat myös värimaskiin. Nämä ovat värimaskidiagnostiikkaa, eivät varmenne kaikkien kadunkeskilinjojen pikselitarkkuudesta. Pieniä reunus- ja varjoeroja ohjeeseen jää; en väitä geometriaa pikselilleen identtiseksi.

Kolmen saman atlasrajauksen FIND_EDGES-varianssit paranivat edelliseen suurennettuun toimitukseen nähden 7,40–7,78-kertaisiksi. Keskialue: 1056,56 → 7995,59; lounainen: 1028,53 → 7614,30; koillinen: 1047,06 → 8141,36. Tämä mittaa lähdekuvan reunakontrastia, ei yksin kattoikkunoiden luettavuutta tai pelin laatua. Koneelliset mittarit ja menetelmät: `qa/validation.json`.

## Vertailukuva ja vastaanotto

`qa/katot-vanha-vasen-uusi-oikea-2x.png`: vasemmalla edellinen r4-c4-toimitus, oikealla uusi natiivi neljännes, sama alue (600,350)–(984,670), molemmat näytetty kaksinkertaisina lähimmän naapurin skaalauksella. Tämä suurennos on vain QA-esikatselu; toimitettava peliehdokas on suurentamaton 1536 × 1024 PNG.

Vastaanottajan lähizoomi-, G-käsiala- ja geometriatarkistus sekä hyväksyntä ovat avoimia. Peliin kytkentää tai julkaisua ei ole tehty. Koko kaupungin 1 m/px -tuotanto tai 35 palan vaihtoehto odottaa erillistä jatkotilausta. Tämän kokeen tuloksia ei siirretä aiemman r4-c4-palan saumatuloksiksi.
