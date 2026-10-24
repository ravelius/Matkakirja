# Alkulennon nimiteksti — tehtävä 947

Tarkka teksti: **KIELLETTY KAUPUNKI** ja sen alla pienempi **1914**. Kaksi erillistä läpinäkyvää riviä itsenäisiä sisääntuloja varten. Lämmin vaalea kullan/ivoryn sävy, klassinen antiikva, ohut tumma ääriviiva. Ei lisäsanoja, kehystä, taustalaattaa tai koristeviivaa.

## Viisi pyydettyä tiedostoa

| Tiedosto | Koko | Muoto |
|---|---:|---|
| alkulento-otsikko-rivi1.png | 3000 × 264 | RGBA |
| alkulento-otsikko-rivi2.png | 3000 × 1030 | RGBA |
| alkulento-otsikko-koko.png | 3000 × 476 | RGBA |
| esikatselu-vaaka.png | 2732 × 2048 | RGB |
| esikatselu-pysty.png | 2048 × 2732 | RGB |

Rivi2 on erillisenäkin pyynnön mukaisesti 3000 px leveä, joten **sitä ei näytetä samalla ruutuleveydellä kuin rivi1:tä**. Valmiissa sommitelmassa vuosiluvun ruutuleveys on 14 % pääotsikon leveydestä. Vuosiluku on keskitetty. `LAYOUT.json` sisältää täsmälliset koot ja sijainnit; yhdistelmässä pääotsikon alapuolella on 64 px väli ja vuoden sijoitus [1290,328,420,144]. Natiivi-UI vastaa rivien erillisistä häivytyksistä ja lähteen noin seitsemän sekunnin näyttöajasta, juna 210.

## QA ja alkuperäinen tarkkuus

Kaksi sisäänrakennetun image_gen-työkalun kokonaista generointia: koko nimiasettelu ja erillinen suuri vuosiluku. Native-kankaat ovat **2146 × 733** ja **2070 × 760**. Pääotsikon tekninen rajaus on 2054 × 176 ja vuosiluvun 1944 × 664. 3000 px -viennit ovat suhteellisesti skaalattuja (noin 1,46× ja 1,54×), eivät 3000 px:n natiivigenerointeja. Alkuperäiset ovat muuttumattomina `native/`-kansiossa.

Teksti tarkistettiin silmämääräisesti kirjain kerrallaan. Täysikokoiset vaalean ja tumman taustan alpha-vertailut tarkistettiin. PNG-riveillä ja yhdistelmällä on aito 0–255-alpha ja täysin läpinäkyvät ulkoreunat. Rajauksessa käytettiin näkyvän alphan rajoja ja turvamarginaalia; alkuperäisen kankaan etäistä lähes näkymätöntä alpha=1-kohinaa ei pidetty osana tiukkaa rajausta. Glyphien muotoja tai värejä ei maalattu jälkikäteen.

Esikatseluissa käytettiin täysikokoista alkuperäistä 810/01-liitettä (1448 × 1086), jonka SHA256 on varmennettu. Vaakaan se sovitettiin suhteellisesti; pystyyn se rajattiin keskeltä suhteellisella sovituksella. Taustakohtausta ei generoitu uudelleen. Otsikon ulkopuoliset pikselit vastaavat sovitettua pohjakuvaa. Molemmissa kaikki otsikon näkyvät pikselit ovat ylimmässä kolmanneksessa. **Nämä ovat havainnekuvan päälle tehtyjä sommitteluesikatseluja, eivät pelikuvia tai todiste pelin kytkennästä.**

`qa/QA.json` ja `DELIVERY-MANIFEST.json` sisältävät tarkistukset ja SHA256:t. `PROMPTS.json` ja `GENERATION-CALLS.json` säilyttävät lähtötiedot. `tools/export.py` kuvaa tekniset rajaukset ja sommittelun.

PT:n täysikokoinen hyväksyntä ja omistajalle ennen junaa näytettävä varsinainen pelikuva ovat vielä erillisiä vaiheita. Ei R2-toimitusta, 3D- tai pelimuutoksia, runtime-kytkentää, mergeä tai julkaisua. Aiempi 942b-tuotanto pysyy suljettuna.
