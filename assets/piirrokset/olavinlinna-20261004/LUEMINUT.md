# Olavinlinna — nimetyn mustepiirroksen toimitus 4.10.2026

Oma kaaviollinen aksonometrinen viivapiirros nykyisen Olavinlinnan säilyneistä rakennusosista. Piirroksessa on 37 nimettyä osaa: kolme säilynyttä tornia, päälinnan ja esilinnan pihat, siivet, bastionit, patterit, portit, ponttonisilta sekä pelin kahdeksan tilanimeä. Värinä on yksi mustesävy `#44372c`.

Piirros on rakennettu omista vektorimuodoista ja viivavarjostuksesta. Senaatin paikannuskartasta on tarkistettu rakennusosien nimet ja keskinäinen järjestys; kartan tai valokuvan viivoja ei ole jäljennetty eikä kolmannen osapuolen kuvaa sisälly toimitukseen. Tämä on havainnollistava piirros, ei mittapiirros tai huoneiden rakennusinventointi. Mittasuhteet ja korkeudet ovat pelkistettyjä.

## Tiedostot

- `olavinlinna-nimet.svg`: läpinäkyvä vektoritiedosto; muokattavat `<text>`-nimet Courier New -fontilla (Courier Primen kaltainen tasalevyinen fontti).
- `olavinlinna-lapinakyva.png`: 4096 × 3120, RGBA, tausta läpinäkyvä.
- `olavinlinna-pergamentti.png`: sama viivapiirros taustalla `#f3e6d0`, 4096 × 3120.
- `olavinlinna-pergamentti.svg`: sama vektoritiedosto pergamenttipohjalla.
- `esikatselu.png`: 1536 px leveä tarkistuskuva.
- `nimet-ja-kohdat.json`: nimitekstit, viittauskohdat ja lähdetiedot.
- `piirra.py`: piirroksen oma lähde; `vie.cjs`: SVG-rasterointi Sharpilla.
- `SHA256SUMS`: toimitettujen tiedostojen tarkistussummat.

SVG:ssä piirros on ryhmässä `piirros`, nimitekstit ryhmässä `nimet` ja johtoviivat ryhmässä `viittausviivat`. Mustejälkien maski jättää myös piirroksen sisäiset paperipinnat läpinäkyviksi. Etäviittaukset ja sisätilaviittaukset ovat erillään; sisätilojen ja pelin tulkintojen viivat ovat katkovaisia.

## Historialliset ja pelin tulkinnat

Kolmas säilynyt torni on **Kijlin torni**. **Pyhän Eerikin tornin jäännös** ja **Rautaportin paikka** on merkitty historiallisina paikkoina; ne eivät ole neljäs torni tai nykyinen sisäänkäynti. Nimet on erotettu nykyisestä ulkoasusta piirroksen selitteessä.

Pelin tilanimet säilyvät täsmälleen tilauksessa annettuina. Sisätilaviittaus osoittaa rakennusosan, ei näkyvää avattua huonetta. Kierreportaat ja vartiotupa on nimetty tulkinnoiksi. Keittiön, vartiotuvan ja laiturin tarkka sijoitus on pelin tulkinta. Nimeen ”Laituri ja kavassit” kuuluvia historiallisia kavasseja ei ole lisätty nykyiseen näkymään. Kausittainen oopperakatoksen rakenne on jätetty pois, jotta linnan piha ja rakennusosat voidaan nähdä.

## Nimet ja lähteet

Pelin lähteet ovat `js/dioraama/rakennukset/olavinlinna/`-kansion vastaavien tilojen otsikot ja sijoituskommentit (tarkistettu työpuun `5916fd1fc9984db71a811c918699cf8c58af12ec` tiedostoista). Virallisten nimien lähde on Päivi Hakanpään *Olavinlinnan arkeologisten kaivausten tutkimushistoriaselvitys* (Senaatti-kiinteistöt, 2019). Lähteen sivunumerot ovat painettuja sivunumeroita. Yhtään epävarmaa lisänimeä ei ole keksitty.

| Nimi | Mikä osa / tulkinnan raja | Lähde |
| --- | --- | --- |
| Kellotorni | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Kellotornin fatabuuri | Sisätila, B 101 | Peli: fatabuuri.js; Hakanpää 2019, s. 183 |
| Päälinnan pohjoissiipi | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Keskushalli ja väentupa | Pelin nimi; pohjoissiiven keskushalli D 101 | Peli: keskushalli.js; Hakanpää 2019, s. 193 |
| Adjutantin rakennus | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Päälinna (pääkastelli) | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Päälinnan piha | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6;  s. 33 |
| Läntinen kehämuuri | Päälinnan läntinen kehämuuri | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Tornin kierreportaat (tulkinta) | Pelin sisätilan tulkinta, ei rakennusinventointi | Peli: kierreportaat.js |
| Kellobastioni | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Uusi esilinna | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Pääportti | Piirrokseen merkitty nykyisen linnan rakennusosa | [Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), s. 56 |
| Vesiportin bastioni | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Ponttonisilta | Piirrokseen merkitty nykyisen linnan rakennusosa | [Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), s. 56 |
| Laituri ja kavassit | Nimi on pelistä; nykyisen laiturin paikka on kaaviollinen. Kavasseja ei ole piirretty nykyasuun. | Peli: laituri.js |
| Kirkkotorni | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Kirkkotornin kappeli | Tornin kappeli, kolmas kerros | Peli: kappeli.js |
| Muurinharja | Pelin kulkutila päälinnan pohjoisreunalla | Peli: muurinharja.js |
| Esilinnan pohjoissiipi | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Kijlin torni | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Suvorovin esilinna | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Itäpatteri | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Kotkaportti | Piirrokseen merkitty nykyisen linnan rakennusosa | [Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), s. 17 / K 104 |
| Tykistökasarmi | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Esilinnan piha | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6;  s. 17 |
| Päälinnan itäsiipi | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Linnan keittiö | Pieni linnanpiha, itäsiiven alakerta; paikka pelin tulkinta | Peli: keittio.js |
| Päälinnan porttikäytävä | Piirrokseen merkitty nykyisen linnan rakennusosa | [Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), s. 17 / E 102 |
| Kansliarakennus | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Vartiotupa (tulkinta) | Pelin tulkinta; tämän kuvan johtoviivan paikka ei todista nykyistä huonejakoa | Peli: vartiotupa.js |
| Paksu bastioni | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Eteläpatteri | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Panimoportti | Piirrokseen merkitty nykyisen linnan rakennusosa | [Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), s. 17 / N 109 |
| Pikkuportin bastioni | Piirrokseen merkitty nykyisen linnan rakennusosa | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Rautaportin paikka | Keskiaikaisen portin kaivauksessa todettu paikka, ei nykyinen sisäänkäynti | [Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), s. 17–18 |
| Kurtiini | Bastionien välinen muuri | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6 |
| Pyhän Eerikin tornin jäännös | Purettu torni: merkitty vain säilyneen alapohjan paikaksi | [Senaatti / Hakanpää 2019](https://www.senaatti.fi/app/uploads/2019/12/2019_Lyytinen_Olavinlinna-arkeologinen-selvitys.pdf), paikannuskartta s. 6;  s. 19 |
