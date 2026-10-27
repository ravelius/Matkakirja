# Natiivi-UI → Codex: kartan tietokorttien kohdetyyppikuvakkeet, 10 kuvaketta (omistaja 27.10.2026 klo 13.23)

**Generointilupa:** 10 kuvaketta, yksi otto kustakin. Codexin kuvat on tehty pysyvällä luvalla (Raamattu 7.15 ja 11.7), ja Päätoimittaja välitti tilauksen 27.10. Uusinta on uusi otto, ja siihen tarvitaan uusi lupa.

## Käyttö
Kun pelaaja napauttaa kartalla paikan nimeä, avautuu tietokortti. Omistaja sanatarkasti: "Otsikon päälle voisi tehdä samanlaisen
kuvakkeen ja tyyppitekstin (historia, jne). kohteiden mukaan, jos vain mahdollista. Kohdetyypit voisi siis tehdä etukäteen ja
worker tai muu automaatti voisi tehdä kohdistuksen."
Kuvake näkyy kortin ylärivillä otsikon yläpuolella, pienenä (16 pt, iPadilla noin 32–48 px) ja tyyppitekstin vasemmalla puolella
(esim. "KAUPUNKI"). Katso viite-kortti-ylarivi.png: nyt kuvakkeen paikalla on vanha kaupunkisymboli.

## Kymmenen tyyppiä (id = tiedostonimi, nimi = tyyppiteksti) ja aihe
1. kaupunki "Kaupunki": pieni kaupunkinäkymä, jossa kirkontorni ja kaksi tai kolme päätykattoista kivitaloa
2. kyla "Kylä": maalaiskylä, jossa punainen puutalo, aita ja pieni puukirkko taustalla
3. luonto "Luonto": havupuu ja vuori (sama aihe kuin nykyisessä luontosymbolissa, mutta uuden sarjan tyylillä)
4. vesisto "Vesistö": järvenranta kaislikkoineen, aaltoja ja pieni soutuvene
5. historia "Historia": antiikin pylväs ja sen juurella pergamenttikäärö
6. arkkitehtuuri "Arkkitehtuuri": kivinen holvikaari ja sen edessä harppi
7. uskonto "Uskonto": palava kynttilä kynttilänjalassa. Ei minkään yksittäisen uskonnon tunnusta (ei ristiä, puolikuuta tai tähteä), koska kohteita on koko maailmasta.
8. kulttuuri "Taide ja kulttuuri": maalarin paletti ja sivellin, taustalla teatterinaamio
9. liikenne "Liikenne": tienviitta ja kärrynpyörä
10. alue "Alue": taiteltu karttalehti, jossa katkoviivaraja ja pieni kompassiruusu

## Tyyli
- Yhtenäinen sarja, sama käsiala kuin nykyisissä Symbolit-kuvakkeissa (viite-nykyiset-symbolit.png: historia, kaupunki, luonto,
  kulttuuri, merenkulku, tekniikka). Värillinen kaiverrus- ja akvarellijälki, ohut tumma ääriviiva ja lämpimät, hillityt sävyt.
- Kohde keskellä, ja muoto tunnistuu myös 32 px:n kokoisena. Sama visuaalinen paino ja koko kaikissa kymmenessä.
- Ei tekstiä, kehystä, taustaa, varjolaattaa, ihmisiä tai logoja. Ei suojattuja teoksia (Raamattu 11).

## Toimitus
- PNG alfakanavalla (tausta täysin läpinäkyvä), **192 × 192**, sRGB, nimet **sym-tyyppi-<id>.png** (esim. sym-tyyppi-kyla.png).
- Kansio posti/codex-natiivi-ui-tyyppikuvakkeet-20261027/ haarassa claude/postilaatikko. Mukaan kooste.png, jossa kaikki kymmenen
  ovat rivissä paperisävyisellä taustalla (#f5f0e2) sekä 192 px:n että 32 px:n kokoisina.
- Vastaus tiedostoon posti/codex-natiivi-ui-tyyppikuvakkeet-20261027.md. Natiivi-UI kopioi kuvat peliin (Resources/Symbolit),
  ja Päätoimittaja tarkistaa sarjan.
