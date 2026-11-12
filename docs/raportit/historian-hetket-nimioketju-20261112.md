# Historian hetket: otsikot, nimiöketju ja Pariisin aloitukset (SK 12.11.2026)

Haara sisaltokirjuri-hetket-otsikot. EI PR:ää ennen KK:n kuittausta. Tarkistin: `node tools/nimio-ketju.mjs --vanhat <kartta>`.

## 1. Tarkistimen tuloste

```
hetkiä 67, nimiöitä 67; maakartat-hetkikohteita 28, nahtavyysjuttuja 24, miniatyyriavaimia 1111, sijaintirivejä 2057 (hetkikohteita 28), tunnisteavaimia 1118; vanhoja viittauksia 0
HUOM (ei virhe) 3:
 - kohdekartat-sijainnit: pariisi:Tornin nimet 2026 ei ole kaupungin kohde (vanhentunut rivi, ei hetki)
 - kohdekartat-sijainnit: pariisi:Notre-Dame 2019 ei ole kaupungin kohde (vanhentunut rivi, ei hetki)
 - kohdetunnisteet: avain pariisi:Notre-Dame 2019 ei ole kaupungin kohde (vanhentunut rivi)
OK: nimiöketju ehjä
```

## 2. Kaikki 67 hetkeä: vanha → uusi (otsikko ja nimiö)

| id | vanha otsikko | uusi otsikko | nimiö vanha → uusi |
|---|---|---|---|
| kolumbus-portugali-1484 | Lissabon 1484 — kartta, jota kukaan ei osta | **Kolumbus 1484 — Portugali hylkää suunnitelman** | Lissabon 1484 → **Kolumbus 1484** |
| kolumbus-santa-fe-1492 | Santa Fé 1492 — sanansaattaja tavoittaa tiellä | **Kolumbus 1492 — kuningatar hyväksyy matkan** | Santa Fé 1492 → **Kolumbus 1492** |
| kolumbus-palos-1492 | Palos de la Frontera 1492 — kolme laivaa laskuveden mukana | **Palosin lähtö 1492 — Kolumbus purjehtii länteen** | Palos 1492 → **Palosin lähtö 1492** |
| magalhaes-sanlucar-1519 | Sanlúcar de Barrameda 1519 — viisi laivaa, joista yksi palaa | **Magalhães 1519 — maailmanympärimatka alkaa** | Sanlúcar 1519 → **Magalhães 1519** |
| vasco-da-gama-restelo-1497 | Restelon ranta 1497 — yö rukouksessa, aamu Intian tiellä | **Vasco da Gama 1497 — lähtö kohti Intiaa** | Restelo 1497 → **Vasco da Gama 1497** |
| cook-endeavour-plymouth-1768 | Plymouth 1768 — hiililaiva lähtee Tyynellemerelle | **Endeavour 1768 — Cookin tutkimusmatka alkaa** | Endeavour 1768 (ei muutu) |
| trafalgar-victory-1805 | Victoryn peräkansi 1805 — hetki ennen laukausta | **Trafalgar 1805 — Nelsonin laiva ennen taistelua** | Trafalgar 1805 (ei muutu) |
| darwin-galapagos-1835 | Chathamin saari 1835 — kilpikonna ja 26-vuotias mies | **Darwin 1835 — Galápagosin kilpikonnat** | Galápagos 1835 → **Darwin 1835** |
| nansen-fram-1893 | Kristiania 1893 — laiva, jonka jää nostaa | **Nansen 1893 — Fram lähtee naparetkelle** | Fram 1893 → **Nansen 1893** |
| amundsen-etelanapa-1911 | Etelänapa 1911 — viisi miestä ja lipputanko | **Amundsen 1911 — etelänavan valtaus** | Etelänapa 1911 → **Amundsen 1911** |
| titanic-southampton-1912 | Southampton 1912 — metri törmäyksestä | **Titanic 1912 — neitsytmatka alkaa** | Titanic 1912 (ei muutu) |
| viikinkilaiva-roskilde-1040 | Roskildenvuono noin 1040 — kuusikymmentä airoa | **Viikingit 1040 — sotalaiva Roskildenvuonolla** | Roskilde 1040 → **Viikingit 1040** |
| rontgen-kasi-1895 | Würzburg 1895 — käsi, joka ei saa liikkua | **Röntgen 1895 — röntgensäteiden löytö** | Würzburg 1895 → **Röntgen 1895** |
| wright-kitty-hawk-1903 | Kill Devil Hills 1903 — kaksitoista sekuntia ilmassa | **Wrightit 1903 — ensimmäinen moottorilento** | Kitty Hawk 1903 → **Wrightit 1903** |
| einstein-patenttitoimisto-1905 | Bern 1905 — patenttipino ja valonsäde | **Einstein 1905 — suhteellisuusteoria syntyy** | Bern 1905 → **Einstein 1905** |
| tutankhamon-carter-1922 | Kuninkaiden laakso 1922 — ”Näen ihmeellisiä asioita” | **Tutankhamon 1922 — hauta löytyy** | Luxor 1922 → **Tutankhamon 1922** |
| schliemann-troija-1873 | Hisarlık 1873 — kulta kaivannon seinämässä | **Schliemann 1873 — Troijan aarre löytyy** | Troija 1873 → **Schliemann 1873** |
| rosettan-kivi-1799 | Rosetta 1799 — musta kivi muurin sisästä | **Rosetta 1799 — kivi, jolla hieroglyfit avattiin** | Rosetta 1799 (ei muutu) |
| galilei-kaukoputki-1610 | Padova 1610 — neljä valopistettä Jupiterin vieressä | **Galilei 1610 — Jupiterin kuut löytyvät** | Padova 1610 → **Galilei 1610** |
| machu-picchu-1911 | Machu Picchu 1911 — poika, joka näytti tien | **Machu Picchu 1911 — Bingham löytää rauniot** | Machu Picchu 1911 (ei muutu) |
| marie-curie-hangaari-1898 | Pariisi 1898 — tonni malmia, kymmenesosagramma radiumia | **Curie 1898 — radiumin ja poloniumin löytö** | Curie 1898 (ei muutu) |
| newton-prisma-1666 | Woolsthorpe 1666 — valo, joka kantaa värit mukanaan | **Newton 1666 — valkoinen valo hajoaa väreiksi** | Newton 1666 (ei muutu) |
| franklin-leija-1752 | Philadelphia 1752 — kipinä avaimesta rystyseen | **Franklin 1752 — leijakoe ukkospilvessä** | Franklin 1752 (ei muutu) |
| lavoisier-laboratorio-1780 | Arsenaali 1780 — mitään ei katoa, kaikki punnitaan | **Lavoisier 1780 — modernin kemian synty** | Lavoisier 1780 (ei muutu) |
| jenner-rokotus-1796 | Berkeley 1796 — lypsäjän rakkula ja puutarhurin poika | **Jenner 1796 — ensimmäinen rokotus** | Jenner 1796 (ei muutu) |
| faraday-luento-1831 | Royal Institution 1831 — muutos synnyttää sähköä | **Faraday 1831 — sähkön tuottaminen magneetilla** | Faraday 1831 (ei muutu) |
| pasteur-pullot-1862 | Rue d'Ulm 1862 — liemi, joka pysyy kirkkaana | **Pasteur 1862 — elämä ei synny itsestään** | Pasteur 1862 (ei muutu) |
| mendelejev-kortit-1869 | Pietari 1869 — tyhjät paikat, joihin uskalletaan luottaa | **Mendelejev 1869 — jaksollinen järjestelmä** | Mendelejev 1869 (ei muutu) |
| edison-lamppu-1879 | Menlo Park 1879 — kolmetoista ja puoli tuntia valoa | **Edison 1879 — hehkulamppu palaa 13 tuntia** | Edison 1879 (ei muutu) |
| fleming-malja-1928 | St Mary's 1928 — malja, jota ei heitetty pois | **Fleming 1928 — penisilliinin löytö** | Fleming 1928 (ei muutu) |
| gutenberg-paino-1454 | Mainz 1454 — sivu syntyy metallista | **Gutenberg 1454 — Raamattu painetaan irtokirjakkeilla** | Gutenberg 1454 (ei muutu) |
| eiffel-torni-1888 | Champ de Mars 1888 — niitti kerrallaan taivaalle | **Eiffel-torni 1888 — näin torni koottiin** | Torni 1888 → **Eiffel-torni 1888** |
| brunel-thames-tunnel-1827 | Rotherhithe 1827 — 36 lokeroa joen alla | **Brunel 1827 — tunneli Thamesin alle** | Tunneli 1827 → **Brunel 1827** |
| suezin-kanava-avajaiset-1869 | Port Said 1869 — keulan edessä vain kaivettua vettä | **Suez 1869 — kanava avataan** | Suez 1869 (ei muutu) |
| brooklyn-bridge-1883 | East River 1883 — kuka tämän sillan rakensi? | **Brooklyn 1883 — Brooklynin silta avataan** | Brooklyn 1883 (ei muutu) |
| pietari-perustus-1703 | Jänissaari 1703 — kuusi bastionia suohon | **Pietari 1703 — tsaari perustaa kaupungin** | Jänissaari 1703 → **Pietari 1703** |
| vesuvius-pompeji-79 | Pompeji 79 — ropina katolla | **Pompeji 79 — Vesuvius tuhoaa kaupungin** | Pompeji 79 (ei muutu) |
| konstantinopoli-1453 | Konstantinopoli 1453 — aamu tulee rumpujen mukana | **Konstantinopoli 1453 — kaupunki kaatuu** | Konstantinopoli → **Konstantinopoli 1453** |
| lontoon-palo-1666 | Lontoo 1666 — soitin veneessä, kaupunki tulessa | **Lontoon palo 1666 — kaupunki syttyy** | Palo 1666 → **Lontoon palo 1666** |
| berliinin-muuri-1961 | Bernauer Straße 1961 — piikkilanka kadun poikki | **Berliini 1961 — muurin rakentaminen alkaa** | Muuri 1961 → **Berliini 1961** |
| michelangelo-sikstus-1510 | Sikstuksen kappeli 1510 — giornata kerrallaan | **Michelangelo 1510 — Sikstuksen katto** | Sikstus 1510 → **Michelangelo 1510** |
| beethoven-yhdeksas-1824 | Kärntnertor 1824 — suosionosoitukset, joita ei kuule | **Beethoven 1824 — yhdeksännen kantaesitys** | Yhdeksäs 1824 → **Beethoven 1824** |
| shakespeare-globe-1599 | Globe 1599 — pihalla ei ole koskaan hiljaista | **Shakespeare 1599 — Globe-teatteri aukeaa** | Globe 1599 → **Shakespeare 1599** |
| mozart-wien-1786 | Burgtheater 1786 — palvelijat nolaavat isäntänsä | **Mozart 1786 — Figaron häiden ensi-ilta** | Figaro 1786 → **Mozart 1786** |
| luther-wittenberg-1517 | Wittenberg 1517 — kuka tämän oikein lukee? | **Luther 1517 — 95 teesiä Wittenbergissä** | Luther 1517 (ei muutu) |
| ranskan-vallankumous-bastilji-1789 | Bastilji 1789 — musketti ilman ruutia | **Bastilji 1789 — Ranskan vallankumous alkaa** | Bastilji 1789 (ei muutu) |
| olympia-ateena-1896 | Panathinaiko 1896 — jalat jatkavat, kun pää ei tiedä | **Maraton 1896 — ensimmäinen olympiamaraton** | Louis 1896 → **Maraton 1896** |
| sibelius-finlandia-1899 | Ruotsalainen teatteri 1899 — protesti, jota ei sanota ääneen | **Sibelius 1899 — Finlandian synty** | Suomi herää 1899 → **Sibelius 1899** |
| lumiere-elokuva-1895 | Grand Café 1895 — miten seinä voi liikkua? | **Lumière 1895 — ensimmäinen elokuvanäytös** | Lumière 1895 (ei muutu) |
| suuri-piiritys-paattyy-1565 | Valletta 1565 — purjeet horisontissa | **Malta 1565 — Suuri piiritys päättyy** | Apu saapuu 1565 → **Malta 1565** |
| siegfried-ostaa-bockin-963 | Luxemburg 963 — kallio, josta tuli kaupunki | **Luxemburg 963 — kreivi ostaa Bock-kallion** | Bockin kauppa 963 → **Luxemburg 963** |
| roger-ii-cefalu-lupaus-1131 | Cefalù 1131 — lupaus myrskyävällä merellä | **Cefalù 1131 — kuningas lupaa katedraalin** | Cefalùn lupaus → **Cefalù 1131** |
| arkadin-luostarin-rajahdys-1866 | Arkadi 1866 — viimeinen ovi | **Arkadi 1866 — luostari räjähtää** | Arkadi 1866 (ei muutu) |
| ensimmainen-juna-rovaniemi-1909 | Rovaniemi 1909 — ensimmäinen juna | **Rovaniemi 1909 — ensimmäinen juna saapuu** | Ensijuna 1909 → **Rovaniemi 1909** |
| wienin-porssikrahi-1873 | Wien 1873 — kun huudot vaihtuvat hiljaisuudeksi | **Wienin krahi 1873 — pörssi romahtaa** | Wienin krahi 1873 (ei muutu) |
| afsluitdijkin-viimeinen-aukko-1932 | De Vlieter 1932 — meri lakkaa kahtia jakamasta | **Afsluitdijk 1932 — padon viimeinen aukko** | Vlieter 1932 → **Afsluitdijk 1932** |
| gotthardin-lapimurto-1880 | Gotthard 1880 — valokuva kulkee kalliossa | **Gotthard 1880 — tunnelin läpimurto** | Läpimurto 1880 → **Gotthard 1880** |
| christiansborgin-palo-1884 | Christiansborg 1884 — savu valtaosien alla | **Kööpenhamina 1884 — Christiansborg palaa** | Linnanpalo 1884 → **Kööpenhamina 1884** |
| belgradin-piiritys-1456 | Belgrad 1456 — talonpojat murtavat piirityksen | **Belgrad 1456 — talonpojat murtavat piirityksen** | Piiritys 1456 → **Belgrad 1456** |
| franz-ferdinandin-salamurha-1914 | Sarajevo 1914 — auto pysähtyy väärään paikkaan | **Sarajevo 1914 — Franz Ferdinand murhataan** | Latin-silta 1914 → **Sarajevo 1914** |
| vloren-itsenaisyys-1912 | Vlorë 1912 — lippu, joka ommeltiin yöllä | **Albania 1912 — itsenäisyys julistetaan** | Vlorë 1912 → **Albania 1912** |
| krusevon-tasavalta-1903 | Kruševo 1903 — kymmenen päivän tasavalta | **Kruševo 1903 — kymmenen päivän tasavalta** | Kruševo 1903 (ei muutu) |
| obodin-kirjapaino-1494 | Obod 1494 — musteen viimeinen arkki | **Obod 1494 — Montenegron ensimmäinen painettu kirja** | Obod 1494 (ei muutu) |
| britannian-lippu-nikosiassa-1878 | Nikosia 1878 — puolikuu laskee, risti nousee | **Nikosia 1878 — Britannia ottaa Kyproksen** | Nikosia 1878 (ei muutu) |
| pyhan-elmon-linnake-1565 | Pyhä Elmo 1565 — viimeinen aamu muurilla | **Pyhä Elmo 1565 — linnake kaatuu piirityksessä** | Fort St Elmo 1565 → **Pyhä Elmo 1565** |
| bessarabian-liittyminen-1918 | Chișinău 1918 — ääni sanoo kahdeksankymmentäkuusi | **Bessarabia 1918 — liittyminen Romaniaan** | Chișinău 1918 → **Bessarabia 1918** |
| berezinan-ylitys-1812 | Berezina 1812 — jäinen vesi polvien yli | **Berezina 1812 — Napoleonin armeija pakenee** | Berezina 1812 (ei muutu) |

## 3. Pariisin kuusi aloitusta: ensimmäinen virke vanha → uusi

### Curie 1898 — radiumin ja poloniumin löytö
- vanha: Olkapäät ovat puutuneet jo aamupäivällä, mutta tankoa ei voi laskea.
- uusi: Pariisissa Marie ja Pierre Curie ilmoittavat vuonna 1898 löytäneensä kaksi uutta alkuainetta, poloniumin ja radiumin, ja todistavat sen sitten vuosia vuotavassa vajassa keittämällä tonneittain kaivosjätettä.
- uusi johdanto: Marie ja Pierre Curie ilmoittivat vuonna 1898 löytäneensä poloniumin ja radiumin; Rue Lhomondin pihan vuotavassa vajassa he keittivät tonneittain kaivosjätettä saadakseen niitä puhtaana suolanjyvän verran.

### Lavoisier 1780 — modernin kemian synty
- vanha: Vaaka on huoneen kallein esine, ja se on tarkempi kuin mikään, mitä Pariisin kello- tai kultasepät myyvät.
- uusi: Pariisin Arsenaalin laboratoriossa syntyy noin vuonna 1780 moderni kemia.
- uusi johdanto: Pariisin Arsenaalin laboratoriossa Antoine ja Marie-Anne Lavoisier punnitsivat noin vuonna 1780 kaiken ennen koetta ja sen jälkeen — ja kemia lakkasi olemasta alkemiaa, vaikka vallankumous ei antanut sitä heille anteeksi.

### Pasteur 1862 — elämä ei synny itsestään
- vanha: Kalenterissa on kulunut jo viikkoja, ja pullo on yhä kirkas.
- uusi: Louis Pasteur osoittaa Pariisissa joutsenkaulapulloillaan, ettei elämä synny itsestään mätänevästä aineesta vaan näkymätön elämä tulee ulkoa, ja voittaa kiistan ratkaisijalle luvatun palkinnon vuonna 1862.
- uusi johdanto: Louis Pasteur osoitti Pariisin rue d'Ulmin laboratoriossa vuonna 1862, ettei elämä synny itsestään: rivi keitettyjä liemipulloja odotti viikkoja samenemista, joka ei tullut, ja vanha usko menetti palkintokilpailun.

### Eiffel-torni 1888 — näin torni koottiin
- vanha: Tuuli tuntuu 115 metrin korkeudessa aivan toiselta kuin maassa, ja niittaajan on osattava seistä siinä koko päivä.
- uusi: Pariisin Champ de Marsilla kootaan elokuussa 1888 Eiffel-tornia vuoden 1889 maailmannäyttelyyn: toinen kerros on valmis, ja kolmisensataa rakentajaa niittaa rautaristikkoa yhä ylemmäs.
- uusi johdanto: Pariisin Champ de Marsilla niittaajat kokosivat kesällä 1888 Eiffel-tornia maailmannäyttelyyn: yli sadan metrin korkeudessa he takoivat kuumia niittejä rautaan, jonka piti seisoa vain kaksikymmentä vuotta.

### Bastilji 1789 — Ranskan vallankumous alkaa
- vanha: Musketti painaa olkapäällä, mutta siihen ei ole ruutia.
- uusi: Pariisin kansa hyökkää 14.
- uusi johdanto: Pariisin kansa hyökkäsi 14. heinäkuuta 1789 Bastiljin linnoitukseen hakemaan sinne siirrettyä ruutia — linnoituksessa oli vain seitsemän vankia ja 250 tynnyriä ruutia.

### Lumière 1895 — ensimmäinen elokuvanäytös
- vanha: Miten seinä voi liikkua?
- uusi: Veljekset Auguste ja Louis Lumière pitävät 28.
- uusi johdanto: Veljekset Lumière pitivät Pariisin Grand Cafén kellarissa 28. joulukuuta 1895 ensimmäisen maksullisen elokuvanäytöksen: muutama kymmenen ihmistä maksoi frangin ja näki tehtaan portin aukeavan valkokankaalla — yleisön joukossa taikuri, joka halusi heti ostaa koneen.


## 4. Pariisin 13 muuta juttua: kyltti ja otsikko vanha → uusi

| vanha kyltti | uusi kyltti | uusi otsikko | merkki | kartalle |
|---|---|---|---|---|
| Pariisin vuosisadat | Kaulanauha 1785 | Kaulanauha 1785 — huijaus kuningattaren nimissä | skandaali | uusi |
| Pariisi soi | Piaf ja Django | Piaf ja Django — kadulta ja vaunusta maineeseen | lyyra | uusi |
| Vrain-Lucas | Vrain-Lucas (ei muutu) | Vrain-Lucas 1861–1870 — 27 000 väärennettyä kirjettä | skandaali | uusi |
| Kyyhkyposti | Piiritys 1870 | Piiritys 1870 — viestit kulkevat kyyhkyillä | tiimalasi | uusi |
| Notre-Damen kukko | Notre-Dame 2019 | Notre-Dame 2019 — palo, jonka kukko selvisi | – | ei (katedraalin nosto) |
| Carmenin ensi-ilta | Bizet 1875 | Bizet 1875 — Carmen saa kylmän vastaanoton | lyyra | uusi |
| Kirahvin kävelymatka | Kirahvi 1827 | Kirahvi 1827 — kävelymatka Pariisiin | tiimalasi | jo |
| Torni romuraudaksi | Lustig 1925 | Lustig 1925 — Eiffel-torni myydään romuksi | skandaali | jo |
| Impressionistit | Monet 1874 | Monet 1874 — impressionistien ensimmäinen näyttely | lyyra | uusi |
| Tuileries'n palatsi | Tuileries'n palatsi / nimio Tuileries (tähti) | Tuileries 1883 — palatsin rauniot puretaan | – | tähti |
| 72 nimeä | Tornin nimet 2026 | Tornin nimet 2026 — naisten lista julkaistaan | – | ei |
| Metron sisäänkäynti | Metro 1900 | Metro 1900 — Guimardin sisäänkäynnit | – | ei |
| Paras patonki | Patonki 1994 | Patonki 1994 — kilpailu parhaasta leivästä | lyyra | uusi |

Merkit lamppu: Lavoisier, Curie, Pasteur, Lumière; tiimalasi: Eiffel-torni 1888 (+ Kirahvi, Piiritys); lyyra: Piaf ja Django, Bizet, Monet, Patonki; skandaali: Vrain-Lucas, Kaulanauha, Lustig. Kenttä `merkki` kohdekartan kohteella (maakartat.js); NUI piirtää.

Uudet visat (kolme vastausvaihtoehtoa, vastaus jutussa): Lustig (miksi uhri ei ilmoittanut: häpesi), Kirahvi (miksi käveli: Atlantin ylitys liian vaarallinen), Patonki (voittajan velvollisuus: presidentinpalatsin leivät), Pariisi soi käyttää Piaf-visaa (lempinimi = varpunen). Muilla oli jo visa.

Huom: Bastilji 1789 on maakartassa jo tarinapaikka samassa pisteessä kuin Bastilji-tähti (KK: ei omaa kylttiä) — päätä, poistetaanko oma kyltti.
