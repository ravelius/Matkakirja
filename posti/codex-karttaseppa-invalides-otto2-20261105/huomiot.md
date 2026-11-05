# Invalides otto 2 #2114 — arviointierä, QA FAIL

Yhdeksän työkalulähetystä, kahdeksan syntynyttä kuvaa. Ensimmäinen yläkuvalähetys päättyi HTTP400 invalid_image_file -virheeseen ja tuotti nolla kuvaa. Tekninen uusintalähetys käytti saman Commons-lähteen virallista pienempää esikatselua. Kahdeksan kuvallisen oton rajaa ei ylitetty; QA-uusintoja ei tehty. Kaikki kahdeksan PNG:tä ovat muuttamattomia native RGB 1536 × 1024 -kuvia.

Tämä on diagnostiikka- ja arviointitoimitus. Ei laadullista hyväksyntää, omistajahyväksyntää tai Tripo-toimituslupaa. Ei R2-/peli-/julkaisutoimitusta.

## Sivumittaus

| Sivukuva | Leveys px | Huippu y | Päämaaviiva y | Korkeus huippuun px | Alasiiven lista y | Lista maasta px | W/H | Tavoite | Ero |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| etela | 1456 | 346 | 883 | 537 | 786 | 97 | 2.711 | 2.393 | +13.33% |
| pohjoinen | 1448 | 345 | 895 | 550 | 775 | 120 | 2.633 | 2.393 | +10.04% |
| ita | 1443 | 388 | 888 | 500 | 779 | 109 | 2.886 | 2.561 | +12.70% |
| lansi | 1459 | 371 | 888 | 517 | 775 | 113 | 2.822 | 2.561 | +10.20% |

Tavoite perustuu tilauksen oikeisiin mittoihin: etelä/pohjoinen 256/107 m, itä/länsi 274/107 m. Väri-bbox max(RGB)−min(RGB)>10; päämaaviiva ja matalan pitkän siiven lista käsin luettu, arvio ±4 px. 107 m sisältää kultakupolin kärjen. Etelän erillisen U-siiven alaraja on y=917, 34 px päämaaviivaa alempana; sitä ei käytetä pääkirkon korkeuden nollatasona.

Vastakkaisleveyksien ero etelä/pohjoinen 0.55% ja itä/länsi 1.10%: alle 5 %. Kaikkien sivujen W/H-portti kuitenkin FAIL. Listakorkeuden vaihtelu 20.96% keskiarvosta: FAIL. Päämaaviivojen hajonta 12 px. Kuvat eivät ole yksi yhtenäinen ortografinen mittasarja.

## Viistot ja yläkuva

Viistojen tavoite on 65° ja pystylitistys sin(65°)=0,9063. Toteutunutta kulmaa ei pystytä varmentamaan yhdestä johdonmukaisesta ortografisesta projektiosta: katon suuntaviivat ja pystysärmät eivät anna luotettavaa kalibrointia. Koilliskuva on lähes suoraan pohjoisesta eikä vastakkainen kulmanäkymä. Kulmaportti jää FAIL/varmentamatta; promptin kulmaa ei merkitä toteutuneeksi mittaukseksi.

Yläkuvan väriraja [561, 528, 955, 976], lähdejalanjäljen bbox [587, 530, 926, 890]. Rakennus ylittää jalanjäljen etenkin etelässä ja lännessä; värillisiä pikseleitä jalanjäljen ulkopuolella 15014. Jalanjäljen sisällä pysyminen FAIL. Katon reunoilla näkyy vähäisiä julkisivuja, joten puhdas 90°-vaatimus ei täyty.

## Maapohja

Kaksi vaaleaa pohjoispuiston laikkua poistuvat, mutta luoteispuiston koilliskulman sisennys täyttyy myös korjausalueen ulkopuolella. Tätä kuvaa ei pidä käyttää hyväksytyn pohjan korvaajana. Maapohjan v1 säilyy ennallaan alkuperäisessä toimituksessa.

Annetut likimääräiset korjausruudut: [[650, 70, 700, 145], [810, 45, 865, 185]]. Niiden ulkopuolella muuttui 1556495/1561092 pikseliä (99.71 %), keskimääräinen absoluuttinen kanavaero 4.79/255. Maskin ulkopuolella muuttui 1270576/1274686 pikseliä. Pelkkä tekstuuriero ei yksin todistaisi geometrian virhettä, mutta vertailu osoittaa lisäksi konkreettisen puiston rajauksen muutoksen. Jalanjäljen 106767 pikselistä nurmenvärisiä 2464; tämä on vain väriehto, ei semanttinen pintatodistus.

## Muoto ja yksinkertaistukset

- Yläkuvan etelälännessä neljä pihaa kolmen sijaan ja eteläidässä kuusi neljän sijaan. Lounaassa itäpihoja kuusi, pohjoisen vastakuvassa oikeat 3/4. Osien lukumäärä ei siis pysy samana.
- Yläkuvan U-siipi muuttuu L/J-muotoiseksi ja ulottuu jalanjäljen etelärajan yli. Myös länsireuna ylittää jalanjäljen.
- Koilliseksi nimetty kuva näyttää pohjoispään lähes suoraan, ei täsmällistä vastakulmaa. Viistojen 65 asteen projektio ei ole varmennettavissa.
- Kaikkien neljän sivun leveys/korkeus ylittää 5 prosentin toleranssin. Vastakkaisleveyksien portti yksin läpäisee.
- Alasiipien päälistojen korkeus maasta vaihtelee yli 5 prosenttia. Etelässä etummainen U-siipi seisoo 34 pikseliä pääkirkkoa alempana kuvassa.
- Sivukuvissa näkyy kattopintoja ja U-siipien syvyyttä; vaakasuora ortografinen kamera ei toteudu puhtaasti.
- Maapohjan vaaleat laikut poistuvat, mutta luoteispuiston koilliskulman sisennys täyttyy sallitun korjausalueen ulkopuolella. Puiston muoto ei säily.
- Tuotantokuvia ei rajattu, skaalattu, maalattu tai yhdistelty jälkikäteen. Viat säilytetään diagnostiikassa.

Ikkunat ja arkadit on yksinkertaistettu suuriksi tummiksi syvennyksiksi; pienet kattoikkunat ja savupiiput jätetty pois. Kultaisen kupolin lyhty ja paksu kärki säilyvät. Puut ja pihojen kasvillisuus jätetty pois lähdeohjeen mukaan. Pihamäärän ja U-siiven muutokset ovat virheitä, eivät hyväksyttyjä yksinkertaistuksia. IGN-ortokuva ei osoittanut syytä poiketa tilauksen 3/4-pihajaosta.

arkki.jpg, sivumittaukset.png, ylakuva-QA.png, maapohja-QA.png ja maapohja-vertailu.png ovat arvioinnin apukuvia. Tuotantokuvia ei muokattu. Lähteet ja ilmansuuntien kahden ankkurin tarkistus LAHTEET.md:ssä.
