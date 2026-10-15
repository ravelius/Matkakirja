# Louvre K1–K7 — vastaanotto ja ensimmäisen kuvan toteutettavuus

Lähdetilaus, kulma-JSON, lähdeluettelo, viitattu tavoiteluupin kohta 2 sekä kaikki 27 kuvallista liitettä on luettu. Alkuperäiset 30 Louvre-tiedostoa ja viitattu yleisohje on tallennettu muuttamattomina NASille; SHA256-, Git-blob-, tekijä- ja lisenssitiedot säilyvät. Tämä on esitarkistus, ei havainnekuvien toimitus.

| Kulmat | Tarkka massan ja maskin koko |
|---|---|
| K1, K4, K6, K7 | 2400 × 1600|
| K2, K3 | 2400 × 1200|
| K5 | 2400 × 1350|

Kaikki seitsemän lähtömaskia ovat 8-bittisiä 0/255-PNG-kuvia ja vastaavat massakuvien kokoa. Tämä on tiedosto-/formaattitarkistus, ei oma riippumaton LiDAR-totuuden sertifikaatti. Joidenkin kuvien rakennukset jatkuvat kehysten yli: rajaus säilytetään eikä kameraa siirretä koko palatsin mahduttamiseksi.

K1:n lukittu kamera: ENU [-357,08;129,97;180] m, katse 110°, kallistus −23,47°, roll 0°, vfov 45°, koko 2400 × 1600. K2–K7:n täsmälliset arvot säilyvät alkuperäisessä JSONissa. K5:n 150 m etäisyys on origosta, tekstin 147 m pyramidista; ENU-arvoja ei muuteta tämän vuoksi. Kartan vanha K1–K8-legendateksti ei luo kahdeksatta tilausta.

K1:lle on valmisteltu kokonaan uuden kuvan kehote, referenssien erilliset roolit ja maskin hyväksymisprotokolla. Massakuva määrää kameran, siluetin ja rajauksen; Commons-kuvat vain kiven, katon ja arkkitehtuuridetaljien ilmeen. Pyramidit/altaat jätetään pois, patsas mukaan lähdekartan mukaan mutta maskin ulkopuolelle. Omaa maskia ei kopioida tavoitemaskista. Varsinaisen kuvan IoU on vielä null, koska kuvaa ei ole generoitu.95% hyväksymistä ei luvata ilman laskettua näyttöä. Ei mallinnusta tai mallikierroksia.

## Ennen generointia ratkaistava koko-/työkalupolku

Sisäisen kuvatoiminnon rajapinnassa ei ole erillistä kokoparametria. Juuri edellinen #280-koe palautti 1254 × 1254:n vaikka kehote pyysi 2048 × 2048:aa. Siksi 2400 pikselin toimituskokoa ei väitetä tuetuksi pelkän kehotteen perusteella; Louvre-kutsuja ei ole tehty.

Valmisteltu vaihtoehto on käyttäjän erikseen hyväksymä OpenAI API / asennetun imagegen-CLI:n polku. Sen paikalliset gpt-image-2-kokosäännöt hyväksyvät K1:n 2400 × 1600:n. Paikallinen API-avain on saatavilla, mutta avaimen arvoa ei ole luettu/tulostettu; API-kutsuja tai tilin mallipääsyn varmennusta ei ole tehty. API-polku ja sen erillinen laskutus odottavat suoraa käyttäjän valtuutusta.

K5:n 2400 × 1350 ei täytä kyseisen CLI:n 16 pikselin askelta. Jos API-polku myöhemmin hyväksytään, sama 16:9 voidaan tuottaa natiivina 2560 × 1440 ja pienentää tasaisesti 2400 × 1350:een (kerroin 0,9375). Tämä ei suurenna kuvan alkuperäistä tarkkuutta eikä leikkaa tai muuta kameraa. Menettelyä ei ole vielä tehty eikä K5 aloitettu.

Lähteen Q19675 viittaa Wikidatassa museoon; palatsin tunniste on Q1075988. Tunniste-ero on kirjattu lähdelinkkeineen, mutta tilauksen rakennusrajaus pysyy toimitetussa LiDAR-massassa.

K1 odottaa ensimmäisen kuvan natiivikokoisen työkalupolun päätöstä. K2–K7 odottavat yksi kuva kerrallaan -palautevaihetta. Unikuvia tai Petřín #274:ää ei jatkettu. Ei R2-vientiä, peli-integraatiota, main-yhdistämistä tai julkaisua.
