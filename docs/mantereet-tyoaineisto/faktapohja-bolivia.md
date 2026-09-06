# Bolivia-maalehti (ISO-3: BOL) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 6.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipedian raakatekstistä. Ensisijainen reitti oli
`api.php?action=query&prop=extracts&explaintext=1` (`NODE_USE_ENV_PROXY=1`,
User-Agent `Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`); kun
rajapinta vastasi toistuvasti 429:llä (parvi kuormitti samaa IP:tä), sama
artikkeli haettiin saman wikin osoitteesta `index.php?action=raw`, joka
palauttaa artikkelin wikitekstin. Molemmat ovat en-Wikipedian omaa
raakatekstiä, eikä mitään ole kirjoitettu muistista. Lyhyt faktapohja: vain
ne luvut, päiväykset ja nimet, jotka päätyivät `js/packs/maa-kategoriat.js`:n
BOL-lohkoon, sekä ristiriidat. Rakenteen sitova lähde
docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Historia, Luonto, Ruoka, Musiikki, Kuvataide.**
Minitehtävä on Ruoka-sivulla.

**Rajaus.** Boliviassa on yksi pelikaupunki, Santa Cruz (`CITY_COUNTRY`
`santacruz: BOL`), eikä sillä ole `KULTTUURI_KATEGORIAT`-lohkoa — päällekkäisyyttä
kaupunkilehteen ei siis ole. Karttanostot sen sijaan kattavat jo paljon:
`js/packs/maastokohteet-bol.js` sisältää Nevado Sajaman, Illimanin,
Desaguaderon, Tiwanakun, Cerro Ricon, Sucren kaupungin, Chiquitosin
jesuiittalähetysasemat, Yungas-tien, Salar de Uyunin, Oruron karnevaalin ja
El Fuerte de Samaipatan; `js/packs/skandaalit.js` Cochabamban vesisodan
(1999–2000) ja vuoden 1980 kokaiinivallankaappauksen;
`js/packs/elaintakyt.js` boliviandelfiinin. **Maalehti ei koske yhteenkään
näistä.** Siksi historiaosastossa ei puhuta Potosín hopeasta eikä Sucren
kaupungista, luonto-osastossa ei ole Uyunia, Sajamaa eikä Illimania,
musiikkiosastossa ei ole Oruron karnevaalia, diabladaa eikä Chiquitosin
barokkia, ja kuvataideosaston Potosí-maininnat rajoittuvat siihen, missä
Holguín ja Guzmán de Rojas asuivat. Alcide d'Orbigny esiintyy sekä
eläintäyssä (boliviandelfiini 1832) että tässä lehdessä (Puya raimondii
1830) — sama henkilö, eri laji ja eri tarina.

**Herkät aiheet.** Nykypolitiikka on jätetty kokonaan pois (M3:n
Myanmar-linja): vuoden 1952 vallankumouksesta kerrotaan vain yleinen
äänioikeus maaintrossa, merenmenetys kuvataan tapahtumina eikä nykyisenä
vaatimuksena, eikä Túpac Katarin teloitustapaa kuvata. Kokalehden
nykykiistat on jätetty pois; koka mainitaan vain Katarin ammattina, kuten
lähde sen kertoo.

## 1. Historia

- **Túpac Katari** (en-Wikipedia "Túpac Katari", johdanto sekä osiot
  "Biography", "Rebellion against Spanish rule" ja "Legacy"): syntyi
  **Julián Apasa Nina**, n. **1750**; aymara, työskenteli **kokan ja verkakankaan
  kauppiaana**. Otti nimen kahden aiemman kapinajohtajan, **Tomás Katarin ja
  Túpac Amarun**, mukaan; **katari = käärme aymaraksi**, **amaru sama ketšuaksi**,
  **tupac = loistava** molemmissa. Vuonna **1781** kokosi noin **40 000 sotilaan**
  joukon ja **saartoi La Pazin 13. maaliskuuta 1781**. Piti hoviaan **El Altossa**
  vaimonsa **Bartolina Sisan** kanssa; piiritys kesti **109 päivää maaliskuusta
  kesäkuuhun**. Piiritys uusittiin elokuussa ja **murrettiin 17.10.1781**
  Limasta ja Buenos Airesista tulleilla joukoilla. **Laki 3102 (15.7.2005)**
  nimesi Julián Apazan ja Bartolina Sisan **aymarojen kansallissankareiksi**.
  Bolivian ensimmäinen tietoliikennesatelliitti on **Túpac Katari 1**, ja
  vuodesta **2019** hänen kuvansa on **200 bolivianon setelissä**.
  *(RISTIRIITA ARTIKKELIN SISÄLLÄ: johdanto ja "Legacy" antavat
  kuolinpäiväksi 13.11.1781, "Execution"-osio 15.11.1781. Kumpaakaan ei ole
  kirjoitettu lehteen. Sama artikkeli antaa piiritykselle kaksi
  aikataulua — 109 päivää maaliskuusta kesäkuuhun ja toinen piiritys
  elokuusta lokakuuhun; lehteen on otettu vain ensimmäinen ja sen kesto.)*
- **Nimi ja itsenäisyys** (en-Wikipedia "Bolivia", osiot "Etymology" ja
  "Independence and subsequent wars"): vapaustaistelu alkoi **Sucressa
  25.5.1809**, ja Chuquisacan kapinaa kutsutaan **Latinalaisen Amerikan
  ensimmäiseksi vapaudenhuudoksi**; La Pazin kapina seurasi **16.7.1809**.
  **Kuudentoista vuoden** sodan jälkeen tasavalta julistettiin **6.8.1825**.
  Bolívar antoi **Antonio José de Sucrelle** kolme vaihtoehtoa: liittää
  Charcas Peruun, liittää se Río de la Platan yhdistyneisiin provinsseihin
  tai julistaa se itsenäiseksi valtioksi; Sucre valitsi kolmannen.
  Ensimmäinen nimi oli **Bolívarin tasavalta**; kansanedustaja **Manuel Martín
  Cruz** ehdotti: *"Si de Rómulo, Roma; de Bolívar, Bolivia."* Nimi
  hyväksyttiin **3.10.1825**. Vuoden **2009** perustuslaki muutti virallisen
  nimen **Bolivian monikansaiseksi valtioksi**, ja **36 alkuperäiskansojen
  kieltä** sai virallisen aseman.
- **Kymmenen sentin vero ja rannikon menetys** (en-Wikipedia "War of the
  Pacific", johdanto sekä osiot "Ten Cents' Tax", "Chilean invasion of
  Antofagasta", "Flow of information" ja "Peace treaty between Bolivia and
  Chile"): **14.2.1878** Bolivian kongressi hyväksyi vuoden 1873 toimiluvan
  ehdolla, että **Compañía de Salitres y Ferrocarril de Antofagasta (CSFA)**
  maksaa **kymmenen sentin veron quintalilta**; yhtiö kieltäytyi vedoten
  **vuoden 1874 rajasopimukseen**. Vero keskeytettiin huhtikuussa 1878 ja
  otettiin uudelleen käyttöön joulukuussa. **6.2.1879** Bolivia mitätöi luvan
  ja takavarikoi omaisuuden; **huutokauppapäivänä 14.2.1879** noin **200
  chileläistä sotilasta** valtasi **Antofagastan ilman vastarintaa** (kaupungin
  väestöstä **93–95 % oli chileläisiä**). Sota julistettiin **Bolivian ja Chilen
  välillä 1.3.1879**, Chilen ja Perun välillä 5.4.1879. **La Pazissa ei ollut
  lennätintä**: uutiset Antofagastasta, Aricasta ja Tacnasta kuljetettiin
  **jalan tai hevosella**, ja maan **ainoa lennätin oli Tupizassa, 606 km La
  Pazista**. **Aselepo 1884**, ja **vuoden 1904 rauhan- ja ystävyyssopimus**
  luovutti Antofagastan alueen Chilelle; vastineeksi Chile lupasi rakentaa
  **Arica–La Paz -radan** ja taata vapaan kauttakulun. Bolivia on menettänyt
  itsenäistymisensä jälkeen **yli puolet alueestaan**.
- **Merivoimat ilman merta** (en-Wikipedia "Bolivian Navy", johdanto ja osio
  "Organization"; "Eduardo Abaroa", johdanto ja "Legacy"): **joki- ja
  järvivoimat (Fuerza Fluvial y Lacustre) perustettiin tammikuussa 1963**
  neljällä Yhdysvalloista saadulla veneellä ja **1 800 miehellä**, jotka
  siirrettiin maavoimista; nimi muuttui **Bolivian merivoimiksi tammikuussa
  1966**. Vahvuus **noin 5 000 henkeä (2018)**, **kymmenen laivastopiiriä**;
  laivueiden esikunnat **Guaquissa, Guayaramerínissä, Puerto Suárezissa,
  Riberaltassa ja San Pedro de Tiquinassa**, ja merivoimilla on läsnäolo
  **Titicacajärvellä**. Vuosittain vietetään **Día del Mar**. **Eduardo Abaroa**
  (13.10.1838 – **23.3.1879**) kaatui **Topáterin taistelussa** Calaman luona,
  joka oli **sodan ensimmäinen aseellinen yhteenotto**; hänen kuolinpäivänsä on
  meren päivä, ja hänen mukaansa on nimetty **Eduardo Avaroan andilainen
  luonnonsuojelualue**.

## 2. Luonto

- **Madidin kansallispuisto** (en-Wikipedia "Madidi National Park",
  johdanto sekä osiot "Location", "Flora" ja "Wildlife"): perustettu **1995**,
  pinta-ala **18 958 km²**; **Wildlife Conservation Society** nimesi sen **2018**
  **maailman lajirikkaimmaksi kansallispuistoksi**. Korkeusväli **180–5 760 m**.
  **Yli 8 000 putkilokasvilajia**; **1 254 lintulajia = noin 14 % maailman noin
  9 000 lintulajista**; **272 nisäkäslajia, 496 kalalajia, 213 sammakkoeläintä,
  204 matelijaa**. Uuden hyppyapinalajin **nimeämisoikeus huutokaupattiin**;
  voittaja maksoi **650 000 dollaria** rahastoon, jonka tuotto palkkaa
  **neljätoista puistovartijaa vuodessa**, ja laji nimettiin **Plecturocebus
  aureipalatii**. Chalalán-ekomaja on **San José de Uchupiamonasin**
  yhteisön omistama.
- **Laguna Colorada ja jamesinflamingo** (en-Wikipedia "Laguna Colorada",
  johdanto sekä osiot "Water composition" ja "Fauna"; "James's flamingo",
  johdanto sekä osiot "Description", "Ecology → Feeding" ja "Conservation
  status"): matala hypersaliininen järvi **noin 4 278 metrissä** Eduardo
  Avaroan suojelualueella; **punainen väri** tulee sedimenteistä ja
  suolaympäristöön sopeutuneesta levästä **Dunaliella salina**; pinnalla on
  **valkoisia booraksisaaria**. **Ramsar-kohde 1990**; aluetta laajennettiin
  **13.7.2009** 513,18 km²:stä **14 277,17 km²:iin**. Järvi on **jamesinflamingon
  keskeinen pesimäalue**. Lajia **pidettiin sukupuuttoon kuolleena, kunnes kanta
  löytyi syrjäiseltä alueelta 1956**. Nimi tulee brittiläisestä **Harry Berkeley
  Jamesista**, chileläisen salpietarikaivoksen johtajasta. Pituus **90–92 cm**,
  paino **noin 2 kg**; nokassa **noin 21 siivilälevyä senttimetriä kohti**, yli
  kaksi kertaa enemmän kuin muilla flamingoilla, ja ravinto on **21–60 µm:n
  piileviä**. Kolme varvasta, ei takavarvasta.
- **Puya raimondii (titanka)** (en-Wikipedia "Puya raimondii", johdanto sekä
  osiot "Taxonomy", "Description" ja "Ecology"): **maailman suurin bromelia**,
  kukinto **jopa 15 m**. **Alcide d'Orbigny** kohtasi kasvin **1830 Vacasissa
  Cochabamban departementissa 3 960 metrissä**, mutta yksilöt olivat
  kukkimattomia eikä hän saanut niitä luokitelluksi. **Antonio Raimondi**
  julkaisi lajin nimellä *Pourretia gigantea* teoksessaan *El Perú* (**1874**);
  **Hermann Harms** antoi nimen **Puya raimondii 1928**. Runko **jopa 4 m**,
  rosetin lehdet **1–1,25 m**. Kukkien määräksi Raimondi arvioi **yli 8 000**,
  Anthony Huxley **20 000**. Siemeniä arviolta **12 miljoonaa** yksilöä kohti.
  Elinikä **40–100 vuotta**; **monokarppinen** — kuolee kukinnan jälkeen eikä
  lisäänny kasvullisesti lainkaan.
- **Llanos de Moxos** (en-Wikipedia "Llanos de Moxos", johdanto sekä osiot
  "Setting", "People" ja "Conservation and threats"): trooppinen savanni
  **Benin departementissa**, **126 100 km²**; **jopa puolet tulvii vuosittain**.
  Esikolumbiaanisia maarakenteita: **korotettuja peltoja, penkereitä,
  kanavia ja noin 4 700 metsäsaarta** noin **50 000 km²:n alueella**; rakentaminen
  **n. 8850 eaa. – n. 1450 jaa.** **Maniokkia viljeltiin n. 8350 eaa.**, kurpitsaa
  n. 8250 eaa. ja **maissia n. 4850 eaa.**; maniokki, kurpitsa, maapähkinä sekä
  osa chileistä ja pavuista ovat geneettisesti hyvin lähellä alueen
  villilajeja. **Ramsar 2013: tuolloin maailman laajin suojeltu kosteikko.**

## 3. Ruoka

- **Salteña** (en-Wikipedia "Salteña", johdanto sekä osiot "History" ja
  "Josepha de Escurrechea"): uunissa paistettu empanada, jonka täyte on
  **hyytelöpohjainen muhennos**: kiinteä kylmänä, **sulaa uunissa**. Taikina on
  **kova ja makea**, toisin kuin muissa empanadoissa. **La Pazissa ja Santa
  Cruzissa** salteña syödään **aamupäivän välipalana, etenkin sunnuntaisin**;
  myynti käy **klo 7:stä puoleenpäivään**, ja useimmilta myyjiltä ne loppuvat
  aamupäivän aikana. **Cochabamba ja Sucre** kilpailevat parhaan version
  maineesta. Muunnos syntyi **Potosíssa 1500-luvulla**. **Bolivian ja koko alueen
  ainoa siirtomaa-ajan reseptikirja on Doña Josepha de Escurrechean
  (Potosí 1776)**, jonka **Beatriz Rossells Montalvo** löysi ja todensi; siinä
  empanadoihin on lisätty **peruna ja ají**, kaksi amerikkalaista ainesta.
  *(Artikkeli sanoo suoraan, että legenda **Juana Manuela Gorritista**
  salteñan keksijänä on **ilman asiakirjaperustaa** — sitä ei ole kirjoitettu
  lehteen.)*
- **Chuño** (en-Wikipedia "Chuño", johdanto sekä osiot "Origins",
  "Production" ja "Preservation and consumption"): **viisipäiväinen prosessi**,
  jossa kitkerä, pakkasenkestävä perunalajike **jäätyy ylängön yöpakkasessa ja
  kuivuu päivän auringossa**. Sana tulee ketšuan **ch'uñu** = jäätynyt peruna.
  Valmistus **kesä–heinäkuussa**, lämpötila **noin −5 °C**, korkeus **yli 3 800 m**;
  perunat ovat maassa **noin kolme yötä**. Sen jälkeen ne viedään
  **chuñochinapampalle** (aymaraa, *"paikka jossa chuño tehdään"*), jossa
  **perhe polkee jaloillaan** loput vedestä ja kuoret pois. **Valkoinen chuño**
  syntyy pesemällä (**Boliviassa tunta**), **musta chuño** ilman pesua. Tuote
  **säilyy vuosikymmeniä**. **Chairo**-keitto ei bolivialaisittain ole chairo
  ilman jauhettua chuñoa. *(Carl Trollin väite, että chuñon mahdollistanut
  yöpakkanen edisti inkavaltakunnan nousua, on jätetty pois — se on tulkinta,
  ei fakta.)*
- **Singani** (en-Wikipedia "Singani", johdanto sekä osiot "History",
  "Legal environment" ja "Use"): **Muscat of Alexandria** -valkorypäleestä
  tislattu **eau-de-vie**, jota tehdään **vain Boliviassa**; kansallisjuoma ja
  kulttuuriperintöä. Sääntely vaatii viinitarhojen olevan **vähintään
  1 600 metrissä**; rypäleitä kasvatetaan **1 600–2 800 metrissä** (5 250–9 200
  jalkaa), esimerkiksi **San Juan del Oron** tarhat ovat 8 850 jalassa.
  **Ylin asetus 21948 (1988)** ja **laki 1334 (1992)**. **Yksi rypälelajike, ei
  koskaan sekoitettu.** Tuotantoala **noin 20 000 eekkeriä** (≈ 8 000 ha), kun
  konjakilla on 220 000 eekkeriä (≈ 89 000 ha) ja samppanjalla 83 000.
  **Chuflay**: 1800-luvulla Andeille tulleet **brittiläiset ja yhdysvaltalaiset
  ratainsinöörit** kaipasivat kotoista *gin on gin* -juomaa (gini +
  inkiväärikalja); kun kumpaakaan ei ollut, he sekoittivat **singania ja
  kuplivaa juomaa**. Rautatiesanan **shoofly** merkitys on *"väliaikainen
  kiertoraide, kiertotie"*, ja juomasta tuli **chuflay** (*El diccionario de
  bolivianismos*, 1967). Nykyään tuotanto on keskittynyt **Tarijaan**.
  *(Artikkelin sucumbé-kappale on merkitty lähteettömäksi
  ({{Citation needed}}) eikä sitä ole käytetty.)*
- **Kinua** (en-Wikipedia "Quinoa", johdanto sekä osiot domestikaatiosta,
  "Production", saponiinia käsittelevä kappale ja "International Year of
  Quinoa"): *Chenopodium quinoa*, ketšuan **kinwa**; **kesytetty Titicacajärven
  ympäristössä** Bolivian ja Perun Andeilla. Kasvaa **yli 4 000 metriin**.
  Siemeniä peittää kitkerä **saponiini**kerros, joka tekee niistä
  syömäkelvottomia — **kitkeryys karkottaa linnut, joten kasvi vaatii vain
  vähän suojelua**; kauppaan tuleva kinua on käsitelty kerroksen poistamiseksi.
  **YK:n yleiskokous julisti vuoden 2013 kansainväliseksi kinuavuodeksi**
  andilaisten kansojen perinteen tunnustuksena. **Vuonna 2023 maailman
  tuotanto oli 112 251 tonnia: Peru 62 % (70 479 t) ja Bolivia 37 %
  (41 380 t)**. **Hintanousu 2004–2011** toi tuloja mutta myös **monokulttuureja**
  ja huolen perinteisten kuluttajien hintakestosta.

## 4. Musiikki

- **Los Jairas ja peña Naira** (en-Wikipedia "Los Jairas", johdanto ja
  siteeratut tutkijakommentit; "Ernesto Cavour", johdanto): yhtye **perustettiin
  1965**, kokoajana laulaja **Edgar "Yayo" Jofré**, joka kokosi ryhmän
  soittamaan **La Pazin peña Naira -kahvilaan**. Kokoonpano: **Ernesto Cavour**
  (charango), **Edgar Jofré** (laulu, rummut, zampoña), **Julio Godoy** (kitara)
  ja sveitsiläinen **Gilbert Favre** (quena); Favre oli **entinen
  dixieland-klarinetisti**, joka **kuuli quenan ensi kerran Euroopassa** ja
  muutti Boliviaan 1966. Myöhemmin mukana **Alfredo Domínguez**. Vakiokokoonpano
  oli **quena, kitara, charango ja bombo** — soittimia, joita **ei ollut ennen
  soitettu yhdessä**, koska kullakin oli oma vuodenkiertonsa vuoristokylissä.
  **Neljän hengen koko teki kansainväliset kiertueet mahdollisiksi**, ja
  ulkomainen huomio sai bolivialaiset itse **suhtautumaan vakavasti
  soittimiin, joita oli aiemmin pidetty pelkkinä "cosas de indios"**. Malli
  levisi: **Los Kjarkas, Savia Andina, Khanata, Los Quipus, Wara, Grupo Aymara**.
  Cavour **perusti 1962 Museo del charangon**, josta tuli **Museo de
  Instrumentos Musicales de Bolivia** (**2 000 soitinta**); hän kuoli 2022.
  *(Lehteen on kirjoitettu vain se, minkä artikkeli sanoo suoraan; Favren
  soittotekniikan yksityiskohdat on jätetty pois.)*
- **Saya afroboliviana** (en-Wikipedia "Saya (art form)", johdanto sekä osiot
  "Background" ja "Dances derived from the saya"; "Afro-Bolivians", osio
  "Saya music"): **afrobolivialaisten musiikkia ja tanssia Yungasin alueelta**,
  ja sitä pidetään **keskeisenä vaikuttajana Bolivian musiikissa**.
  **Termin alkuperä on tuntematon**; artikkelin mukaan on esitetty sekä
  latinaa että **kikongoa** (*nsaya*, laulaminen yhteisen työn ääressä).
  Sayasta on **johdettu muita tansseja**, tunnetuimpana **caporales**, jonka
  **Estradan veljekset esittivät ensi kerran 1969**; sen hahmo on **hacienda-
  tilan työnjohtaja (caporal)**, eikä tanssi ole afrobolivialainen, mutta
  **nimet ja rytmit menevät usein sekaisin**. Sayan asu on **kevyempää
  materiaalia ja väljemmin leikattu** kuin caporales-puku. Nykyään saya
  toimii afrobolivialaisille **oman identiteetin ilmaisuna ja
  vahvistamisena**.
- *(TYÖNJAKO PERUN KANSSA: charango ja siku ovat jo Perun maalehden
  musiikkisivulla, samoilla Commons-kuvilla. Ensimmäinen luonnos toisti ne;
  `tools/tarkista-maa.mjs` paljasti toiston kuvaduplikaatteina, ja molemmat
  nostot vaihdettiin. Charango ja siku mainitaan Boliviassa vain
  soitinluettelona Los Jairasin ja Los Kjarkasin yhteydessä.)*
- **Llorando se fue ja Lambada** (en-Wikipedia "Llorando se fue", johdanto
  sekä osiot "Original version by Los Kjarkas", "Cuarteto Continental
  version", "Márcia Ferreira version" ja "Kaoma version"; "Los Kjarkas",
  osiot "Name origin", "History" ja "Llorando se fue, and the Lambada
  plagiarism controversy"): **Los Kjarkas** on **Capinotasta, Cochabamban
  departementista**; **perustettu 1965**, perustajina **Gonzalo, Élmer ja Ulises
  Hermosa** sekä Gastón Guardia ja Ramiro de la Zerda. Nimi tulee ketšuan
  sanasta **"rohkea"**. **"Llorando se fue" levytettiin 1981** albumille *Canto
  a la mujer de mi pueblo* ja julkaistiin **1982** singlen "Wa ya yay"
  B-puolena; rytmi on **saya**, afrobolivialainen tyyli, ja A-motiivi on
  epätavallisesti **kolmen tahdin mittainen**. Coverit: **Cuarteto Continental
  1984** (cumbia, haitari), **Márcia Ferreira 1986** (laillinen portugalinkielinen
  *Chorando se foi*), **Kaoma 1989** nimellä **"Lambada"** — **luvaton**, ja tekijäksi
  merkittiin keksitty **"Chico de Oliveira"**, joka **Le Monden** paljastuksen
  mukaan oli tuottaja **Olivier Lorsacin** salanimi. **Los Kjarkas ja Ferreira
  voittivat oikeudenkäynnin**, ja **1991 ranskalainen tuomioistuin määräsi
  oikeat tekijät merkittäviksi kaikkiin tuleviin julkaisuihin**. Nykyään
  tekijöiksi on merkitty Ulises Hermosa, Gonzalo Hermosa, Alberto Maraví,
  Márcia Ferreira ja José Ari. Melodiaa on myöhemmin sampattu mm.
  **Don Omarin "Taboo" (2011)** ja **Jennifer Lopezin "On the Floor" (2011)**
  -kappaleissa. **Vuoteen 1990 mennessä yhtye oli hyväksynyt käännökset 42
  kielelle.**
- **Luzmila Carpio** (en-Wikipedia "Luzmila Carpio", johdanto sekä osiot
  "Early life", "Career", "Works" ja "Honours"): syntyi **1949 Qala Qalassa**
  Ayllu Panacachin lähellä **Pohjois-Potosín departementissa**; oppi lapsena
  **ketšuan ja aymaran arkilaulut**. **Yksitoistavuotiaana** hän matkusti
  **Oruroon** laulamaan radion sunnuntaiseen lastenohjelmaan; kun hän aloitti,
  **pianisti huusi: "¡Esto lo cantan los indios! ¡Vuelve cuando sepas cantar
  en castellano!"** ("Tuollaista laulavat intiaanit! Tule takaisin, kun osaat
  laulaa espanjaksi!"). Carpio **juoksi ulos itkien mutta päätti palata
  seuraavana sunnuntaina**. **15-vuotiaana** hän liittyi Los Provincianos
  -yhtyeeseen. Hän valitsi **laulaa ketšuaksi espanjan sijaan**. **Yli 25
  albumia ja yli 120 sävellystä.** **Bolivian suurlähettiläs Ranskassa
  2006–2010.** *Yuyay Jap'ina Tapes* oli **Rolling Stonen** vuoden 2015
  kymmenen parhaan latinalaisen albumin listalla; **Ordre National du Mérite
  -kunniamerkki 2011**.
  *(HUOMIO: artikkelissa on {{One source}} -merkintä. Lehteen otetut kohdat
  — radiokohtaus, syntymäpaikka, suurlähettilyys ja levymäärä — nojaavat
  artikkelissa nimettyihin lähteisiin (Noticias Fides / El País, La Razón,
  AllMusic). Presidentin nimeä ei ole kirjoitettu lehteen, koska
  nykypolitiikka on rajattu pois.)*

## 5. Kuvataide

- **Melchor Pérez de Holguín** (en-Wikipedia "Melchor Pérez de Holguín",
  johdanto sekä osiot "Biography" ja "Legacy"): **n. 1660 Cochabamba –
  1732**; muutti **Potosíhin vuoteen 1678 mennessä**; toimi **1689–1732** ja oli
  **Potosín koulukunnan** keskushahmo. Esikuvina **Murillo, Zurbarán ja
  Francisco Herrera nuorempi**. Maalasi **luostariveljestöille** ja **Charcasin
  varakkaille maanomistajille**; **varhaiset työt tummia**, myöhemmät
  värikkäämpiä. Kuoleman jälkeen hänet tunnettiin nimellä **"Brocha de Oro"**,
  kultasuti. Arkkitehtina hän piirsi **Potosín San Lorenzon kirkon**
  suunnitelmat. Hän on **50 bolivianon setelissä**. Tunnetuin työ:
  ***Entrada del Virrey arzobispo Morcillo en Potosí* (1718)**, **Museo de
  América, Madrid**.
- **Calamarcan mestari** (en-Wikipedia "Master of Calamarca"): oikea nimi
  **José López de los Ríos**, vaikutti **1700-luvun alkupuoliskolla**. Maalasi
  **kaksi enkelisarjaa** **Calamarcan kirkkoon** **La Pazin departementissa**.
  Ensimmäinen sarja on **ángeles arcabuceros** — **tuliaseita kantavia
  sotilasenkeleitä**, joiden **nimi on kirjoitettu maalauksen alareunaan**; ne
  ovat **tyylilajin tunnetuimmat ja määrittävimmät esimerkit**. Toinen sarja
  on **androgyynejä enkeleitä**, joilla on **liehuva viitta, lyhyt
  eurooppalaistyylinen naisen puku ja roomalaiset sotilassaappaat**, ja
  jokainen kantaa esinettä, joka tunnistaa hänet yhdeksi **Palermon
  arkkienkeleistä** — keskiaikaisen perinteen mukaan heitä oli **seitsemän**,
  joista **kirkko tunnusti kolme**. Tyyli on lähellä **La Pazin Leonardo
  Floresia**.
- **Cecilio Guzmán de Rojas** (en-Wikipedia "Cecilio Guzmán de Rojas",
  johdanto ja osio "Life"): **24.10.1899 Potosí – 14.2.1950 La Paz**;
  **indigenismin johtohahmo** ja artikkelin mukaan **Bolivian merkittävin
  taiteilija 1900-luvun ensimmäisellä puoliskolla**. Perhe muutti Cochabambaan
  hänen ollessaan 12; opettajana **Avelino Nogales**. Lähti **Espanjaan 1921**
  ja opiskeli **San Fernandon kuninkaallisessa akatemiassa** **Julio Romero de
  Torresin**, José Moreno Carboneron ja Manuel Beneditón johdolla; **Pariisissa**
  hän tutustui **impressionismiin ja kubismiin**. **Palasi La Paziin 1929** ja
  otti johtaakseen **taideakatemian**. Yhdisti **jugendia ja art decoa**
  indigenistiseen kuvastoon. Teoksia: ***El Triunfo de la Naturaleza*
  (1928)**, *El beso del ídolo* (1929), *Princesa india* (1931). Opetti
  yhdysvaltalaista modernistia **Evelyn Metzgeriä**.
  *(Artikkelin kertoma kuolintapa on jätetty pois: ikäsopivuus, eikä se
  kuulu kuvataidesivulle.)*
- **Marina Núñez del Prado** (en-Wikipedia "Marina Núñez del Prado", osiot
  "Early life and education", "Art career" ja "Núñez Del Prado Museum"):
  syntyi **17.10.1910 La Pazissa**, kuoli **1995 Limassa**. Valmistui **La Pazin
  taideakatemiasta 1930**, jäi sinne opettamaan **taiteellista anatomiaa ja
  kuvanveistoa** ja oli **ensimmäinen nainen akatemian oppituolin haltijana**.
  Teki yhteistyötä **Cecilio Guzmán de Rojasin** kanssa. Lähti **1938
  matkalle**: Peru, Uruguay, Argentiina, Eurooppa, Egypti ja **New York**,
  jossa hän opiskeli **AAUW:n apurahalla**. **Kultamitalit Argentiinassa 1936
  ja Berliinissä 1938**; **New Yorkissa kultamitali teoksesta *Mineros en
  rebelión* (1946)**, jonka aihe tuli **Potosín kaivosmiehistä**. Tapasi mm.
  **Picasson ja Brâncușin**. Myöhemmin materiaaleina **Amazonin trooppiset
  puut, pronssi, graniitti, andesiitti, basaltti, onyksi ja marmori**.
  **Kansallinen kulttuuripalkinto 1977.** Kotimuseossa on **1 014 hänen
  teostaan**.

## Uutislähde

**EL DEBER** (eldeber.com.bo), espanja — Santa Cruz de la Sierran päivälehti
ja maan luetuimpia. Testattu 6.9.2026 (`curl -A "matkakirja-uutisvalitys/1.0"`):
syötteessä **25 juttua**, ja artikkelisivun ensimmäisestä `<article>`-lohkosta
jäsentyy **9–13 yli 60 merkin kappaletta** sekä `og:image` (kaksi artikkelia
testattu). Syöte ja artikkelit ovat samalla isäntänimellä, joten
`SALLITUT`-listalle riittää yksi etuliite.

**Hylätyt:** `eldeber.com.bo/rss/` palauttaa HTML-etusivun (oikea osoite on
`/feed/`); `lostiempos.com/rss.xml` → 404; `opinion.com.bo/rss` → 301
(worker ei seuraa uudelleenohjauksia); `la-razon.com/feed/` → 301
Cloudflaresta; `eldiario.net/portal/feed/` → 403 Sucurin palomuurista;
`paginasiete.bo/feed/` → 522 (lehti lopetti 2023).
