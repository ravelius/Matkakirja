# Jardin des Plantes — tilaus #1981 / 15d

Lähdeposti `posti/karttaseppa-codex-puutarhat-def-20261104.md`, commit `2154d7454c9e3c4145b0b177bc0302ce967ab569`, blob `22913f390432fd9f77548549d1fb52ae9594b658`. TILAUS.md ja kaikki 10 manifestitiedostoa luettu/tarkastettu ja SHA256-varmennettu. **Yksi varsinainen ImageGen-kutsu, yksi uusi kuva. Ei 15a–c-kuvien uusintaa. Puut sisältyvät tähän tilaukseen.**

PNG **1536 × 1024 RGBA**. Generoidut tavut ja alfa säilytetty muuttamattomina. SHA256 `f991db1e106c2ebb8180e9d0573c07e95137845129d7cefa4ba934a2fa2982af`. Maski SHA256 `f1cf3d6e22aaaad766d1d596d7e35cc9ff082856b9fd56f36c8991ba527a227f`.

## Alfa

Näkyvän siluetin ero maskiin (alpha ≥ 128, XOR): **3912 px** = 1658 ulkopuolella + 2254 puuttuu sisältä. IoU 0.990277.

Täsmälliset alfa-arvot eroavat 0/255-maskista 426055 pikselissä; tähän sisältyy myös sisustan alpha254 vs maskin255, ei pelkkä ääriviivavirhe. Alfa min/max [0, 254]. Kahden pikselin reunavyöhykkeen ulkopuolella 14008 pikseliä alfa>0, 55 alfa≥16 ja 18 alfa≥128. Kahdella pikselillä sisennetystä maskista puuttuu 126 pikseliä alfa128-kynnyksellä. **Täsmällinen maski/max2px/ei-haloa-ehto ei läpäise.**

## Mitat ja sävyt

Pitkittäisten suorien käytävien kahdessa näytteessä vaaleat sisukset 6,5 ja 7,5 px. Tummat reunat eivät sisälly lukuihin; koko käytävän 12–15 px tavoitetta ei tällä mittauksella vahvisteta. Menetelmä: kohtisuora profiili natiivikuvasta 0,25 px askelin, lähin pikseli, vaalea sisus R≥222/G≥190/B≥137/alfa≥128; epävarmuus noin ±2 px. Tämä ei ole reunamusteen sisältävä kokonaisleveys.

Etelän otantamittaukset noin 16–24 px ja pohjoisen noin 24–36 px; käsin arvioitu latvuksen ulkoraja natiivipikseliruudukosta, epävarmuus noin ±2 px. Limittäisistä puuryhmistä ei johdettu jokaisen latvuksen tarkkaa leveyttä. Mittarikuva qa/crowns-rulers.jpg.

Ei altaita.

Altaiden mittaus käyttää käsin valitun alueen suurinta yhtenäistä harmaata vesialuetta ja sen rajauslaatikkoa; vaalea reunus ei sisälly vesimittoihin. Keskipisteet likimääräisiä, eivät pelin kytkentäkoordinaatteja.

**Näkyvän puuttoman nurmen otantakeski-RGB: 214.0 / 181.62 / 98.12.** Minimi 200 / 175 / 105; kaikki kolme kanavaa eivät yllä minimiin. Mittaus: 6 käsin valittua ja visuaalisesti tarkistettua 16×16 px nurmialuetta, alfa≥128 ja lähdemaskin sisällä, alkuperäiset RGB-arvot ilman taustayhdistelmää. Näytteet kattavat avoimia nurmikohtia, eivät kaikkia nurmipikseleitä. Ruutujen paikat ja yksittäiset keskiarvot QA-tiedostossa. Koko kuvan aiempaa väriluokittelua ei käytetä nurmituloksena, koska puut/vedet vääristävät sitä.

Etelässä tiheät rinnakkaiset puurivit ja suorakulmaiset lohkot; pohjoisessa/lännessä tummat ryhmät ja avoimia nurmia. Ei spiraaleja, pieniä vesiä, rakennuksia tai tekstiä. Maskin rakennusaukot ovat läpinäkyviä. Osassa puista näkyy lyhyt runko; maapinta pysyy suorana ylhäältä katsottuna. Alfa ja nurmen kaikki kanavat eivät täytä täsmällisiä ehtoja.

**Oma kokonais-QA: EI TÄYSIN LÄPÄISSYT.** Tämä on yhden sallitun oton arviointitoimitus poikkeamineen. Vastaanottajan arvio, mahdollinen koodisovitus, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat erillisiä eikä niitä väitetä varmennetuiksi.

Natiivi, koko kehote, mittausruudut ja QA: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-jardin-des-plantes`. Työkalu: sisäänrakennettu image_gen.
