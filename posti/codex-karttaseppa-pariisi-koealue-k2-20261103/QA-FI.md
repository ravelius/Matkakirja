# Pariisin koealue k2 — tarkistus 3.11.2026

## Tulos

Kuusi kokonaan uutta ehdokasta, täsmälleen yksi generointikutsu kuvaa kohti. Vanha k1-paketti ja sen 14 Karttasepän hyväksymää kuvaa on säilytetty. Tämä on kuuden ehdokkaan tarkistustoimitus, EI kuuden kuvan lopullinen laatuhyväksyntä.

- Neljä kattopintaa: suora yläkuva, seinättömyys sekä puiden ja nurmen poisto onnistuvat visuaalisessa tarkistuksessa. Sisäpihat ovat vaaleaa kiveä. **Tiukka saumattomuus EI läpäise**: offset- ja 2×2-toistotestissä kattoviivojen/katon rajojen kohdalla on yhä siirtymiä ja katkoksia. Pienempi sävyero ei yksin todista geometrista jatkuvuutta.
- Vesi: pystysauman numeerinen ero pienenee 13,41 → 7,54, mutta sisäisten vaakanaapurien ero on 2,99. Sauma on edelleen noin 2,52 kertaa sisäero. Aaltoviivojen jatkuvuutta ei merkitä hyväksytyksi. Sävy on hillitty harmaanvihreä ja toistossa aiempaa rauhallisempi.
- Louvre: valittu lähteen sallima vaihtoehto **ei lattiaa sisäpihoille**. Pihoissa on läpinäkyvyys eikä vihreällä taustalla näy vanhaa utuista länsireunaa. Tässä korjauskohdassa visuaalinen tarkistus läpäisee. Tyhjien alueiden alfa on näytteissä 0–1/255, joten täysin nollaa kaikkialla ei väitetä. Siivet mahtuvat kuvaan. Pienten sisäpihojen muoto, akselin tarkka kulma ja sijoitus OSM:ään jäävät Karttasepän pelivertailuun; kuvallinen samankaltaisuus ei ole mittatarkkuuskuitti.

## Tekninen vienti

Viisi pintaa 1024×1024 RGB, Louvre 2048×1024 RGBA, sRGB. Natiivit pinnat 1254×1254 ja Louvre 1774×887. Ainoastaan tekninen kokomuunnos: Lanczos, Louvressa esikerrottu alfa ja mittasuhteet säilyttävä sovitus. Ei maalausta, sauman sekoitusta, generatiivista osakorjausta eikä uusia kutsuja. Kuvitus tehtiin Codexin sisäisellä kuvageneraattorilla. Tarkat kuusi promptia ja viitteet ovat PROMPT-SET.jsonissa, tiedostokohtaiset hajautusarvot SHA256SUMSissa.

## Saumamittaus

Luku on vastakkaisten reunan vierekkäisten pikselien RGB-absoluuttieron keskiarvo asteikolla 0–255. Sisäero mitataan kaikista vastaavan suunnan naapuripikseleistä. Lukua luetaan yhdessä kuvallisen tarkistuksen kanssa.

| Pinta | Vasen–oikea | Sisäero vaakaan | Ylä–ala | Sisäero pystyyn |
|---|---:|---:|---:|---:|
| pinta-katto-haussmann.png | 15.21 | 14.26 | 15.97 | 13.36 |
| pinta-katto-vanha.png | 22.22 | 20.81 | 28.87 | 20.39 |
| pinta-katto-julkinen.png | 9.46 | 14.01 | 18.57 | 14.09 |
| pinta-katto-matala.png | 11.61 | 11.80 | 13.23 | 12.53 |
| pinta-vesi.png | 7.54 | 2.99 | 8.23 | 8.37 |

## Louvren ankkuri ja vastaanottotila

Uusi esineet.json-rivi: [1150, 580] lopullisen 2048×1024-kuvan vasemmasta yläkulmasta. Kyseessä on käsin arvioitu maanpinnan keskipiste käyttäen pyramidia viitteenä, EI ikkunan/katon keskipiste eikä automaattisesti varmennettu OSM-sovitus. Vanha [1290, 645] kuuluu vain k1-kuvaan. Tarkistuskuvassa risti näyttää uuden arvion. Vastaanottajan on tarkistettava ankkuri ja mittakaava pelissä.

Lähde: posti/karttaseppa-codex-pariisi-koealue-uusinta-20261103.md, commit 574dd2173966a07458f10f72fc90ce3ab47eddcd, blob 92834bdcf843db53fdf3e26b88a7e51ee7ff43b4 (sisältää Valosepän kasvillisuuslisäyksen). Myös edeltävä versio c3e42342936734aea6e4dc272c4a9584791ff619 on luettu kokonaan ja säilytetty source-versions.jsonissa.

Karttasepän k2-vastaanotto, saumojen hyväksyntä ja pelisijoitus ovat avoimia. Omistajan lopullinen pelikoosteen arvio ja julkaisu ovat erillisiä. Nykyisten k1-kuvien koekäyttö on lähteen mukaan käynnissä; tämä toimitus ei muuta peliä eikä väitä k2-kuvia kytketyiksi.
