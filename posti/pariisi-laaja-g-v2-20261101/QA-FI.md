# Pariisin laaja G v2 — QA 1.11.2026

Valittu toinen kokonaan uusi sisäisen ImageGenin otto. Alkuperäinen 1536 × 1024 RGB PNG on tavumuuttumaton: ei skaalausta, rajausta, värimuutosta tai G-alueen päälleliimausta. Ensimmäinen v2-otto säilytettiin paikallisesti mutta jätettiin toimituksesta, koska keskustan sijoittelu poikkesi liikaa.

## Tarkistetut tulokset

- Kaupungin matala ja leveä muoto, molemmat metsäpuistot, reilut paperimarginaalit sekä G:n suhteellinen sijainti ovat nyt lähellä annettua geometriapohjaa. V1:n voimakas pystyvenytys korjaantui.
- Värikkäiden selvästi piirrettyjen yksityiskohtien rajaus: x16–1518, y169–849. Maskin valkoinen alue: x17–1518, y172–850. Rajat ovat analyysin mukaan noin 1–3 pikselin päässä tavoitteesta. Tämä ei ole väite koko siluetin pikselitarkasta yhtenevyydestä.
- Samalla suuntaa-antavalla värikynnyksellä 4103 / 442216 piirrettyä pikseliä (0,93 %) on maskin ulkopuolella. Ensimmäisessä v2-otossa osuus oli 5,43 %. Luku ei ole peittokuva-alan virheprosentti: paperi, varjot ja vaaleat rakennukset jäävät menetelmän ulkopuolelle.
- G:n länsireunan (x612) turkoosin vesialueen pääjakso on sekä ohjeessa että ehdokkaassa y484–490. Idän (x837) haarat ovat samoilla alueilla: ohjeen y534–541 / ehdokkaan y534–545, sekä ohjeen y567–573 / ehdokkaan y568–576. Menetelmä on suuntaa-antava, koska sillat ja rannat katkovat sinisiä pikseleitä.
- Visuaalisesti Seine, Louvre ja Cité ovat nyt ohjeen pienessä G-ruudussa. Korttelit, joet ja puistot jatkuvat ympäristöön ilman piirrettyä kehystä. Ei tekstiä, lentokoneita tai lintuja.

## Jäljellä olevat poikkeamat ja vastaanottajan tarkistus

- Kaupunkimaskin reuna ei ole pikselitarkka, etenkin pienissä ulokkeissa ja puiden latvoissa. Yläreunassa on noin kolmen pikselin ylitys.
- G:n itäreunan kanavissa on muutaman pikselin leveys- ja sijoituseroja. Myös kadut, puut ja rakennusten yksityiskohdat on piirretty uudestaan. Lopullista G-kompositiota ja sen saumattomuutta ei ole varmennettu tässä toimituksessa.
- Tyyli on laajan kuvan mittakaavan vuoksi pienipiirteisempi kuin v1:ssä. Geometrian lukitus asetettiin v2-ohjeen mukaisesti etusijalle.
- Kuvassa on geometriapohjan kaltainen hyvin hienovarainen vaakasuora paperisävyn vaihtuminen ylä- ja alamarginaalin lähellä.

**Tila: toimitusehdokas vastaanottajan G-kompositio- ja saumavertailuun, ei väite pikselitarkasta geometriatestin läpäisystä.** Karttaseppä sijoittaa hyväksytyn alkuperäisen G-alueen paikalleen muuttamattomana lähdeohjeen mukaisesti ja tarkistaa saumat. Omistajahyväksyntä, runtime-kytkentä ja julkaisu ovat avoimia.
