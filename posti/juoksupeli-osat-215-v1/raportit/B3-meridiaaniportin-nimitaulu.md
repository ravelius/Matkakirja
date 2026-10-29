Toimituksessa valittu pinta: `pinnat/1270-meridiaaniportin-nimitaulu.png`. Kehote: `prompts/B3-meridiaaniportin-nimitaulu.txt`. Alla tuotannon lähde- ja tarkistusraportti; native-polut viittaavat säilytettyihin paikallisiin alkuperäisiin.

# B3 / #1270 — nimitaulun toimitusehdokas

Tiedosto: `final/1270-meridiaaniportin-nimitaulu-v2.png`, 1024 × 1024 px, RGB PNG, peittävä. SHA256: `319cd2ecb0990da65b865c31b3bf4617d8e28448626f4da3be7e1c7c28d58932`.

Yksi tasainen 2D-albedo, syvänsininen kenttä ja kultainen kehys/teksti. Teksti täsmälleen pystysuunnassa **午 / 門**. Ei lisäpikkutekstiä, kattoa, arkkitehtuuria, ympäristöä tai perspektiiviä. Maalatussa väripinnassa ei ole suunnattua valaistusta, heijastuksia tai heittovarjoja. Kultainen ulkoasu tehdään pigmenttivärillä, ei kuvaan leivotulla valolla.

Käyttö: yksi jaettu materiaali nimitaululle; väritila sRGB. Toisto pois (Clamp). UV-koko 1 × 1 kattaa koko pinnan. Fyysisiä mittoja ei keksitty: vastaanottaja sovittaa tekstuurin olemassa olevaan nimitaulun geometriaan. Läpinäkyvyyttä ei tarvita.

Generointikutsuja yhteensä 2. Valittu otto 2; ensimmäisen ehdokkaan kuvasuhde oli liian kapea, joten tehtiin kokonaan uusi neliöversio. Sisäänrakennettu ImageGen. Vanhoja pintoja 1067–1071, kattotiiltä tai 3D-osia ei muokattu.

Työntekijän silmämääräinen ja tekninen tarkistus: PASS. Kaksi merkkiä ja niiden järjestys tarkistettu museon lähivalokuvasta sekä toisesta valokuvasta; PNG avattu takaisin. Lopullinen pääsession QA, toimituskuitti ja vastaanottajan pelitarkistus ovat erilliset vaiheet. Tämä työntekijä ei lähettänyt tiedostoja postilaatikkoon eikä kytkenyt niitä peliin.


# B3 / #1270 — Meridiaaniportin nimitaulu

## Tilaus ja kuvallinen tavoite

Pelikoodarin koottu tilaus `posti/pelikoodari-codex-juoksupeli-osat-215-20261029.md`, commit `084f144e819e2a39b546911df1674d2d6a80cf28`, blob `0037d8bd8237c0584e1e2f53f9e1f81ff6642fe2`. Lisäksi `portti-06/OSAT.md`, `portti-06/7-nimitaulu.png` ja `portti-06/havainne-06.png` luettu/katsottu. Tilaus määrää sinisen, kultakehyksisen pintakuvan ja oikean taulun tekstin. Havainteen sumeaa lisäkirjoitusta ei jäljennetty.

## Varmennettu teksti

Oikean taulun kaksi merkkiä ovat **午** (U+5348) ylhäällä ja **門** (U+9580) alhaalla, luettuna pystyrivissä ylhäältä alas: **午門**. Alempi merkki on perinteinen 門, ei yksinkertaistettu 门. Museon omassa lähivalokuvassa oikean pystyvedon pää ei käänny ylöspäin koukuksi. Varmennus perustuu suoraan kuvan lukemiseen, ei sumean pelihavainteen tulkintaan. [Palace Museum: 午门](https://www.dpm.org.cn/explore/building/236454.html), [museon lähivalokuva](https://img.dpm.org.cn/Uploads/Picture/2020/07/03/s5efefcfb75914.jpg).

Sama kahden merkin järjestys ja kirjoitusasu tarkistettiin riippumattomasta valokuvasta: BrokenSphere, *Meridian Gate plaque*, oma valokuva, 23.10.2007. [Wikimedia Commons -tiedostosivu](https://commons.wikimedia.org/wiki/File:Meridian_Gate_plaque.JPG), [alkuperäinen kuva](https://upload.wikimedia.org/wikipedia/commons/3/31/Meridian_Gate_plaque.JPG). Valokuva on CC BY-SA 3.0 / muilla tiedostosivulla mainituilla vaihtoehtoisilla lisensseillä. Sitä käytettiin tekstin tarkistusnäyttönä; sitä ei annettu generointimallille eikä yhdistetty toimituskuvaan.

## Kehys ja toteutus

Todellisen museokuvan taulu on sininen, ja koristekehys on punainen kultaisilla reunaviivoilla. Tässä uudessa kuvassa kehys on tilauksen mukaisesti kokonaan kultainen ja suorakulmainen; historiallista koristekehyksen täsmäjäljennöstä ei väitetä. Museokuvasta otettiin kirjainten muodot ja järjestys, tilauksen havainnekuvasta sininen/kulta-väritys.

Kuva tehtiin kokonaan uutena kahdella sisäänrakennetun ImageGen-työkalun kutsulla; toinen neliöehdokas valittiin. Paikallisesti tehtiin vain kuvasuhteen säilyttävä koon pienennys 1254 × 1254 → 1024 × 1024 ja PNG-tallennus. Tekstiä ei ladottu tai maalattu jälkikäteen. Kehote: `prompts/attempt-02.txt`; alkuperäinen: `native/attempt-02.png`.

Lähdekuvat `references/`-kansiossa ovat paikallista tarkistusnäyttöä, eivät pelitekstuureja. Uuden pintakuvan käyttö ei edellytä niiden toimittamista pelipakettiin.

Ensimmäinen 1:2-ehdokas jäi historiaan, koska pelihavainteen kehys on lähes neliö. Uusi neliökuva generoitiin kokonaan uudelleen; ensimmäistä kuvaa ei venytetty.
