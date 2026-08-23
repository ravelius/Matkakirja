# Brasilian maalehti (ISO-3: BRA) — sisältösuunnitelma ja faktapohja

*Koonnut Sonnet-faktapohja-agentti 22.–23.8.2026. Kaikki en-Wikipedia-faktat
haettu näinä päivinä raakatekstihaulla
(`https://en.wikipedia.org/w/index.php?title=X&action=raw`,
`NODE_USE_ENV_PROXY=1`, uusintayrityksin kasvavalla viiveellä 429-vastausten
varalta — ei tarvittu tämän koosteen aikana). Rakenteen malli:
`docs/mantereet-tyoaineisto/faktapohja-usa.md`. SITOVAT lähteet:
`docs/mantereet-tyoaineisto/spec-mantereet.md` (E-Amerikan ja "kaikkia
kolmea lautaa koskevat" linjaukset), `docs/moduulit/maalehti.md` ja
`docs/aasia-tyoaineisto/lehtityo-resepti.md`. Raamatun linjaukset:
`js/tyohuone-raamattu.js`. Ei lopullisia lehtitekstejä, ei ladattuja kuvia,
ei kosketusta js/packs-tiedostoihin — tämä on suunnitelma seuraavaa
kirjoittajaa (Opus) varten. BRA kuuluu E-Amerikan pilottierään yhdessä
Rion, Buenos Airesin ja ARG:n kanssa (docs/roolitus.md).

Sisältölinjaus tarkistettu spec-mantereet.md:stä: alkuperäiskansat
kunnioittavasti ja nykypäivän toimijoina, ei "kadonneen kansan"
romantiikkaa; siirtomaa- ja orjuushistoria kerrotaan suoraan tapahtumina,
piikki kohdistuu isoisän aikakauden herroihin, ei kansaan; ei nykypolitiikkaa
eikä nykyrikollisuutta (favelat, huumeet ym. rajattu pois — niitä ei
käsitellä tässä koosteessa lainkaan). Paraguayn sodan (1864–1870)
uhriluvut ovat kiistanalaisia (150 000–500 000 kuollutta koko sodassa) ja
raa'an julmia yksityiskohtia sisältäviä; sota mainitaan tässä vain
taustatapahtumana orjuuden purkautumiselle, ei omana nostonaan, eikä
taistelukuvauksia oteta mukaan (Perustuslain väkivaltalinjaus:
neutraalina historiana ilman yksityiskohtien korostusta).

---

## 1. Sisältösuunnitelma: miksi juuri nämä viisi aihetta

Brasilia on Raamatun tarkoittama monikohdemaa (Rio de Janeiro, São Paulo,
Salvador, Manaus, Iguazu, Ouro Preto, Porto Alegre, Bananal, Boa Vista,
Macapá, Santarém, São Luís, João Pessoa, Portovelho, Campo Grande —
`js/packs/southamerica.js`), joten laajuus on maalehti.md:n täysi mitta:
**5 aihetta × 4 nostoa = 20 nostoa**, kullakin oma minitehtävä (5 kpl).

Ehdotetut aiheet ja miksi juuri ne:

1. **Historia** — Pedro II:n keisarikunta 1873:ssa ei ole vielä täyttänyt
   viittäkymmentä vuotta itsenäistymisestä (1822), Paraguayn sota on juuri
   päättynyt, ja orjuuden lakkauttamisen tie on kesken: Vapaan kohdun laki
   (1871) on tuore, Kultalaki (1888) vasta 15 vuoden päässä. 1873-kulma on
   spec-mantereet.md:n mukainen (Pedro II, kahvi ja kumi, orjuuden tie).
2. **Luonto** — Amazon on maailman biodiversiteetiltään rikkain sademetsä,
   ja BRA-kaupungeista Manaus, Santarém, Portovelho ja Bananal sijaitsevat
   suoraan Amazonilla; kumipuun (Hevea) ensimmäinen siirtoyritys
   ulkomaille tapahtui täsmälleen 1873. Alkuperäiskansat kerrotaan tässä
   nykypäivän toimijoina (spec-mantereet.md:n E-Amerikka-linjaus), ei
   omana erillisenä aiheenaan.
3. **Tiede** — Pedro II oli poikkeuksellisen omistautunut tieteen
   mesenaatti ja Brasilian ensimmäinen valokuvaaja; Harvardin Thayer-
   retkikunta tutki Amazonia 1865–66 keisarin tuella, ja yksi sen nuorista
   vapaaehtoisista oli myöhemmin kuuluisaksi tullut filosofi William
   James. Aihe on Brasilialle poikkeuksellisen vahva ja erottuu muista
   valmiista maalehdistä (ITA/IND/USA), joissa ei ole tiedeaihetta samalla
   painotuksella.
4. **Musiikki** — Rion choro-genre syntyi täsmälleen 1870, kolme vuotta
   ennen isoisän matkaa (Joaquim Callado, "Choro Carioca"); genre kantaa
   samalla mukanaan capoeiran ja modinhan kautta koko Brasilian musiikin
   afrikkalais-portugalilais-alkuperäiskansallisen juurikimpun, samaan
   tapaan kuin USA:n banjo-nosto.
5. **Ruoka** — kahvi, feijoada, maniokki ja churrasco näyttävät saman
   risteytymän kuin USA:n ruokaosio (alkuperäiskansat, Eurooppa,
   Länsi-Afrikka), ja jokainen niistä ulottuu suoraan 1800-luvulle asti.

**Pois jätetyt/vaihtoehtoiset aiheet ja miksi:** Kuvataide olisi ollut
vahva vaihtoehto (Victor Meirelles, Pedro II:n perustama Kuvataideakatemia,
"Primeira Missa no Brasil" 1861, Pariisin Salongin ensimmäinen
brasilialaishyväksyntä) — se korvattiin Tiede-aiheella, koska
tiedeaineisto on vieläkin ainutlaatuisempi eikä toistu muissa jo
tehdyissä maalehdissä; ks. avoin kysymys C. Rakennukset/arkkitehtuuri
(barokki-Ouro Preto, Rion imperiumin rakennukset) sopisi hyvin erityisesti
Ouro Pretoon myöhempänä kaupunkikohtaisena sisältönä eikä maatason
aiheena. Urheilu (jalkapallo) rajattiin pois tarkoituksella: jalkapallon
suomiminen brasilialaiseksi kansallislajiksi on 1900-luvun ilmiö eikä
kanna 1873-kulmaa.

### 1b. Mallikatsaus

`js/packs/maa-kategoriat.js`: ITA = 5 aihetta (historia, ruoka, musiikki,
kuvataide, luonto); IND = 5 aihetta (historia, rakennukset, ruoka,
kuvataide, luonto); USA = 5 aihetta (historia, luonto, musiikki, tiede,
ruoka) — BRA jatkaa samaa USA-mallia yhtä tiedeaihetta myöten.
Kenttärakenne: `otsikko`, (valinnainen `aika`), `tiedosto`, `teksti`
(440–660 mrk), `selite` (yksi virke), `lahde`
('Tekijä, Wikimedia Commons (LISENSSI)'), `wiki` (fi-Wikipedia-hakusana).

---

## 2. FAKTAPOHJA: Historia

**Johdanto-ehdotus (n. 220–260 mrk):**

> Vuonna 1873 Brasilia on ainoa monarkia Amerikan mantereella: keisari
> Pedro II hallitsee nuorta valtakuntaa, joka on juuri selvinnyt
> mantereen verisimmästä sodasta. Orjuus on vielä laillista, mutta sen
> loppu on jo alkanut — hitaasti ja kiistanalaisesti.

### H1 — "Poika joka lupasi kruunulle" (Pedro II ja keisarikunta)

> Pedro II nousi Brasilian valtaistuimelle jo viisivuotiaana isänsä
> palattua Portugaliin 1831, mutta hallitsi täysivaltaisesti vasta
> vuodesta 1840. Vuoteen 1873 mennessä hän on hallinnut yli
> kolmekymmentä vuotta valtakuntaa, joka on Etelä-Amerikan ainoa
> monarkia siirtomaa-ajan jälkeisessä maailmassa — ympärillä pelkkiä
> tasavaltoja. Pedro piti itseään ennen kaikkea oppineena: hän puhui
> kymmentä kieltä, keräsi palatsiinsa yli 60 000 kirjaa ja rakensi
> sinne oman valokuvaus- ja kemianlaboratorion. Charles Darwin
> kirjoitti hänestä: "keisari tekee tieteen hyväksi niin paljon, että
> jokainen tiedemies on velvollinen osoittamaan hänelle suurinta
> kunnioitusta."

Faktat ja lähteet:
- Pedro II nousi keisariksi 1831 (isä Pedro I luopui kruunusta ja
  palasi Portugaliin), julistettiin täysi-ikäiseksi ja kruunattiin
  1840–1841. — en-Wikipedia "Pedro II of Brazil"
- Vuoteen lähtien hänen palatsissaan São Cristóvãossa oli kolme
  kirjastoa, joissa oli yli 60 000 kirjaa; hän puhui portugalin lisäksi
  mm. latinaa, ranskaa, saksaa, englantia, italiaa, espanjaa, kreikkaa,
  arabiaa, hepreaa, sanskritia, kiinaa ja tupia. — en-Wikipedia "Pedro
  II of Brazil"
- Darwin-sitaatti "The Emperor does so much for science, that every
  scientific man is bound to show him the utmost respect" — en-Wikipedia
  "Pedro II of Brazil"

### H2 — "Vapaa kohtu, ei vapaa lapsi" (Rio Brancon laki, 1871)

> 28. syyskuuta 1871 — puolitoista vuotta ennen isoisän matkaa —
> Brasilian yleiskokous hyväksyi lain, joka julisti vapaiksi kaikki
> orjaäideille syntyvät lapset. Laki oli kuitenkin tunnettu
> porsaanreikänä: vapaana syntynyt lapsi oli silti velvollinen
> palvelemaan äitinsä omistajaa 21 vuoden ikään asti — ehto joka
> monessa tapauksessa muistutti orjuutta itseään. Laki ei vapauttanut
> yhtäkään jo elossa olevaa orjaa, ja Brasiliassa oli edelleen yli
> miljoona orjaa. Silti se oli ensimmäinen askel: keisari itse oli
> tullut siihen tulokseen, ettei orjuutta voinut enää oikeuttaa, osin
> Yhdysvaltain sisällissodan (1861–1865) herättämän huolen vuoksi.

Faktat ja lähteet:
- Rio Brancon laki eli "Vapaan kohdun laki" (Lei do Ventre Livre)
  hyväksyttiin 28.9.1871; julisti vapaiksi kaikki orjanaisten sen
  jälkeen synnyttämät lapset ja valtion/kruunun orjat. — en-Wikipedia
  "Rio Branco Law"
- Vapaaksi syntyneen lapsen tuli silti palvella äitinsä omistajaa
  21-vuotiaaksi asti — tila joka muistutti orjuutta; laki vapautti vain
  harvoja, yli miljoona ihmistä pysyi orjina. — en-Wikipedia "Rio
  Branco Law"
- Pedro II kirjoitti jo 1864 (Yhdysvaltain sisällissodan aikana), että
  orjuuden tulevaisuutta oli pohdittava sisäisen konfliktin pelossa. —
  en-Wikipedia "Lei Áurea"
- Laki oli virallisesti käytössä Kultalakiin (13.5.1888) asti, joka
  poisti orjuuden kokonaan. — en-Wikipedia "Rio Branco Law"; "Lei Áurea"

### H3 — "Sota joka mullisti mielet" (Paraguayn sota, 1864–1870)

> Paraguayn sota päättyi keväällä 1870, kolme vuotta ennen isoisän
> matkaa — mantereen verisin sota, jonka uhriluvuista historioitsijat
> yhä kiistelevät (arviot vaihtelevat 150 000:sta 500 000:een
> kuolleeseen, suurin osa paraguaylaisia). Brasilia lähetti sotaan
> lähes 150 000 miestä, joukossa yli 8 500 orjaa, jotka vapautettiin
> palvelukseen lähtiessään. Sotaveteraaniupseerit, jotka olivat
> taistelleet orjasotilaiden rinnalla, alkoivat epäillä koko
> orjajärjestelmää — sota muutti monen mielen tavalla, jota mikään
> laki ei ollut vielä saavuttanut.

Faktat ja lähteet:
- Paraguayn sota (Kolmiliiton sota) kesti 13.11.1864–8.4.1870, käytiin
  Paraguayn sekä Brasilian, Argentiinan ja Uruguayn liiton välillä;
  uhriarviot vaihtelevat 150 000–500 000 kuolleen välillä, mikä on
  kiistanalaista. — en-Wikipedia "Paraguayan War"
- Brasilia lähetti sotaan yhteensä n. 146 000 miestä 1864–1870, joukossa
  8 570 orjaa, jotka vapautettiin sotapalvelukseen lähetettäessä. —
  en-Wikipedia "Paraguayan War"
- Sotaan osallistuneet upseerit, jotka taistelivat orjasotilaiden
  rinnalla, alkoivat epäillä orjajärjestelmää eivätkä enää halunneet
  jäljittää karanneita orjia — muutos, joka vaikutti abolitionistiseen
  liikkeeseen. — en-Wikipedia "Lei Áurea"

*Huom kirjoittajalle: ei taistelukuvauksia eikä yksittäisiä
uhriluku­väitteitä leipätekstiin ilman "kiistanalainen"-mainintaa —
Perustuslain väkivaltalinjaus ja spec-mantereet.md:n katastrofisääntö.*

### H4 — "Kello joka soi laivalle mutta ei enää emämaalle" (itsenäisyys, 1822)

> Syyskuun 7. päivänä 1822 Brasilian portugalilainen prinssiregentti
> Pedro (myöhempi Pedro I) seisoi väitteen mukaan Ipiranga-joen rannalla
> São Paulon lähellä ja huusi "Itsenäisyys tai kuolema!" — ja julisti
> Brasilian irti Portugalista taistelutta. Toisin kuin Espanjan
> Etelä-Amerikan siirtomaissa, joissa itsenäisyys vaati vuosikymmenten
> sodat, Brasilia säilyi yhtenäisenä valtakuntana ja siirtyi suoraan
> monarkiaan Portugalin kruunun omasta perheestä. Vuonna 1873 tästä on
> kulunut 51 vuotta — Brasilia on nuorempi itsenäisenä valtiona kuin
> Yhdysvallat, mutta ainoa keisarikunta koko läntisellä pallonpuoliskolla.

Faktat ja lähteet:
- Brasilian itsenäisyys julistettiin 7.9.1822 prinssiregentti Pedron
  toimesta ("Itsenäisyyden huuto", Ipiranga); Pedro kruunattiin
  keisari Pedro I:ksi joulukuussa 1822. — en-Wikipedia "Empire of
  Brazil"
- Toisin kuin espanjankielisissä siirtomaissa, itsenäistyminen tapahtui
  suhteellisen vähäisin taisteluin ja johti monarkiaan eikä
  tasavaltaan — Brasilia pysyi yhtenäisenä alueena, kun naapurit
  hajosivat useiksi tasavalloiksi. — en-Wikipedia "Empire of Brazil"

**Minitehtäväehdokas (Historia):**
> Minä vuonna Rio Brancon laki vapautti kaikki orjanaisten
> tästä lähtien synnyttämät lapset — vaikkakin ehdollisesti?
> Vaihtoehdot: 1850 / **1871** / 1880 / 1888
> Fakta: laki hyväksyttiin 28.9.1871, puolitoista vuotta ennen isoisän
> matkaa; täydellinen orjuuden lakkautus (Kultalaki) tuli vasta 1888.

*Vastaus löytyy nostosta H2. São Paulon kysymyssarjassa on jo kysymys
kahvin merkityksestä 1800-luvulla — tätä ei toisteta tässä eikä
Ruoka-osiossa (ks. osio 6, minitehtävä).*

---

## 3. FAKTAPOHJA: Luonto

**Johdanto-ehdotus:**

> Yksi kymmenestä maailman tunnetusta eliölajista elää Amazonilla —
> alueella, joka kattaa yli puolet koko maapallon jäljellä olevasta
> sademetsästä. Vuonna 1873 eurooppalaiset tiesivät siitä yhä
> hämmästyttävän vähän, mutta metsän omat asukkaat olivat muokanneet
> sitä jo vuosituhansien ajan.

### L1 — "Metsä jonka koko ei mahdu mieleen" (Amazonin sademetsä)

> Amazonin sademetsä kattaa noin kuusi miljoonaa neliökilometriä —
> yli puolet koko maailman jäljellä olevasta sademetsästä — ja siitä
> kuusikymmentä prosenttia on Brasilian puolella. Alueella kasvaa
> arviolta 390 miljardia puuta noin 16 000 lajissa, ja joka kymmenes
> maailman tunnettu eliölaji elää siellä: 2 000 lintu- ja
> nisäkäslajia, yli 2 200 kalalajia ja 2,5 miljoonaa hyönteislajia.
> Yhdellä ainoalla hehtaarilla sademetsää elää noin miljardi
> selkärangatonta eläintä. Alueella on yhdeksän valtion aluetta ja
> yli 3 300 alkuperäiskansojen aluetta — Amazon ei ole tyhjä erämaa,
> vaan koti.

Faktat ja lähteet:
- Amazonin altaan pinta-ala on n. 7 miljoonaa neliökilometriä, josta
  6 miljoonaa neliökilometriä sademetsää; 60 % Brasiliassa, 13 % Perussa,
  10 % Kolumbiassa; alueella yhdeksän valtiota ja 3 344 alkuperäiskansojen
  aluetta. — en-Wikipedia "Amazon rainforest"
- Arviolta 390 miljardia puuta n. 16 000 lajissa; yksi kymmenestä
  tunnetusta lajista maailmassa elää Amazonilla; n. 2,5 miljoonaa
  hyönteislajia, n. 2 000 lintu- ja nisäkäslajia, 2 200 kalalajia. —
  en-Wikipedia "Amazon rainforest"
- Yksi hehtaari sademetsää sisältää n. miljardi selkärangatonta
  eläintä. — en-Wikipedia "Amazon rainforest"

### L2 — "Puu jonka siemenet salakuljetettiin" (kumipuu, Hevea brasiliensis, 1873)

> Vuonna 1873 — täsmälleen isoisän matkavuonna — Lontoon Kew Gardens
> yritti ensi kertaa kasvattaa Amazonin kumipuuta Brasilian
> ulkopuolella: kaksitoista tainta itivät koeviljelmällä, mutta
> kaikki kuolivat matkalla Intiaan. Kumin kysyntä oli tuolloin jo
> nousussa — vienti Amazonilta kasvoi 2 100 tonnista (1855) 10 000
> tonniin (1879) — mutta vasta 1876 englantilainen Henry Wickham
> onnistui salakuljettamaan 70 000 siementä Kew'hun, joista noin
> neljä prosenttia itikin ja päätyi lopulta Ceyloniin ja Singaporeen.
> Tämä yksi tapahtuma mursi lopulta Amazonin kumimonopolin
> vuosikymmeniä myöhemmin. Vuonna 1873 kumin suuri nousukausi — ja sen
> mukana raskas työ, jota siirtolaiset ja alkuperäiskansat tekivät
> kaukaisilla joilla — on vasta alkamassa.

Faktat ja lähteet:
- Ensimmäiset yritykset kasvattaa H. brasiliensistä Brasilian
  ulkopuolella tehtiin 1873: 12 tainta itivät Kew Gardensissa mutta
  kuolivat matkalla Intiaan. — en-Wikipedia "Hevea brasiliensis"
- Vuonna 1876 Henry Wickham salakuljetti 70 000 siementä Kew'hun; noin
  4 % itikin, ja taimet lähetettiin 1876 Ceyloniin (n. 2 000 tainta) ja
  Singaporeen (22 tainta). — en-Wikipedia "Hevea brasiliensis"; "Amazon
  rubber cycle"
- Kumin vienti Amazonilta kasvoi 2 100 tonnista (1855) 10 000 tonniin
  (1879); ensimmäinen kumibuumi ajoittuu pääosin 1879–1912.
  — en-Wikipedia "Amazon rubber cycle"
- Kumin vulkanointimenetelmän keksi Charles Goodyear 1839, mikä teki
  kumista teollisesti käyttökelpoista ja nosti kysyntää. — en-Wikipedia
  "Amazon rubber cycle"

*Huom kirjoittajalle: kumibuumin myöhempi vuosikymmenten mittainen
alkuperäiskansojen hyväksikäyttö (mm. Putumayo) EI kuulu tähän nostoon —
se tapahtui pääosin Perun/Kolumbian puolella 1880-luvulta eteenpäin ja
sisältää raakoja yksityiskohtia, jotka eivät sovi Perustuslain
väkivaltalinjaukseen. Nosto pysähtyy 1870-luvun alkuun.*

### L3 — "Metsä jonka ihmiset rakensivat" (terra preta, esikolumbiaaninen maanviljely)

> Pitkään Amazonia pidettiin koskemattomana erämaana, mutta
> vuosikymmenten tutkimus on osoittanut toisin: alkuperäiskansat ovat
> muokanneet metsää ainakin 11 000 vuoden ajan. Suurilla alueilla
> Amazonia kasvaa yhä "terra preta" -nimistä tummaa, hedelmällistä
> maaperää, jonka ihmiset loivat vuosisatojen aikana polttamalla,
> kompostoimalla ja hallitsemalla maata — todiste siitä, että suuri
> osa "luonnontilaisesta" sademetsästä on itse asiassa satojen
> sukupolvien maanviljelyn tulosta. Xingu-joen alueelta on löydetty
> jäänteitä laajoista muinaisista yhdyskunnista teineen, siltoineen ja
> aukioineen — kaupunkeja, jotka eurooppalaiset eivät koskaan nähneet
> ehjinä, koska taudit tuhosivat väestön ennen kuin tutkijat
> saapuivat.

Faktat ja lähteet:
- Tutkimusnäyttö osoittaa Amazonin sademetsän olleen ihmisen muokkaama
  ainakin 11 000 vuoden ajan mm. metsäpuutarhoilla ja terra preta
  -maaperällä. — en-Wikipedia "Amazon rainforest"
- Terra preta -maaperä on laajalti hyväksytty alkuperäiskansojen
  maanhoidon tuotteeksi, mikä mahdollisti maanviljelyn muuten
  epäotollisessa ympäristössä. — en-Wikipedia "Amazon rainforest"
- Xingu-joen alueelta löydettiin 2003 (Michael Heckenberger, Floridan
  yliopisto) jäänteitä laajoista muinaisyhdyskunnista: teitä, siltoja
  ja suuria aukioita. — en-Wikipedia "Amazon rainforest"

### L4 — "Kolmesataa yhdeksänkymmentäyksi kansaa yhdessä maassa" (alkuperäiskansat tänään)

> Brasilian ensimmäisessä väestönlaskennassa, joka sisälsi
> alkuperäiskansat — vuonna 1872, vain vuosi ennen isoisän matkaa —
> laskettiin 386 955 alkuperäiskansaan kuuluvaa ihmistä, 3,9 %
> tuolloisesta väestöstä. Sata viisikymmentä vuotta myöhemmin, vuoden
> 2022 väestönlaskennassa, luku oli noussut 1,2 miljoonaan ihmiseen,
> jotka jakautuivat 391 eri kansaan ja puhuivat 295 eri kieltä.
> Alkuperäiskansat eivät ole kadonnut osa Brasilian menneisyyttä, vaan
> elävä, kasvava ja moninainen osa sen nykyisyyttä — vuoden 2010
> laskenta tunnisti jo 305 erillistä etnistä ryhmää maan rajojen
> sisällä, enemmän kuin missään muualla maailmassa.

Faktat ja lähteet:
- Vuoden 1872 väestönlaskennassa alkuperäiskansoihin identifioitui
  386 955 ihmistä (3,90 % väestöstä); vuoden 2022 laskennassa luku oli
  1 227 642 (0,60 % väestöstä, koska kokonaisväestö on kasvanut
  moninkertaiseksi). — en-Wikipedia "Indigenous peoples in Brazil"
  (taulukko "Native Brazilians 1872–2022", Brasilian väestönlaskenta)
- Vuoden 2022 IBGE-laskennassa 1 694 836 brasilialaista identifioitui
  alkuperäiskansaksi jaettuna 391 etniseen ryhmään ja 295 kieleen; 2010
  laskenta tunnisti 305 etnistä ryhmää. — en-Wikipedia "Indigenous
  peoples in Brazil"
- FUNAI (Fundação Nacional do Índio) perustettiin 1967 suojelemaan
  alkuperäiskansojen etuja, kulttuuria ja oikeuksia; sen edeltäjä SPI
  perustettiin 1910 Cândido Rondonin aloitteesta. — en-Wikipedia
  "Indigenous peoples in Brazil"

**Minitehtäväehdokas (Luonto):**
> Minä vuonna Kew Gardensissa yritettiin ensi kertaa kasvattaa
> Amazonin kumipuuta Brasilian ulkopuolella?
> Vaihtoehdot: 1839 / **1873** / 1876 / 1888
> Fakta: 12 tainta itivät 1873, mutta ensimmäinen yritys epäonnistui.

*Vastaus löytyy nostosta L2. Ei toista Rion tai Buenos Airesin
kysymyksiä (southamerica-questions.js).*

---

## 4. FAKTAPOHJA: Tiede

**Johdanto-ehdotus:**

> Keisari joka olisi mieluummin ollut opettaja rakensi
> palatsiinsa oman valokuvauslaboratorion, kirjeenvaihtoa Darwinin ja
> Pasteurin kanssa käyvän tiedemiesverkoston ja kutsui amerikkalaisia
> tutkijoita kartoittamaan Amazonin kaloja. Brasilian tiedehistoria
> 1870-luvulla kulkee lähes aina saman miehen kautta.

### T1 — "Ensimmäinen brasilialainen valokuvaaja oli keisari" (Pedro II ja valokuvaus)

> Maaliskuussa 1840 — kaksitoista vuotta ennen kuin hän täytti
> kahdeksantoista — Pedro II hankki daguerrotypiakameran ja tuli
> Brasilian ensimmäiseksi valokuvaajaksi. Hän rakensi palatsiinsa
> São Cristóvãoon oman valokuvauslaboratorionsa ja toisen
> kemian ja fysiikan kokeille, sekä tähtitieteellisen observatorion.
> Vuoteen 1873 mennessä hän oli harrastanut valokuvausta yli
> kolmekymmentä vuotta — pidempään kuin useimmat aikansa
> ammattivalokuvaajat olivat edes eläneet — ja hänen muotokuviaan
> otettiin säännöllisesti koko hänen elämänsä ajan, mikä teki hänestä
> yhden 1800-luvun eniten kuvatuista hallitsijoista maailmassa.

Faktat ja lähteet:
- Pedro II hankki daguerrotypiakameran maaliskuussa 1840 ja tuli
  ensimmäiseksi brasilialaiseksi valokuvaajaksi; perusti São Cristóvãon
  palatsiin valokuvaus- sekä kemian ja fysiikan laboratoriot ja
  rakennutti tähtitieteellisen observatorion. — en-Wikipedia "Pedro II
  of Brazil"
- Aihepiirit joista hän oli kiinnostunut: mm. antropologia, historia,
  maantiede, geologia, lääketiede, laki, filosofia, maalaustaide,
  kemia, fysiikka, tähtitiede. — en-Wikipedia "Pedro II of Brazil"

### T2 — "Kalastusretki joka toi filosofin Amazonille" (Thayer-retkikunta, 1865–1866)

> Huhtikuussa 1865, viikko ennen sisällissodan päättymistä
> Yhdysvalloissa, sveitsiläis-amerikkalainen luonnontieteilijä Louis
> Agassiz purjehti Rio de Janeiroon johtaakseen tieteellisen
> retkikunnan, jonka bostonilainen liikemies Nathaniel Thayer
> rahoitti. Puolentoista vuoden aikana ryhmä keräsi kymmeniä tuhansia
> kalanäytteitä Amazonilta aina Kolumbian ja Perun rajoille asti —
> monet lajit Harvardin kokoelmiin tänäkin päivänä. Joukossa oli kuusi
> nuorta amerikkalaista vapaaehtoista, joista yksi oli
> kaksikymmentäkolmevuotias William James — mies josta tulisi
> myöhemmin Yhdysvaltain kuuluisin filosofi ja psykologian
> uranuurtaja, mutta joka 1865 oli vasta Agassizin oppipoika Amazonin
> matalassa vedessä kalaverkko kädessään.

Faktat ja lähteet:
- Thayer-retkikunta (huhtikuu 1865 – elokuu 1866) oli Louis Agassizin
  johtama, Nathaniel Thayerin rahoittama tieteellinen retkikunta
  Brasiliaan; laivamatka New Yorkista Rioon alkoi 2.4.1865, viikko
  ennen kenraali Leen antautumista Appomattoxissa. — en-Wikipedia
  "Thayer Expedition"
- Retkikunta tutki Brasiliaa rannikolta Tocantins-joelle ja sen
  sivujoille aina Kolumbian ja Perun rajoille asti, keräten kymmeniä
  tuhansia näytteitä, valtaosa Harvardin Museum of Comparative
  Zoology -kokoelmiin. — en-Wikipedia "Thayer Expedition"
- Kuusi amerikkalaista vapaaehtoista osallistui, joukossa
  23-vuotias William James — myöhempi kuuluisa filosofi ja
  psykologi. — en-Wikipedia "Thayer Expedition"

### T3 — "Keisari jonka jäsenyyden sai vain kaksi muuta hallitsijaa" (French Academy of Sciences, 1875)

> Pedro II:sta tuli 1875 Ranskan tiedeakatemian jäsen — kunnia, joka
> oli aiemmin myönnetty vain kahdelle muulle valtionpäämiehelle
> historiassa: Pietari Suurelle ja Napoleon Bonapartelle. Hän kuului
> myös Lontoon Royal Societyyn, Venäjän tiedeakatemiaan ja
> Belgian kuninkaallisiin tiede- ja taideakatemioihin, ja kävi
> kirjeenvaihtoa mm. Richard Wagnerin, Louis Pasteurin, Alexander
> Graham Bellin ja Louis Agassizin kanssa. Hän rahoitti omista
> varoistaan Pasteur-instituutin perustamista ja auttoi kustantamaan
> Wagnerin Bayreuthin oopperatalon rakentamista — keisari, joka piti
> tiedettä ja taidetta valtakuntansa arvokkaimpana vientituotteena.

Faktat ja lähteet:
- Pedro II valittiin Ranskan tiedeakatemian jäseneksi 1875 — kunnia
  joka oli aiemmin myönnetty vain Pietari Suurelle ja Napoleon
  Bonapartelle valtionpäämiehistä. — en-Wikipedia "Pedro II of Brazil"
- Hän oli myös Royal Societyn, Venäjän tiedeakatemian ja Belgian
  kuninkaallisten tiede- ja taideakatemioiden jäsen; kirjeenvaihtoa
  mm. Wagnerin, Pasteurin, Agassizin, Alexander Graham Bellin kanssa.
  — en-Wikipedia "Pedro II of Brazil"
- Rahoitti Pasteur-instituutin perustamista ja tuki Wagnerin
  Bayreuth Festspielhausin rakentamista. — en-Wikipedia "Pedro II of
  Brazil"

### T4 — "Museo joka syntyi keisarikunnan mukana" (Kansallismuseo, 1818/Pedro II:n aikana)

> Brasilian kansallismuseo, maan vanhin, perustettiin jo 1818, mutta
> se kasvoi todelliseksi tutkimuslaitokseksi vasta Pedro II:n
> hallitessa: keisari oli säännöllinen vierailija ja tuki museon
> luonnontieteellisiä ja kansatieteellisiä kokoelmia henkilökohtaisesti.
> Museon kokoelmat karttuivat juuri 1870-luvulla monien Amazonin-
> retkikuntien, kuten Thayer-retkikunnan, tuomilla näytteillä ja
> yhteyksillä. Museo sijaitsi São Cristóvãon palatsissa — samassa
> rakennuksessa, jossa Pedro II piti omaa valokuvaus- ja
> kemianlaboratoriotaan — kunnes koko rakennus paloi 2018 suuressa
> tulipalossa, joka tuhosi suuren osan kokoelmista.

Faktat ja lähteet:
- Brasilian kansallismuseo (Museu Nacional) on maan vanhin tiede- ja
  luonnontieteellinen museo. — en-Wikipedia "National Museum of
  Brazil"
- Museo sijaitsi Quinta da Boa Vista -puiston São Cristóvãon
  palatsissa, entisessä keisarillisessa palatsissa. — en-Wikipedia
  "National Museum of Brazil"

*Huom kirjoittajalle: museon 2018 tulipalo on nykyhistoriaa (yli sata
vuotta 1873:sta) — mainitaan T4:ssä vain lyhyenä nykyhetken kaarena,
ei laajenneta, koska nostot keskittyvät 1873-vuoteen. Tarkista
tulipalon vuosiluku Kansallismuseon omalta sivulta ennen käyttöä — ei
haettu erikseen tässä koosteessa.*

**Minitehtäväehdokas (Tiede):**
> Minä vuonna Pedro II hankki ensimmäisen kameransa ja tuli Brasilian
> ensimmäiseksi valokuvaajaksi?
> Vaihtoehdot: **1840** / 1865 / 1873 / 1888
> Fakta: keisari osti daguerrotypiakameran maaliskuussa 1840.

*Vastaus löytyy nostosta T1.*

---

## 5. FAKTAPOHJA: Musiikki

**Johdanto-ehdotus:**

> Vuonna 1870 — kolme vuotta ennen isoisän matkaa — Rion kaduilla
> alkoi soida uusi tyylilaji, jonka soittajat kutsuivat
> "itkuksi" vaikka rytmi oli iloinen. Choro syntyi samasta risteyksestä
> kuin koko Brasilian musiikki: Länsi-Afrikan rytmit, Portugalin
> salonkilaulut ja katujen omat äänet sekoittuivat toisiinsa.

### M1 — "Choro Carioca" (Joaquim Callado, 1870)

> Vuonna 1870 huilisti Joaquim Callado perusti Rio de Janeirossa
> yhtyeen nimeltä "Choro Carioca" — huilu, kaksi kitaraa ja
> cavaquinho. Yhtye soitti eurooppalaisia tanssimuotoja (polkka,
> valssi, mazurkka) mutta karibbealais-afrikkalaisella synkoopilla ja
> improvisaatiolla höystettynä, ja tästä soittotavasta syntyi vähitellen
> oma genrensä: choro, Brasilian ensimmäinen omaleimainen kaupunkilainen
> populaarimusiikin laji. Callado kuoli vain kymmenen vuotta
> myöhemmin, 32-vuotiaana, mutta ehti luoda pohjan tyylille, jota
> säveltäjä Heitor Villa-Lobos kutsuisi vuosikymmeniä myöhemmin
> "Brasilian sielun aidoksi ruumiillistumaksi".

Faktat ja lähteet:
- Joaquim Antônio da Silva Calado (Callado, 1848–1880) perusti
  yhtyeen "Choro Carioca" vuonna 1870; yhtyeessä huilu, kaksi kitaraa
  ja cavaquinho. — en-Wikipedia "Joaquim Antônio da Silva Calado"
- Choro syntyi 1800-luvulla carioca-muusikkojen soittotavasta, kun he
  soittivat eurooppalaisia genrejä (polkka, valssi, mazurkka,
  schottische, habanera) afrobrasilialaisten rytmien (lundu, batuque)
  vaikutuksessa; termi "choro" tarkoitti alkuun soittotapaa/yhtyettä,
  myöhemmin koko genreä. — en-Wikipedia "Choro"
- Villa-Lobos kuvasi choroa "Brasilian sielun aidoksi
  ruumiillistumaksi". — en-Wikipedia "Choro"

### M2 — "Nainen joka soitti miesten piireissä" (Chiquinha Gonzaga)

> Chiquinha Gonzaga syntyi Rio de Janeirossa 1847 ja naitettiin
> kuusitoistavuotiaana laivaston upseerille isänsä valitsemana —
> avioliitto jonka hän jätti vuosia myöhemmin, kesken 1800-lukua,
> skandaalimaisesti eroten ja isänsä hylkäämänä. Hän elätti itsensä
> yksinhuoltajana pianonsoitolla ja alkoi 1870-luvulla käydä
> choro-illoissa, jotka olivat perinteisesti varattu miehille — ja
> hänestä tuli ensimmäinen nainen, joka soitti Joaquim Calladon
> yhtyeessä. Vuonna 1877 hän sävelsi ensimmäisen suuren hittinsä,
> polkan "Atraente", improvisoiden sen pianolla kesken erään
> choro-illan. Hänestä tuli Brasilian ensimmäinen menestynyt
> naissäveltäjä ja myöhemmin maan ensimmäinen naiskapellimestari.

Faktat ja lähteet:
- Francisca "Chiquinha" Gonzaga (1847–1935) meni naimisiin
  16-vuotiaana 1863 isänsä valitseman upseerin kanssa; jätti
  aviomiehensä myöhemmin ja pyysi avioeroa, mikä oli aikanaan
  skandaali; isä julisti hänet käytännössä perinnöttömäksi.
  — en-Wikipedia "Chiquinha Gonzaga"
- Gonzaga alkoi soittaa Joaquim Calladon yhtyeessä "O Choro do
  Calado" ensimmäisenä naisena; sävelsi 1877 polkan "Atraente"
  improvisoiden sen pianolla choro-illassa. — en-Wikipedia "Chiquinha
  Gonzaga"
- Hänestä tuli Brasilian ensimmäinen naiskapellimestari ja maan
  ensimmäinen menestynyt populaarimusiikin naissäveltäjä.
  — en-Wikipedia "Chiquinha Gonzaga"

### M3 — "Peli joka piiloutui tanssiksi" (capoeira)

> Capoeira syntyi orjuutettujen afrikkalaisten keskuudessa Brasiliassa,
> juurineen todennäköisesti Angolan engolo-taistelutaidossa, ja se
> mainitaan ensi kerran virallisessa asiakirjassa 1789 "vakavimpana
> rikoksena". 1800-luvun Rio de Janeirossa capoeira oli katutaistelun
> laji, jota harjoitettiin usein aseiden — puukkojen — kanssa, ja se
> pysyi laittomana koko 1800-luvun ja pitkälle 1900-luvulle asti
> (kirjattiin rikoslakiin vielä 1890). Tanssin, leikin ja taistelun
> rajat hämärtyivät tarkoituksella: harjoittajat piilottivat taidon
> musiikkiin ja rytmiin niin, että se näytti pelkältä tanssilta, kun
> viranomainen käveli ohi. Berimbau, yksijousinen soitin, johtaa yhä
> tätä piiriä (rodaa) tänään — nyt Unescon suojeleman perinteen osana.

Faktat ja lähteet:
- Capoeiran juuret liitetään engoloon, Angolan bantukansojen
  perinteiseen taistelutaitoon; capoeira mainitaan ensi kerran
  virallisessa asiakirjassa 1789 rikoksena. — en-Wikipedia "Capoeira"
- 1800-luvun Rio de Janeirossa katutaistelutyyli "capoeira carioca"
  yhdisti potkuja, päänläimäyksiä ja veitsen/kepin käyttöä; capoeira
  listattiin rikokseksi Brasilian rikoslaissa 1890. — en-Wikipedia
  "Capoeira"
- Berimbau (yksijousinen soitin) johtaa capoeira-piiriä (roda);
  capoeira-piiri lisättiin Unescon aineettoman kulttuuriperinnön
  luetteloon 2014. — en-Wikipedia "Capoeira"

*Huom kirjoittajalle: capoeiran veitsi-/asehistoria mainitaan vain
yhdellä maininnalla ilman yksityiskohtia (Perustuslain
väkivaltalinjaus) — pääpaino musiikissa, rytmissä ja piilotetussa
taidossa.*

### M4 — "Vapautetun orjan pojan laulut Lissabonin salongeissa" (Domingos Caldas Barbosa ja modinha)

> Domingos Caldas Barbosa syntyi Rio de Janeirossa noin 1739
> portugalilaisen isän ja vapautetun angolalaisen orjanaisen
> poikana — ja päätyi silti 1700-luvun lopun Lissabonin hienostohovin
> suosituimmaksi laulaja-runoilijaksi. Hän loi modinha-genren, herkän
> rakkauslaulun tyylin, jota säesti kitara tai viola, ja jonka juuret
> ovat sekä Euroopan salonkilaulussa että Länsi-Afrikan lundu-tanssissa.
> Vaikka häntä pilkattiin syntyperänsä vuoksi ("laulaja jolla on
> viola" oli alentava lempinimi), hänen "cantiga"-laulunsa tulivat
> suosituiksi kautta Portugalin ja Brasilian. Modinha ja lundu ovat
> yhdessä Brasilian populaarimusiikin vanhimmat juuret — samasta
> risteyksestä, josta choro syntyi vuosikymmeniä myöhemmin.

Faktat ja lähteet:
- Domingos Caldas Barbosa (n. 1739–1800) syntyi Rio de Janeirossa
  portugalilaisen isän ja vapautetun angolalaisen orjanaisen poikana;
  tunnetaan modinha-genren luojana. — en-Wikipedia "Domingos Caldas
  Barbosa"
- Hän sai osakseen sekä suosiota että ennakkoluuloja Lissabonin
  hovipiireissä; lempinimi "cantor de viola" oli osin alentava. —
  en-Wikipedia "Domingos Caldas Barbosa"
- Modinha on Brasiliassa sentimentaalinen rakkauslaulu, pidetty yhdessä
  lundun kanssa Brasilian populaarimusiikin vanhimpina juurina;
  modinhan alkuperä on Euroopassa, lundun Afrikassa. — en-Wikipedia
  "Modinha"

**Minitehtäväehdokas (Musiikki):**
> Minä vuonna Joaquim Callado perusti Rion "Choro Carioca" -yhtyeen,
> jonka soittotavasta koko choro-musiikkilaji sai alkunsa?
> Vaihtoehdot: 1850 / **1870** / 1888 / 1900
> Fakta: yhtye perustettiin 1870, kolme vuotta ennen isoisän matkaa.

*Vastaus löytyy nostosta M1.*

---

## 6. FAKTAPOHJA: Ruoka

**Johdanto-ehdotus:**

> Brasilian ruokapöytä on kolmen mantereen risteys: alkuperäiskansojen
> maniokki, Länsi-Afrikan pavut ja Euroopan tekniikat kohtaavat samassa
> padassa. Vuoteen 1873 mennessä Brasilia on jo maailman suurin
> kahvintuottaja — vienti joka rahoitti sekä keisarikunnan rikkauden
> että sen synkimmän puolen.

### R1 — "Sylttyyn kätketyt siemenet" (kahvi, 1727 ja eteenpäin)

> Legendan mukaan upseeri Francisco de Melo Palheta lähetettiin 1727
> Ranskan Guyanaan rajakiistaa ratkaisemaan, mutta hänen todellinen
> tehtävänsä oli hankkia kahvinsiemeniä — jotka Ranska varjeli
> tiukasti. Palheta viekoitteli kuvernöörin vaimon, joka lahjoitti
> hänelle jäähyväiskukkakimpun, jonka sisään oli kätketty
> kahvinsiemeniä. Sadan viidenkymmenen vuoden kuluessa tästä
> väitetystä varkaudesta Brasiliasta tuli maailman suurin
> kahvintuottaja: 1840-luvulla se tuotti jo 40 % koko maailman
> kahvista. Kahvi ja orjatyö kulkivat käsi kädessä — puolitoista
> miljoonaa orjaa tuotiin 1800-luvun alkupuoliskolla nimenomaan
> kahviplantaaseille — ja vuonna 1873 kahvi on Brasilian tärkein
> vientituote sekä sen rikkauden että sen syyllisyyden lähde.

Faktat ja lähteet:
- Legendan mukaan Francisco de Melo Palheta salakuljetti ensimmäiset
  kahvipensaan siemenet Brasiliaan 1727 Ranskan Guyanasta,
  kuvernöörin vaimon avulla. — en-Wikipedia "Coffee production in
  Brazil"
- Brasiliasta tuli maailman johtava kahvintuottaja 1840-luvulla, jolloin
  sen osuus maailmantuotannosta oli 40 %; 1800-luvun alkupuoliskolla
  tuotiin 1,5 miljoonaa orjaa kahviplantaaseille. — en-Wikipedia
  "Coffee production in Brazil"
- Ulkomainen orjakauppa kiellettiin 1850, minkä jälkeen plantaasit
  turvautuivat yhä enemmän eurooppalaisiin siirtolaisiin; sisäinen
  orjakauppa jatkui orjuuden lopulliseen lakkauttamiseen (1888) asti.
  — en-Wikipedia "Coffee production in Brazil"

*Huom kirjoittajalle: São Paulon kaupunkikysymyksissä on jo kysymys
"Minkä tuotteen vienti teki São Paulon seudusta rikkaan 1800-luvulla" —
tämän noston minitehtävä (ks. alla) käsittelee eri kulmaa (Palhetan
tarina), jotta kysymykset eivät toistu.*

### R2 — "Lauantain pata joka yhdisti kaikki" (feijoada)

> Feijoada syntyi 1700-luvun siirtomaa-Brasiliassa, kun orjuutetut
> afrikkalaiset yhdistivät mustat pavut ja jäljelle jääneet sianlihan
> palat portugalilaiseen padastointiperinteeseen — sukua Ranskan
> cassoulet'lle ja Espanjan cocido madrileñolle, mutta täysin oma
> luomuksensa. 1800-luvulla se muuttui työväenluokan lauantai-illan
> ateriasta koko Brasilian kansallisruoaksi, jota syödään yhä
> perinteisesti lauantaisin. Ruoan tarina kantaa mukanaan sekä
> luovuuden että kärsimyksen: keittiöiden afrikkalaisnaiset, jotka
> tekivät padasta yhteisön kokoontumispaikan, elivät samaan aikaan
> orjuuden alaisina.

Faktat ja lähteet:
- Mustat pavut ja jäljelle jäänyt sianliha, joita orjuutettu afrikkalais­
  väestö käytti, loivat siirtomaa-Brasiliassa 1700-luvulla feijoadan;
  yhdisti portugalilaisia, afrikkalaisia ja alkuperäiskansojen
  ruokaperinteitä. — en-Wikipedia "Feijoada"
- 1800-luvulla ruoka muuttui työväenluokan aterialta Brasilian
  kansallisruoaksi, jota syödään perinteisesti lauantaisin.
  — en-Wikipedia "Feijoada"
- Feijoada-tyyppinen liha-papupata on sukua Ranskan cassoulet'lle,
  Espanjan cocido madrileñolle ja muille Euroopan padastointiruoille
  — kaikki juontuvat lopulta antiikin Rooman keittiöstä.
  — en-Wikipedia "Feijoada"

### R3 — "Juuri jota täytyy osata valmistaa oikein" (maniokki, farofa)

> Maniokki kesyyntyi Brasilian alueella jo kymmenentuhatta vuotta
> sitten — kauan ennen eurooppalaisten tuloa — ja siitä tuli
> alkuperäiskansojen tärkein tärkkelyskasvi kautta Etelä-Amerikan.
> Kasvin katkerat lajikkeet sisältävät syanidiyhdisteitä, jotka on
> poistettava huolellisella liotuksella, puristamisella ja
> paahtamisella ennen syömistä — taito, jonka alkuperäiskansat
> hallitsivat sukupolvien kokemuksella ja jonka portugalilaiset
> siirtolaiset ottivat käyttöönsä. Maniokista tehty karkea, paahdettu
> jauho, farofa, on yhä brasilialaisen ruokapöydän vakioaines —
> siroteltuna feijoadan päälle tai syötynä sellaisenaan — suora
> perintö kansoilta, jotka viljelivät sitä jo kauan ennen kuin
> Brasiliaa oli olemassa.

Faktat ja lähteet:
- Maniokki (Manihot esculenta) on kotoisin Brasiliasta; villi
  esimuoto keskittyy länsi-keskisen Brasilian alueelle, jossa se
  kesyytettiin todennäköisesti korkeintaan 10 000 vuotta sitten.
  — en-Wikipedia "Cassava"
- Katkerat lajikkeet sisältävät huomattavasti enemmän syanogeenisiä
  glykosideja kuin makeat; juuri on valmisteltava huolellisesti
  (liotus, puristus, paahto) syanidimyrkytyksen välttämiseksi.
  — en-Wikipedia "Cassava"
- Brasilian farofa on kuiva, karkea jauho, joka valmistetaan
  raastamalla, puristamalla ja paahtamalla maniokkijuurta; syödään
  lisukkeena mm. feijoadan kanssa. — en-Wikipedia "Cassava"

### R4 — "Aroilta lautaselle" (churrasco ja gaúcho-kulttuuri)

> Brasilian eteläisillä laidunmailla, Rio Grande do Sulissa, syntyi
> oma paimentolaiskulttuurinsa: gaúchot, taitavat ratsastajat, jotka
> elivät villien karjalaumojen ja hevosten keskellä pampan
> aroilla jo 1600-luvulta lähtien myyden nahkoja ja syöden vapaasti
> saatavilla olevaa naudanlihaa. Heidän tapansa paahtaa lihaa
> puuvartaissa hiilloksen päällä — churrasco — on säilynyt Rio Grande
> do Sulin, Paranán ja Santa Catarinan ruokakulttuurin ytimessä
> tähän päivään asti. Charles Darwin, joka vietti kuusi kuukautta
> pampalla 1833, kuvasi gaúchoja päiväkirjassaan "erittäin
> kohteliaiksi, kohteliaiksi ja vieraanvaraisiksi" — vaikka sama
> yhteisö tunnettiin myös riidoistaan ja karjavarkauksistaan.

Faktat ja lähteet:
- Gaúchot olivat 1600-luvulta lähtien syntynyt sosiaaliluokka: ratsain
  liikkuvia karjanmetsästäjiä ja -paimenia Argentiinan, Uruguayn ja
  Brasilian (Rio Grande do Sul) pampalla, jotka elivät myymällä
  nahkoja ja syömällä vapaasti riistanaudanlihaa. — en-Wikipedia
  "Gaucho"
- Churrasco on Brasilian termi grillatulle lihalle, joka on peräisin
  Etelä-Brasiliasta; valmistetaan perinteisesti puu- tai
  metalliaartaissa hiillosten päällä (churrasqueira); erityisen
  keskeinen Rio Grande do Sulin, Paranán ja Santa Catarinan
  ruokakulttuurissa. — en-Wikipedia "Churrasco"
- Charles Darwin kuvasi pampan gaúchoja päiväkirjassaan 1833
  "erittäin avuliaiksi, kohteliaiksi ja vieraanvaraisiksi", mutta
  totesi myös runsaasti ryöstöjä ja väkivaltaa johtuvan mm. jatkuvasta
  puukon kantamisesta. — en-Wikipedia "Gaucho"

*Huom kirjoittajalle: Darwin-sitaatin jälkiosa (puukkotappelut,
"veriset riidat") jätetään pois tai tiivistetään yhteen neutraaliin
lauseeseen Perustuslain väkivaltalinjauksen mukaisesti — nosto
painottuu ruokaan ja elämäntapaan, ei väkivaltaan. Gaúcho-kulttuuri
yhdistää BRA:n ja ARG:n (sama pampa, sama R4-tyyppinen aihe sopisi
myös Argentiinan tulevaan maalehteen eri kulmasta — tarkista
päällekkäisyys silloin, ks. avoin kysymys D).*

**Minitehtäväehdokas (Ruoka):**
> Kenen kerrotaan salakuljettaneen ensimmäiset kahvinsiemenet
> Brasiliaan 1727 — kukkakimppuun kätkettyinä?
> Vaihtoehdot: **Francisco de Melo Palheta** / Pedro Álvares Cabral /
> Henry Wickham / Cyrus McCormick
> Fakta: legendan mukaan Palheta sai siemenet Ranskan Guyanan
> kuvernöörin vaimolta.

*Vastaus löytyy nostosta R1. Ei toista São Paulon kaupunkikysymystä
kahvin taloudellisesta merkityksestä.*

---

## 7. Maan intro (~900 mrk, ehdotus `southamerica-artikkelit.js`-tiedostoon)

`southamerica-artikkelit.js`-tiedostoa ei ole vielä olemassa (kuten ei
ollut `northamerica-artikkelit.js`:ää USA-koosteen aikaan) —
teksti alla on ainesehdotus sille kohtaan, kun tiedosto perustetaan
`africa-artikkelit.js`/`europe-artikkelit.js`-mallin mukaan avaimella
maan wiki-nimi "Brasilia".

> Vuonna 1873 Brasilia on Etelä-Amerikan ainoa keisarikunta —
> saarekemainen monarkia tasavaltojen ympäröimänä, jota hallitsee
> tiedettä ja taidetta rakastava Pedro II. Valtakunta on juuri
> selvinnyt mantereen verisimmästä sodasta Paraguayta vastaan, ja
> orjuus, joka on yhä laillista, on saanut ensimmäisen särönsä:
> orjaäideille syntyvät lapset ovat vapaita, vaikka täydellinen
> lakkautus on vielä viidentoista vuoden päässä. Kahvi on tehnyt
> maasta maailman johtavan tuottajan ja Rio de Janeirosta vauraan
> satamakaupungin, jonka kaduilla syntyy juuri uusi musiikkilaji,
> choro. Pohjoisessa avautuu Amazon — maailman suurin sademetsä,
> jota alkuperäiskansat ovat muokanneet vuosituhansien ajan ja jonka
> kumipuut ovat vasta houkuttelemassa maailman huomiota. Etelässä
> gaúchot ratsastavat pampan aroilla nautakarjan perässä. Isoisän
> matkapäiväkirja kulkee tähän ristiriitaiseen maahan, jossa keisarin
> kirjastot ja tiedeseurat elävät rinnan orjuuden viimeisten
> vuosikymmenten kanssa.

(n. 850–900 merkkiä — pituusluokka vastaa muiden maiden `intro`-kenttää.)

---

## 8. Kuvakategoriaehdotukset (EI vahvistettu Commonsista tässä koosteessa)

Toisin kuin USA-koosteessa, tämän koosteen aikana Commonsin
kategoriatiedostomääriä ei ehditty/pystytty tarkistamaan luotettavasti
(rajapintakutsut jäivät kesken taustaprosessissa) — seuraavan
kirjoittajan tulee tehdä lehtityö-reseptin kuvahaku (osio 3) kokonaan
itse, HAKUAPUNA seuraavat hakusanat/kategoriaehdokkaat:

- H1 Pedro II → `Category:Pedro II of Brazil` (todettu olemassa
  hakuvaiheessa, ~35 tiedostoa)
- H2 Rio Brancon laki → hae "Lei do Ventre Livre" tai "Rio Branco Law"
  suoraan tiedostohausta (ei vielä tarkistettu kategoriaa)
- H3 Paraguayn sota → `Category:Paraguayan War` (varo taistelukuvia —
  valitse muotokuvia, karttoja tai symbolisia kuvia, ei
  taistelukohtauksia Perustuslain linjauksen vuoksi)
- H4 Itsenäisyys → hae "Independence of Brazil" tai "Grito do Ipiranga"
  (kuuluisa maalaus Pedro Américon teoksesta "Independência ou Morte")
- L1 Amazon → `Category:Amazon rainforest` (pooli erittäin vahva)
- L2 Kumipuu → `Category:Hevea brasiliensis`, `Category:Rubber tapping`
- L3 Terra preta → hae "terra preta" suoraan tiedostohausta
- L4 Alkuperäiskansat → `Category:Indigenous peoples of Brazil` — valitse
  arkikuvia ja ylpeyskuvastoa spec-mantereet.md:n linjauksen mukaan, ei
  kurjuuskuvastoa
- T1 Pedro II valokuvaus → `Category:Photographs of Pedro II of Brazil`
  jos olemassa, muuten `Category:Pedro II of Brazil`
- T2 Thayer-retkikunta → hae "Thayer Expedition" tiedostohausta;
  Louis Agassiz -kategoria varmasti olemassa
- T3 French Academy → muotokuva Pedro II:sta riittää (sama kuva-aineisto
  kuin H1/T1)
- T4 Kansallismuseo → `Category:Museu Nacional (Rio de Janeiro)`
- M1 Choro/Callado → hae "Joaquim Callado" suoraan
- M2 Chiquinha Gonzaga → `Category:Chiquinha Gonzaga`
- M3 Capoeira → `Category:Capoeira` (todennäköisesti vahva pooli)
- M4 Caldas Barbosa → hae "Domingos Caldas Barbosa" (ohut aineisto,
  varaudu 1800-luvun kaiverrukseen ainoana vaihtoehtona)
- R1 Kahvi → `Category:Coffee production in Brazil`, `Category:Coffee
  plantations`
- R2 Feijoada → `Category:Feijoada`
- R3 Maniokki/farofa → `Category:Manihot esculenta`, `Category:Farofa`
- R4 Churrasco/gaúcho → `Category:Gauchos`, `Category:Churrasco`

**MAAKARTAT-nosto (relief-karttaan liitettävä yksittäiskuva):** ei
ehdotettu tässä koosteessa — ks. osio 9.

---

## 9. MAAKARTAT-rivin tarve — TEKNINEN AVOIN KYSYMYS

BRA:lla EI ole vielä riviä `js/packs/maakartat.js`:n `MAAKARTAT`-taulussa
(tarkistettu grepillä 23.8.2026 — ei myöskään ARG:lla). Toisin kuin
USA:n RUS-tyylinen projektio-ongelma, Brasilian muoto on maantieteellisesti
yksinkertaisempi (ei erillisiä sivukuvia kuten Alaska/Havaiji), joten
tavallinen tasavälinen (equirectangular) korkokartta Commonsista
todennäköisesti riittää — mutta tätä EI ole vahvistettu tässä
koosteessa eikä sopivaa korkokarttatiedostoa ole etsitty Commonsista.
Seuraavan kirjoittajan tulee tehdä sama tarkistus kuin muille
lehtimaille: löytää relief-kartta, varmistaa projektio ja laskea
`suoraPiste()`-kertoimet Italia/Egypti-mallin mukaan (ei RUS/USA:n
kaltaista erikoishaaraa todennäköisesti tarvita).

**Ehdotetut 5 kaupunkia** (jos/kun rivi tehdään), pelilaudan BRA-
kaupunkien joukosta, näyttämään maan laajuuden Amazonista pampan
reunaan:

| Nimi | Lat | Lon | Huom |
|---|---|---|---|
| Rio de Janeiro | -22,9068 | -43,1729 | `paa: true`? — pelin ensimmäinen BRA-kaupunki, historiallinen pääkaupunki 1873:ssa |
| Manaus | -3,1190 | -60,0217 | Amazon, kumibuumin keskus (ks. L2-nosto) |
| Salvador | -12,9777 | -38,5016 | Koillinen, ensimmäinen pääkaupunki, orjahistoria |
| São Paulo | -23,5505 | -46,6333 | Kahviylänkö (ks. R1-nosto) |
| Porto Alegre | -30,0346 | -51,2177 | Etelä, gaúcho-kulttuuri (ks. R4-nosto) |

(Koordinaatit omia hakuja, ei erikseen Wikipedia-viitattu — tarkista
ennen käyttöä.)

---

## 10. 1873-kulma koottuna

- **Täsmälleen 1873:** Ensimmäinen (epäonnistunut) yritys kasvattaa
  Amazonin kumipuuta ulkomailla, Kew Gardens (L2).
- **Kaksi vuotta ennen (1871):** Rio Brancon laki eli Vapaan kohdun
  laki (H2).
- **Kolme vuotta ennen (1870):** Paraguayn sota päättyy (H3); Choro
  Carioca -yhtye perustetaan (M1).
- **Kaksi vuotta jälkeen (1875):** Pedro II valitaan Ranskan
  tiedeakatemian jäseneksi (T3).
- **Kolme vuotta jälkeen (1876):** Henry Wickham salakuljettaa 70 000
  kumipuun siementä (L2, mainittu taustana).
- **Kuusi vuotta jälkeen (1877):** Chiquinha Gonzagan "Atraente" (M2).
- **Viisitoista vuotta jälkeen (1888):** orjuus lakkautetaan lopullisesti
  Kultalailla (H2, mainittu tulevana).
- **Kahdeksan vuotta ennen (1865–66):** Thayer-retkikunta tutkii
  Amazonia, William James mukana (T2).
- **51 vuotta ennen (1822):** Itsenäisyys Portugalista (H4).
- **146 vuotta ennen (1727):** Kahvin salakuljetus Brasiliaan — legenda
  jota kerrotaan yhä 1873:n Brasiliassa maan tärkeimmän vientituotteen
  alkuna (R1).

Brasilian 1873-kulma on rakenteeltaan erilainen kuin USA:n: sen sijaan
että moni tapahtuma osuisi täsmälleen vuoteen, Brasilian tarina 1873
on **kesken oleva siirtymä** — orjuuden hidas purku, kumibuumin
kynnys, tieteen ja taiteen kukoistus vanhan monarkian sisällä ennen sen
kaatumista (1889, ei käsitelty tässä koosteessa, koska se on
tulevaisuutta isoisän matkasta katsottuna).

---

## 11. Avoimet kysymykset

**A. `southamerica-artikkelit.js` puuttuu kokonaan**, samoin kuin
`northamerica-artikkelit.js` puuttui USA-koosteen aikaan. Maan intro
(osio 7) tarvitsee kotipaikan. Tätä ei ratkaista tässä koosteessa —
sama avoin kysymys koskee todennäköisesti myös Argentiinaa, kun sen
vuoro tulee, joten kannattaa harkita, perustetaanko tiedosto vasta
kun molemmat E-Amerikan pilottimaat kirjoitetaan, vai heti BRA:n
yhteydessä.

**B. MAAKARTAT-rivi puuttuu (osio 9)** — teknisesti kevyempi ongelma
kuin USA:n RUS-tyylinen conic-projektio, mutta silti kokonaan
tekemättä: relief-kartan etsintä, projektion tarkistus ja
`suoraPiste()`-kertoimien lasku jäävät seuraavalle kirjoittajalle.

**C. Kuvataide vs. Tiede -aihevalinta ei ole lukittu.** Valitsin Tieteen
Kuvataiteen sijaan, koska Pedro II:n tiedepatronaasi
(valokuvaus, Ranskan tiedeakatemia, Thayer-retkikunta) on
poikkeuksellisen rikas eikä toistu missään jo tehdyssä maalehdessä.
Kuvataide (Victor Meirelles, "Primeira Missa no Brasil" 1861,
Kuvataideakatemia) olisi ollut yhtä vahva vaihtoehto ja sopisi hyvin
myöhempään kaupunkikohtaiseen sisältöön (Rio tai Ouro Preto). Fablen
kannattaa vahvistaa valinta ennen kirjoitusvaihetta.

**D. Gaúcho/churrasco-aihe (R4) on yhteinen BRA:lle ja tulevalle
ARG:lle.** Kun Argentiinan maalehti kirjoitetaan (samassa E-Amerikan
pilottierässä), `tools/tarkista-aihetoisto.mjs` kannattaa ajaa, ja
sisältö kannattaa eriyttää kulmasta: BRA painottaa Rio Grande do Sulin
churrascoa ja etelän paimentolaiskulttuuria osana ruokaosiota, ARG
voisi painottaa asadoa ja tangoa tai gaucho-kulttuuria omana laajempana
aiheenaan — vältetään identtinen nosto kahdessa maalehdessä.

**E. Paraguayn sodan uhriluvut ja sisältökuri.** H3-nosto mainitsee
uhrilukuhaarukan (150 000–500 000) auki kirjoitettuna Wikipedian oman
epävarmuuden mukaisesti (ennakkotapaus v925/v932/v937 -tyylinen
ristiriidan avaus), mutta EI kuvaile taisteluita. Fablen kannattaa
pistokoetarkistaa sävy ennen julkaisua — aihe sivuaa sotaa
tarkemmin kuin useimmat muut tähän mennessä tehdyt maalehdet.

**F. Kansallismuseon 2018 tulipalo (T4) mainitaan vain lyhyesti eikä
vuosilukua ole erikseen varmistettu tässä koosteessa** — tarkista
`National Museum of Brazil` -sivulta ennen käyttöä, tai jätä maininta
kokonaan pois ja pidä nosto puhtaasti 1800-luvun aineistossa.

**G. Kuvahaku on kokonaan tekemättä (osio 8).** Toisin kuin USA-
koosteessa, tässä ei ehditty vahvistaa Commons-kategorioiden
tiedostomääriä rajapinnasta (taustaprosessi jäi kesken) — kaikki
osion 8 kategoriat ovat hakuapua, ei vahvistettuja lukuja.

**H. Alkuperäiskansa-aihe on hajautettu Luonto-osioon (L3, L4) sen
sijaan että sillä olisi oma aiheensa.** Tämä noudattaa spec-
mantereet.md:n E-Amerikka-linjausta ("kansat nykypäivän toimijoina", ei
oma erillinen aihe), mutta Fable voi harkita, riittääkö kahden noston
paino vai tarvitaanko vahvempi käsittely — esimerkiksi jos joku
BRA-kaupunki (Manaus, Bananal) saa myöhemmin oman kaupunkilehtensä,
alkuperäiskansa-aihe voisi silloin siirtyä sinne omana kansisivun
nostonaan Rion/Buenos Airesin gondolieeri-mallin tapaan.
