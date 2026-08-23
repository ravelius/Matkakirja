# Adelaide — faktakoostaja, uusi kaupunkilehti (Oseanian lauta)

Lauta-id `oceania`, kaupunki-id `adelaide`, maa AUS, en-Wikipedia
"Adelaide" ellei toisin mainita. Kaikki tiedot haettu en-Wikipediasta
**23.8.2026** (`action=raw`, `NODE_USE_ENV_PROXY=1`; #REDIRECT tarkistettu
jokaiselle haetulle otsikolle — "Colony of South Australia" ohjautuu
artikkeliin "British colonisation of South Australia" ja "Barossa Valley"
sekä useat muut haut osuivat Wikipedian 429-rajoitukseen kerran tai
kahdesti, jolloin odotin kasvavan viiveen ja yritin uudelleen, kuten
resepti ohjeistaa). Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA) ja
`docs/moduulit/kaupunkilehti.md`, sekä esimerkkinä
`docs/mantereet-tyoaineisto/faktapohja-melbourne.md` (rakenne ja
tarkkuustaso — sama lauta, sama putki). Luin myös
`docs/mantereet-tyoaineisto/spec-mantereet.md` (tehtävänannon
lukulistalla tällä kertaa, Oseania-osio ja viisi kaikkia kolmea uutta
mannerta koskevaa linjausta). Kulttuurivisa tarkistettu tiedostosta
`js/packs/oceania-questions.js` (vienti `OCEANIA_QUESTIONS`, kohta
`adelaide`, viisi kysymystä: osavaltion pääkaupunki, viinituote,
rannikko, puistovyöhykkeen ainutlaatuisuus, Barossan laakso) ja
saapumiskortin faktarivit (samassa tiedostossa toinen vienti
`OCEANIA_FACTS`, kohta `adelaide`, kolme väitettä + isoisän repliikki)
— ks. osio 8 siitä, miten päällekkäisyyksiä on vältetty.

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä, en ladannut
kuvia enkä koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja riippumattomalle tarkistajalle.

**Sisältölinjaus (spec-mantereet.md, Oseania + Raamattu pilari 3):**
kaurnat kuvataan nykyisenä kansana omalla nimellään (Tarntanya/
Tarndanyangga mainitaan), ja siirtomaahistoria (maan menetys, väestön
romahdus, kielen katoaminen ja sen 1970-luvulta alkanut elpyminen)
todetaan tapahtumina neutraalisti ilman kummankaan osapuolen
sankarikehystämistä. Sama koskee Barossan laakson perämangkeja, joita
ei mainita en-Wikipedian Adelaide-artikkelissa lainkaan mutta jotka
nousevat esiin Barossa Valley- ja Hahndorf-artikkeleista — ks. osio 8,
huomio 3. Eversti William Lightin 1837 kaavoitus, puistovyöhyke,
saksalaissiirtolaisuus ja viininviljelyn alku osuvat suoraan isoisän
matkan vuoden tienoille (CLAUDE.md:n oma huomio), ja Adelaide Ovalin
avajaispäivä osuu TÄSMÄLLEEN isoisän matkan vuoteen — ks. osio 8,
huomio 1. Ei nykysotaa, ei nykypolitiikkaa.

---

## 1. Sivuehdotukset

Tehtävänanto salli 1–3 teemasivua. Käytin kaikki kolme, koska
aineisto kantoi kolme selvästi erillistä, päällekkäisyydetöntä teemaa
(historia, luonto/puistovyöhyke, saksalaisperintö) — ks. myös osio 8,
huomio 2.

### Sivu A — id `kaupunki`, nimi "Adelaide"

**Johdanto (227 merkkiä):**

> Eversti William Lightin 1837 piirtämä ruutukaava ja sitä ympäröivä
> puistovyöhyke tekivät Adelaidesta ainoan Australian pääkaupungin
> ilman vankisiirtolahistoriaa. Isoisän matkan vuonna kaupungin uusi
> krikettikenttä avasi ovensa.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Adelaiden 1836–1890-luvun aineisto on
poikkeuksellisen tarkasti päivätty — ja yksi yksittäinen löytö,
Adelaide Ovalin avajaispäivä 13. joulukuuta 1873, osuu isoisän matkan
vuoteen päivälleen tarkemmin kuin missään aiemmin tekemässäni
Oseania-faktapohjassa. Sivu antaa myös tilan sille, miksi Adelaidella
ei ole vankisiirtolataustaa ja miten kaupunki selvisi 1890-luvun
lamasta.

**Johdanto (224 merkkiä):**

> Adelaiden 1800-luku on vapaiden siirtolaisten ja yllättävän sitkeän
> talouden tarina. Isoisän matkan vuonna kaupungin krikettikenttä
> avautui, ja parikymmentä vuotta myöhemmin lama koetteli mannerta –
> paitsi viiniä ja kuparia.

### Sivu C — teemasivu, ehdotettu id `luonto`, nimi "Luonto"

**Perustelu valinnalle:** Vakioaihe `luonto` nousee vahvaksi, koska
Lightin puistovyöhyke, River Torrens ja Kasvitieteellinen puutarha
kietoutuvat samaan tarinaan kaurnojen pyhistä paikoista — sivu tuo
kunnioitus-pilarin mukaan luontevasti ilman päällekkäisyyttä
historia-sivun kanssa.

**Johdanto (196 merkkiä):**

> Eversti Lightin puistovyöhyke ja kaurnojen pyhät paikat kietoutuvat
> samaan maisemaan Torrens-joen ympärillä. Vihreä rengas keskustan
> ympärillä on pysynyt lähes koskemattomana isoisän ajoista asti.

### Sivu D — teemasivu, ehdotettu id `saksalaisperinne`, nimi "Saksalaisperintö" (EI vakioaihe — ks. huomio alla)

**Perustelu valinnalle:** CLAUDE.md nimeää saksalaissiirtolaisuuden ja
viininviljelyn alun omaksi kokonaisuudekseen, ja aineisto (Hahndorf,
Barossan laakso) on niin rikasta ja itsenäistä, ettei se mahdu
historia-sivulle tunkematta. Sivu tuo myös perämangkien maininnan
kaurnojen rinnalle (pilari 3, ei vain yksi alkuperäiskansa koko
laudalla).

**HUOM ikonista:** `saksalaisperinne` ei ole yksi ui.js:n
AIHE_IKONIT-vakioaiheista (historia, kuvataide, kirjallisuus,
musiikki, ruoka, luonto, tiede, nykytaide, huumori). Kirjoittaja voi
joko piirtää oman viivakuvakkeen (`kategoria.ikoni`, kts.
kaupunkilehti.md) tai — jos yksinkertaisempi ratkaisu halutaan —
nimetä sivun id:llä `ruoka` (viini/ruokakulttuuri on lähellä) ja antaa
sille oma nimi "Viini ja siirtolaisuus"; tällöin se perii valmiin
ruoka-ikonin. Suosittelen silti omaa ikonia, koska sisältö on yhtä
paljon historiaa ja identiteettiä kuin ruokaa.

**Johdanto (217 merkkiä):**

> Adelaiden ympäristöön asettui 1830–40-luvuilla saksalaisia
> luterilaisia, jotka toivat mukanaan viinin ja oman murteensa.
> Barossan laakso ja Hahndorf kantavat yhä tätä perintöä – osin
> perämangkien perinteisillä mailla.

---

## 2. Kuusitoista nostoehdotusta (4 × 4 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Kaupunki joka ei koskaan ollut vankisiirtola" (655 merkkiä)**

> Etelä-Australian siirtokunta syntyi teoreetikko Edward Gibbon
> Wakefieldin ideoista: maata myytäisiin riittävän kalliilla, jotta
> työväki joutuisi ensin ansaitsemaan palkkaa ennen omaa tilaa, ja
> tuotto rahoittaisi lisää siirtolaisia. Robert Gougerin anomuksesta
> syntyi South Australia Act 1834, ja ensimmäiset brittiläiset
> siirtolaiset saapuivat helmikuussa 1836. Siirtokunnan hallinto alkoi
> virallisesti 28. joulukuuta 1836 kuvernöörin julistuksella – päivä
> tunnetaan yhä Etelä-Australian julistuspäivänä. Kaupunki nimettiin
> kuningatar Adelaiden mukaan, ja toisin kuin Sydney, Brisbane tai
> Hobart, Adelaidella ei ole koskaan ollut vankisiirtolan historiaa.

Faktat ja lähteet:
- Siirtokunta perustettiin Edward Gibbon Wakefieldin systemaattisen
  siirtomaateorian pohjalta (maan myynti korkealla hinnalla rahoittaa
  lisäsiirtolaisuutta); Robert Gouger petitioi Britannian hallitusta,
  ja South Australia Act 1834 sääti siirtokunnan perustamisesta. —
  en-Wikipedia "Adelaide"
- Ensimmäiset brittiläiset siirtolaiset saapuivat helmikuussa 1836;
  siirtomaan hallinto alkoi virallisesti 28.12.1836, ja päivä on siitä
  lähtien Etelä-Australian julistuspäivä (Proclamation Day). —
  en-Wikipedia "Adelaide"
- Kaupunki nimettiin kuningatar Adelaidesta (Adelaide of
  Saxe-Meiningen), kuningas William IV:n puolisosta; perustettiin
  suunniteltuna pääkaupunkina vapaasti asutetulle brittiläiselle
  siirtokunnalle. — en-Wikipedia "Adelaide"
- Wakefieldin politiikan seurauksena Adelaidella ei ole
  vankisiirtolahistoriaa toisin kuin Sydneyllä, Brisbanella ja
  Hobartilla. — en-Wikipedia "Adelaide"

**Nosto K2 — "Piirtäjä joka valitsi paikan vastoin kuvernöörin tahtoa" (603 merkkiä)**

> Kun eversti William Light valitsi paikan uudelle siirtokunnalle 1836,
> kuvernööri John Hindmarsh ja moni siirtolainen vastusti valintaa –
> satama oli kaukana eikä paikalla ollut makeaa vettä. Light piti
> päänsä, ja hänen 1837 suunnitelmansa – viisi aukiota, ruutukaava ja
> niitä ympäröivä kahdeksikon muotoinen puistovyöhyke – toteutui lähes
> sellaisenaan. Puistovyöhykkeeseen varattiin alun perin lähes 2 300
> eekkeriä, ja vasta vuosikymmenten mittaan valtio kaappasi siitä palan
> kerrallaan. Light kuoli köyhänä 1839, mutta hänen patsaansa
> Montefiore-kukkulalla, "Light's Vision", katsoo yhä suunnitelmaansa.

Faktat ja lähteet:
- Lightin valinta kaupungin sijainnista oli aluksi epäsuosittu
  kuvernööri Hindmarshin ja varhaisten siirtolaisten keskuudessa
  etäisyyden Port Adelaideen ja makean veden puutteen vuoksi. —
  en-Wikipedia "Adelaide"
- Lightin 1837 suunnitelma sisälsi viisi aukiota ja
  kahdeksikonmuotoisen puistovyöhykkeen (Adelaide Park Lands) kaupungin
  ympärillä; alkuperäinen laajuus lähes 2 300 eekkeriä. — en-Wikipedia
  "Adelaide Park Lands"
- Patsas "Light's Vision" on sijainnut Montefiore-kukkulalla vuodesta
  1938. — en-Wikipedia "Adelaide" / "Adelaide city centre"
- Koko puistovyöhyke ja kaupunkiasemakaava listattiin Australian
  kansalliseen perintöluetteloon (National Heritage List) heinäkuussa
  2007/marraskuussa 2008. — en-Wikipedia "Adelaide Park Lands"

**Nosto K3 — "Kauppakatu joka syntyi kahdesti" (519 merkkiä)**

> Rundle Street sai nimensä 23. toukokuuta 1837, kun kadunnimistö-
> toimikunta kunnioitti John Rundlea, Etelä-Australian yhtiön
> johtokunnan jäsentä Lontoossa. Kadun kulmassa syttyivät Adelaiden
> ensimmäiset sähkökatuvalot 1895, ja paikka tunnetaan yhä nimellä
> Beehive Corner. Vuonna 1976 kadun länsiosa suljettiin autoilta, ja
> siitä tuli Rundle Mall – 520 metrin kävelykatu, joka on nykyisin sekä
> Australian että eteläisen pallonpuoliskon vilkkain ostosalue: yli
> tuhat liikettä ja noin 54 miljoonaa kävijää vuodessa (2024).

Faktat ja lähteet:
- Rundle Street nimettiin 23.5.1837 Street Naming Committeen
  toimesta John Rundlen, South Australia Companyn johtokunnan jäsenen,
  mukaan. — en-Wikipedia "Rundle Mall"
- Ensimmäinen sähkökatuvalaistus asennettiin 1895 Rundle-, King
  William- ja Hindley-katujen risteykseen, "Beehive Corneriin". —
  en-Wikipedia "Rundle Mall"
- Rundle Mall avattiin kävelykatuna syyskuussa 1976; se on 520 m
  pitkä ja on kävijämäärältään Australian ja eteläisen pallonpuoliskon
  vilkkain ostosalue (yli 1 000 liikettä, n. 54 miljoonaa kävijää
  2024). — en-Wikipedia "Rundle Mall"
- Ylellisyysbrändejä (mm. Tiffany & Co, Gucci, Cartier) toimii
  mallilla ja sen liepeillä. — en-Wikipedia "Rundle Mall"

**Nosto K4 — "Kansa joka sai maansa takaisin ensimmäisenä Australian pääkaupungeista" (649 merkkiä)**

> Kaurnat ovat Adelaiden tasangon perinteinen kansa, ja kaupungin
> keskustan kaurnankielinen nimi Tarndanya/Tarntanya tarkoittaa
> punaisen kengurun kalliota. Maan menetys romahdutti väkiluvun
> muutamasta tuhannesta noin 700:aan jo vuoteen 1836 mennessä, ja
> viimeinen täysin kaurnankielinen puhuja Ivaritji kuoli 1929. Kieli ei
> silti kadonnut: 1970-luvulta alkaen kaurnavanhimmat ovat johtaneet
> elpymisliikettä, ja nykyisin Kaurna Aboriginal Community and Heritage
> Association edustaa kansaa. Maaliskuussa 2018 kaurnat tunnustettiin
> koko Adelaiden metropolialueen perinteisiksi omistajiksi –
> ensimmäisenä minkään Australian pääkaupungin alkuperäiskansana.

Faktat ja lähteet:
- Kaurnat ovat Adelaiden tasangon alkuperäiset asukkaat; kaupungin ja
  puistovyöhykkeen kaurnankielinen nimi on Tarndanya/Tarntanya,
  "punaisen kengurun kallio". — en-Wikipedia "Adelaide" / "Kaurna"
- Kaurnaväestö romahti noin 700:aan vuoteen 1836 mennessä
  (aiemmin mahdollisesti useita tuhansia); viimeinen täysin
  kaurnankielinen puhuja Ivaritji kuoli 1929. — en-Wikipedia "Kaurna"
- 1970-luvulta alkaen elpymisliikettä johtivat mm. Lewis O'Brien,
  Gladys Elphick ja Alitya Rigney; nykyiset edustuselimet Kaurna
  Aboriginal Community and Heritage Association (KACHA) ja Kaurna
  Yerta Aboriginal Corporation. — en-Wikipedia "Kaurna"
- Maaliskuussa 2018 kaurnat tunnustettiin virallisesti koko Greater
  Adelaiden alueen perinteisiksi omistajiksi ("Myponga to Lower
  Light"); ensimmäinen kertaa Australiassa, kun tällainen sopimus
  vahvistettiin osavaltion pääkaupungissa. — en-Wikipedia "Kaurna"

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Kenttä joka avattiin isoisän matkan vuonna" (522 merkkiä)**

> Etelä-Australian krikettiliitto perustettiin toukokuussa 1871, ja
> parlamentin erityislailla se sai vuokrata palan puistovyöhykettä
> River Torrensin ja North Adelaiden väliltä. Kenttä valmistui elokuussa
> 1872, mutta virallinen avaus koitti vasta lauantaina 13. joulukuuta
> 1873, täsmälleen samana vuonna kuin isoisän matka. Avausottelussa
> Etelä-Australiassa syntyneiden joukkue kohtasi merentakaa muuttaneiden
> joukkueen noin 500 katsojan edessä; edellisenä päivänä 2 000 lammasta
> oli laskettu laiduntamaan nurmikkoa lyhyeksi.

Faktat ja lähteet:
- South Australian Cricket Association (SACA) perustettiin
  31.5.1871; parlamentin lailla sallittiin puistovyöhykkeen palan
  vuokraaminen kentäksi 1872. — en-Wikipedia "Adelaide Oval"
- Kentän rakentaminen valmistui 31.8.1872; 12 eekkerin alue, jonka
  keskiosa tasoitettiin käsin ja kylvettiin koiruoholle (couch grass).
  — en-Wikipedia "Adelaide Oval"
- Adelaide Oval avattiin kriketille lauantaina 13.12.1873 ottelulla
  Colonials (Etelä-Australiassa syntyneet) vastaan British
  (merentakaa syntyneet), n. 500 katsojaa; edellisenä päivänä 2 000
  lammasta laidunsi nurmea lyhyeksi. — en-Wikipedia "Adelaide Oval"
- Ensimmäinen maaottelu (Test match) pelattiin 1884, jolloin katsomo-
  mäki ("the mound" / the Hill) rakennettiin ja Moreton Bay -viikunapuut
  istutettiin sen reunalle. — en-Wikipedia "Adelaide Oval"

**Nosto H2 — "Puu jonka juurella siirtokunta syntyi" (639 merkkiä)**

> Kuvernööri John Hindmarsh saapui joukkoineen Holdfast Bayhin
> joulukuussa 1836 ja luki siirtokunnan perustamisjulistuksen 28.
> joulukuuta punaisen kumipuun juurella – paikka tunnetaan kaurnaksi
> nimellä Patha Yukuna. Päivä on siitä lähtien ollut Etelä-Australian
> julistuspäivä, jota vietetään yhä vuosittain saman puun luona:
> nykyinen kuvernööri lukee Hindmarshin alkuperäisen puheen. Itse puu
> kuoli viimeistään 1907, ja sen lahonnut runko valettiin betoniin
> 1963, jotta se pysyisi pystyssä. Vuonna 2025 juhlallisuuksia edelsi
> ensimmäistä kertaa alkuperäisasukkaiden yönyli kestänyt leiri ja
> seremoniallinen tuli ennen virallista tilaisuutta.

Faktat ja lähteet:
- Kuvernööri John Hindmarsh julisti siirtokunnan hallinnon alkaneeksi
  28.12.1836 lähellä puuta, joka tunnetaan nimellä The Old Gum Tree
  (Proclamation Tree), nykyisessä Glenelg Northissa. — en-Wikipedia
  "The Old Gum Tree"
- Paikka tunnetaan kaurnankielisellä nimellä Patha Yukuna; päivä on
  yhä vuosittainen Proclamation Day -seremonia, jossa kuvernööri lukee
  Hindmarshin alkuperäisen puheen. — en-Wikipedia "The Old Gum Tree"
- Puu, todennäköisesti punakumipuu (Eucalyptus camaldulensis), oli
  kaurnoille merkittävä ennen siirtomaa-aikaa; puu kuoli viimeistään
  1907 ja sen runko valettiin betoniin 1963. — en-Wikipedia "The Old
  Gum Tree"
- Vuoden 2025 seremoniaa edelsi ensimmäistä kertaa alkuperäiskansan
  edustajien yönyli kestänyt leiri ja seremoniallinen tuli ennen
  virallista tilaisuutta. — en-Wikipedia "The Old Gum Tree"

**Nosto H3 — "Vankila jota ei piti koskaan tarvita" (512 merkkiä)**

> Vapaiden siirtolaisten kaupungille ei Lightin 1837 suunnitelmassa
> varattu tilaa vankilalle – uskottiin, ettei rikollisuutta juuri
> esiintyisi. Toisin kävi: keväällä 1838 kaupungissa tapahtui murtoja,
> murha ja kaksi murhayritystä, ja poliisilaitos perustettiin
> huhtikuussa 1838. Ensimmäinen šeriffi haavoittui ryöstössä, ja tekijä
> Michael Magee hirtettiin 2. toukokuuta 1838 Etelä-Australian
> ensimmäisenä teloituksena. Pysyvän Adelaiden vankilan rakentaminen
> aloitettiin 1841; se toimi vankilana vuoteen 1988 asti.

Faktat ja lähteet:
- Lightin 1837 suunnitelmassa ei varattu tilaa vankilalle, koska
  vapaiden siirtolaisten kaupungissa uskottiin olevan vähän
  rikollisuutta. — en-Wikipedia "Adelaide"
- Maaliskuussa 1838 tapahtui murto, murha ja kaksi murhayritystä;
  Etelä-Australian poliisilaitos perustettiin huhtikuussa 1838 21-
  vuotiaan Henry Inmanin johdolla. — en-Wikipedia "Adelaide"
- Ensimmäinen šeriffi Samuel Smart haavoittui ryöstössä, ja tekijä
  Michael Magee hirtettiin 2.5.1838 – Etelä-Australian ensimmäinen
  teloitus. — en-Wikipedia "Adelaide"
- Adelaiden vankilan rakentaminen alkoi 1841; vankila toimi 1841–1988
  ja on yksi kahdesta Etelä-Australian vanhimmasta yhä pystyssä
  olevasta rakennuksesta (toinen on Government House samalta ajalta).
  — en-Wikipedia "Adelaide" / "Adelaide Gaol"

**Nosto H4 — "Lama jonka viini ja kupari selättivät" (623 merkkiä)**

> 1890-luvun alun talouslama pyyhkäisi koko Australian yli: pankit
> sulkivat oviaan Sydneyssä ja rahalaitokset Melbournessa, ja Etelä-
> Australian vientitulot lähes puolittuivat. Vuodesta 1884 jatkuneet
> kuivat kaudet pahensivat tilannetta entisestään, ja osa perheistä
> muutti Länsi-Australiaan onneaan etsimään. Adelaide selvisi silti
> Sydneytä ja Melbournea vähemmällä, osittain koska Broken Hillin
> hopea- ja lyijylöydöt toivat rahaa siirtokuntaan. Vain yksi vuosi
> päättyi alijäämäiseksi, joskin hintana oli tiukka julkinen
> säästäminen – ja koko lamavuosikymmenen ajan vain kaksi elinkeinoa
> selvisi laskematta: viini ja kupari.

Faktat ja lähteet:
- 1890-luvun lama sulki pankkeja Sydneyssä ja rahalaitoksia
  Melbournessa; Etelä-Australian vientitulojen arvo lähes puolittui. —
  en-Wikipedia "Adelaide"
- Kuivat kaudet vuodesta 1884 pahensivat tilannetta; osa perheistä
  muutti Länsi-Australiaan. — en-Wikipedia "Adelaide"
- Adelaide kärsi vähemmän kuin kultaryntäyskaupungit Sydney ja
  Melbourne; Broken Hillin hopea- ja lyijylöydöt toivat helpotusta. —
  en-Wikipedia "Adelaide"
- Vain yksi vuosi kirjattiin alijäämäiseksi, mutta hintana oli tiukka
  julkinen säästäminen; viini ja kupari olivat ainoat elinkeinot,
  jotka eivät kärsineet taantumasta. — en-Wikipedia "Adelaide"

### Teemasivu `luonto` — 4 nostoa

**Nosto L1 — "Puistorengas josta valtio nakerteli itselleen palan kerrallaan" (546 merkkiä)**

> Lightin puistovyöhyke on kahdeksikon muotoinen viheralue, joka
> kiertää Torrens-joen molemmin puolin Hackneysta Thebartoniin ja
> erottaa keskustan esikaupungeista. Jo pian 1837 perustamisen jälkeen
> valtio kaappasi 370 eekkeriä "hallituksen varauksiksi", ja vuoteen
> 1902 mennessä menetyksiä oli kertynyt 489 eekkeriä – vankilan,
> hautausmaan ja rautatiealueen tieltä. Silti suurin osa säilyi: 2008
> koko puistovyöhyke listattiin Australian kansalliseen
> perintöluetteloon. Nykyisin noin neljäsosa alueesta on rakennuksia,
> loput puistoja ja pelikenttiä.

Faktat ja lähteet:
- Puistovyöhyke on kahdeksikon muotoinen, kiertää River Torrensin
  molemmin puolin Hackneystä Thebartoniin ja erottaa kaupungin
  keskustan (ml. North Adelaide) esikaupungeista. — en-Wikipedia
  "Adelaide Park Lands"
- Pian 1837 perustamisen jälkeen 370 eekkeriä menetettiin "hallituksen
  varauksiksi"; vuoteen 1902 mennessä menetyksiä oli 489 eekkeriä
  (mm. vankila, hautausmaa, rautatiealue, vesihuolto). — en-Wikipedia
  "Adelaide Park Lands"
- Heinäkuussa 2007/marraskuussa 2008 alue listattiin Australian
  National Heritage Listille "merkittävänä esimerkkinä varhaisesta
  siirtomaa-ajan kaavoituksesta ... yli 170 vuoden ajan". —
  en-Wikipedia "Adelaide Park Lands"
- 2010-luvulla n. 25 % alueesta on hallinnon, julkisia ja kulttuuri-
  rakennuksia; jäljelle jäävästä n. 700 hehtaarista osa on
  puutarhoiksi muotoiltu, osa alkuperäistä tai ennallistettua
  Adelaiden tasangon ruohoaroa. — en-Wikipedia "Adelaide Park Lands"

**Nosto L2 — "Joki jolle annettiin kahdesti nimi" (538 merkkiä)**

> Ensimmäinen eurooppalainen tutkimusretki nimesi joen marraskuussa
> 1836 kaurnankielisellä nimellä Yatala, mutta eversti Light nimesi sen
> pian uudelleen Robert Torrensin, siirtomaakomission puheenjohtajan,
> mukaan. Vuoteen 1878 mennessä joesta oli tullut jäteveden pilaama
> haiseva oja – kirjailija Anthony Trollope kutsui sitä rumimmaksi
> joeksi, jonka oli koskaan nähnyt. Pysyvä betonipato valmistui vasta
> 1881, ja padotusta altaasta tuli Torrens Lake. Kun allas avattiin
> yleisölle 21. heinäkuuta 1881, paikalla oli arviolta 40 000 katsojaa.

Faktat ja lähteet:
- Tutkimusretkikunta (Field, Morphett, Kingston) nimesi joen
  marraskuussa 1836 nimellä "The Yatala"; eversti Light nimesi sen
  myöhemmin uudelleen Robert Torrensin, Etelä-Australian
  siirtomaakomission puheenjohtajan, mukaan. — en-Wikipedia
  "River Torrens"
- Vuoteen 1878 mennessä joki oli "malodorous, black sewer"; Anthony
  Trollope kuvaili sitä ennen 1880 rumimmaksi näkemäkseen joeksi. —
  en-Wikipedia "River Torrens"
- 1867 vankilatyövoima rakensi puisen padon, jonka joki huuhtoi pois;
  pysyvä betonipato rakennettiin marraskuusta 1880 alkaen ja valmistui
  1881, hintaan 7 000 puntaa. — en-Wikipedia "River Torrens"
- Torrens Lake avattiin yleisölle 21.7.1881; paikalla arviolta 40 000
  katsojaa, lähes koko silloinen Adelaiden väestö. — en-Wikipedia
  "River Torrens"

**Nosto L3 — "Puutarha joka rakennettiin kaurnojen pyhälle kalliolle" (623 merkkiä)**

> Kun Adelaiden kasvitieteellisen puutarhan paikka vahvistettiin 1855,
> maa oli kaurnoille pyhää – osa punaisen kengurun unelma-aluetta,
> Tarndanyangga – vaikka sitä käytettiin tuolloin poliisin
> hevoslaitumena. Puutarha avattiin yleisölle 4. lokakuuta 1857, ja sen
> viktoriaaninen Palmuhuone valmistui 1877. Ensimmäisen johtajan George
> William Francisin kuoltua 1865 puutarhan johtoon nousi
> saksalaissyntyinen kasvitieteilijä Moritz Richard Schomburgk, tunnetun
> luonnontutkija Robert Hermann Schomburgkin veli – hän ajoi
> voimakkaasti metsänsuojelualueiden perustamista yhä metsättömämmäksi
> käyvälle Etelä-Australian maaseudulle.

Faktat ja lähteet:
- Puutarhan nykyinen paikka hyväksyttiin tammikuussa 1855; maa oli
  pyhää kaurnoille (red kangaroo dreaming, Tarndanyangga), mutta sitä
  käytettiin tuolloin poliisihevosten laitumena. — en-Wikipedia
  "Adelaide Botanic Garden"
- Puutarha avattiin yleisölle 4.10.1857. — en-Wikipedia "Adelaide
  Botanic Garden"
- Palmuhuone (Palm House) on vuodelta 1877, viktoriaanista
  arkkitehtuuria. — en-Wikipedia "Adelaide Botanic Garden" (infobox)
- Ensimmäisen johtajan George William Francisin kuoltua 1865 seuraaja
  oli saksalaissyntyinen Moritz Richard Schomburgk, luonnontutkija
  Robert Hermann Schomburgkin veli; hän ajoi metsänsuojelualueiden
  perustamista. — en-Wikipedia "Adelaide Botanic Garden"

**Nosto L4 — "Aukio jolla liehui ensimmäisenä koko maan alkuperäiskansan lippu" (645 merkkiä)**

> Victoria Square sai nimensä 23. toukokuuta 1837 silloisen prinsessa
> Victorian kunniaksi, mutta vuodesta 2002 aukio on virallisesti myös
> Tarndanyangga/Tarntanyangga – kaurnaksi "punaisen kengurun kallio",
> kansan vanha kokoontumispaikka kaupungin ytimessä. Aukiolla liehui
> koko maan ensimmäinen alkuperäiskansan lippu heinäkuussa 1971
> maaoikeusmielenosoituksessa, ja Adelaiden kaupunginvaltuusto vahvisti
> lipun pysyväksi 2002 – se liehuu yhä Australian lipun rinnalla. Sama
> nimeämistyö ulotettiin koko puistovyöhykkeeseen: kaikki 29 numeroitua
> puistoa saivat kaurnankieliset rinnakkaisnimensä, ja uudistus
> vahvistettiin kaupunginvaltuustossa 2012.

Faktat ja lähteet:
- Victoria Square nimettiin 23.5.1837 prinsessa Victorian mukaan;
  virallinen rinnakkaisnimi Victoria Square/Tarndanyangga otettiin
  käyttöön 2002 ja tarkentui muotoon Tarntanyangga 2013 mennessä. —
  en-Wikipedia "Victoria Square, Adelaide"
- Australian aboriginaalilippu liehui ensimmäistä kertaa maassa
  Victoria Squarella heinäkuussa 1971 maaoikeusmielenosoituksessa;
  Adelaiden kaupunginvaltuusto vahvisti lipun pysyvän liehunnan
  8.7.2002. — en-Wikipedia "Victoria Square, Adelaide" (**EPÄVARMA**:
  artikkelin kaksi eri kohtaa antavat päiväykseksi sekä 9.7.1971 että
  12.7.1971 — ks. osio 8, huomio 4)
- Kaikki 29 numeroitua puistoa saivat kaurnankieliset rinnakkaisnimet
  osana Adelaiden kaupunginvaltuuston 1997 alkanutta
  sovintoprojektia; nimeämistyö vahvistettiin 2012. — en-Wikipedia
  "Adelaide Park Lands"

### Teemasivu `saksalaisperinne` — 4 nostoa

**Nosto G1 — "Kylä joka on Australian vanhin yhä seisova saksalaissiirtokunta" (534 merkkiä)**

> Suuri osa vuonna 1838 laivalla Zebra saapuneista siirtolaisista oli
> luterilaisia "vanhauskoisia" pieneltä Kay-nimiseltä kylältä
> Preussista, nykyisin Puolan puolella. He asettuivat perämangkien
> perinteiselle maalle, paikkaan jonka he tunsivat vesikuoppien mukaan
> nimellä Bukartilla, ja kylä sai virallisesti nimensä 1839 laivan
> kapteenin Dirk Meinerts Hahnin mukaan. Hahndorf on Australian vanhin
> yhä pystyssä oleva saksalaissiirtokunta, ja osa alkuperäisistä
> hirsitalojen puurunkoisista (Fachwerk) rakennuksista seisoo yhä
> pääkadulla.

Faktat ja lähteet:
- Hahndorfin ensimmäiset siirtolaiset olivat pääosin luterilaisia
  "vanhauskoisia" (Old Lutherans) kylästä nimeltä Kay Preussissa
  (nyk. Kije, Puola); suurin osa saapui laivalla Zebra 28.12.1838. —
  en-Wikipedia "Hahndorf, South Australia"
- Kylä sijaitsee perämangkien perinteisellä maalla, paikannimeltään
  Bukartilla ("viittaus paikallisiin vesikuoppiin"); kylä nimettiin
  laivan kapteenin Dirk Meinerts Hahnin mukaan, perustamisvuosi 1839.
  — en-Wikipedia "Hahndorf, South Australia"
- Hahndorf on Australian vanhin yhä pystyssä oleva saksalaissiirto-
  kunta. — en-Wikipedia "Hahndorf, South Australia"
- Saksalainen vaikutus näkyy yhä alkuperäisten rakennusten
  puurunkoisessa (Fachwerk) arkkitehtuurissa. — en-Wikipedia
  "Hahndorf, South Australia"

**Nosto G2 — "Nimi joka katosi sodan ajaksi" (474 merkkiä)**

> Ensimmäisen maailmansodan myötä saksalaisvastaisuus levisi Etelä-
> Australiaan, ja hallitus muutti 1917 kymmenien paikkojen saksalaiset
> nimet. Hahndorfista tuli Ambleside, läheisen rautatieaseman mukaan –
> ja nimi pysyi virallisena lähes kaksi vuosikymmentä. Alkuperäinen
> nimi palautettiin vasta Etelä-Australian nimistölailla, joka astui
> voimaan 12. joulukuuta 1935. Ambleside-nimi ei kuitenkaan kadonnut
> kokonaan: sen jälkiä näkyy yhä kylän kylteissä ja rakennusten
> nimissä.

Faktat ja lähteet:
- Ensimmäisen maailmansodan seurauksena Etelä-Australian hallitus
  muutti 1917 useita saksalaisperäisiä paikannimiä; Hahndorfista tuli
  Ambleside läheisen Ambleside-rautatieaseman mukaan. — en-Wikipedia
  "Hahndorf, South Australia"
- Alkuperäinen nimi Hahndorf palautettiin South Australia
  Nomenclature Act 1935:llä, joka astui voimaan 12.12.1935. —
  en-Wikipedia "Hahndorf, South Australia"
- Viittauksia nimeen Ambleside näkyy yhä kylässä ja sen ympäristössä.
  — en-Wikipedia "Hahndorf, South Australia"

**Nosto G3 — "Laakso jonka nimi syntyi kirjoitusvirheestä" (614 merkkiä)**

> Barossan laakso sai nimensä kirjoitusvirheestä: eversti Light nimesi
> vuonna 1837 alueen kukkulat Barrosan taistelun mukaan, jossa hän oli
> itse taistellut Espanjassa 1811, mutta nimi kirjattiin virheellisesti
> muotoon "Barossa" ja jäi sellaisena elämään. 1840-luvulla alueelle
> asettui saksalaisia luterilaisia, suurin osa Preussin Sleesiasta, ja
> he kutsuivat uutta kotiseutuaan nimellä Neu-Schlesien, Uusi-Sleesia.
> Laakson ensimmäinen siirtokunta Bethany perustettiin samoihin
> aikoihin, ja sen viinitarha istutettiin 1852 – yksi Australian
> vanhimmista yhä satoa antavista viinitiloista juontaa juurensa tähän
> alkuun.

Faktat ja lähteet:
- Eversti Light nimesi Barossa Rangen 1837 Barrosan taistelun
  (1811, Espanja, jossa Light itse taisteli) mukaan; nimi rekisteröitiin
  virheellisesti muotoon "Barossa" kirjoitusvirheen vuoksi. —
  en-Wikipedia "Barossa Valley"
- Ensimmäiset saksalaiset siirtolaiset saapuivat alueelle 1840-luvulla;
  monet olivat Preussin Sleesiasta ja kutsuivat aluetta nimellä
  "Neu-Schlesien" (Uusi-Sleesia). — en-Wikipedia "Barossa Valley"
- Bethany oli Barossan alueen ensimmäinen siirtokunta; Bethanyn
  viinitarha istutettiin 1852. — en-Wikipedia "Barossa Valley"
  (kuvateksti)

**Nosto G4 — "Kansa jonka jäljet näkyvät maisemassa yhä" (619 merkkiä)**

> Perämangkit ovat Barossan laakson perinteinen kansa, joka jakautuu
> useisiin sukuryhmiin; heidän tuhansien vuosien läsnäolostaan
> kertovat yhä esineet, kaiverretut puut ja suojapaikkojen
> kalliomaalaukset ympäri laaksoa. Saksalainen perintö elää rinnalla
> nykypäivänäkin: paikallinen Barossan saksa -murre on säilynyt
> osittain puhekielenä, ja vanhaluterilaiset seurakunnat toimivat yhä.
> Vuonna 2012 Etelä-Australian parlamentti sääti erillislain, joka
> suojaa Barossaa ja McLaren Valea kaupungistumiselta – silloinen
> pääministeri Mike Rann perusteli lakia sillä, ettei laaksoista saa
> koskaan tulla "Adelaiden esikaupunkeja".

Faktat ja lähteet:
- Perämangkit ovat Barossan laakson perinteiset omistajat, jakautuvat
  useisiin sukuryhmiin; heidän läsnäolostaan on todisteita esineinä,
  kaiverrettuina puina (scar trees) ja suojapaikkamaalauksina. —
  en-Wikipedia "Barossa Valley"
- Saksalainen vaikutus näkyy yhä Barossan saksa -murteessa (Barossa
  German) ja alueen vanhaluterilaisissa seurakunnissa. — en-Wikipedia
  "Barossa Valley"
- Helmikuussa 2011 pääministeri Mike Rann ilmoitti erityislaista
  Barossan ja McLaren Valen suojelemiseksi kaupungistumiselta ("emme
  saa koskaan antaa Barossan tai McLaren Valen muuttua Adelaiden
  esikaupungeiksi"); Character Preservation (Barossa Valley) Act 2012
  säädettiin. — en-Wikipedia "Barossa Valley"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja tai
kulttuurivisan vastauksia.

**Jakso 1 — "Perille ja liikkeelle"**

Adelaide on Etelä-Australian hallinnollinen ja kaupallinen keskus, ja
elämä keskittyy North Terracen ja King William Streetin risteysalueen
ympärille — samoille kaduille, jotka Light nimesi 1837. Kaupunki on
Australian viidenneksi väkirikkain (n. 1,47 miljoonaa asukasta
suuralueella, 2024), mutta keskusta on yhä kävelymatkan mittainen
laidasta laitaan, koska ruutukaava on säilynyt lähes muuttumattomana.

Faktat ja lähteet:
- Adelaide on Etelä-Australian hallinnon ja kaupan keskus, painottuen
  North Terracen ja King William Streetin bulevardeille. —
  en-Wikipedia "Adelaide"
- Suuralueen väkiluku 1 469 163 (2024), Australian viidenneksi
  väkirikkain kaupunki. — en-Wikipedia "Adelaide" (infobox)

**Jakso 2 — Alueen rakenne**

Kaupunki venyy kapeana nauhana Etelä-Australian lahden rannikolta
Mount Lofty Rangesin juurelle – vain 20 kilometriä rannikolta
kukkuloille, mutta lähes 100 kilometriä pohjois-eteläsuunnassa
Gawlerista Sellicks Beachille. Vuoristo ja meri puristavat kaupungin
kapealle tasangolle, ja alue on myös yksi Australian
seismisesti aktiivisimmista: vuoden 1954 maanjäristys (magnitudi 5,6)
on yhä suurin mitattu.

Faktat ja lähteet:
- Adelaide sijaitsee Adelaiden tasangolla Etelä-Australian lahden ja
  Mount Lofty Rangesin välissä; kaupunki ulottuu n. 20 km
  rannikolta kukkuloille ja n. 90–96 km Gawlerista Sellicks Beachille.
  — en-Wikipedia "Adelaide"
- Adelaide on yksi Australian seismisesti aktiivisimmista alueista;
  suurin mitattu maanjäristys 1.3.1954, magnitudi 5,6, keskus 12 km
  keskustasta Darlingtonissa. — en-Wikipedia "Adelaide"

**Jakso 3 — Arjen ilmiö: Rundle Mall**

Rundle Mall on tänään Australian ja koko eteläisen pallonpuoliskon
vilkkain ostosalue — pidempi kuvaus ja historia on kaupunkisivun
nostossa K3, joten tähän jaksoon riittää nykyhetken tunnelma: yli
800 000 kävijää viikossa, kauppa yli 1,4 miljardia dollaria vuonna
2024, ja katukuvassa sekoittuvat 1880-luvun kivitalot ja
maailmanmerkkien liikkeet.

Faktat ja lähteet:
- Rundle Mallissa vierailee yli 800 000 kävijää viikossa; vuoden 2024
  myynti ylitti 1,4 miljardia dollaria. — en-Wikipedia "Rundle Mall"
- **HUOM:** tämä jakso käyttää samaa lähdeartikkelia kuin nosto K3,
  mutta eri lukuja (viikkokävijämäärä, myynti) — ei toistoa.

**Jakso 4 — Historian käännekohta: kaupunki joka muutti mielensä**

1970-luvun Dunstanin hallitukset toivat Adelaideen kulttuurisen
murroksen: kaupunki tuli tunnetuksi edistyksellisyydestään, kun
Etelä-Australiasta tuli 1975 ensimmäinen Australian osavaltio tai
territorio, joka poisti homoseksuaalisuuden rikosoikeudellisen
rangaistavuuden aikuisten välillä. Samalla vuosikymmenellä
kaksivuosittainen Adelaide Festival of Arts (perustettu 1960) vakiintui
kaupungin taide-elämän ytimeksi.

Faktat ja lähteet:
- Etelä-Australiasta tuli 1975 ensimmäinen Australian osavaltio tai
  territorio, joka dekriminalisoi homoseksuaalisuuden suostumuksellisten
  aikuisten välillä; muutos liittyi 1970-luvun Dunstanin hallitusten
  "kulttuuriseen elpymiseen". — en-Wikipedia "Adelaide"
- Adelaide Festival of Arts käynnistyi 1960 kaksivuosittaisena
  tapahtumana. — en-Wikipedia "Adelaide"

**Jakso 5 — Milloin kannattaa tulla**

Adelaidella on kuuman kesän Välimeren ilmasto (Köppen: Csa) — kuumat,
kuivat kesät ja viileät, sateisemmat talvet; kesäkuu on vuoden
sateisin kuukausi. Lämpötilaennätykset ulottuvat -2,6 asteesta
(8.6.1982) 47,7 asteeseen (24.1.2019), ja kaupunki on tunnetusti
tuulinen, mikä tekee talvipäivistä tuntuvasti todellista viileämpiä.

Faktat ja lähteet:
- Köppen-luokka Csa (kuuman kesän Välimeren ilmasto): kuumat, kuivat
  kesät ja viileät talvet, joissa on suhteellisen luotettava sade;
  kesäkuu sateisin kuukausi (n. 80 mm). — en-Wikipedia "Adelaide"
  (Climate-osio)
- Lämpötilaääriarvot -2,6 °C (8.6.1982) – 47,7 °C (24.1.2019). —
  en-Wikipedia "Adelaide" (Climate-osio)
- Adelaide on tuulinen kaupunki, ja talven tuulen viilennysvaikutus
  tekee lämpötilasta tuntuvasti todellista kylmemmän. — en-Wikipedia
  "Adelaide" (Climate-osio)
- **HUOM:** samoin kuin muissa tämän sarjan kaupungeissa, yllä olevat
  luvut ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin
  pelin `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali.
  Tarkat kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 4. Kahdeksan kohdekartan kohdetta (+ vertailupiste)

Koordinaatit poimittu en-Wikipedian raakatekstin `{{Coord|...}}`-
malliparametreista. Etäisyydet ja suunnat OMIA LASKELMIANI
koordinaattieroista (asteet × 111 km, pituusasteille kerrottu
cos(34,928°) ≈ 0,820), tarkistettu Node-skriptillä — sama menetelmä
kuin faktapohja-melbourne.md:ssä.

**Vertailupiste on Victoria Square/Tarntanyangga, Lightin ruutukaavan
keskipiste** (spec-mantereet.md sääntö 4: kartan keskusta valitaan
historiallisen ytimen mukaan, ei hallinnollisen koordinaattipisteen).
Adelaiden tapauksessa ero Wikipedian omaan hallinnolliseen
kaupunkipisteeseen on käytännössä olematon — vain n. 70 metriä —
koska toisin kuin Melbournessa tai San Franciscossa, Adelaidea EI
ensin perustettu johonkin kohtaan ja kaavoitettu sitten sen ympärille:
Light suunnitteli ja rakensi kaupungin suoraan aukioidensa ympärille,
joten "historiallinen ydin" ja "hallinnollinen piste" osuvat tässä
kaupungissa lähes yhteen. Victoria Square on silti perusteltu valinta,
koska se on nimenomaisesti "aukio, jota pidetään Adelaiden ruutukaavan
sydämenä" (Adelaide Park Lands -artikkeli) ja kantaa myös kaurna-nimeä
Tarntanyangga (pilari 3).

| # | Nimi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta vertailupisteestä |
|---|---|---|---|---|
| 1 | Victoria Square / Tarntanyangga (vertailupiste) | 34,9281°S 138,5999°I | "Victoria Square, Adelaide" | (vertailupiste) |
| 2 | Adelaide (Wikipedian hallinnollinen piste, vertailuksi) | 34°55'39"S 138°36'00"I | "Adelaide" | ~0,07 km pohjoiseen |
| 3 | Adelaide Oval | 34°54'56"S 138°35'46"I | "Adelaide Oval" | ~1,43 km pohjoiseen |
| 4 | Adelaide Botanic Garden | 34°55'3"S 138°36'45"I | "Adelaide Botanic Garden" | ~1,64 km koilliseen |
| 5 | Rundle Mall (Rundle Lantern, itäpää) | 34,922903°S 138,601875°I | "Rundle Mall" | ~0,60 km pohjoiseen |
| 6 | Adelaide Central Market | 34°55'47"S 138°35'51"I | "Adelaide Central Market" | ~0,28 km lounaaseen |
| 7 | Tandanya National Aboriginal Cultural Institute | 34,9241°S 138,6105°I | "Tandanya National Aboriginal Cultural Institute" | ~1,06 km koilliseen |
| 8 | Adelaide Gaol | 34,9176°S 138,5849°I | "Adelaide Gaol" | ~1,79 km luoteeseen |
| 9 | Adelaide Zoo | 34°54'51"S 138°36'21"I | "Adelaide Zoo" | ~1,63 km pohjoiseen |

Kahdeksan varsinaista kohdetta (rivit 1, 3–9) täyttää pyydetyn 8–10
kohteen välin; rivi 2 on mukana vain Wikipedian oman hallinnollisen
pisteen ja vertailupisteen eron havainnollistamiseksi (ks. alla) eikä
ole oma erillinen kohteensa. Adelaide Zoo (rivi 9) ei kanna omaa
nostoa, mutta täydentää `luonto`-sivun L3-nostoa: eläintarha avattiin
23.5.1883 aivan Kasvitieteellisen puutarhan vieressä ja on Australian
toiseksi vanhin (Melbournen jälkeen); sen alueella kasvaa yhä
vuonna 1877 istutettu Moreton Bay -viikunapuu. — en-Wikipedia
"Adelaide Zoo"

**Kaksi kauempana olevaa kohdetta, koordinaatit talteen mutta EI
taulukossa** (liian kaukana ydinklusterista, mutta kytkeytyvät suoraan
historia- ja saksalaisperinne-nostoihin):

- **The Old Gum Tree / Patha Yukuna** (H2-nosto), 34°58'13,4"S
  138°31'14,2"I — n. 8,6 km lounaaseen vertailupisteestä
  (Glenelg North, siirtokunnan julistuspaikka 1836).
- **Hahndorf** (G1/G2-nosto), 35,030267°S 138,807646°I — n. 22 km
  kaakkoon. **Barossan laakso/Tanunda** (G3/G4-nosto), n. 34,5333°S
  138,95°I — n. 54 km koilliseen (Wikipedia-artikkeli antaa
  ajoetäisyydeksi Adelaiden keskustasta 60 km, mikä täsmää
  suoraviivaista etäisyyttä pidemmän tieyhteyden kanssa).

Näitä kolmea EI lasketa mukaan "8–10 kohteen" ydinklusteriin, koska ne
ovat kaupungin ulkopuolella eivätkä sovi samalle kohdekartalle
tiiviisti — kirjoittaja päättää, tarvitaanko niille oma laajempi
kartta vai jätetäänkö ne mainituksi vain leipätekstissä.

---

## 5. Kuva-aiheet (Commons-kategoriat)

Kategoriat tarkistettu OLEMASSA OLEVIKSI Commonsin
`action=query&titles=Category:...`-kutsulla ja `list=search`-haulla
23.8.2026 (pelkkä olemassaolotarkistus — SISÄLTÖÄ EI ole silmäilty,
se on kirjoittajan työ kuvasääntöjen mukaisesti). Commons-haku osui
429-rajoitukseen useaan kertaan; odotin ja yritin uudelleen resepti
mukaisesti. Kaurna- ja perämangk-kuvissa sama arki- ja ylpeyskuvasto
kuin muuallakin pelissä (spec-mantereet.md, Kuvalinjat) — ei
kurjuuskuvastoa, ei pelkkiä seremoniaklišeitä.

**Avauskuvat (3):**
1. `Category:Adelaide city centre` — laaja katunäkymä tai
   ilmakuva keskustasta.
2. `Category:Victoria Square, Adelaide` — Lightin ruutukaavan
   sydän, mahdollisesti aboriginaalilippu näkyvissä.
3. `Category:Barossa Valley` — viinitarhamaisema.

**Kansikuvat (3, LAAJOJA YLEISKUVIA — ei yksityiskohtia):**
1. `Category:Adelaide` — kaupungin siluetti tai River Torrensin
   näkymä keskustaan.
2. `Category:Adelaide Oval` — koko kentän ja katsomon yleiskuva.
3. `Category:Parklands of Adelaide CBD` — ilmakuva
   puistovyöhykkeestä keskustan ympärillä.

**Nosto-/jaksokuvat, sivuittain:**

*Kaupunki:*
- `Category:Adelaide` (K1, yleiskuva/varhaishistoria)
- `Category:Adelaide city centre` tai `Category:Parklands of Adelaide
  CBD` (K2, ruutukaava/puistovyöhyke)
- `Category:Rundle Mall, Adelaide` ja `Category:Beehive Corner` (K3)
- `Category:Kaurna` (K4 — nykykulttuuria, EI historiallista
  kurjuuskuvastoa; tarkista erikseen ettei kuvissa ole tunnistettavia
  kasvoja ilman lupaa)

*Historia:*
- `Category:Adelaide Oval` (H1)
- `Category:The Old Gum Tree` (H2)
- `Category:Adelaide Gaol` (H3)
- `Category:Adelaide` (H4 — 1890-luvun kaupunkikuva, jos löytyy;
  muuten `Category:Wineries in South Australia` viinin selviytymis-
  näkökulmasta)

*Luonto:*
- `Category:Parklands of Adelaide CBD` (L1)
- `Category:River Torrens` (L2)
- `Category:Adelaide Botanic Garden` (L3)
- `Category:Victoria Square, Adelaide` (L4)

*Saksalaisperinne:*
- `Category:Hahndorf, South Australia` (G1, G2)
- `Category:Barossa Valley`, `Category:Tanunda, South Australia` ja
  `Category:Bethany, South Australia` (G3)
- `Category:Wineries in South Australia` ja `Category:Vineyards in
  South Australia` (G3, G4)
- Perämangkien omaa Commons-kategoriaa EI löytynyt haulla
  ("Peramangk" ei osunut mihinkään kategoriaan) — kirjoittajan pitää
  hakea laajemmin (esim. `Category:Aboriginal Australian culture`)
  tai turvautua tekstiin ilman erillistä kuvaa (G4).

*Kohdekartta (täydentäviksi, ei nostoa varten):*
- `Category:Adelaide Central Market` — EI löytynyt suoraan, oikea
  nimi on `Category:Central Market, Adelaide`.
- `Category:Grenfell Street, Adelaide` (Tandanya-instituutin
  rakennus — huom. instituutti on ollut suljettuna korjausten vuoksi
  toukokuusta 2023, ilmoitettu avautuvan helmikuussa 2026: tarkista
  kirjoitusvaiheessa onko rakennus jo auki, ks. osio 8 huomio 6).
- `Category:Adelaide Zoo` (Botanic Gardenin naapurissa, Popeye-
  laivat Torrens Lakella).

---

## 6. Säätiedot

Ks. osio 3, Jakso 5 — samat luvut, sama lähde (en-Wikipedian
Climate-osio, EI ERA5).

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Vahvin löytämäni yksittäinen 1873-osuma on Adelaide Ovalin
   virallinen avaus TÄSMÄLLEEN 13. joulukuuta 1873** (H1) — jopa
   tarkempi kuin Melbournen William Guilfoyle -osuma (joka osui vain
   vuoteen 1873, ei päivälleen). Suosittelen pitämään tämän
   historia-sivun avausnostona.
2. **Kolme teemasivua käytetty, vaikka 1–2 olisi riittänyt.**
   Perustelu: CLAUDE.md nimeää nimenomaisesti neljä 1873-osumaa
   (Lightin kaavoitus, puistovyöhyke, saksalaissiirtolaisuus,
   viininviljelyn alku), ja ne jakautuvat luontevasti kahteen eri
   teemaan (historia+luonto vs. saksalaisperintö) niin, ettei
   kumpaakaan voi tiivistää toisen sivun alaosaksi menettämättä
   aineistoa. Jos kirjoittaja haluaa vain kaksi teemasivua,
   suosittelen yhdistämään `historia`- ja `luonto`-sivut (niissä on
   eniten päällekkäistä henkilöstöä, mm. Light) ja pitämään
   `saksalaisperinne`-sivun erillään, koska sen aineisto ja äänensävy
   eroavat selvimmin muusta.
3. **Perämangkit eivät esiinny lainkaan en-Wikipedian
   "Adelaide"-artikkelissa** — he nousevat esiin vasta Barossa
   Valley- ja Hahndorf-artikkeleista, koska heidän perinteinen
   maansa on Adelaiden tasangon itäpuolella Adelaide Hillsissä, eri
   alue kuin kaurnojen. Tämä on tärkeä ero pilari 3:n kannalta: laudan
   spec vaatii kunnioittavaa kohtelua KAIKILLE alkuperäiskansoille,
   ei vain sille, joka sattuu asumaan itse kaupungin ytimessä — siksi
   G4-nosto on olemassa erikseen eikä vain mainintana K4:n
   yhteydessä.
4. **Victoria Square -artikkelin sisäinen ristiriita:** aboriginaali-
   lipun ensimmäisen liehunnan päiväys annetaan kahdessa eri kohdassa
   samaa artikkelia sekä 9.7.1971 että 12.7.1971. En pystynyt
   ratkaisemaan ristiriitaa muista käyttämistäni lähteistä (en
   hakenut kolmatta lähdettä, koska tehtävänanto rajaa faktat
   en-Wikipediaan). L4-nostossa käytin vain kuukautta ("heinäkuussa
   1971") välttääkseni väärän päivän kirjaamisen; merkitsin kohdan
   **EPÄVARMA** ja kirjasin molemmat päiväykset lähdeviitteeseen
   resepti-ohjeen mukaisesti (ennakkotapaus: koordinaatit voittavat,
   mutta tässä kyse ei ole koordinaatista vaan kahdesta
   päivämäärästä samassa artikkelissa — jätin siksi molemmat näkyviin
   sen sijaan että olisin arvannut).
5. **Tandanya National Aboriginal Cultural Institute on ollut
   suljettuna korjausten vuoksi toukokuusta 2023 lähtien**, ja
   en-Wikipedian mukaan sen piti avautua uudelleen helmikuussa 2026 —
   pelin nykyaika on juuri nyt (23.8.2026), joten rakennus saattaa
   olla jo auki tai yhä kiinni riippuen siitä, piti aikataulu
   paikkansa. Merkitsin tämän **EPÄVARMA**ksi kartan kohteen 7
   yhteyteen ja osion 5 kuvavinkkeihin; kirjoittajan kannattaa
   tarkistaa ajantasainen tilanne ennen julkaisua, jos matkaopas-
   tekstissä mainitaan onko instituutti avoinna.
6. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
   tekstiksi** merkkimäärävaatimusten mukaan (johdannot 196–227 mrk,
   nostot 474–655 mrk) ja tarkistettu koneellisesti Node-skriptillä
   (ks. huomio 10).
7. **Kulttuurivisan (`oceania-questions.js`, kohta `adelaide`)
   vastauksia ei ole toistettu sanasta sanaan nostoissa:** kysymysten
   1 ja 4 ydinfakta (puistovyöhyke ympäröi ruutukaavaa) on
   välttämättä sama aihe kuin K2- ja L1-nostoissa — tämä on
   tarkoituksellista ja linjassa reseptin kanssa ("kulttuurivisan
   opettava nosto on kategorioissa näkyvillä") — mutta olen tuonut
   nostoihin yksityiskohtia, joita visan fact-kentässä ei ole (eekkeri-
   määrät, menetyshistoria, National Heritage -listaus, Light's
   Vision -patsas), enkä ole käyttänyt visan tarkkaa sanamuotoa.
   Kysymyksen 2 ja 5 viinifakta (Barossan laakso) käsitellään
   laajemmin G3-nostossa uusilla yksityiskohdilla (kirjoitusvirhe-
   nimi, Neu-Schlesien, Bethanyn 1852 viinitarha). Kysymyksen 3
   (rannikko) triviaalifaktaa ei ole erikseen nostoissa. Sama koskee
   saapumiskortin `OCEANIA_FACTS.adelaide`-riviä "Adelaide on ainoa
   Australian osavaltion pääkaupunki, jota ei perustettu
   rangaistussiirtolaksi" — K1-nosto käsittelee saman ydinasian
   (Wakefieldin teoria, ei vankisiirtolahistoriaa), mutta syventää sitä
   Gougerin anomuksella, South Australia Act 1834:llä ja tarkoilla
   päivämäärillä eikä toista saapumiskortin lauserakennetta.
8. **Vain en-Wikipediaa ja sen raakatekstiä (action=raw) käytetty
   kaikkiin faktoihin**, paitsi Commons-kategorioiden
   olemassaolotarkistukseen (osio 5), joka käytti Commonsin
   `action=query`- ja `list=search`-rajapintoja vain kategorianimien
   vahvistamiseen — EI kuvasisällön tarkistamiseen. Ei ulkopuolisia
   hakuja tämän faktapohjan sisältöön.
9. **`docs/mantereet-tyoaineisto/spec-mantereet.md` oli tällä kertaa
   tehtävänannon lukulistalla** (toisin kuin Melbourne-faktapohjassa,
   jossa sen luin omatoimisesti) — sama SITOVA asema koko Oseanian
   laudalle.
10. **Merkkimäärät tarkistettu Node-skriptillä** (laskee `>`-rivien
    yhteispituuden lainausmerkkien sisällä, välilyönnit mukaan
    lukien): kaikki johdannot 154–232 mrk -haarukassa ja kaikki nostot
    440–660 mrk -haarukassa reseptin mitoituksen mukaisesti.
