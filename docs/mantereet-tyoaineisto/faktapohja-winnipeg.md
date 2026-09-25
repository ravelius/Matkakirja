# Winnipeg — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `winnipeg`, maa CAN, en-Wikipedia
"Winnipeg" (pelin wiki-nimi js/packs/northamerica.js: `Winnipeg`).
Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Malli ja mitat luettu tiedostoista
`tools/parvi/kaupunkilehti-ohje.md`, `tools/parvi/kohdekartta-ohje.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md`,
`docs/moduulit/kaupunkilehti.md`. Malli: **Halifaxin ja Lagosin
lehdet**.

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Winnipeg"**,
**"History of Winnipeg"**, **"Red River Colony"**, **"Battle of Seven
Oaks"**, **"Fort Garry"**, **"Red River Rebellion"**, **"Manitoba Act,
1870"**, **"Treaty 1"**, **"Louis Riel"**, **"The Forks, Winnipeg"**,
**"Winnipeg general strike"**, **"Manitoba Legislative Building"**,
**"Golden Boy (Manitoba)"**, **"Winnipeg (bear)"**, **"Harry
Colebourn"**, **"Manitoba Museum"**, **"Nonsuch (1650 ship)"**,
**"Union Station (Winnipeg)"**, **"Countess of Dufferin"**,
**"Winnipeg Railway Museum"**, **"Exchange District"**, **"Burton
Cummings Theatre"**, **"Manitoba Hydro Place"**, **"Canadian Museum
for Human Rights"**, **"St. Boniface Cathedral"**, **"Portage and
Main"**.

## 0. Rajaus tälle lehdelle

**Kanadan maalehti (js/packs/maa-kategoriat.js, CAN) on jo tehty, ja
sen aiheita EI toisteta.** Maalehti kertoo: L'Anse aux Meadows ja
vuosi 1021; Hudson's Bay Companyn peruskirja 1670 ja Rupert's Land;
Charlottetownin kokous 1864 ja Prinssi Edwardin saari; North-West
Mounted Police 1873; **métis-kansan synty turkiskaupan varrella ja
Punaisenjoen kärryt**; toteemipaalu; inuksuk; sisäoppilaitokset;
Banffin kuumat lähteet; Fundynlahden vuorovesi; W. A. C. Bennettin
pato; Wood Buffalo; vaahterasiirappi; kanadanhummeri; leipäriita;
poutine; jääkiekko, koripallo, curling ja katettu areena.
Karttanostot (`js/packs/maastokohteet-can.js`: Mount Logan, Naha Dehé,
Baffininsaari, L'Anse aux Meadows, Craigellachie, Rideaun kanava,
Head-Smashed-In, Dinosaur Provincial Park, Vanha Québec,
Louisbourgin linnoitus, Dawson City), skandaalit
(`js/packs/skandaalit.js`, CAN: Tyynenmeren skandaali 1873, Bre-X) ja
eläintäyt (`js/packs/elaintakyt.js`, CAN: Churchillin karhuputka,
kuikan ääni) on luettu — yksikään ei ole tämän lehden aihe.

**MÉTIS-KANSAN SYNTY ON MAALEHDEN AIHE.** Tämä lehti saa kertoa
Punaisenjoen kapinasta ja Manitoban syntymisestä provinssiksi, mutta
EI toista maalehden nostoa siitä, miten métis-kansa syntyi tai mikä
Punaisenjoen kärry on.

**Tämä lehti pysyy kaupungissa:** kahden joen risteys ja sen linnakkeet,
Selkirkin siirtokunta ja Seitsemän tammen taistelu, vuosi 1873 ja
kaupungin perustaminen, Winnie-karhu, talvi, tulvat ja preeria.

Kaupungin visa on luettu tiedostosta `js/packs/northamerica-questions.js`
(avain `winnipeg`, viisi kysymystä: maa Kanada; Nalle Puh sai nimensä
Winnipegistä; talvi on hyvin kylmä ja pitkä; Red River ja Assiniboine;
métis-kansa syntyi Punaisenjoen laaksossa). **Minitehtävä ei saa kysyä
yhtään näistä viidestä.** Sama tiedosto sisältää kulttuurivisan
(`winnipeg`): preerian portti, Nalle Puh, kahden joen risteys ja
isoisän ääni turkiskaupasta ja omakielisestä kansasta.

Olemassa olevat lohkot on luettu:
- `js/packs/northamerica-saapumiset.js` (`winnipeg`): valmis, ei
  kosketa. Kertoo tuulisimmasta risteyksestä ja Winnie-karhusta, ja
  isoisän nosto sanoo kaupungin saaneen kaupunkioikeudet matkavuonna.
- `js/packs/northamerica-valokuvat.js` (`winnipeg`): **ennen–nyt-pari
  on valmiiksi tarkistettu** (koiravaljakko Fort Garryn portin edessä
  1899 / Esplanade Riel ja ihmisoikeusmuseo). Lisäkuvina The Forks
  Market, Festival du Voyageur ja Portage & Main. Nämä viisi
  tiedostonimeä ovat varattuja.
- `js/packs/northamerica-artikkelit.js`: Winnipegiltä **puuttuu
  merkintä kokonaan** → kirjoitetaan sekä intro (7–10 virkettä) että
  kolmikappaleinen teksti-kenttä.

**1873-KEHYS:** isoisän matkavuonna Winnipeg sai kaupunkioikeudet.
Kaupunki perustettiin **8. marraskuuta 1873** Selkirkin siirtokunnan
ytimen ympärille, ja sen nimen antoi métis-lainsäätäjä ja tulkki
**James McKay**. Manitoba oli ollut provinssi kolme vuotta (Manitoba
Act 1870), Treaty 1 oli allekirjoitettu 3. elokuuta 1871, ja
rautatie tuli vasta 1881. Manitoban ensimmäinen lakiasäätävä
rakennus — hirsitalo A. G. B. Bannatynen tontilla Main Streetin ja
McDermot Avenuen kulmassa — **tuhoutui tulipalossa juuri 1873**.

---

## 1. Nimi ja sijainti

- "Winnipeg is the capital and largest city of the Canadian province
  of Manitoba. It is centred on the confluence of the Red and
  Assiniboine rivers." ("Winnipeg", johdanto)
- Väkiluku 2021: kaupunki 749 607, metropolialue 834 678 — Kanadan
  kuudenneksi suurin kaupunki ja kahdeksanneksi suurin metropolialue.
  Vuonna 2025 kaupunki ylitti 850 000 asukasta (arvio 850 260).
  ("Winnipeg", johdanto)
- Nimi tulee 65 km pohjoisempana olevasta **Winnipegjärvestä**;
  läntisen creen sana `winipīhk` tarkoittaa "mutaista vettä".
  Englantilainen tutkija **Henry Kelsey** saattoi olla ensimmäinen
  eurooppalainen, joka näki järven 1690, ja hän omaksui creen ja
  odžibwen nimen `win-nipi`, "sameaa vettä" tai "mutaista vettä".
  La Vérendrye kutsui järveä nimellä *Lac Gouinipique* tai
  *Ouinipigon* 1730-luvulla. Paikallislehti *The Nor'-Wester* otti
  nimen otsikkoonsa 24. helmikuuta 1866, ja Manitoban lakiasäätävä
  kokous perusti kaupungin sillä nimellä 1873. ("Winnipeg", Etymology)
- Alue on **Anishinaabe (odžibwe), Ininew (cree), oji-cree, dene ja
  dakota** -kansojen perinteistä aluetta ja **métis-kansan
  syntysija**. ("Winnipeg", johdanto)
- Kaupungin pinta-ala 464,08 km²; se on Punaisenjoen laakson pohjalla,
  tulvatasangolla, jonka pinnanmuodot ovat erittäin tasaiset.
  ("Winnipeg", Geography)
- "Gateway to the West"; lännessä ja etelässä **korkearuohopreeria**,
  koillisessa **haapaparkkimaa** (aspen parkland). Kaupungissa on
  **Pohjois-Amerikan suurin jäljellä oleva kypsä kaupunkijalavametsä**.
  Winnipegjärvi on maailman 11. suurin makean veden järvi.
  ("Winnipeg", Geography)
- Neljä isoa jokea: Red, Assiniboine, La Salle ja Seine.
  ("Winnipeg", Geography)

## 2. Kahden joen risteys (The Forks)

- Punaisen- ja Assiniboinejoen yhtymäkohta tunnetaan nimellä
  **The Forks**. Paikka oli **kanoottireittien risteys** jo ennen
  eurooppalaiskosketusta. Arkeologia, kalliopiirrokset ja suullinen
  perinne osoittavat alueen käytön leiripaikkana, keräilyyn,
  metsästykseen, työkalujen tekoon, kalastukseen ja kauppaan.
  ("Winnipeg", Early history)
- Arviot ensimmäisestä asutuksesta vaihtelevat: 11 500 vuotta sitten
  kaupungin lounaispuolella olevalla paikalla, **6 000 vuotta sitten
  Forksissa**. ("Winnipeg", Early history)
- Odžibwet piirsivät ensimmäisiä karttoja **tuohelle**, ja ne auttoivat
  turkiskauppiaita kulkemaan alueen vesireiteillä. ("Winnipeg",
  Early history)
- **Sieur de La Vérendrye** rakensi paikalle ensimmäisen
  turkiskauppa-aseman **Fort Rougen 1738**. Ranskalainen kauppa jatkui
  vuosikymmeniä; brittiläinen Hudson's Bay Company otti alueen
  haltuunsa, kun Ranska luovutti sen seitsenvuotisen sodan tappion
  jälkeen. ("Winnipeg", Early history)
- **North West Company rakensi Fort Gibraltarin 1809** ja Hudson's Bay
  Company **Fort Douglasin 1812**, molemmat nykyisen Winnipegin
  alueelle. Yhtiöt kilpailivat kiivaasti. ("Winnipeg", Early history)
- Yhtiöt yhdistyivät 1821. **Fort Gibraltar nimettiin Fort Garryksi
  1822**, ja siitä tuli Hudson's Bay Companyn alueen johtava asema.
  **Tulva tuhosi linnakkeen 1826**, eikä sitä rakennettu uudelleen
  ennen vuotta **1835**. Jälleenrakennettu osa — **etuportti ja pala
  muuria** — on nykyisin Main Streetin ja Broadwayn kulmassa.
  ("Winnipeg", Early history)
- The Forks on **kansallinen historiallinen kohde**, jossa käy neljä
  miljoonaa kävijää vuodessa. CNR:n ratapiha kunnostettiin ja
  rakennettiin uudelleen 1989, ja Forksista tuli Winnipegin suosituin
  matkailukohde. ("Winnipeg", Culture; Modern history)

## 3. Selkirkin siirtokunta ja Seitsemän tammen taistelu

- **Lord Selkirk** oli mukana ensimmäisessä pysyvässä asutuksessa
  (**Red River Colony**), maan ostossa Hudson's Bay Companylta ja
  jokitonttien mittauksessa 1800-luvun alussa. ("Winnipeg",
  Early history)
- **Métisit ja Selkirkin uudisasukkaat taistelivat Seitsemän tammen
  taistelussa 1816.** ("Winnipeg", Early history)
- Vuonna 1821 Hudson's Bay Company ja North West Company yhdistyivät
  ja pitkä kilpailu päättyi. ("Winnipeg", Early history)
- Vuonna 1805 kanadalaiset uudisasukkaat näkivät First Nations
  -kansojen viljelevän Punaisenjoen varrella; käytäntö laajeni
  nopeasti, koska kauppiaat tarvitsivat muonaa. ("Winnipeg",
  Early history)

## 4. Vuosi 1873 ja kaupungin synty

- Vuosina **1869–70** nykyisen Winnipegin alueella käytiin
  **Punaisenjoen kapina**, métisien väliaikaisen hallituksen (johtaja
  **Louis Riel**) ja Itä-Kanadasta tulleiden uudisasukkaiden välinen
  ristiriita. Kenraali **Garnet Wolseley** lähetettiin tukahduttamaan
  kapina. ("Winnipeg", Early history)
- **Manitoba Act 1870** teki Manitobasta kolmivuotiaan Kanadan
  konfederaation **viidennen provinssin**. ("Winnipeg", Early history)
- **Treaty 1** allekirjoitettiin **3. elokuuta 1871**; se kattoi
  kaupungin ja suuren osan ympäröivää aluetta. Osapuolina olivat
  kruunu ja paikalliset alkuperäiskansat: Brokenhead Ojibway,
  Sagkeeng, Long Plain, Peguis, Roseau River Anishinabe, Sandy Bay ja
  Swan Lake. ("Winnipeg", Early history)
- **8. marraskuuta 1873 Winnipeg perustettiin kaupungiksi**, ytimenä
  Selkirkin siirtokunta. **Métis-lainsäätäjä ja tulkki James McKay
  antoi kaupungille nimen.** Kaupungin tehtäväksi tuli hallinnoida ja
  tuottaa palveluja niille, jotka kauppa Upper Fort Garryn / Lower
  Fort Garryn ja Saint Paulin (Minnesota) välillä oli houkutellut
  paikalle. ("Winnipeg", Early history)
- Manitoban ensimmäinen lakiasäätävän kokouksen tila oli hirsirakennus
  A. G. B. Bannatynen asunnolla Main Streetin ja McDermot Avenuen
  kulmassa, **kunnes se tuhoutui tulipalossa 1873**. Väliaikaisia
  tiloja käytettiin vuoteen 1884. ("Manitoba Legislative Building",
  History)
- Winnipeg kasvoi nopeasti, kun **Canadian Pacific Railway saapui
  1881**. Rata erotti North Endin, jossa asui pääosin
  itäeurooppalaisia, kaupungin varakkaammasta anglosaksisesta
  eteläosasta. ("Winnipeg", Early history)
- **Vuoteen 1911 mennessä Winnipeg oli Kanadan kolmanneksi suurin
  kaupunki.** Kaupunki joutui talousvaikeuksiin, kun **Panaman kanava
  avattiin 1914**: kanava vähensi riippuvuutta Kanadan rautateistä
  kansainvälisessä kaupassa, ja Vancouver ohitti Winnipegin sekä
  vauraudessa että väkiluvussa ensimmäisen maailmansodan loppuun
  mennessä. ("Winnipeg", Modern history)

## 5. Winnie — karhu, josta tuli Nalle Puh

- **Winnipeg** (1914 – 12.5.1934), lempinimeltään **Winnie**, oli
  naaraspuolinen **mustakarhu**, joka eli **Lontoon eläintarhassa
  1915–1934**. ("Winnipeg (bear)", johdanto)
- Ensimmäisen maailmansodan syttyessä elokuussa 1914 luutnantti
  **Harry Colebourn**, ratsuväkirykmentti **The Fort Garry Horsen**
  eläinlääkäri, ilmoittautui palvelukseen. Matkalla Valcartieriin
  Quebeciin hän osti **24. elokuuta 1914** junapysäkillä **White
  Riverissä Ontariossa** karhunpennun **20 dollarilla**. Emo oli
  todennäköisesti tapettu keväällä 1914. Colebourn nimesi karhun
  "Winnipeg Bear", lyhyesti "Winnie", **kotikaupunkinsa mukaan**.
  ("Winnipeg (bear)", History)
- Winnie seurasi häntä Valcartieriin ja Englantiin ja siitä tuli
  Kanadan armeijan eläinlääkintäjoukkojen maskotti. Colebournin
  päiväkirjojen mukaan he lähtivät Gaspé Baystä 3. lokakuuta 1914
  laivalla S.S. Manitou. **Ennen Ranskaan lähtöä Colebourn jätti
  Winnien Lontoon eläintarhaan 9. joulukuuta 1914.** Sodan jälkeen
  hän antoi karhun jäädä sinne. ("Winnipeg (bear)", History)
- **A. A. Milnen poika Christopher Robin** kävi katsomassa karhua
  vuodesta 1924. Hän vaihtoi oman nallensa nimen "Edward Bearista"
  nimeksi "Winnie the Pooh" — yhdistelmä Winnipeg-karhun nimestä ja
  lempinimestä, jonka hän oli antanut aamuisin ruokkimalleen
  joutsenelle. ("Winnipeg (bear)", History)
- Milne kirjoitti vuoden 1926 kirjansa esipuheessa, ettei kukaan enää
  muista, onko Winnie nimetty Poohin mukaan vai Pooh Winnien.
  ("Winnipeg (bear)", History)
- **E. H. Shepard** teki karhusta ainoan tunnetun öljymaalauksensa, ja
  se on esillä **Assiniboine Parkissa**. ("Winnipeg", Culture)

## 6. Ilmasto ja tulvat (teemasivun aineisto)

- Kostea mannerilmasto lämpimin kesin (Köppen **Dfb**): lämpimät,
  kosteat kesät ja pitkät, ankaran kylmät talvet. **Heinäkuun
  keskilämpötila 19,7 °C**; **tammikuun keskilämpötila noin
  −16,4 °C**; talven (joulu–helmikuu) kokonaissademäärä keskimäärin
  **55,2 mm**. Lämpötila laskee ajoittain alle −40 °C:n.
  ("Winnipeg", Climate)
- Keskimäärin **317,8 päivänä vuodessa on mitattavaa auringonpaistetta**,
  eniten heinäkuussa. **2 353 auringonpaistetuntia vuodessa tekee
  Winnipegistä Kanadan toiseksi aurinkoisimman kaupungin.**
  Vuosisademäärä on runsaat **521 mm**. ("Winnipeg", Climate)
- Ukkoset ovat kesällä hyvin yleisiä ja joskus niin voimakkaita, että
  syntyy tornadoja. **Pakkasen purevuusluku (wind chill) on käynyt
  −57,1 °C:ssa**, ja keskimäärin **kahtenatoista päivänä vuodessa**
  purevuusluku alittaa −40 °C. Äärikylmyyteen liittyviä kuolemia on
  kirjattu. ("Winnipeg", Climate)
- Korkein mitattu lämpötila **42,2 °C 11. heinäkuuta 1936**; korkein
  vuorokauden alin **28,3 °C seuraavana päivänä 12. heinäkuuta 1936**.
  **Humidex-lukema 48,0 °C mitattiin 12. heinäkuuta 2026.**
  ("Winnipeg", Climate)
- Hallaton kausi on ankariin talviin nähden pitkä: viimeinen keväthalla
  keskimäärin **23. toukokuuta**, ensimmäinen syyshalla
  **22. syyskuuta**. ("Winnipeg", Climate)
- **Punainen joki nousi korkeimmilleen 1826.** Vuoden **1950** suurtulva
  aiheutti miljoonavahingot ja joukkoevakuoinnit; liittovaltio arvioi
  vahingot yli **26 miljoonaksi dollariksi**, provinssi vähintään
  kaksinkertaisiksi. Tulva sai pääministeri **Duff Roblinin** ajamaan
  **Red River Floodwayn** rakentamista. Vuoden **1997** tulvassa
  patoja vahvistettiin hiekkasäkeillä ja Winnipeg selvisi vähäisin
  vahingoin verrattuna esimerkiksi Grand Forksiin Pohjois-Dakotassa.
  Tulvia oli myös **2009 ja 2011**. ("Winnipeg", Geography; Modern
  history)
- Tasainen maasto ja Punaisenjoen laakson savipohjaisen maan huono
  kuivatus tuottavat **runsaasti hyttysiä** kosteina vuosina.
  ("Winnipeg", Geography)

## 7. Kohdekartan kahdeksan kohdetta (eivät toista lehden juttuja)

Koordinaatit en-Wikipedian geosearch- ja coordinates-rajapinnasta
7.9.2026 (ks. tarkistus-winnipeg.md kohta H: kaikki 28 väliä laskettu
haversinilla).

1. **Manitoban museo** 49.900000 / −97.136667. Manitoba Museum
   (aiemmin Manitoba Museum of Man and Nature), provinssin suurin
   voittoa tavoittelematon perintö- ja tiedekasvatuskeskus.
   Historiallinen ja luonnonhistoriallinen museo, jonka suunnitteli
   1965 Herbert Henry Gatenby Moody. Historical and Scientific Society
   of Manitoba alkoi kerätä perintöä **1879**. Museo avattiin
   **15. joulukuuta 1932** Winnipeg Civic Auditoriumissa yhdessä
   Winnipegin taidegallerian kanssa ja toimi siellä vuoteen 1967.
   **Hudson's Bay Company lahjoitti 1994 kolmensadan vuoden
   kokoelmansa** — museon suurin yrityslahjoitus. Näyttelyn
   päänähtävyys on **Nonsuchin täysikokoinen jäljennös**.
   ("Manitoba Museum"; "Winnipeg", Culture)
   - *Nonsuch* oli ketsi, joka purjehti Hudsoninlahdelle 1668–69
     Zachariah Gillamin komennossa — ensimmäinen kauppamatka sille,
     mistä kaksi vuotta myöhemmin tuli Hudson's Bay Company. Alus
     rakennettiin kauppa-alukseksi 1650; nimi tarkoittaa "ei
     vertaista". Se valittiin pienuutensa vuoksi, jotta se voitiin
     purjehtia jokea ylös ja nostaa vedestä ennen jäätä. Jäljennös
     tilattiin yhtiön 300-vuotisjuhlaan 1970, rakennettiin
     1600-luvun työkaluin ja materiaalein Appledoressa Devonissa,
     ja se asetettiin **pysyvästi näytteille 1973**. Pituus 54
     jalkaa, syväys 6 jalkaa, kuusi kahden naulan suustaladattavaa
     tykkiä. ("Nonsuch (1650 ship)")
2. **Pörssikortteli (Exchange District)** 49.898500 / −97.140300.
   Kansallinen historiallinen kohde, **julistettiin 27. syyskuuta
   1997**. Käsittää **kaksikymmentä korttelia ja noin 150
   perintörakennusta**; tunnettu ehjänä säilyneestä 1900-luvun alun
   varastojen, rahalaitosten ja terrakottapintaisten varhaisten
   pilvenpiirtäjien kokonaisuudesta. Nimi tulee **Winnipeg Grain
   Exchangesta**, Kanadan viljakaupan entisestä keskuksesta, ja
   muista hyödykepörsseistä, joita kaupunkiin syntyi **1881–1918**.
   Winnipegiä kutsuttiin **"pohjoisen Chicagoksi"**; vuoteen 1911
   mennessä yli kaksi tusinaa rautatielinjaa yhtyi keskustan lähellä
   ja kaupungissa oli yli 200 tukkuliikettä. Ensimmäinen maailmansota
   ja Panaman kanava hidastivat kasvua, tukkukauppa siirtyi muualle,
   ja **juuri uudisrakentamisen puute säilytti korttelit** — siksi
   Winnipegissä on nyt yksi Pohjois-Amerikan ehjimmin säilyneistä
   1900-luvun alun liikekaupunginosista. ("Exchange District")
   - *Huom. ristiriita:* "Winnipeg"-artikkeli sanoo **30 korttelia**
     ja viljapörssin toiminta-ajaksi **1880–1913**. Ratkaisu:
     tarkistus-winnipeg.md kohta A.
3. **Burton Cummings -teatteri** 49.895833 / −97.143611. Rakennutti
   paikallinen impressaario **Corliss Powers Walker**; alkuperäinen
   nimi **Walker Theatre**, nimettiin uudelleen laulaja-lauluntekijä
   **Burton Cummingsin** mukaan **2002**. Tontit ostettiin
   heinäkuussa 1905, teatteri rakennettiin 1906–07, ja **avajaiset
   olivat 18. helmikuuta 1907** Puccinin *Madame Butterflyllä*.
   Suunnittelija oli montrealilainen **Howard C. Stone**, jota
   ohjeistettiin tekemään **paloturvallinen** teatteri Chicagon
   Auditoriumin periaatteilla — Walker oli järkyttynyt vuoden 1903
   Iroquois-teatterin palosta ja väitti taloa Kanadan ensimmäiseksi
   paloturvalliseksi teatteriksi. Katsomoon mahtui **1 798** henkeä,
   holvikatto nousee 60 jalkaan, ja **kaksi parveketta rakennettiin
   ilman tukipylväitä**. Lippu maksoi 25 sentistä kahteen dollariin.
   Rakennuskustannus **250 000 dollaria**. Talossa pidettiin
   työväen- ja naisten äänioikeusliikkeen kokouksia, muun muassa
   **Nellie McClungin pilkkaparlamentti**, ja **vuonna 1918
   Winnipegin ammattiyhdistysneuvoston ja Kanadan sosialistipuolueen
   kokous, joka johti yleislakkoon**. Teatteri suljettiin 1933,
   kaupunki takavarikoi sen verovelkojen takia 1936, se muutettiin
   elokuvateatteriksi 1945, palautettiin näyttämökäyttöön 1991 ja
   nimettiin **kansalliseksi historialliseksi kohteeksi 1991**.
   ("Burton Cummings Theatre")
   - Yleislakko: yli **30 000 työntekijää** jätti työnsä toukokuussa
     1919. Lakko päättyi **21. kesäkuuta 1919**, kun mellakkalaki
     luettiin; kaksi lakkolaista kuoli ja ainakin kolmekymmentä
     loukkaantui päivänä, joka tunnetaan nimellä *Bloody Saturday*.
     Lakonjohtaja **J. S. Woodsworth** perusti myöhemmin Kanadan
     ensimmäisen suuren sosialistipuolueen. ("Winnipeg", Modern
     history)
4. **Manitoba Hydro Place** 49.892397 / −97.146400. Manitoba Hydron
   pääkonttoritorni osoitteessa 360 Portage Avenue, liitetty
   Winnipeg Walkway -käytäväverkkoon. **Avattiin syyskuussa 2009**
   Winnipegin neljänneksi korkeimpana rakennuksena ja sai
   **LEED Platinum -sertifikaatin toukokuussa 2012**, mikä tekee
   siitä yhden Pohjois-Amerikan energiatehokkaimmista
   toimistotorneista. ("Manitoba Hydro Place")
5. **Union Station** 49.888889 / −97.134167. Winnipegin kaukojunien
   asema osoitteessa 123 Main Street, **avattu 1911**, tyyliltään
   **beaux-arts**, arkkitehteinä **Warren and Wetmore**. Kolme
   laituria, kahdeksan raidetta; omistaja Via Rail.
   ("Union Station (Winnipeg)")
   - Asemalla, raiteilla 1 ja 2, toimii **Winnipeg Railway Museum**,
     jonka tunnetuin kappale on **Countess of Dufferin** — 4-4-0
     "American"-tyypin höyryveturi ja **ensimmäinen höyryveturi
     Kanadan preeriaprovinsseissa**. Baldwin Locomotive Works rakensi
     sen 1872 Northern Pacific Railwaylle numerolla 21; 1877 se
     myytiin 9 700 dollarilla CPR:n urakoitsijalle Joseph
     Whiteheadille, lastattiin proomulle Fisher's Landingissa
     Minnesotassa ja saapui **Punaistajokea pitkin St. Bonifaceen
     9. lokakuuta 1877** — rahti maksoi 440 dollaria. Veturi on
     nimetty **Dufferinin jaarlittaren**, kenraalikuvernöörin
     puolison mukaan. Se työskenteli Pembinan haaralla Yhdysvaltain
     rajalle, sitten itään Lakeheadiin ja lännessä Goldeniin asti.
     1880-luvun puolivälissä se myytiin sahayhtiölle ja nimettiin
     *The Betsyksi*. Winnipegin kaupunki sai sen lahjaksi 1909.
     ("Countess of Dufferin")
6. **Kanadan ihmisoikeusmuseo** 49.890797 / −97.130997. Kanadan
   kruunuyhtiö ja kansallinen museo The Forksin vieressä.
   Perustettiin **2008** lakimuutoksella (Bill C-42): **ensimmäinen
   uusi kansallinen museo Kanadassa vuoden 1967 jälkeen ja
   ensimmäinen kansallinen museo pääkaupunkiseudun ulkopuolella**.
   Idean isä oli **Izzy Asper**, joka keksi sen 18. heinäkuuta 2000
   ja kuoli 2003 matkalla julkistamaan arkkitehtuurikilpailua; työtä
   jatkoi hänen tyttärensä Gail Asper. Kilpailuun tuli **100
   ehdotusta 21 maasta**, ja voittajaksi valittiin **Antoine
   Predock** Albuquerquesta. Ennen rakentamista arkeologit kaivoivat
   vanhinten kanssa esiin **yli 400 000 esinettä**. Kuningatar
   Elisabet II paljasti peruskiven **3. heinäkuuta 2010**; hän valitsi
   itse kiven **Runnymeden niityltä**, jossa Magna Carta sinetöitiin
   1215, ja kivi koteloitiin **manitobalaiseen Tyndall-kiveen**.
   Viimeinen **1 669 mittatilausleikatusta lasista** asennettiin
   syyskuussa 2012. Avajaisseremonia pidettiin **19. syyskuuta 2014**
   ja museo avattiin yleisölle **27. syyskuuta 2014**. Liittovaltio
   osallistui arviolta 311 miljoonan hankkeeseen 100 miljoonalla.
   ("Canadian Museum for Human Rights"; "Winnipeg", Culture)
7. **Saint-Bonifacen katedraali** 49.889300 / −97.122000.
   Roomalaiskatolinen katedraali St. Bonifacessa, Saint-Bonifacen
   arkkihiippakunnan pääkirkko, joka palvelee Itä-Manitobaa ja
   franko-manitobalaista yhteisöä. **1818** vastasaapunut pastori
   **Norbert Provencher** rakensi kahden työtoverin kanssa
   ensimmäisen kirkon Punaisenjoen itärannalle maalle, jonka
   **Selkirkin jaarli** lahjoitti; hirsirakennus oli 50 × 30 jalkaa
   ja toimi kappelina, asuntona ja kouluna. **1832** Provencher,
   nyt piispa, rakensi ensimmäisen katedraalin. "St. Bonifacen
   kellot" mainitaan **John Greenleaf Whittierin** vuoden 1859
   runossa *The Red River Voyageur*; **17. joulukuuta 1891**
   arkkipiispa Taché soitatti kelloja runoilijan 84-vuotispäivänä.
   **14. joulukuuta 1860** tulipalo tuhosi Provencherin katedraalin;
   piispa Taché keräsi Quebecissä varat kivestä rakennettuun
   toiseen katedraaliin, jonka kellotorni valmistui kahdeksan vuotta
   myöhemmin. Katolisten määrä St. Bonifacessa kasvoi 1888–1906
   luvusta 2 154 lukuun 4 615, ja **15. elokuuta 1906** vihittiin
   uusi, montrealilaisen **Jean-Omer Marchandin** suunnittelema
   katedraali. **22. heinäkuuta 1968** tulipalo tuhosi siitä lähes
   kaiken — ruusuikkunan, messupuvut, vuoden 1860 kellot ja
   seurakunnan arkiston. Jäljelle jäivät **julkisivu, sakaristo ja
   vanhan kirkon muurit**. Vuonna **1972** julkisivun taakse
   rakennettiin uusi, pienempi katedraali (Étienne Gaboury ja Denis
   Lussier). ("St. Boniface Cathedral")
8. **Manitoban parlamenttitalo** 49.884400 / −97.146900.
   Manitoban lakiasäätävän kokouksen kokoontumispaikka ja provinssin
   kahdestoista perintökohde. **Uusklassinen, beaux-arts-tyylinen
   rakennus valmistui 1920**, korkeus 77 metriä. Suunnittelija oli
   **Frank Worthington Simon** (1862–1933) yhdessä **Henry Boddington
   III:n** kanssa. Rakennus on järjestyksessä kolmas: ensimmäinen oli
   hirsitalo, joka **paloi 1873**, toinen avattiin 1884.
   Vuonna **1911** Manitoba julisti arkkitehtuurikilpailun kaikille
   Brittiläisen imperiumin alamaisille arkkitehdeille; palkinto oli
   10 000 dollaria ja 100 000 dollarin palkkio, ja **67 ehdotuksesta**
   valittiin Simonin työ. Rakentaminen alkoi kesällä **1913**;
   **Tyndall-kivi louhittiin Garsonista** noin 20 km koilliseen.
   Vuoteen 1914 mennessä oli piirretty **1 231 arkkitehtipiirustusta**.
   Työ viivästyi lähes seitsemään vuoteen: sota, työvoima- ja
   rahoituspula, yleislakko — ja urakoitsija **Thomas Kelly**, joka
   varasti rakennusaineita omaan taloonsa kolmen korttelin päähän.
   Skandaali johti kuninkaalliseen tutkintakomissioon, pääministeri
   Rodmond Roblinin eroon ja hallituksen vaihtumiseen. Lopullinen
   kustannus oli **9 379 000 dollaria**. ("Manitoba Legislative
   Building")
   - **Kultapoika** (virallisesti *Eternal Youth and the Spirit of
     Enterprise*) on pohjoiseen katsova patsas kupolin päällä,
     mallina roomalainen **Mercurius**. Alaston nuorukainen juoksee
     eteenpäin soihtu toisessa ja viljalyhde toisessa kädessä. Paino
     **1 650 kg**, korkeus varpaasta soihdun kärkeen **5,25 m**,
     päälaesta varpaaseen 4,27 m. Asennettaessa soihdun kärki
     **77 metrissä** oli Winnipegin korkein piste. Simon tilasi
     patsaan kesällä **1915** pariisilaiselta kuvanveistäjältä
     **Georges Gardet'lta**; se valmistui **1918** ja valettiin
     pronssiin Barbedienne'n valimossa — **valimoa pommitettiin,
     mutta patsas säilyi ehjänä**. Kuljetuslaiva otettiin sota
     käyttöön, ja patsas matkusti ruumassa **kaksi kertaa Välimeren
     yli ja viisi kertaa Atlantin yli**, ennen kuin se asennettiin
     **marraskuussa 1919**. ("Golden Boy (Manitoba)"; "Manitoba
     Legislative Building")

## 8. Matkaoppaan aineisto

- **Perille:** Winnipeg James Armstrong Richardson International
  Airport on provinssin ainoa kaupallinen kansainvälinen lentoasema;
  585 miljoonan dollarin uudistus valmistui lokakuussa 2011.
  Kaukojunat lähtevät **Union Stationilta** (Via Rail). Kaupunki on
  rautatiesolmu: CN, CP, BNSF Manitoba ja Central Manitoba Railway.
  Winnipeg on ainoa Vancouverin ja Thunder Bayn välinen suuri
  kaupunki, jolla on suora rahtiyhteys Yhdysvaltoihin rautateitse.
  ("Winnipeg", Transportation)
- **Joukkoliikenne:** julkista liikennettä on ollut **vuodesta 1882**,
  aluksi hevosraitiovaunuilla; sähköraitiovaunut kulkivat 1892–1955,
  bussit tulivat 1918 ja johdinautot 1938–1970. Elokuussa 2025
  Winnipegistä tuli **ensimmäinen kanadalainen kaupunki, jonka
  kalustossa on 60-jalkaisia akkusähköbusseja**. ("Winnipeg",
  Transportation)
- **Keskusta:** virallisia kaupunginosia on **236**. Keskusta on
  **Portage Avenuen ja Main Streetin** risteyksen ympärillä ja kattaa
  noin 2,6 km²; siellä työskentelee yli 72 000 ihmistä ja opiskelee
  yli 40 000. Monet keskustan rakennukset on yhdistetty **Winnipeg
  Walkway** -käytäväverkkoon. ("Winnipeg", Cityscape)
- **Puistot:** suurin puisto on **Assiniboine Park**, jossa ovat
  Assiniboine Park Zoo ja **Leo Molin veistöspuutarha**. Muita suuria
  puistoja ovat Kildonan Park ja St. Vital Park. Osborne Village on
  kaupungin tiheimmin asuttu kaupunginosa. ("Winnipeg", Cityscape)
- **Kulttuuri:** Winnipeg oli **Kanadan kulttuuripääkaupunki 2010**.
  Kaupungissa on **26 kansallista historiallista kohdetta** (2021).
  **Winnipeg Art Gallery** on Länsi-Kanadan vanhin julkinen
  taidegalleria (perustettu 1912), maan kuudenneksi suurin, ja siellä
  on **maailman suurin julkinen nykyinuiittitaiteen kokoelma**.
  **Royal Manitoba Theatre Centre** on Kanadan vanhin
  englanninkielinen aluetteatteri (yli 250 esitystä vuodessa),
  **Le Cercle Molière** St. Bonifacessa Kanadan vanhin teatteriseurue
  (1925) ja **Royal Winnipeg Ballet** Kanadan vanhin balettiryhmä ja
  Pohjois-Amerikan pisimpään yhtäjaksoisesti toiminut. Kanadan
  ensimmäinen jazzkonsertti pidettiin **1914 Pantages Playhouse
  -teatterissa**. ("Winnipeg", Culture)
- **Juhlat:** **Festival du Voyageur** on Länsi-Kanadan suurin
  talvijuhla ja juhlii Punaisenjoen laakson varhaisia ranskalaisia
  kulkijoita. **Folklorama** on maailman suurin ja pisimpään toiminut
  kulttuurijuhla. **Winnipeg Fringe Theatre Festival** on
  Pohjois-Amerikan toiseksi suurin vaihtoehtoteatterifestivaali.
  ("Winnipeg", Festivals)
- **Ruoka:** kaupungissa on omia ruokia ja valmistustapoja etenkin
  makeisissa ja **kuumasavustetussa kalassa**; omia jälkiruokia ovat
  **schmoo torte** ja **wafer pie**. ("Winnipeg", Culture)
- **Kieli ja väestö:** yli sataa kieltä puhutaan; 65 % puhuu
  äidinkielenään englantia, 2,8 % ranskaa. **St. Boniface on
  Länsi-Kanadan suurin frankofonialue**, jossa 25 % osaa ranskaa.
  Winnipegissä on suurin alkuperäiskansojen osuus (12,4 %) ja
  lukumäärä (90 995) minkään Kanadan suuren kaupungin osalta, ja
  suurin métis-väestö sekä osuutena (6,5 %) että lukumääränä
  (47 915). Maahanmuuttajia oli 2021 yhteensä 201 040 eli 27,3 %;
  yleisimmät lähtömaat Filippiinit (30,9 % maahanmuuttajista),
  Intia (13,7 %) ja Kiina (4,4 %). **Winnipegissä on suurin
  filippiiniläisväestön osuus (11,3 %) Kanadan suurista
  kaupungeista.** ("Winnipeg", Demographics)
- **Talous:** monipuolinen; suurimmat työllistäjät terveydenhuolto ja
  sosiaalipalvelut (14 %), vähittäiskauppa (11 %), teollisuus (8 %) ja
  julkishallinto (8 %). **Royal Canadian Mint** perustettiin 1976 ja
  lyö kaikki Kanadan kiertorahat sekä rahaa monille muille maille.
  ("Winnipeg", Economy)
- **Yliopistot:** **Manitoban yliopisto** perustettiin **1877**, ja se
  on **Länsi-Kanadan ensimmäinen yliopisto**. Université de
  Saint-Boniface on kaupungin ranskankielinen yliopisto.
  ("Winnipeg", Education)
- **Tiede:** **National Microbiology Laboratory** on yksi maailman
  harvoista biotuvallisuustason 4 laboratorioista. Kaupungin
  juomavesi tuodaan **akveduktia pitkin Shoal Lakelta**.
  ("Winnipeg", Infrastructure)
