# Tuileries — tilaus #1982 / 15e

Lähdeposti `posti/karttaseppa-codex-puutarhat-def-20261104.md`, commit `2154d7454c9e3c4145b0b177bc0302ce967ab569`, blob `22913f390432fd9f77548549d1fb52ae9594b658`. TILAUS.md ja kaikki 10 manifestitiedostoa luettu/tarkastettu ja SHA256-varmennettu. **Yksi varsinainen ImageGen-kutsu, yksi uusi kuva. Ei 15a–c-kuvien uusintaa. Puut sisältyvät tähän tilaukseen.**

PNG **1536 × 1024 RGBA**. Generoidut tavut ja alfa säilytetty muuttamattomina. SHA256 `65952759733efd5a8779caeb6380c9d94b3460f3cd2d2779bd62cb44570e1d3b`. Maski SHA256 `9fc80f5a9b26cc2ebfba8b8c84a6ecd9182573402435cded649d77feab4b5ea9`.

## Alfa

Näkyvän siluetin ero maskiin (alpha ≥ 128, XOR): **13363 px** = 4244 ulkopuolella + 9119 puuttuu sisältä. IoU 0.977852.

Täsmälliset alfa-arvot eroavat 0/255-maskista 619785 pikselissä; tähän sisältyy myös sisustan alpha254 vs maskin255, ei pelkkä ääriviivavirhe. Alfa min/max [0, 254]. Kahden pikselin reunavyöhykkeen ulkopuolella 14033 pikseliä alfa>0, 1043 alfa≥16 ja 493 alfa≥128. Kahdella pikselillä sisennetystä maskista puuttuu 4740 pikseliä alfa128-kynnyksellä. **Täsmällinen maski/max2px/ei-haloa-ehto ei läpäise.**

## Mitat ja sävyt

Pääakselin kahdessa näytteessä vaalea sisus 16,5 px; pieni käytävä 6,75 px. Pääkäytävän sisus on jo reunamustetta laskematta tavoitetta 12–15 px leveämpi. Menetelmä: kohtisuora profiili natiivikuvasta 0,25 px askelin, lähin pikseli, vaalea sisus R≥222/G≥190/B≥137/alfa≥128; epävarmuus noin ±2 px. Tämä ei ole reunamusteen sisältävä kokonaisleveys.

Pohjoisreunassa yksi suora tiheä rivi, lännessä ryhmät; ei puutarhan poikki kulkevaa riviä. Otannan leveys noin 55–65 px, paikoin tavoitetta 40–55 px suurempi. Koko reunan kattavuus ei vastaa ohjeen aloituskohtaa.

- west: vesialueen rajauksen keskipiste [449.5, 359.0], tavoite [457, 355], poikkeama [-7.5, 4.0] px; vesialueen rajaus [98, 91] px.
- middle: vesialueen rajauksen keskipiste [845.5, 551.0], tavoite [771, 506], poikkeama [74.5, 45.0] px; vesialueen rajaus [62, 63] px.
- east: vesialueen rajauksen keskipiste [1079.0, 660.0], tavoite [1085, 657], poikkeama [-6.0, 3.0] px; vesialueen rajaus [59, 61] px.

Altaiden mittaus käyttää käsin valitun alueen suurinta yhtenäistä harmaata vesialuetta ja sen rajauslaatikkoa; vaalea reunus ei sisälly vesimittoihin. Keskipisteet likimääräisiä, eivät pelin kytkentäkoordinaatteja.

**Näkyvän puuttoman nurmen otantakeski-RGB: 205.02 / 176.05 / 103.03.** Minimi 200 / 175 / 105; kaikki kolme kanavaa eivät yllä minimiin. Mittaus: 7 käsin valittua ja visuaalisesti tarkistettua 16×16 px nurmialuetta, alfa≥128 ja lähdemaskin sisällä, alkuperäiset RGB-arvot ilman taustayhdistelmää. Näytteet kattavat avoimia nurmikohtia, eivät kaikkia nurmipikseleitä. Ruutujen paikat ja yksittäiset keskiarvot QA-tiedostossa. Koko kuvan aiempaa väriluokittelua ei käytetä nurmituloksena, koska puut/vedet vääristävät sitä.

Koko puutarha itäosineen, kaksi läpinäkyvää rakennusaukkoa ja kolme allasta ovat mukana. Yksi pohjoisen pitkittäinen puurivi ja länsipään kaksi tiheää ryhmää; eteläreunassa pensasaita, ei poikittaista puuriviä. Pohjoisrivi alkaa vasta noin (580,150), ei ohjeen noin (460,55); osan latvusten leveys on silmämääräisesti noin 55–65 px, tavoite 40–55 px. Keskiallas on siirtynyt noin 87 px ohjekeskipisteestään. Ei rakennuksia, Seineä, katuja, ihmisiä tai tekstiä. Nurmen sininen kanava jää hieman minimin alle ja alfaraja poikkeaa maskista.

**Oma kokonais-QA: EI TÄYSIN LÄPÄISSYT.** Tämä on yhden sallitun oton arviointitoimitus poikkeamineen. Vastaanottajan arvio, mahdollinen koodisovitus, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat erillisiä eikä niitä väitetä varmennetuiksi.

Natiivi, koko kehote, mittausruudut ja QA: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-tuileries`. Työkalu: sisäänrakennettu image_gen.
