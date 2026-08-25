# Täkyehdokkaat: Madrid

Työaineisto Viisaan Pöllön uteliaisuuskoukkuja varten, sama malli kuin
docs/mantereet-tyoaineisto/takyt-rooma.md ja takyt-istanbul.md.
Fokusmaa: **Espanja**, fokuskaupunki **Madrid**.

**1873-ANKKURI (tämän listan selkäranka):** kuningas Amadeo I luopui
kruunusta 10.2.1873, ja seuraavana päivänä Espanjassa julistettiin
**ensimmäinen tasavalta**. Se kesti 11.2.1873–29.12.1874. Isoisä
saapui siis keskelle vuotta, jossa Madridissa vaihtui neljä
valtionpäämiestä yhdentoista kuukauden sisään, pohjoisessa käytiin
karlistisotaa oman pääkaupungin ja oman rahan kanssa, ja etelässä
kaupungit julistautuivat itsenäisiksi kantoneiksi. Peli mainitsee tämän
tähän asti VAIN julisteen selitteessä (js/packs/julisteet.js, `madrid`:
"Kuningas Amadeo luopui kruunusta, ja Madridissa julistettiin
11. helmikuuta 1873 Espanjan ensimmäinen tasavalta"). Näistä täyistä
kuusi tekee siitä tarinan.

**Tila:** kartoitus. EI koodia, EI muutoksia olemassa oleviin
tiedostoihin. Fable valitsee, mitkä viedään peliin ja missä
sanamuodossa.

## Tarkistustapa

- Wikipedia-artikkelit haettu 25.8.2026 MediaWikin rajapinnalla
  (`action=query&prop=extracts&explaintext=1&redirects=1`),
  User-Agent-otsakkeen kanssa ja `NODE_USE_ENV_PROXY=1`. Rajapinta
  vastasi toistuvasti 429:llä ("Too Many Requests"); haut uusittiin
  kasvavalla viiveellä (6 s → 12 s → 24 s → 48 s), jolloin kaikki
  menivät läpi.
- **Kaksi kieltä.** Osa Madridin aineistosta ei ole olemassa
  en-Wikipediassa lainkaan (Casa de Fieras, Congreson leijonat,
  Losadan kello, Canal de Isabel II, Quinta del Sordo omana
  artikkelinaan). Näiden lähde on **es-Wikipedia**, ja se on merkitty
  kohdittain. Kolme en-hakua palautti *missing* (ks. Hylätyt).
- Ei mitään muistinvaraista. Jokaisen täyn alla on artikkeli, sen osio
  ja lainaus, johon väite nojaa.
- **Koordinaatit** en- tai es-Wikipedian `prop=coordinates`-
  rajapinnasta, EIVÄT arvattuja. Kohteet, joilla ei ole koordinaatteja
  rajapinnassa (Congresso, Quinta del Sordon tontti), on kuvattu
  sanallisesti ja merkitty erikseen.
- **Kuvat:** jokaisen ehdotetun Commons-tiedoston olemassaolo, koko,
  lisenssi, tekijä ja **Restrictions-kenttä** on kysytty erikseen
  Commonsin `imageinfo`-rajapinnalla (`iiprop=url|size|extmetadata`) —
  ei arvattuja tiedostonimiä. Kaikkien alla ehdotettujen
  Restrictions-kenttä on **tyhjä**. Kaikki ovat PD, CC0 tai
  CC BY / CC BY-SA.
- **SILMÄTARKISTUS-varoitus** on merkitty jokaiseen kuvaan, jossa on
  tai voi olla tunnistettavia eläviä henkilöitä, tai jossa aihe
  muuten vaatii ihmissilmän ennen käyttöä.

---

## Laudan ja kaaren tila (tehtävänannon erillinen kysymys)

**Madrid ON maailmankartta-laudalla.** js/packs/maailmankartta.js
rivi 203:

```
{"id":"madrid","name":"Madrid","wiki":"Madrid","ambience":"kaupunki",
 "x":5709.7,"y":1787,"airport":true,"la":"middle","lx":0,"ly":-24}
```

Espanjalla on siellä myös oma maapolygoni (`CITY_COUNTRY`:
`"madrid":"ESP"`, ja `"ESP"` keskus [5733.3, 1803.8], leveys 416).
Espanjan laattoja maailmankartalla on neljä: **madrid, barcelona,
granada, sevilla**. Reitit: madrid–lissabon (3), madrid–barcelona (3),
madrid–granada (3), sevilla–madrid (3), sevilla–granada (2).

**Madrid on myös Euroopan laudalla** (js/packs/europe.js rivi 352:
`x: 140, y: 831, airport: true`), samat neljä Espanjan laattaa ja
lentoreitit lontoo–madrid ja madrid–rooma.

**Kaaridata: Madridilla ON valmis kaaripaketti.**
js/tyohuone-kehitys-data.js `KAARI_PAKETIT`, kohde `id: 'madrid'`
(rivit n. 362–398): otsikko **"Madrid — kolmastoista lyönti"**,
henkilö **kellomestari Pilar**, saapuminen Puerta del Solin
kolmestatoista lyönnistä, kysymys **kilómetro cerosta** (oikea
vastaus 0: "Espanjan maanteiden kilometrit — nollapiste on tässä"),
aarre koneiston huoltotilassa. `mykistetyt: ['saapuminen', 'aarre']`.

**Tästä seuraa kaksi asiaa täkyvalinnalle:**

1. **Puerta del Solin kello ja kilometri nolla ovat jo käytössä** sekä
   kaaressa että js/packs/nahtavyysjutut.js:n Puerta del Sol
   -jutussa. Alla oleva täky 11 EI toista niitä: se kertoo, **kuka
   kellon antoi ja miksi** — asia, jota pelissä ei ole missään. Se on
   suoraan olemassa olevan kaaren syventäjä, ei kilpailija.
2. Kaari on jo hyväksytty ja luennat generoitu. Nämä täyt eivät kosketa
   kaaritekstiä.

---

## Olemassa oleva Madrid- ja Espanja-sisältö repossa (grep js/packs/)

`grep -rin "madrid\|espanja" js/packs/` antoi seuraavan. **Alla olevat
täyt on valittu kiertämään kaikki nämä.**

- **js/packs/nahtavyysjutut.js**, avain `madrid` (rivit n. 1048–1210):
  **Kuninkaanlinna** (Alcázarin palo 1734, 3 418 huonetta,
  Stradivarius-kvintetti), **Plaza Mayor** (1619, 237 parveketta,
  inkvisition tuomiot 1680), **Puerta del Sol** (kilometri nolla 1857,
  kaksitoista lyöntiä ja rypäleet, karhu ja mansikkapuu),
  **Cibeleen aukio** (1780, Real Madridin lippu, katkenneet kädet),
  **Prado-museo** (1819, Las Meninas, mustat maalaukset), **Alcalán
  portti**.
- **js/packs/kulttuuri-kategoriat.js**, avain `madrid` (rivi 2225→):
  kansisivu, "Matkailijan Madrid" (metro 17.10.1919 ja
  vasemmanpuoleinen liikenne, Chamberín haamuasema 1966/2008,
  Madrid Río, Filomena-myrsky 2021, Cuatro Torres), nostot **"Goya
  maalasi madridilaisten vapaapäivät"** (Päivänvarjo, Sokkoleikki,
  Lumisade, Tanssi Manzanaresin rannalla, Saviastioiden kauppias),
  **"Kaupunki, jossa syödään seisten"**, **"Chotis tanssitaan yhden
  laatan päällä"**.
- **js/packs/europe-artikkelit.js**: `Madrid` (Mayrit 800-luvulla,
  pääkaupungiksi 1561, Prado, Guernica 1981, El Rastro) ja `Espanja`
  (800 vuotta maureja, 1492, diktatuuri 1975 asti).
- **js/packs/europe-saapumiset.js**, `madrid`: sininen sateenvarjo
  Puerta del Solilla, herra G:n sähke — vaanijateema.
- **js/packs/kohtaamiset.js**, `madrid`: **kirpputorikauppias Rosa**
  El Rastrossa, messinkiavain.
- **js/packs/europe-questions.js**, `madrid`: pääkaupunki, Prado,
  korkeus, Retiro, cocido.
- **js/packs/julisteet.js**, `madrid`: juliste "Madrid 1873",
  selitteessä JO ensimmäinen tasavalta (ks. yllä).
- **js/packs/europe-valokuvat.js**, `madrid`: Cuatro Torres, Plaza
  Mayor illalla, Puerta del Solin kellotorni, Plaza Mayorin
  photochrom.
- **js/packs/miniatyyrit.js**, **maakartat.js**, **saatiedot.js**,
  **aani-ehdokkaat.js** (San Miguelin kauppahallin äänite),
  **europe-kielet.js**.

**Johtopäätös:** Kuninkaanlinna, Plaza Mayor, Puerta del Sol +
kilometri nolla + rypäleet, Cibeles, Prado + mustat maalaukset
mainintana, Alcalán portti, Retiro mainintana, El Rastro, Goyan
kartongit, metro ja Chamberí, Madrid Río ja cocido ovat **JO
KÄYTÖSSÄ**. Uudet täyt tulevat niiden ohi kolmea reittiä: (a)
**1873-vuosi tarinana** (täyt 3–8, 18), (b) **uusia paikkoja**
(Casa de Fieras, Congresso, Quinta del Sordo, Velascon talo, Botín),
(c) **uusi kulma jo tunnettuun** (kellon lahjoittaja, karhun
oikeusjuttu, mustat maalaukset seinällä eikä museossa).

---

## Täyt

### 1. Keskellä Retiroa oli villieläintarha — nyt siellä on kirjasto, jossa ruokintakalterit ovat yhä seinässä (ELÄINTÄKY)

Retiron puistossa oli kuninkaallinen eläintarha, **Casa de Fieras**.
Kaarle III käski rakentaa eläinpuiston vuonna 1774; es-Wikipedian
mukaan se oli Wienin jälkeen Euroopan toiseksi vanhin. Filippiinien
varakuningas lähetti kuninkaan suosiota tavoitellakseen norsun, joka
**käveli Cádizista Madridiin** — se oli purettu laivasta siellä.
Häkkirykelmä tunnettiin nimellä *La Leonera*: alakerrassa tiikereitä,
pantteri, kaksi hyeenaa ja sakaali, yläkerrassa huoneet
kuninkaalliselle perheelle ja vieraille, sisustuksena täytettyjä
eläimiä. Muualla oli apinakioski, norsutarha, karhukuoppa ja häkkejä,
joissa asui japanilaisia valkoisia riikinkukkoja, perulaisia laamoja
ja afrikkalaisia gaselleja. Vuoden 1868 vallankumouksessa
väliaikaishallitus takavarikoi kuninkaan omaisuuden, Retiro avattiin
yleisölle ja kaupunki otti eläintarhan hoitoonsa — **eli isoisä olisi
1873 päässyt sisään maksamatta hoville mitään**. Eläintarha muutti
Casa de Campoon 22.6.1972, mukana yli 550 eläintä 83 lajista, ja
vanhoihin rakennuksiin avattiin 29.4.2013 kaupunginkirjasto. Kirjaston
sisällä on säilytetty alkuperäisiä rakenteita, muun muassa **ne
kalterit, joiden läpi pedoille heitettiin ruokaa yläkerrasta**.

- **Paikka:** Retiron puisto, Jardines de Herrero Palacios, Puerta de
  Sáinz de Barandan luona. **40,416472°N, −3,679703°E**
  (es-Wikipedia, coordinates).
- **Lähde:** es.wikipedia.org/wiki/Casa_de_Fieras_del_Retiro, osiot
  "Antecedentes" ja "Casa de Fieras". Retiron julkiseksi tulosta myös
  en.wikipedia.org/wiki/Parque_del_Buen_Retiro,_Madrid, osio "History".
- **Lainaus/perustelu:** "los antecedentes más directos de un
  zoológico en Madrid se remontan a 1774, cuando Carlos III mandó
  construir un parque de animales... Después del zoológico de Viena
  era el segundo más antiguo de Europa." · "El virrey de Filipinas...
  le envió un elefante que llegó andando a Madrid desde Cádiz, donde
  había desembarcado." · "En la inferior se estaban las jaulas para
  varios tigres, una pantera, dos hienas, un chacal, y en la superior
  se habilitaron estancias para la familia real y sus huéspedes, donde
  también se encontraban animales disecados como parte de la
  decoración." · "Con la Revolución de 1868, se abrió el parque del
  Buen Retiro al público y el Ayuntamiento de Madrid asumió su
  gestión." · "el 22 de junio de 1972... se cerró definitivamente la
  Casa de Fieras del Retiro... se contabilizaron más de 550 ejemplares
  correspondientes a 83 especies." · "El 29 de abril de 2013, se abrió
  en las dependencias de la antigua Casa de Fieras una nueva
  biblioteca... Dentro de la misma se han conservado algunas de las
  estructuras originales, como las rejas por las que se echaba de
  comer a las fieras desde la primera planta." · en-Retiro: "In 1868,
  when Queen Isabella was overthrown in the Glorious Revolution, the
  gardens became publicly-owned."
- **Kuva (AIKALAISKUVA, paras):** Commons **1879-12-22, La Ilustración
  Española y Americana, Madrid.—El cercado de los llamas, en la Casa de
  Fieras del parque de Madrid.jpg** (**4001×2952**, public domain,
  Josep Lluis Pellicer / Bernardo Rico, julkaistu 22.12.1879) —
  laamatarha eläintarhassa, kuusi vuotta isoisän matkan jälkeen.
  Restrictions tyhjä. **Tämä on paras: se on iso, se on aikalainen ja
  siinä on eläimiä.**
- **Kuva (AIKALAISKUVA, vaihtoehto):** Commons **1876-09-30, La
  Ilustración Española y Americana, El Parque de Madrid.jpg**
  (6048×4349, public domain, Daniel Perea / Bernardo Rico, julkaistu
  30.9.1876) — koko sivun kuvalaitos Retirosta. Rajattu versio samasta:
  **1876-09-30, La Ilustración Española y Americana, El Parque de
  Madrid (cropped) Casa de Fieras.jpg** (1539×888, sama lisenssi ja
  tekijät). Restrictions tyhjä molemmissa.
- **Kuva (nykytila):** Commons **Antigua Casa de Fieras, Parque del
  Retiro . Madrid.jpg** (3000×4000, CC0, Pabernosmatao, 15.12.2024) tai
  **077 Biblioteca Eugenio Trías, Parque del Retiro (Madrid), antiga
  Casa de Fieras.jpg** (4160×3120, CC BY-SA 4.0, Enric, 31.5.2024) —
  kirjasto entisissä eläinsuojissa. Restrictions tyhjä molemmissa.
- **HUOM SILMÄTARKISTUS — KOLME LÖYDÖSTÄ, JOITA EI SUOSITELLA:**
  Commonsin `Category:Casa de Fieras del Retiro` sisältää myös
  (a) **Los hijos de los Reyes en la casa de fieras 1.png** ja **2.png**
  (911×562 ja 915×514, PD, Salazar, 8.4.1914), joissa on tunnistettavia
  lapsia (kuninkaalliset lapset); (b) **Julia Fons y un elefante.jpg**,
  **Julia Fons y el avestruz.jpg**, **Julia Fons y el dromedario.jpg**,
  **Julia Fons alimentando a un camélido.jpg**, **Julia Fons alimentando
  al ave.jpg** (kaikki n. 500×500, PD, José Demaría López, 1911) —
  tunnistettava näyttelijätär eläinten kanssa; (c) **1941-12-27 FOTOS
  16/17.jpg** (PD, 1941) — Francon ajan lehtikuvia. Kaikki kuvatut ovat
  aikoja sitten kuolleita ja kaikkien Restrictions on tyhjä, mutta pelin
  oma henkilökuvasääntö (herokuvien-silmatarkistus) on tarkistettava —
  **suositukseni: älä käytä yhtäkään näistä**, koska aikalaiskuvat
  eläintarhasta riittävät ilman ihmisiä.
- **Varmuus:** VARMA — kaikki suoraan lähteessä. **EPÄVARMA/ei
  vahvistettu:** että isoisä olisi *nähnyt* norsun 1873; lähde ei
  ajoita yksittäisiä eläimiä siihen vuoteen. Sano "puistossa asui
  norsuja", älä "isoisä näki norsun". Norsu **Pizarron** kuuluisa
  karkumatka Alcalá-kadulle kauppaan tapahtui Cabañasin aikana
  **1895 jälkeen** — ei siis isoisän vuonna. Älä sekoita.

### 2. Madrid on Euroopan papukaijapääkaupunki (ELÄINTÄKY)

Madridin puistoissa asuu tuhansia villejä papukaijoja. Laji on
**munkkiaratti** (Myiopsitta monachus), kotoisin Etelä-Amerikasta.
Espanjassa elää yli 80 % koko Euroopan villistä kannasta, ja
**Madridissa niitä laskettiin kesäkuussa 2015 kymmenentuhatta
kahdeksansataa** — enemmän kuin missään muualla Euroopassa
(Barcelonassa samaan aikaan noin 5 000). Munkkiaratti on ainoa
papukaija, joka rakentaa oksista oikean pesän eikä käytä koloa: yhdyskunta
kutoo yhteen jättipesän, jossa jokaisella parilla on oma sisäänkäynti
ja oma "huoneisto", ja pesä voi kasvaa **pienen auton kokoiseksi**.
Pesissä asuu alivuokralaisia — kyyhkyjä, varpusia, jopa oravia. Espanja
kielsi lajin pidon ja kaupan vuonna 2013.

- **Paikka:** koko Madrid; suurimmat yhdyskunnat kaupunkipuistoissa
  (mm. Parque del Oeste, Casa de Campo).
- **Lähde:** en.wikipedia.org/wiki/Monk_parakeet, osiot pesinnästä ja
  vieraslajistatuksesta.
- **Lainaus/perustelu:** "The monk parakeet is a gregarious species
  which often breeds colonially, building a single large nest with
  separate entrances for each pair... pairs occupying separate
  'apartments' in composite nests that can reach the size of a small
  automobile. These nests can attract many other tenants... such as
  pigeons, sparrows, American kestrels, and yellow-billed teal, but
  mammals like red squirrels may also occupy a nest." · "It is
  estimated that monk parakeets in Spain account for more than 80% of
  Europe's feral population... Spain has outlawed the possession and
  trafficking of monk parakeets since 2013. Madrid had the greatest
  population of monk parakeets in Europe, with 10,800 as of June 2015."
- **Kuva:** Commons **Cotorra Argentina - Parque del Oeste - Madrid
  03.jpg** (6024×4016, CC BY-SA 4.0, Javier Perez Montes, 15.3.2025).
  Vaihtoehto: **Myiopsitta monachus (Madrid, Spain) 16.jpg**
  (2603×1743, CC BY-SA 3.0 es, Luis García "Zaqarbal", 17.2.2013).
  Restrictions tyhjä molemmissa.
- **Varmuus:** VARMA — luku 10 800 on suoraan lähteessä ja
  päivätty. **KIRJOITA VUOSILUKU NÄKYVIIN** ("vuonna 2015 laskettiin"),
  koska luku vanhenee. **1873-KYTKÖS: EI OLE** — laji on tullut
  Madridiin 1900-luvun lopulla. Tämä on nykypäivän täky, ja se on
  tarkoituskin: omistajan ELÄINTÄYT-linjaus pyytää söpöä ja elävää.

### 3. Kuningas vannoi valansa sen miehen ruumiin ääressä, joka oli hankkinut hänelle kruunun

Espanja etsi vuoden 1868 vallankumouksen jälkeen uutta kuningasta ja
valitsi italialaisen Savoijin herttuan **Amadeon** 16.11.1870. Koko
hanke oli yhden miehen, kenraali **Juan Primin**, työtä. Kun Amadeo oli
matkalla Espanjaan, Prim murhattiin. Uusi kuningas saapui Madridiin
2.1.1871, vannoi samana päivänä valansa vuoden 1869 perustuslaille —
**Primin ruumiin läsnä ollessa** — ja kävi sitten Atochan kirkossa,
jonne Primin surusaattokappeli oli pystytetty. Kaksi vuotta myöhemmin,
18.7.1872, Amadeoa ja kuningatar Maria Vittoriaa vastaan tehtiin
murhayritys Calle del Arenalilla. Häntä oli varoitettu; hän kieltäytyi
vaihtamasta reittiä. Sen jälkeen tulivat julkiset nöyryytykset:
vaunuja vastaan hyökättiin Alcalá-kadulla, Cedaceros-kadulla häntä
heitettiin mudalla, Retiron laidalla huudeltiin. Helmikuussa 1873 hän
lopetti.

- **Paikka:** Madrid; valanvannominen Cortesissa, Palacio de las
  Cortes. Murhayritys Calle del Arenal.
- **Lähde:** en.wikipedia.org/wiki/Amadeo_I_of_Spain, johdanto, osio
  valinnasta ja osio "Assassination Attempt Against the King on 18 July
  and Insults to the Crown".
- **Lainaus/perustelu:** "The Savoyard prince was elected king as
  Amadeo I on 16 November 1870 and swore to uphold the Constitution in
  Madrid on 2 January 1871. While the new king was on his way to Spain,
  General Juan Prim, his chief supporter, was assassinated and **Amadeo
  took the oath in the presence of Prim's corpse**." · "Later, he
  visited the Church of the Virgin of Atocha, where General Prim's
  funeral chapel had been set up." · "On 18 July, Amadeo and Queen
  Maria Vittoria survived an assassination attempt on Madrid's Calle
  del Arenal... Warned by Martos and Governor Pedro Mata, Amadeo
  refused to alter his route... Public humiliations followed: carriage
  attacks on Calle de Alcalá, mud-throwing on Cedaceros, insults near
  El Retiro."
- **Kuva:** Commons **Fotografía de Amadeo de Saboya - Palacio de
  Cervelló.jpg** (3247×4000, public domain, Restrictions tyhjä) —
  valokuva Amadeosta Valencian Palacio de Cervellón kokoelmasta.
  **HUOM SILMÄTARKISTUS:** kuva on valokuva vitriinissä olevasta
  vanhasta valokuvasta; tarkista silmällä, että rajaus kelpaa ja ettei
  kuvassa ole heijastuksia tai nykyihmisiä.
- **Varmuus:** VARMA — suoraan lähteessä. **RISTIRIITA MERKITTÄVÄ:**
  Amadeon luopumispäivä eroaa artikkelien välillä. en-artikkeli
  "First Spanish Republic" sanoo johdannossa "the abdication of King
  Amadeo on 10 February 1873" mutta osiossa "Proclamation of the
  Republic" "abdicated from the Spanish throne on 11 February 1873";
  en-artikkeli "Amadeo I of Spain" ratkaisee: **allekirjoitti
  9.2., luopui 10.2., ilmoitti Cortesille 11.2.** Käytä tätä muotoa.
  Pelin oma juliste sanoo tasavallan julistuksesta 11.2.1873 — se
  pitää paikkansa. **ÄLÄ KÄYTÄ** laajalti siteerattua Amadeon lausetta
  "hullujen kansan kuningas": sitä EI ole näissä artikkeleissa.

### 4. Presidentti jätti eronpyynnön pöydälle, käveli puiston läpi ja nousi ensimmäiseen junaan — seuraavan kerran hänet nähtiin Pariisissa

Tasavallan ensimmäinen valtionpäämies oli katalonialainen
**Estanislao Figueras**. Hallitus ei saanut mitään päätettyä: nuori
kirjailija Benito Pérez Galdós, joka istui lehtiparvella, kirjoitti
istunnoista, että "loputon yksilöllisyys" ja "useimpien puhujien
tappava spontaanius" teki historiallisen työn mahdottomaksi ja ajoi
katsojan hulluksi. Päivät ja yöt kuluivat siihen, ettei Cortes saanut
sovittua, miten ministerit ylipäätään nimitetään. Erään turhan
ministerineuvoston jälkeen Figueras huusi kokoushuoneessa: *"Hyvät
herrat, en kestä tätä enää. Olen suora: minulla on tarpeekseni meistä
kaikista."* Ja 10.6.1873 hän teki niin kuin sanoi: jätti eronpyyntönsä
työhuoneeseensa, meni kävelylle **Retiron puistoon**, ja nousi
kenellekään kertomatta ensimmäiseen junaan, joka lähti **Atochan
asemalta**. Hän ilmoitti eroavansa vasta perillä Pariisissa.

- **Paikka:** Madrid — Retiron puisto ja Atochan asema.
  Retiro 40,415°N, −3,68389°E (en-Wikipedia).
- **Lähde:** en.wikipedia.org/wiki/First_Spanish_Republic, osio
  "The Federal Republic"; en.wikipedia.org/wiki/Estanislao_Figueras.
- **Lainaus/perustelu:** "The situation reached such levels of
  surrealism that, while presiding over a Cabinet session, Estanislao
  Figueras yelled: 'Gentlemen, I can't stand this any more. I am going
  to be frank with you: I'm fed up with all of us!' So fed up that on
  10 June he left his resignation letter in his office, went for a walk
  through the Parque del Buen Retiro and, without telling anyone,
  boarded the first train departing from the Atocha Station. He would
  only step down upon arriving in Paris." · Galdós: "An endless
  individualism... and the deadly spontaneity of most speakers, drove
  the spectator crazy and rendered the historic functions impossible.
  Days and nights went by without the Cortes deciding how the ministers
  should be appointed."
- **Kuva:** Commons **Estanislao Figueras.png** (626×812, public
  domain, Arturo Carretero, päivätty **16.2.1873** — eli viisi päivää
  tasavallan julistuksen jälkeen). Restrictions tyhjä. Pieni mutta
  aikalainen; jos tarvitaan isompaa, ks. seuraavan täyn kuva.
- **Varmuus:** VARMA — suoraan lähteessä. **RISTIRIITA VÄHÄINEN:**
  en-artikkeli "Estanislao Figueras" antaa toimikaudeksi
  "12 February to 11 June 1873", kun taas "First Spanish Republic"
  sanoo hänet valitun **illalla 11.2.** ja seuraajan valitun **11.6.**
  Ero on yhden päivän kirjanpitoero — älä anna päivämääriä
  tarkemmin kuin "helmikuusta kesäkuuhun 1873". Kuuluisan huudahduksen
  karkeampi espanjankielinen muoto ("estoy hasta los cojones") on
  en-artikkelissa muodossa "up to my bollocks" — **käytä sivistynyttä
  suomennosta**, älä karkeaa.

### 5. Neljä valtionpäämiestä yhdessätoista kuukaudessa — ja yksi heistä erosi mieluummin kuin allekirjoitti kuolemantuomion

Tasavallan johdossa vaihtui isoisän matkavuonna neljä miestä.
**Figueras** helmikuusta kesäkuuhun (ks. täky 4). **Francisco Pi y
Margall** 11.6. alkaen — hän kesti **37 päivää** ja kieltäytyi
tukahduttamasta etelän kapinoita aseilla sillä perusteella, että
kapinalliset noudattivat hänen omaa oppiaan. **Nicolás Salmerón**
18.7. alkaen: kenraalit vaativat häntä vahvistamaan karkureiden
kuolemantuomiot, ja Salmerón — joka oli oikeusministerinä poistanut
kuolemanrangaistuksen — kieltäytyi ja erosi 6.9. Hänen mausoleuminsa
seinään on kirjoitettu, että hän *"luopui vallasta, jottei allekirjoittaisi
kuolemantuomiota"*. **Emilio Castelar** 7.9. alkaen, ja hän vahvisti
ne tuomiot, joiden takia edeltäjä erosi. Kaikki neljä ovat kuolleita
(Figueras 1882, Pi y Margall 1901, Castelar 1899, Salmerón 1908) — hän
oli tasavallan viimeinen elossa ollut presidentti.

- **Paikka:** Palacio de las Cortes, Madrid.
- **Lähde:** en.wikipedia.org/wiki/First_Spanish_Republic, osiot
  "The government of Pi i Margall", "Government of Nicolás Salmerón",
  "Government of Emilio Castelar"; en.wikipedia.org/wiki/Nicolás_Salmerón.
- **Lainaus/perustelu:** "as effective Commander in Chief of the
  Republic he rejected all calls... to suppress the cantonal uprisings,
  as he argued they were just following his very own doctrine. Thus he
  was forced to resign on 18 July after just 37 days in office." ·
  "Salmerón, man of very advanced liberal principles, declined to
  concede the 'awareness' and, as is written on the wall of his
  mausoleum, 'abandoned power to not sign a death sentence.' In this
  way, he resigned on 6 September." · "While serving as minister of
  justice in the Figueras cabinet, he abolished the death penalty." ·
  "He confirmed the death sentences that provoked the resignation of
  his predecessor." · "He was the last living president of the First
  Spanish Republic."
- **Kuva:** Commons **Alegoría de la Primera República Española, por
  Tomás Padró.jpg** (959×1298, public domain, litografia Juan Vazquez,
  **1873**) — aikalaisallegoria tasavallasta. Restrictions tyhjä.
- **Varmuus:** VARMA — suoraan lähteessä. **HUOM SANAMUOTO:** kukaan
  näistä neljästä ei ollut virallisesti "tasavallan presidentti" vaan
  *"Presidente del Poder Ejecutivo"*, toimeenpanovallan puheenjohtaja;
  lähde sanoo suoraan: "No 'President of the Republic' was ever
  elected, as the Constitution creating such office was never enacted."
  Käytä muotoa **valtionpäämies** tai **hallituksen johtaja**, älä
  presidenttiä ilman selitystä.

### 6. "Miksi te hyppäätte ikkunoista, kun ovesta pääsee?"

Tasavalta kaatui Madridissa aamuyöllä. **3.1.1874** Cortes kokoontui
äänestämään Castelarin hallinnosta, ja Castelar hävisi äänin 119–101.
Kun uutta johtajaa oltiin valitsemassa, Madridin sotilaskuvernööri
kenraali **Manuel Pavía** asettui joukkoineen rakennuksen eteen ja
lähetti kaksi adjutanttia vaatimaan Cortesin puheenjohtajaa
**Salmerónia** hajottamaan istunnon ja tyhjentämään talon **viidessä
minuutissa**. Kello oli 6.55 aamulla. Kansalliskaarti miehitti
käytävät. Edustajat pakenivat kiireessä; osa heittäytyi ulos
ikkunoista. Pavía hämmästyi ja kysyi: *"Mutta hyvät herrat, miksi
hypätä ikkunasta, kun ovesta pääsee ulos?"* Pavía tarjosi Castelarille
mahdollisuutta jatkaa. Castelar kieltäytyi — hän ei halunnut pitää
valtaa epädemokraattisin keinoin.

- **Paikka:** Palacio de las Cortes (Congreso de los Diputados),
  Carrera de San Jerónimo, Madrid. **40,416128°N, −3,696821°E**
  (es-Wikipedia, "Leones del Congreso de los Diputados" -artikkelin
  koordinaatit samasta ovesta; itse Congresso ei antanut
  koordinaatteja tässä haussa).
- **Lähde:** en.wikipedia.org/wiki/First_Spanish_Republic, osio
  "Government of Emilio Castelar".
- **Lainaus/perustelu:** "Pavía situated himself in front of the
  building with his staff and ordered two adjutants to impose upon
  Salmerón the dissolution of the Cortes session and the evacuation of
  the building in five minutes... It was 6:55 in the morning... The
  representatives abandoned the building with all speed, amidst scenes
  of exaggerated hysterics; some even threw themselves out the windows.
  Pavía, surprised, asked: 'But gentlemen, Why jump out the windows
  when you can leave through the door?'" · "Pavía... offered to allow
  Emilio Castelar to continue in the presidency, but he refused, not
  wanting to maintain power through undemocratic means."
- **Kuva:** ks. täky 9 (saman rakennuksen leijonat) — sama ovi, sama
  portaikko. Erillistä tarkistettua Pavía-kuvaa ei tähän erään
  vahvistettu; ks. Hylätyt.
- **Varmuus:** VARMA — suoraan lähteessä. **AJOITUS:** tämä tapahtui
  **tammikuussa 1874**, ei 1873. Jos isoisän matka rajataan vuoteen
  1873, tämä on "mitä tapahtui heti hänen jälkeensä" -täky. Se on
  tarinallisesti vahva juuri siksi.

### 7. Tasavalta, joka hallitsi tuskin Madridia — pohjoisessa oli toinen kuningas, omat ministerit ja oma raha

Isoisän matkavuonna Espanjassa oli kaksi hallitusta ja tusina
itsenäisyysjulistusta. Pohjoisessa käytiin **kolmatta karlistisotaa**:
kruununtavoittelija **Kaarle VII** valtasi elokuussa 1873 Estellan
kaupungin, teki siitä pääkaupunkinsa, muodosti oman hallituksen omine
ministereineen ja **löi omaa rahaa** — ja Ranskan puolelta tuli apua.
Helmikuussa 1873 karlistiarmeijassa oli noin **50 000 miestä**.
Etelässä kaupungit julistautuivat kantoneiksi. Wikipedian arvio
tilanteesta on tyly: alue, jolla tasavalta käytti kiistatonta valtaa,
**ei ulottunut juuri Madridin maakuntaa ja luoteis-Espanjaa
kauemmas**. Toukokuun 1873 vaalien äänestysprosentti oli luultavasti
Espanjan historian matalin: **Madridissa noin 25 %**, Kataloniassa
28 % — koska karlistit sotivat, monarkistit boikotoivat ja
työväenjärjestöt kehottivat jäämään kotiin.

- **Paikka:** Madrid (hallitus), Estella Navarrassa (karlistien
  pääkaupunki).
- **Lähde:** en.wikipedia.org/wiki/First_Spanish_Republic, osiot
  "Figueras government" ja "The government of Pi i Margall";
  en.wikipedia.org/wiki/Third_Carlist_War, osio "1873".
- **Lainaus/perustelu:** "turnout was probably the lowest in Spanish
  history, with about 28% in Catalonia and 25% in Madrid." · "The
  Carlist pretender, Charles VII, had formed a rival government in
  Estella with his own ministers and was already minting currency,
  while French connivance allowed him to receive external aid and
  fortify his defences. Between the Carlists and the cantonal
  rebellion, the actual territory in which the short-lived Republic
  exerted undisputed authority did not extend much further than the
  province of Madrid itself and northwestern Spain." · Carlist-artikkeli:
  "In February, the Carlist army numbered around 50,000 men on all
  fronts." · "in August, Carlist forces captured the city of Estella,
  establishing their capital and a provisional government under the
  leadership of Carlos VII."
- **Kuva:** Commons **La Republica Española En La Mundo revista La
  Flaca, 28 de marzo de 1873.JPG** — TARKISTETTU TIEDOSTONIMI ON
  **La Republica Española En El Mundo revista La Flaca, 28 de marzo de
  1873.JPG** (793×473, public domain, Tomás Padró, **28.3.1873**),
  satiirilehden pilakuva tasavallasta isoisän matkavuonna.
  Restrictions tyhjä. Pieni — tarkista riittääkö.
  Vaihtoehto isompaan: **Mapa de España - Constitución de 1873.svg**
  (416×349 nimelliskoko, CC BY-SA 4.0, Jadelmo — SVG skaalautuu) —
  vuoden 1873 liittovaltioluonnoksen kartta.
- **Varmuus:** VARMA — kaikki suoraan lähteissä. Luku "50 000" koskee
  **helmikuuta 1873** ja kaikkia rintamia yhteensä; älä käytä sitä
  yhdestä paikasta.

### 8. Madridin hallitus julisti oman maansa laivaston merirosvoiksi

Kun tasavalta ei ottanut ohjia, **Cartagena** — Espanjan Välimeren
päälaivastotukikohta — julistautui itsenäiseksi kantoniksi 12.7.1873.
Linnoituksen valtaajat halusivat nostaa salkoon punaisen lipun, mutta
punaista väriainetta ei ollut, joten he nostivat **verentahriman
osmanivaltakunnan lipun** — ja kaupungin sotilaskuvernööri lähetti
Madridiin sähkeen, jossa luki: *"Pyhän Julianuksen linnassa liehuu
Turkin lippu."* Kapinalliset saivat puolelleen sataman sota-alukset,
jotka olivat Espanjan parhaita. Kantonin laivasto lähti keräämään
rahaa "ulkovallalta" — Almerían kaupungilta — ja kun kaupunki ei
maksanut, se pommitettiin. Madridin hallitus julisti kantonin johtajan
**merirosvoksi ja pani hänen päästään palkkion**. Fregatit *Almansa* ja
*Vitoria* otettiin lopulta kiinni merirosvoina — ei espanjalaisten
vaan **brittiläisen HMS Swiftsuren ja saksalaisen SMS Friedrich
Karlin** toimesta. Cartagena kesti puoli vuotta, löi omaa rahaa
(*duro cantonal*), otti vastaan keskimäärin **1 200 kranaattia
päivässä**, ja sen johtaja kirjoitti 16.12.1873 kirjeen Yhdysvaltain
presidentille **Ulysses S. Grantille** ja pyysi lupaa nostaa
Yhdysvaltain lippu pommitusten lopettamiseksi. Lupaa ei tullut.
Kaupunki antautui 12.1.1874; noin **70 % rakennuksista oli tuhoutunut**.

- **Paikka:** päätös Madridissa, tapahtumat Cartagenassa
  (37,6019°N, −0,9842°E — en-Wikipedia).
- **Lähde:** en.wikipedia.org/wiki/Canton_of_Cartagena (osiot
  "Establishment", "Expansion", "Defeat", "Aftermath") ja
  en.wikipedia.org/wiki/First_Spanish_Republic (osio "The government of
  Pi i Margall").
- **Lainaus/perustelu:** "Wishing to signal the taking of the castle
  with a socialist red flag but without red dye available, the
  insurgents instead hoisted a blood-stained flag of the Ottoman Empire
  above the castle." · "'Saint Julian castle shows Turkish flag'." ·
  "Under his command, the fleet wreaked havoc on the nearby
  Mediterranean shore, causing the Madrid government to declare him a
  pirate and set a bounty on his head." · "on the trip back to
  Cartagena they were captured as pirates by the armoured frigates HMS
  Swiftsure and SMS Friedrich Karl, under the UK and German flags
  respectively." · "The Canton of Cartagena survived six months of
  constant wars, and even minted its own currency, the duro cantonal."
  · "city suffered an average of 1,200 shellings per day. Roque Barcia
  ... sent on 16 December 1873 a letter to the President of the United
  States, Ulysses S. Grant... in which he requested to raise the
  American flag in the canton in order to avoid the bombing, without it
  finally being carried out." · "it is estimated that approximately 70%
  of the city's buildings were destroyed."
- **Kuva:** Commons **M. Sikles, ministre des Etats-Unis d'Amérique,
  annonçant à M. Figueras la reconnaissance de la République espagnole
  par son gouvernement, de Vierge.jpg** (1846×1290, public domain,
  Daniel Vierge / Urrabieta / Frederick, **8.3.1873**) — aikalaiskaiverrus,
  jossa Yhdysvaltain lähettiläs Sickles ilmoittaa Figuerasille, että
  hänen maansa tunnustaa Espanjan tasavallan. Sama Sickles välitti
  yhdeksän kuukautta myöhemmin Barcian kirjeen Grantille — yksi kuva,
  kaksi täkyä. Restrictions tyhjä.
- **Varmuus:** VARMA yksityiskohdista. **RISTIRIITA MERKITTÄVÄ
  LIPUSTA:** kaksi en-artikkelia kertovat eri tarinan. "Canton of
  Cartagena" sanoo, että punaista ei ollut ja nostettiin verentahrima
  **osmanilippu**. "First Spanish Republic" sanoo päinvastoin, että
  liehuva lippu **oli** kantonin oma punainen lippu, Espanjan
  historian ensimmäinen, ja että sotilaskuvernööri vain luuli sitä
  turkkilaiseksi (osmanien siviililippu oli pelkkä punainen kangas).
  **Kerro sähke, älä lipun alkuperää** — tai kerro molemmat versiot.
  Sama koskee kiinniottopaikkaa: "Canton"-artikkeli sanoo Málaga
  1.8., "First Spanish Republic" sanoo paluumatkalla Alicantesta.
  **Ristiriita on merkittävä; älä valitse puolta ilman uutta lähdettä.**

### 9. Kongressin leijonat valettiin vallatuista tykeistä — ja ne ovat kolmas yritys

Espanjan parlamentin pääovea vartioi kaksi pronssileijonaa. Ne eivät
olleet arkkitehdin suunnitelmassa lainkaan: alun perin paikalle oli
kaavailtu **katulyhtyjä**, mutta niitä ei pidetty tarpeeksi
juhlallisina. Ensimmäinen leijonapari tehtiin vuonna 1851 rahapulan
takia **maalatusta kipsistä**, joka jäljitteli pronssia. Vuoden
kuluttua sää oli syönyt ne surkeaan kuntoon. Toinen pari tilattiin
halvemmalta kuvanveistäjältä, ja siitä tuli kaksi pientä kivileijonaa,
joita aikalaiset sanoivat muistuttavan enemmän **raivotautisia koiria
kuin petoja** — ne poistettiin protestien takia ja ovat nykyään
Valencian Monforten puutarhassa. Kolmatta paria varten Espanjan armeija
antoi kuvanveistäjä Ponciano Ponzanolle **Wad-Rasin taistelussa
23.3.1860 vihollisilta vallatut tykit**, jotka sulatettiin Sevillan
kuninkaallisessa tykkitehtaassa vuonna 1865. Osa edustajista vastusti
sotamateriaalista tehtyjä vertauskuvia niin jyrkästi, että puhuttiin
niiden tuhoamisesta — kiista päättyi vasta **vuonna 1872**, jolloin
leijonat vihdoin nostettiin paikalleen. **Isoisä olisi 1873 nähnyt ne
vuoden vanhoina.** Vasemmanpuoleinen painaa 2 668 kiloa, oikea 2 219.

- **Paikka:** Palacio de las Cortes, Madrid. **40,416128°N,
  −3,696821°E** (es-Wikipedia, coordinates).
- **Lähde:** es.wikipedia.org/wiki/Leones_del_Congreso_de_los_Diputados,
  osiot "Primera pareja de leones", "Segunda pareja de leones",
  "Tercera pareja de leones", "Referencia mitológica".
- **Lainaus/perustelu:** "En el diseño original del edificio... no
  estaban previstos, y en el lugar que ocupan actualmente se preveía se
  alzasen unas farolas." · "Por falta de recursos... Ponciano hizo una
  obra de yeso pintado imitando al bronce. Los leones se colocaron en
  el año 1851 con una ovación general, pero al cabo de un año, por las
  condiciones meteorológicas, los leones presentaban un estado
  deplorable." · "diseñó dos leones de piedra pequeños, que como se
  dijo en la época parecían más perros rabiosos que fieros félidos...
  Actualmente, se encuentran en los Jardines de Monforte en Valencia." ·
  "El 23 de marzo de 1860, el Ejército español consiguió una gran
  victoria en la batalla de Wad-Ras... tomándose unos cañones al
  enemigo. Tales cañones se entregaron a Ponciano para hacer los leones
  del Congreso, siendo fundidos en la Real Fábrica de Artillería de
  Sevilla en el año 1865." · "llegándose a hablar incluso de su
  destrucción, pero en 1872 se zanjó el debate y se colocaron en el
  lugar que ocupan en la actualidad." · "El situado a la izquierda...
  es el de mayor peso, 2668 kilogramos... El de la derecha, Atalanta,
  2219 kilogramos."
- **Kuva: EI LÖYTYNYT tässä erässä.** Kolme Commons-hakua
  ("Leones del Congreso de los Diputados",
  "leon bronce Congreso Diputados Madrid entrada",
  "Leones Congreso Diputados Ponzano escultura") ja kaksi
  kategoriayritystä eivät tuottaneet yhtään kuvatiedostoa leijonista —
  haut palauttivat 1800-luvun kirjoja. es-Wikipedian artikkeli
  linkittää Commons-kategoriaan, joten kuvia on olemassa; **kategorian
  oikea nimi on haettava artikkelin Commons-linkin kautta.**
  **ÄLÄ VIE PELIIN ilman imageinfo-tarkistusta.**
- **Varmuus:** VARMA rakennushistoriasta ja painoista. **LEGENDA
  MERKITTÄVÄ:** leijonien nimet ja se, ovatko ne Daoíz ja Velarde vai
  Hipómenes ja Atalanta, on lähteen itsensä mukaan kaupunkilegendan
  värittämä ("varias fuentes influenciadas por la leyenda urbana"). Sano
  "niitä kutsutaan yleisesti nimillä Daoíz ja Velarde", älä sen
  enempää. **13+ -HUOMIO:** artikkelin loppuosa käsittelee sitä, että
  toiselta leijonalta puuttuvat kivekset, ja vuoden 2012
  mainoskampanjaa asian ympärillä. Tieto on tarkistettu ja
  aikuisyleisölle sopiva, mutta se on **Fablen päätös**, otetaanko se
  mukaan — täky kantaa ilmankin.
- **ELÄINKYTKÖS:** veistettyjä eläimiä, ei eläviä. Ei lasketa
  ELÄINTÄKY-kiintiöön (siihen ks. täyt 1 ja 2), mutta sopii eläinteemaan
  pariksi.

### 10. Goyan mustat maalaukset olivat vielä 1873 talon seinissä — ja talo ei ollut nimetty Goyan kuuroudesta

Goya osti Manzanaresin rannalta, noin 300 metriä Segovian sillasta,
maatilan nimeltä **Quinta del Sordo**, "kuuron talo". Yleinen käsitys
on, että nimi tuli Goyan omasta kuuroudesta. Se ei pidä paikkaansa:
talon **edellinen omistaja Pedro Marcelino Blanco oli kuuro**. Goya
maalasi vuosina 1820–1823 talon kahden salin seiniin neljätoista
teosta, joita nykyään sanotaan **mustiksi maalauksiksi**. Hän ei
antanut niille nimiä eikä aikonut näyttää niitä kenellekään. Vuonna
1859 Goyan pojanpoika myi tilan. **Vuodesta 1873 sen omisti
ranskalainen pankkiiri, paroni Émile d'Erlanger**, ja **vuonna 1874**
hän teetti työn, jossa maalaukset irrotettiin seinistä ja siirrettiin
kankaalle. Sitä ennen valokuvaaja **J. Laurent kuvasi kaikki neljätoista
maalausta paikallaan seinässä** vuonna 1874, 27 × 36 cm:n lasinegatiiveille
— osan sisävalokuvista sähkövalossa. Kuvista näkyy, että maalaukset
olivat halkeilleet ja että salien seinät oli **tapetoitu kukka- ja
kuviotapetilla**, ja maalauksia kiersivät paperiset kehykset.
**Isoisä osui siis viimeiseen vuoteen, jolloin ne olivat vielä
seinässä.** Irrottaminen mursi savitiiliseinät niin pahoin, että koko
siipi purettiin noin 1876.

- **Paikka:** Carabanchel Bajo, nykyisin Latinan kaupunginosa;
  tontti nykyisten katujen Doña Mencía, Baena, Caramuel ja Juan Tornero
  rajaamalla alueella. **40,411161°N, −3,7267405°E** (es-Wikipedia,
  coordinates — tontin sijainti, taloa ei ole enää olemassa).
- **Lähde:** es.wikipedia.org/wiki/Quinta_del_Sordo, johdanto ja osiot
  "Relación de Goya con la finca", "Descripción";
  en.wikipedia.org/wiki/Black_Paintings, osio "History".
- **Lainaus/perustelu:** "En contra de la creencia popular, el nombre
  de la finca no se debía a la sordera del pintor, sino a la de un
  anterior propietario." · "Goya adquirió esta villa el 27 de febrero
  de 1819, a un anterior propietario, Pedro Marcelino Blanco, que era
  sordo." · "En 1859, Mariano Goya, nieto del maestro, vende la
  propiedad. A partir de 1873, el barón de Erlanger... es dueño de la
  finca... En 1874, Émile d'Erlanger, encarga el traslado a lienzo de
  las pinturas murales." · "Laurent, en 1874, fotografió las 14
  pinturas murales entonces existentes en la Quinta de Goya, antes de
  su traslado a lienzo. Los negativos de vidrio originales, del
  gigantesco formato 27 x 36 centímetros, se conservan en el Archivo
  fotográfico Ruiz Vernacci." · "Entre 1874 y 1876 se arrancan las
  pinturas... Mucho antes, hacia 1876, se derribó el ala izquierda...
  al arrancar las pinturas hubo que perforar las paredes de adobe,
  arruinando las salas." · en-Black Paintings: "The slow process of
  transferring the murals onto canvas began in 1874."
- **Kuva (paras, ISO):** Commons **Dos viejos, Pinturas negras, en los
  muros de la Quinta del Sordo o Quinta de Goya, fotografía de Laurent,
  año 1874, Fototeca del IPCE.jpg** (**6240×8400**, CC BY-SA 4.0,
  Carlos Teixidor Cadenas, kuvan päiväys 1874) — Laurentin alkuperäinen
  1874-valokuva maalauksesta **seinässä**, tapetti näkyvissä.
  Restrictions tyhjä. Tämä on koko listan vaikuttavin kuva: pelaaja
  näkee tasan sen, minkä isoisä olisi nähnyt.
- **Kuva (ELÄINKYTKÖS):** Commons **Pinturas Negras de Goya, "El
  perro" o "Perro semihundido", fotografía de J. Laurent en 1874, en el
  interior de la Quinta del Sordo, posiblemente con iluminación
  eléctrica, VN-06583 P.jpg** (1320×1770, CC BY-SA 2.5 es, J. Laurent,
  1874) — "Koira", seinässä. Restrictions tyhjä.
- **Varmuus:** VARMA. **KIISTA MERKITTÄVÄ:** taidehistorioitsija Juan
  José Junquera esitti 2003, ettei Goya voi olla maalausten tekijä
  (hänen mukaansa talossa oli Goyan aikana vain yksi kerros). Nigel
  Glendinning kumosi väitteet 2004, ja Prado pitää teoksia aitoina.
  Jos aihetta käsitellään, **mainitse kiista ja sen ratkeaminen** —
  älä esitä kiistaa avoimena. **PÄÄLLEKKÄISYYS:** peli mainitsee
  "mustat maalaukset" jo Prado-jutussa; tämä täky ei kerro
  maalauksista vaan **talosta ja vuodesta 1873**.
- **13+ -HUOMIO:** mustat maalaukset ovat synkkiä (mm. Saturnus).
  Pysy talossa, tapetissa ja valokuvaajassa; älä kuvaile aiheita.
  Suositeltu kuva ("Dos viejos") on hillityin.

### 11. Puerta del Solin kellon lahjoitti maanpakolainen, joka aloitti lontoolaisen kellokaupan siivoojana

Se kello, jonka kahtatoista lyöntiä koko Espanja yhä katsoo
uudenvuodenyönä, on lahja. **José Rodríguez Losada** (1801–1870)
syntyi köyhään perheeseen Leónin maakunnan pikkukylässä Iruelassa.
Liberaalina hän joutui pakenemaan Espanjasta ratsain Ranskaan ja sieltä
Lontooseen. Maanpakolaisten avustuskomitea hankki hänelle työn
**siivoojana kellosepänliikkeessä**. Roskiin heitetyistä koneistoista
hän alkoi koota toimivia kelloja; kun mestari sairastui, Losada hoiti
liikkeen, ja mestarin kuoltua hän peri sen — **viisi vuotta sen
jälkeen kun oli paennut maasta oikeutta karkuun**. Hänestä tuli
Espanjan laivaston kronometrimestari. Kun hän palasi käymään Madridissa,
Puerta del Solin virastotalon kello kävi huonosti ja madridilaiset
valittivat siitä. Losada päätti tehdä paremman ja **lahjoitti sen
Madridin kaupungille vuonna 1866**. Isoisän saapuessa 1873 kello oli
siis seitsemän vuotta vanha — ja sen antaja oli kuollut Lontoossa
kolme vuotta aiemmin, eikä ollut koskaan muuttanut takaisin.

- **Paikka:** Real Casa de Correos, Puerta del Sol. **40,4164056°N,
  −3,7038°E** (es-Wikipedia, "Real Casa de Correos", coordinates).
- **Lähde:** es.wikipedia.org/wiki/José_Rodríguez_Losada, osiot
  "Exilio", "Losada empresario" ja "Regreso a España y Reloj de
  Gobernación".
- **Lainaus/perustelu:** "fue un relojero español. Militar liberal
  exiliado en Londres... Es conocido por haber donado al Ayuntamiento
  de Madrid el reloj de Gobernación que preside la Puerta del Sol de
  Madrid (1866)." · "El Comité le consiguió en los primeros días de
  exilio un trabajo como mozo de limpieza en una relojería. Se menciona
  como ya desde los primeros meses con las maquinarias desechadas y
  tiradas a la basura Losada componía verdaderos relojes." · "El dueño
  de la relojería cae enfermo de una larga enfermedad y es José el
  encargado de sustituirlo. Finalmente muere el jefe y Losada hereda el
  negocio... Habían pasado tan sólo cinco años desde que se fue huyendo
  de la justicia en España." · "Es posible que se fijara en el reloj de
  la torreta del edificio del Ministerio de Gobernación y que recibiera
  las quejas de los madrileños de la época, no funcionaba bien...
  Losada decidió elaborar un reloj que reparara este retraso." ·
  "Rodríguez Losada falleció, el 6 de marzo de 1870, en Londres."
- **Kuva:** tarkistus kesken (ks. kuvamuistio). Pelissä on jo
  js/packs/europe-valokuvat.js:ssä **Puerta del Sol - Reloj.jpg**
  (Real Casa de Correosin kellotorni) — **se riittää tähän täkyyn
  sellaisenaan**, koska täky kertoo kellosta, joka pelissä jo näkyy.
- **Varmuus:** VARMA lahjoituksesta, maanpaosta, siivoojan työstä ja
  kuolinvuodesta. **EPÄVARMA — LÄHDE ITSE VARAA:** artikkeli sanoo
  lapsuudenpaosta "hay rumores" ja kellon syntyideasta "Es posible que
  se fijara". Kirjoita "kerrotaan" tai jätä pois. Kuuluisa tarina
  kadonneesta vasikasta, jonka takia hän karkasi kotoa, on lähteessä
  nimenomaan huhu — **älä esitä sitä faktana**.
- **KAARIKYTKÖS (tärkeä):** tämä täky istuu suoraan olemassa olevaan
  KAARI_PAKETIT-kohteeseen `madrid` ("Madrid — kolmastoista lyönti",
  kellomestari Pilar). Se antaa Pilarin koneistolle historian ilman
  että kaaritekstiä tarvitsee koskea.

### 12. Ennen vuotta 1858 Madrid joi 950 vedenkantajan selästä

Madridissa ei ole jokea, josta juoda. Vuosisatojen ajan vesi tuotiin
kaupunkiin maanalaisia käytäviä pitkin, joita sanottiin *viajes de
agua*, "veden matkoiksi", ja jaettiin julkisista suihkulähteistä.
1800-luvun puolivälissä kaupungissa oli **77 julkista lähdettä ja 128
hanaa**, joista täyttivät saavinsa **950 aguadoria** eli
vedenkantajaa. Määrä riitti noin **6,5 litraan asukasta kohti
päivässä** — hyvin vähän muihin aikakauden kaupunkeihin verrattuna.
Ratkaisu oli tuoda vesi Lozoya-joesta asti. Työ alkoi 1851, ja
**24.6.1858 vesi saapui Madridiin** Calle Ancha de San Bernardolle.
Suunnitelma oli mitoitettu kaksinkertaiselle väestölle, ja osa vuoden
1851 laitoksista on **yhä käytössä**. Isoisän saapuessa 1873 uusi vesi
oli virrannut viisitoista vuotta ja vedenkantajan ammatti oli
kuolemassa.

- **Paikka:** Madrid; Pontón de la Oliva -pato Lozoyalla,
  Calle de San Bernardo keskustassa.
- **Lähde:** es.wikipedia.org/wiki/Canal_de_Isabel_II, osiot
  "Historia" ja "La primera llegada de las aguas, calle San Bernardo".
- **Lainaus/perustelu:** "A mediados del xix, la capital contaba con 77
  fuentes públicas, en las que se instalaron 128 caños para llenar las
  cubas de los 950 aguadores... la dotación que proporcionaban los
  viajes se reducía a unos 6,5 litros diarios por habitante, una
  cantidad muy escasa en comparación con otras ciudades de la época." ·
  "el 24 de junio de 1858, tuvo lugar la inauguración oficial, en la
  calle ancha de San Bernardo, de la llegada de las aguas a Madrid." ·
  "El proyecto estaba redactado con tal previsión que era más que
  suficiente para abastecer a una población el doble de la que
  existía... en la actualidad siguen funcionando parte de las
  instalaciones originales."
- **Kuva (AIKALAINEN, paras):** Commons **Cuarto de aguadores en
  Madrid. Aguadores gallegos.jpg** (1920×1506, public domain,
  Manuel Rodríguez de Guzmán, **1859**) — "vedenkantajien huone
  Madridissa, galicialaisia vedenkantajia", maalattu vuosi sen
  jälkeen kun Lozoyan vesi tuli kaupunkiin. Restrictions tyhjä.
- **Kuva (vielä lähempänä isoisän vuotta):** Commons
  **Casimiro Sainz-Aguadores de Madrid-1875.jpg** (800×599, public
  domain, Casimiro Sainz, **1875**) — "Madridin vedenkantajat",
  maalattu **kaksi vuotta isoisän matkan jälkeen**. **PIENI** —
  tarkista riittääkö. Restrictions tyhjä.
- **HUOM SILMÄTARKISTUS:** molemmissa on ihmisiä, mutta ne ovat
  1800-luvun maalauksia nimettömistä työläisistä, eivät valokuvia
  tunnistettavista henkilöistä. Pelin oma henkilökuvasääntö on silti
  tarkistettava ennen käyttöä.
- **Varmuus:** VARMA — kaikki luvut suoraan lähteessä. **AJOITUS:**
  1873 on oma päätelmäni (1873 − 1858 = 15 vuotta), ei Wikipedian
  väite.

### 13. Madridin ensimmäistä raitiovaunua vetivät muulit, ja avajaiset tilattiin ravintolasta

Madridin raitiovaunuliikenne avattiin **31.5.1871**, kaksi vuotta
ennen isoisän matkaa, ja es-Wikipedian mukaan se oli **Manner-Espanjan
ensimmäinen**. Vaunuja vetivät **muulit**. Linja lähti Serrano-kadulta,
kulki Alcalá-katua Puerta del Solille ja jatkoi Pozasin
kaupunginosaan. Kalustoa oli **24 vaunua**, kukin 2 000 pesetaa, ja
**120 vetojuhtaa**. Yhteen vaunuun mahtui 24 matkustajaa: 16 sisään ja
8 katolle avoimeen *imperialiin*. Avajaisjuhlan tarjoilu tilattiin
ravintola **Lhardystä**. Toinen linja Plaza Mayorille tuli 1874. Vasta
1879 Leganésin linjalla siirryttiin höyryyn ja 1899 sähköön. Viimeinen
raitiovaunu ajoi Madridissa **1.6.1972** — sata vuotta ja yksi vuosi
ensimmäisen jälkeen.

- **Paikka:** Serrano — Alcalá — Puerta del Sol — Pozas, Madrid.
- **Lähde:** es.wikipedia.org/wiki/Tranvías_de_Madrid, johdanto ja osio
  "Inauguración".
- **Lainaus/perustelu:** "En 1871 empezó a funcionar el primer tranvía
  de la España peninsular, en Madrid." · "El 31 de mayo de 1871 se
  inauguraba el servicio de tranvías de Madrid con coches arrastrados
  por mulas. La celebración se encargó al restaurante Lhardy. La línea
  nacía en la calle de Serrano, por la calle de Alcalá llegaba a la
  Puerta del Sol y seguía hasta el barrio de Pozas. Disponía de 24
  coches, cada uno de los cuales costó 2000 pesetas, y de 120
  caballerías. Cada coche tenía capacidad para 24 pasajeros, 16 en el
  interior y 8 en la imperial, al descubierto." · "el 1 de junio de
  1972, desaparecieron las últimas líneas."
- **Kuva:** Commons **1891-01-08, La Ilustración Española y Americana,
  Costumbres madrileñas, El último tranvía.jpg** (4224×3048, public
  domain, Juan Comba García / Tomás Carlos Capuz, julkaistu 8.1.1891) —
  aikalaiskaiverrus "illan viimeinen raitiovaunu", 18 vuotta isoisän
  matkan jälkeen mutta samaa aikaa ja samaa tekniikkaa.
  Restrictions tyhjä.
- **Varmuus:** VARMA — kaikki suoraan lähteessä. **TARKKUUS:** lähde
  sanoo *"primer tranvía de la España peninsular"* — **Manner-Espanjan**
  ensimmäinen, mikä jättää auki Kuuban ja Kanarian. Älä sano "Espanjan
  ensimmäinen" ilman tuota rajausta. Sana *caballerías* tarkoittaa
  vetojuhtia yleisesti; lähde sanoo vaunuja vedetyn muuleilla.
- **ELÄINKYTKÖS:** 120 muulia. Ei varsinainen eläintäky mutta kelpaa
  eläinteeman siltana.

### 14. Lääkäri rakensi 1873 talon luukokoelmalleen — ja pyysi kuninkaalta ruumiita

Alfonso XII -kadun varrella seisoo talo, jonka **rakennettiin vuosina
1873–1875** arkkitehti Francisco de Cubasin piirustusten mukaan. Sen
teetti kirurgi **Pedro González de Velasco** (1815–1882), joka pani
siihen kaikki säästönsä. Talo oli yhtä aikaa hänen kotinsa ja hänen
museonsa: sinne hän sijoitti matkoillaan keräämänsä kokoelmat, joiden
ytimessä oli **500 kallon** sarja. Kuningas Alfonso XII vihki paikan
**29.4.1875** nimellä *Museo Anatómico*, vaikka kansa sanoi sitä
Antropologiseksi museoksi oven kyltin mukaan. Vihkiäisissä kuningas
kysyi, mitä lääkäri toivoisi voidakseen jatkaa työtään. Velasco
vastasi: *"Että minulle annettaisiin ruumiita, jotta voin opettaa
eläviä!"* Samana vuonna 1873 hän perusti myös oman lehden, *El
Anfiteatro Anatómico Español*. Talo on nykyään Espanjan
**kansallinen antropologinen museo**, ja sen kokoelmissa on lähes
29 000 esinettä viideltä mantereelta. Velasco itse haudattiin
lopulta San Isidron hautausmaalle — mutta hänen **balsamoitu
ruumiinsa oli siihen asti museossa, vuoteen 1943**.

- **Paikka:** Calle de Alfonso XII 68, Madrid. **40,407694°N,
  −3,688975°E** (es-Wikipedia, coordinates).
- **Lähde:** es.wikipedia.org/wiki/Museo_Nacional_de_Antropología_(España),
  osiot "Historia", rakennusta ja kokoelmia koskevat osiot; ja
  es.wikipedia.org/wiki/Pedro_González_de_Velasco.
- **Lainaus/perustelu:** "El edificio fue diseñado y construido entre
  1873 y 1875 por Francisco de Cubas, para servir a la vez como
  residencia y museo del doctor Velasco, que invirtió en él todos sus
  ahorros." · "en el año 1873, se construyó un edificio proyectado por
  Francisco de Cubas... En su casa depositó las piezas recolectadas y
  con ello creó el museo que el 29 de abril de 1875 inaugura Alfonso
  XII." · "el monarca le pidió que le formulase un deseo para que
  pudiese continuar su labor, Velasco respondió: '¡que me concedan
  cadáveres para enseñar a los vivos!'. En 1873 fundó la revista El
  Anfiteatro Anatómico Español." · "El origen de la colección se sitúa
  en la colección de 500 cráneos reunida por el doctor Velasco." · "El
  cuerpo del doctor González de Velasco permaneció en el museo hasta
  1943 y entonces su cuerpo embalsamado fue trasladado al mencionado
  cementerio."
- **Kuva: EI LÖYTYNYT tässä erässä.** Kaksi Commons-hakua
  ("Museo Nacional de Antropologia Madrid edificio",
  "Museo Antropologia Madrid Velasco fachada edificio") ja
  kategoriayritys eivät tuottaneet yhtään kuvaa rakennuksesta.
  Kohde on kadunvarsirakennus osoitteessa Calle de Alfonso XII 68;
  **kokeile hakua englanniksi tai katuosoitteella.**
  **ÄLÄ VIE PELIIN ilman imageinfo-tarkistusta.**
- **Varmuus:** VARMA kaikesta yllä olevasta. **HERKKYYS — LUE TÄMÄ:**
  Velascon ympärillä on tunnettu makaaberi tarina, jonka **es-Wikipedia
  itse otsikoi "Leyenda del Dr. González de Velasco"** — legendaksi.
  Sen mukaan hän balsamoi 15-vuotiaana kuolleen tyttärensä Conchan
  (k. 12.5.1864), toi tämän museotaloon morsiuspuvussa ja ajeli
  vaunuissa tämän kanssa. Artikkeli sanoo huhuista suoraan **"se
  rumoreaba"**. Kirjailija Ramón J. Sender kirjoitti aiheesta
  novellin "La hija del doctor Velasco". **Suositukseni täkyyn: jätä
  tytär kokonaan pois.** Täky kantaa ilman häntä — ruumiiden pyytäminen
  kuninkaalta ja 1873 rakennettu talo riittävät. Jos tarina halutaan
  käyttöön, se kuuluu takynostot-espanja.md:hen ja **merkittynä
  legendaksi** (ks. sikäläinen ehdokas 8).

### 15. Madridin karhu nousi takajaloilleen, koska kaupunki voitti oikeusjutun polttopuista (ELÄINTÄKY, VERTAUSKUVALLINEN)

Madridin vaakunassa on karhu, joka kurottaa mansikkapuuhun. Karhu on
ollut kaupungin merkki ainakin 1200-luvun alusta: kaupungin
miliisit kantoivat taisteluihin lippua, jossa oli **musta karhu
hopeisella pohjalla**, ja se käveli neljällä jalalla. Sitten tuli
riita. 1200-luvun alussa kaupungin raati ja tuomiokapituli kiistelivät
El Real de Manzanaresin metsien ja laidunten käytöstä. **Vuonna 1222
asia ratkaistiin: laidunrehu kuului papeille, metsät kaupungille.**
Sen jälkeen kaupungin tunnuksissa karhu alkoi seistä takajaloillaan
nojaten puuhun — mahdollisesti juuri siksi, että se korosti kaupungin
oikeutta puihin. Kapitulin omissa merkeissä karhu jäi kävelemään.
Sivuhuomio, joka tuskin lohduttaa kasvitieteilijää: siitä, miksi puu
on juuri mansikkapuu (*Arbutus unedo*), ei ole varmuutta — laji ei ole
Madridissa erityisen yleinen, ja yksi selitys on pelkkä sekaannus
latinan sanojen *arbutus* ja *arbustus* välillä.

- **Paikka:** koko Madrid; patsas Puerta del Solilla (JO PELISSÄ,
  nahtavyysjutut.js).
- **Lähde:** en.wikipedia.org/wiki/Coat_of_arms_of_Madrid, osio
  "History".
- **Lainaus/perustelu:** "According to chronicles, the militias of the
  council of Madrid carried a banner identified them in different
  battles of the early 13th century: a bear sable (prieto) on a field
  argent." · "In 1222, the fodder was determined to belong to the
  clergymen, whereas the forests would pertain to the council. The
  bear, which formerly had been displayed on all fours, began to stand
  on its hind legs leaning on a tree in council representations,
  possibly underpinning the control of timber by the council, whereas
  the cabildo's bear in cabildo emblems remained walking." · "There are
  several hypotheses regarding the beginnings of the identification of
  the tree with a strawberry tree (Arbutus unedo), be it a
  Arbutus/Arbustus confusion the improbable abundance of the species in
  Madrid... or perhaps an attempt to improve on the gaudiness or the
  composition."
- **Kuva (AIKALAINEN, paras tähän täkyyn):** Commons **Escudo de
  Madrid ciudad (Piferrer, 1860).jpg** (350×480, public domain,
  Francesc Piferrer Montells, **1860**) — vaakuna sellaisena kuin se
  painettiin kolmetoista vuotta ennen isoisän matkaa. **PIENI** —
  tarkista riittääkö miniatyyriksi. Restrictions tyhjä.
- **Kuva (skaalautuva):** Commons **Escudo de la Villa de Madrid.svg**
  (715×915 nimelliskoko, public domain, Hansen, 2008) — SVG, skaalautuu
  mihin kokoon tahansa. Restrictions tyhjä.
- **Kuva (jo pelissä):** **Escultura del Oso y el Madroño, Puerta del
  Sol, Madrid, España, Spain.jpg** (nahtavyysjutut.js, Carlos Teixidor
  Cadenas, CC BY-SA 4.0) — **tämä riittää tähän täkyyn sellaisenaan**,
  koska täky selittää kuvan, joka pelissä jo on.
- **Varmuus:** VARMA siitä, mitä lähde sanoo. **LÄHDE ITSE VARAA
  KAHDESTI:** karhun nousemisen syystä sanotaan "possibly", ja puun
  lajista annetaan kolme kilpailevaa hypoteesia. Kirjoita
  **"selitykseksi on tarjottu"**, älä "koska". Tämä on täky, jonka
  koukku on nimenomaan siinä, että vaakunaeläimen asennolla on
  oikeusjutun mittainen selitys — varaus ei syö koukkua.

### 16. Maailman vanhin ravintola ei luultavasti ole maailman vanhin ravintola

Madridin **Sobrino de Botín** Cuchilleros-kadulla on Guinnessin
ennätystenkirjassa maailman vanhimpana ravintolana: perustettu
kerronnan mukaan vuonna **1725** ranskalaisen kokin Jean Botínin ja
hänen asturialaisen vaimonsa toimesta, ja toiminut siitä lähtien
yhtäjaksoisesti. en-Wikipedia sanoo tästä suoraan: **"This is a
legend."** Ravintola, silloin nimellä *Pastelería de Cándido Remis,
Sobrino de Botín*, avattiin **vuonna 1865**. Alkuperäinen 1700-luvun
lopun *Pastelería de Botín* oli eri paikassa, Plaza de Herradoresilla,
ja sitä piti José Puertas Sánchez, lempinimeltään Botín. Kun hän kuoli
1847, veljenpoika Cándido Remis hoiti liikettä vuokralaisena, ja
riitaannuttuaan talon omistajan kanssa hän avasi 1865 oman paikkansa —
sen, joka on nyt Guinnessissa. **Isoisän matkavuonna 1873 "maailman
vanhin ravintola" oli siis kahdeksan vuotta vanha.** Ravintola
mainitaan Hemingwayn romaanin *Ja aurinko nousee* loppusivuilla —
mutta tutkija Miguel Izu esittää, että Hemingway tarkoitti
todennäköisesti sitä *toista*, vanhempaa Botínia Plaza de
Herradoresilla.

- **Paikka:** Calle de Cuchilleros 17, Madrid. **40,4142°N,
  −3,70796°E** (en-Wikipedia, coordinates).
- **Lähde:** en.wikipedia.org/wiki/Sobrino_de_Botín, johdanto ja osio
  "History".
- **Lainaus/perustelu:** "It is listed in the Guinness Book of Records
  as the oldest in the world, said to have been founded in 1725 by
  French cook Jean Botín and his Asturian wife and to have been
  operating continuously ever since. **This is a legend**; the
  restaurant, then called 'Pastelería de Cándido Remis, Sobrino de
  Botín', opened in 1865." · "In 1865, Cándido Remis broke with Eduardo
  León and opened his own establishment... at 17 Cuchilleros Street." ·
  "The restaurant and its specialty of cochinillo asado (roast suckling
  pig) are mentioned in the closing pages of Ernest Hemingway's novel
  The Sun Also Rises. However, Miguel Izu claims that Hemingway most
  likely was referring to a different restaurant, the Antigua Casa
  Botín in Plaza de Herradores."
- **Kuva:** Commons **Casa Botín 1.jpg** (2112×2816, public domain,
  Esetena, 20.7.2006) — julkisivu ja kyltti, ei ihmisiä.
  Restrictions tyhjä. Vaihtoehto isompaan: **2014 - Sobrino de Botín
  (Casa Botín) Restaurant, Madrid, Spain ( Ank Kumar ) 01.jpg**
  (6000×4000, CC BY-SA 4.0, Ank Kumar, 30.9.2014).
- **HUOM SILMÄTARKISTUS:** ravintolan kuvissa on usein jonottavia
  asiakkaita. Nimenomaan **Sobrino de Botín queue
  (42903785211).jpg** (Den C, CC BY 2.0) on jonokuva — **älä käytä**.
  Tarkista suositellutkin kuvat silmällä ennen käyttöä.
- **Varmuus:** VARMA siitä, että **Wikipedia kiistää** perustamisvuoden
  1725. **TÄRKEÄ SANAMUOTO:** älä sano "Guinness valehtelee" — sano,
  että Guinness listaa vuoden 1725 ja että Wikipedia kutsuu sitä
  legendaksi ja antaa vuodeksi 1865. Tämä on totuudellisuuspilarin
  kannalta juuri oikea täky: se opettaa, että ennätyksetkin ovat
  väitteitä.
- **13+ -HUOMIO:** talon erikoisuus on paahdettu maitoporsas. Mainitse
  ruokalaji neutraalisti tai jätä pois; älä kuvaile valmistusta.

### 17. Galileolta kysyttiin, miten pronssihevonen seisoo kahdella jalalla

Plaza de Orienten keskellä kohoaa Filip IV:n ratsastajapatsas. Se on
peräisin 1600-luvulta, vaikka koko aukio rakennettiin sen ympärille
vasta 1800-luvulla. Kuningas halusi patsaan, joka ylittäisi hänen
isänsä Filip III:n patsaan Plaza Mayorilla — ja hänen suosikkinsa,
kreivi-herttua Olivares, määräsi hevosen esitettäväksi **corveta-asennossa**,
etujalat ilmassa, koko paino takajaloilla ja hienovaraisesti hännällä.
Sellaista ei ollut veistoksessa ennen tehty. Työ tilattiin
firenzeläiseltä **Pietro Taccalta**, jolle lähetettiin Madridista kaksi
**Velázquezin** maalaamaa luonnosta ja **Juan Martínez Montañésin**
veistämä kuninkaan pää malliksi. Tacca teki patsasta kuusi vuotta,
1634–1640. es-Wikipedian mukaan **perimätieto kertoo**, että Tacca sai
tasapaino-ongelmaan neuvon **Galileo Galileilta**: tee veistoksen
takaosa umpinaiseksi ja etuosa onteloksi. Ratkaisusta tuli
veistostaiteen uusi malli 1600- ja 1700-luvuiksi. Loppukommentti
taiteilijan tuskasta: kun ensimmäinen savimalli lähetettiin Espanjaan
hyväksyttäväksi, kuningas ei tunnistanut omaa naamaansa, ja pää
jouduttiin teettämään uudelleen — sen teki Taccan poika.

- **Paikka:** Plaza de Oriente, Madrid. **40,41853782°N,
  −3,71224015°E** (es-Wikipedia, coordinates).
- **Lähde:** es.wikipedia.org/wiki/Monumento_a_Felipe_IV, johdanto ja
  osio "Estatua ecuestre / Historia".
- **Lainaus/perustelu:** "Esta se debe al escultor Pietro Tacca, quien
  la realizó en Italia utilizando un diseño de Diego Velázquez y con el
  asesoramiento científico de Galileo Galilei para asegurar su
  estabilidad." · "Se trata de una obra maestra de la escultura
  ecuestre... por estar considerada la primera escultura 'en corveta',
  es decir con las patas delanteras del caballo levantadas, sostenido
  sobre las traseras, y discretamente sobre su cola." · "**Según la
  tradición**, el escultor italiano contó con el asesoramiento
  físico-matemático de Galileo Galilei (1564-1642), quien le sugirió
  que, para lograr que el caballo se sujetase solamente sobre dos
  patas, hiciera maciza la parte trasera de la escultura y hueca la
  delantera." · "Tacca trabajó seis años en la escultura, desde 1634
  hasta 1640." · "Cuando Tacca envió a España el primer modelo en barro
  de la estatua para su aprobación por el monarca, este no dio su visto
  bueno a la cabeza, pues no encontraba parecido con su rostro."
- **Kuva:** Commons **Plaza de Oriente (Madrid). Monumento a Felipe
  IV.jpg** (2736×2736, CC BY 3.0, Jose Luis Filpo Cabana, maaliskuu
  2013) — patsas neliökuvana, hyvä miniatyyriksi. Restrictions tyhjä.
  Vaihtoehto CC0-lisenssillä: **Madrid - Plaza de Oriente en 2018,
  Monumento a Felipe IV (1).jpg** (1536×2048, CC0, Zarateman,
  16.11.2018).
- **HUOM SILMÄTARKISTUS:** Plaza de Oriente on vilkas aukio; tarkista
  silmällä, ettei kuvassa ole tunnistettavia ohikulkijoita etualalla.
- **Varmuus:** VARMA patsaasta, corvetasta, Velázquezista, Taccasta ja
  hylätystä päästä. **RISTIRIITA ARTIKKELIN SISÄLLÄ:** johdanto sanoo
  Galileon neuvonnasta suoraan ("con el asesoramiento científico de
  Galileo Galilei"), mutta itse osio sanoo **"Según la tradición"**.
  **Käytä varovaisempaa muotoa**: "perimätiedon mukaan Galileolta
  kysyttiin neuvoa". Älä sano, että Galileo laski patsaan.
- **ELÄINKYTKÖS:** veistetty hevonen, ei elävä. Ei lasketa
  ELÄINTÄKY-kiintiöön.

### 18. Espanja vapautti Puerto Ricon orjat keskellä kaaosvuottaan — mutta vapaus piti ostaa

**22.3.1873**, kuusi viikkoa tasavallan julistamisen jälkeen, Espanja
lakkautti orjuuden Puerto Ricossa. Asiaa oli valmisteltu Madridissa:
puertoricolainen valtuuskunta oli esittänyt asiansa "Merentakaisten
alueiden tietokomiteassa", ja 19.11.1872 Román Baldorioty de Castro,
Luis Padial, Julio Vizcarrondo ja merentakaisten alueiden ministeri
Segismundo Moret jättivät oman esityksensä. Tasavallan
ulkoministerinä esityksen läpi ajoi **Emilio Castelar** — sama mies,
joka syyskuussa nousi valtionpäämieheksi (täky 5). Kuubassa samaa ei
tehty, koska siellä oli sota käynnissä. Mutta lakia kannattaa lukea
loppuun: **orjia ei vapautettu ilmaiseksi.** Heidän oli ostettava
vapautensa hinnalla, jonka viimeinen omistaja määräsi, ja lisäksi
tehtävä vielä **kolme vuotta töitä** entiselle isännälleen tai
valtiolle korvauksena. Jäljellä olleita orjia oli tuolloin arviolta
30 000, noin 5 % väestöstä. Puerto Ricossa **22. maaliskuuta on yhä
vapaa päivä**, Abolition Day.

- **Paikka:** päätös Madridissa (Cortes), vaikutus Puerto Ricossa.
- **Lähde:** en.wikipedia.org/wiki/Afro–Puerto_Ricans, osiot
  "Abolitionists" ja "Abolition of slavery";
  en.wikipedia.org/wiki/First_Spanish_Republic, johdanto ja osio
  "Government of Emilio Castelar".
- **Lainaus/perustelu:** "On March 22, 1873, slavery was officially
  abolished in Puerto Rico." · "On March 22, 1873, slavery was
  abolished in Puerto Rico, but with one significant caveat. The slaves
  were not emancipated; they had to buy their own freedom, at whatever
  price was set by their last masters. The law required that the former
  slaves work for another three years for their former masters, other
  people interested in their services, or for the state in order to pay
  some compensation. The remaining slaves at the time of enactment,
  were estimated around 5% of the population (≈30,000)." · "In Puerto
  Rico, March 22 is known as 'Abolition Day' and it is a holiday
  celebrated by those who live in the island." · Republic-artikkeli:
  "The period also saw the end of compulsory conscription, the
  regulation of child labor and the abolition of slavery in Puerto
  Rico." · "During his previous time as Minister of State in the
  government of Estanislao Figueras, Castelar promoted and achieved the
  approval of the abolition of slavery in the overseas territory of
  Puerto Rico, although not in Cuba because of the continuing war
  situation. This act by the First Spanish Republic is commemorated in
  Puerto Rico up to the present day."
- **Kuva:** ei erikseen haettua. **Suositus: käytä täkyn 5 kuvaa**
  (tasavallan allegoria 1873) tai jätä ilman kuvaa — orjuusaiheiseen
  täkyyn ei pidä hakea kuvitusta orjuutetuista ihmisistä.
- **Varmuus:** VARMA päivämäärästä, ehdoista ja Castelarin roolista.
  **RISTIRIITA MERKITTÄVÄ:** en-artikkeli sanoo yhdessä kohdassa
  "On March 22, 1873, the Spanish government approved what became known
  as the Moret Law". Tämä on **artikkelin oma epätarkkuus**: Moretin
  laki (asteittainen vapautus, yli 60-vuotiaat ja 17.9.1868 jälkeen
  syntyneet lapset) on eri asia ja aiempi kuin vuoden 1873
  lakkautuslaki, ja artikkeli itse kuvaa ne erikseen. **Älä käytä
  nimeä "Moretin laki" vuoden 1873 päätöksestä.** Sano vain:
  orjuus lakkautettiin Puerto Ricossa 22.3.1873.
- **13+ -HUOMIO:** aihe on raskas mutta se on juuri sitä aineistoa,
  joka erottaa pelin lastenpelistä. Kerro laki, sen ehto ja
  juhlapäivä. Älä kuvaile orjuuden oloja.

---

## Varapenkki (tarkistettu, ei mahtunut kahdeksantoista joukkoon)

- **Madridissa on egyptiläinen temppeli.** Debodin temppeli
  rakennettiin 100-luvulla eaa. 15 km Assuanista etelään; Kushin
  kuningas Adikhalamani aloitti sen Amonille, ptolemaiolaiset
  laajensivat sen Isikselle ja keisarit Augustus ja Tiberius
  viimeistelivät. Assuanin padon takia Egypti lahjoitti sen Espanjalle
  1968 kiitoksena Abu Simbelin pelastamisesta, ja se koottiin
  uudelleen Madridiin 1970–1972. Portit koottiin **eri järjestykseen**
  kuin ne alun perin olivat. Isoisän kannalta kiinnostava yksityiskohta:
  temppelin pylväshalli **romahti vuonna 1868** ja on lopullisesti
  menetetty — eli isoisän aikaan rauniot olivat tuoreet.
  40,42405278°N, −3,71777778°E. Lähde: en.wikipedia.org/wiki/
  Temple_of_Debod. **Kuva tarkistettu:** Commons **Templo de Debod,
  Madrid, España, 2023-01-03, DD 86-88 HDR.jpg** (8169×5446,
  CC BY-SA 4.0, Diego Delso, 3.1.2023), Restrictions tyhjä.
- **Cerro de los Ángeles on 666,235 metriä.** Getafessa, 10 km
  Madridista etelään, on kukkula, jota on perinteisesti pidetty
  Iberian niemimaan maantieteellisenä keskipisteenä. Sen huipulla on
  ensimmäisen luokan geodeettinen kiintopiste korkeudella
  **666,235 m**. Espanjan maantieteellinen laitos IGN sanoo, ettei
  keskipistettä voi määrittää tarkasti, koska tulos riippuu
  menetelmästä; jotkin uudemmat tutkimukset sijoittavat sen kauemmas
  länteen. 40,30861111°N, −3,68444444°E. Lähde: es.wikipedia.org/wiki/
  Cerro_de_los_Ángeles. Hyvä pikkutäky, jos halutaan lukukoukku.
- **Retiro oli ollut julkinen vasta viisi vuotta.** Puisto kuului
  kruunulle vuoteen 1868, jolloin Isabel II syöstiin vallasta ja
  puutarhoista tuli julkista omaisuutta. Isoisä käveli 1873 puistossa,
  joka oli ollut kaikkien kävelypaikka viisi vuotta. Sama artikkeli
  kertoo, että Napoleonin joukot rakensivat puiston maalle linnoituksen
  1807–1814 ja tuhosivat suurimman osan Buen Retiron palatsista.
  Lähde: en.wikipedia.org/wiki/Parque_del_Buen_Retiro,_Madrid.
- **Langennut enkeli.** Retiron ruusutarhan vieressä on Ricardo
  Bellverin veistos *El Ángel Caído*, pystytetty 1922, aiheena Miltonin
  *Kadotettu paratiisi*. en-Wikipedia sanoo: "It is claimed that this
  statue is the only known public monument of Satan." Huomaa
  varaus **"it is claimed"** — ja huomaa, että Rooman listalla on jo
  vastaava Saatana-kohde (takyt-rooma.md, Renin Saatana). Ei mennyt
  läpi tähän erään päällekkäisyyden takia, mutta aineisto on tallessa.

---

## Hylätyt / tarkistuksessa kaatuneet

1. **"Hullujen kansan kuningas".** Amadeon kuuluisin lainaus. **EI
   löydy** en-artikkelista "Amadeo I of Spain" eikä artikkelista
   "First Spanish Republic". Artikkelissa on hänen todellinen
   luopumiskirjeensä pitkänä lainauksena, ja se on aivan toisenlainen
   ("For over two years I have worn the Crown of Spain... I have sought
   it within the law, and not found it"). **Älä käytä hullu-lainausta.**
2. **Aventinuksen kaltainen "Casa de Fieras del Retiro" en-Wikipediassa.**
   Haku palautti *missing*; artikkeli on olemassa vain espanjaksi.
   Tieto ei siis kaatunut, vain hakukieli vaihtui.
3. **"Ahuehuete del Retiro"** (Madridin vanhin puu) ja **"Gato
   (gentilicio de Madrid)"** (madridilaisten kissa-lempinimi).
   Kummallakaan ei ole omaa es-artikkelia — haut palauttivat *missing*.
   Molemmat ovat laajalti kerrottuja tarinoita, mutta **ilman
   Wikipedia-lähdettä niitä ei saa käyttää**. Kissa-lempinimi olisi
   ollut ilmeisin madridilainen eläintäky; se jäi pois nimenomaan
   siksi, ettei sille löytynyt lähdettä tässä haussa.
4. **"Reloj de la Casa de Correos"** ja **"Ángel Caído (escultura)"**
   omina es-artikkeleinaan: *missing*. Kellon tiedot löytyivät
   Losadan artikkelista (täky 11), enkelin tiedot Retiro-artikkelista
   (varapenkki).
5. **Norsu Pizarron karkumatka Alcalá-kadulle.** Hieno tarina, mutta
   se ajoittuu Cabañasin vuokrakauteen **1895 jälkeen**, ei isoisän
   vuoteen. Ei siis hylätty tietona (se on täyn 1 lähteessä), vaan
   rajattu pois ajoituksen takia. Jos sitä käytetään, älä sido sitä
   1873:een.
6. **Aguador-kuvahaku espanjaksi.** Commons-haku "aguador Madrid
   siglo XIX" palautti pelkästään 1800-luvun näytelmäkirjoja
   (*El aguador y el misántropo* ym.), ja kategoriat
   `Category:Aguadores` sekä `Category:Aguadores de Madrid` ovat
   tyhjiä tai olemattomia. **Ratkesi englanninkielisellä haulla**
   ("water carrier Spain 19th century painting"), joka löysi kaksi
   aikalaismaalausta — ks. täky 12. **Opetus jatkoa varten: jos
   espanjankielinen kuvahaku ei tuota, kokeile englantia ennen kuin
   toteat kuvan puuttuvan.**
7. **Tranvía-kuvahaku "Tranvia mulas Madrid 1871".** NO RESULTS.
   Käyttökelpoinen aikalaiskuva löytyi vasta kategoriahaulla
   (`Category:Trams in Madrid`, ks. täky 13).

---

## Kuvamuistio — mitä on vielä tarkistamatta

Commonsin haku- ja imageinfo-rajapinta rajoitti tätä erää voimakkaasti
(429). **Seuraavien täkyjen kuva on VIELÄ TARKISTAMATTA, eikä
yhtäkään saa viedä peliin ennen kuin tiedostonimi, koko, lisenssi,
tekijä ja Restrictions on kysytty imageinfo-rajapinnalta:**

- **täky 9 (Congresson leijonat)** — kolme eri hakua
  ("Leones del Congreso de los Diputados",
  "leon bronce Congreso Diputados Madrid entrada",
  "Leones Congreso Diputados Ponzano escultura") ja kaksi
  kategoriayritystä eivät tuottaneet yhtään kuvatiedostoa. Commonsissa
  on aiheesta kategoria (es-Wikipedian artikkeli linkittää siihen),
  mutta sen oikeaa nimeä ei löytynyt tässä erässä. **Etsi kategoria
  es-Wikipedian artikkelin Commons-linkin kautta.**
- **täky 14 (Velascon museorakennus)** — kaksi hakua ei tuottanut
  yhtään kuvaa rakennuksesta. Kohde on kadunvarsirakennus osoitteessa
  Calle de Alfonso XII 68; **kokeile hakua rakennuksen nimellä
  "Museo Nacional de Antropología" englanniksi tai katunimellä.**

**Ratkennut sen jälkeen kun ensimmäinen versio kirjoitettiin:** täkyjen
12 (aguadorit), 16 (Botín), 17 (Filip IV) ja varapenkin Debodin kuvat
on nyt tarkistettu ja merkitty kohtien alle.

**Täkyjen 11 ja 15 kohdalla kuvaa ei tarvita**: molempien kohde on jo
pelissä olevassa kuvassa (Puerta del Solin kellotorni; karhupatsas).

**Tarkistettuja ja käyttövalmiita kuvia on kuusitoista**, ja ne
kattavat molemmat eläintäyt sekä koko 1873-ankkurin. Kaksi täkyä on
ilman kuvaa.

---

## Yhteenveto

**18 täkyä, kaikki faktat tarkistettu lähteestä; kuudessa kohdassa
lähde itse varaa tai artikkelit ovat keskenään ristiriidassa, ja
nämä on merkitty kohdittain.**

Merkittävät ristiriidat, jotka Fablen on ratkaistava tai kierrettävä:
Amadeon luopumispäivä (10. vai 11.2.), Cartagenan lippu (osmanilippu
vai kantonin punainen), Galileon osuus Filip IV:n patsaaseen (fakta
vai perimätieto), Botínin perustamisvuosi (Guinness 1725 vs.
Wikipedia 1865) ja "Moretin laki" vuoden 1873 päätöksen nimenä.

**Eläintäyt (Raamatun ELÄINTÄYT-vaatimus, väh. 2 per maa): kaksi
täyttä ja kolme sivujuonnetta.** #1 Casa de Fieras (norsut, tiikerit,
karhut, laamat, riikinkukot) ja #2 Madridin munkkiaratit ovat
varsinaiset eläintäyt. Sivujuonteina #9 Congresson leijonat
(veistettyjä), #15 vaakunakarhu (vertauskuvallinen), #13:n 120 muulia
ja #10:n kuva "Koira".

**1873-ankkuri kantaa kuutta täkyä** (#3 Amadeo, #4 Figueras, #5
neljä johtajaa, #6 Pavía, #7 kaksi hallitusta, #8 Cartagena) ja
kahta sivukautta (#10 Goyan talo vaihtoi omistajaa 1873, #14
Velascon talo rakennettiin 1873, #18 Puerto Rico 22.3.1873).

**Kolme parasta ehdotustani:**

1. **#1 — Casa de Fieras, joka on nykyään kirjasto.** Tämä on koko
   listan täydellisin osuma. Se on yhtä aikaa **eläintäky** (omistajan
   25.8.2026 linjaus), **1873-täky** (Retiro oli juuri avattu
   yleisölle, joten isoisä pääsi sisään) ja se harvinaisuus, että
   koukku on täydellinen ympyrä: kuninkaan pedot → yleisön eläintarha
   → kirjasto, jossa ruokintakalterit ovat yhä seinässä. Kuvaparikin
   on valmis ja tarkistettu: **1876 julkaistu kaiverrus** ja nykyinen
   kirjastosali. Yksikään pelin nykyinen Madrid-sisältö ei kosketa
   tätä.

2. **#10 — Goyan mustat maalaukset olivat 1873 vielä seinässä.**
   Vahvin "sama asia, uusi silmä" -täky. Peli mainitsee mustat
   maalaukset Prado-jutussa museoteoksina; tämä täky kertoo, että
   isoisän matkavuonna ne olivat vielä erään talon salien seinissä
   tapetin päällä, että talo oli juuri myyty pankkiirille ja että
   vuosi myöhemmin ne revittiin irti. Ja kuva on poikkeuksellinen:
   **Laurentin vuoden 1874 valokuva maalauksesta seinässä**, 6240×8400
   pikseliä, tarkistettu. Bonuksena kaksi debunkkia yhdellä iskulla —
   talo ei ollut nimetty Goyan kuuroudesta.

3. **#4 — Presidentti, joka nousi junaan eikä kertonut kenellekään.**
   Paras yhden kohtauksen täky koko listalla ja täydellinen sisäänkäynti
   koko 1873-vuoteen: yksi mies, yksi lause, yksi kävely Retiron läpi
   ja yksi juna Atochasta. Se on 13+ -aineistoa parhaimmillaan —
   aikuinen ymmärtää heti, millaista vuotta se kuvaa — eikä siinä ole
   yhtään herkkää reunaa. Ja se kytkeytyy kahteen paikkaan, jotka
   ovat pelissä jo tai tulossa (Retiro, Atocha).

Kunniamaininnat: **#8 (merirosvoiksi julistettu oma laivasto)** on
listan uskomattomin tositarina ja kantaa suoraan
takynostot-espanja.md:hen; **#11 (kellon lahjoittaja)** on ainoa täky,
joka syventää olemassa olevaa kaarta koskematta siihen; **#16
(Botín)** on lyhin ja se, joka opettaa parhaiten Perustuslain
totuudellisuuspilaria.
