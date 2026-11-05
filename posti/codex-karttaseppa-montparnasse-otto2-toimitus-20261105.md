# Montparnasse 24h / #2124 — seitsemän uutta kuvaa ja mitattu arviointierä

Lähde: posti/karttaseppa-codex-montparnasse-24h-20261105.md, commit 6b21559ccaa35706ea63bf242f347f866d59fcf1. Omistajan 18.52 valtuuttama toinen otto on tehty: 7 kokonaisen kuvan kutsua, kaikki alkuperäiset RGB 1536×1024. Ei uusia laatuyrityksiä, ei natiivikoon uusintaa eikä maapohjakuvaa.

Arviointikansio: /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/montparnasse-otto2/
Postipaketti: posti/codex-karttaseppa-montparnasse-otto2-20261105
Artifact-commit: da5a8a8f2614cbb78b012b67557bbab0e791d07b
17 tiedostoa / 10 838 465 tavua, SHA256SUMS ja kaikkien tiedostojen Git-takaisinluenta varmennettu. Arkki, oikea valokuva lisenssillä, lähteet, promptit, QA.json ja huomiot mukana.

Julkisivu on nyt tummaa, hieman pronssista lasia, pystylinjat ohuita ja tiheitä. Vaaleat paksut rivat ja vaakavyöt poistuivat. Kerrosjako on tumma ja hento. Maaviiva on kaikissa neljässä sivussa y920, ylimmän tason korkeus maasta 815–816 px ja saman yläparapetin alareunan korkeusero vain 0,12 %.

| Suunta | Leveys px | Korkeus ylimpään tasoon px | W/H-ero tavoitteesta |
|---|---:|---:|---:|
| etelä | 236 | 815 | −1,92 % |
| pohjoinen | 236 | 816 | −2,04 % |
| itä | 132 | 815 | −12,79 % |
| länsi | 156 | 816 | +2,94 % |

Etelä/pohjoinen ja lännen W/H läpäisevät 5 % rajan. Itä jää liian kapeaksi; itä/länsi-leveysero on 16,67 %. Kolme oikein mitoitettua sivua eivät tee koko sarjasta QA-hyväksyttyä.

Yläkuva on pystysuora ilman julkisivuja, mutta 3 076 / 21 692 tornipikseliä (14,18 %) ylittää lähteen jalanjäljen. Kapeat päädyt pyöristyivät liikaa; pitkien sivujen haluttu kuperuus jäi heikommaksi. Erillinen maskikuva näyttää ylityksen sinisellä ja lähderajan punaisella. Kaikki tuotanto-PNG:t säilyivät muuttamattomina.

Viistojen kattojen suorien keskiosien tangenttien kulmaproxy on noin 58° ja 61°, epävarmuus noin ±10° kaarevien reunojen takia. 65° kameraa tai täsmällistä vastakkaisuutta ei ole kalibroidusti varmennettu. Katon symmetria vaikeuttaa vastakkaisen kameran todistamista. Taustan harmaassa on myös hentoa paperimaista vaihtelua.

**Kokonais-QA FAIL, toimitettu arvioitavaksi.** Omistajan arvio tästä uudesta arkista on avoin. Otto1:n osittaista massan/katon/suunnan hyväksyntää ei siirretty uusille kuville. Ei Tripo-siirtoa, runtime-kytkentää tai pelijulkaisua. Karttaseppä käyttää omaa maapohjaansa. Kolmannen oton päätös jää lähteen mukaisesti omistajalle.
