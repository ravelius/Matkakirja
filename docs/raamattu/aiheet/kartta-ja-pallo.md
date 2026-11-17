# kartta-ja-pallo · vastuu KS · tarkistettu 12.11.2026

TAVOITE: Maailma on yksi pyöritettävä karttapallo, joka näyttää isoisän akvarelliatlakselta mutta kuvaa nykymaailmaa. Kohdemaa erottuu hennosta rajastaan, muu maailma näkyy ilman huntua, ja kartta elää pienin liikkein.

SÄÄNNÖT:
1. Pallo on ainoa pelilauta. Vanha tasokartta ei palaa linssinäkään. [R-6.10] [R-2.61]
2. Ulkoasu on 1873-atlaksen akvarelli: tummanruskea muste, kerma valkoisen sijaan, paperin syy. Paperin rae on laitepikseleinä, piirteet kartan mittakaavassa. [R-4.34]
3. Reliefi on monisuuntaisesti varjostettu, lämmin korkeusvärjäys. Meressä on vain pehmeä sävyliuku, ei käyriä eikä viivoitusta. [R-4.35]
4. Maiden rajat ovat vektoriviivoja täydellä voimalla, ilman erillistä rantaviivaa ja paksua rajakehää. Kohdemaan raja on muita vahvempi mutta hento ja käsin piirretyn näköinen (1,7 pt, voima 0,42). [R-4.36] [R-2.136] [P-261115-3]
5. Muualla ei ole huntua. Koko palloa saa selata, mutta napautus avaa ja perintöpisteet nimineen näkyvät vain kohdemaassa; linssit, ISS-raketti, aarrepisteet, nopan siirrot ja lentotarjoukset toimivat kaikkialla. [R-2.136] [P-261115-3] [P-261115-4] [P-261115-5]
6. Kartan kaikki kohteet ovat yhdessä karttapaletissa; liian vahva väri puristetaan rajaan tuonnissa. Paletti ei koske käyttöliittymää, Pulua eikä kohdemaan lippua. [R-4.40]
7. Pysyvä poltetaan yhteen maailman laattapyramidiin (pohja, nostot, viivat); vain pelissä vaihtuva on elävää, ja laitteelle haetaan vain näkyvät laatat. [R-6.9]
8. Pohja kattaa koko maailman; tarkemmat tasot tehdään vain paikoille, joissa pelaaja käy. Navoilla on oma samantyylinen karttakuva. [R-4.35] [R-6.10]
9. Levossa pallo on täysin terävä. Kartta ei hyppää eleessä: maa pysyy sormen alla koko ruudulla myös kallistettuna, heitto liukuu kitkalla ja lyhenee lähitasoilla (lähimmällä enintään ruudun), kosketus pysäyttää, ja nipistys päättyy mittakaavaan, johon sormet jäivät. [R-6.10] [R-6.9] [P-261112-24]
10. Saapuessa kohdemaa sovitetaan ruudulle mahdollisimman suureksi. [R-2.136]
11. Tyhjän kohdan napautus ei tee mitään, tuplanapautus avaa maakunnan ja napautus sulkee sen. Valikon sulkeva napautus ei avaa. [R-2.196] [R-6.10]
12. Kohdemaan nostot näkyvät heti täysinä (paitsi aloitusmaassa), muiden piilossa. Noston avaus ei värjää maakuntaa; valmiin maan lippu liehuu. [R-2.195] [R-4.19]
13. Kartta sumenee kevyesti, kun isoisän tai Pulun kuvia on auki. [R-4.33]
14. Saapuessa joet ja rajat piirtyvät (enintään 5 s, ohitettava). Reitti jää kynänjäljeksi, yövalot palavat vain käydyissä kaupungeissa, muutaman minuutin välein näkyy lyhyt elävä hetki, ja linnut häipyvät lähitasoilla pehmeästi. [R-4.19] [P-261117-52]

EI VIKA:
- Naapurimaita ei tummenneta.
- Maakunnat eivät herää vaiheittain.

TEKOTAPA:
- docs/moduulit/karttapallo.md, laattapyramidi.md; docs/raportit/elava-kartta-suunnitelma-20260926.md.
- Kortit: aika-ja-ulkoasu, kartan-merkit-ja-nimet, kamera (loitonnus), kaupungit (tarkkuus).
