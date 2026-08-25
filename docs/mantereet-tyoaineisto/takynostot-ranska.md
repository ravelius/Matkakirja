# Täkynostot: Ranska

Työaineisto omistajan 25.8.2026 ideaan (Raamattu, osio "Fokusmoodi",
kohta KEVYT KULKU -KOKEILU): kun maan aarre on löydetty, kartalta
nousee YKSI TÄKYNOSTO — lyhyt klikkiotsikkotasoinen lause +
miniatyyrikuva lauseen perässä, houkuttelemassa kohteen auki.

Omistajan tyylivaatimus sanatarkasti: *"Tämä saa olla puhtaasti
keltaisten lehtien klikkiotsikko tasoa! Joku henkilöön liittyvä
skandaali tai muu uskomaton juttu."*
Lisäys 25.8.2026 (ELÄINTÄYT): *"täkyihin ja täkynostoihin myös SÖPÖJÄ
ELÄINJUTTUJA — eläinkuvia ja mahdollisuuksien mukaan live-kameroita."*

**Tila:** kartoitus. EI koodia, EI muutoksia olemassa oleviin
tiedostoihin. Fable valitsee, mitkä näistä viedään peliin ja missä
sanamuodossa.

---

## Kolme sääntöä, jotka pitävät otsikon rehellisenä

1. **Otsikon lupaus lunastetaan.** Jokaisen alla olevan otsikon takana
   on lähteestä tarkistettu tositarina, joka nimenomaan vastaa siihen,
   mitä otsikko lupaa. Jos lunastus ei kanna, otsikko on klikkihuijaus
   eikä täky — ja Perustuslain totuudellisuuspilari kaatuu.
2. **Skandaalit vain kuolleista.** Jokainen alla nimetty henkilö on
   kuollut, ja kuolinvuosi on merkitty. Yhdessäkään nostossa ei ole
   elävää yksityishenkilöä.
3. **13+ ja aikuiset, ei lapsellinen eikä mässäilevä.** Skandaali saa
   olla skandaali (petos, konkurssi, häpeä, kuolema), mutta väkivallan
   yksityiskohdat rajataan pois samalla periaatteella kuin
   takynostot-italia.md:ssä. Rajaukset on merkitty kohteittain.

## Tarkistustapa

- Kaikki faktat haettu en-Wikipediasta 25.8.2026 Noden `fetch`illä
  (`NODE_USE_ENV_PROXY=1`),
  `action=query&prop=extracts&explaintext=1&redirects=1`,
  User-Agent-otsakkeen kanssa ja uusintayrityksin kasvavalla viiveellä.
  Ei mitään muistinvaraista; jokaisen kohdan alla on artikkeli ja se
  osio, johon väite nojaa.
- **Kuvat:** jokaisen ehdotetun Commons-tiedoston olemassaolo, koko,
  lisenssi, tekijä ja `Restrictions`-kenttä on kysytty erikseen
  Commonsin `imageinfo`-rajapinnalla — ei arvattuja tiedostonimiä.
  Kaikkien Restrictions-kenttä oli tyhjä. Kaikki ehdotetut ovat PD,
  CC0 tai CC BY / CC BY-SA.
- "Kuva jo pelissä" tarkoittaa, että kohteella on kuva tiedostossa
  js/packs/nahtavyysjutut.js, europe-valokuvat.js, miniatyyrit.js tai
  maa-kategoriat.js. Ranskan osalta pelissä ovat jo Eiffel-torni,
  Notre-Dame, Louvre, Concorde, Panthéon, Sacré-Cœur, Orsay, Garnier,
  Place des Vosges, Luxembourg, Riemukaari, Lascaux, Bayeux, Bastilji
  ja Mont-Saint-Michel — **yksikään alla olevista nostoista ei käytä
  niitä kuvina.**
- **Live-kamerat:** ks. oma osio lopussa. Niistä on tarkistettu VAIN
  se, että osoite vastaa HTTP 200:lla — ei upotusoikeutta, ei CORSia,
  ei sitä että kamera on juuri nyt käynnissä.

---

## Ehdokkaat 1–10

### 1. "Hän vaati patsaan kaatamista — ja sai laskun: 323 000 frangia, 33 vuoden maksuaikaa"

- **Kohde:** Place Vendôme, Pariisi (takyt-pariisi.md, täky 6 — uusi
  kohde, ei vielä pelissä).
- **Lunastus:** Taidemaalari **Gustave Courbet** (k. 1877) ehdotti
  syyskuussa 1870, että Napoleonin voitonpylväs Place Vendômella
  purettaisiin ja siirrettäisiin Invalidien pihaan, koska se
  "ylläpitää ilmauksellaan sodan ja valloituksen ajatuksia".
  Kommuuni kaatoi pylvään 16.5.1871. Courbet tuomittiin kuudeksi
  kuukaudeksi vankeuteen ja 500 frangin sakkoon — mutta se ei ollut
  loppu. Vuonna 1873 uusi presidentti MacMahon ilmoitti, että pylväs
  rakennetaan takaisin ja laskun maksaa Courbet. Hän pakeni
  Sveitsiin. Toukokuussa 1877 summa lyötiin lukkoon: 323 000 frangia,
  10 000 frangia vuodessa 33 vuoden ajan. Courbet kuoli 31.12.1877 —
  päivää ennen ensimmäisen erän eräpäivää.
- **Lähde:** en-Wikipedia "Gustave Courbet", osiot oikeudenkäynnistä ja
  maanpaosta; en-Wikipedia "Place Vendôme", osio kommuunista.
- **Kuva:** ei pelissä. Commons **Destruction de la colonne Vendôme,
  1871, PH3076.jpg** (5778×3816, CC0, tuntematon valokuvaaja, 1871) —
  aikalaisvalokuva kaatuneesta pylväästä, toimii miniatyyrinä
  sellaisenaan. Vaihtoehto: **Franck, Colonne Vendôme, 1871.jpg**
  (3470×2644, public domain, Franck, 1871).
- **Varmuus:** VARMA — suoraan lähteestä. **RISTIRIITA:** Place
  Vendôme -artikkeli sanoo pylvään nousseen takaisin 1874, Courbetin
  artikkeli ei anna vuotta. Älä käytä paluuvuotta otsikossa.
- **13+:** kommuunin kukistamiseen liittyy verinen viikko; sitä ei
  kerrota tässä nostossa, ja Courbetin tuomio esitetään
  oikeudenkäynnin tuloksena, ei moraalisena arviona.

### 2. "Mies myi Eiffel-tornin romuraudaksi — ja palasi samana vuonna myymään sen uudelleen"

- **Kohde:** Eiffel-torni (JO pelissä: nahtavyysjutut.js, miniatyyrit.js
  ja kulttuuri-kategoriat.js:n nosto "Tornissa on 72 nimeä kullalla").
  Nosto tuo tornille uuden tarinan, ei uutta kuvaa.
- **Lunastus:** Huijari **Victor Lustig** (1890–1947) luki Pariisissa
  1925 lehtijutun siitä, kuinka kallista Eiffel-tornin kunnossapito on.
  Hän palkkasi väärentäjän tekemään valtion kirjelomakkeita, kutsui
  joukon romukauppiaita luottamukselliseen kokoukseen kalliiseen
  hotelliin ja esittäytyi posti- ja lennätinministeriön
  varapääjohtajana: valtio aikoo myydä tornin romuksi, mutta asia on
  arkaluontoinen eikä siitä saa puhua. Hän valitsi uhrikseen André
  Poissonin, joka halusi nousta Pariisin liike-elämän sisäpiiriin, ja
  sai tältä sekä lahjuksen että "kauppasumman" — noin 70 000 frangia.
  Sitten hän pakeni Itävaltaan ja luki lehtiä: Poisson ei ollut
  ilmoittanut poliisille, koska häpesi. Niinpä Lustig palasi Pariisiin
  saman vuoden puolella tekemään saman tempun uudestaan — tällä
  kertaa joku ilmoitti, ja hän pakeni Yhdysvaltoihin.
- **Lähde:** en-Wikipedia "Victor Lustig", osio Eiffel-tornin
  huijauksesta.
- **Kuva:** ei pelissä. Commons **Victor Lustig Mugshot.jpeg**
  (2746×1798, public domain) — pidätyskuva. **HUOM:** kyseessä on
  kuolleen rikollisen viranomaiskuva; se on julkinen ja PD, mutta
  Fablen on päätettävä, sopiiko poliisikuva pelin sävyyn.
- **Varmuus:** VARMA — suoraan lähteestä. **Sanamuoto:** lähde ei anna
  tarkkaa kuukautta toiselle yritykselle ("later that year") — käytä
  "samana vuonna".

### 3. "Kirahvi käveli 900 kilometriä Marseillesta Pariisiin — takki päällä ja kengät jalassa" (ELÄIN)

- **Kohde:** Ménagerie du Jardin des Plantes, Pariisi
  (takyt-pariisi.md, täky 2) sekä Lyon (fokuskohteet-ranska.md,
  kohde 12).
- **Lunastus:** Egyptin varakuningas lähetti 1827 kirahvin Ranskan
  kuninkaalle Kaarle X:lle. Eläin saapui laivalla Marseilleen
  31.10.1826 — kannessa oli sahattu reikä, josta kaula mahtui ulos.
  Merimatkaa Atlantin ympäri pidettiin liian vaarallisena, joten
  päätettiin, että kirahvi kävelee Pariisiin. Luonnontieteilijä Étienne
  Geoffroy Saint-Hilaire, 55, käveli mukana ja teetti eläimelle
  kaksiosaisen keltaisen takin ja kengät. Matka kesti 41 päivää.
  Lyonissa vastassa oli 30 000 ihmistä. Pariisissa kirahvia kävi
  katsomassa yli 100 000 — joka kahdeksas kaupunkilainen. Hiukset
  kammattiin torneiksi, kankaisiin ilmestyi täpliä ja väri nimeltä
  "kirahvin vatsa" myi kaiken. Eläin eli Jardin des Plantes'ssa 18
  vuotta.
- **Lähde:** en-Wikipedia "Zarafa (giraffe)", osiot matkasta ja
  vastaanotosta.
- **Kuva:** ei pelissä. Commons **Nicolas Hüet, the Younger - Study of
  the Giraffe Given to Charles X by the Viceroy of Egypt - Google Art
  Project.jpg** (4793×6392, public domain, 1827) — maalaus juuri tästä
  eläimestä, ja miniatyyriksi täydellinen: yksi eläin, tyhjä tausta.
- **Varmuus:** VARMA. **Nimi:** älä käytä otsikossa nimeä "Zarafa" —
  lähde kertoo, että nimi annettiin vasta 1985; aikalaiset sanoivat
  *la Belle Africaine*.

### 4. "Pariisin koirien hautausmaalla on patsas, jonka teksti valehtelee" (ELÄIN)

- **Kohde:** Cimetière des Chiens, Asnières-sur-Seine
  (takyt-pariisi.md, täky 3 — uusi kohde).
- **Lunastus:** Asnières-sur-Seinen saarelle avattiin 1899
  lemmikkihautausmaa, jota kutsutaan usein maailman ensimmäiseksi
  eläinten nekropoliksi. Siellä lepäävät elokuvatähti Rin Tin Tin,
  näyttelijä Marguerite Durandin lemmikkileijona ja säveltäjä Camille
  Saint-Saënsin eläin. Portilla on monumentti bernhardilaiskoira
  Barrylle (1800–1814), joka pelasti Alpeilla yli neljäkymmentä
  ihmistä. Patsaan teksti kertoo, että neljäskymmenesyhdes tappoi
  hänet — sotilas olisi luullut koiraa sudeksi. Tarina on kaunis eikä
  se ole totta: Barry vietiin kahdentoista palvelusvuoden jälkeen
  eläkkeelle Berniin ja kuoli siellä neljäntoista vuoden ikäisenä.
  Legendan alkuperä on jäljitetty 1800-luvun kirjoittajaan.
- **Lähde:** en-Wikipedia "Cimetière des Chiens et Autres Animaux
  Domestiques" (johdanto); en-Wikipedia "Barry (dog)", osiot
  pelastuksista ja legendasta ("However, the legend of his death is
  untrue").
- **Kuva:** ei pelissä. Commons **Cimetière des Chiens 7,
  Asnières-sur-Seine, France 2013.jpg** (4899×3251, CC BY 2.0, Tommie
  Hansen, 2013) — **SILMÄTARKISTUS** ennen käyttöä.
  **EI KÄYTTÖÖN:** Commonsin 1900-luvun alun postikortit Barryn
  patsaasta ovat Licence Ouverte (Etalab), eivät PD/CC.
- **Varmuus:** VARMA, ja **ristiriita on itse juttu** — monumentti
  sanoo yhtä, museo toista. Tämä on koko listan paras nosto, jos
  halutaan opettaa lähdekriittisyyttä ilman saarnaamista.

### 5. "Eiffel-tornin rakentaja tuomittiin vankeuteen — eikä syynä ollut torni"

- **Kohde:** Eiffel-torni / Gustave Eiffel (torni JO pelissä).
- **Lunastus:** Vuonna 1892 puhkesi Ranskan kolmannen tasavallan suurin
  korruptioskandaali: Panaman kanavaa rakentaneen yhtiön kaatuminen vei
  lähes puoli miljardia frangia, ja 510 kansanedustajaa syytettiin
  lahjusten ottamisesta yhtiön talousvaikeuksien salaamiseksi.
  Oikeudessa tuomittiin myös insinööri **Gustave Eiffel** (k. 1923),
  joka oli ollut mukana hankkeessa — hän sai ensin pitkän
  vankeustuomion, mutta tuomiot **kumottiin myöhemmin**. Kanavayhtiön
  perustaja Ferdinand de Lesseps kuoli 1894, ja skandaali jätti
  jälkeensä maan, jossa poliitikkoihin ei enää luotettu.
- **Lähde:** en-Wikipedia "Panama scandals", johdanto ja osio
  oikeudenkäynneistä ("Lesseps, his son Charles, members of the
  management as well as the engineer Gustave Eiffel, were at first
  given long jail sentences, later annulled").
- **Kuva:** ei pelissä (pelissä on torni, ei Eiffel). Commons
  **Gustave Eiffel 1888 Nadar2.jpg** (2128×3152, public domain, Nadar,
  1888) — Nadarin muotokuva vuodelta 1888, siis vuosi ennen tornin
  valmistumista ja neljä vuotta ennen skandaalia.
- **Varmuus:** VARMA, mutta **otsikko on tässä vaarallinen**: se saa
  luvata vain sen, minkä lähde antaa. Tuomio kumottiin — se on
  kerrottava lunastuksessa heti, ei jätettävä pois. Turvallisin
  otsikkomuoto: **"Eiffel-tornin rakentaja sai vankeustuomion — ja
  syy oli toisella mantereella."**
- **Sävy:** en-artikkeli käsittelee myös skandaalin kytköstä ranskalaisen
  antisemitismin nousuun. Tätä ei viedä nostoon: aihe vaatii
  enemmän tilaa kuin klikkiotsikko antaa, ja pinnallisesti käsiteltynä
  se rikkoo kunnioitussääntöä.

### 6. "Marsalkka tuomittiin kuolemaan — ja katosi vuotta myöhemmin saarilinnasta narua pitkin"

- **Kohde:** Versailles'n Grand Trianon (fokuskohteet-ranska.md,
  kohde 7) ja Île Sainte-Marguerite.
- **Lunastus:** Marsalkka **François Achille Bazaine** (k. 1888)
  antautui Metzissä 1870, ja Ranska etsi tappiolleen syyllistä. Hän
  vaati itse oikeudenkäyntiä puhdistaakseen maineensa. Sotaoikeus
  kokoontui Versailles'n Grand Trianonissa 6.10.1873. Tuomio oli kuolema
  ja sotilasarvon menetys — sekä 300 000 frangin oikeudenkäyntikulut,
  jotka olisivat vieneet perheeltä kaiken. Sama tuomioistuin
  allekirjoitti heti yksimielisesti armonanomuksen, ja presidentti
  MacMahon muunsi tuomion kahdenkymmenen vuoden vankeudeksi. Bazaine
  suljettiin Sainte-Marguerite-saaren linnakkeeseen ja pakeni elokuussa
  1874: 63-vuotias mies solmi pakettinarusta ja matkalaukkuhihnoista
  köyden, kiinnitti sen vesikourupatsaaseen ja laskeutui kalliolta
  veneeseen, jonka hänen vaimonsa oli tuonut Cannes'ista.
- **Lähde:** en-Wikipedia "François Achille Bazaine", osiot
  oikeudenkäynnistä ja vankeudesta.
- **Kuva:** ei pelissä. Commons **Procès Bazaine - Les témoins... -
  btv1b102134148.jpg** (1184×1213, public domain, 1873) —
  aikalaispiirros. **HUOM:** pienehkö; tarkista miniatyyrikoko.
- **Varmuus:** VARMA päivämääristä ja tuomiosta. **Sanamuoto:** lähde
  kutsuu Bazainea syntipukiksi ja lainaa aikalaisarviota, jonka mukaan
  petturuutta ei näytetty toteen. Otsikko saa luvata tuomion ja paon —
  ei syyllisyyttä.
- **1873-KYTKÖS:** oikeudenkäynti alkoi tasan sinä kuukautena, jona
  isoisä oli Pariisissa.

### 7. "Työmies antoi pojalleen kolikoita kuulapeliin — niitä oli 3 210 ja ne olivat kultaa"

- **Kohde:** 53 rue Mouffetard, Pariisi (takyt-pariisi.md, täky 16).
- **Lunastus:** 24.5.1938 purettiin taloja Pariisin rue Mouffetardilla.
  Numero 53:n seinästä paljastui kätkö: kangaskääröihin käärittyjä
  kolikkokääröjä, yhteensä 3 210 kultarahaa Ludvig XV:n ajalta. Yksi
  työmiehistä otti muutaman ja luuli niitä arvottomiksi
  kuparirahoiksi — hän antoi ne pojalleen marmorikuulien tilalle.
  Kätköstä löytyi myös testamentti: kuninkaan sihteeri Louis Nivelle
  oli testamentannut rahat tyttärelleen, mutta kuoli äkilliseen
  sydänkohtaukseen ehtimättä kertoa, missä ne olivat. Löytö jaettiin
  kolmeen osaan: työmiehille, kaupungille sekä talon omistajalle ja
  82:lle todistetulle perilliselle.
- **Lähde:** en-Wikipedia "Treasure of Rue Mouffetard".
- **Kuva:** ei pelissä. Commons **Double Louis-d'or of Louis XV of
  France, 1750 MET 139186.jpg** (1992×1992, CC0, Joseph-Charles
  Roettiers) — **HUOM: ei itse aarre**, vaan saman hallitsijan
  kultaraha. Kuvateksti ei saa väittää muuta.
- **Varmuus:** lähde on **hyvin lyhyt artikkeli** (n. 1 600 merkkiä)
  eikä nimeä lähteitään laajasti. Merkitty siksi: tarkista toisesta
  lähteestä ennen peliin vientiä. Aarrepelin kannalta tämä on koko
  listan osuvin nosto — kirjaimellisesti seinästä löytynyt aarre.

### 8. "Hautausmaalle ei haluttu — joten sinne muutettiin Molièren luut mainokseksi"

- **Kohde:** Père-Lachaise, Pariisi (takyt-pariisi.md, täky 11).
- **Lunastus:** Kun Père-Lachaise avattiin 1804, se oli pariisilaisten
  mielestä liian kaukana: ensimmäisenä vuonna sinne haudattiin 13
  ihmistä. Hallinto keksi markkinointikeinon. Vuonna 1817 järjestettiin
  suuri seremonia, jossa hautausmaalle siirrettiin Jean de La
  Fontainen ja **Molièren** jäännökset, ja pian perään toinen näytös,
  jossa tuotiin väitetyt Pierre Abélardin ja Héloïsen jäännökset
  hautakatoksineen — katos koottiin puretun luostarin paloista. Temppu
  toimi: vuonna 1812 hautauksia oli 833. Abélardin ja Héloïsen haudalle
  jätetään yhä kirjeitä.
- **Lähde:** en-Wikipedia "Père Lachaise Cemetery", osio hautausmaan
  alkuvuosista ("the administrators devised a marketing strategy").
- **Kuva:** ei pelissä. Commons **Haigh - Tomb of Abelard and Heloise
  01.jpg** (2300×3343, public domain, A. C. Pugin / Charles Heath,
  1831) — aikalaiskaiverrus haudasta. Nykyvaihtoehto: **The Tomb of
  Héloïse and Abélard, Père Lachaise cemetery, Paris July 2015.jpg**
  (5982×3984, CC0, Joe deSousa).
- **Varmuus:** VARMA. **Sanamuoto:** Abélardin ja Héloïsen jäännöksistä
  lähde sanoo "purported" — sano "väitetyt". Molièren ja La Fontainen
  siirrosta lähde ei tee varausta.

### 9. "Piiritetyn kaupungin posti kulki kyyhkyillä — ja yksi lintu kantoi kaksikymmentä sanomalehteä" (ELÄIN)

- **Kohde:** piiritetty Pariisi 1870–71 (takyt-pariisi.md, täky 4).
- **Lunastus:** Preussilaiset katkaisivat Pariisin lennätinlangat
  19.9.1870 ja löysivät ja katkaisivat Seinen pohjassa kulkeneen
  salakaapelin 27.9. Ainoa toimiva reitti kaupunkiin päin oli
  kirjekyyhky. Valokuvaaja **René Dagron** (k. 1900), joka oli saanut
  maailman ensimmäisen mikrofilmipatentin 1859, tarjoutui
  pienentämään viestit; sopimus allekirjoitettiin 11.11.1870 hintaan
  15 frangia tuhatta merkkiä kohti. Hän sai kuvat pienenemään yli
  40-kertaisesti: yksi filmi painoi noin 0,05 grammaa, ja yksi kyyhky
  kantoi niitä jopa kaksikymmentä pyrstösulkiin sidotussa putkessa.
  Perillä filmi asetettiin lasilevyjen väliin ja heijastettiin
  taikalyhdyllä seinälle, josta viestit kirjoitettiin puhtaaksi.
  Saksalaiset kouluttivat haukkoja kyyhkyjä vastaan.
- **Lähde:** en-Wikipedia "René Dagron", osio piirityksestä;
  en-Wikipedia "Pigeon post", osio "Siege of Paris".
- **Kuva:** ei pelissä. Commons **Pellicule du Journal Pigeons
  Voyageurs, Souvenir du Siège de Paris, 1870-1871. PH20110 (15 of
  20).jpg** (5047×8008, CC0, René Dagron, 1870–71) — Dagronin oma
  mikrofilmi. Vaihtoehto samasta sarjasta: **(12 of 20).jpg**
  (5601×4375, CC0).
- **Varmuus:** VARMA. **Otsikon tarkkuus:** Dagron kuvasi
  sanomalehtien sivuja kokonaisina, ja yksi kyyhky kantoi jopa 20
  filmiä — otsikon "kaksikymmentä sanomalehteä" on siis tulkinta.
  Turvallisempi muoto, jos halutaan olla tarkkoja: **"Yhden kyyhkyn
  selässä oli kaksikymmentä filmiä, joista jokainen painoi
  kahdeskymmenesosan grammasta."**
- **EI KÄYTTÖÖN:** väite, että haavoittuneita olisi evakuoitu
  kuumailmapalloilla — Siege of Paris -artikkeli kumoaa sen erikseen.

### 10. "Puisto rakennettiin paikalle, jota koko kaupunki oli vältellyt 500 vuotta"

- **Kohde:** Parc des Buttes Chaumont, Pariisi (takyt-pariisi.md,
  täky 12).
- **Lunastus:** Buttes-Chaumont'n kukkulalla sijaitsi Montfauconin
  hirsipuu, jossa teloitettujen ruumiita pidettiin näytteillä
  1200-luvulta vuoteen 1760. Sen jälkeen paikasta tuli kaatopaikka,
  sitten hevosenruhojen paloittelupaikka ja lopulta jätevesivarasto;
  puiston rakentaja Alphand kirjoitti, että paikka "levitti
  tartuntahöyryjä paitsi naapurustoon, myös tuulen suuntaa seuraten
  koko kaupunkiin". Lisäksi mäessä oli kipsilouhos, josta löytyi
  eoseenikauden nisäkäsfossiileja Georges Cuvier'n tutkittaviksi.
  Juuri tämän paikan Haussmann valitsi uudeksi puistoksi. Pelkkään
  maan muotoiluun meni kaksi vuotta; multaa tuotiin omalla
  rautatiellä 200 000 kuutiometriä, työmiehiä oli tuhat, kalliota
  veistettiin räjähteillä ja vesi nostettiin vesiputoukseksi pumpuilla.
  Puisto avattiin 1.4.1867.
- **Lähde:** en-Wikipedia "Parc des Buttes Chaumont", osiot historiasta
  ja rakentamisesta.
- **Kuva:** ei pelissä. Commons **Gezicht op de Temple de la Sibylle in
  het Parc des Buttes-Chaumont in Parijs, RP-F-F05476.jpg** (4280×2090,
  CC0, Rijksmuseum, n. 1867–1880) — aikalaisvalokuva puiston
  ensimmäisiltä vuosilta. Nykyvaihtoehto: **Temple de la Sibylle.jpg**
  (5990×3966, CC BY-SA 4.0, FreCha, 2026).
- **Varmuus:** VARMA — suoraan lähteestä.
- **13+:** hirsipuu mainitaan yhdellä lauseella; teloituksia ei
  kuvailla.

---

## Varapenkki (tarkistettu, ei mahtunut kymmenen joukkoon)

- **"Palatsin kivet myytiin matkamuistoiksi — ja yhdestä rakennettiin
  kokonainen linna Korsikalle."** Tuileries'n palatsi paloi 1871,
  rauniot seisoivat yksitoista vuotta, ja purun 1883 jälkeen yrittäjä
  Achille Picart myi kiviä; osista koottiin Ajaccion lähelle Château de
  la Punta. Lähde: en-Wikipedia "Tuileries Palace". Kuva tarkistettu:
  **Vue des Tuileries après l'incendie de 1871, PH83415.jpg** (3000×2285,
  CC0, Henri Godefroy). Erinomainen nosto, jos halutaan yksitoista
  vuotta seisonut raunio isoisän kaupunkiin.
- **"Pariisin vanhin kivitalo rakennettiin miehen rahoilla, josta
  tehtiin alkemisti vasta 200 vuotta hänen kuolemansa jälkeen."**
  Nicolas Flamelin talo, 51 rue de Montmorency, 1407. Lähde:
  en-Wikipedia "Nicolas Flamel". Kuva: **Vieille maison du XVè siècle,
  maison de Nicolas Flamel... D.3493.jpg** (3933×3008, CC0).
- **"Kaupunki mittaa tulvansa yhden sotilaan patsaasta — vaikkei se ole
  mittari."** Zouave, Pont de l'Alma; 1910 vesi ulottui olkapäihin.
  Lähde: en-Wikipedia "Pont de l'Alma". **HUOM:** sama silta liittyy
  vuoden 1997 kuolemantapaukseen tunnelissa; sitä ei mainita.
- **"Pariisin kapein katu on nimetty kissan mukaan, joka kalasti
  Seinestä" (ELÄIN).** Rue du Chat-qui-Pêche, 1,80 m × 29 m, nimi
  vuodelta 1636. Lähde: en-Wikipedia "Rue du Chat-qui-Pêche". Kuva:
  **Rue du Chat-qui-Pêche (from the Rue de la Huchette) MET
  DP200362.jpg** (1436×1886, CC0, Charles Marville, n. 1868). Tämä on
  kolmas eläinnosto, jos niitä halutaan enemmän kuin kaksi.

---

## Live-kamerat — EI SAA LUVATA PELIIN ILMAN UPOTUSTARKISTUSTA

**Tarkistettu vain HTTP-statuskoodi 25.8.2026** Noden `fetch`illä
(`NODE_USE_ENV_PROXY=1`, `redirect: follow`). **Ei tarkistettu:
upotusoikeutta, käyttöehtoja, CORSia, iframe-sallintaa (X-Frame-Options
/ CSP), kuvan sisältöä eikä sitä, että kamera on käynnissä.** Näitä ei
saa luvata pelaajalle eikä upottaa ennen kuin joku on avannut sivun,
lukenut ehdot ja testannut upotuksen.

Vastasivat 200:lla:

- `https://www.skylinewebcams.com/en/webcam/france/ile-de-france/paris/tour-eiffel.html`
  — Eiffel-torni, Pariisi.
- `https://www.skylinewebcams.com/en/webcam/france.html` — palvelun
  Ranska-hakemisto, josta muut kamerat löytyvät.
- `https://www.chamonix.com/webcams` — Chamonix ja Mont Blanc
  (fokuskohteet-ranska.md, kohde 1). **Huom monikko**: yksikkömuoto
  `/webcam` vastasi 404:llä.
- `https://www.parc-camargue.fr/` — Camarguen luonnonpuiston oma sivu
  (kohde 10). Kamerasivua ei etsitty; tämä on vain lähtöosoite.
- `https://www.jardindesplantesdeparis.fr/` — Jardin des Plantes ja
  sen eläintarha (takyt-pariisi.md, täyt 2 ja 5). Kamerasivua ei
  etsitty.
- `https://www.zoobeauval.com/` — ZooParc de Beauval, Ranskan
  tunnetuin eläintarha. Kamerasivua ei etsitty.
- `https://www.viewsurf.com/` — ranskalainen kameraportaali.

Eivät vastanneet 200:lla (älä käytä näitä osoitteita):

- `https://www.chamonix.com/webcam` → 404.
- `https://www.skylinewebcams.com/en/webcam/france/rhone-alpes/haute-savoie/chamonix.html`
  → 404; oikea osoite on haettava hakemistosta.
- `https://www.mnhn.fr/` → 403 (luonnontieteellinen museo estää
  automaattiset haut; sivu toimii todennäköisesti selaimessa).
- `https://www.cimetiere-des-chiens.fr/` → yhteys epäonnistui
  kokonaan (nimipalvelu- tai verkkovirhe). Koirien hautausmaalle ei
  siis löytynyt toimivaa omaa osoitetta tässä tarkistuksessa.

**Eläinkamerasta huomio:** Ranskan ilmeisin söpö eläinlive olisi
eläintarhakamera (Beauval tai Jardin des Plantes), mutta kummankaan
kamerasivua tai käyttöehtoja EI tarkistettu tässä erässä. Jos
eläinlive halutaan, se on hoidettava omistajan mainitsemaa
PRO-SISÄLLÖNTUOTTAJA-reittiä (Raamattu 25.8.2026: oikeudet ja
nimeämisrivi kirjallisesti).

---

## Yhteenveto ja kolme parasta

**10 varsinaista ehdokasta + 4 varapenkillä, kaikki tarkistettu.**
Yksikään ei jäänyt kokonaan vahvistamatta. Kolmessa kohdassa lähde itse
toteaa asian epävarmaksi, kumotuksi tai kiistellyksi (Barryn kuolema
legendana, Abélardin ja Héloïsen "purported remains", Bazainen
syyllisyys) — merkitty kohdittain. Yksi otsikko vaatii pakollisen
lieventämisen, jottei se valehtele (#5: Eiffelin tuomio kumottiin).
**Eläinnostoja on kolme** (#3 kirahvi, #4 koirien hautausmaa,
#9 kyyhkyposti) ja varapenkillä neljäs (kissakatu), eli omistajan
ELÄINTÄYT-vaatimus täyttyy reilusti.

**Kaikki nimetyt henkilöt ovat kuolleita:** Courbet (1877), Lustig
(1947), Eiffel (1923), Bazaine (1888), Dagron (1900), Nivelle
(1700-luku), Molière (1673), La Fontaine (1695), Haussmann (1891).

**Kolme parasta ehdotustani:**

1. **#1 — "Hän vaati patsaan kaatamista — ja sai laskun: 323 000
   frangia, 33 vuoden maksuaikaa."** Tämä on koko listan täydellisin
   osuma omistajan tilaukseen: aito henkilöskandaali kuolleesta
   henkilöstä, lunastus on lyhyt ja kolmikäänteinen (ehdotus →
   kaataminen → lasku → kuolema päivää ennen eräpäivää), eikä siinä ole
   yhtään herkkää reunaa, joka pitäisi rajata pois. Miniatyyri on
   itsessään koukku: aikalaisvalokuva kaadetusta pronssipylväästä
   keskellä hienoa aukiota. Ja se ankkuroi koko Ranskan isoisän
   vuoteen — päätös laskuttaa Courbetilta tehtiin 1873.

2. **#4 — "Pariisin koirien hautausmaalla on patsas, jonka teksti
   valehtelee."** Paras eläinnosto ja samalla ainoa, joka opettaa
   pelaajalle jotain pelin omasta menetelmästä: kaksi lähdettä, kaksi
   tarinaa, ja se joka on kiveen hakattu on väärä. Söpö kohde
   (koira, joka pelasti neljäkymmentä ihmistä), yllättävä käänne, ei
   yhtään mässäilyä — ja kohde, jossa lepäävät Rin Tin Tin ja
   lemmikkileijona, kantaa myös miniatyyrin.

3. **#3 — "Kirahvi käveli 900 kilometriä Marseillesta Pariisiin —
   takki päällä ja kengät jalassa."** Puhtain "uskomaton tositarina":
   otsikko lupaa absurdin kuvan, ja lunastus antaa tasan sen, useaan
   kertaan (reikä laivan kannessa, keltainen takki, kengät, 41 päivää,
   30 000 ihmistä Lyonissa, joka kahdeksas pariisilainen katsomassa).
   Se on myös ainoa nosto, joka **piirtää kartalle viivan**: Marseille
   (pelilaatta) → Lyon (fokuskohde 12) → Pariisi (pelilaatta). Yksi
   nosto, kolme klikattavaa pistettä.

Kunniamaininnat: **#7 (rue Mouffetardin kultarahat)** on aarrepelin
kannalta osuvin, jos lähde saadaan ristiintarkistettua; **#2 (Lustig)**
on iskevin klikkiotsikko koko listalla ja sopii tornille, joka on jo
pelissä eli ei vaadi uutta kohdetta; **#10 (Buttes-Chaumont)** on
paras, jos halutaan nosto, joka muuttaa tutun näkymän — kaunis puisto,
jonka alla on kaupungin epämiellyttävin historia.
