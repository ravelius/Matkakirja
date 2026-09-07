# Salta — faktakoostaja, uusi kaupunkilehti

Lauta-id `southamerica`, kaupunki-id `salta`, maa ARG, en-Wikipedia
"Salta". Kaikki tiedot haettu Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä, User-Agent `Matkakirja/1.0
(https://github.com/ravelius/Matkakirja)`) **7.9.2026**. Malli ja mitat
luettu tiedostoista `tools/parvi/kaupunkilehti-ohje.md`,
`tools/parvi/kohdekartta-ohje.md`, `docs/aasia-tyoaineisto/
lehtityo-resepti.md`, `docs/moduulit/kaupunkilehti.md` ja
`docs/mantereet-tyoaineisto/spec-mantereet.md`. Mallilehdet: **Lagos ja
Sansibar (v1670)** sekä samasta parvierästä **Guatemala City**, josta
otettiin es-Wikipedian nimeämiskäytäntö.

## 0. Kielivalinta — ES-WIKIPEDIA NIMETÄÄN LÄHTEENÄ

Saltan keskustan rakennuksista **yhdelläkään kohdekartan kahdeksasta
kohteesta ei ole omaa englanninkielistä artikkelia** katedraalia ja
MAAM-museota lukuun ottamatta: `list=geosearch` en-Wikipediaan
(−24.7883 / −65.4106, säde 3 km) palautti vain kymmenen osumaa, joista
kuusi oli hallinnollisia (hiippakunta, departementti, maakunta).
Espanjankielinen sama haku palautti kolmekymmentäyksi. Siksi
nähtävyysjuttujen lähde on **es-Wikipedia ja se sanotaan
lähderivillä** — ennakkotapaus `js/packs/nahtavyysjutut.js`,
`guatemala` (7.9.2026), sekä `js/packs/fokusvirta-granada.js` ja
`fokusvirta-madrid.js`.

Luetut lähdeartikkelit **en-Wikipedia (7.9.2026)**: "Salta", "Salta
Province", "Salta Cathedral", "Museum of High Altitude Archaeology",
"Children of Llullaillaco", "Capacocha", "Llullaillaco", "Battle of
Salta", "Martín Miguel de Güemes", "Tren a las Nubes", "Zamba
(artform)", "Bombo legüero", "Chacarera", "Peña (music)", "Eduardo
Falú", "Los Chalchaleros".

Luetut lähdeartikkelit **es-Wikipedia (7.9.2026)**: "Salta", "Cabildo
de Salta", "Catedral de Salta", "Museo de Arqueología de Alta Montaña
de Salta", "Museo Histórico del Norte", "Basílica y convento de San
Francisco (Salta)", "Convento de San Bernardo (Salta)", "Iglesia de la
Merced (Salta)", "Museo de Bellas Artes de Salta", "Monumento a
Güemes", "Cerro San Bernardo", "Plaza 9 de Julio (Salta)", "Edificio
del Centro Cultural América", "Señor y Virgen del Milagro", "Mercado
artesanal de Salta", "Iglesia de la Viña", "Iglesia de San Alfonso
(Salta)", "Estación Salta", "Museo de Arte Contemporáneo (Salta)".

## 1. Rajaus tälle lehdelle

**Argentiinan maalehti (`js/packs/maa-kategoriat.js`, ARG) on tehty ja
sen aiheita EI toisteta.** Maalehti kertoo: Sarmiento ja 800 koulua,
vuoden 1869 väestönlaskenta, Paraguayn sota, siirtolaislaivat; gaucho,
Martín Fierro, mate, alkuperäiskansat; tango, candombe, payada,
milonga; Iguazú, pampa, Patagonian dinosaurukset, Aconcagua; asado,
**Saltan empanadat**, torrontés ja Mendozan viini. Karttanostot
(`js/packs/maastokohteet-arg.js`: Aconcagua, Río de la Plata,
Argentiinanmeri, Cueva de las Manos, **Quebrada de Humahuaca**,
Córdoban jesuiittakortteli, **La Polvorillan viadukti /
Salta–Antofagasta-rata**, Península Valdés, Ushuaia, Ischigualasto,
Perito Moreno) sekä `js/packs/skandaalit.js` (ARG) ja
`js/packs/elaintakyt.js` (ARG, magellaninpingviini) on luettu — yksikään
ei ole tämän lehden aihe.

**Kolme kiellettyä aihetta nostoiksi:** empanada (maalehden oma nosto,
kuva `Empanadas salteñas 1.jpg`), Quebrada de Humahuaca (karttanosto) ja
Tren a las Nubes / La Polvorillan viadukti (karttanosto). Kaikki kolme
saa **mainita matkaoppaassa yhdellä lauseella**, koska kaupungin visa
kysyy niistä (ks. kohta 2), mutta yksikään ei saa olla noston aihe.

**Tämä lehti pysyy kaupungissa:** perustaminen 1582 ja tie Potosíin,
Milagro-hartaus, vuoden 1873 asema, "Salta la Linda" -kaupunkikuva,
Cerro San Bernardo, sekä teemasivulla peña ja pohjoisen kansanmusiikki.

## 2. Kaupungin visa (`js/packs/southamerica-questions.js`, `salta`)

Viisi kysymystä: (1) missä maassa Salta on — Argentiinassa; (2) mikä
rautatie nousee yli neljän kilometrin korkeuteen — Tren a las Nubes;
(3) millaista musiikkia seudulla soitetaan — andienperinteistä
folklorea; (4) mikä on empanada — täytetty ja uunissa paistettu
piirakka; (5) mikä maailmanperintölaakso on pohjoisessa — Quebrada de
Humahuaca. **Minitehtävä ei saa kysyä yhtään näistä viidestä.**
Vastausten on löydyttävä lehden teksteistä: (1) ja (3) ovat nostoissa
ja teemasivulla, (2), (4) ja (5) matkaoppaan jaksoissa.

## 3. Olemassa olevat lohkot

- `js/packs/southamerica-saapumiset.js` (`salta`): **valmis, ei
  kosketa** (kuvaus + isoisän nosto, 1873-kehys mukana).
- `js/packs/southamerica-valokuvat.js` (`salta`): vanha puoli
  `Cabildo de Salta siglo XIX.jpg` (1890-luku, PD, Archivo General de
  la Nación) ja uusi `Cabildo de Salta, Argentina.jpg` (2026,
  Dpalma01, CC BY-SA 4.0) — **ennen–nyt-pari otetaan tästä**. Lisäkuvat
  `La Balcarce, ciudad de Salta.jpg`, `Télécabines.jpg` ja `Vendedor en
  el parque San Martín.JPG` ovat varattuja eikä niitä käytetä lehdessä.
- `js/packs/southamerica-artikkelit.js`: **Saltalle ei ole merkintää**
  → kirjoitetaan sekä `intro` (7–10 virkettä) että kolmikappaleinen
  `teksti`. Avain on wiki-otsikko **`Salta`**
  (`js/packs/maailmankartta.js`: `"wiki":"Salta"`).
- `js/packs/kulttuuri-kategoriat.js`: **ei merkintää** → uusi lehti.
- Litteää kulttuuritaulua ei ole (Etelä-Amerikalla ei ole
  `southamerica-kulttuuri.js`-tiedostoa).

## 4. 1873-KEHYS

Isoisän matkavuonna Salta oli **köyhä muulikaupunki tien varressa**.
Itsenäisyyssodan jälkeen kaupunki jäi taloudellisesti raunioihin ja
vaipui taantumaan suureksi osaksi 1800-lukua; toipuminen alkoi vasta
1890-luvulla rautatien ja siirtolaisten myötä
(es "Salta", Historia; en "Salta", History). **Rautatietä ei siis vielä
ollut**, ja Salta–Antofagasta-radan työt alkoivat vasta 1921 (en
"Salta–Antofagasta railway"). Kaupungin virallinen lämpötilasarja alkaa
juuri **vuodesta 1873** (en "Salta", Climate: sääruudun otsikko
*"Salta, Argentina (Martín Miguel de Güemes International Airport)
1991–2020, extremes 1873–present"*). Katedraalin rakennustyöt, jotka
olivat olleet pitkään pysähdyksissä, **käynnistettiin uudelleen 1873**
Cánepan veljesten yrityksen sopimuksella (es "Catedral de Salta",
Historia), ja San Franciscon 54-metristä kellotornia — kaupungin
tunnetuinta siluettia — **ei ollut vielä olemassa**: sen rakentaminen
alkoi 1877 (es "Basílica y convento de San Francisco (Salta)",
Construcción).

## 5. Väitteet nostoittain

### K1 — Perustaminen 1582 (kansisivu)
- Varakuningas Francisco Álvarez de Toledo kirjoitti maaliskuussa 1576
  kuningas Felipe II:lle lähettäneensä väkeä perustamaan asutusta
  Calchaquín laaksoon ja Saltaan, jotta Tucumánin provinssi voisi
  yhdistyä ja käydä kauppaa La Platan (Charcas) kanssa. (es "Salta",
  Historia)
- **Hernando de Lerma perusti kaupungin 16. huhtikuuta 1582** nimellä
  *San Felipe y Santiago de Lerma en el valle de Salta*. (es "Salta",
  Historia; en "Salta", History: *"Salta was founded on April 16, 1582,
  by the Spanish conquistador Hernando de Lerma, who intended the
  settlement to be an outpost between Lima, Peru and Buenos Aires."*)
- Kaksi muuta syytä: hillitä chiriguano-kansan vastarintaa idässä ja
  luoda etappi Liman ja Buenos Airesin (toinen perustaminen 1580)
  väliselle tielle. (es "Salta", Historia)
- Kaupungin kaava oli **shakkiruudukko yhdeksän kertaa viisi
  korttelia**; pohjoisessa rajana Tineon suo (nyk. Avenida Belgrano) ja
  etelässä Sauce-joki (nyk. Avenida San Martín). (es "Salta",
  Arquitectura colonial en Salta)
- Nimi Salta tulee alueella asuneen **Salta-kansan** nimestä; sen
  käännös on kielitieteilijöille vaikea eikä merkityksestä ole
  yksimielisyyttä. (es "Salta", Toponimia; en "Salta", History: *"The
  origin of the name Salta is a matter of conjecture."*)
- Siirtomaa-aikana kaupunki vaurastui **Potosín raaka-ainehuoltajana**;
  kuului Perun varakuninkaanmaahan vuoteen 1776, jolloin perustettiin
  Río de la Platan varakuninkaanmaa, ja **1783 Saltasta tehtiin
  Intendencia de Salta del Tucumánin pääkaupunki**. (es "Salta",
  Historia)

### K2 — Milagro-hartaus (kansisivu)
- **19. kesäkuuta 1592** havaittiin kaksi suurta laatikkoa kelluvana
  Tyynellämerellä Callaon sataman lähellä. Toisessa oli kaiverrus
  Ruusukon Neitsyestä Córdoban saarnaajaveljien luostarille, toisessa
  ristiinnaulitusta Kristuksesta Saltan pääkirkolle. Lähettäjäksi
  tiedettiin Tucumánin entinen piispa fray Francisco de Victoria, joka
  oli ollut läsnä Saltan perustamisessa; **koskaan ei saatu selville,
  mikä alus ne toi Espanjasta**. (es "Señor y Virgen del Milagro")
- Varakuningas García Hurtado de Mendoza määräsi tahdon täytettäväksi,
  ja kuvat kuljetettiin muulien selässä **vanhaa inkatietä noin 2 800
  kilometriä**. (sama)
- **13. syyskuuta 1692 kello kymmenen aamulla** voimakas maanjäristys
  tuhosi Esteco-kaupungin ja vaurioitti Saltaa. Perimätiedon mukaan
  Neitsyt-kuva löydettiin kirkon lattialta Kristuksen jalkojen juuresta
  vahingoittumattomana, vaikka se oli pudonnut kolmen metrin
  korkeudelta. Jesuiitta José Carriónin kerrotaan kuulleen kehotuksen
  viedä Kristus kulkueeseen; **16. päivänä järinä lakkasi**, ja siitä
  alettiin puhua ihmeenä. (sama)
- Juhla vietetään **13.–15. syyskuuta**, ja Milagro-kulkue kokoaa
  vuosittain **yli 850 000 ihmistä**. (es "Salta", Religiones:
  kuvateksti *"la misma congrega anualmente más de 850 000 personas"*;
  päivämäärät osiossa Principales manifestaciones)
- **Sävylinjaus:** kertomus esitetään perimätietona ("kertomuksen
  mukaan", "perimätiedon mukaan"), ei todistettuna tapahtumana —
  Perustuslain Kunnioitus-pilari ja reseptin uskontolinjaus.

### K3 — Vuosi 1873 (kansisivu)
Lähteet kohdassa 4. Lisäksi:
- Sipe Sipen tappion jälkeen kaupunki ja sen ympäristö olivat
  taistelukenttää; **Güemesin ratsujoukot puolustivat pohjoista
  sissisodalla**, jota kutsutaan nimellä Guerra Gaucha. (es "Salta",
  Historia)
- 1890-luvun elpymisen toivat rautatie sekä espanjalaiset ja arabit,
  erityisesti **syyrialaiset ja libanonilaiset**; en-artikkeli lisää
  italialaiset ja britit. (es "Salta", Historia; en "Salta", History)

### K4 — "Salta la Linda" (kansisivu)
- Varakuninkaanmaan aikaan (1778–1810) Salta oli pakollinen etappi
  Buenos Airesin sataman ja Ylä-Perun välillä sekä sotilastukikohta ja
  huoltokeskus. (es "Salta", Salta La Linda: el Virreinato)
- **Kuvernöörin määräys** velvoitti säilyttämään rakennukset ja
  julkisivut sellaisina kuin ne olivat; määräys siirtyi myöhemmin
  kunnan rakennusjärjestykseen, joka **palkitsi noudattajia ja
  rankaisi** talonsa ulkonäköä muuttaneita. Juuri tästä syntyi
  lempinimi **La Linda**. (sama)
- Kaupunkikuva **ei ole puhtaasti siirtomaa-aikaista**: 1800-luvun
  puolivälistä alkaen rakennettiin uuskolonialistista tyyliä, joka on
  arkkitehti Roque Gómezin määritelmän mukaan historisoiva liike eikä
  oma tyyli. Perinnesuojelutoimikunnan puheenjohtaja Guillermo Matach:
  *"Salta tiene muchos rasgos de la arquitectura de la colonia, pero no
  es puramente colonial, como mucha gente cree."* (es "Salta", La idea
  de lo neocolonial)
- Plaza 9 de Julion ympäri kiertävä **recova eli holvikäytävä on
  säilynyt lähes kokonaan**, mikä erottaa aukion muista Argentiinan
  aukioista; säilyminen perustuu yli kahteenkymmeneen päätökseen,
  joista useimmat tehtiin 1990-luvulla. Aukiolla on yli **250 puuta** ja
  yli **7 000 kääpiökukan tainta**. (es "Plaza 9 de Julio (Salta)",
  johdanto)

### K5 — Cerro San Bernardo (kansisivu)
- Huippu **1 471,92 m mpy**; kaupunki sen juurella **1 187 m mpy**;
  huipun mittapaalun mukaan ero on **284,92 m**. (es "Cerro San
  Bernardo")
- Vuori on **1 km itään Plaza 9 de Juliosta** ja kuuluu Cordillera
  Orientaliin; rinteet ovat Yungas-vuoristosademetsää. (sama)
- Vuori oli miljoonia vuosia sitten meren alla ja syntyi Andien mukana
  **mesotsooisella maailmankaudella**; rinteiden kivistä löytyy
  merifossiileja, muun muassa **trilobiitteja**. Yksi niistä on saanut
  nimen ***Sanbernardaspis pygacantha***. (sama)
- Cerro San Bernardo ja pohjoisempi Cerro 20 de Febrero julistettiin
  **kunnalliseksi luonnonsuojelualueeksi 4. kesäkuuta 1991**
  (ordenanza 6134). (sama)
- Huipulle pääsee kolmea reittiä: maantie (Ruta Provincial 107,
  2 km barrio Portezuelosta), **kiviportaat, joissa on 1 021 askelmaa**
  ja varrella 14 ristintien kappelia, sekä köysirata. Portaat alkavat
  antropologian museon takaa, Güemesin muistomerkin vierestä. (sama)

### T1–T5 — Teemasivu "Peña ja pohjoisen laulu" (id `musiikki`)
- **Peña** on muusikoiden tai taiteilijoiden kokoontumispaikka
  Espanjassa ja useissa Etelä-Amerikan maissa; Chilessä sana tarkoitti
  edullista kansanmusiikkipaikkaa, jossa oli yksinkertaista syötävää ja
  juotavaa. (en "Peña (music)")
- **Balcarce-kadun kolme rautatieasemaa lähintä korttelia** ovat
  nykyään Saltan yöelämän keskus: ravintoloita, pubeja ja kahviloita
  molemmin puolin katua ja **konsertteja joka ilta**. (en "Salta",
  Attractions). Lauantaisin, sunnuntaisin ja pyhinä aamupäivällä sama
  alue on käsityönäyttelyn paikka. (es "Salta", Sitios turísticos)
- **Zamba** syntyi Argentiinan **Saltan maakunnassa** vuonna 1824
  perulaisesta zamacuecasta ja levisi Argentiinaan Ylä-Perun ja Chilen
  kautta 1825–1830. Tahtilajissa on **kuusi iskua tahdissa**; se on
  parien tanssi, joissa tanssijat kiertävät toisiaan **valkoisia
  nenäliinoja heilutellen**. Soittimina ovat ensisijaisesti kitara ja
  bombo legüero. Nimi tulee siirtomaa-ajan sanasta *zambo*. (en "Zamba
  (artform)")
- **Bombo legüero** on rummun runko onttoon puunrunkoon koverrettuna ja
  päät eläinten nahoista (lehmä, lammas, guanako); **karva jätetään
  nahkaan**, mistä tulee soittimen tumma sointi. Nimi *legüero*
  tarkoittaa, että sen kuulee peninkulman päähän. Soittaja pitää
  toisessa kädessä pehmeäpäistä nuijaa ja toisessa kapulaa, jolla lyö
  vuoroin nahkaa ja puukehää. (en "Bombo legüero")
- **Saltan sanoittajat ja säveltäjät**: runoilijat Manuel J. Castilla ja
  Jaime Dávalos, säveltäjä Gustavo "Cuchi" Leguizamón, kitaristi
  Eduardo Falú, Dúo Salteño; yhtyeet Los Chalchaleros, Los Fronterizos,
  Los Cantores del Alba ja Los Nocheros; bandoneonisti Dino Saluzzi.
  (es "Salta", Artistas reconocidos de Salta)
- **Los Chalchaleros** perustettiin Saltassa **1948** ja lopetti
  **2003**; nimi tulee paikallisesta laululinnusta *chalchalero*
  (creolirastas). (en "Los Chalchaleros")
- **Eduardo Falú** (1923–2013) syntyi El Galpónissa Saltan maakunnassa
  syyrialaisten siirtolaisten poikana ja oli kitaristi ja säveltäjä;
  Saltan ulkoilmateatteri **Anfiteatro Eduardo Falú** on nimetty hänen
  mukaansa. (en "Eduardo Falú"; es "Salta", Estadios y anfiteatros)
- **Chacarera** on toinen pohjoisen tanssi, jonka ydinalue on Santiago
  del Estero; sitä soitetaan kitaralla, viululla ja bombo legüerolla.
  (en "Chacarera")

## 6. Kohdekartan kahdeksan kohdetta

Rajaus `js/packs/maakartat.js`, `KAUPUNKIKARTAT.salta`:
pohjoinen −24,7830, etelä −24,7975, länsi −65,4180, itä −65,3970
(noin 2,1 × 1,6 km). Koordinaatit es-Wikipedian `list=geosearch`- ja
`prop=coordinates`-rajapinnasta 7.9.2026. Numerointi lännestä itään.

1. **Saltan kuvataidemuseo** (Museo de Bellas Artes) −24,7867625 /
   −65,4161626
2. **La Merced -kirkko** −24,789778 / −65,414444
3. **Korkean vuoriston arkeologian museo (MAAM)** −24,78899602 /
   −65,41104066
4. **Saltan katedraali** −24,788333 / −65,410278
5. **Saltan cabildo** (Museo Histórico del Norte) −24,7898 / −65,4104
6. **San Franciscon basilika** −24,79025 / −65,408167
7. **San Bernardon luostari** −24,790389 / −65,403833
8. **Güemesin muistomerkki** −24,78675 / −65,39929

**Kohteet eivät toista lehden juttuja** (New Yorkin sääntö): lehti
kertoo perustamisesta, Milagro-hartaudesta, vuodesta 1873,
kaupunkikuvasta, Cerro San Bernardosta ja musiikista; kohdekartta
kertoo kunkin rakennuksen oman historian.

### Kohteiden lähdetiedot

1. **Museo de Bellas Artes de Salta** (es, "Museo de Bellas Artes de
   Salta"): maakunnan hallituksen perustama taidemuseo osoitteessa
   Av. Belgrano 990. Rakennus on **1900-luvun alussa Félix
   Usandivarasin perheelle rakennettu ranskalaistyylinen kartano**,
   joka on entisöity, laajennettu ja sovitettu museokäyttöön: **yli
   1 000 neliömetriä, kaksi kerrosta ja yksitoista salia** (infolaatikko
   sanoo 1 107 m²). Yläkerrassa on esikolumbiaanisen taiteen sali ja
   1800-luvun muotokuvasali; seitsemännen salin vasemmalla puolella on
   1600- ja 1700-luvun uskonnollisen taiteen kokoelma ja oikealla
   1800-luvun eurooppalaista maalaustaidetta; vasemmassa siivessä
   1900-luvun alun argentiinalaisia maalareita ja lopuksi 1960-luvun
   saltalaismestareita. Luokitusrivit antavat kaksi avajaisvuotta,
   **1930 ja 2008** (ks. tarkistuksen kohta D).
2. **Iglesia de la Merced (Salta)** (es, "Iglesia de la Merced
   (Salta)"): oikea nimi **Iglesia de Nuestra Señora de la Merced y San
   Bautista**, osoite Caseros 857. **Rakennettu 1907–1914** ennen kaikkea
   Virgen de las Mercedes -kuvan sijoituspaikaksi; vihittiin monsignore
   Piedrabuenan siunauksella. Temppelissä säilytetään **Saltan
   taistelun ristiä**. Mercedaariveljestön isä **fray Antonio de
   Escobar kiersi kaupunkia 1602** keräämässä almuja veljestön
   perustamiseen, ja muutamaa vuotta myöhemmin nykyisen Caseros-kadun
   varteen rakennettiin kirkko Euroopasta tuodun Mercedes-neitsyen
   jäljennökselle. Itsenäistymisen jälkeen mercedaarit lähtivät ja
   seurakuntaa hoitivat redemptoristit; 1900-luvun alussa vanha
   temppeli oli lähes raunioina ja purettiin. Veljestö osti uuden
   tontin 1907.
3. **MAAM** (es + en): perustettu Saltan maakunnan hallituksen
   tahdosta **suojelemaan, tutkimaan ja esittelemään Llullaillacon
   lasten löytöä**; avattiin **2004**; toimii 1800-luvun puolivälin
   arvorakennuksessa pääaukion laidalla, jonka julkisivu on
   **uusgoottilainen, selvästi viktoriaaninen**. Ruumiit säilytetään
   kapseleissa, joissa happipitoisuutta on alennettu, lämpötila on
   vakaa **−20 °C** ja valo on suodatettu ultravioletista ja
   infrapunasta. 2005 kokoelmaan tuli Teruelin lahjoitus, 2006
   *Reina del Cerro* -muumio. **Museo on saanut perustamisestaan asti
   arvostelua paikallisilta alkuperäiskansajärjestöiltä**, jotka pitävät
   lasten siirtoa ja esillepanoa ilman kuulemista häpäisynä ja
   alkuperäiskansojen oikeuksien loukkauksena. (en "Museum of High
   Altitude Archaeology")
   - Llullaillacon lapset löydettiin **16. maaliskuuta 1999**
     arkeologien **Johan Reinhardin ja María Constanza Cerutin**
     retkikunnassa lähellä **6 739 metriä korkean Llullaillaco-tulivuoren
     huippua**, noin 6 700 metrissä; hautapaikka oli noin 1,5 metrin
     maakerroksen alla. Lapset kuolivat vuosien 1462 ja 1507 välillä
     **capacocha-menon** osana. Mukana oli kulta-, hopea- ja
     simpukkakuvioita, hienoja kudonnaisia ja keramiikkaa. Kylmyys ja
     kuivuus säilyttivät pehmytkudokset, hiukset ja sisäelimet.
     **20. kesäkuuta 2001** Argentiinan museoiden, muistomerkkien ja
     historiallisten paikkojen komissio julisti heidät kansalliseksi
     historialliseksi omaisuudeksi. (en "Children of Llullaillaco")
   - **Sävylinjaus:** kuolemantapaa ei kuvailla. Juttu kertoo löydön,
     säilymisen syyn, museon kylmäsäilytyksen ja arvostelun.
4. **Catedral de Salta** (es + en): edellinen kirkko vaurioitui
   **vuoden 1844 maanjäristyksessä**; suunnittelu tilattiin **1856**
   ranskalais-amerikkalaiselta insinööriltä **Felipe Bertrésiltä**, joka
   kuoli Saltassa samana vuonna. Työt alkoivat **1858** piispa José
   Eusebio Colombresin aloitteesta. **1873 pitkään pysähdyksissä olleet
   työt käynnistettiin uudelleen** urakoitsijoiksi palkattujen
   arkkitehtiveljesten **Nicolás ja Agustín Cánepan** kanssa. Temppeli
   **siunattiin 1878** ilman julkisivua, torneja ja atriumia;
   kokonaisuus valmistui **1882**. Julkisivun ja tornien tekijäksi on
   arkistolöydön perusteella vahvistettu arkkitehti **Noé Macchi**;
   *La Reforma* -lehti 28.6.1879: julkisivu urakoitiin 29 000 pesolla
   urakoitsija Riguettille Maquin (= Macchi) piirustusten mukaan.
   Katedraalissa on **Panteón de las Glorias del Norte**, jossa lepäävät
   Martín Miguel de Güemesin jäännökset. Kansallinen historiallinen
   monumentti **14. kesäkuuta 1941** (asetus 95687).
5. **Cabildo de Salta** (es): viranomaisten istuinpaikka **1626–1888**;
   kapteeni Diego Vélez de Alcocer rakensi sen uudelleen 1676. Nykyisen
   rakennuksen työt alkoivat noin **1780** miliisieverstin Antonio de
   Figueroa y Mendozan johdolla; torni nousi vasta vuosia myöhemmin.
   Talo oli poliisin ja hallintorakennuksen käytössä 1880 asti,
   yhdeksän vuotta myöhemmin se **myytiin julkisella huutokaupalla
   yksityisille** ja siihen tuli asukkaita, kauppoja ja hotelli; osa
   purettiin — kapitulisali, kolme alakerran holvikaarta ja neljä
   yläkerran kaarta katosivat. Arkkitehti **Mario Buschiazzo palautti
   sen 1945**. Se on **Argentiinan täydellisimmin säilynyt cabildo**.
   Rakennuksessa on kaksi museota: **Museo Histórico del Norte**
   alakerrassa ja siirtomaa- ja kuvataidemuseo yläkerrassa.
   Kansallinen historiallinen monumentti **9. tammikuuta 1937** (laki
   12345). Täällä **Manuel Belgrano nimitti Saltan taistelun
   (20.2.1813) jälkeen** Eustoquio Díaz Vélezin maakunnan
   sotilaskuvernööriksi, ja tämä asetti **Argentiinan lipun ensi kerran
   cabildon parvekkeelle**.
6. **Basílica y convento de San Francisco (Salta)** (es): paikka
   varattiin jo vuoden 1582 perustamiskirjassa. Ensimmäinen rakennus
   valmistui **1625**, toinen **1674**, ja kun se paloi 1700-luvun
   puolivälissä, nykyinen temppeli rakennettiin heti sen jälkeen
   sevillalaisen **fray Vicente Muñozin** johdolla — saman, joka teki
   Buenos Airesin San Franciscon ja Córdoban katedraalin kupolin.
   Palot **1761** ja **1772**. Isä Isidoro Fernández palasi **1857**
   Roomasta neljäntoista veljen kanssa, ja työ saatiin vauhtiin;
   luostarin viimeisteli Ugolino Cingolari kahdeksan vuotta myöhemmin.
   Luis Giorgi vihki kirkon uudelleen **1870** ja uuden julkisivun
   **1872**. Sveitsiläinen **Francisco Righetti aloitti 1877
   kellotornin**, joka on **54 metriä ja Etelä-Amerikan korkein**;
   suunnittelija oli saksalainen insinööri José Enrique Teodoro Rauch.
   Belgrano oli **13.3.1813 messussa Saltan taistelun voittajien ja
   voitettujen muistolle**; taistelun tykkien pronssista valettiin
   *Campana de la Patria*. Kirkkoon on haudattu muun muassa Argentiinan
   laivaston perustaja Francisco de Gurruchaga ja Güemesin äiti María
   Magdalena de Goyechea y la Corte. Kansallinen historiallinen
   monumentti **14.7.1941**, basilica minor **4.8.1992**.
7. **Convento de San Bernardo (Salta)** (es): kaupungin vanhimpia
   rakennuksia, pystytetty **1500-luvun lopulla tai 1600-luvun alussa**
   (Gómez de los Ríosin ja kuvernööri Alonso de la Riveran maininta
   1626). Alun perin **San Bernardon erakkomaja**; **1586** viereen
   nousi sairaala nimeltä San Andrés. **Vuoden 1692 maanjäristys
   tuhosi sen**, ja uusi rakennus saatiin käyttökuntoon vasta **1726**.
   Sairaala avattiin uudelleen 1787 ja **20. elokuuta 1805**
   betlehemiläisveljien hoitoon. Pappi **Isidoro Fernández toi 1846
   Chilestä paljasjalkaisia karmeliittanunnia**, ja erakkomajasta ja
   sairaalasta tuli San Bernardon luostari. Sisäänkäynnin **ovi on
   veistetty algarrobo-puusta käsin 1762**; siinä lukee "Don Pedro
   Balentín de la Cámara, año 1762", ja se asennetiin paikalleen 1847.
   Kansallinen historiallinen monumentti **14.7.1941** (asetus 95687).
8. **Monumento a Güemes** (es): **25 metriä korkea**, Paseo Güemesin
   päässä Cerro San Bernardon juurella — paikalla, jossa kenraali
   putosi ensimmäisen kerran hevosensa selästä ratsastaessaan
   luodista haavoittuneena Cañada de la Horquetaan, jossa hän kuoli
   muutamaa päivää myöhemmin. Rakennettu **1920–1931 yli 75 kilon
   lohkareista**, jotka louhittiin Cerro San Bernardosta. Kuvanveistäjä
   **Víctor Juan Garino** teki suunnitelman 1920; yleisjohto arkkitehti
   Andrés Iñigolla, taiteellinen johto René Villeminot'lla ja Alberto
   Milillolla; pronssiosien sovitus tehtiin armeijan Esteban de Lucan
   asevarikolla. Vihittiin **20. helmikuuta 1931**.
   - **Güemes itse** (en "Martín Miguel de Güemes"): syntyi Saltassa
     8.2.1785, kuoli 17.6.1821. Palasi Saltaan 1815, järjesti
     vastarinnan sissitaktiikkaan koulutetuista gauchoista ja nimitettiin
     maakunnan kuvernööriksi. Kuninkaanmielinen kenraali Joaquín de la
     Pezuela kirjoitti Perun varakuninkaalle, että Güemesin joukot
     kävivät "melkein rankaisematta hidasta mutta väsyttävää ja
     vahingollista sotaa". Vuoden 1817 vetäytymisessä käytettiin
     poltetun maan taktiikkaa; de la Serna saapui kaupunkiin 16.
     huhtikuuta 1817, mutta väestö vastusti ja joukot vetäytyivät
     pohjoiseen. Güemes haavoittui selkään 7.6.1821 ja kuoli
     kymmenen päivää myöhemmin La Horquetan rotkossa.

## 7. Matkaoppaan aineisto

- Väkiluku **627 704** (vuoden 2022 laskenta); Argentiinan
  **seitsemänneksi suurin kaupunki**; Valle de Lerman metropolialueen
  keskus, jossa asuu **yli 50,9 %** maakunnan väestöstä. (en "Salta")
- Ilmasto **Cwb** (subtrooppinen ylänköilmasto) 1 200 metrin
  korkeudessa: kesät lämpimiä ukkosineen, päivät 26–28 °C ja yöt
  15–16 °C; syksy kuiva, päivät noin 22 °C ja yöt 10 °C; talvi hyvin
  kuiva, yöt keskimäärin 3 °C mutta päivät 19 °C, hallaa yleisesti ja
  kylmimmillään −7 °C; kevät aurinkoinen, 25–28 °C ja yöt 10–14 °C.
  Sadetta yli **700 mm vuodessa, josta yli 80 % joulukuun ja
  maaliskuun välillä**. Aurinkoa **1 863 tuntia vuodessa** eli noin
  5,1 tuntia päivässä. Korkein mitattu **39,9 °C** (28.11.1972),
  matalin **−9,4 °C** (5.8.1966). (en "Salta", Climate)
- Lentoasema **Martín Miguel de Güemes**. (en "Salta",
  Transportation)
- **Kolme kävelykatua**: Alberdi, Florida ja Caseros. (en "Salta",
  Attractions)
- Aukion ympärillä myötäpäivään: katedraali, Museo de Arte
  Contemporáneo (ranskalaistyylinen), cabildo ja MAAM. (sama)
- **Mercado artesanal** (es): kunnallinen käsityötori.
- **Tren a las Nubes** (en): 217 km Argentiinan puolella
  Salta–Antofagasta-rataa, **La Polvorillan viadukti 4 220 metrissä**.
  *Vain maininta matkaoppaassa — karttanosto omistaa aiheen.*
- **Quebrada de Humahuaca** ja **Purmamarca** ovat päiväretkien
  kohteita Jujuyn maakunnassa. (es "Salta", Turismo) *Vain maininta.*
- **Empanadas salteñas**: pieniä, mehukkaita, tulisia. *Vain maininta —
  maalehti omistaa aiheen.*
- **Museo de Arte Contemporáneo (MAC)** avattiin **26. kesäkuuta
  2004**; Argentiinan taidekriitikkojen yhdistys valitsi sen **vuoden
  2007 museoksi**. (es)
- **Edificio del Centro Cultural América** rakennettiin **1913**
  entisen jesuiittakirkon tontille; se oli Club 20 de Febreron talo,
  arkkitehti **Arturo Prins**, tyyli ranskalainen akatemismi;
  toimi Casa de Gobiernona 1950–1987; kansallinen historiallinen
  monumentti **3.2.1994**. *Ei mahdu kartalle (60 m MAAM:sta) — kerrotaan
  matkaoppaassa.*

## 8. Mitä EI kerrota

- Nykypolitiikkaa (kaupunginvaltuuston paikkajako), nykyrikollisuutta
  eikä urheilutuloksia.
- Llullaillacon lasten kuolintapaa ei kuvailla.
- Empanadaa, Humahuacaa ja Tren a las Nubesia ei tehdä nostoiksi.
