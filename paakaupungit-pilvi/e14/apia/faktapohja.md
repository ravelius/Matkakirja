# Apia — rajattu A-lähdekooste ja C:n väitepohja

Luettu 12.10.2026. Rajattu A, ei hyväksytty täysi faktapaketti. Pelin nykyinen kevyt sisältö ja maakehys luettu konteksti.json:sta. Lähteet noudettu yhteisen sallittu_haku.py:n kautta, robots ja redirectit tarkistettu ennen pyyntöjä. Koko aineisto ja SHA:t: valiaikainen/nopea-e14-apia/.

## 0. Luetut lähteet

- A1 https://en.wikipedia.org/wiki/Apia — johdanto, History, Geography, Climate, Administration, Features, Transport.
- A2 https://en.wikivoyage.org/wiki/Apia — Understand, Get in, Get around, See, Buy, Eat.
- A3 https://en.wikipedia.org/wiki/Robert_Louis_Stevenson — johdanto, Early writing and travels, Last years / Samoa, Death, Selected works.
- A4 https://en.wikipedia.org/wiki/Vailima,_Samoa — johdanto, Stevenson ja museokäyttö.
- A5 https://en.wikipedia.org/wiki/Mount_Vaea — Description, Stevenson, suojelualue, kohdekoordinaatti.
- A6 https://en.wikipedia.org/wiki/1889_Apia_cyclone — The growing storm, The cyclone. Artikkelissa puutteellisen viitteistyksen ilmoitus: yksityiskohtia ja määriä ei laajenneta.
- A7 https://en.wikivoyage.org/wiki/Samoa — Climate, Buy, Eat, Respect.
- A8 https://www.samoa.travel/discover/the-islands-of-samoa/upolu-island/apia/ — Apia, Samoa Cultural Village, Vailima ja Mount Vaea, torit, Papase'ea.
- A9 https://www.samoa.travel/discover/our-food-and-cuisine/markets/ — tuote-, ruoka- ja kalatorit, aamupäivä.
- A10 https://www.samoa.travel/discover/our-food-and-cuisine/ — umu, palusami, oka, hedelmät ja toriruoat.
- A11 https://robert-louis-stevenson.org/samoa-and-vailima/ — Richard Duryn Samoa/Vailima-kronologia ja katsaus teoksiin, kotiin ja postiyhteyteen.
- Papaseea Sliding Rocks -niminen en-WP-haku palautti HTTP 404. Sitä ei käytetä lähteenä. A8 tukee kohteen olemassaoloa ja luonnetta, mutta oman WP/WD-pisteen portti ei täyty.

## 1. 1873-kehys

A1 sijoittaa kaupunkiasutuksen synnyn 1800-luvun puoliväliin. Apia oli siis olemassa 1873; pääkaupunkiasemaa ei siirretä samaan vuoteen. A3 ja riippumaton A11 ajoittavat Stevensonin saapumisen ja Vailiman asumisen myöhempään 1800-lukuun. Vuorella ei siten ollut hänen kotiaan tai hautaansa 1873. Ei matkakirjamerkintää, isoisän käyntiä, kohtaamista tai reittiä.

Täsmällisiä perustamis-, rakennus-, julkaisu- tai kuolinvuosia ei julkaista C:n leipätekstissä. Lähteiden numeroista käytetään ajallisia suhteita (ennen saapumista, myöhemmin, vuosisata). Kiinteä 1873 on tehtävän vertailuvuosi.

## 2. Artikkeli ja perusfaktat

Apia on Samoan pääkaupunki Upolun pohjoisrannikolla (A1, A8). Vaisiganojoki laskee luonnonsatamaan; kapea rannikkotasanko, Mount Vaea etelässä ja harjanteet joen molemmin puolin (A1 Geography, A5).
Kaupungin nimi tulee pienestä Apia-kylästä, joka säilyy laajemmassa kaupunkialueessa (A1 History ja Administration). Kylän omaa johtajajärjestelmää tai määrättyä kylälukua ei esitetä, sillä yksityiskohtaisessa lähdevirkkeessä on citation needed.
Vailima, kirjailijakoti/museo, Tusitala, hauta vuorella (A3–A5, A8, A11).
Aarresaari ja Tohtori Jekyll ja herra Hyde julkaistiin ennen Samoa-vuosia (A3:n bibliografia ja asumisaika, A2 museoesittely); ei väitetä niiden syntyneen Apian maisemista.

Kontekstin asukasluku 35974 (2021) tarkoittaa Apia Urban Area -aluetta, ei pientä Apia-kylää. A2:n 42000 eroaa kontekstin tilastoviraston lopullisesta luvusta; A2:n lukua ei käytetä. Uudessa tekstissä ei ole väestölukua.
Kontekstin pallopiste on -13.8333, -171.8333, kun A1:n kaupunkipiste on -13.833, -171.750. Pallo kopioitiin työohjeen mukaisesti kontekstista. Ero on avoin paikkatiedon laadun kohta, ei peruste lainata kumpaakaan pistettä nähtävyydelle.

## 3. Kansinostojen väitteet

1. Pieni Apia suuren Apian sisällä: A1 History/Administration, A2 Eat (kylä, tie, rakennus osoitteen osana).
2. Laiva, joka pääsi ulos satamasta: A1 History ja A6 The cyclone. 1800-luvun lopun myrsky, Calliopen lähtö, muiden alusten uppoaminen tai vaurioituminen. A6 sanoo sataman olevan pohjoiseen avoin ja Calliopen selviytymisen liittyneen voimakkaisiin koneisiin. Ei uhrilukuja, alusmääriä, nopeuksia tai epävarmaa kansallisen ylpeyden motiiviselitystä.
3. Kaupunki joen ja harjanteiden välissä: A1 Geography, A5; fyysinen maasto ja nykykaupungin sijoittuminen.
4. Torilta oppii muutakin kuin ostamaan: A2 Buy/Eat, A8–A10. Fugalei ja linja-autojen lähtöpaikka, ruokatuotteet, käsityöt, erillinen kalatori, aamupäivä.

## 4. Kirjallisuusteeman väitteet

1. Aarresaari tuli ennen Samoa-vuosia: A3 bibliografia ja Samoa, A2 museoteksti, A11 (Samoa-vuosien Tyynenmeren teokset ja Skotlantiin sijoittuva Catriona). Ei kuvitteellista tapahtumapaikkaa pidetä Apian nähtävyytenä.
2. Tusitala oli paikallinen nimi: A3, A1 Features, A8; paikallinen nimi, tarinankertojan ammatti, perhe ja koti (A11).
3. Haudalla on kirjailijan oma runo: A3 Death, A5, A11. Valittu hautapaikka, samoalaisten kantama arkku, Requiem kaiverrettuna, Vailiman koti vuoren juurella. Runosta ei jäljennetä säkeitä.
4. Kutsu, joka jäi kirjeeseen: A3 Early writing and travels (kirjeenvaihto J. M. Barrien kanssa, kutsu Samoaan, eivät tavanneet), A3:n Colvin-yhteys ja Vailima Letters -bibliografia, A11:n säännöllinen postiyhteys ja suhde kirjallisiin piireihin.
Minitehtävä koskee Aarresaaren ajallista suhdetta Samoa-vuosiin, vastaus on saman sivun nostossa; ei toista visaa.

## 5. Matkailuoppaan väitteet

Faleolo kaupungin länsipuolella, taksi/majoituksen kuljetus, bussiyhteydet Upolulle, keskustan kävely ja osoitteiden kylänimet: A1 Transport, A2.
Satama, Beach Road, kaksi torityyppiä ja Samoa Cultural Villagen puunveisto/korinpunonta/siapo: A8, A9. Käsityöohjelman toteutumista ei luvata vakioaikana.
Vailiman museo ja vuoren retki: A2, A5, A8. Polku ja sadeolosuhteet: A2. Ei reittiin kuluvaa tarkkaa aikaa tai matkapituutta.
Papase'ea kerrotaan oppaassa vesiputouksina ja veden kuluttamina kallioina (A8), mutta ei ole kohdekartalla eikä nähtävyysjutussa. Ei liukumisohjeita.
Umu: kuumilla kivillä kypsentäminen (A7, A10); ei pelkkä kuoppauuni, sillä A10 täsmentää maanpäällisen kiviuunin.
Palusami: kookoskermainen lehtikäärö (A2, A7, A10). A10 sanoo kookoksenlehdet, A2/A7 taronlehdet; kasvilaji jätetty tekstistä pois eikä lähderistiriitaa peitetä.
Oka: raaka kala, kookoskerma ja sitrus (A10). Toriruoat, hedelmät, taro ja leipäpuun hedelmät (A2, A7, A8–A10).
Trooppinen lämpö, sateisuuden vaihtelu ja kuivemmankin ajan sadekuurot: A1 Climate, A2/A7; ei säädataan sidottavia numeroita. Sunnuntain palvelujen muutokset A2/A7, mutta ei absoluuttista väitettä kaiken sulkeutumisesta.

## 6. Kartta ja kohdejuttu: partial 1

- Mount Vaea -13.86361, -171.77361: A5:n vuoren oma koordinaatti, ei A2:n erillinen hautapiste tai Apian kaupunkipiste.
- Rajaus: vuoren pisteeseen noin 300 m:n marginaali. Laajemman historiallisen keskustan kohdeverkko avoin.
- Papase'ea: A8:n paikkafakta riittää oppaaseen; WP-haku 404, oma kohdepiste puuttuu, pois kartalta.
- Vailima: A4:n koordinaatti on kylän, ei varmennetun museorakennuksen. Pois kartalta.
- Satama, torit ja Palolo Deep: oman WP/WD-pisteen portti tarkistamatta, ei lainattuja kaupunki- tai Wikivoyage-pisteitä.
- Mount Vaean juttu: vuori, Lalovaea-nimen merkitys (A5), Vailima, suojelualue, hautauksen suhde vuoteen 1873, puolison tuhkan tuominen (A5), reitin olosuhteet (A2).

## 7. Kysymykset ja tiedot

5 kysymystä: Upolu (A1), Vaisigano (A1), Vailiman kirjailija (A3/A4), Tusitala (A3/A8), alkuperäinen kylänimi (A1). Wikipedia-URL, vihje ja faktaselitys joka kysymyksessä; tasot 1–3.
3 tietoa: kylä kaupungissa (A1), Aarresaari ennen Samoa-vuosia (A2/A3), koti ja hauta erillisinä paikkoina (A2/A4/A5).

## 8. Kuvat ja suojatut teokset

Ei B-valintaa, Commons-hakuja tai generointia. 19 kuvaroolissa kaikki neljä kenttää tyhjiä. Modernit katedraali, parlamentti, kellotorni, museon myöhemmät lisärakennukset ja muut teokset eivät ole karttakohteita. Mount Vaea on todellinen luonnonvuori: kuvan pitää esittää vuorta/maisemaa, ei naamioida hautamuistomerkkiä luonnonkohteeksi. Hautamonumentin ja pronssilaattojen tekijäketju jää B:lle; ne eivät kuulu tähän kuvavalintaan.

## 9. Avoimet portit

A on rajattu. Pienen pääkaupungin kartalla on yksi varmennettu luonnonkohde; täyden keskustakartan kohdevalinta ja muiden pisteiden sekä teosten suoja-aikojen varmennus avoinna. 19 kuvapaikkaa odottaa kuvaputkea. Saatiedot null, 48/48 primääriauditointi puuttuu; olemassa oleva saa.json koskematon. Riippumaton D, E/F, hyväksyntä, pelikytkentä ja julkaisu avoinna.
