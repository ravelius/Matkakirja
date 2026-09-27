# Merge-pyyntö: natiivi-ui/lehti-otsikot 69f4cde (e6aca8e = testi/b11a b24538f + värikorjaus), Natiivi-UI 24.9.2026

Testit: kaanna.sh 261/261, unity-tarkistus 0 virhettä, uss-tarkistus ok.

## Mitat (web tuotannosta, Playwright dpr 2)
- web-lehti-otsikot-mitat.txt (.natiivi-ui-b10e-lehtiotsikot.mjs): .lehti-nimio AT 700 30,4/44,8 px, harvennus 0,1 em, #16130f;
  .aihe-nimi AT 700 23,2, 0,06 em; .lehti-ylarivi 9,6 px 3,264 px rgb(90,67,38); .nahtavyys-selite AT 14,08 #46331f lh 1,4 pysty;
  pääkuvan lähde .kuvalahde-vain-suurennoksessa; .saa-teksti ja .maa-linkki 600; etusivun teksti = ARTIKKELIT.intro (js/lehti.js:2194).
- web-nostokortti-mitat-b11.txt (.natiivi-ui-b11-nostokortti-mitat.mjs): .nostokuva-selite Iowan 13,44 rgba(33,29,24,.82) keskitetty,
  .nostokuva-lisaa 102×40, täyte 5,6/25,6, reuna 1 px rgba(122,85,20,.45), r 8, pohja rgba(250,246,235,.96), AT 13,76 1,1 px #5c3f0e;
  kortin täyte 13,6/15,2/15,2; .fokuskohde-otsikko AT 700 16,32 #211d18; .fokuskohde-ylarivi 10,88/1,52 #7a5514;
  .nostosarja-kuvalaskuri 10,88 #f6f0e0 rgba(18,12,4,.55).

## Muutokset
1. Lehden etusivun esittely: kaupungin intro (kaupungit.json intro.teksti = web ARTIKKELIT.intro), **lihavoinnit**, muuten vakiorivi.
2. Nimiö ja aihe-nimi Bold, värit ja harvennukset; UNOHDETTU AARRE; kuvateksti pysty AT; etusivun pääkuvan lähde piiloon; säärivi 600.
3. Nostokortti vaihe 1: selite keskitetty ja LISÄÄ alla; vaihe 2: kohdeotsikko, ylärivi, laskuri, pystyt kuvatekstit.

## Jää seuraavaan
- Nostokortin ylärivin tyyppikuvake (web piirraNostosymboli), iPadin leveä 2-palstainen vaihe 2, lehden iPad-palstat,
  aihesivun kuva oikealla (iPad), "Vartaan oma nimi" -kappalejako.

## Kuvaparit (testi/b11a b24538f, iPhone 17 FB234D08 / iPad 503000D1)

| Kohta | Kuvapari | Tulos |
|---|---|---|
| Lehden etusivu ja s. 2 | kuvapari-b11a-lehti-iphone.jpg, -ipad.jpg | Etusivulla nyt webin teksti ("Ateena on Euroopan vanhimpia…", **Akropolis** lihavoituna). ATEENA ja ARKI JA TAVAT lihavoituina, kuvateksti pystyssä, pääkuvan lähde piilossa kuten webissä. |
| Nostokortti vaihe 1 ja 2 | kuvapari-b11a-nostokortti-iphone.jpg, -ipad.jpg | Vaiheessa 1 selite keskellä ja LISÄÄ sen alla, vaiheessa 2 otsikko Bold ja HISTORIA-rivi. iPadin vaihe 2 on yhä kapea (seuraava erä). |

## Värikorjaus 69f4cde (b11a:n jälkeen)
Täysleveällä kuvalla mitattuna selitteen tummin sävy oli 117, kun web on 58. Leipäteksti #211d18 osui tarkasti arvoon 33,29,24.
Syy: projekti on lineaarisessa väriavaruudessa (m_ActiveColorSpace 1), ja UITK sekoittaa alfavärit siellä, jolloin
rgba(33,29,24,0.82) vaalenee. Korjaus: selite rgb(71,67,60) ja LISÄÄ-reuna rgb(190,170,133) sRGB-yhdistelminä kortin #f5f0e2 päällä.
Tämä on laskettu korjaus, joten se tarkistetaan seuraavassa käännöksessä.
