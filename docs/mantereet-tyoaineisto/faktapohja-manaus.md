# Manaus — faktakoostaja, uusi kaupunkilehti

Lauta-id `southamerica`, kaupunki-id `manaus`, en-Wikipedia "Manaus". Kaikki
tiedot haettu en-Wikipediasta 24.8.2026 (action=raw, uusinnat kasvavalla
viiveellä — yhtään 429-vastausta ei tällä kertaa tullut artikkelihauissa).
Malli ja mitat luettu tiedostoista `docs/aasia-tyoaineisto/lehtityo-resepti.md`,
`docs/moduulit/kaupunkilehti.md` sekä mallitiedostona
`docs/mantereet-tyoaineisto/faktapohja-bogota.md`. Sisältölinjaus
(alkuperäiskansat, kolonialismi, kumibuumin pakkotyö) tiedostosta
`docs/mantereet-tyoaineisto/spec-mantereet.md` (E-Amerikan yleiset
linjaukset, kohta "Sademetsä- ja alkuperäiskansakohteet"). Kaupungin visa on
tarkistettu tiedostosta `js/packs/southamerica-questions.js` (kohta
`manaus`, viisi kysymystä: kumibuumin aine, Encontro das Águas -ilmiö,
oopperatalo kumibuumin symbolina, kaupunkiin pääsy vain lentäen/laivalla,
miksi joet eivät sekoitu) — jokainen aihe esiintyy myös tässä
faktapohjassa, koska ne ovat kaupungin tarinan ydintä, mutta jokaisessa
kohdassa on käytetty tarkempia lukuja, eri näkökulmaa tai eri painotusta
kuin visan lyhyt vastaus, jottei mikään nosto anna visan vastausta suoraan
sen omalla sanamuodolla (ks. osio 7, kohta 1).

Luettu myös sivuartikkelit "Amazon Theatre", "Amazon rubber cycle",
"Meeting of Waters", "History of Manaus", "Metropolitan Cathedral of Our
Lady of the Conception, Manaus", "Mercado Adolpho Lisboa", "Customs House,
Manaus", "Palácio Rio Negro, Manaus", "Port of Manaus", "Rio Negro Bridge",
"Ajuricaba (chief)", "Baré", "Baniwa" ja "Ponta Negra, Manaus". Redirectit
seurattu ("Amazon rubber boom" → "Amazon rubber cycle", "Rio Negro Palace"
→ "Palácio Rio Negro, Manaus" — HUOM: on olemassa kaksi eri Palácio Rio
Negroa, yksi Petrópolisissa (presidentin kesäresidenssi) ja yksi Manausissa
(entinen kumiparonin talo, nyt museo); tähän faktapohjaan on käytetty
oikeaa Manausin artikkelia "Palácio Rio Negro, Manaus" tarkistettuna
kahdesti, koska ensimmäinen haku osui väärään kaupunkiin).

Sisältölinjaus (omistajan tilaus 24.8.2026): isoisän matkavuosi 1873 osuu
Manausiin poikkeuksellisen hyvin, koska kumibuumi (ajoitettu Wikipediassa
1879–1912) ei ollut vielä alkanut — kaupunki-sivun nosto K3 ja teemasivun
`kumibuumi` koko rakenne on pyritty asemoimaan niin, että lukija näkee
kaupungin sekä ennen (K3) että jälkeen (R1–R4) muutoksen. Alkuperäiskansat
on oma teemasivunsa `alkuperaiskansat` (ei pelkkä `historia`-sivun tausta)
samalla periaatteella kuin Bogotán `muisca`-sivu: manaó-, baré- ja
baniwa-kansat kuvataan sekä kaupungin nimen ja perustan antajina että
tämän päivän elävinä kansoina, ei kadonneena kuriositeettina.
Kumibuumin alkuperäiskansoihin kohdistama pakkotyö ja väkivalta (ks.
"Amazon rubber cycle", Effects on indigenous population) on Perussa,
Kolumbiassa ja Boliviassa dokumentoitu erittäin raa'asti, mutta
Manausin ja Amazonasin osavaltion (Brasilia) osalta artikkeli ei anna
yhtä yksityiskohtaista kuvausta paikallisista tapahtumista — tämä
faktapohja ei siis sisällä pakkotyön yksityiskohtia, koska niitä ei ole
suoraan Manausiin sidottuina lähteessä (ks. osio 7, kohta 8). Cabanagem-
kapina (1835–1840) on kerrottu toteavasti tapahtumana ilman
julmuuksien yksityiskohtia spec-mantereet.md:n periaatteen mukaisesti.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Manaus"

**Johdanto (216 merkkiä):**

> Manaus lepää sademetsän keskellä, tuhannen kilometrin päässä merestä –
> silti valtamerilaivat pääsivät sinne jokea pitkin. Kumibuumi teki
> 1800-luvun lopulla köyhästä rajakaupungista hetkeksi Etelä-Amerikan
> rikkaimman.

### Sivu B — teemasivu, ehdotettu id `kumibuumi`, nimi "Kumibuumi"

**Perustelu valinnalle:** Ei vakioaihe (`AIHE_IKONIT`-listalla ei ole
sopivaa valmista aihetta), mutta perusteltu poikkeus samalla logiikalla
kuin Bogotán `historia`-sivu: Manausin aineisto on poikkeuksellisen vahva
juuri kumibuumin ajanjaksolta (1879–1912), ja isoisän matkavuosi 1873
asettuu suoraan sen kynnykselle. Sivu kantaa sekä nousun (oopperatalo,
sähköistys, tullitalo) että romahduksen (siementen salakuljetus, kelluva
kaupunki) — kaari joka ei mahdu neljään kaupunkisivun nostoon.

**Johdanto (218 merkkiä):**

> Kumibuumi teki 1890- ja 1900-luvun taitteen Manausista maailman
> timanttikaupan keskuksen ja rakensi sademetsän keskelle oopperatalon.
> Rikkaus tuhoutui yhtä nopeasti kuin syntyi, kun kumipuun siemenet
> päätyivät Aasiaan.

### Sivu C — teemasivu, ehdotettu id `alkuperaiskansat`, nimi "Alkuperäiskansat"

**Perustelu valinnalle:** Ei vakioaihe, mutta perusteltu poikkeus samalla
logiikalla kuin Bogotán `muisca`-sivu ja Vancouverin
`alkuperaiskansat`-sivu (mainittu esikuvana kaupunkilehti.md:ssä).
Raamatun pilari 3
edellyttää manaó-, baré- ja baniwa-kansojen kertomista omasta,
nykyisestä näkökulmasta — ei vain `kumibuumi`-sivun taustana tai
kärsijöinä. Aineisto kantaa oman sivunsa: kaupungin nimen alkuperä,
päällikkö Ajuricaban vastarinta, baré-kansan nykyinen elämä Rio Negron
varrella ja Cabanagem-kapinan rooli osavaltion synnyssä.

**Johdanto (223 merkkiä):**

> Manausin nimi periytyy manaó-kansalta, joka auttoi rakentamaan
> kaupungin ensimmäisen linnoituksen. Manaó, baré, baniwa ja monet muut
> Rio Negron kansat elävät yhä samoilla vesillä – eivät historian, vaan
> nykypäivän kansoina.

---

## 2. Kaksitoista nostoehdotusta (4 + 4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Nimi joka vaihtui kolmesti" (495 merkkiä)**

> Kaupungin nimi vaihtui vuosikymmenten varrella useaan otteeseen.
> Manaó-, baré-, baniwa- ja passé-kansat auttoivat portugalilaisia
> rakentamaan São José da Barra do Rio Negro -linnoituksen 1669. Asutus
> korotettiin kylän asemaan 1832 ja kaupungin asemaan 1848 nimellä
> Cidade da Barra do Rio Negro – Rio Negron rannan kaupunki. Vasta 1856
> kuvernööri Herculano Ferreira Pena antoi kaupungille lopullisen nimen
> Manaus, kunnianosoituksena samannimiselle manaó-kansalle, jonka mailla
> kaupunki sijaitsee.

Faktat ja lähteet:
- Fort of São José da Barra do Rio Negro perustettiin 1669;
  manaó-, baré-, baniwa- ja passé-kansat asuivat linnoituksen paikalla
  ja auttoivat sen rakentamisessa. — en-Wikipedia "History of Manaus"
  (Foundation), "Manaus" (History)
- Asutus korotettiin kylän asemaan 13.11.1832 ja kaupungin asemaan
  24.10.1848 nimellä Cidade da Barra do Rio Negro. — en-Wikipedia
  "History of Manaus" (Imperial period)
- Kuvernööri Herculano Ferreira Pena antoi kaupungille lain nro 68
  mukaisesti nimen Manaus 4.9.1856, manaó-kansan kunniaksi. —
  en-Wikipedia "History of Manaus" (Imperial period), "Manaus"
  (johdanto, History)
- HUOM: en-Wikipedian artikkelit ovat keskenään ristiriitaisia siitä,
  oliko kaupungin nimi jo "Manaus" vuoden 1832 kylästatuksesta lähtien
  (näin sanoo pääartikkeli "Manaus") vai vasta vuodesta 1856 (näin sanoo
  tarkempi "History of Manaus") — ks. osio 7, kohta 1.

**Nosto K2 — "Vedet jotka eivät sekoitu" (508 merkkiä)**

> Manausin kohdalla tumma Rio Negro ja savenvärinen Solimões virtaavat
> rinnakkain sekoittumatta – ilmiötä kutsutaan nimellä Encontro das
> Águas. Rio Negro liikkuu noin kaksi kilometriä tunnissa 28-asteisena,
> Solimões neljästä kuuteen kilometriä tunnissa 22-asteisena; erot
> nopeudessa, lämpötilassa ja veden sameudessa pitävät virrat erillään.
> Wikipedian artikkelit ovat matkasta keskenään ristiriitaisia: yksi
> puhuu kuudesta kilometristä, kaksi muuta yhdeksästä – kumpaakaan
> lukua ei ole valittu tähän yksinään.

Faktat ja lähteet:
- Rio Negron tumma vesi ja Solimõesin (Amazonin) savenvärinen vesi
  virtaavat rinnakkain sekoittumatta; Rio Negro n. 2 km/h 28 °C:ssa,
  Solimões 4–6 km/h 22 °C:ssa. — en-Wikipedia "Meeting of Waters"
  (johdanto), "Manaus" (Meeting of Waters)
- "Meeting of Waters" -artikkeli sanoo ilmiön johtuvan lämpötila-,
  nopeus- ja sedimenttieroista; "Manaus"-artikkeli sen sijaan sanoo,
  ettei lämpötilan tai happamuuden uskota vaikuttavan sekoittumiseen
  merkittävästi, vaikka antaa samat lämpötilaluvut — suora sisäinen
  ristiriita, ks. osio 7, kohta 2.
- Matkan pituudesta ennen sekoittumista annetaan kaksi eri lukua:
  "Meeting of Waters" ja "Manaus" (Meeting of Waters -alaosio) sanovat
  6 km, kun taas "Manaus" (Sights and attractions) ja "Port of Manaus"
  sanovat 9 km. — ks. osio 7, kohta 3.

**Nosto K3 — "Kaupunki kumibuumin kynnyksellä" (534 merkkiä)**

> Isoisän matka-aikaan 1873 kumibuumi oli vasta alkamassa Manausissa –
> varsinainen buumi ajoitetaan vasta vuosiin 1879–1912. Vuoden 1872
> väestönlaskennan mukaan osavaltioon oli muuttanut 2 199 ulkomaalaista
> kumin perässä, suurin osa juuri Manausiin, ja samaan aikaan Brasilian
> koillisosan suuri kuivuus ajoi tuhansia pakolaisia kaupunkiin.
> Katedraalikin oli vielä rakenteilla – tulipalo oli tuhonnut edellisen
> 1850, ja uusi vihittiin käyttöön vasta 1878. Kuuluisaa oopperataloakaan
> ei ollut vielä edes ehdotettu; se tapahtui vasta 1881.

Faktat ja lähteet:
- Amazonin kumibuumi ajoitetaan Wikipediassa vuosiin 1879–1912. —
  en-Wikipedia "Amazon rubber cycle" (infobox, johdanto)
- Vuoden 1872 väestönlaskennan mukaan Amazonasin osavaltioon oli
  muuttanut 2 199 ulkomaalaista kumin houkuttelemana, suurin osa heistä
  asui Manausissa. — en-Wikipedia "History of Manaus" (Rubber era)
- Samaan aikaan Brasilian koillisosan suuri kuivuus (Grande Seca) ajoi
  suuria määriä pakolaisia Manausiin. — en-Wikipedia "History of
  Manaus" (Rubber era)
- Edellinen katedraalirakennus tuhoutui tulipalossa 1850; nykyinen
  rakennus avattiin virallisesti 1878. — en-Wikipedia "Metropolitan
  Cathedral of Our Lady of the Conception, Manaus" (History)
- Oopperatalon idean esitti ensimmäisen kerran kaupunginvaltuutettu
  Antonio José Fernandes Júnior vasta 1881. — en-Wikipedia "Amazon
  Theatre" (History)

**Nosto K4 — "Vapaakauppa-alue joka herätti kaupungin uudelleen" (504 merkkiä)**

> Kumin jälkeen Manaus vaipui köyhyyteen vuosikymmeniksi. Vuonna 1967
> sotilashallitus perusti Manausin vapaakauppa-alueen (Zona Franca),
> joka houkutteli verohelpotuksin elektroniikkatehtaita – muun muassa
> Nokian, Samsungin, LG:n ja Siemensin matkapuhelintehtaat. Kaupunki
> nousi jälleen yhdeksi Brasilian nopeimmin kasvavista talouksista:
> väkiluku ylitti miljoonan vuonna 1991 ja kaksi miljoonaa vuonna 2014,
> kaksinkertaistuen vain 23 vuodessa – aivan toisin kuin kumin
> jälkeisinä hiljaisina vuosikymmeninä.

Faktat ja lähteet:
- Sotilashallitus perusti Manausin vapaakauppa-alueen (Decree-Law 288)
  28.2.1967. — en-Wikipedia "History of Manaus" (Industrialization and
  growth), "Manaus" (Free Trade Zone)
- Nokia, Samsung, LG ja Siemens ylläpitävät matkapuhelintehtaita
  Manausissa. — en-Wikipedia "Manaus" (Economy)
- Väkiluku ylitti miljoonan 1991 ja kaksi miljoonaa 2014,
  "kaksinkertaistuen 23 vuodessa". — en-Wikipedia "History of Manaus"
  (Industrialization and growth)

### Teemasivu `kumibuumi` — 4 nostoa

**Nosto R1 — "Jalokivi keskellä sademetsää" (524 merkkiä)**

> Oopperatalon rakentaminen ei ollut nopea hanke. Idean esitti
> kaupunginvaltuutettu Antonio José Fernandes Júnior 1881, mutta
> rahoitus riitti vasta 1882 provinssin presidentin Paranaguán
> hyväksynnän jälkeen. Rakennustyöt alkoivat 1884 italialaisen
> arkkitehti Celestial Sacardimin johdolla ja etenivät hitaasti
> pysähdyksin vuoteen 1892 asti. Kattotiilet tuotiin Alsacesta,
> terässeinät Glasgow'sta ja marmori Italiasta; sisustus tuli
> Ranskasta. Talo vihittiin 31.12.1896, ja ensi-ilta, Ponchiellin La
> Gioconda, nähtiin 7.1.1897.

Faktat ja lähteet:
- Antonio José Fernandes Júnior esitti oopperatalon ideaa 1881;
  provinssin presidentti José Lustosa Paranaguá hyväksyi laajemman
  rahoituksen 1882 ja käynnisti suunnittelukilpailun. — en-Wikipedia
  "Amazon Theatre" (History)
- Rakennustyöt alkoivat 1884 italialaisen arkkitehti Celestial
  Sacardimin johdolla ja etenivät hitaasti pysähdyksin 1885–1892. —
  en-Wikipedia "Amazon Theatre" (History)
- Kattotiilet tuotiin Alsacesta, teräsrakenteet Glasgow'sta ja
  Carrara-marmori Italiasta; sisustus Ranskasta Louis Quinze -tyyliin.
  — en-Wikipedia "Amazon Theatre" (Architecture and style)
- Talo vihittiin 31.12.1896, ja ensimmäinen esitys, Ponchiellin ooppera
  La Gioconda, nähtiin 7.1.1897. — en-Wikipedia "Amazon Theatre"
  (History)

**Nosto R2 — "Sähköä ennen monia Euroopan kaupunkeja" (485 merkkiä)**

> Manaus oli ensimmäinen urbanisoitu ja toiseksi sähköistetty kaupunki
> Brasiliassa – vain Rio de Janeiron osavaltion Camposissa sähkö
> saatiin aiemmin. Kumirahat toivat kaupunkiin sähköiset raitiovaunut,
> puhelimet ja vesijohdot jo ennen kuin monilla Euroopan kaupungeilla
> oli sähköä lainkaan, ja samat rahat rakensivat myös kelluvan sataman.
> Kun kumin hinta sitten romahti, sähkögeneraattoreiden käyttö kävi
> liian kalliiksi, eikä Manaus kyennyt tuottamaan sähköä uudelleen
> moneen vuoteen.

Faktat ja lähteet:
- Manaus oli ensimmäinen urbanisoitu kaupunki Brasiliassa ja toinen
  sähköistetty (ensimmäinen oli Campos dos Goytacazes, Rio de Janeiron
  osavaltiossa). — en-Wikipedia "Amazon rubber cycle" (Rubber: sure
  wealth)
- Eduardo Ribeiron kuvernöörikaudella (alk. 1892) kaupunki sai
  sähköiset raitiovaunut, puhelimet, sähkön (toisena Brasiliassa) ja
  vesijohdot sekä kelluvan sataman. — en-Wikipedia "History of Manaus"
  (Rubber era)
- Kumibuumi mahdollisti kaupungin sähköistyksen ennen monia Euroopan
  kaupunkeja, mutta buumin loputtua generaattoreiden käyttökustannukset
  kävivät liian kalliiksi eikä kaupunki kyennyt tuottamaan sähköä
  uudelleen vuosiin. — en-Wikipedia "Manaus" (Rubber boom)

**Nosto R3 — "Tullitalo joka purjehti Lontoosta asti" (526 merkkiä)**

> Manausin tullitalo (Alfândega) rakennettiin osana sataman uudistusta:
> esivalmisteiset tiiliseinät tuotiin laivalla Englannista Manausiin,
> koska Amazonasta itsestään ei löytynyt sopivaa rakennusmateriaalia,
> ja urakan sai englantilainen Manaos Harbour Limited. Rakennustyöt
> alkoivat 1906, ja vartiotorni Guardamoria valmistui 1909. Kumibuumin
> huipulla Manausin
> asukaskohtainen tulotaso oli kaksinkertainen kahvia tuottaviin São
> Pauloon ja Rio de Janeiroon verrattuna, ja kaupungista tuli hetkeksi
> maailman timanttikaupan keskus.

Faktat ja lähteet:
- Tullitalon esivalmisteiset tiiliseinäelementit tuotiin Englannista,
  koska Amazonasin alueelta ei löytynyt sopivaa rakennusmateriaalia;
  rakennustyöt alkoivat 1906. — en-Wikipedia "Customs House, Manaus"
  (johdanto, History)
- Vartiotorni Guardamoria vihittiin käyttöön 17.1.1909. — en-Wikipedia
  "Customs House, Manaus" (History)
- Kumibuumin huipulla (1890–1920) Manausin asukaskohtainen tulotaso
  oli kaksinkertainen verrattuna kahvintuotantoalueisiin São Pauloon,
  Rio de Janeiroon ja Espírito Santoon; kaupungista tuli maailman
  timanttikaupan keskus. — en-Wikipedia "Amazon rubber cycle" (The
  Brazilian Apogee, elegance, and luxury)

**Nosto R4 — "Siemenet jotka päättivät kaiken" (503 merkkiä)**

> Vuonna 1876 englantilainen Henry Wickham salakuljetti 70 000
> kumipuun siementä Amazonilta Lontooseen, mistä ne päätyivät
> Britannian siirtomaiden Malesian ja Ceylonin plantaaseille. Aasian
> viljelmät tuottivat halvempaa kumia tehokkaammin, ja vuoteen 1910
> mennessä ne olivat murtaneet Amazonin monopolin. Manaus vaipui
> talouskriisiin: ylelliset tuontitavarat loppuivat, rakennukset
> hylättiin, ja 1920-luvulla työttömät kumintappajat rakensivat
> kaupungin laitamille "kelluvan kaupungin", cidade flutuanten.

Faktat ja lähteet:
- Henry Wickham salakuljetti 70 000 kumipuun siementä Brasiliasta
  1876; niistä kasvatetut puut istutettiin Britannian siirtomaihin
  Malesiaan, Sri Lankaan ja tropiikin Afrikkaan. — en-Wikipedia
  "Amazon rubber cycle" (End of the Amazon's rubber monopoly)
- Vuoteen 1910 mennessä Aasian tehokkaampi ja halvempi kumintuotanto
  oli murtanut Amazonin rubber-monopolin; Manausin kauppa kriisiytyi ja
  ylellisyystuonti romahti. — en-Wikipedia "History of Manaus" (Rubber
  era)
- Asuntopulan vuoksi työttömät rakensivat 1920-luvulla "kelluvan
  kaupungin" (cidade flutuante), joka vakiintui 1960-luvulla. —
  en-Wikipedia "Amazon rubber cycle" (End of the Amazon's rubber
  monopoly)

### Teemasivu `alkuperaiskansat` — 4 nostoa

**Nosto A1 — "Kansat jotka rakensivat linnoituksen" (460 merkkiä)**

> Ennen portugalilaisia Rio Negron rannalla asui manaó-, baré-,
> baniwa- ja passé-kansaa. Kun portugalilaiset 1669 rakensivat São
> José da Barra do Rio Negro -linnoituksen, juuri nämä kansat auttoivat
> sen rakentamisessa ja asettuivat sen läheisyyteen. Manaót
> kieltäytyivät orjatyöstä ja ryhtyivät vastarintaan; vasta avioliitot
> paikallisten kasiikkien tyttärien kanssa toivat rauhan ja synnyttivät
> caboclo-väestön. Kaupungin nykyinen nimi periytyy juuri manaóilta.

Faktat ja lähteet:
- Linnoituksen paikalla asui ensin manaó-, baré-, baniwa- ja
  passé-kansaa, jotka auttoivat sen rakentamisessa ja asettuivat sen
  läheisyyteen. — en-Wikipedia "History of Manaus" (First peoples and
  European colonization)
- Manaó-kansa kieltäytyi orjatyöstä ja ajautui yhteenottoon
  siirtomaaherrojen kanssa; taistelut laantuivat vasta kun
  portugalilaiset alkoivat solmia avioliittoja kasiikkien tyttärien
  kanssa, mikä synnytti caboclo-väestön. — en-Wikipedia "History of
  Manaus" (First peoples and European colonization)
- Kaupungin nimi Manaus periytyy manaó-kansalta. — en-Wikipedia
  "Manaus" (Etymology)

**Nosto A2 — "Päällikkö joka ei antautunut" (569 merkkiä)**

> Manaó-kansan johtaja Ajuricaba vastusti 1720-luvulla portugalilaisten
> yrityksiä orjuuttaa hänen kansaansa ja liittoutui sen sijaan
> Alankomaiden kanssa, joka oli Portugalin silloinen vihollinen
> Amazonilla. Hän kuljetti kanootissaan Alankomaiden lippua uhmana
> Portugalin vallalle, ja portugalilaiset pelkäsivät hänen esimerkkinsä
> innostavan muitakin alkuperäiskansoja kapinaan. Vangittuna ja matkalla
> oikeuden eteen hän hyppäsi jokeen ja hukkui mieluummin kuin alistui –
> noin vuonna 1728. Kaupunki, joka myöhemmin sai nimensä hänen
> kansaltaan, kantaa yhä hänen muistoaan.

Faktat ja lähteet:
- Ajuricaba oli manaó-kansan johtaja, joka vastusti orjuutusta ja
  liittoutui Alankomaiden kanssa; hän kuljetti kanootissaan
  Alankomaiden lippua Portugalin vallan uhmaamiseksi. — en-Wikipedia
  "Ajuricaba (chief)" (johdanto)
- Portugalilaiset pelkäsivät hänen vastarintansa innostavan muita
  alkuperäiskansoja ja orjuutettuja afrikkalaisia kapinaan, mikä johti
  sotilaskampanjaan ("guerra justa"). — en-Wikipedia "Ajuricaba
  (chief)" (johdanto)
- Vangittuna ja matkalla portugalilaisten oikeuden eteen Ajuricaba
  hyppäsi jokeen ja hukkui, noin vuonna 1728. — en-Wikipedia "Ajuricaba
  (chief)" (Biography)
- Manaus-kaupunki on nimetty Ajuricaban kansan, manaóiden, mukaan. —
  en-Wikipedia "Ajuricaba (chief)" (Honors)

**Nosto A3 — "Kansa joka elää yhä Rio Negron varrella" (458 merkkiä)**

> Baré-kansaa elää nykyään noin 11 500 henkeä Amazonasin osavaltiossa –
> he asuvat pääasiassa Rio Negron yläjuoksulla ja Xié-joella, elävät
> maanviljelystä, metsästyksestä, kalastuksesta ja piassava-kuidun
> keruusta. Alkuperäinen baré-kieli on lähes sammunut, mutta yhteisö
> puhuu yhä nheengatua, karmeliittalähetyssaarnaajien aikoinaan
> levittämää yhteiskieltä. Osa yhteisöistä on protestantteja, osa
> katolisia, ja monissa kylissä parantajina toimii yhä šamaaneja.

Faktat ja lähteet:
- Baré-kansaa oli Brasiliassa (Amazonasin osavaltiossa) 11 472 henkeä
  vuoden 2014 tiedon mukaan; he asuvat pääasiassa Xié-joella ja Rio
  Negron yläjuoksulla, elävät maanviljelystä, metsästyksestä,
  kalastuksesta, keräilystä ja piassava-kuidun myynnistä. —
  en-Wikipedia "Baré" (infobox, Locations, Traditional life)
- Baré-kieli on lähes sammunut (vain kaksi puhujaa 2012); yhteisö
  puhuu nykyään nheengatua, karmeliittalähetystyön aikoinaan
  levittämää lingua francaa. — en-Wikipedia "Baré" (Languages and
  population)
- Osa Baré-yhteisöistä on protestantteja, osa katolisia, ja molemmat
  ryhmät käyttävät yhä perinteisiä šamaaneja parantajina. —
  en-Wikipedia "Baré" (Locations)

**Nosto A4 — "Kapina joka synnytti osavaltion" (517 merkkiä)**

> Vuosina 1835–1840 köyhät vapaat miehet, erityisesti alkuperäiskansojen
> ja mestitsien jälkeläiset, nousivat kapinaan Grão-Parán valkoista
> poliittista eliittiä vastaan ja valtasivat vallan – kapinaa kutsutaan
> cabanagemiksi, kapinallisia cabanoiksi mökkiensä mukaan. Alto
> Amazonasin, nykyisen Manausin seudun, osallistuminen kapinaan oli
> ratkaisevaa nykyisen Amazonasin osavaltion synnylle: alueen väestö
> yhdistyi liikkeen ympärille yli etnisten rajojen. Kapina väljensi
> Grão-Parán väkiluvun noin 100 000:sta 60 000:een.

Faktat ja lähteet:
- Cabanagem oli 1835–1840 Grão-Parássa käyty kapina, jossa mustat,
  alkuperäiskansat ja mestitsit taistelivat valkoista poliittista
  eliittiä vastaan ja valtasivat vallan. — en-Wikipedia "Manaus"
  (Cabanagem)
- Alto Amazonasin (nykyisen Manausin seudun) osallistuminen kapinaan
  oli ratkaisevaa nykyisen Amazonasin osavaltion synnylle; taistelijat
  keräsivät kannattajia laajalti alueen väestöstä. — en-Wikipedia
  "History of Manaus" (Imperial period)
- Kapina laski silloisen Grão-Parán väkiluvun noin 100 000:sta
  60 000:een. — en-Wikipedia "Manaus" (Cabanagem)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja.

**Jakso 1 — "Perille ja liikkeelle"**

> Manausiin ei edelleenkään johda tietä muusta Brasiliasta: The
> Independent totesi vielä 2014, että "Manausiin ei ole teitä". BR-174
> vie pohjoiseen Venezuelaan ja BR-319 etelään, mutta jälkimmäinen
> vaatii lautan yli Rio Negron ja päättyy sorateihin ennen Porto
> Velhoa. Käytännössä kaikki liikenne kulkee ilmassa tai vedessä:
> Eduardo Gomesin lentokentältä tai jokilaivoilla, joilla
> valtameriveneetkin pääsevät perille.

Faktat ja lähteet:
- The Independent totesi 2014, ettei Manausiin ole teitä muualta
  Brasiliasta. — en-Wikipedia "Manaus" (Highways)
- BR-174 johtaa pohjoiseen Boa Vistaan ja Venezuelaan; BR-319 etelään
  Porto Velhoon, mutta vaatii lautan Rio Negron yli ja on päällystetty
  vain n. 100 km matkalta ennen sorateitä. — en-Wikipedia "Manaus"
  (Highways)
- Eduardo Gomes International Airport palvelee Manausia; suurin osa
  liikenteestä kulkee lentäen tai veneellä. — en-Wikipedia "Manaus"
  (Airports)

**Jakso 2 — "Luonto keskellä kaupunkia"**

> Vaikka Manaus on keskellä sademetsää, kaupungissa itsessään on
> yllättävän vähän vihreää – suurimmat viheralueet ovat pienehköjä
> puistoja. Mindún puisto on yksi harvoista elinympäristöistä
> uhanalaiselle tamariinille (pied tamarin), apinalajille jota
> tavataan luonnossa vain Manausin seudulla. Kaupungin ulkopuolella
> sijaitsee Anavilhanasin kansallispuisto, yksi maailman suurimmista
> jokisaaristoista.

Faktat ja lähteet:
- Manaus on tiheästi rakennettu ja sillä on vähän viheralueita
  sademetsäsijainnista huolimatta; suurin puisto on Mindún puisto
  (per. 1989). — en-Wikipedia "Manaus" (Green areas)
- Mindún puisto on yksi harvoista jäljellä olevista elinympäristöistä
  uhanalaiselle tamariinille (pied tamarin), joka elää luonnossa vain
  Manausin seudulla. — en-Wikipedia "Manaus" (Green areas, Sights and
  attractions)
- Anavilhanas National Park on osa kaupungin liepeillä sijaitsevaa
  suojelualuetta. — en-Wikipedia "Manaus" (Green areas)

**Jakso 3 — "Arjen ilmiö: Armeijan eläintarha"**

> Manausissa julkinen eläintarha on Brasilian armeijan ylläpitämä:
> CIGS-eläintarhassa (Centro de Instrução de Guerra na Selva) on noin
> 300 lajia Amazonin eläimistöä. Tarha perustettiin alun perin
> viidakkosotakoulutuksen tarpeisiin, jotta sotilaat oppisivat
> tunnistamaan alueen eläimistön – nykyään se on avoinna myös
> yleisölle ja tavallisille matkailijoille.

Faktat ja lähteet:
- CIGS-eläintarhaa ylläpitää Brasilian armeija, ja siellä on n. 300
  Amazonin eläinlajia; tarha on avoinna yleisölle. — en-Wikipedia
  "Manaus" (CIGS Zoo)

**Jakso 4 — "Historian käännekohta: Katedraali joka nousi tuhkasta"**

> Manausin katedraalin edeltäjä tuhoutui tulipalossa 1850. Uusi
> rakennus tehtiin kreikkalaistyyliin lähes kokonaan Portugalista
> tuoduista materiaaleista: kuusi kirkonkelloa valettiin
> portugalilaisessa valimossa, ja alttarit veistettiin Lissabonin
> kalkkikivestä. Kirkko avattiin 1878 – viisi vuotta isoisän matkan
> jälkeen – ja siitä tuli hiippakunnan katedraali vasta 1946.

Faktat ja lähteet:
- Edeltävä kirkkorakennus tuhoutui tulipalossa 1850. — en-Wikipedia
  "Metropolitan Cathedral of Our Lady of the Conception, Manaus"
  (History)
- Nykyinen rakennus on kreikkalaistyylinen ja rakennettu suurelta osin
  Portugalista tuoduista materiaaleista: kuusi kelloa portugalilaisesta
  valimosta, alttarit Lissabonin kalkkikivestä. — en-Wikipedia
  "Metropolitan Cathedral of Our Lady of the Conception, Manaus"
  (infobox, History)
- Kirkko avattiin virallisesti 1878; hiippakunta perustettiin 1892 ja
  rakennus sai katedraaliaseman vasta 1946. — en-Wikipedia
  "Metropolitan Cathedral of Our Lady of the Conception, Manaus"
  (History)

**Jakso 5 — "Milloin kannattaa tulla"**

> Manausissa ei ole varsinaisia vuodenaikoja lämpötilan mukaan –
> keskilämpötila pysyy ympäri vuoden noin 27 asteessa. Heinä-syyskuu
> on suhteellisen kuiva, joulu-toukokuu hyvin sateinen. Kaupungin
> rannat syntyvät vasta elo-marraskuussa, kun jokien pinta laskee;
> joulukuusta alkaen vesi nousee ja peittää hiekat jälleen.

Faktat ja lähteet: ks. osio 5 (Säätiedot) — samat luvut, samat lähteet.

---

## 4. Yhdeksän kohdekartan kohdetta

**HUOM (spec-mantereet.md kohta 4 — kohdekartan keskusta valitaan
historiallisen ytimen mukaan, ei hallinnollisen koordinaattipisteen):**
Manaus-artikkelin infobox ei anna suoraa koordinaattia tekstissä (viittaa
Wikidataan); haettu erikseen MediaWikin coordinates-rajapinnasta:
−3,1189°N, −60,0217°W. Tämä piste on n. 1,3 km POHJOISEEN historiallisesta
ytimestä (Teatro Amazonas / Praça São Sebastião, Centro-kaupunginosa) —
ero on paljon pienempi kuin Bogotán tai San Franciscon ennakkotapauksissa,
mutta silti olemassa, joten kartan ankkuriksi on Bogotán ja San Franciscon
ennakkotapausten periaatteen mukaisesti valittu historiallinen ydin
(Teatro Amazonas) eikä Wikidata-piste. Etäisyydet alla ovat OMIA
LASKELMIANI koordinaattieroista (asteet × 111 km, pituusasteille kerrottu
cos(3,13°) ≈ 0,9985), tarkistettu Node-skriptillä.

| # | Nimi suomeksi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta ankkurista (Teatro Amazonas) |
|---|---|---|---|---|
| 1 | Teatro Amazonas / Amazon-teatteri (ankkuripiste) | 3,13028°S 60,02333°W | "Amazon Theatre" | (ankkuripiste) |
| 2 | Mercado Adolpho Lisboa | 3,13996°S 60,02300°W | "Mercado Adolpho Lisboa" | ~1,07 km etelään |
| 3 | Katedraali (Nossa Senhora da Conceição) | 3,13520°S 60,02550°W | "Metropolitan Cathedral of Our Lady of the Conception, Manaus" | ~0,60 km lounaaseen |
| 4 | Tullitalo (Alfândega) | 3,13744°S 60,02511°W | "Customs House, Manaus" | ~0,82 km etelään |
| 5 | Palácio Rio Negro (kumiparonin talo, nyt museo) | 3,13510°S 60,01680°W | "Palácio Rio Negro, Manaus" | ~0,90 km kaakkoon |
| 6 | Rio Negro -silta | 3,12194°S 60,07944°W | "Rio Negro Bridge" | ~6,29 km länteen |
| 7 | Manausin satama | 3,14306°S 60,01706°W | "Port of Manaus" | ~1,58 km kaakkoon |
| 8 | Encontro das Águas (vesien kohtaaminen) | 3,13667°S 59,90472°W | "Meeting of Waters" | ~13,2 km itään |
| 9 | Ponta Negra -ranta | 3,04821°S 60,08956°W | "Ponta Negra, Manaus" | ~11,7 km luoteeseen |

**Rajausehdotus:** Kohteet 1–7 mahtuvat n. 1,5 km × 2 km alueeseen
Centro-kaupunginosassa ja mahtuvat samalle tiiviille zoomaustasolle.
Kohteet 8 ja 9 ovat n. 12–13 km päässä ja kannattaa näyttää joko omalla
zoomaustasollaan tai selkeästi merkittyinä retkikohteina — molemmat ovat
kuitenkin olennainen osa kaupungin tarinaa (Encontro das Águas on nosto K2
ja koko vesien-kohtaaminen-teema; Ponta Negra on kaupungin tunnetuin
uimaranta, mainittu jaksossa 5) eikä niitä pidä jättää kartalta pois vain
etäisyyden vuoksi.

---

## 5. Säätiedot

- **Historiallisen ytimen (Teatro Amazonas) koordinaatit:** 3,13028°S,
  60,02333°W. — en-Wikipedia "Amazon Theatre" (infobox)
- **Köppen-luokka:** Am (trooppinen monsuuni-ilmasto) — juuri niin kuiva
  kuivimpana kuukautena, ettei luokitu sademetsäilmastoksi (Af). —
  en-Wikipedia "Manaus" (Climate)
- **Lämpötila:** vuoden keskiarvo (kompensoitu) 27,4 °C.
  Kuukausikeskiarvot (INMET, 1991–2020 normaalit) vaihtelevat
  26,6–28,6 °C:n välillä. — en-Wikipedia "Manaus" (Climate, weatherbox)
- **Ennätykset (weatherbox, INMET 1991–2020, ääriarvot alkaen 1872):**
  korkein mitattu 38,3 °C, alin 12,1 °C. HUOM: leipäteksti antaa eri
  luvut — INMET:n mukaan korkein mitattu lämpötila oli 39,0 °C (2015)
  ja alin 12,0 °C (1989) — pieni ristiriita weatherboxin ja leipätekstin
  välillä, ks. osio 7 kohta 5. Weatherbox mainitsee ääriarvojen
  mittaushistorian alkavan 1872 — juuri isoisän matkavuotta edeltävästä
  vuodesta. — en-Wikipedia "Manaus" (Climate, weatherbox, leipäteksti)
- **Sademäärä:** n. 2300 mm/vuosi (leipäteksti); weatherboxin
  kuukausilukujen summa n. 2362 mm/vuosi (oma laskelma weatherboxin
  luvuista, pieni pyöristysero selittää eron). — en-Wikipedia "Manaus"
  (Climate, weatherbox)
- **Kuivin jakso:** heinä-syyskuu suhteellisen kuiva; joulu-toukokuu
  hyvin sateinen (kesä ja syksy viileämpiä kuin talvi ja kevät, koska
  vuodenajat eivät noudata eurooppalaista logiikkaa päiväntasaajan
  läheisyyden vuoksi). — en-Wikipedia "Manaus" (Climate)
- **Rannat:** muodostuvat elo-marraskuussa jokien pinnan laskiessa;
  joulukuusta alkaen nousevat vedet peittävät hiekat jälleen. —
  en-Wikipedia "Manaus" (Beaches and waterfalls)
- **HUOM:** samoin kuin muissa erän kaupungeissa, yllä olevat luvut ovat
  en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin pelin
  `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali. Tarkat
  kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 6. Kuva-aiheet ja Commons-kategoriavinkit

Erityishuomio: alkuperäiskansa-aiheisissa kuvissa vältä kaikkea, mikä
esittää manaó-, baré- tai baniwa-kansat vain historiallisena
kuriositeettina (esim. pelkkiä 1800-luvun kaiverruksia tai etnografisia
"tyyppikuvia") — tasapainota nykyaikaisilla kuvilla, jos Commonsista
löytyy lisenssiehdot täyttäviä (esim. baniwa-koripunontaa, nykytaiteilija
Denilson Baniwan teoksia — Commonsin kategoria "Baniwa people" sisältää
mm. hänen kuviaan, tarkistettava lisensseittäin ennen käyttöä).

**Avauskuvat (3), ehdotus:**
1. Teatro Amazonas laajana yleiskuvana, kupoli ja Praça São Sebastião
   näkyvissä.
2. Encontro das Águas ilmakuvana — kahden erivärisen veden raja
   näkyvissä.
3. Manausin siluetti Rio Negron suunnasta, Rio Negro -silta tai
   Manausin satama näkyvissä.

**Kansikuvat (3), ehdotus:**
1. Teatro Amazonas ilta- tai aamuvalossa.
2. Rio Negro -silta kaupungin ja sademetsän välissä.
3. Manausin satama ja kelluvat laiturit Rio Negron rannalla.

**Commons-kategoriat kuvahakuun (tarkistettu olemassaolo 24.8.2026
Commonsin hakurajapinnasta, srnamespace=14 — kategorioiden sisältö pitää
silti aina tarkistaa silmin lisenssisääntöjen mukaisesti):**
- `Category:Teatro Amazonas` — oopperatalo ulkoa ja sisältä
- `Category:Museu do Teatro Amazonas` ja `Category:Interior of Teatro
  Amazonas` — sisätilat tarkemmin
- `Category:Manaus` ja `Category:Centro (Manaus)` — kaupunki yleisesti,
  historiallinen keskusta
- `Category:Manaus in the 19th century` — 1800-luvun historiallinen
  kuvasto, hyvä lähde isoisän aikakauden materiaalille
- `Category:Mercado Municipal Adolpho Lisboa` ja `Category:Mercado
  Adolpho Lisboa` — markkinahalli
- `Category:Alfândega de Manaus` — tullitalo
- `Category:Catedral Metropolitana de Manaus` — katedraali
- `Category:Palácio Rio Negro (Manaus)` — kumiparonin talo, nyt museo
- `Category:Ponte Rio Negro` — Rio Negro -silta
- `Category:Porto de Manaus` ja `Category:Museu do Porto de Manaus` —
  satama
- `Category:Meeting of Waters` ja `Category:Negro-Amazon confluence` —
  vesien kohtaaminen
- `Category:Ponta Negra (Manaus)` ja `Category:Praia da Ponta Negra
  (Manaus)` — uimaranta
- `Category:Parque Nacional de Anavilhanas` — kansallispuisto, jokisaaristo
- `Category:Zoológico do CIGS` — armeijan eläintarha
- `Category:Baniwa people` — sisältää mm. nykytaiteilija Denilson
  Baniwan kuvia; TARKISTA lisenssit yksitellen ennen käyttöä
- `Category:Indigenous peoples in Amazonas (Brazil)` — yleinen
  alkuperäiskansakategoria (HUOM: erillistä "Category:Baré people"
  -kategoriaa EI löytynyt Commonsista hakuhetkellä — hakusana "Baré
  Indians" tuotti vain epäolennaisia osumia; baré-aiheisia kuvia
  kannattaa etsiä tämän yleiskategorian ja artikkelin "Baré" oman
  pääkuvan kautta)

**Nosto-/jaksokuvat, aihe-ehdotuksia (ei tiedostonimiä):**
1. Historiallinen kuva tai piirros Manausista 1800-luvun lopulta
   (kategoria "Manaus in the 19th century" — tarkista jokaisen kuvan
   lisenssi erikseen).
2. Teatro Amazonasin rakennustyömaa tai varhainen valokuva 1890-luvulta.
3. Alfândega-tullitalon julkisivu, brittiläistä tiiliarkkitehtuuria.
4. Palácio Rio Negro sisältä (nykyinen museo).
5. Encontro das Águas läheltä veneestä kuvattuna, veden raja näkyvissä.
6. Baniwa-koripunontaa tai muuta nykyaikaista alkuperäiskansataidetta,
   jos Commonsista löytyy lisenssiehdot täyttävä kuva.
7. CIGS-eläintarhan eläimiä.
8. Ponta Negra -ranta ilta-auringossa.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **En-Wikipedian artikkelit ovat keskenään ristiriitaisia kaupungin
   1832 nimestä.** Pääartikkeli "Manaus" sanoo kaupungin saaneen nimen
   "Manaus" jo vuoden 1832 kyläkorotuksessa ("elevated to a town in 1832
   with the name of 'Manaus'... On September 4, 1856, it returned to the
   name 'Manaus'" — siis implikoi nimen olleen käytössä jo aiemmin).
   Tarkempi artikkeli "History of Manaus" sanoo 1832 kyläkorotuksen
   nimeksi "Nossa Senhora da Conceição da Barra do Rio Negro" ja että
   kaupunki sai nimen "Manaus" ensimmäistä kertaa vasta 1856 (Laki 68).
   Molemmat artikkelit ovat samaa mieltä 1848-nimestä (Cidade da Barra
   do Rio Negro) ja 1856-nimenannosta manaó-kansan kunniaksi. EI ole
   valittu kumpaakaan versiota lopulliseksi totuudeksi vuoden 1832 osalta
   — nosto K1 on kirjoitettu niin, ettei se väitä mitään kaupungin
   nimestä ennen 1848:aa, ja ristiriita on kirjattu näkyviin noston
   lähdeluetteloon.
2. **En-Wikipedian artikkelit ovat keskenään ristiriitaisia siitä, onko
   lämpötila merkittävä tekijä Encontro das Águas -ilmiössä.**
   "Meeting of Waters" -artikkeli sanoo ilmiön johtuvan nimenomaan
   lämpötila-, nopeus- ja sedimenttieroista. "Manaus"-artikkelin oma
   Meeting of Waters -alaosio sanoo, ettei lämpötilan (tai happamuuden)
   uskota vaikuttavan merkittävästi, vaikka antaa samat lämpötilaluvut
   (28 °C / 22 °C) kuin toinen artikkeli. Molemmat on kirjattu näkyviin
   nostoon K2 sen sijaan että jompikumpi olisi valittu.
3. **Encontro das Águasin sekoittumaton matka on kahden pituinen
   Wikipedian sisällä: 6 km vai 9 km.** "Meeting of Waters" (oma
   artikkeli) ja "Manaus" (Meeting of Waters -alaosio) sanovat 6 km.
   "Manaus" (Sights and attractions -osio) ja "Port of Manaus" sanovat
   9 km. Lisäksi "Meeting of Waters" -artikkelissa on oma
   {{Clarify span}}-merkintä toimittajilta, jotka huomauttavat saman
   artikkelin sisäisestä epäjohdonmukaisuudesta (6 km täydellinen
   sekoittuminen vs. epätäydellinen ilmiö vielä 30 km myöhemmin). Kumpaa
   lukua käytetään pelin tekstissä, jää kirjoittajan päätettäväksi —
   molemmat on kirjattu K2:n lähdeluetteloon.
4. **Cabanagem-kapinan tarkka alkamis-/päättymisaika vaihtelee hieman
   lähteen sisällä.** "Manaus"-artikkeli sanoo kapinallisten "ottaneen
   vallan 1835" mutta kuvailee samassa kappaleessa liikkeen jatkuneen
   "brief period of revolution" -ilmauksella; laajemmin kapinan
   ajoitukseksi annetaan 1835–1840 sekä tässä artikkelissa että
   "History of Manaus" -artikkelissa. Ei ristiriitaa, mutta muotoilu on
   hieman epätäsmällinen — käytetty ajoitusta 1835–1840 molemmissa
   lähteissä esiintyvänä.
5. **Lämpötilaennätykset ovat pieneltä osin ristiriitaisia weatherboxin
   ja leipätekstin välillä.** Leipäteksti (INMET-viittauksella): korkein
   39,0 °C (2015), alin 12,0 °C (1989). Weatherbox: vuosiennätys
   38,3 °C, alin 12,1 °C. Erot ovat pieniä (0,1–0,7 astetta) ja
   todennäköisesti johtuvat eri mittausasemista tai päivitysajankohdista
   — molemmat luvut on kirjattu osioon 5.
6. **Tullitalon (Alfândega) koordinaatti infoboxissa on epätavallisessa
   muodossa** ("013|08|14.8|S") — tulkittu kirjoitusvirheeksi (pitäisi
   olla "3", ei "013") ja korjattu vastaavasti osion 4 taulukossa;
   tarkistettu, että tulos (3°08'14.8"S)
   sopii yhteen tullitalon tunnetun sijainnin (Manausin Centro,
   sataman lähellä) kanssa.
7. **Encontro das Águasin ja Ponta Negran etäisyydet ankkurista ovat
   omia laskelmiani** koordinaattieroista suoralla linjalla (ei
   tieetäisyyksiä), samaan tapaan kuin Bogotán faktapohjassa. Kummankin
   kohteen todellinen matka-aika on veneellä/autolla huomattavasti
   pidempi kuin suora etäisyys.
8. **Kumibuumin alkuperäiskansoihin kohdistama pakkotyö ja väkivalta on
   Wikipediassa dokumentoitu erittäin laajasti Perun (Putumayo-genosidi),
   Kolumbian ja Bolivian osalta, mutta HUOMATTAVASTI suppeammin Brasilian
   ja erityisesti Manausin/Amazonasin osalta** — "Amazon rubber cycle"
   -artikkelin "Effects on indigenous population" -osio käsittelee
   ilmiötä yleisesti koko Amazonin alueella muttei anna Manausiin tai
   Amazonasin osavaltioon suoraan sidottuja lukuja tai tapahtumia. Tästä
   syystä tämä faktapohja ei sisällä pakkotyön yksityiskohtia yhdessäkään
   nostossa — R2–R4 kuvaavat kumibuumin taloudellista nousua ja
   romahdusta, eivät työvoiman kohtelua, koska en-Wikipediassa ei ollut
   suoraan Manausiin sidottua, tarkistettavissa olevaa lähdettä tälle.
   Jos kirjoittaja haluaa käsitellä aihetta syvemmin, "Amazon rubber
   cycle" -artikkelin yleisosio on olemassa mutta vaatisi erillisen
   tarkistuksen siitä, koskeeko se nimenomaan Amazonasin osavaltiota.
9. **Smaragdi- tai muu visan ulkopuolinen sivuaihe ei ole tässä erässä
   relevantti** — Manausin visa (5 kysymystä) kattaa suoraan kumibuumin,
   Encontro das Águasin (kahdesti eri kulmista) ja kaupunkiin pääsyn;
   kaikki neljä pääaihetta on käytetty osiossa 2 tarkemmilla luvuilla ja
   eri näkökulmilla kuin visan lyhyt vastaus (ks. johdanto-osion
   selitys).
10. **Coordinates-rajapinta ja artikkelihaku eivät tuottaneet
    yhtään 429-vastausta tässä erässä** — kaikki haut onnistuivat
    ensimmäisellä yrityksellä.
11. **Vain en-Wikipediaa ja sen MediaWiki-rajapintaa sekä Wikimedia
    Commonsin hakurajapintaa (kategorioiden olemassaolon tarkistukseen)
    on käytetty.** Ei ulkopuolisia hakuja tämän faktapohjan sisältöön.
12. **Ei nykysotaa, nykypolitiikkaa eikä nykyrikollisuutta käsitelty.**
    En-Wikipedian "Manaus"-artikkelin "Recent events" ja "Government and
    politics" -osiot sisältävät mm. vuoden 2017 vankilamellakan ja
    COVID-19-pandemian, mutta niitä ei ole nostettu tähän faktapohjaan
    tarkoituksella — ne eivät osu 1873-painotukseen eivätkä
    spec-mantereet.md:n sisältölinjaukseen.
13. **Kaikki nostot, jaksot ja johdannot on kirjoitettu valmiiksi
    suomenkieliseksi tekstiksi** merkkimäärävaatimusten mukaan
    (johdannot 216–223, nostot 458–569) ja tarkistettu koneellisesti
    Node-skriptillä.
