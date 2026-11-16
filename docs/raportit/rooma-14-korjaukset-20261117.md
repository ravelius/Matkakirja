# Rooman 14 kohtaa (ROOMA.md, KK 17.11.2026), PR 6896 (SK)

Korjattu kaikissa toistopaikoissa (nahtavyysjutut, fokusvirta-rooma, kulttuuri-kategoriat, historian-hetket + generoitu hetkisivu). Vanhat sanamuodot eivät löydy git grepillä.

1. Areenan kellari k3: "Kellaria kaivettiin esiin useaan otteeseen 1800-luvulla, muun muassa vuosina 1874–1875." (1930-luvulle ei löytynyt toista lähdettä, joten lause päättyy 1874–1875). aika-kenttä "1874–1875". Fokusvirran kysymys "Milloin kaivaus alkoi?" → "Mitä kaksikerroksisessa kellarissa oli?".
2. Kuilut: "kymmeniä pystykuiluja ja nostimia" (teksti + kuvateksti).
3. Meta Sudans: "purettiin 1930-luvulla", "noin 60 vuotta myöhemmin", aika "1. vuosisata–1930-luku", kulttuuri-kategorioiden kaksi kuvatekstiä.
4. Meta Sudans: "ääriviivat merkittiin purun jälkeen vaaleammalla kivellä."
5. Torre Argentina: "noin 200 kissaa" (juttu, täky, syvennys).
6. Magnani: "kuului roomalaisiin, jotka ruokkivat kissoja."
7. "temppelit olivat vielä talojen ja maan kätkössä".
8. Nasone: "Alun perin ne olivat valurautaisia pylväitä" (juttu + täky; kulttuuri-kategorioissa ei vastaavaa lausetta).
9. Michelangelo k3: "ensimmäinen puolisko oli valmis jo elokuussa 1510. Yleisölle se näytettiin kesällä 1511." + fakta-kentät (hetkikortti, lehti, hetkisivu).
10. Michelangelo: "suostui tehtävään vastahakoisesti" (Britannica "reluctantly agreed" + EBSCO) teksti + johdanto (kolme paikkaa).
11. Obeliski: "Obeliski on pieni, noin 5,5 metriä korkea."; lukumäärä pois (myös kysymys).
12. VALMIS (SK 17.11., KK:n kohta 12). Juurisyy: `tools/aanitysjono/tarkista.mjs` otti täkynoston kaupungiksi vientikokoelman `takynostot`-rivin `kaupungit[0]`:n. Se on laudan ENSIMMÄINEN kaupunki, jonka pooliin täky kuuluu. Rooman viisi täkyä (kissat, colosseumin-kellari, minervan-norsu, aqua-virgo, rooman-nasone) ovat Italian maapoolissa (`NOSTO_MAAT.ITA`, 6 täkyä), ja pooli kuuluu kaikille Italian kaupungeille, joilla ei ole omaa `takynostot`-listaa (venetsia, firenze, milano, napoli). Laudalla venetsia tulee ennen roomaa, joten rivit saivat `venetsia`. Mikään äänitys- tai tekstisisältö ei ollut väärin; vika oli jonon kaupunkisarakkeen nimessä (äänittäjälle näkyvä lista ja puuttuvat kaupungeittain -yhteenveto). Korjaus: tarkista.mjs ottaa kaupungiksi ensin sen kaupungin, jonka fokusvirran OMASSA `takynostot`-listassa täky on (tässä rooma), ja vasta sen puuttuessa `kaupungit[0]`:n. Viisi riviä siirrettiin `venetsia` → `rooma`. Muut kaupungit: samaa mallia käyttävät maat (FRA, GBR, NLD, AUT) saavat jatkossa kaupungin fokusvirrasta; jonon nykyiset rivit (amsterdam 7, wien 4, lontoo 1) eivät muuttuneet, joten muilla ei ollut väärää nimeä. Äänitysjono ajettu, OK (puuttuu 214, kaikki jonossa).
13. Kolikko: "Siitä ei ole varmaa tietoa, oliko kolikon heittäminen silloin jo tapana."
14. Trevi: superlatiivi ja mitat pois oppitunnista, jutusta ja kuvateksteistä (Salvi 1732 vahvistettu: Britannica, Treccani, Sovrintendenza, Roma Turismo).

Äänitysjono `--lisaa --siivoa` ajettu; testit 5909 / läpi 5890 / kaatui 0 / ohitettu 19; `tools/paivita-hetkisivut.mjs` ajettu.
