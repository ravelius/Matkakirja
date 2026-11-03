# A2 kortteli k3 – yksi otto, 3.11.2026

Tilaus #1940. Alkuperäinen generaattoritulos on suoraan pyydetty 1254 × 1254 RGB. Se toimitetaan tavuilleen muuttamattomana: ei skaalausta, rajausta, maalauskorjauksia, reunojen kopiointia tai saumojen sekoitusta. Yksi ImageGen-kutsu, ei uusintoja.

## Tarkistus
- Ensimmäinen viite oli Valosepän harmaa pohja. Toinen viite oli sen lähikuva; muut kaksi 2029-tyylikuva ja sen korttelirajaus. k2-kuva ja kulmaohje katsottiin lähdeaineistona, mutta niitä ei annettu generaattorille muoto-ohjeeksi.
- Kokonainen tiheä rivirakenne ja talojen sijoittelu seuraavat pohjaa selvästi. Kolme saman koordinaatin 160 × 160 px lähivertailua luoteesta, keskeltä ja kaakosta tarkistettiin 4× suurennettuna. Laajoja siirtoja, uusia katuja tai uusia puistoja ei näissä näy. Kaikkien 5248 talon laskentaa tai jokaisen rajan pikselitarkkaa säilymistä ei ole varmennettu.
- Laajat kattopinnat ovat mukana, eivätkä seinät ole kasvaneet k2:n hallitseviksi julkisivuiksi. Vaalean beigeharmaan kattopinnan ja seinäkaistaleen erottuvuus on silti vastaanottajan arvioitava: sävy on lämpimämpi ja vaaleampi kuin selvästi sinkinharmaa. Ikkunat ja savupiiput ovat pienen mittakaavan merkkejä; kuutta kerrosta ei voi luotettavasti laskea.
- 2 × 2 -toisto ja reunojen keskusristeys katsottiin. Yleiskuvassa ei synny leveää tyhjää saumakaistaa. Musteen ja sävyjen täysin katkeamatonta jatkumista reunojen yli en vahvista; suurennoksessa on paikallista epäjatkuvuutta.
- Vastakkaisten reunapikselien keskimääräinen RGB-ero: pohja x 5,34 / y 22,09; kuva x 25,88 / y 55,93. Tulos kertoo sävy-/mustejatkuvuuden muutoksesta, ei yksin geometriavirheestä.
- Karkea reunadiagnostiikka: 31,66 % pohjan vahvoista reunapikseleistä osuu kuvan vahvaan reunapikseliin samassa koordinaatissa, 87,90 % yhden pikselin ja 97,43 % kahden pikselin säteellä. Uudet musteviivat ja paperitekstuuri voivat tuottaa osumia, joten tämä EI todista muotojen säilymistä pikselilleen.

QA on tehty, mutta tiukkaa pikselitarkkuus- ja saumattomuusvaatimusta ei merkitä läpäistyksi. Toimitus on tarkastettava ehdokas. Karttaseppä tarkistaa muodot pohjaa vasten ja Keskustelukanava katselmoi ennen käyttöönottoa; runtimea tai julkaisua ei ole tehty.

Paikalliset tarkistuskuvat ja checks.json: output/pariisi-a2-k3-1940-20261103/qa. Täysi prompti ja viitteet: source-and-prompt.json. Työkalutila: oletus sisäänrakennettu ImageGen, läpinäkymätön tausta.
Lähdeposti a491a4162be5e7e80e4a7ddbd07fc2ab3eac6ae3 / blob 286dd4185ab3fb42fef6e07fcdb6debbbf85aba4. TILAUS.md ja kaikki yhdeksän SHA256SUMS-liitettä varmennettiin ennen generointia.
