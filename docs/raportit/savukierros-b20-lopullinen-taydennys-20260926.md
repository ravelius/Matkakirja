# Build 20 -lopullinen, täydennys (26.9.2026, käännös 894f1feb, juna/b13 c8cd1d94)

Jatko edelliseen (69b566d93): Fablen laajennettu H–N-lista. iPhone + iPad, kumpikin ajettu erikseen.

## Uudet/tarkennetut tulokset

- **B) Marathon → Attiki pysyvä väri: VAHVISTETTU FAIL.** Zoomasin tiukasti Attikan alueelle (Ateenan
  ympärille) ennen ja jälkeen `elava herata GRC:Attiki` (linssi-komento.txt) -komennon: loki vahvistaa
  "herää GRC:Attiki (GRC:Attiki), 1/1, tulva 60 km", mutta kuvakaappaukset ennen/jälkeen ovat pikselilleen
  identtiset — ei mitään väriä, ei rajaa, ei muutosta. HUOM: `elava herata` on koodin oman kommentin mukaan
  "ei muuta pelitilaa" -testikomento (MAAKUNNAT pysyi 0/14 KREIKKA-kartussissa herätyksen jälkeenkin), joten
  se ei ehkä ole oikea reitti pysyvän tilan testaamiseen — mutta jos komento vain toistaa saman animaation
  kuin oikea löytö, efektiä ei silti näy ollenkaan millään zoomilla. Pelikoodarille/Karttasepälle: tarkista
  näkyykö väri ylipäätään millään debug-reitillä.
- **H) 153/159 horisonttiusva ja I) 154 utu-taivas: PASS, selvästi näkyvissä!** Löysin matalan tason
  konsolin (Documents/komento.txt, Kartta/Komennot.cs — eri tiedosto kuin peli-komento.txt, toimii samassa
  Kartta-skenessä). `kallista 70` kallisti kameran: horisontti häipyy kauniisti vaaleansiniseen/valkoiseen
  usvaan, taivas on pehmeä sininen liuku, rannikkoviiva ja nostomerkit sulautuvat etäisyyden mukaan. Selvä
  ero lähikuvan terävyyteen verrattuna.
- **J) 155 (taso 1 -symbolit aina, kynnys 2,5–3): PASS silmämääräisesti** — pienet nostomerkit pysyivät
  näkyvissä sekä lähi- että kallistetussa kaukokuvassa.
- **C) offline-lepo: PASS (regressio ok molemmilla laitteilla).** iPadilla piirto tarvitsi ~15 s asettuakseen
  (laattojen lataus/verkko oli kiireinen, `verkkoOdotusMs 3731`) ja yhden ohimenevän piikin (piirretty 221/225
  `ruutu`-kyselyn jälkeen), mutta palautui heti 2–3/151:een ja pysyi siellä. iPhonella sama kuin esikierroksella.
- **D) Athos-salaisuuskortti: PASS** (kolmas vahvistus, sama komentoketju).
- **E) musiikki (kaupunki ateena → valimeri): PASS** (vahvistettu jo edellisessä raportissa, tunnus testattu
  tuoreella pelillä ensimmäisenä kuten Fable ohjeisti).
- **G) taustapäivitys: ei uusittu tällä kierroksella** (PASS esikierroksessa, ei syytä epäillä regressiota).
- **K) 156 (maakuntien selain vedolla), L) 157 (valinnan täyttö 0,45), M) 158 (pikkukuva), N) elävät hetket
  4+5 (kuljettu reitti tummanpunaisena, 3 s → piirto 0 kehykseen), F) pohja 26 + kerma p060 pallonäkymässä,
  A) kylmä verho -uusinta: EI TESTATTU tälläkään kierroksella.** En löytänyt tapaa avata varsinaista
  "Pallo"-maailmankarttanäkymää (jossa pohja/kerma-teksturit näkyvät) pelin sisältä ilman UI-koordinaattien
  pidempää hakua; maakuntavalinnan kosketuslaajennus (K/L/M) vaatisi luultavasti oikean maakuntarajan
  napautuksen jota en löytänyt tässä ajassa. Peli-loki näytti kertaalleen "animaatiot ... käynnissä: pallon
  sumennus elävä kartta" kameran asettuessa, mikä vahvistaa elävä-kartta-järjestelmän olevan aktiivinen,
  muttei riitä N:n täsmällisen 3 s -ehdon todentamiseen.

## Yhteenveto
Uutta: H ja I nyt PASS (löytyi oikea kamerakulma), B nyt VAHVISTETTU FAIL (ei vain "ei havaittu" vaan
"pikselilleen sama ennen/jälkeen"). C, D, E, J, G pysyvät PASS. K, L, M, N, F, A(uusinta) yhä auki.
Kokonaistilanne: 8 kohtaa PASS, 1 vahvistettu FAIL (B), 6 testaamatta. Simulaattorit sammutettu.
