# Santa Fe — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `santafe`, en-Wikipedia
"Santa Fe, New Mexico". Kaikki tiedot haettu en-Wikipedian
raakatekstistä (`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`,
uusinnat kasvavalla viiveellä) ja koordinaatit rajapinnasta
(`action=query&prop=coordinates&redirects=1`) **7.9.2026**. Malli ja
mitat luettu tiedostoista `docs/aasia-tyoaineisto/lehtityo-resepti.md`
(SITOVA), `docs/moduulit/kaupunkilehti.md`,
`docs/mantereet-tyoaineisto/spec-mantereet.md` ja
`docs/tyolista-opukselle.md` (O9, ETUSIVUKUVAN KAAVA, kustannussääntö).
Esikuvana `faktapohja-denver.md`.

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026):
**"Santa Fe, New Mexico"**, **"Pueblo Revolt"**, **"Santa Fe Trail"**,
**"Santa Fe de Nuevo México"**, **"Palace of the Governors"**,
**"Zozobra"**, **"Santa Fe Indian Market"**, **"Loretto Chapel"**,
**"San Miguel Mission"**, **"Santuario de Guadalupe"**,
**"Cathedral Basilica of St. Francis of Assisi (Santa Fe)"**,
"New Mexico State Capitol", "New Mexico Museum of Art",
"Georgia O'Keeffe Museum", "Museum of International Folk Art",
"Santa Fe Plaza", "Canyon Road, Santa Fe, New Mexico",
"Pueblo peoples", "Tewa", "New Mexico".

Kaupungin visa on tarkistettu tiedostosta
`js/packs/northamerica-questions.js` (kohta `santafe`, viisi
kysymystä: missä osavaltiossa, adobe eli savitiili, osavaltion
pääkaupunki, Santa Fe Trail, keitä ovat pueblo-kansat). Kaikki viisi
aihetta esiintyvät tässä faktapohjassa. **Minitehtävä ei saa kysyä
yhtään näistä viidestä.** Ehdotus osiossa 7.

Olemassa olevat `js/packs/northamerica-valokuvat.js`:n ja
`js/packs/northamerica-saapumiset.js`:n santafe-lohkot on luettu
ristiriitojen varalta: saapumisteksti puhuu adobesta, chilinauhoista
ja vuodesta 1610, ja valokuvataulussa on valmis, tarkistettu
ennen–nyt-pari (aukion itälaita 1866, NARA / sama aukio nykyään) sekä
kolme nykykuvaa (alkuperäiskansojen myyjät aukiolla, chilit torilla,
kuvernöörien palatsi). Ristiriitoja ei ole.

Karttanostot: `js/packs/maastokohteet-usa.js` sisältää Mesa Verden ja
Chacon kanjonin, jotka kertovat esi-isäpuebloilaisten
kallioasumuksista ja suurrakennuksista — **lehti ei toista niitä**, ja
pueblo-aihe kerrotaan Santa Fen omasta laaksosta käsin. USA:n maalehden
(`js/packs/maa-kategoriat.js`, USA) aiheet ovat historia, luonto ja
kansallispuistot, musiikki, tiede ja keksinnöt sekä ruoka; **lehti ei
toista niitä**. USA-skandaalit ovat Teapot Dome ja Crédit Mobilier,
eläintäky on biisoni — ei toistoa.

**1873-KEHYS:** isoisän matkavuonna Santa Fe oli **New Mexicon
territorion pääkaupunki ja vaunureitin pääte**. Santa Fe Trail toi
1820-luvulta alkaen tavaraa Missourista preerian halki, ja rata oli
vielä tulematta: Atchison, Topeka and Santa Fe Railway veti linjansa
1880 Lamyn kautta kaupungin ohi, ja haararata Lamysta Santa Feen
valmistui samana vuonna. Vuonna 1873 vaunuilla oli siis seitsemän
vuotta jäljellä. Samana vuonna Loreton sisaret tilasivat kappelin
tyttökoulunsa viereen. Kirjoittaja EI saa sijoittaa rautatietä,
osavaltioasemaa (1912) eikä Pueblo Revival -rakennussääntöä (1912)
vuoteen 1873.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Santa Fe"

**Johdanto (ehdotus, n. 210 merkkiä):**

> Santa Fe on Yhdysvaltain vanhin osavaltion pääkaupunki ja sen
> korkeimmalla sijaitseva: 2 190 metrissä Sangre de Cristo -vuorten
> juurella. Isoisän matkavuonna 1873 se oli territorion pääkaupunki
> ja vaunureitin pääte, jonne rata ei vielä ylettynyt.

### Sivu B — teemasivu, id `kuvataide`, nimi "Taiteen kaupunki"

**Perustelu:** `kuvataide` on vakioaihe `AIHE_IKONIT`-listalla
(js/ui-apurit.js), eikä uusia sivu-id:itä tehdä. Aihe kantaa oman
sivunsa: Pueblo Revival -rakennussääntö, Canyon Roadin galleriat,
Indian Market ja Zozobra ovat neljä eri asiaa eivätkä mahdu
kaupunkisivun neljään nostoon. Laudan `ambience` on santafella
`ylanko` (js/packs/northamerica.js).

**Johdanto (ehdotus, n. 190 merkkiä):**

> Kaupunki päätti 1912, miltä sen pitää näyttää — ja rakensi itsensä
> uudelleen sen näköiseksi. Nykyään joka kymmenes työpaikka on
> taiteessa ja kulttuurissa, ja elokuussa aukio täyttyy myyntipöydistä.

---

## 2. Kahdeksan nostoehdotusta (4 + 4)

Mitat: teksti 440–660 merkkiä, nostoja 4 per sivu (resepti).

### Sivu `kaupunki` — 4 nostoa

**K1. Valkoisen simpukan vesipaikka**

- Ennen eurooppalaista siirtomaavaltaa, noin vuosien 900 ja 1500
  välillä, nykyisen Santa Fen seutu tunnettiin tewa-kansojen kielellä
  nimellä *Kháˀ Pʼoegeh*, "valkoisen simpukan vesipaikka" — yksi
  monista paikoista, jotka on nimetty vedensaantinsa mukaan.
  Navajoiden kielellä paikka on *Yootó*, "helmi" + "vesipaikka". —
  "Santa Fe, New Mexico" (Name)
- Aluetta asuttivat alun perin tanoankieliset kansat, jotka elivät
  lukuisissa pueblokylissä Rio Granden varrella. Yksi varhaisimmista
  tunnetuista asutuksista nykyisen keskustan alueella syntyi joskus
  vuoden 900 jälkeen: joukko tewoja rakensi taloryhmän nykyisen aukion
  paikalle ja puolen mailin päähän siitä etelään ja länteen. Kylän
  nimi oli tewaksi *Oghá Pʼoʼoge*. — "Santa Fe, New Mexico" (Early
  history)
- Tanoanit ja muut pueblo-kansat asettuivat Santa Fe -joen varrelle
  1000-luvun puolivälin ja 1100-luvun puolivälin välillä, mutta
  paikka oli ollut hylättynä vähintään 200 vuotta siihen mennessä, kun
  espanjalaiset saapuivat 1600-luvun alussa. — "Santa Fe, New Mexico"
  (Early history)
- **KIRJOITUSOHJE:** visan kysymys 5 (keitä ovat pueblo-kansat) on
  katettava tässä. Kansat kuvataan elävinä ja nykypäivän toimijoina
  (spec-mantereet.md linjaus 1) — ei "kadonneena kansana".
  Kallioasumukset ja Chaco ovat karttanostoja, eikä niitä toisteta.

**K2. Kaupunki, joka perustettiin kahdesti**

- Juan de Oñate johti ensimmäisen espanjalaisen siirtokuntayrityksen
  1598 ja perusti Santa Fe de Nuevo Méxicon Uuden-Espanjan
  provinssiksi. Oñaten ja hänen poikansa aikana provinssin pääkaupunki
  oli San Juan de los Caballeros Santa Festa pohjoiseen nykyisen Ohkay
  Owingeh Pueblon lähellä. **Espanjalaiset karkottivat Oñaten
  New Mexicosta ja lähettivät hänet maanpakoon, koska hänen hallintonsa
  katsottiin julmaksi alkuperäisväestöä kohtaan.** — "Santa Fe, New
  Mexico" (Spanish era)
- New Mexicon toinen espanjalainen kuvernööri Pedro de Peralta perusti
  **1607** uuden kaupungin Sangre de Cristo -vuorten juurelle ja antoi
  sille nimen *La Villa Real de la Santa Fé de San Francisco de Asís*.
  **Vuonna 1610 hän määräsi sen provinssin pääkaupungiksi**, ja sinä se
  on lähes yhtäjaksoisesti pysynyt — mikä tekee siitä **Yhdysvaltain
  vanhimman osavaltion pääkaupungin**. — "Santa Fe, New Mexico"
  (Name, Spanish era)
- Espanjalaiset kaavoittivat kaupungin **Intian lakien** (Laws of the
  Indies) mukaan; nämä kaupunkisuunnittelun säännöt oli antanut
  kuningas Filip II 1573. Perusperiaate oli, että kaupunki rakennetaan
  keskusaukion ympärille. Aukion pohjoislaidalle tuli kuvernöörien
  palatsi. Kaavaan kuului aukiolta säteittäin lähtevä katuverkko;
  monet kadut olivat kapeita ja niissä oli pieniä kujia, ja ne
  liukuivat vähitellen maatalousalueen väljemmiksi teiksi. — "Santa
  Fe, New Mexico" (Architecture)
- **KIRJOITUSOHJE:** visan kysymykset 1 ja 3 (New Mexico, osavaltion
  pääkaupunki) katetaan tässä. Katedraalia EI mainita — se on
  kohdekartan kohde.

**K3. Vuosi 1680: kaksitoista vuotta pueblojen hallintoa**

- Alkuperäiskansojen edustuksen puute Santa Fe de Nuevo Méxicon
  provinssin hallinnossa johti vuoden 1680 **pueblokapinaan**, jossa
  eri pueblo-kansojen ryhmät onnistuivat ajamaan espanjalaiset pois
  New Mexicosta El Pasoon asti. — "Santa Fe, New Mexico" (Spanish era)
- **Pueblo-kansat hallitsivat New Mexicoa kuvernöörien palatsista
  Santa Fessä vuodesta 1680 vuoteen 1692.** — "Santa Fe, New Mexico"
  (Spanish era)
- Alue vallattiin takaisin 1692, kun Diego de Vargas johti niin
  kutsutun "verettömän takaisinvaltauksen", jota **arvosteltiin
  väkivaltaiseksi jo omana aikanaan**. — "Santa Fe, New Mexico"
  (Spanish era)
- Seuraava kuvernööri Francisco Cuervo y Valdez alkoi rakentaa rauhaa;
  siihen kuului Albuquerquen perustaminen, jotta pueblot saisivat
  paremman edustuksen ja kauppayhteydet New Mexicon hallinnossa. Myös
  Tomás Vélez Cachupinin kaltaiset myöhemmät kuvernöörit tunnetaan
  edistyksellisemmästä työstään alkuperäisväestön kanssa. — "Santa Fe,
  New Mexico" (Spanish era)
- Takaisinvaltausta on juhlittu **Fiestas de Santa Fe -juhlana vuodesta
  1712**. — "Zozobra" (History)
- **KIRJOITUSOHJE:** kapina kerrotaan tapahtumana neutraalisti ja
  ilman julmuuksien yksityiskohtia (pilari 4, spec-mantereet.md
  linjaus 1 ja 2). "Veretön takaisinvaltaus" kirjoitetaan auki niin
  kuin lähde sen antaa — lainausmerkeissä ja arvostelu mukana.

**K4. Vuosi 1873: vaunureitin viimeiset vuodet**

- 1820-luvulta alkaen **Santa Fe Trail** toi tuottoisat kauppayhteydet
  silloiselle Yhdysvaltain rajaseudulle Missouriin, ja se houkutteli
  sekä alkuperäiskansojen että euroamerikkalaisia kauppiaita. Kaupan ja
  muuttoliikkeen avautuminen paransi myös uuden Meksikon tasavallan ja
  Yhdysvaltain suhteita, ja Santa Fe oli sen ensisijainen solmukohta.
  — "Santa Fe, New Mexico" (Mexican era)
- Santa Fe säilyi hallinnollisena ja poliittisena sydämenä ja
  **Mississippin länsipuolen keskeisenä kauppa- ja liikennesolmuna**.
  — "Santa Fe, New Mexico" (Mexican era)
- Yhdysvallat julisti sodan Meksikolle 1846, ja prikaatikenraali
  Stephen W. Kearny johti noin 1 700 sotilaan päävoiman Santa Feen
  vaatiakseen sen ja koko New Mexicon territorion Yhdysvalloille.
  Vuoteen 1848 mennessä Yhdysvallat sai New Mexicon virallisesti
  Guadalupe Hidalgon sopimuksella. — "Santa Fe, New Mexico" (United
  States)
- Eversti Alexander William Doniphan löysi Santa Festä ampumatarvikkeita,
  joissa luki "Spain 1776" — osoitus siitä, miten heikot yhteydet ja
  millainen sotilaallinen tuki New Mexicolla oli Meksikon hallinnon
  aikana. — "Santa Fe, New Mexico" (United States)
- Sisällissodan New Mexicon sotaretkellä kenraali Henry Sibley miehitti
  kaupungin ja liehutti etelävaltioiden lippua Santa Fen yllä muutaman
  päivän maaliskuussa 1862. Sibley joutui vetäytymään, kun unionin
  joukot tuhosivat hänen huoltokuormastonsa Glorieta Passin taistelun
  jälkeen. Santa Fen kansallinen hautausmaa perustettiin sodan jälkeen
  **1870**. — "Santa Fe, New Mexico" (United States)
- Vuonna 1849 eräs matkaaja kirjoitti: *"En juuri käsitä, miten Santa
  Fe pysyy pystyssä. Sitä ympäröivä maa on karua. Pohjoisessa on
  lumihuippuinen vuori, ja laakso, jossa kaupunki on, on ruskeanharmaa
  ja hiekkainen. Kadut ovat kapeita."* — "Santa Fe, New Mexico"
  (United States, blockquote; kirje *The Arkansas Banner* 31.8.1849)
- Kun rautatiet ulottuivat länteen, Santa Fen oli tarkoitus olla
  tärkeä pysäkki Atchison, Topeka and Santa Fe Railwaylla. Insinöörit
  päättivät kuitenkin, että linja on käytännöllisempi vetää **Lamyn**
  kautta kaupungin eteläpuolelta. **Haararata Lamysta Santa Feen
  valmistui 1880**, ja Denver and Rio Grande Western Railroad jatkoi
  kapearaiteisen Chili Linen Españolasta Santa Feen 1886. — "Santa Fe,
  New Mexico" (United States)
- Kumpikaan ei riittänyt korvaamaan sitä, että pääratalinja ohitti
  kaupungin: Santa Fe taantui taloudellisesti vähitellen
  1900-luvun alkuun asti. New Mexicon territorio muodosti Santa Fen
  kaupungiksi 17.6.1891. — "Santa Fe, New Mexico" (United States)
- **KIRJOITUSOHJE:** tämä on 1873-nosto. Vuonna 1873 vaunut kulkivat
  yhä ja rata oli seitsemän vuoden päässä. Orjuutta ja sisällissotaa
  käsitellään perushistoriana ilman osapuolinostalgiaa
  (spec-mantereet.md, USA).

### Teemasivu `kuvataide` — 4 nostoa

**T1. Sääntö, joka teki kaupungista yhtenäisen**

- Kun kaupunki kasvoi 1800-luvulla, rakennustyylit kehittyivät niin,
  että osavaltioaseman aikaan 1912 rakennuskannan kirjavuus sai sen
  näyttämään "Anywhere USA":lta. — "Santa Fe, New Mexico"
  (Architecture)
- Kaupungin hallinto tajusi, että yli kaksikymmentä vuotta aiemmin
  alkanut taantuma — jonka olivat aiheuttaneet radan siirtyminen
  länteen ja liittovaltion Fort Marcyn sulkeminen — voitaisiin kääntää
  matkailua edistämällä. — "Santa Fe, New Mexico" (Architecture)
- Tavoitteeseen päästiin keksimällä yhtenäinen rakennustyyli:
  **Santa Fe Pueblo Revival**, joka perustui kuvernöörien palatsin
  entistämistyöhön. Tyylin ainekset tulivat paikallisesta
  rakentamisesta: *vigat* (karkeat, kantavien seinien läpi työntyvät
  palkit, jotka näkyvät siis myös ulos) ja *canales* (tasakattojen
  matalien räystäskorotusten läpi leikatut vesikourut) sekä vanhojen
  adobetalojen ja kirkkojen maanvärinen ilme, joka toistettiin
  rappauksella. — "Santa Fe, New Mexico" (Architecture)
- **Vuoden 1912 jälkeen tyylistä tuli virallinen: kaikki rakennukset
  oli rakennettava näillä elementeillä.** Vuoteen 1930 mennessä
  hyväksyttiin myös "Territorial"-tyyli, osavaltioasemaa edeltävä
  tapa, johon kuuluivat *portales* (suuret katetut kuistit) ja
  valkoiseksi maalatut ikkuna- ja oviotsat. — "Santa Fe, New Mexico"
  (Architecture)
- Vuoden 1957 asetuksella uusien ja uudelleenrakennettujen talojen —
  etenkin nimetyillä historiallisilla alueilla — on esitettävä
  espanjalais-territoriaalista tai pueblo-tyyliä tasakattoineen. Monet
  nykytalot ovat silti puuta ja betoniharkkoa rapatuin pinnoin; sitä
  sanotaan nimellä *faux-dobe*. — "Santa Fe, New Mexico"
  (Architecture)
- **Hinta maksettiin historialla:** "puebloittamisen kiireessä"
  kaupunki menetti suuren osan omasta rakennushistoriastaan ja
  kirjavuudestaan. Tyyliin läheisimmin liittyviä arkkitehteja ovat
  T. Charles Gaastra ja John Gaw Meem. — "Santa Fe, New Mexico"
  (Architecture)
- **KIRJOITUSOHJE:** visan kysymys 2 (adobe) katetaan tässä.

**T2. Kaksisataaviisikymmentä galleriaa**

- Santa Fe on Yhdysvaltain lounaisosan kulttuuripääkaupunkina pidetty
  kaupunki ja laajalti maan merkittävimpiä taidekaupunkeja. **Vuonna
  2005 siitä tuli ensimmäinen yhdysvaltalainen kaupunki, joka
  hyväksyttiin Unescon luovien kaupunkien verkostoon** — käsityön ja
  kansantaiteen alalla. — "Santa Fe, New Mexico" (johdanto, Arts and
  culture)
- Kaupungissa on **yli 250 taidegalleriaa**, suuri museokeskittymä ja
  kolme vuotuista taidetapahtumaa: Santa Fe International Folk Art
  Market, R/Traditional Spanish Colonial Market ja Indian Market. —
  "Santa Fe, New Mexico" (johdanto)
- **Joka kymmenes työpaikka liittyy taiteen ja kulttuurin aloihin, ja
  kirjailijoiden osuus työvoimasta on suurin kaikista Yhdysvaltain
  kaupungeista.** — "Santa Fe, New Mexico" (johdanto)
- **Canyon Road** aukiolta itään on kaupungin tihein galleriakeskittymä
  ja kansainvälisten keräilijöiden, turistien ja paikallisten
  kohde. Gallerioissa on nyky-, lounais-, alkuperäiskansa- ja
  kokeellista taidetta sekä Taosin mestareiden töitä. Kaupungissa on
  myös ulkoveistoksia, muun muassa useita Franciscus Assisilaisen ja
  Kateri Tekakwithan patsaita. — "Santa Fe, New Mexico" (Visual arts)
- Kirjailijoita on seurannut taiteilijoiden perässä: kaupungissa ovat
  asuneet muun muassa D. H. Lawrence, Cormac McCarthy, Tony Hillerman,
  Roger Zelazny ja George R. R. Martin. — "Santa Fe, New Mexico"
  (Literature)
- Nykytaiteen puolella toimii taiteilijayhteisö **Meow Wolf**, jonka
  taustalla oli alun perin George R. R. Martin; sen laaja
  taideinstallaatio *House of Eternal Return* avattiin 2016. SITE
  Santa Fe puolestaan järjesti vuonna 1995 alkaen Yhdysvaltain
  kansainvälisen nykytaidebiennaalin. — "Santa Fe, New Mexico"
  (Visual arts)

**T3. Elokuun aukio: Indian Market**

- Santa Fe Indian Market on vuotuinen taidemarkkina, joka pidetään
  **elokuun kolmatta torstaita seuraavana viikonloppuna**. Tapahtuma
  tuo kaupunkiin arviolta **150 000 ihmistä** ympäri maailmaa. —
  "Santa Fe Indian Market" (johdanto)
- Järjestäjä on voittoa tavoittelematon Southwestern Association for
  Indian Arts (SWAIA), ja markkinoilla on noin **1 000 alkuperäiskansojen
  taiteilijaa** Yhdysvalloista ja Kanadasta, rannikolta rannikolle. —
  "Santa Fe Indian Market" (johdanto)
- Taiteilijat myyvät suoraan yleisölle kojuista Santa Fen aukion
  ympärillä ja sen viereisillä kaduilla. Osallistuakseen taiteilijan
  on todistettava kuuluvansa liittovaltion tunnustamaan kansaan, ja
  töiden on täytettävä tiukat laatu- ja materiaalivaatimukset. —
  "Santa Fe Indian Market" (Art standards)
- Ensimmäinen markkina järjestettiin nimellä Southwest Indian Fair and
  Industrial Arts and Crafts Exhibition osana Fiesta de Santa Fea, ja
  sitä ehdotti taiteen puolestapuhuja **Rose Dougan 1922**. Varhaisten
  markkinoiden tarkoitus oli vastustaa sitä, että matkamuistokaupan
  kysyntä heikentäisi pueblokeramiikan laatua ja aitoutta. Alkuaikoina
  savenvalajat eivät itse olleet paikalla myymässä töitään. — "Santa
  Fe Indian Market" (1920s)
- Ensimmäinen alkuperäiskansaan kuuluva SWAIAn johtaja oli **Ramona
  Sakiestewa** (hopi), tekstiilitaiteilija ja suunnittelija, joka
  johti järjestöä 1980–1982 palkatta. — "Santa Fe Indian Market"
  (SWAIA leadership)
- Markkinoiden taloudelliseksi vaikutukseksi on laskettu yli 19
  miljoonaa dollaria. — "Santa Fe Indian Market" (SWAIA leadership)
- Vuodesta 2014 ohjelmaan on kuulunut myös muotinäytös; Santa Fessä
  järjestetään lisäksi joka toukokuu Native Fashion Week. — "Santa Fe
  Indian Market", "Santa Fe, New Mexico" (Fashion)

**T4. Zozobra, viisikymmentä jalkaa murhetta**

- Zozobra eli **Old Man Gloom** on jättimäinen marionettinukke, joka
  tehdään puusta, rautalangasta ja puuvillakankaasta ja poltetaan
  Labor Day -viikonlopun perjantaina ennen vuotuisia Fiestas de Santa
  Fe -juhlia. Se on **50 jalkaa ja 6 tuumaa** korkea. — "Zozobra"
  (johdanto)
- Nimi tulee espanjan sanasta *zozobra*, joka tarkoittaa ahdistusta
  tai huolta. Nukke ruumiillistaa synkkyyden, ja polttamalla se
  ihmiset hävittävät edellisen vuoden murheet. Kuka tahansa voi
  kirjoittaa murheensa lapulle ja jättää sen "murhelaatikkoon"
  kaupungin matkailuneuvontaan viikkoja ennen polttoa; polttopäivänä
  murheita voi lisätä nuken täytteeseen "murheteltassa" iltakahdeksaan
  asti. Zozobraan on päätynyt oikeuden papereita, avioeroasiakirjoja,
  maksettuja asuntolainoja, pysäköintisakkoja, Martin-kitara ja
  hääpuku. — "Zozobra" (Burnt articles)
- Fiestas de Santa Fea on vietetty **vuodesta 1712** juhlistamaan
  Diego de Vargasin vuoden 1692 takaisinvaltausta. **Zozobran poltto
  on peräisin vuodelta 1924**, jolloin taiteilija William Howard
  Shuster Jr. teki ja poltti ensimmäisen Zozobran takapihallaan
  ystävilleen ja taiteilijakollegoilleen. Nimen valitsivat Shuster ja
  sanomalehtitoimittaja E. Dana Johnson Meksikon-matkansa jälkeen. —
  "Zozobra" (History)
- Kiwanis-klubi on saanut kaikki oikeudet tapahtumaan Shusterilta
  1964, ja se rakentaa ja polttaa nuken **Fort Marcyn puistossa**.
  Tapahtumaan tulee vuosittain yli **60 000** ihmistä. 7.9.2007
  poltettu Zozobra sertifioitiin Guinnessin ennätystenkirjaan
  maailman suurimmaksi marionetiksi: 15,21 metriä. — "Zozobra"
  (Modern celebration)
- Ohjelma on näytelmä: valot sammuvat, Zozobra alkaa liikkua ja
  huutaa "Gloomies"-henkiään, nuoret tanssijat esittävät kaupungin
  lapsia joiden mielen se on sumentanut, soihdunkantajat pakenevat, ja
  yleisö alkaa huutaa "burn him". — "Zozobra" (Event description)
- **KIRJOITUSOHJE:** juhla kytkeytyy takaisinvaltaukseen, joka on
  noston K3 aihe — kerro Zozobra ilmiönä ja mainitse juhlan tausta
  yhdellä lauseella, älä toista K3:n sisältöä.

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Matkaopas on NYKYTIETOA (resepti, linjaustarkennus 20.8.2026).

**J1. Perille ja liikkeelle.** Santa Fe Regional Airportista on
suihkukoneyhteyksiä Dallas/Fort Worthiin ja Phoenixiin (American),
kausiluonteisesti Denveriin ja Houstoniin (United) sekä Dallas Love
Fieldiin (JSX). Kaupunki on I-25:n varrella, ja US 84 ja US 285
kulkevat sen läpi St. Francis Drivea pitkin; NM-599 on kehätie
luoteessa. Vuosina 1926–1937 US 66 kulki Santa Fen kautta. Kaupungin
oma bussiyhtiö on Santa Fe Trails. New Mexico Rail Runner Express on
lähijuna Albuquerquen suuntaan, ja Santa Fessä on neljä asemaa. Santa
Fe Southern Railway ajaa museojunia 15 mailin päähän Lamyyn, jossa
pysähtyy Amtrakin Southwest Chief. — "Santa Fe, New Mexico"
(Transportation)

**J2. Aukio ja museot.** Suuri osa matkailusta keskittyy vanhaan
keskustaan, etenkin aukiolle, joka on yhden korttelin kokoinen ja
kuvernöörien palatsin vieressä. Muita alueita ovat Museum Hill, jolla
on useita taidemuseoita ja jolla järjestetään Santa Fe International
Folk Art Market, sekä Canyon Roadin galleriat. — "Santa Fe, New
Mexico" (Tourism)

**J3. Päiväretket.** Taos on noin 70 mailia pohjoiseen, Bandelier
National Monument ja Valles Caldera noin 30 mailin päässä. Ski Santa
Fe on 16 mailia koilliseen. Chimayó on lähellä, ja monet paikalliset
tekevät vuosittaisen pyhiinvaelluksen Santuario de Chimayóon.
Syyskuun toisella viikolla Sangre de Cristo -vuorten haavat
keltaisenevat. — "Santa Fe, New Mexico" (Tourism)

**J4. Mitä täällä syödään.** Santa Fe tunnetaan panoksestaan New
Mexicon keittiöön ja New Mexicon musiikkiin. Chile on osavaltion
tunnusomaisin viljelykasvi (matkakirjan valokuvataulun mukaan sato
paahdetaan syksyllä pyörivissä rummuissa torin laidalla). Ravintoloista
en-Wikipedia nimeää Alkemēn ja Bobcat Biten. — "Santa Fe, New Mexico"
(johdanto, Restaurants), `northamerica-valokuvat.js`

**J5. Milloin kannattaa tulla.** Ilmasto on kylmä puolikuiva (Köppen
BSk). Vuorokauden keskilämpötila vaihtelee joulukuun 30,3 °F:sta
heinäkuun 70,1 °F:iin. Kuivuuden ja korkeuden takia vuorokauden
lämpötilavaihtelu ylittää 25 °F joka kuukausi ja 30 °F suuren osan
vuodesta. Lunta sataa tavallisesti kuudesta kahdeksaan kertaa vuodessa
marras–huhtikuussa, eniten joulukuussa (17 cm). Rankimmat sateet ovat
heinä–elokuussa Pohjois-Amerikan monsuunin myötä; vähiten sataa
helmikuussa (12 mm) ja eniten heinäkuussa (55 mm). — "Santa Fe, New
Mexico" (Climate)

**SÄÄRIVIÄ EI TULE** (Fablen ohje 7.9.2026). Oppaan sääjakso nojaa
en-Wikipedian Climate-osioon ja sanoo sen ääneen.

---

## 4. Kahdeksan kohdekartan kohdetta

Koordinaatit haettu en-Wikipedian rajapinnasta
(`action=query&prop=coordinates&redirects=1`) 7.9.2026; taidemuseon ja
O'Keeffe-museon koordinaatit luettu artikkelien tietolaatikoiden
`{{coord}}`-merkinnöistä, koska niissä on `display=inline` eivätkä ne
siksi näy rajapinnassa. Etäisyydet ovat omia laskelmiani
koordinaattieroista (asteet × 111,32 km, pituusasteille kerroin
cos(35,68°) ≈ 0,8123).

| # | Nimi suomeksi | Koordinaatit | Lähdeartikkeli |
|---|---|---|---|
| 1 | Guadalupen pyhäkkö | 35,68694°N 105,94500°W | "Santuario de Guadalupe" |
| 2 | Georgia O'Keeffen museo | 35,68896°N 105,94119°W | "Georgia O'Keeffe Museum" |
| 3 | New Mexicon taidemuseo | 35,68810°N 105,93920°W | "New Mexico Museum of Art" |
| 4 | Pyhän Franciscuksen katedraali | 35,68650°N 105,93630°W | "Cathedral Basilica of St. Francis of Assisi (Santa Fe)" |
| 5 | Loreton kappeli | 35,68556°N 105,93778°W | "Loretto Chapel" |
| 6 | San Miguelin kirkko | 35,68343°N 105,93767°W | "San Miguel Mission" |
| 7 | New Mexicon osavaltiotalo | 35,68230°N 105,93970°W | "New Mexico State Capitol" |
| 8 | Kansantaiteen museo | 35,66406°N 105,92618°W | "Museum of International Folk Art" |

**Etäisyydet:** pienin väli on **noin 170 metriä** (katedraali –
Loreton kappeli), toiseksi pienin **204 metriä** (taidemuseo –
O'Keeffen museo) ja kolmanneksi pienin **223 metriä** (osavaltiotalo –
San Miguelin kirkko). Katedraalin ja kappelin väli alittaa 200 metrin
säännön; ne ovat naapureita saman korttelin kulmissa. **Molemmat
pidetään** Nuukin ja Iqaluitin ennakkotapauksen mukaisesti sillä
ehdolla, että `tools/tarkista-karttapisteet.mjs` ei ilmoita
numeroympyröiden päällekkäisyyttä ja kuva katsotaan silmin.

**Rajausehdotus:** pohjoinen 35,6930, etelä 35,6600, länsi −105,9620,
itä −105,9120 → noin **4,5 × 3,7 km**.

**RUUTUA EI KESKITETÄ WIKIPEDIAN KAUPUNKIPISTEESEEN** (35,66722 /
−105,96444): se on noin kolme kilometriä aukiolta lounaaseen. Kartta
ankkuroidaan historialliseen ytimeen (spec-mantereet.md linjaus 4, San
Franciscon ennakkotapaus).

**POIS JÄTETYT KOHTEET (kohdekartta ei toista lehden juttuja —
New Yorkin sääntö):**

- *Kuvernöörien palatsi* (35,68778 / −105,93750): pueblokapinan
  hallintopaikka on noston K3 aihe ja Pueblo Revival -tyylin lähde
  noston T1 aihe; lisäksi se on jo matkakirjan valokuvataulussa.
- *Santa Fen aukio* (35,68743 / −105,93852): Intian lakien mukainen
  keskusaukio on noston K2 aihe, ja Indian Market pystyttää kojunsa
  juuri siihen (nosto T3).
- *Canyon Road* (35,68139 / −105,92778): noston T2 aihe.
- *Fort Marcy*: Zozobran polttopaikka, noston T4 aihe.
- *Barrio de Analcon historiallinen alue*: sama kortteli kuin San
  Miguelin kirkko, joka on sen tunnetuin rakennus.
- *Santa Fe Railyard* ja *Meow Wolf*: Railyard on radan tulon aihe
  (nosto K4) ja Meow Wolf noston T2 aihe.
- *Museum of Indian Arts and Culture* ja *Wheelwright*: samalla
  Museum Hillillä kuin kansantaiteen museo, alle 200 metrin päässä
  toisistaan.

---

## 5. Säätiedot

- **Keskustan koordinaatit:** kaupungin oma piste on 35,66722 /
  −105,96444; aukio on 35,68743 / −105,93852. — "Santa Fe, New
  Mexico" (infobox), "Santa Fe Plaza"
- **Korkeus:** 7 199 jalkaa (2 194 m) merenpinnan yläpuolella;
  **Yhdysvaltain korkeimmalla sijaitseva osavaltion pääkaupunki**.
  Sääaseman korkeus on säälaatikon mukaan 2 133 m. — "Santa Fe, New
  Mexico" (Geography, Climate)
- **Köppen-luokka:** BSk, kylmä puolikuiva. — "Santa Fe, New Mexico"
  (Climate)
- **Kuukausinormaalit (1991–2020, °F):** ks. artikkelin weather box;
  vuoden keskilämpö 50,0 °F, ylin keskiarvo heinäkuussa 85,8 °F ja
  alin joulukuussa 42,6 °F. Sadetta vuodessa 12,79 tuumaa ja lunta
  20,2 tuumaa. — "Santa Fe, New Mexico" (Climate, weather box)
- **HUOM:** nämä eivät ole `saatiedot.js`-rivin vaatimat ERA5
  1991–2020 -normaalit celsiuksina. Riviä ei tehdä (Fablen ohje).

---

## 6. Kuva-aiheet ja Commons-kategoriavinkit

**Kansikuvat (3), ehdotus** (laajoja yleiskuvia):
1. Aukio ylhäältä tai laajana näkymänä pylväskäytävineen.
2. Kaupungin adobekatto­näkymä Sangre de Cristo -vuoria vasten.
3. Katedraali tai keskustan siluetti ympäristössään.

**Avauskuvat (3), ehdotus:** Canyon Roadin galleriakatu, museokortteli
Museum Hillillä, osavaltiotalon pyöreä runko ilmasta.

**Ennen ja nyt:** valmis, tarkistettu pari on jo
`js/packs/northamerica-valokuvat.js`:n santafe-lohkossa —
`"East Side of Plaza, Santa Fe, N. M." 1866 - NARA - 533174.jpg`
(1866, National Archives) ja `Santa Fe Plaza gazebo.jpg` (nykyaika).
Sama aukio molemmissa. Lisenssi ja tekijä on silti tarkistettava
uudelleen Commonsin extmetadatasta lehden lähderiviä varten (muoto
`Tekijä, Wikimedia Commons (LISENSSI)`).

**Commons-kategoriat kuvahakuun:**
- `Category:Santa Fe, New Mexico`, `Category:Santa Fe Plaza`
- `Category:Cathedral Basilica of St. Francis of Assisi (Santa Fe, New Mexico)`
- `Category:Loretto Chapel`, `Category:San Miguel Mission (Santa Fe, New Mexico)`
- `Category:Santuario de Guadalupe (Santa Fe, New Mexico)`
- `Category:New Mexico Museum of Art`, `Category:Georgia O'Keeffe Museum`
- `Category:Museum of International Folk Art`
- `Category:New Mexico State Capitol`
- `Category:Canyon Road (Santa Fe, New Mexico)`
- `Category:Zozobra`, `Category:Santa Fe Indian Market`

**MINIATYYRIT:** kohdekartan kahdeksan kohdetta tarvitsevat
akvarelliminiatyyrit. Kirjoittaja EI generoi niitä
(kustannussääntö) vaan listaa ne raporttiin.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Perustamisvuosi 1607 vai 1610.** Leipäteksti sanoo Peraltan
   perustaneen kaupungin 1607 ja määränneen sen pääkaupungiksi 1610;
   Name-osio sanoo Oñaten perustaneen provinssin 1598 ja Peraltan
   antaneen kaupungille nimen. Visan `fact`-kenttä ja saapumisteksti
   käyttävät vuotta 1610. **Ratkaisu:** kirjoita molemmat auki
   ("perustettiin 1607, pääkaupungiksi 1610") — vuosi 1610 on se, jota
   kaupunki itse käyttää ja johon peli jo viittaa.
2. **Kaupungin korkeus.** Geography-osio sanoo 7 199 jalkaa (2 194 m),
   säälaatikon otsikko 2 133 m — jälkimmäinen on sääaseman eikä
   kaupungin korkeus. **Ratkaisu (tarkistus-santafe.md kohta E):**
   käytä kaupungin lukua noin 2 190 metriä tai sano "runsaat kaksi
   kilometriä".
3. **Santa Fen kaupunkikoordinaatti ei ole aukiolla** (ks. osio 4).
   Kohdekartta ankkuroidaan aukiolle.
4. **Loreton portaikko on legenda, ei fakta.** Lähde kertoo
   sisarten perimätiedon (yhdeksän päivän novena, tuntematon
   rakentaja) nimenomaan kertomuksena ja siteeraa myös puuseppien
   arvioita työstä. **Ratkaisu:** kerro tarina kertomuksena ja
   mittatiedot faktana (20 jalkaa, kaksi täyttä kierrosta ilman
   keskipylvästä, 33 askelmaa, kaiteet lisättiin 1887).
5. **Katedraalin tetragrammaton.** 1800-luvun tarina Lamyn
   kiitoksesta San Antonion juutalaisille kauppiaille on lähteen
   mukaan **vahvistamaton**. **Ratkaisu:** joko jätä pois tai kerro
   auki, ettei tarinaa ole vahvistettu.
6. **Nykypolitiikka ja hiippakunnan sovintosumma jätetään pois.**
   Katedraaliartikkelin 2022 kiinnitysuutinen ei kuulu lehteen
   (ei nykypolitiikkaa, ei rikosuutisia).
7. **Japanilaisamerikkalaisten internointileiri** on artikkelissa oma
   alaotsikkonsa. Se on aitoa historiaa, mutta se on rajattu tämän
   erän ulkopuolelle tilan takia; jos se otetaan mukaan myöhemmin, se
   kerrotaan tapahtumana neutraalisti ilman yksityiskohtia.
8. **Minitehtäväehdotus (ei osu visaan):** *"Mikä Zozobra on?"* —
   vastaus "jättimäinen marionettinukke, joka poltetaan joka syksy",
   ja se löytyy samalta sivulta nostosta T4. Visa ei kysy Zozobrasta
   mitään.
9. **Kuvateksti on yksi virke** ja ARTIKKELIT-intro 7–10 virkettä
   (700–1 100 merkkiä). `js/packs/northamerica-artikkelit.js` tarvitsee
   avaimen **`Santa Fe (New Mexico)`** — se on kaupungin wiki-nimi
   js/packs/northamerica.js:ssä, ja ui.js hakee artikkelin avaimella
   `city.wiki ?? city.name`.
