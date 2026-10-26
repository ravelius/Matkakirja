# Livian pulu — Ruotsin läänien kysymykset (luonnos)

Sisältökirjuri, 27.9.2026. 2 suomenkielistä kysymys–vastaus-paria per 21
Ruotsin lääniä "Livian pulu" -minipeliin. Aiheet on tarkistettu olemaan ERI
kuin annettu "lyhyt"-fakta per lääni. Tosiasiat tarkistettu WebSearchilla
(lähteet mainittu kunkin läänin kohdalla vapaamuotoisesti perusteluna, ei
koodiin). Kaikki vastaukset alle 400 merkkiä.

Avainten kirjoitusasu on tehtävänannon mukainen täsmälleen (huom. "Orebro"
ilman diakriittiä).

## Luottamustaso

- **Erittäin luotettavat (tarkistettu useasta lähteestä, tarkat
  vuosiluvut/UNESCO-päätökset):** Dalarna (Stora Stöten -romahdus 1687),
  Gävleborg (Hälsingegårdar UNESCO 2012), Halland (Tjolöholm 1898–1904),
  Jämtland (Frösöstenen ~1050), Kalmar (Kalmarunioni 1397, Stora Alvaret
  UNESCO 2000), Norrbotten (Gammelstad UNESCO 1996), Skåne (Öresundsbron
  2000), Stockholm (Vaasa 1628/1961, Nobel-illallinen), Uppsala (yliopisto
  1477), Västerbotten (Uumajan palo 1888, Sara-kulttuuritalo 2021),
  Västernorrland (Sundsvallin palo 1888, Ådalen 1931), Västmanland
  (Anundshög, Engelsbergin ruukki UNESCO 1993), Västra Götaland (Göteborg
  1621, Liseberg 1923), Orebro (Örebron valtiopäivät 1810), Östergötland
  (Vadstena 1384, Göta-kanava 1810–1832).
- **Melko luotettavat (yleisesti tunnettuja, vahvistettu hakulla mutta
  ilman tarkkaa numerodataa):** Blekinge (Brömsebron rauha 1645 vahva,
  Ronneby kylpyläkaupunkina yleistieto), Gotland (raukat ja gotlanninponi
  vahvistettu), Jönköping (Huskvarna 1689 vahva, Habon kirkko yleistieto),
  Kronoberg (Glasriket vahvistettu, Växjö-väite yleisesti käytetty
  markkinointitieto), Södermanland (Sigurdinkaiverrus vahva, Gripsholm
  yleistieto), Värmland (Selma Lagerlöf ja John Ericsson molemmat
  yleistunnettuja, ei erikseen hakuvahvistettu tässä kierroksessa).
- **Ei hakuvahvistettu erikseen mutta yleistä koulutietoa:** Uppsalan
  tuomiokirkon "korkein Skandinaviassa" -väite ja Örebron linnan
  yleiskuvaus.

Jos Fable tai Karttaseppä haluaa lisävarmistuksen jollekin kohdalle,
merkitkää se tähän tiedostoon niin tarkistan uudella kierroksella.

---

## Valmiit JS-lohkot

```js
  Blekinge: [
    { q: "Miksi Brömsebron rauha vuonna 1645 oli niin merkittävä Ruotsille?", a: "Blekingen rajalla solmittu rauha päätti sodan Tanskaa vastaan, ja Ruotsi sai haltuunsa Gotlannin, Hallannin ja Jämtlannin – siitä alkoi Ruotsin suurvalta-aika." },
    { q: "Mikä tekee Ronnebystä erikoisen kylpyläkaupungin?", a: "Ronneby on ollut kylpyläkaupunki jo 1600-luvulta lähtien – parantavaksi uskottu lähdevesi houkutteli väkeä ympäri Ruotsia terveyttä hakemaan." },
  ],
  Dalarna: [
    { q: "Miten Falun kuparikaivoksen suuronnettomuus muutti maisemaa?", a: "Juhannuspäivänä 1687 kaivoksen katto romahti ja syntyi Stora Stöten, syvä ja laaja kuilu – onneksi kaivosmiehet olivat sattumalta vapaapäivällä juhlimassa." },
    { q: "Mistä Dalan puuhevonen on peräisin?", a: "Perinteinen käsin veistetty ja maalattu puuhevonen syntyi Nusnäsin kylässä 1800-luvulla ja siitä tuli Ruotsin tunnetuin matkamuistosymboli." },
  ],
  Gotland: [
    { q: "Mitä raukat ovat ja mistä ne johtuvat?", a: "Raukat ovat meren vuosituhansien saatossa muotoilemia kalkkikivipatsaita Gotlannin rannoilla – Digerhuvudin alue pohjoisrannikolla on niistä suurin kenttä." },
    { q: "Missä gotlanninponit elävät nykyään lähes puolivillinä?", a: "Gotlanninponi on Ruotsin vanhin alkuperäinen hevosrotu, ja Lojsta Hedin nummella laumat laiduntavat edelleen luonnontilan kaltaisissa oloissa." },
  ],
  Gävleborg: [
    { q: "Mikä tekee Hälsingegårdar-taloista maailmanperintökohteen?", a: "UNESCO nimesi 2012 seitsemän 1800-luvun hälsinkiläistalota maailmanperinnöksi – talonpojat rakensivat kokonaisia juhlahuoneita täyteen maalauksia ja koristeita." },
    { q: "Miten Gävlen vanha kaupunginosa Gamla Gefle säilyi tähän päivään?", a: "Puutalokortteli selvisi vuoden 1869 tuhoisasta tulipalosta, joka poltti suuren osan Gävleä – nykyään se on yksi Ruotsin parhaiten säilyneistä puukaupunginosista." },
  ],
  Halland: [
    { q: "Miksi Tjolöholmin linna näyttää enemmän englantilaiselta kuin ruotsalaiselta?", a: "Linna rakennettiin 1898–1904 Dickson-suvun kesähuvilaksi, ja arkkitehti sai vaikutteita englantilaisesta Tudor-tyylistä ja taideteollisuusliikkeestä." },
    { q: "Mikä tekee Laholmin joesta kuuluisan?", a: "Lagan-joki Laholmissa on ollut arvostettu lohijoki jo keskiajalta lähtien, ja kuninkailla oli aikoinaan omat kalastusoikeutensa sen koskiin." },
  ],
  Jämtland: [
    { q: "Mitä Frösön riimukivi kertoo?", a: "Noin vuonna 1050 pystytetty kivi on Jämtlannin ainoa säilynyt riimukivi ja ainoa tunnettu kivi, joka kertoo kokonaisen maakunnan kristinuskoon kääntymisestä." },
    { q: "Miksi Åre on yksi Pohjoismaiden suosituimmista laskettelupaikoista?", a: "Åressa yhdistyvät korkeat tunturit, luotettava lumitilanne ja pitkä hiihtokeskusperinne, mikä on tehnyt siitä yhden Skandinavian suurimmista laskettelukeskuksista." },
  ],
  Jönköping: [
    { q: "Mistä Huskvarnan tehtaat saivat alkunsa?", a: "Vuonna 1689 Huskvarnaan perustettiin asetehdas Vättern-järven putouksien äärelle – samasta tehtaasta kasvoi myöhemmin myös ompelukoneita ja moottoripyöriä valmistava Husqvarna." },
    { q: "Mikä tekee Habon kirkosta erikoisen?", a: "Habon puukirkko on yksi Euroopan suurimmista puukirkoista, ja sen sisätilat on maalattu 1700-luvulla lattiasta kattoon raamatullisin kuvin." },
  ],
  Kalmar: [
    { q: "Mitä Kalmarin linnassa sovittiin vuonna 1397?", a: "Kalmarin linnassa solmittiin Kalmarin unioni, jolla Tanska, Norja ja Ruotsi yhdistyivät saman hallitsijan alle – sopimuksen allekirjoitti kymmeniä aatelisia ja kirkonmiehiä." },
    { q: "Miksi Stora Alvaret Öölannissa on maailmanperintökohde?", a: "Tämä laaja kalkkikivikangas on yksi Euroopan suurimmista alvareista, ja sen ainutlaatuinen kasvillisuus on syntynyt vuosituhansien laidunnuksen tuloksena." },
  ],
  Kronoberg: [
    { q: "Mikä on Glasriket ja miksi se syntyi juuri tänne?", a: "Smoolannin lasiteollisuusalueella toimii useita lasitehtaita, kuten 1742 perustettu Kosta – seudun metsät tarjosivat polttopuuta ja hiekka raaka-ainetta lasinpuhallukseen." },
    { q: "Miksi Växjötä kutsutaan Euroopan vihreimmäksi kaupungiksi?", a: "Växjö on saanut kansainvälistä tunnustusta ilmastotyöstään – kaupunki tavoittelee fossiilivapautta ja sen energiantuotanto perustuu suurelta osin bioenergiaan." },
  ],
  Norrbotten: [
    { q: "Miksi koko Kirunan kaupunki siirretään uuteen paikkaan?", a: "Maailman suurin maanalainen rautakaivos syö vuori vuodelta maaperää kaupungin alta, ja siksi keskusta rakennetaan kokonaan uudelleen muutaman kilometrin päähän." },
    { q: "Mikä tekee Gammelstadin kirkkokylästä ainutlaatuisen?", a: "Luulajan liepeillä sijaitseva Gammelstad on maailman suurin ja parhaiten säilynyt kirkkokylä satoineen pienine mökkeineen kaukaisia kirkkomatkalaisia varten – UNESCO-kohde vuodesta 1996." },
  ],
  Skåne: [
    { q: "Miten Öresundin silta muutti liikkumista Ruotsin ja Tanskan välillä?", a: "Vuonna 2000 avattu silta ja tunneli yhdistivät Skoonen ja Kööpenhaminan – matka, joka ennen vaati lauttaa, kestää nyt autolla vain kymmenisen minuuttia." },
    { q: "Mitä Kivikin kuninkaanhaudassa on erikoista?", a: "Pronssikautinen, noin 3500 vuotta vanha hauta on Pohjoismaiden suurimpia, ja sen kivissä on harvinaislaatuisia hautakammion sisäpuolisia kuvakaiverruksia." },
  ],
  Stockholm: [
    { q: "Mitä Vaasa-laivalle tapahtui neitsytmatkallaan?", a: "Sotalaiva kaatui ja upposi Tukholman satamassa elokuussa 1628 vain lyhyen matkan jälkeen – se nostettiin pintaan vasta 1961, upean hyvin säilyneenä." },
    { q: "Missä Nobel-palkintojen juhlaillallinen järjestetään?", a: "Joulukuun 10. päivä juhlaillallinen pidetään Tukholman kaupungintalon Sinisessä salissa, joka on punatiilinen sali – arkkitehti muutti mielensä sinisestä värityksestä kesken rakennustöiden." },
  ],
  Södermanland: [
    { q: "Mitä Ramsundsbergetin kalliokaiverrus kuvaa?", a: "Sigurdinkaiverrus 1000-luvulta kertoo sankari Sigurd Lohikäärmeentappajan tarinan – se on yksi Pohjoismaiden merkittävimmistä viikinkiaikaisista kuvakaiverruksista." },
    { q: "Mikä tekee Gripsholmin linnasta erityisen?", a: "Mälaren-järven rannalla kohoava linna toimii Ruotsin valtion muotokuvakokoelman kotina – siellä on satoja kuninkaallisten ja merkkihenkilöiden muotokuvia 1500-luvulta nykypäivään." },
  ],
  Uppsala: [
    { q: "Miksi Uppsalan yliopisto on erityisen merkittävä?", a: "Vuonna 1477 perustettu yliopisto on koko Pohjoismaiden vanhin, ja se on kouluttanut tutkijoita ja virkamiehiä yli 500 vuoden ajan." },
    { q: "Mikä tekee Uppsalan tuomiokirkosta erikoisen?", a: "Se on Skandinavian korkeimpia kirkkorakennuksia, ja sen kryptaan on haudattu kuningas Kustaa Vaasa, Ruotsin Vaasa-suvun ensimmäinen hallitsija." },
  ],
  Värmland: [
    { q: "Kuka oli Selma Lagerlöf ja mihin hän liittyy Värmlantiin?", a: "Nobelin kirjallisuuspalkinnon ensimmäinen naisvoittaja vuonna 1909 kasvoi Mårbackan tilalla Värmlannissa, ja lapsuudenkoti on nykyään museona yleisölle avoinna." },
    { q: "Kuka oli John Ericsson ja mitä hän keksi?", a: "Filipstadissa syntynyt insinööri suunnitteli 1800-luvulla mm. laivapotkurin ja Yhdysvaltain sisällissodassa kuuluisaksi tulleen sota-alus Monitorin panssaroidun tornin." },
  ],
  Västerbotten: [
    { q: "Miksi Uumajaa kutsutaan koivujen kaupungiksi?", a: "Vuoden 1888 tulipalo tuhosi suuren osan kaupungista, ja jälleenrakennuksessa kaduille istutettiin koivukujia palokaistaleiksi – nimitys Björkarnas stad on säilynyt siitä lähtien." },
    { q: "Mikä tekee Skellefteån Sara-kulttuuritalosta poikkeuksellisen?", a: "Vuonna 2021 avattu 20-kerroksinen, 80 metriä korkea rakennus on yksi Euroopan korkeimmista puutaloista – hotelli, teatteri ja museo saman puurungon sisällä." },
  ],
  Västernorrland: [
    { q: "Miten Sundsvallista tuli 'Kivikaupunki'?", a: "Vuoden 1888 suurpalo tuhosi kaupungin puukorttelit muutamassa tunnissa, ja jälleenrakennuksessa keskusta määrättiin rakennettavaksi kivestä – siitä syntyi lempinimi Stenstan." },
    { q: "Mitä tapahtui Ådalenissa vuonna 1931?", a: "Sotilaat avasivat tulen lakkoilevia sahatyöläisiä kohti Kramforsin seudulla, ja viisi ihmistä kuoli – tapaus järkytti koko maata ja muutti Ruotsin työmarkkinasuhteita pysyvästi." },
  ],
  Västmanland: [
    { q: "Mikä on Anundshög ja mitä sen ympärillä on?", a: "Se on Ruotsin suurin muinainen hautakumpu Västeråsin liepeillä, ja sitä ympäröi kymmenkunta pienempää kumpua sekä pitkä kivistä ladottu laivasettaus." },
    { q: "Mitä Engelsbergin rautaruukissa säilyi ennallaan?", a: "1600–1800-luvun rautaruukki koneineen ja työläisasuntoineen on niin hyvin säilynyt, että UNESCO nimesi sen maailmanperintökohteeksi vuonna 1993." },
  ],
  "Västra Götaland": [
    { q: "Miksi Göteborgin keskustassa on kanaaleja kuin Amsterdamissa?", a: "Kaupunki perustettiin 1621 hollantilaisten asiantuntijoiden avulla, ja he suunnittelivat kanavat ja katuverkon Amsterdamin mallin mukaan – Stora Hamnkanalen on yhä keskeinen näky." },
    { q: "Miten Liseberg-huvipuisto syntyi?", a: "Puisto avattiin 1923 osana Göteborgin 300-vuotisjuhlanäyttelyä, ja se oli tarkoitettu väliaikaiseksi – suosion ansiosta siitä tuli pysyvä ja nykyään Pohjoismaiden suosituin huvipuisto." },
  ],
  Orebro: [
    { q: "Mitä Örebrossa päätettiin vuonna 1810?", a: "Valtiopäivät valitsivat Örebrossa ranskalaisen marsalkka Bernadotten Ruotsin kruununperijäksi – hänestä tuli myöhemmin kuningas Kaarle XIV Juhana, nykyisen kuningashuoneen kantaisä." },
    { q: "Mikä on Örebron linnan erityispiirre?", a: "Keskiaikainen linna kohoaa saarella keskellä Svartån-jokea kaupungin sydämessä, ja sen muurien sisällä on pidetty useita historiallisia valtiopäiviä." },
  ],
  Östergötland: [
    { q: "Kuka perusti Vadstenan luostarin ja miksi?", a: "Pyhä Birgitta suunnitteli luostarin yksityiskohtia myöten, ja se vihittiin käyttöön 1384 – Birgitta itse julistettiin pyhäksi vuonna 1391." },
    { q: "Miten Göta-kanava rakennettiin Motalan kautta?", a: "Kanavatyöt alkoivat Motalassa ja Forsvikissa 1810, ja 22 vuoden urakan jälkeen 1832 valmistunut kanava yhdisti Itämeren ja Pohjanmeren sisävesireittiä pitkin." },
  ],
```

---

## Lähdehuomioita (ei koodiin, vain tarkistuksen tueksi)

- Brömsebron rauha 13.8.1645, Sverige sai Gotlannin, Hallannin, Jämtlannin,
  Härjedalenin ja Öselin Tanskalta (sv.wikipedia: Freden i Brömsebro).
- Falu koppargruvan Stora Stöten -romahdus juhannuspäivänä 1687 (falugruva.se,
  sv.wikipedia: Stora stöten).
- Hälsingegårdar UNESCO-maailmanperintö 2012, seitsemän talon nimeäminen
  (unesco.se, regiongavleborg.se).
- Tjolöholms slott rakennettu 1898–1904, arkkitehti Lars Israel Wahlman,
  Dickson-suku (sv.wikipedia: Tjolöholms slott).
- Frösöstenen ajoitettu n. 1050–1080, Jämtlannin ainoa riimukivi
  (visitostersund.se, sv.wikipedia: Frösöstenen).
- Kalmarunioni allekirjoitettu Kalmarin linnassa 17.6.1397 (sv.wikipedia:
  Kalmarunionen).
- Kirunan kaupungin siirto LKAB:n kaivostoiminnan takia, päätös keskustan
  siirrosta 2011 (kiruna.se, lkab.com).
- Gammelstads kyrkstad UNESCO-maailmanperintö 7.12.1996, 404 mökkiä
  (unesco.se, sv.wikipedia: Gammelstads kyrkstad).
- Öresundsbron avattu 1.7.2000 (oresundsbron.com).
- Kungagraven i Kivik, pronssikautinen n. 1700–1100 eaa. (sv.wikipedia:
  Kungagraven i Kivik).
- Vaasa-laiva upposi 10.8.1628, nostettu pintaan 24.4.1961
  (sv.wikipedia: Regalskeppet Vasa).
- Nobelbanketti Blå hallenissa Tukholman kaupungintalossa vuodesta 1930
  (sv.wikipedia: Nobelbanketten, Blå hallen).
- Sigurdsristningen (Sö 101) Ramsundsbergetillä, 1000-luku
  (sv.wikipedia: Sigurdsristningen).
- Uppsalan yliopisto perustettu 1477, Pohjoismaiden vanhin.
- Uumajan kaupunkipalo 25.6.1888, Björkarnas stad -nimitys
  (sv.wikipedia: Stadsbranden i Umeå, umea.se).
- Sara kulturhus Skellefteåssa avattu 8.9.2021, 20 kerrosta, 80 m
  (sv.wikipedia: Sara kulturhus).
- Sundsvallin suurpalo 25.6.1888, jälleenrakennus kivestä, Stenstan
  (en.wikipedia: 1888 Sundsvall fire).
- Ådalenin ampumavälikohtaus 14.5.1931, viisi kuollutta (en.wikipedia:
  Ådalen shootings).
- Anundshög, Ruotsin suurin gravhög, n. 500–1050 jaa. (sv.wikipedia/
  freedomtravel.se: Anundshög).
- Engelsbergs bruk UNESCO-maailmanperintö 1993 (unesco.se: Engelsbergs bruk).
- Göteborg perustettu 1621, hollantilaisvaikutteiset kanavat
  (goteborgsstadsmuseum.se, sv.wikipedia: Göteborgs historia).
- Liseberg avattu 8.5.1923 osana Göteborgin 300-vuotisnäyttelyä
  (en.wikipedia: Liseberg).
- Örebro möte / urtima riksdagen 1810, Bernadotte valittiin kruununperijäksi
  21.8.1810 (svenskhistoria.se, sv.wikipedia: Urtima riksdagen 1810).
- Vadstena kloster vihitty käyttöön 1384, Birgitta pyhitetty 1391
  (sv.wikipedia: Vadstena kloster).
- Göta kanal, kaivutyöt alkoivat Motalassa/Forsvikissa 1810, valmistui 1832
  (gotakanal.se: Tidslinje över Göta kanal-bygget).
