# A2 kortteli k4 – yksi otto, 3.11.2026

Tilaus #1946 ja lähdetäsmennys #1947. Valosepän lopullinen pohja dd81be875031efe3a26a9fe6c819f181377c64d71cee48c89c06db66fb954ca5 tarkistettiin ennen yhtä uutta ImageGen-kutsua. Lähdekorjaus ei lisännyt ottoja. Alkuperäinen 1254 × 1254 RGB toimitetaan tavuilleen muuttamattomana, ilman skaalausta, rajausta, maskikorjausta tai saumojen sekoitusta.

## Havaittu
- Epäsäännöllinen korttelirakenne, pääasialliset kattopinnat, sisäpihat ja niiden sijainnit seuraavat pohjaa. Kolme 160 × 160 px lähivertailua samoista koordinaateista katsottiin 4× suurennoksina. k3:n täysin tasavälisiä vaakarivejä ei enää ole.
- Sinkkikatot ovat harmaita, seinä- ja pihapinnat kermanvaaleita. k3:n punertava värivaikutelma väheni. Kattojen reunoissa, harjoissa ja talojen rajoissa on selvästi piirrettyä tummaa mustetta. Kattoikkunoissa on piirretyt kehykset ja savupiipuissa pieniä pystymuotoja.
- Kattoikkunat pyydettiin vain etelälappeille. Tarkastelluissa lähikuvissa ne seuraavat etelään näkyviä lappeita, mutta kaikkien 3682 talon jokaista lape- ja ikkunasuuntaa ei ole erikseen varmennettu.
- Tarkistettiin 2 × 2 -toisto ja suurennettu saumojen risteys. Yleiskuvassa ei näy leveää tyhjää saumaa. Reunojen sävy-/mustejatkuvuus ja täysin pikselitarkka geometria jäävät Karttasepän lopputarkistukseen; en merkitse niitä todistetuiksi.
- Vastakkaisten reunapikselien keskimääräinen RGB-ero: pohja x 8,52 / y 5,82; kuva x 28,72 / y 29,41. Ero on diagnostiikkaa, ei yksin todiste geometriavirheestä.
- Pohjan vahvoista reunapikseleistä 42,43 % kohtaa vahvan muste-/tekstuurireunan samassa pikselissä, 96,35 % yhden pikselin ja 99,69 % kahden pikselin säteellä. Uusi muste ja tekstuuri tuottavat lisäreunoja; luvut eivät ole talojen tai muotojen pikselitarkan säilymisen todistus.
- Ei katuja, puita, nurmea, veneitä tai tekstiä havaittu. Sisäpihat ovat lähdepohjan sallimia vaaleita pintoja.

QA tehty; koko ja RGB-muoto läpäisevät. Yleinen muoto- ja tyylisuunta näyttää parantuneen, mutta tiukkaa jokaisen rajan / saumattomuuden / kaikkien ikkunoiden suuntien hyväksyntää ei anneta ilman vastaanottajan tarkistusta. qualityPass jää avoimeksi, ei automaattisesti hyväksytyksi.

Lähde 5c061e16b6f869f1d1d1d7788540966146d92944, päivitetty koko lähde luettu commitista ad0f3ee8985433217e88041d9707bfe7d6551e00 / blob 6ed16854f68e7971befb04c8fc4cc16ad3b00efa. Yhdeksän manifestitiedostoa varmennettiin uudelleen. Täsmällinen käytetty prompti viitteineen: effective-prompt.json. Oletus sisäänrakennettu ImageGen, läpinäkymätön tausta. k4:n nimenomainen harmaa/siniharmaa sinkkikatto-ohje oli katon sävyn ohje; paletin lämpimät sävyt säilyivät kivessä ja musteessa.

Tarkistuskuvat ja checks.json: output/pariisi-a2-k4-1946-20261103/qa. Karttasepän tarkistus ja sävysovitus sekä Keskustelukanavan katselmus ovat seuraavia vaiheita. Niitä, pelikytkentää tai julkaisua ei ole tässä tehty. Aiemmat k2/k3 säilyvät.
