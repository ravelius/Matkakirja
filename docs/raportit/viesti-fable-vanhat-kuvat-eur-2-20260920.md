# Vanhat kuvattomat nostot, Eurooppa: erä 2

Haara `sonnet-vanhat-kuvat-eur-2` (pohja origin/main v1968 + kuvat). Ei julkaisua: ei versionumeroa, PR:ää, ämpäriin latausta eikä Raamattu-muutoksia. Kuvat odottavat kansiossa `/Users/samireivinen/Matkakirja-nostot-kuvat/vanhat-eur/` (erä 2: 395 tiedostoa; koko kansiossa 503 tiedostoa yhdessä erän 1 kanssa; osoite `karttanostot/20260920/`, nimi `<iso>-nosto-<id>-<sha8>.jpg`, sha8 tarkistettu koneella, leveys enintään 1800 px).

## Tulos

- **199 nostoa sai kuvat, 395 kuvaa.** Jokaisella 2 kuvaa paitsi ruotsinsalmi (FIN), westerplatte (POL) ja poltavan-taistelu (UKR), joilla on kelvollinen vain 1 (Commonsissa ei kelvollista toista: sotakuvia, museoleimoja tai lisenssi ei kelpaa).
- Erän 2 lista: kaikki EU-maat + ALB/BIH/BLR/MKD/MNE/MDA/SRB/UKR/RUS, 199 kuvatonta; **3 ihmekohdetta (FRA/tuileries, FRA/bastilji, GRC/rodoksen-kolossi) jätetty pois** (`ihme`-kenttä; vain ihmekuva). Erän 1 viisi kadonnutta (crystal-palace, vanha-london-bridge, halikarnassos, hippodromi, pergamonin-alttari) pysyvät ilman kuvaa. ALB, BLR, MKD, MNE, MDA, SRB, XKX: kuvattomia ei ole (ei vanhoja kuvattomia noston).
- Kuvaselitteissä ei lähdeviittauksia; lisenssit vain PD/CC0/CC BY/CC BY-SA, tekijä ja lisenssi Commonsin rajapinnasta. Pakkojen ylätunnisteet päivitetty ("kuvaton erä" -selitykset).
- Testit: `node --test tests/*.test.mjs` → 3722 testiä, 3709 läpi, 0 kaatunut, 13 ohitettu. `tarkista-kaksoisavaimet`: ei kaksoisavaimia.

## Tarkistettavaa (Fablelle)

- **Mauthausen (AUT):** kuvat esittävät muistopaikan sisäänkäyntiä ja tornirakennuksia (piikkilankaa näkyy reunassa), ei ihmisiä. Keskitysleirin muistopaikka; hylkää halutessasi.
- **Lindholm Høje (DNK):** viikinkiajan hautapaikka; kuvissa museorakennus ja kivikehiä nurmella, ei hautoja eikä ihmisiä.
- **Tollundin mies (DNK):** vain löytöpaikan maisemaa, ei ruumiskuvia.
- **Poltavan taistelu (UKR):** 1 kuva (muistomerkki); taistelumaalaukset hylättiin väkivallan takia.
- Heikot kuvat: pediaios (CYP), puntukas (LTU: toinen kuva postimerkki), kolan-niemi (LVA), krzemionki, adrianmeri (BIH/ITA), itameri (LTU: hylky), kolan-syvareika (RUS).
- Yhteiset id:t (itameri, pohjanmeri, adrianmeri, barentsinmeri, tonava, valimeri) ovat eri maissa eri kohteita; agenttien JSONit ylikirjoittivat toisiaan (yksi agentti poisti toisen kuvia ja lataamalla ne uudelleen palautti; DNK itameri tehtiin kokonaan uudelleen). Tulos tarkistettu koneella: jokainen paketin osoite vastaa kansion tiedostoa ja sha8:aa, ei orpoja tiedostoja.
- Kuvat, joita agentit eivät ehtineet katsoa silmällä alkuperäisenä (~20, lähinnä PRT/NLD/ESP), katsottiin pikkukuvasta; jos haluat varmuuden, katso Portugalin ja Alankomaiden kuvat ensin.

## Taulukko maa / nosto / ennen / jälkeen

| Maa | Nosto | Ennen | Jälkeen |
|---|---|---|---|
| AUT | groglockner | ei kuvaa | 2 kuvaa: Michael Schmid (CC BY-SA 2.0); Dimitry Anikin (CC0) |
| AUT | wildspitze | ei kuvaa | 2 kuvaa: Tiia Monto (CC BY 4.0); Whgler (CC BY-SA 4.0) |
| AUT | tonava | ei kuvaa | 2 kuvaa: Jakub Hałun (CC BY-SA 4.0); Alexander von Bensa (Public domain) |
| AUT | inn | ei kuvaa | 2 kuvaa: Nicholas Hartmann (CC BY-SA 4.0); Carsten Steger (CC BY-SA 4.0) |
| AUT | hallstatt | ei kuvaa | 2 kuvaa: C.Stadler/Bwag (CC BY-SA 4.0); Andrew Bossi (CC BY-SA 2.5) |
| AUT | melkin-luostari | ei kuvaa | 2 kuvaa: Thomas Ledl (CC BY-SA 4.0); Carsten Steger (CC BY-SA 4.0) |
| AUT | hohensalzburg | ei kuvaa | 2 kuvaa: Andreas Stiasny (CC BY-SA 4.0); Carsten Steger (CC BY-SA 4.0) |
| AUT | semmeringin-rata | ei kuvaa | 2 kuvaa: Haeferl (CC BY-SA 3.0); C.Stadler/Bwag (CC BY-SA 4.0) |
| AUT | mauthausen | ei kuvaa | 2 kuvaa: Dnalor 01 (CC BY-SA 3.0); Philipp7423 (CC BY-SA 4.0) |
| AUT | durnstein | ei kuvaa | 2 kuvaa: Jakub Hałun (CC BY-SA 4.0); Uoaei1 (CC BY-SA 4.0) |
| AUT | carnuntum | ei kuvaa | 2 kuvaa: Barnos (CC BY-SA 4.0); Tobias Kleinlercher (CC BY-SA 4.0) |
| AUT | eisriesenwelt | ei kuvaa | 2 kuvaa: Wolfgang Kritzinger (CC BY-SA 3.0); Diego Delso (CC BY-SA 4.0) |
| AUT | erzberg | ei kuvaa | 2 kuvaa: Duke of W4 (CC BY-SA 3.0); Haeferl (CC BY-SA 3.0) |
| AUT | bregenzin-jarvinayttamo | ei kuvaa | 2 kuvaa: Edda Praefcke (CC BY 2.5); Olaf Kosinsky (CC BY-SA 3.0) |
| AUT | krimmlin-vesiputoukset | ei kuvaa | 2 kuvaa: Andrew Bossi (CC BY-SA 2.5); Andrew Bossi (CC BY-SA 2.5) |
| BGR | nesebar | ei kuvaa | 2 kuvaa: Chrumps (CC BY-SA 4.0); Michal Gorski (CC BY-SA 3.0) |
| BGR | belogradtsik | ei kuvaa | 2 kuvaa: Pudelek (Marcin Szala) (CC BY-SA 3.0); Vislupus (CC BY-SA 4.0) |
| BIH | maglic | ei kuvaa | 2 kuvaa: Martin Brož (CC BY 3.0); Dingoa (CC BY-SA 3.0) |
| BIH | adrianmeri | ei kuvaa | 2 kuvaa: tomkennedyastro (CC BY-SA 4.0); Alfred Zoff (Public domain) |
| BIH | blidinje | ei kuvaa | 2 kuvaa: Martin Brož (CC BY 3.0); Hienstorfer (CC BY-SA 4.0) |
| BIH | bobovac | ei kuvaa | 2 kuvaa: Badener (CC BY 3.0); Branimir Mlakić (CC BY 3.0) |
| CYP | olympos | ei kuvaa | 2 kuvaa: Chneophytou (CC BY-SA 3.0); Digr (CC BY-SA 4.0) |
| CYP | pediaios | ei kuvaa | 2 kuvaa: Peter in s (CC BY-SA 4.0); Fry72, Karel Frydrýšek (CC BY-SA 4.0) |
| CYP | levantinmeri | ei kuvaa | 2 kuvaa: Manfred Werner (Tsui) (CC BY-SA 4.0); Manfred Werner (Tsui) (CC BY-SA 4.0) |
| CYP | paphoksenmosaiikit | ei kuvaa | 2 kuvaa: Carole Raddato (CC BY-SA 2.0); Institute for the Study of the Ancient World (CC BY 2.0) |
| CYP | palaipafos | ei kuvaa | 2 kuvaa: Carole Raddato (CC BY-SA 2.0); Wojciech Biegun (CC BY-SA 3.0) |
| CYP | kourion | ei kuvaa | 2 kuvaa: Peter Collins (CC BY-SA 2.0); Jules Verne Times Two (CC BY-SA 4.0) |
| CYP | khirokitia | ei kuvaa | 2 kuvaa: Ophelia2 (CC BY-SA 3.0); Pan narrans (CC BY-SA 3.0) |
| CYP | asinounkirkko | ei kuvaa | 2 kuvaa: Xenophon (CC BY-SA 3.0); Zairon (CC BY-SA 4.0) |
| CYP | kykkoksenluostari | ei kuvaa | 2 kuvaa: Julian Nyča (CC BY-SA 3.0); Héctor Ochoa 'Robot8A' (CC BY-SA 4.0) |
| CYP | kapgreco | ei kuvaa | 2 kuvaa: kallerna (CC BY-SA 4.0); kallerna (CC BY-SA 4.0) |
| CYP | apostolosandreas | ei kuvaa | 2 kuvaa: Anja Leidel (CC BY-SA 2.0); Chris06 (CC BY-SA 4.0) |
| CZE | konesprezna-draha | ei kuvaa | 2 kuvaa: tekijä tuntematon (Public domain); Dralon (CC BY-SA 2.0) |
| CZE | jablonec | ei kuvaa | 2 kuvaa: ŠJů (CC BY-SA 3.0); Jiří Sedláček (CC BY-SA 3.0) |
| CZE | decin | ei kuvaa | 2 kuvaa: Ondřej Koníček (Public domain); Pudelek (CC BY-SA 4.0) |
| CZE | tabor | ei kuvaa | 2 kuvaa: Michielverbeek (CC BY-SA 4.0); ŠJů (CC BY-SA 3.0) |
| CZE | olomouc | ei kuvaa | 2 kuvaa: Pudelek (CC BY-SA 4.0); Zinneke (CC BY-SA 3.0) |
| CZE | jachymov | ei kuvaa | 2 kuvaa: Ondrej.konicek (CC BY-SA 3.0); Jan Helebrant (CC BY-SA 2.0) |
| CZE | moravskykras | ei kuvaa | 2 kuvaa: Ben Skála, Benfoto (CC BY-SA 3.0); Prazak (CC BY 2.5) |
| CZE | boubin | ei kuvaa | 2 kuvaa: Dingoa (CC BY-SA 3.0); Safranek-interia.eu (CC0) |
| CZE | lednice | ei kuvaa | 2 kuvaa: Johann Adam Delsenbach (Public domain); Harold (CC BY-SA 3.0) |
| DNK | mllehj | ei kuvaa | 2 kuvaa: JMiall (CC BY-SA 3.0); JMiall (CC BY-SA 3.0) |
| DNK | pohjanmeri | ei kuvaa | 2 kuvaa: Slaunger (CC BY-SA 3.0); Bärbel Miemietz (CC BY-SA 4.0) |
| DNK | itameri | ei kuvaa | 2 kuvaa: Socket0 (CC0); Socket0 (CC0) |
| DNK | roskilden-tuomiokirkko | ei kuvaa | 2 kuvaa: Jakub Hałun (CC BY-SA 4.0); CucombreLibre (CC BY 2.0) |
| DNK | kronborg | ei kuvaa | 2 kuvaa: Ermell (CC BY-SA 4.0); Richard Mortel (CC BY 2.0) |
| DNK | jellingin-kivet | ei kuvaa | 2 kuvaa: Jürgen Howaldt (CC BY-SA 2.0 de); Ajepbah (CC BY-SA 3.0) |
| DNK | ribe | ei kuvaa | 2 kuvaa: Arne Müseler (CC BY-SA 4.0); Hjart (CC BY-SA 4.0) |
| DNK | skagen | ei kuvaa | 2 kuvaa: Lukas Riebling (CC BY-SA 3.0); Strokin.ru (CC BY 3.0) |
| DNK | frederiksborgin-linna | ei kuvaa | 2 kuvaa: Casper Moller (CC BY 2.0); Johan Christian Dahl (Public domain) |
| DNK | storebaeltin-silta | ei kuvaa | 2 kuvaa: Sendelbach (Public domain); Johnston9494 (CC BY-SA 3.0) |
| DNK | tollundin-mies | ei kuvaa | 2 kuvaa: Nils Jepsen (CC BY-SA 4.0); Nils Jepsen (CC BY-SA 4.0) |
| DNK | egeskov | ei kuvaa | 2 kuvaa: Malene Thyssen (CC BY-SA 3.0); CucombreLibre (CC BY 2.0) |
| DNK | mons-klint | ei kuvaa | 2 kuvaa: Josef F. Stuefer (CC BY 2.0); Chad K (CC BY 2.0) |
| DNK | lindholm-hoje | ei kuvaa | 2 kuvaa: Liberaler Humanist (CC BY-SA 3.0); Frank Vincentz (CC BY-SA 3.0) |
| DNK | billund | ei kuvaa | 2 kuvaa: HartOve (CC BY 4.0); Michał Beim (CC BY 4.0) |
| ESP | mulhacen | ei kuvaa | 2 kuvaa: Carlos Serra (CC BY-SA 3.0); Nilsf at German Wikipedia (CC BY-SA 3.0) |
| ESP | aneto | ei kuvaa | 2 kuvaa: Manuel Velazquez (CC BY 3.0); Pere Ramon (CC BY-SA 3.0) |
| ESP | valimeri | ei kuvaa | 2 kuvaa: Txllxt TxllxT (CC BY-SA 4.0); Friedrich Haag (CC BY-SA 4.0) |
| ESP | tajo | ei kuvaa | 2 kuvaa: Diliff (CC BY-SA 3.0); Manzana de Eva (CC BY-SA 4.0) |
| ESP | ebro | ei kuvaa | 2 kuvaa: Adam Jones from Kelowna, BC, Canada (CC BY-SA 2.0); Juanedc from Zaragoza, España (CC BY 2.0) |
| ESP | santiago-de-compostela | ei kuvaa | 2 kuvaa: Luis Miguel Bugallo Sánchez (Lmbuga) (CC BY-SA 3.0); Joseolgon (CC BY 4.0) |
| ESP | segovian-akvedukti | ei kuvaa | 2 kuvaa: Bernard Gagnon (CC BY-SA 3.0); Jebulon (CC0) |
| ESP | altamiran-luola | ei kuvaa | 2 kuvaa: Daniel VILLAFRUELA (CC BY-SA 3.0); Alonso de Mendoza (CC BY-SA 4.0) |
| ESP | toledo | ei kuvaa | 2 kuvaa: Diliff (CC BY 2.5); ajay_suresh (CC BY 2.0) |
| ESP | cordoban-moskeijakatedraali | ei kuvaa | 2 kuvaa: Alvaro.vinuela.carnicero (CC BY-SA 4.0); Benjamin Smith (CC BY-SA 4.0) |
| ESP | las-medulas | ei kuvaa | 2 kuvaa: Rafael Ibáñez Fernández (CC BY-SA 3.0); Justraveling.com (CC BY-SA 4.0) |
| ESP | meridan-roomalainen-teatteri | ei kuvaa | 2 kuvaa: Octopus at Slovenian Wikipedia (CC BY-SA 3.0); Benjamín Núñez González (CC BY-SA 4.0) |
| ESP | salamancan-yliopisto | ei kuvaa | 2 kuvaa: Alejandro Moreno Calvo from Madrid, Spain (CC BY 2.0); Zarateman (CC0) |
| EST | matsalu | ei kuvaa | 2 kuvaa: Olev Mihkelmaa, olev.ee (CC BY-SA 3.0); Olev Mihkelmaa, olev.ee (CC BY-SA 3.0) |
| EST | peipsi | ei kuvaa | 2 kuvaa: Modris Putns (CC BY-SA 3.0); Julian Nyča (CC BY-SA 4.0) |
| EST | emajogi | ei kuvaa | 2 kuvaa: Geonarva (CC BY-SA 3.0); Hill-Mill Billy (CC BY-SA 3.0) |
| EST | kaali | ei kuvaa | 2 kuvaa: Pt (CC BY-SA 3.0); sulevss (CC BY 3.0) |
| EST | haapsalu | ei kuvaa | 2 kuvaa: Sander Säde at English Wikipedia (CC BY 3.0); Sergei Gussev (CC BY 2.0) |
| EST | rakvere | ei kuvaa | 2 kuvaa: Tauno Rahnu (CC BY-SA 4.0); Janek A (CC BY 3.0) |
| EST | ontika | ei kuvaa | 2 kuvaa: Tiit Tõnurist/Hiiumaa Mudeliklubi (CC BY-SA 4.0); Hannu (Public domain) |
| EST | lahemaa | ei kuvaa | 2 kuvaa: Ninov (CC BY-SA 3.0); Suurjalg (CC BY-SA 4.0) |
| FIN | verla | ei kuvaa | 2 kuvaa: Pöllö (CC BY 3.0); Ypsilon from Finland (CC0) |
| FIN | saimaankanava | ei kuvaa | 2 kuvaa: Sami Koskinen (CC BY-SA 2.5); Леонид Порошков (CC BY-SA 4.0) |
| FIN | ruotsinsalmi | ei kuvaa | 1 kuvaa: MKFI (Public domain) |
| FIN | kultala | ei kuvaa | 2 kuvaa: MattiPaavola (CC BY-SA 3.0); BishkekRocks (CC BY-SA 3.0) |
| FRA | nakyva-kaupunki-lyon | ei kuvaa | 2 kuvaa: Otourly (CC BY-SA 3.0); Alexmar983 (Public domain) |
| FRA | nakyva-kaupunki-bordeaux | ei kuvaa | 2 kuvaa: Patrick Despoix (CC BY-SA 3.0); Coyau (CC BY-SA 3.0) |
| FRA | nakyva-kaupunki-lille | ei kuvaa | 2 kuvaa: Velvet (CC BY-SA 3.0); Pymouss (CC BY-SA 3.0) |
| FRA | nakyva-kaupunki-strasbourg | ei kuvaa | 2 kuvaa: Dietmar Rabich (CC BY-SA 4.0); tekijä tuntematon (Public domain) |
| FRA | nakyva-kaupunki-nizza | ei kuvaa | 2 kuvaa: Cayambe (CC BY-SA 3.0); Lspigon (Public domain) |
| FRA | nakyva-kaupunki-toulouse | ei kuvaa | 2 kuvaa: Benh LIEU SONG (CC BY-SA 3.0); Velvet (CC BY-SA 3.0) |
| FRA | nakyva-kaupunki-nantes | ei kuvaa | 2 kuvaa: Selbymay (CC BY-SA 4.0); Eusebius (CC BY 3.0) |
| IRL | carrauntoohil | ei kuvaa | 2 kuvaa: Mariusz Z (CC BY-SA 2.0); Reeks District (CC BY 2.0) |
| IRL | irlanninmeri | ei kuvaa | 2 kuvaa: Christian David (CC BY-SA 4.0); Lizardolson (CC BY-SA 4.0) |
| IRL | shannon | ei kuvaa | 2 kuvaa: Santiperez (CC BY-SA 3.0); Photogoddle (CC BY-SA 4.0) |
| IRL | taran-kukkula | ei kuvaa | 2 kuvaa: Ianfhunter (CC BY 4.0); Nigel Thompson (CC BY-SA 2.0) |
| IRL | clonmacnoise | ei kuvaa | 2 kuvaa: Martin Kerans (CC BY-SA 2.0); Eric Jones (CC BY-SA 2.0) |
| IRL | rock-of-cashel | ei kuvaa | 2 kuvaa: Michael Deligan (CC BY-SA 4.0); Michael Deligan (CC BY-SA 4.0) |
| IRL | skellig-michael | ei kuvaa | 2 kuvaa: Jerzy Strzelecki (CC BY-SA 3.0); NoNameIsLeft (CC BY-SA 4.0) |
| IRL | ceide-fields | ei kuvaa | 2 kuvaa: Michael Dibb (CC BY-SA 2.0); Michael Dibb (CC BY-SA 2.0) |
| IRL | moherin-kalliot | ei kuvaa | 2 kuvaa: Joseph Mischyshyn (CC BY-SA 2.0); Colin Park (CC BY-SA 2.0) |
| IRL | kilkennyn-linna | ei kuvaa | 2 kuvaa: Zairon (CC BY 4.0); Elena Tatiana Chis (CC BY-SA 4.0) |
| IRL | croagh-patrick | ei kuvaa | 2 kuvaa: Gary Miotla (CC BY 3.0); Robert Ashby (CC BY-SA 2.0) |
| IRL | dun-aonghasa | ei kuvaa | 2 kuvaa: Marathon (CC BY-SA 2.0); Sonse (CC BY 2.0) |
| IRL | glendalough | ei kuvaa | 2 kuvaa: Bananenfalter (CC0); Karlunun (CC0) |
| ITA | adrianmeri | ei kuvaa | 2 kuvaa: Cinnich (CC BY-SA 4.0); Máté Bányi (CC BY-SA 3.0) |
| ITA | tyrrhenanmeri | ei kuvaa | 2 kuvaa: Patrick Nouhailler (CC BY-SA 3.0); Daniel Ventura (CC BY-SA 3.0) |
| ITA | ligurianmeri | ei kuvaa | 2 kuvaa: Micael Widell (CC BY 3.0); Antonina Dattola (CC BY-SA 4.0) |
| LTU | aukstojas | ei kuvaa | 2 kuvaa: Vilensija (CC BY-SA 3.0); Aidas U. (CC BY 3.0) |
| LTU | itameri | ei kuvaa | 2 kuvaa: Mantas Volungevicius (CC BY 2.0); Juha Flinkman, SubZone OY (CC BY-SA 4.0) |
| LTU | nemunas | ei kuvaa | 2 kuvaa: Julian Nyča (CC BY-SA 4.0); Tolmintonis (CC BY-SA 3.0) |
| LTU | trakain-saarilinna | ei kuvaa | 2 kuvaa: Diliff (CC BY-SA 3.0); Wincenty Dmochowski (Public domain) |
| LTU | kernave | ei kuvaa | 2 kuvaa: Hugo.arg (Public domain); Phillip Capper (CC BY 2.0) |
| LTU | ristien-kukkula | ei kuvaa | 2 kuvaa: Diliff (CC BY-SA 3.0); Wojsyl (CC BY-SA 3.0) |
| LTU | kuurinkynnas | ei kuvaa | 2 kuvaa: Baltictrails (CC BY-SA 4.0); Hartmut Schmidt Heidelberg (CC BY-SA 4.0) |
| LTU | palangan-meripihkamuseo | ei kuvaa | 2 kuvaa: Diliff (CC BY-SA 3.0); GraceKelly (CC BY-SA 3.0) |
| LTU | rumsiskes | ei kuvaa | 2 kuvaa: Pudelek (Marcin Szala) (CC BY-SA 3.0); Zairon (CC BY-SA 4.0) |
| LTU | grutas-puisto | ei kuvaa | 2 kuvaa: yeowatzup (CC BY 2.0); Adriao (CC BY-SA 3.0) |
| LTU | yhdeksas-fortti | ei kuvaa | 2 kuvaa: Andrius Vanagas (CC BY 3.0); Adam Jones from Kelowna, BC, Canada (CC BY-SA 2.0) |
| LTU | klaipeda | ei kuvaa | 2 kuvaa: Žiedas (Public domain); Andrzej Otrębski (CC BY-SA 4.0) |
| LTU | puntukas | ei kuvaa | 2 kuvaa: Post of Lithuania (Public domain); Vilensija (Public domain) |
| LTU | aukstaitija | ei kuvaa | 2 kuvaa: Wojsyl (CC BY-SA 3.0); Hugo.arg (CC BY-SA 3.0) |
| LVA | gaizinkalns | ei kuvaa | 2 kuvaa: Sirujs Enobs (CC BY-SA 3.0); BirdsEyeLV (CC BY-SA 3.0) |
| LVA | itameri | ei kuvaa | 2 kuvaa: Algirts (CC BY 3.0); Laima Gūtmane (simka… (CC BY-SA 3.0) |
| LVA | vainajoki | ei kuvaa | 2 kuvaa: Ainars Brūvelis (CC BY-SA 3.0); Kikos (CC BY-SA 4.0) |
| LVA | rundale | ei kuvaa | 2 kuvaa: Zhagatasligzda (CC BY-SA 4.0); Pudelek (Marcin Szala) (CC BY-SA 3.0) |
| LVA | cesis | ei kuvaa | 2 kuvaa: AgrisR (CC BY-SA 4.0); AgrisR (CC BY-SA 4.0) |
| LVA | turaidan-ruusu | ei kuvaa | 2 kuvaa: Pudelek (Marcin Szala) (CC BY-SA 3.0); Fawksik (CC BY-SA 4.0) |
| LVA | liepaja | ei kuvaa | 2 kuvaa: Werner100359 (CC BY-SA 4.0); Chmee2 (CC BY-SA 3.0) |
| LVA | sabile | ei kuvaa | 2 kuvaa: BirdsEyeLV (CC BY-SA 3.0); Rimantas Lazdynas (Public domain) |
| LVA | jelgava | ei kuvaa | 2 kuvaa: Yakikaki (CC BY-SA 3.0); Pudelek (Marcin Szala) (CC BY-SA 3.0) |
| LVA | daugavpilsin-linnoitus | ei kuvaa | 2 kuvaa: Scotch Mist (CC BY-SA 4.0); Scotch Mist (CC BY-SA 4.0) |
| LVA | engure | ei kuvaa | 2 kuvaa: Uldis Osis (CC BY 3.0); Evita wiki (CC BY-SA 4.0) |
| LVA | ventas-rumba | ei kuvaa | 2 kuvaa: Christopher Voitus (CC BY-SA 3.0); Андрей Романенко (CC BY-SA 4.0) |
| LVA | kolkan-niemi | ei kuvaa | 2 kuvaa: Italas (Public domain); Zairon (CC BY-SA 4.0) |
| LVA | aglona | ei kuvaa | 2 kuvaa: Dainis Matisons uploaded and derivative work: MrPanyGoff (CC BY 2.0); Chmee2 (CC BY-SA 3.0) |
| LVA | gluckin-raamattumuseo | ei kuvaa | 2 kuvaa: Martins Smits (CC BY-SA 3.0); WikedKentaur (CC BY-SA 3.0) |
| NLD | vaalserberg | ei kuvaa | 2 kuvaa: Romaine (CC0); Ziko van Dijk (CC BY-SA 4.0) |
| NLD | pohjanmeri | ei kuvaa | 2 kuvaa: Txllxt TxllxT (CC BY-SA 4.0); Txllxt TxllxT (CC BY-SA 4.0) |
| NLD | maas | ei kuvaa | 2 kuvaa: Mark Ahsmann (CC BY-SA 4.0); DimiTalen (CC0) |
| NLD | deltatyot | ei kuvaa | 2 kuvaa: Dietmar Rabich (CC BY-SA 4.0); Dietmar Rabich (CC BY-SA 4.0) |
| NLD | vredespaleis | ei kuvaa | 2 kuvaa: Carl Sotomil (CC BY 4.0); Steven Lek (CC BY-SA 4.0) |
| NLD | domtoren | ei kuvaa | 2 kuvaa: Michielverbeek (CC BY-SA 4.0); Andy Li (CC0) |
| NLD | giethoorn | ei kuvaa | 2 kuvaa: Steven Lek (CC BY-SA 4.0); Zairon (CC BY-SA 4.0) |
| NLD | krollermuller | ei kuvaa | 2 kuvaa: qwesy qwesy (CC BY 3.0); qwesy qwesy (CC BY 3.0) |
| NLD | nijmegen | ei kuvaa | 2 kuvaa: Michielverbeek (CC BY-SA 4.0); Michielverbeek (CC BY-SA 3.0) |
| NLD | afsluitdijk | ei kuvaa | 2 kuvaa: Gouwenaar (CC0); Paul van Galen (CC BY-SA 4.0) |
| NLD | maastricht | ei kuvaa | 2 kuvaa: Berthold Werner (CC BY-SA 4.0); Edgar El (CC BY 3.0) |
| POL | zamosc | ei kuvaa | 2 kuvaa: Szlomo Lejb (CC BY 3.0); A.Osytek (CC BY-SA 3.0 pl) |
| POL | westerplatte | ei kuvaa | 1 kuvaa: Osmar Valdebenito from Santiago, Chile (CC BY-SA 2.0) |
| POL | gniezno | ei kuvaa | 2 kuvaa: Diego Delso (CC BY-SA 3.0); Krzysztof Golik (CC BY-SA 4.0) |
| POL | elblaginkanava | ei kuvaa | 2 kuvaa: MarmothGD (CC BY-SA 4.0); rysnal (CC BY-SA 3.0) |
| POL | krzemionki | ei kuvaa | 2 kuvaa: Jakub Hałun (CC BY-SA 4.0); Gorofil (CC BY-SA 4.0) |
| PRT | torre | ei kuvaa | 2 kuvaa: Reinhard Müller (CC BY-SA 4.0); Reinhard Müller (CC BY-SA 4.0) |
| PRT | atlantti | ei kuvaa | 2 kuvaa: Alexey Komarov (CC BY-SA 4.0); pictures Jettcom (CC BY 3.0) |
| PRT | tejo | ei kuvaa | 2 kuvaa: Avarim (CC BY-SA 3.0 de); Jakub Hałun (CC BY 4.0) |
| PRT | douro | ei kuvaa | 2 kuvaa: Yiwenli0203 (CC0); Alexkom000 (CC BY 4.0) |
| PRT | tomar | ei kuvaa | 2 kuvaa: GFreihalter (CC BY-SA 3.0); Palickap (CC BY-SA 4.0) |
| PRT | guimaraes | ei kuvaa | 2 kuvaa: CEphoto, Uwe Aranas (CC BY-SA 3.0); John Samuel (CC BY-SA 4.0) |
| PRT | almendres | ei kuvaa | 2 kuvaa: Ingo Mehling (CC BY-SA 4.0); Ingo Mehling (CC BY-SA 4.0) |
| PRT | saovicente | ei kuvaa | 2 kuvaa: Auvideo (CC BY-SA 4.0); Freebird from Madrid, Spain (CC BY-SA 2.0) |
| PRT | elvas | ei kuvaa | 2 kuvaa: Jacinto Júlio Nozes César (CC BY-SA 4.0); Alvesgaspar (CC BY-SA 4.0) |
| PRT | obidos | ei kuvaa | 2 kuvaa: Alexkom000 (CC BY 4.0); Travelholic Path (CC BY 2.0) |
| PRT | aveiro | ei kuvaa | 2 kuvaa: CardosoSousa1988 (CC BY-SA 4.0); John Samuel (CC BY-SA 4.0) |
| ROU | voronet | ei kuvaa | 2 kuvaa: Gary Todd (CC0); Adam Jones Adam63 (CC BY-SA 3.0) |
| ROU | negoiu | ei kuvaa | 2 kuvaa: Civilistul at English Wikipedia (Public domain); Krzysztof Dudzik-Górnicki (CC BY-SA 3.0) |
| ROU | mustameri | ei kuvaa | 2 kuvaa: Julian Nyča (CC BY-SA 4.0); Trecătorul răcit (CC BY-SA 4.0) |
| ROU | tonava | ei kuvaa | 2 kuvaa: Raff (CC BY 2.0); Pyretus (Public domain) |
| RUS | elbrus | ei kuvaa | 2 kuvaa: JukoFF (Public domain); Dmitry A. Mottl (CC BY-SA 4.0) |
| RUS | narodnaja | ei kuvaa | 2 kuvaa: Bmattlet (CC BY-SA 4.0); Oleg Chegodaev (CC BY-SA 4.0) |
| RUS | barentsinmeri | ei kuvaa | 2 kuvaa: RostislavMashin (CC BY-SA 4.0); Ad Meskens (CC BY-SA 4.0) |
| RUS | jaameri | ei kuvaa | 2 kuvaa: Patrick Kelley (CC BY 2.0); AWeith (CC BY-SA 4.0) |
| RUS | ohotanmeri | ei kuvaa | 2 kuvaa: Vihljun (Public domain); Vihljun (Public domain) |
| RUS | beringinmeri | ei kuvaa | 2 kuvaa: U.S. Fish and Wildlife Service (Public domain); Benson Poppy, U.S. Fish and Wildlife Service (Public domain) |
| RUS | volga | ei kuvaa | 2 kuvaa: Ilya Repin (Public domain); Alexxx1979 (CC BY-SA 4.0) |
| RUS | ob | ei kuvaa | 2 kuvaa: Игоревич (Public domain); Mikhail Koninin (CC BY 2.0) |
| RUS | kizhin-pogosta | ei kuvaa | 2 kuvaa: Alexxx1979 (CC BY-SA 4.0); Deniszverev (CC BY-SA 4.0) |
| RUS | solovetskin-luostari | ei kuvaa | 2 kuvaa: Алексей Задонский (CC BY-SA 4.0); Trasprd (CC BY-SA 4.0) |
| RUS | kazanin-kreml | ei kuvaa | 2 kuvaa: Untifler (CC BY-SA 3.0); Alexxx1979 (CC BY-SA 4.0) |
| RUS | veliki-novgorod | ei kuvaa | 2 kuvaa: EkaterinaKhomichenko (CC BY-SA 4.0); Ludvig14 (CC BY-SA 3.0) |
| RUS | kolan-syvareika | ei kuvaa | 2 kuvaa: Alexander Novikov (CC BY-SA 4.0); Шелковников Евгений Анатольевич (CC BY-SA 4.0) |
| RUS | tunguskan-rajahdys | ei kuvaa | 2 kuvaa: Leonid Kulik, the expedition to the Tunguska event (Public domain); Merikanto (CC BY 4.0) |
| RUS | tobolskin-kreml | ei kuvaa | 2 kuvaa: Óðinn (CC BY-SA 2.5 ca); Keith Ruffles (CC BY 3.0) |
| RUS | jasnaja-poljana | ei kuvaa | 2 kuvaa: Celest.ru (CC BY-SA 3.0); Karel x (CC0) |
| SWE | itameri | ei kuvaa | 2 kuvaa: Leonhard Lenz (CC BY-SA 4.0); Arnold Paul (CC BY-SA 2.5) |
| SWE | pohjanlahti | ei kuvaa | 2 kuvaa: MODIS Land Rapid Response Team, NASA GSFC (Public domain); NASA Earth Observatory / Wanmei Liang (Public domain) |
| SWE | birka | ei kuvaa | 2 kuvaa: Jonathan Olsson (CC BY 4.0); Holger.Ellgaard (CC BY-SA 3.0) |
| SWE | falunin-kaivos | ei kuvaa | 2 kuvaa: Hans Lindqvist (CC BY-SA 3.0); Hans Lindqvist (CC BY-SA 3.0) |
| SWE | gota-kanava | ei kuvaa | 2 kuvaa: Leonhard Lenz (CC BY-SA 4.0); Pudelek (CC BY-SA 4.0) |
| SWE | vadstenan-luostari | ei kuvaa | 2 kuvaa: L.G.foto (CC BY-SA 4.0); Sniper Zeta (CC BY-SA 4.0) |
| SWE | kiruna | ei kuvaa | 2 kuvaa: Arild Vågen (CC BY-SA 4.0); Arild Vågen (CC BY-SA 4.0) |
| SWE | vanern | ei kuvaa | 2 kuvaa: Leonhard Lenz (CC BY-SA 4.0); Leonhard Lenz (CC BY-SA 4.0) |
| SWE | kalmarinlinna | ei kuvaa | 2 kuvaa: Hstad (CC BY-SA 3.0); Alexandru Baboş Albabos (CC BY 3.0) |
| SWE | karlskrona | ei kuvaa | 2 kuvaa: Pudelek (CC BY-SA 4.0); Sendelbach (CC BY-SA 3.0) |
| SWE | lundintuomiokirkko | ei kuvaa | 2 kuvaa: Jorchr (CC BY-SA 3.0); David Castor (CC0) |
| SWE | tornionjoki | ei kuvaa | 2 kuvaa: Estormiz (CC0); Arto Alanenpää (CC BY-SA 4.0) |
| SWE | salanhopeakaivos | ei kuvaa | 2 kuvaa: Riggwelter (CC BY-SA 3.0); Tulipasylvestris (CC BY 4.0) |
| UKR | hersonesos | ei kuvaa | 2 kuvaa: Иван Тарасенко (CC BY-SA 3.0); Andrey Butko (CC BY-SA 3.0) |
| UKR | lviv | ei kuvaa | 2 kuvaa: Aeou (CC BY-SA 4.0); Aeou (CC BY-SA 4.0) |
| UKR | hortytsja | ei kuvaa | 2 kuvaa: Yedmitry (CC BY-SA 4.0); Anatoliy Volkov (CC BY-SA 4.0) |
| UKR | poltavan-taistelu | ei kuvaa | 1 kuvaa: Vlad Butsky from San Jose, CA, USA (CC BY 2.0) |
| UKR | sofijivkan-puisto | ei kuvaa | 2 kuvaa: Bonbosch (CC BY-SA 3.0); Bonbosch (CC BY-SA 3.0) |
| UKR | derzhprom | ei kuvaa | 2 kuvaa: Anna Leonenko (CC BY-SA 4.0); Nadiya Li (CC BY-SA 3.0) |
