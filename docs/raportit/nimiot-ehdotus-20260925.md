# Nimiöehdotukset pääkartan nostoille 25.9.2026

Karttaseppä Fablen käskystä 25.9.2026 (linja A: nimiö lisätään dataan kohteittain, sääntöä ei muuteta).

## Tausta

Laitetestaajan iPad-kierros (build 13, `savukierros-b13-ipad-20260925.md`, löydös 3) näki kartalla katkenneita nimiä kuten "Rouenin.", "Le Mansin 24." ja "Nancy, Place.". Web ja natiivi lyhentävät yli 18 merkin nimiön samalla säännöllä: nimestä jäävät kokonaiset sanat ja loppuun lyhennyspiste (`js/fokusnosto-symbolit.js` `nostosymLyhennaNimio`, natiivissa `NostotKartalla.Lyhenna`). Genetiivillä alkava nimi katkeaa siksi genetiiviin. Linjaus v1224 (`js/fokuskohteet.js` `kohteenKarttanimi`): ratkaisu on datassa. Kohteelle kirjoitetaan oma `nimio`, joka mahtuu kartalle sellaisenaan.

Lähde: sisältöpaketin v51 `kokoelmat/karttavalot.json`, pääkartan nostot, joiden nimiö on yli 18 merkkiä: **244 riviä** (fokuskohde 219, eläintäky 9, täkynosto 7, napakohde 5, maalehtinosto 4). Sama lista koneluettavana: `nimiot-ehdotus-20260925.json`.

## Ehdotusten säännöt

- Enintään 18 merkkiä, kokonaisin sanoin, ei lyhennyspistettä. Skripti tarkisti jokaisen rivin.
- Ei katkeavaa genetiiviä. Nimiö on paikan tai kohteen nimi perusmuodossa ("Rouen", "Chartres", "Oulanka") tai kohteen vakiintunut oma nimi ("Mezquita", "Handelsbeurs", "York Minster").
- Genetiivi on jätetty vain erisnimen osaksi ("Mustapäiden talo"). Sisältökirjuri voi vaihtaa sen.
- Saman kaupungin kohteet on erotettu toisistaan ("Amfiteatteri" ja "Porta Caesarea" Salonassa).
- Nimiö näkyy vain kartalla. Kortin otsikko, haku ja puhe käyttävät yhä koko nimeä.

## Toteutus

- **Sisältökirjuri:** fokuskohteisiin, napakohteisiin, täkynostoihin ja maalehtinostoihin lisätään kenttä `nimio: '…'` Lähde-sarakkeen kohteeseen. Rivinumero osoittaa kohteen id- tai nimiriviin origin/mainissa (ef3ed51f0).
- **Eläintäkyt:** nimiö tulee nyt `elain`-kentästä (`js/elaintaky.js` `tieto.nimio`). Maalohkoon `js/packs/elaintakyt.js` tarvitaan oma `nimio`-kenttä, ja nimiö pitää lukea siitä ennen `elain`-kenttää. Tämä vaatii pienen koodimuutoksen.
- **Siirtoseppä:** `tools/vienti/karttavalot.mjs` vie jo `nimio`-kentän, joten uusi pakettiversio riittää natiiville.
- **Vartija (ehdotus):** `tests/fokusnimet.test.mjs` vaatii nimiön vain kuratoiduilta fokuskohteilta. Laajennus kaikkiin karttavaloihin estäisi uudet katkeamat.

## Lista

| Maa | Tyyppi | Tunniste | Nykyinen nimi | Nykyinen lyhennys | Ehdotettu nimiö | Lähde |
| --- | --- | --- | --- | --- | --- | --- |
| AGO | elaintaky | `elaintaky:AGO` | Jättiläisseeprantilooppi | Jättiläisseeprant. | **Palanca negra** | `js/packs/elaintakyt.js:1449 (elain)` |
| ARG | elaintaky | `elaintaky:ARG` | Magellaninpingviini | Magellaninpingvii. | **Pingviini** | `js/packs/elaintakyt.js:949 (elain)` |
| ARG | fokuskohde | `kohde:cordobanjesuiitat` | Córdoban jesuiittakortteli | Córdoban. | **Córdoba, jesuiitat** | `js/packs/maastokohteet-arg.js:186` |
| ARG | fokuskohde | `kohde:peritomoreno` | Perito Moreno -jäätikkö | Perito Moreno. | **Perito Moreno** | `js/packs/maastokohteet-arg.js:322` |
| ARG | fokuskohde | `kohde:polvorilla` | La Polvorillan viadukti | La Polvorillan. | **La Polvorilla** | `js/packs/maastokohteet-arg.js:214` |
| ARG | fokuskohde | `kohde:quebradadehumahuaca` | Quebrada de Humahuaca | Quebrada de. | **Humahuaca** | `js/packs/maastokohteet-arg.js:160` |
| ATA | napakohde | `kohde:ata-etelanapa-asema` | Amundsen–Scottin asema | Amundsen–Scottin. | **Etelänapa-asema** | `js/packs/maastokohteet-ata.js:87` |
| ATA | napakohde | `kohde:ata-kuivat-laaksot` | McMurdon kuivat laaksot | McMurdon kuivat. | **Kuivat laaksot** | `js/packs/maastokohteet-ata.js:168` |
| AUS | fokuskohde | `kohde:parkesin-radioteleskooppi` | Parkesin radioteleskooppi | Parkesin. | **Parkes** | `js/packs/maastokohteet-aus.js:111` |
| AUS | fokuskohde | `kohde:snowy-mountains-hanke` | Snowy Mountains -hanke | Snowy Mountains. | **Snowy Mountains** | `js/packs/maastokohteet-aus.js:190` |
| AUT | fokuskohde | `kohde:hahmotelma-heiligenkreuz` | Heiligenkreuzin luostari | Heiligenkreuzin. | **Heiligenkreuz** | `js/packs/hahmotelma-aut.js:491` |
| AUT | fokuskohde | `kohde:hahmotelma-karntnertor-bastioni` | Kärntnertor-bastioni | Kärntnertor-basti. | **Kärntnertor** | `js/packs/monumentit-eurooppa.js:180` |
| AUT | fokuskohde | `kohde:hahmotelma-kremsmuenster` | Kremsmünsterin luostari | Kremsmünsterin. | **Kremsmünster** | `js/packs/hahmotelma-aut.js:540` |
| AUT | fokuskohde | `kohde:hahmotelma-st-anton` | St. Anton am Arlberg | St. Anton am. | **Sankt Anton** | `js/packs/hahmotelma-aut.js:1468` |
| AUT | fokuskohde | `kohde:hahmotelma-vanha-burgtheater` | Wienin vanha Burgtheater | Wienin vanha. | **Burgtheater** | `js/packs/monumentit-eurooppa.js:170` |
| AUT | fokuskohde | `kohde:hohensalzburg` | Hohensalzburgin linnoitus | Hohensalzburgin. | **Hohensalzburg** | `js/packs/maastokohteet-aut.js:394` |
| BEL | fokuskohde | `kohde:hahmotelma-antwerpen-beurs` | Antwerpenin pörssitalo | Antwerpenin. | **Handelsbeurs** | `js/packs/hahmotelma-bel.js:1542` |
| BEL | fokuskohde | `kohde:hahmotelma-bastogne` | Bastognen tähtimuistomerkki | Bastognen. | **Bastogne** | `js/packs/hahmotelma-bel.js:488` |
| BEL | fokuskohde | `kohde:hahmotelma-canal-du-centre` | Canal du Centren laivanostimet | Canal du Centren. | **Canal du Centre** | `js/packs/hahmotelma-bel.js:1195` |
| BEL | fokuskohde | `kohde:hahmotelma-coudenberg` | Coudenbergin palatsi | Coudenbergin. | **Coudenberg** | `js/packs/hahmotelma-bel.js:1493` |
| BEL | fokuskohde | `kohde:hahmotelma-eben-emael` | Ében-Émaelin linnake | Ében-Émaelin. | **Ében-Émael** | `js/packs/hahmotelma-bel.js:636` |
| BEL | fokuskohde | `kohde:hahmotelma-han-sur-lesse` | Han-sur-Lessen luolat | Han-sur-Lessen. | **Han-sur-Lesse** | `js/packs/hahmotelma-bel.js:172` |
| BEL | fokuskohde | `kohde:hahmotelma-kortrijk` | Kultaisten kannusten taistelu | Kultaisten. | **Kortrijk 1302** | `js/packs/hahmotelma-bel.js:684` |
| BEL | fokuskohde | `kohde:hahmotelma-lions-mound` | Waterloon leijonakumpu | Waterloon. | **Leijonakumpu** | `js/packs/hahmotelma-bel.js:378` |
| BEL | fokuskohde | `kohde:hahmotelma-seraing` | Seraingin terästehdas | Seraingin. | **Seraing** | `js/packs/hahmotelma-bel.js:1374` |
| BEL | fokuskohde | `kohde:hahmotelma-tervuren` | Tervurenin Afrikka-museo | Tervurenin. | **Tervuren** | `js/packs/hahmotelma-bel.js:1027` |
| BEL | fokuskohde | `kohde:hahmotelma-tournai` | Tournain tuomiokirkko | Tournain. | **Tournai** | `js/packs/hahmotelma-bel.js:586` |
| BGR | fokuskohde | `kohde:hahmotelma-cherven` | Chervenin linnoitus | Chervenin. | **Cherven** | `js/packs/hahmotelma-bgr.js:1538` |
| BGR | fokuskohde | `kohde:hahmotelma-pliska-palatsi` | Pliskan kaanien palatsi | Pliskan kaanien. | **Pliska** | `js/packs/monumentit-eurooppa.js:235` |
| BIH | fokuskohde | `kohde:hahmotelma-gradacac` | Gradačacin linnoitus | Gradačacin. | **Gradačac** | `js/packs/hahmotelma-bih.js:604` |
| BIH | fokuskohde | `kohde:hahmotelma-kozara` | Kozaran kansallispuisto | Kozaran. | **Kozara** | `js/packs/hahmotelma-bih.js:769` |
| BIH | fokuskohde | `kohde:hahmotelma-mile-kruunajaiskirkko` | Milen kruunajaiskirkko | Milen. | **Mile** | `js/packs/monumentit-eurooppa.js:433` |
| BOL | fokuskohde | `kohde:chiquitos` | Chiquitosin lähetysasemat | Chiquitosin. | **Chiquitos** | `js/packs/maastokohteet-bol.js:206` |
| BOL | fokuskohde | `kohde:samaipata` | El Fuerte de Samaipata | El Fuerte de. | **Samaipata** | `js/packs/maastokohteet-bol.js:319` |
| BRA | fokuskohde | `kohde:congonhas` | Congonhasin profeetat | Congonhasin. | **Congonhas** | `js/packs/maastokohteet-bra.js:267` |
| BRA | fokuskohde | `kohde:fernandodenoronha` | Fernando de Noronha | Fernando de. | **Noronha** | `js/packs/maastokohteet-bra.js:69` |
| BRA | fokuskohde | `kohde:lencoismaranhenses` | Lençóis Maranhenses | Lençóis. | **Lençóis** | `js/packs/maastokohteet-bra.js:324` |
| BRA | fokuskohde | `kohde:saomigueldasmissoes` | São Miguel das Missões | São Miguel das. | **São Miguel** | `js/packs/maastokohteet-bra.js:211` |
| CAN | fokuskohde | `kohde:dinosaur-provincial-park` | Dinosaur Provincial Park | Dinosaur. | **Dinosaur Park** | `js/packs/maastokohteet-can.js:248` |
| CAN | fokuskohde | `kohde:louisbourgin-linnoitus` | Louisbourgin linnoitus | Louisbourgin. | **Louisbourg** | `js/packs/maastokohteet-can.js:302` |
| CHE | fokuskohde | `kohde:hahmotelma-christoffelturm` | Bernin Christoffelturm | Bernin. | **Christoffelturm** | `js/packs/monumentit-eurooppa.js:192` |
| CHE | fokuskohde | `kohde:hahmotelma-grande-dixence` | Grande Dixence -pato | Grande Dixence. | **Grande Dixence** | `js/packs/hahmotelma-che.js:653` |
| CHE | fokuskohde | `kohde:hahmotelma-lavaux` | Lavaux'n viinitarhat | Lavaux'n. | **Lavaux** | `js/packs/hahmotelma-che.js:155` |
| CHE | fokuskohde | `kohde:hahmotelma-porte-neuve` | Geneven Porte Neuve | Geneven Porte. | **Porte Neuve** | `js/packs/monumentit-eurooppa.js:202` |
| CHL | fokuskohde | `kohde:chinchorro` | Chinchorron muumiot | Chinchorron. | **Chinchorro** | `js/packs/maastokohteet-chl.js:203` |
| CHL | fokuskohde | `kohde:paranal` | Paranalin observatorio | Paranalin. | **Paranal** | `js/packs/maastokohteet-chl.js:259` |
| CHL | fokuskohde | `kohde:valdivia1960` | Valdivian maanjäristys | Valdivian. | **Valdivia 1960** | `js/packs/maastokohteet-chl.js:315` |
| COL | elaintaky | `elaintaky:COL` | Kultamyrkkysammakko | Kultamyrkkysammak. | **Myrkkysammakko** | `js/packs/elaintakyt.js:1224 (elain)` |
| COL | fokuskohde | `kohde:barranquillankarnevaali` | Barranquillan karnevaali | Barranquillan. | **Barranquilla** | `js/packs/maastokohteet-col.js:288` |
| COL | fokuskohde | `kohde:cartagenacol` | Cartagena de Indias | Cartagena de. | **Cartagena** | `js/packs/maastokohteet-col.js:204` |
| COL | fokuskohde | `kohde:cristobalcolon` | Pico Cristóbal Colón | Pico Cristóbal. | **Cristóbal Colón** | `js/packs/maastokohteet-col.js:36` |
| CUB | fokuskohde | `kohde:san-pedro-de-la-roca` | San Pedro de la Roca | San Pedro de la. | **El Morro** | `js/packs/maastokohteet-cub.js:174` |
| CYP | fokuskohde | `kohde:paphoksenmosaiikit` | Paphoksen mosaiikit | Paphoksen. | **Paphos** | `js/packs/maastokohteet-cyp.js:215` |
| CZE | fokuskohde | `kohde:hahmotelma-adrspach` | Adršpach-Teplicen kalliot | Adršpach-Teplicen. | **Adršpach** | `js/packs/hahmotelma-cze.js:115` |
| CZE | fokuskohde | `kohde:hahmotelma-josefov-asanace` | Josefov ennen asanacea | Josefov ennen. | **Josefov** | `js/packs/monumentit-eurooppa.js:213` |
| CZE | fokuskohde | `kohde:hahmotelma-koniggratz` | Königgrätzin taistelu | Königgrätzin. | **Königgrätz** | `js/packs/hahmotelma-cze.js:795` |
| CZE | fokuskohde | `kohde:hahmotelma-kromeriz` | Kroměřížin arkkipiispanlinna | Kroměřížin. | **Kroměříž** | `js/packs/hahmotelma-cze.js:599` |
| CZE | fokuskohde | `kohde:hahmotelma-podyji` | Podyjín kansallispuisto | Podyjín. | **Podyjí** | `js/packs/hahmotelma-cze.js:391` |
| CZE | fokuskohde | `kohde:hahmotelma-slavkov` | Austerlitzin taistelu | Austerlitzin. | **Austerlitz** | `js/packs/hahmotelma-cze.js:488` |
| CZE | fokuskohde | `kohde:hahmotelma-zdar` | Vihreän vuoren pyhiinvaelluskirkko | Vihreän vuoren. | **Zelená hora** | `js/packs/hahmotelma-cze.js:1135` |
| CZE | fokuskohde | `kohde:olomouc` | Olomoucin Kolminaisuus | Olomoucin. | **Olomouc** | `js/packs/maastokohteet-cze.js:725` |
| DEU | fokuskohde | `kohde:hahmotelma-bayreuth` | Bayreuthin Festspielhaus | Bayreuthin. | **Bayreuth** | `js/packs/hahmotelma-deu.js:881` |
| DEU | fokuskohde | `kohde:hahmotelma-bernkastel` | Bernkastel ja Mosel | Bernkastel. | **Bernkastel** | `js/packs/hahmotelma-deu.js:1002` |
| DEU | fokuskohde | `kohde:hahmotelma-freiberg` | Freibergin hopeakaivokset | Freibergin. | **Freiberg** | `js/packs/hahmotelma-deu.js:1325` |
| DEU | fokuskohde | `kohde:hahmotelma-hampurin-vanha-raatihuone` | Hampurin vanha raatihuone | Hampurin vanha. | **Vanha raatihuone** | `js/packs/monumentit-eurooppa.js:50` |
| DEU | fokuskohde | `kohde:hahmotelma-hohenzollern` | Hohenzollernin linna | Hohenzollernin. | **Hohenzollern** | `js/packs/hahmotelma-deu.js:647` |
| DEU | fokuskohde | `kohde:hahmotelma-maulbronn` | Maulbronnin luostari | Maulbronnin. | **Maulbronn** | `js/packs/hahmotelma-deu.js:757` |
| DEU | fokuskohde | `kohde:hahmotelma-rammelsberg` | Rammelsbergin kaivos | Rammelsbergin. | **Rammelsberg** | `js/packs/hahmotelma-deu.js:1699` |
| DEU | fokuskohde | `kohde:hahmotelma-rothenburg` | Rothenburg ob der Tauber | Rothenburg ob der. | **Rothenburg** | `js/packs/hahmotelma-deu.js:817` |
| DEU | fokuskohde | `kohde:hahmotelma-ruedesheim` | Rüdesheim ja Rheingau | Rüdesheim. | **Rüdesheim** | `js/packs/hahmotelma-deu.js:931` |
| DEU | fokuskohde | `kohde:hahmotelma-ruegen` | Rügenin liitukalliot | Rügenin. | **Rügen** | `js/packs/hahmotelma-deu.js:134` |
| DEU | fokuskohde | `kohde:hahmotelma-saechsische-schweiz` | Saksilainen Sveitsi | Saksilainen. | **Sächsische Schweiz** | `js/packs/hahmotelma-deu.js:65` |
| DEU | fokuskohde | `kohde:hahmotelma-voelklingen` | Völklingenin rautatehdas | Völklingenin. | **Völklingen** | `js/packs/hahmotelma-deu.js:1255` |
| DEU | takynosto | `nosto:kopenickin-kapteeni` | Köpenickin kapteeni | Köpenickin. | **Köpenick** | `js/packs/fokusvirta-berliini.js:607` |
| DNK | fokuskohde | `kohde:frederiksborgin-linna` | Frederiksborgin linna | Frederiksborgin. | **Frederiksborg** | `js/packs/maastokohteet-dnk.js:484` |
| DNK | fokuskohde | `kohde:hahmotelma-christiansborg` | Toinen Christiansborg | Toinen. | **Christiansborg** | `js/packs/monumentit-eurooppa.js:359` |
| DNK | fokuskohde | `kohde:hahmotelma-thy` | Thyn kansallispuisto | Thyn. | **Thy** | `js/packs/hahmotelma-dnk.js:287` |
| DNK | fokuskohde | `kohde:hahmotelma-viborg` | Viborgin tuomiokirkko | Viborgin. | **Viborg** | `js/packs/hahmotelma-dnk.js:825` |
| DNK | fokuskohde | `kohde:roskilden-tuomiokirkko` | Roskilden tuomiokirkko | Roskilden. | **Roskilde** | `js/packs/maastokohteet-dnk.js:201` |
| ECU | fokuskohde | `kohde:valdivian-kulttuuri` | Valdivian kulttuuri | Valdivian. | **Valdivia** | `js/packs/maastokohteet-ecu.js:298` |
| ESP | fokuskohde | `kohde:cordoban-moskeijakatedraali` | Córdoban moskeijakatedraali | Córdoban. | **Mezquita** | `js/packs/maastokohteet-esp.js:596` |
| ESP | fokuskohde | `kohde:hahmotelma-almaden` | Almadénin elohopeakaivos | Almadénin. | **Almadén** | `js/packs/hahmotelma-esp.js:1283` |
| ESP | fokuskohde | `kohde:hahmotelma-buen-retiro` | Palacio del Buen Retiro | Palacio del Buen. | **Buen Retiro** | `js/packs/monumentit-eurooppa.js:114` |
| ESP | fokuskohde | `kohde:hahmotelma-campo-de-criptana` | Campo de Criptanan tuulimyllyt | Campo de Criptanan. | **Campo de Criptana** | `js/packs/hahmotelma-esp.js:889` |
| ESP | fokuskohde | `kohde:hahmotelma-las-navas` | Las Navas de Tolosa | Las Navas de. | **Las Navas** | `js/packs/hahmotelma-esp.js:840` |
| ESP | fokuskohde | `kohde:hahmotelma-real-alcazar-madrid` | Madridin Real Alcázar | Madridin Real. | **Real Alcázar** | `js/packs/monumentit-eurooppa.js:104` |
| ESP | fokuskohde | `kohde:hahmotelma-riotinto` | Riotinton kaivokset | Riotinton. | **Riotinto** | `js/packs/hahmotelma-esp.js:1210` |
| ESP | fokuskohde | `kohde:hahmotelma-tabernas` | Tabernasin autiomaa | Tabernasin. | **Tabernas** | `js/packs/hahmotelma-esp.js:359` |
| ESP | fokuskohde | `kohde:meridan-roomalainen-teatteri` | Méridan roomalainen teatteri | Méridan. | **Mérida** | `js/packs/maastokohteet-esp.js:713` |
| ESP | fokuskohde | `kohde:salamancan-yliopisto` | Salamancan yliopisto | Salamancan. | **Salamanca** | `js/packs/maastokohteet-esp.js:768` |
| ESP | fokuskohde | `kohde:santiago-de-compostela` | Santiago de Compostela | Santiago de. | **Santiago** | `js/packs/maastokohteet-esp.js:312` |
| ESP | takynosto | `nosto:munkkiaratit` | Madridin papukaijat | Madridin. | **Papukaijat** | `js/packs/fokusvirta-madrid.js:757` |
| EST | fokuskohde | `kohde:hahmotelma-dominikaaniluostari` | Tallinnan dominikaaniluostari | Tallinnan. | **Dominikaanit** | `js/packs/hahmotelma-est.js:1753` |
| EST | fokuskohde | `kohde:hahmotelma-endla` | Endlan luonnonsuojelualue | Endlan. | **Endla** | `js/packs/hahmotelma-est.js:230` |
| EST | fokuskohde | `kohde:hahmotelma-kuremae` | Kuremäen Pühtitsan luostari | Kuremäen Pühtitsan. | **Pühtitsa** | `js/packs/hahmotelma-est.js:918` |
| EST | fokuskohde | `kohde:hahmotelma-narvan-vanhakaupunki` | Narvan barokkinen vanhakaupunki | Narvan barokkinen. | **Narva** | `js/packs/monumentit-eurooppa.js:306` |
| EST | fokuskohde | `kohde:hahmotelma-soomaa` | Soomaan kansallispuisto | Soomaan. | **Soomaa** | `js/packs/hahmotelma-est.js:78` |
| EST | fokuskohde | `kohde:hahmotelma-vilsandi` | Vilsandin kansallispuisto | Vilsandin. | **Vilsandi** | `js/packs/hahmotelma-est.js:155` |
| ETH | fokuskohde | `kohde:balenpuisto` | Balen kansallispuisto | Balen. | **Bale** | `js/packs/maastokohteet-eth.js:333` |
| FIN | fokuskohde | `kohde:hahmotelma-lemmenjoki` | Lemmenjoen kansallispuisto | Lemmenjoen. | **Lemmenjoki** | `js/packs/hahmotelma-fin.js:567` |
| FIN | fokuskohde | `kohde:hahmotelma-merenkurkku` | Merenkurkun saaristo | Merenkurkun. | **Merenkurkku** | `js/packs/hahmotelma-fin.js:141` |
| FIN | fokuskohde | `kohde:hahmotelma-oulanka` | Oulangan kansallispuisto | Oulangan. | **Oulanka** | `js/packs/hahmotelma-fin.js:283` |
| FIN | fokuskohde | `kohde:hahmotelma-pallas` | Pallas-Yllästunturin kansallispuisto | Pallas-Yllästuntu. | **Pallas-Ylläs** | `js/packs/hahmotelma-fin.js:219` |
| FIN | fokuskohde | `kohde:hahmotelma-turun-tuomiokirkon-vanha-torni` | Turun tuomiokirkon vanha torni | Turun tuomiokirkon. | **Tuomiokirkon torni** | `js/packs/monumentit-eurooppa.js:316` |
| FIN | fokuskohde | `kohde:hahmotelma-vanha-vaasa-kirkko` | Vanhan Vaasan kirkko | Vanhan Vaasan. | **Vanha Vaasa** | `js/packs/hahmotelma-fin.js:1981` |
| FIN | fokuskohde | `kohde:petajavedenvanhakirkko` | Petäjäveden vanha kirkko | Petäjäveden vanha. | **Petäjävesi** | `js/packs/maastokohteet-fin.js:403` |
| FJI | fokuskohde | `kohde:sri-siva-subramaniya` | Sri Siva Subramaniya | Sri Siva. | **Sri Siva** | `js/packs/maastokohteet-fji.js:131` |
| FRA | fokuskohde | `kohde:carcassonnen-linnoituskaupunki` | Carcassonnen linnoituskaupunki | Carcassonnen. | **Carcassonne** | `js/packs/maastokohteet-fra.js:450` |
| FRA | fokuskohde | `kohde:chartresin-katedraali` | Chartresin katedraali | Chartresin. | **Chartres** | `js/packs/maastokohteet-fra.js:570` |
| FRA | fokuskohde | `kohde:hahmotelma-amiens` | Amiensin tuomiokirkko | Amiensin. | **Amiens** | `js/packs/hahmotelma-fra.js:537` |
| FRA | fokuskohde | `kohde:hahmotelma-pic-du-midi` | Pic du Midi de Bigorre | Pic du Midi de. | **Pic du Midi** | `js/packs/hahmotelma-fra.js:97` |
| FRA | fokuskohde | `kohde:hahmotelma-place-stanislas` | Nancy, Place Stanislas | Nancy, Place. | **Place Stanislas** | `js/packs/hahmotelma-fra.js:830` |
| FRA | fokuskohde | `kohde:hahmotelma-rouen` | Rouenin tuomiokirkko | Rouenin. | **Rouen** | `js/packs/hahmotelma-fra.js:1077` |
| FRA | fokuskohde | `kohde:hahmotelma-saint-cloud` | Saint-Cloud’n linna | Saint-Cloud’n. | **Saint-Cloud** | `js/packs/monumentit-eurooppa.js:39` |
| FRA | maalehtinosto | `nosto:maalehti-bouquinistit` | Seinen kirjalaatikot | Seinen. | **Bouquinistes** | `js/packs/maalehtinostot-fra.js:728` |
| FRA | maalehtinosto | `nosto:maalehti-le-mans` | Le Mansin 24 tuntia | Le Mansin 24. | **Le Mans 24 h** | `js/packs/maalehtinostot-fra.js:661` |
| FRA | maalehtinosto | `nosto:maalehti-montgolfier` | Montgolfierin pallo | Montgolfierin. | **Montgolfier** | `js/packs/maalehtinostot-fra.js:264` |
| FRA | maalehtinosto | `nosto:maalehti-peilisali` | Versaillesin peilisali | Versaillesin. | **Peilisali** | `js/packs/maalehtinostot-fra.js:114` |
| FRA | takynosto | `nosto:guimardin-metro` | Metron sisäänkäynti | Metron. | **Métropolitain** | `js/packs/maakartat.js:5284` |
| FRA | takynosto | `nosto:kirahvin-kavelymatka` | Kirahvin kävelymatka | Kirahvin. | **Kirahvi** | `js/packs/maakartat.js:5169` |
| FRA | takynosto | `nosto:pariisin-vuosisadat` | Pariisin vuosisadat | Pariisin. | **Vuosisadat** | `js/packs/maakartat.js:5310` |
| GBR | fokuskohde | `kohde:bathin-roomalaiset-kylpylat` | Bathin roomalaiset kylpylät | Bathin roomalaiset. | **Roomalaiskylpylä** | `js/packs/maastokohteet-gbr.js:524` |
| GBR | fokuskohde | `kohde:hahmotelma-dover-strait` | Doverin liiduvuoret | Doverin. | **Dover** | `js/packs/hahmotelma-gbr.js:865` |
| GBR | fokuskohde | `kohde:hahmotelma-geevor-tin` | Geevorin tinakaivos | Geevorin. | **Geevor** | `js/packs/hahmotelma-gbr.js:181` |
| GBR | fokuskohde | `kohde:hahmotelma-liverpool-docks` | Albert Dock, Liverpool | Albert Dock,. | **Albert Dock** | `js/packs/hahmotelma-gbr.js:286` |
| GBR | fokuskohde | `kohde:hahmotelma-oxford` | Radcliffe Camera, Oxford | Radcliffe Camera,. | **Radcliffe Camera** | `js/packs/hahmotelma-gbr.js:347` |
| GBR | fokuskohde | `kohde:hahmotelma-stockton-darlington` | Stockton ja Darlingtonin rautatie | Stockton. | **Rautatie 1825** | `js/packs/hahmotelma-gbr.js:581` |
| GBR | fokuskohde | `kohde:hahmotelma-york-minster` | Yorkin tuomiokirkko | Yorkin. | **York Minster** | `js/packs/hahmotelma-gbr.js:927` |
| GHA | elaintaky | `elaintaky:GHA` | Valkokaulakalliovaris | Valkokaulakalliov. | **Kalliovaris** | `js/packs/elaintakyt.js:2015 (elain)` |
| GRC | fokuskohde | `kohde:hahmotelma-korintin-apollon-temppeli` | Korintin Apollon temppeli | Korintin Apollon. | **Apollontemppeli** | `js/packs/hahmotelma-grc.js:1921` |
| GRC | fokuskohde | `kohde:hahmotelma-lavrio` | Lavrion hopeakaivokset | Lavrion. | **Lavrio** | `js/packs/hahmotelma-grc.js:1382` |
| GRC | fokuskohde | `kohde:hahmotelma-navagio` | Navagio (Zakynthos) | Navagio. | **Navagio** | `js/packs/hahmotelma-grc.js:384` |
| GRL | fokuskohde | `kohde:gronlannin-jaatikko` | Grönlannin jäätikkö | Grönlannin. | **Mannerjäätikkö** | `js/packs/maastokohteet-grl.js:213` |
| GRL | fokuskohde | `kohde:ilulissatin-jaavuono` | Ilulissatin jäävuono | Ilulissatin. | **Ilulissat** | `js/packs/maastokohteet-grl.js:77` |
| GRL | fokuskohde | `kohde:koillis-gronlannin-kansallispuisto` | Koillis-Grönlannin kansallispuisto | Koillis-Grönlannin. | **Koillis-Grönlanti** | `js/packs/maastokohteet-grl.js:317` |
| HKG | fokuskohde | `kohde:kowloonin-muurikaupunki` | Kowloonin muurikaupunki | Kowloonin. | **Muurikaupunki** | `js/packs/maastokohteet-hkg.js:101` |
| HKG | fokuskohde | `kohde:tung-chungin-linnake` | Tung Chungin linnake | Tung Chungin. | **Tung Chung** | `js/packs/maastokohteet-hkg.js:150` |
| HRV | fokuskohde | `kohde:hahmotelma-salona-amfiteatteri` | Salonan amfiteatteri | Salonan. | **Amfiteatteri** | `js/packs/hahmotelma-hrv.js:1585` |
| HRV | fokuskohde | `kohde:hahmotelma-salona-porta-caesarea` | Salonan Porta Caesarea | Salonan Porta. | **Porta Caesarea** | `js/packs/monumentit-eurooppa.js:256` |
| HUN | fokuskohde | `kohde:hahmotelma-budan-matyas-palatsi` | Budan Mátyás-palatsi | Budan. | **Mátyás-palatsi** | `js/packs/monumentit-eurooppa.js:223` |
| HUN | fokuskohde | `kohde:hahmotelma-esztergom` | Esztergomin basilika | Esztergomin. | **Esztergom** | `js/packs/hahmotelma-hun.js:385` |
| HUN | fokuskohde | `kohde:hahmotelma-fertod` | Fertőd (Eszterháza) | Fertőd. | **Eszterháza** | `js/packs/hahmotelma-hun.js:1100` |
| HUN | fokuskohde | `kohde:hahmotelma-visegrad-palota` | Visegrádin kuninkaallinen palatsi | Visegrádin. | **Visegrád** | `js/packs/hahmotelma-hun.js:1473` |
| IND | fokuskohde | `kohde:darjeelingin-vuoristorata` | Darjeelingin vuoristorata | Darjeelingin. | **Darjeeling** | `js/packs/maastokohteet-ind.js:224` |
| IND | fokuskohde | `kohde:konark` | Konarkin aurinkotemppeli | Konarkin. | **Konark** | `js/packs/maastokohteet-ind.js:171` |
| IRL | fokuskohde | `kohde:hahmotelma-dublinin-keskiaikainen-linna` | Dublinin keskiaikainen linna | Dublinin. | **Dublin Castle** | `js/packs/monumentit-eurooppa.js:348` |
| IRL | fokuskohde | `kohde:hahmotelma-mellifont` | Mellifontin luostari | Mellifontin. | **Mellifont** | `js/packs/hahmotelma-irl.js:1451` |
| IRL | fokuskohde | `kohde:hahmotelma-powerscourt` | Powerscourtin vesiputous | Powerscourtin. | **Powerscourt** | `js/packs/hahmotelma-irl.js:405` |
| IRQ | elaintaky | `elaintaky:IRQ` | Basranruokokerttunen | Basranruokokerttu. | **Ruokokerttunen** | `js/packs/elaintakyt.js:1769 (elain)` |
| ITA | fokuskohde | `kohde:hahmotelma-agrigento` | Agrigenton temppelilaakso | Agrigenton. | **Agrigento** | `js/packs/hahmotelma-ita.js:503` |
| ITA | fokuskohde | `kohde:hahmotelma-carrara` | Carraran marmorilouhokset | Carraran. | **Carrara** | `js/packs/hahmotelma-ita.js:1176` |
| ITA | fokuskohde | `kohde:hahmotelma-vanha-pietarinkirkko` | Vanha Pietarinkirkko | Vanha. | **Pietarinkirkko** | `js/packs/monumentit-eurooppa.js:82` |
| LKA | elaintaky | `elaintaky:LKA` | Sri lankan leopardi | Sri lankan. | **Leopardi** | `js/packs/elaintakyt.js:1373 (elain)` |
| LKA | fokuskohde | `kohde:hammastemppeli` | Kandyn hammastemppeli | Kandyn. | **Hammastemppeli** | `js/packs/maastokohteet-lka.js:146` |
| LKA | fokuskohde | `kohde:yhdeksan-kaaren-silta` | Yhdeksän kaaren silta | Yhdeksän kaaren. | **Kaarisilta** | `js/packs/maastokohteet-lka.js:225` |
| LTU | fokuskohde | `kohde:aukstaitija` | Aukštaitijan puisto | Aukštaitijan. | **Aukštaitija** | `js/packs/maastokohteet-ltu.js:792` |
| LTU | fokuskohde | `kohde:hahmotelma-dzukija` | Dzūkijan kansallispuisto | Dzūkijan. | **Dzūkija** | `js/packs/hahmotelma-ltu.js:560` |
| LTU | fokuskohde | `kohde:hahmotelma-trakai-niemekelinna` | Trakain niemekelinna | Trakain. | **Trakai** | `js/packs/hahmotelma-ltu.js:1470` |
| LTU | fokuskohde | `kohde:palangan-meripihkamuseo` | Palangan meripihkamuseo | Palangan. | **Palanga** | `js/packs/maastokohteet-ltu.js:450` |
| LUX | fokuskohde | `kohde:hahmotelma-altmunster` | Altmünsterin luostari | Altmünsterin. | **Altmünster** | `js/packs/hahmotelma-lux.js:994` |
| LUX | fokuskohde | `kohde:hahmotelma-luxembourg` | Luxembourgin kaupunki | Luxembourgin. | **Luxembourg** | `js/packs/hahmotelma-lux.js:442` |
| LVA | fokuskohde | `kohde:hahmotelma-mustapaiden-talo` | Riian Mustapäiden talo | Riian Mustapäiden. | **Mustapäiden talo** | `js/packs/monumentit-eurooppa.js:296` |
| MDG | fokuskohde | `kohde:merirosvojen-hautausmaa` | Merirosvojen hautausmaa | Merirosvojen. | **Sainte-Marie** | `js/packs/maastokohteet-mdg.js:290` |
| MLT | fokuskohde | `kohde:hahmotelma-mdinan-vanha-katedraali` | Mdinan vanha normannikatedraali | Mdinan vanha. | **Mdina** | `js/packs/monumentit-eurooppa.js:423` |
| MLT | fokuskohde | `kohde:hahmotelma-victoria-cittadella` | Victoria (Cittadella) | Victoria. | **Cittadella** | `js/packs/hahmotelma-mlt.js:1112` |
| NAM | fokuskohde | `kohde:fish-riverin-kanjoni` | Fish Riverin kanjoni | Fish Riverin. | **Fish River** | `js/packs/maastokohteet-nam.js:183` |
| NLD | fokuskohde | `kohde:hahmotelma-amsterdamin-vanha-raatihuone` | Amsterdamin vanha raatihuone | Amsterdamin vanha. | **Vanha raatihuone** | `js/packs/monumentit-eurooppa.js:148` |
| NLD | fokuskohde | `kohde:hahmotelma-oostvaardersplassen` | Oostvaardersplassen | Oostvaardersplass. | **Oostvaarders** | `js/packs/hahmotelma-nld.js:318` |
| NLD | fokuskohde | `kohde:hahmotelma-utrechtin-domkirkon-keskilaiva` | Utrechtin Domkirkon keskilaiva | Utrechtin. | **Domkirkko** | `js/packs/monumentit-eurooppa.js:158` |
| NLD | fokuskohde | `kohde:krollermuller` | Kröller-Müllerin museo | Kröller-Müllerin. | **Kröller-Müller** | `js/packs/maastokohteet-nld.js:502` |
| NLD | takynosto | `nosto:tulppaanimania` | Alkmaarin huutokauppa | Alkmaarin. | **Alkmaar** | `js/packs/fokusvirta-amsterdam.js:889` |
| NOR | fokuskohde | `kohde:altankalliopiirrokset` | Altan kalliopiirrokset | Altan. | **Alta** | `js/packs/maastokohteet-nor.js:370` |
| NOR | fokuskohde | `kohde:eidsvoll` | Eidsvollin rakennus | Eidsvollin. | **Eidsvoll** | `js/packs/maastokohteet-nor.js:619` |
| NOR | fokuskohde | `kohde:hahmotelma-borgund` | Borgundin sauvakirkko | Borgundin. | **Borgund** | `js/packs/hahmotelma-nor.js:375` |
| NOR | fokuskohde | `kohde:hahmotelma-dovrefjell` | Dovrefjell ja myskihärkä | Dovrefjell. | **Dovrefjell** | `js/packs/hahmotelma-nor.js:1059` |
| NOR | fokuskohde | `kohde:hahmotelma-lindesnes` | Lindesnesin majakka | Lindesnesin. | **Lindesnes** | `js/packs/hahmotelma-nor.js:989` |
| NOR | fokuskohde | `kohde:nidaros` | Nidarosin tuomiokirkko | Nidarosin. | **Nidaros** | `js/packs/maastokohteet-nor.js:470` |
| NOR | fokuskohde | `kohde:urnes` | Urnesin sauvakirkko | Urnesin. | **Urnes** | `js/packs/maastokohteet-nor.js:287` |
| NPL | fokuskohde | `kohde:bardiya` | Bardiyan kansallispuisto | Bardiyan. | **Bardiya** | `js/packs/maastokohteet-npl.js:243` |
| PAN | elaintaky | `elaintaky:PAN` | Panamankultasammakko | Panamankultasamma. | **Kultasammakko** | `js/packs/elaintakyt.js:2259 (elain)` |
| POL | fokuskohde | `kohde:hahmotelma-bochnia` | Bochnian suolakaivos | Bochnian. | **Bochnia** | `js/packs/hahmotelma-pol.js:1422` |
| POL | fokuskohde | `kohde:hahmotelma-grunwald` | Grunwaldin taistelu | Grunwaldin. | **Grunwald** | `js/packs/hahmotelma-pol.js:502` |
| POL | fokuskohde | `kohde:hahmotelma-kalwaria` | Kalwaria Zebrzydowska | Kalwaria. | **Kalwaria** | `js/packs/hahmotelma-pol.js:742` |
| POL | fokuskohde | `kohde:hahmotelma-tarnowskie-gory` | Tarnowskie Górin hopeakaivos | Tarnowskie Górin. | **Tarnowskie Góry** | `js/packs/hahmotelma-pol.js:1482` |
| POL | fokuskohde | `kohde:hahmotelma-torun-zamek` | Toruńin ristiritarien linna | Toruńin. | **Toruń** | `js/packs/hahmotelma-pol.js:1615` |
| POL | fokuskohde | `kohde:hahmotelma-wolin` | Wolinin kansallispuisto | Wolinin. | **Wolin** | `js/packs/hahmotelma-pol.js:291` |
| PRT | fokuskohde | `kohde:almendres` | Almendresin kivikehä | Almendresin. | **Almendres** | `js/packs/maastokohteet-prt.js:430` |
| PRT | fokuskohde | `kohde:hahmotelma-castro-marim` | Castro Marimin suoalue | Castro Marimin. | **Castro Marim** | `js/packs/hahmotelma-prt.js:1257` |
| PRT | fokuskohde | `kohde:hahmotelma-foz-coa` | Côa-laakson kalliopiirrokset | Côa-laakson. | **Côa-laakso** | `js/packs/hahmotelma-prt.js:636` |
| PRT | fokuskohde | `kohde:hahmotelma-hospital-real-todos-os-santos` | Hospital Real de Todos-os-Santos | Hospital Real de. | **Todos-os-Santos** | `js/packs/monumentit-eurooppa.js:136` |
| PRT | fokuskohde | `kohde:hahmotelma-panasqueira` | Panasqueiran kaivos | Panasqueiran. | **Panasqueira** | `js/packs/hahmotelma-prt.js:1384` |
| PRT | fokuskohde | `kohde:hahmotelma-sao-domingos` | São Domingosin kaivos | São Domingosin. | **São Domingos** | `js/packs/hahmotelma-prt.js:1195` |
| PRT | fokuskohde | `kohde:hahmotelma-torres-vedras` | Torres Vedrasin linjat | Torres Vedrasin. | **Torres Vedras** | `js/packs/hahmotelma-prt.js:1516` |
| PRT | fokuskohde | `kohde:hahmotelma-vila-nova-de-cerveira` | Vila Nova de Cerveira | Vila Nova de. | **Cerveira** | `js/packs/hahmotelma-prt.js:431` |
| ROU | fokuskohde | `kohde:hahmotelma-alba-iulia` | Alba Carolina -linnoitus | Alba Carolina. | **Alba Carolina** | `js/packs/hahmotelma-rou.js:760` |
| ROU | fokuskohde | `kohde:hahmotelma-berca` | Bercan mutatulivuoret | Bercan. | **Berca** | `js/packs/hahmotelma-rou.js:272` |
| ROU | fokuskohde | `kohde:hahmotelma-curtea-de-arges` | Curtea de Argeșin luostari | Curtea de Argeșin. | **Curtea de Argeș** | `js/packs/hahmotelma-rou.js:963` |
| ROU | fokuskohde | `kohde:hahmotelma-retezat` | Retezatin kansallispuisto | Retezatin. | **Retezat** | `js/packs/hahmotelma-rou.js:73` |
| ROU | fokuskohde | `kohde:hahmotelma-scarisoara` | Scărișoaran jääluola | Scărișoaran. | **Scărișoara** | `js/packs/hahmotelma-rou.js:346` |
| ROU | fokuskohde | `kohde:hahmotelma-slanic` | Slănic Prahovan suolakaivos | Slănic Prahovan. | **Slănic Prahova** | `js/packs/hahmotelma-rou.js:1840` |
| RUS | fokuskohde | `kohde:hahmotelma-nizni-novgorod` | Nižni Novgorodin messut | Nižni Novgorodin. | **Nižni Novgorod** | `js/packs/hahmotelma-rus.js:280` |
| RUS | fokuskohde | `kohde:hahmotelma-tsiolkovski` | Konstantin Tsiolkovski | Konstantin. | **Tsiolkovski** | `js/packs/hahmotelma-rus.js:381` |
| RUS | fokuskohde | `kohde:hahmotelma-valkokivinen-kreml` | Moskovan valkokivinen Kreml | Moskovan. | **Kreml** | `js/packs/monumentit-eurooppa.js:380` |
| RUS | fokuskohde | `kohde:solovetskin-luostari` | Solovetskin luostari | Solovetskin. | **Solovetski** | `js/packs/maastokohteet-rus.js:507` |
| RUS | takynosto | `nosto:pietarhovin-suihkulahteet` | Pietarhovin kaskadi | Pietarhovin. | **Pietarhovi** | `js/packs/fokusvirta-pietari.js:1166` |
| SAU | fokuskohde | `kohde:jubbah` | Jubbahin kalliotaide | Jubbahin. | **Jubbah** | `js/packs/maastokohteet-sau.js:187` |
| SGP | fokuskohde | `kohde:sgp-kasvitieteellinen-puutarha` | Kasvitieteellinen puutarha | Kasvitieteellinen. | **Kasvitarha** | `js/packs/maastokohteet-sgp.js:84` |
| SLB | fokuskohde | `kohde:uuden-georgian-salmi` | Uuden-Georgian salmi | Uuden-Georgian. | **Uusi-Georgia** | `js/packs/maastokohteet-slb.js:228` |
| SLE | elaintaky | `elaintaky:SLE` | Länsiafrikansimpanssi | Länsiafrikansimpa. | **Simpanssi** | `js/packs/elaintakyt.js:2062 (elain)` |
| SVK | fokuskohde | `kohde:hahmotelma-bratislava` | Bratislava (Pozsony) | Bratislava. | **Bratislava** | `js/packs/hahmotelma-svk.js:706` |
| SVK | fokuskohde | `kohde:hahmotelma-ochtinska` | Ochtinská aragoniittiluola | Ochtinská. | **Ochtinská** | `js/packs/hahmotelma-svk.js:204` |
| SVK | fokuskohde | `kohde:hahmotelma-poloniny` | Poloninyn kansallispuisto | Poloninyn. | **Poloniny** | `js/packs/hahmotelma-svk.js:253` |
| SVK | fokuskohde | `kohde:hahmotelma-tokaj` | Tokaj (Slovakian puoli) | Tokaj (Slovakian. | **Tokaj** | `js/packs/hahmotelma-svk.js:1837` |
| SVK | fokuskohde | `kohde:hahmotelma-vydrica-zuckermandel` | Vydrica–Zuckermandel | Vydrica–Zuckerman. | **Zuckermandel** | `js/packs/monumentit-eurooppa.js:276` |
| SVN | fokuskohde | `kohde:hahmotelma-kostanjevica` | Kostanjevica na Krki | Kostanjevica na. | **Kostanjevica** | `js/packs/hahmotelma-svn.js:952` |
| SWE | fokuskohde | `kohde:hahmotelma-abisko` | Abiskon kansallispuisto | Abiskon. | **Abisko** | `js/packs/hahmotelma-swe.js:143` |
| SWE | fokuskohde | `kohde:hahmotelma-gammelstad` | Gammelstadin kirkkokylä | Gammelstadin. | **Gammelstad** | `js/packs/hahmotelma-swe.js:1863` |
| SWE | fokuskohde | `kohde:hahmotelma-halsingegardar` | Hälsingen koristellut maatilat | Hälsingen. | **Hälsingegårdar** | `js/packs/hahmotelma-swe.js:1568` |
| SWE | fokuskohde | `kohde:hahmotelma-kosterhavet` | Kosterhavetin kansallispuisto | Kosterhavetin. | **Kosterhavet** | `js/packs/hahmotelma-swe.js:486` |
| SWE | fokuskohde | `kohde:hahmotelma-sarek` | Sarekin kansallispuisto | Sarekin. | **Sarek** | `js/packs/hahmotelma-swe.js:78` |
| SWE | fokuskohde | `kohde:hahmotelma-varberg` | Varbergin linnoitus | Varbergin. | **Varberg** | `js/packs/hahmotelma-swe.js:1085` |
| SWE | fokuskohde | `kohde:lundintuomiokirkko` | Lundin tuomiokirkko | Lundin. | **Lund** | `js/packs/maastokohteet-swe.js:864` |
| TZA | fokuskohde | `kohde:kondoa` | Kondoan kalliotaide | Kondoan. | **Kondoa** | `js/packs/maastokohteet-tza.js:179` |
| UGA | fokuskohde | `kohde:kibale` | Kibalen kansallispuisto | Kibalen. | **Kibale** | `js/packs/maastokohteet-uga.js:208` |
| UGA | fokuskohde | `kohde:murchison` | Murchisonin putoukset | Murchisonin. | **Murchison** | `js/packs/maastokohteet-uga.js:153` |
| UGA | fokuskohde | `kohde:nyero` | Nyeron kalliomaalaukset | Nyeron. | **Nyero** | `js/packs/maastokohteet-uga.js:235` |
| UGA | fokuskohde | `kohde:queenelizabeth` | Queen Elizabethin puisto | Queen Elizabethin. | **Queen Elizabeth** | `js/packs/maastokohteet-uga.js:180` |
| UKR | fokuskohde | `kohde:hahmotelma-bakhchysarai` | Bakhchysarain palatsi | Bakhchysarain. | **Bakhchysarai** | `js/packs/hahmotelma-ukr.js:253` |
| UKR | fokuskohde | `kohde:hahmotelma-kolomyia` | Pysanka-museo, Kolomyia | Pysanka-museo,. | **Pysanka-museo** | `js/packs/hahmotelma-ukr.js:304` |
| UKR | fokuskohde | `kohde:hahmotelma-kultainen-portti` | Kiovan Kultainen portti | Kiovan Kultainen. | **Kultainen portti** | `js/packs/hahmotelma-ukr.js:1064` |
| UKR | fokuskohde | `kohde:hahmotelma-kymmenyskirkko` | Kiovan Kymmenyskirkko | Kiovan. | **Kymmenyskirkko** | `js/packs/monumentit-eurooppa.js:390` |
| UKR | fokuskohde | `kohde:hahmotelma-medzhybizh` | Medzhybižin linnoitus | Medzhybižin. | **Medzhybiž** | `js/packs/hahmotelma-ukr.js:760` |
| UKR | fokuskohde | `kohde:kamjanets-podilskyin-linna` | Kamjanets-Podilskyin linna | Kamjanets-Podilsk. | **Kamjanets** | `js/packs/maastokohteet-ukr.js:306` |
| UKR | fokuskohde | `kohde:tsernobylin-ydinvoimala` | Tšernobylin ydinvoimala | Tšernobylin. | **Tšernobyl** | `js/packs/maastokohteet-ukr.js:351` |
| URY | fokuskohde | `kohde:coloniadelsacramento` | Colonia del Sacramento | Colonia del. | **Colonia** | `js/packs/maastokohteet-ury.js:135` |
| URY | fokuskohde | `kohde:quebradadeloscuervos` | Quebrada de los Cuervos | Quebrada de los. | **Los Cuervos** | `js/packs/maastokohteet-ury.js:269` |
| URY | fokuskohde | `kohde:santateresanlinnoitus` | Santa Teresan linnoitus | Santa Teresan. | **Santa Teresa** | `js/packs/maastokohteet-ury.js:241` |
| VEN | elaintaky | `elaintaky:VEN` | Jättimuurahaiskarhu | Jättimuurahaiskar. | **Muurahaiskarhu** | `js/packs/elaintakyt.js:2315 (elain)` |
| YEM | fokuskohde | `kohde:jabalannabishuayb` | Jabal an-Nabi Shu'ayb | Jabal an-Nabi. | **An-Nabi Shu'ayb** | `js/packs/maastokohteet-yem.js:34` |
| ZAF | fokuskohde | `kohde:sterkfonteinin-luolat` | Sterkfonteinin luolat | Sterkfonteinin. | **Sterkfontein** | `js/packs/maastokohteet-zaf.js:163` |
| ZAF | fokuskohde | `kohde:vredefortin-kraatteri` | Vredefortin kraatteri | Vredefortin. | **Vredefort** | `js/packs/maastokohteet-zaf.js:316` |
| - | napakohde | `kohde:ark-gronlannin-jaatikko` | Grönlannin jäätikkö | Grönlannin. | **Mannerjäätikkö** | `js/packs/maastokohteet-ark.js:814` |
| - | napakohde | `kohde:ark-ilulissat` | Ilulissatin jäävuono | Ilulissatin. | **Ilulissat** | `js/packs/maastokohteet-ark.js:877` |
| - | napakohde | `kohde:ark-nautilus` | Nautilus navan alla | Nautilus navan. | **Nautilus** | `js/packs/maastokohteet-ark.js:469` |
