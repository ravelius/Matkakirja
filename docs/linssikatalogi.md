# Linssikatalogi — pelin linssit moottoreittain

Päivitetty: 24.9.2026 (Fable; järjestetty moottoreittain omistajan päätöksellä klo 22.1x). Omistajan linjaus 2.9.2026 ilta: *"kaikkien
suurien uskontojen tapahtumista täytyy myös saada omat kuvansa ja niistä
varmasti tehdään myös samanlainen aikajanalinssi kuin nyt tekniikasta
Euroopassa. hiotaan vain ensin tuo linssi mahdollisimman hyväksi niin sitten
voidaan monistaa samaa logiikkaa muihinkin."*

Tämä on elävä luettelo: aiheita lisätään ja tila päivitetään. Sitovat
linjaukset ovat Raamatussa (js/tyohuone-raamattu.js, Karttalinssit);
tämä dokumentti on työlista. Sama sisältö on julkisena sivuna pelin
osoitteessa https://ravelius.github.io/Matkakirja/linssikatalogi.html
(repon juuren linssikatalogi.html, Pages kopioi sen; näkyy kaikilla
tileillä, osoite on ainoa avain, noindex) sekä artefaktina
https://claude.ai/code/artifact/70aa8279-bf6b-49ce-a6cb-64b5a70c3fae
(vain julkaisijan tilille). Päivitä kaikki kolme yhdessä.

## Näin katalogi on järjestetty

Yksi linssi = yksi rivi. Pääjako on toteutustapa eli moottori, koska saman moottorin linssit
rakennetaan samalla koodilla ja aineistoputkella: osa 1 aikajana (pisteet ja reitit), osa 2 alue,
osa 3 virta, osa 4 data, osa 5 esitysmoottori ja osa 6 pohjakartat, jotka eivät ole linssejä vaan
pintoja, joita linssit käyttävät. Jokaisen osan alussa on moottorikortti: mitä on rakennettu,
pilotti, aineistoputki, web vai natiivi, mikä puuttuu ja tekninen viite. Pelin nykyiset linssit
ovat omana osanaan ennen moottoreita.

Teema ja manner ovat suodattimia eivätkä jakoperusteita: ryhmät A–G ovat teemoja ja H–L maanosia,
ja koneluettavassa tiedostossa jokaisella rivillä on kentät `teema` ja `manner`. Ryhmä Y on renkaan 1
leikki- ja katselulinssit (omistaja 21.9.2026): leikkilinssit ovat osassa Pelissä nyt ja
katselulinssit osassa 1.

Id:t eivät muutu. Kun kaksi linssiä käsitteli samaa aihetta, pienempi sulautui isompaan: sen rivi
poistui taulusta, pysäkit siirtyivät isommalle ja muutos on osion Yhdistetyt taulukossa. Sama aihe
eri moottorilla säilyy kahtena rivinä, jotka on merkitty linssin nimen perään toistensa pareiksi.

Koneluettava versio on repon juuren linssikatalogi-data.js (`window.LINSSIKATALOGI`: moottorit,
linssit ja yhdistetyt), ja linssikatalogi.html rakennetaan sen päälle. Päivitä tämä dokumentti ja
datatiedosto yhdessä.

Sarakkeet:

- **muoto**: pisteet (valo syttyy kaupunkiin) · reitti (valojen väliin isoympyrän reittiviiva,
  moottorin `reitti: true`) · alueet (värialueet tai -virrat) · hiukkaset (liikkuvat laivat ja
  virrat) · rasteri (datakerros pallolla) · sali, pallo ja paikka (esitysmoottorin lavat) · pinta
  (pohjakartta tai kuvakerros).
- **1873**: ★★★ linssi näyttää vuoden 1873 maailman tai isoisän matkan (kaari kulkee vuoden 1873
  kautta tai pysähtyy siihen) · ★★ ennen ja nyt: tausta tai jatko lähellä vuotta 1873 tai vertailu
  nykyhetkeen · ★ kaukana isoisän vuodesta tai pelkkä nykyhetki. Asteikko on sama kuin
  datalinsseissä.
- **mitä opitaan**: yksi konkreettinen asia, jonka pelaaja (13+) linssistä oppii.
- **pelikytkös**: mihin pelin osaan linssi kiinnittyy. Aarre = kaupungin ison paikallisaarteen
  palkkio: renkaan 1 kaupungit aarreluettelosta (js/linssit/aarteet.js haarassa sisalto-linssit-rengas1,
  ei vielä mainissa), renkaiden 2–3 kaupungit Fablen kartoituksesta
  docs/raportit/linssit-eurooppa-kartoitus-20260921.md (renkaat omistajan kortilla 21.9.2026;
  "ehdotus" = kartoituksen Eurooppaa sivuava linssi ilman rengasta) · sähke · kysymys · lehti ·
  kohde (pelin kaupunki tai Historian hetki) · tietäjäpisteet (avauskynnys) · avoin = ei vielä
  kiinnitetty.
- **aineisto**: tärkein aineisto ja lisenssi; vain PD/CC0/CC BY/avoin, ei NC:tä.
- **tila**: **valmis** · **rakenteilla** · **seuraava** (enintään 8) · **jonossa** (päätetty,
  odottaa vuoroa) · **idea**. Seuraavina ovat A1, A4, B2, B3, H1, M1 ja S1 sekä esitysmoottorin
  kaista E7 → E10 (merkintä seuraava (esitys)). Datalinssien toteutusjärjestys on yksi ryhmä
  (seuraava (data)), ja C5 on pelin päälinja eikä erillinen linssi (seuraava (pelin oma tarina)).
  Tilan perässä viivan jälkeen ovat lisätiedot.

## Malli, jota monistetaan

Keksinnöt Euroopassa 1769–1928 (v1470, js/aikajana.js + js/linssit/keksinnot.js)
on pilotti. Jokainen uusi linssi käyttää samaa moottoria:

| osa | Keksinnöt-pilotissa | monistettaessa |
|---|---|---|
| kello ja pysäkit | 25 pysäkkiä, merkkipaalu 1873 | 15–30 pysäkkiä, merkkipaalu 1873 aina kun kaari ylittää sen |
| kartalla | valo syttyy kaupunkiin ja jää palamaan | sama; reittilinsseissä valo kulkee reittiä pitkin |
| filminauha ja ilmiöpaneeli | keksijän muotokuva (PD) + generoitu ilmiökuva | sama; uskonnoissa ei kasvokuvia perustajista, vaan paikan ja tapahtuman kuva |
| juttu | nähtävyyskortti | sama |
| musiikki | oma raita linssi-keksinnot.mp3 | oma raita per linssi, sama putki (generoi-siirtymamusiikki --laji) |
| kuvat | kuvaputki, fotorealistinen, JPG | sama; historian hetket -tyyppiset lähi + kauko kun kohtaus sen sallii |
| ovi peliin | kehittäjävalikko (pelillinen ovi auki) | päätetään pilotin kanssa |

### Toinen linssi: Ihmisen matka (C7, 5.9.2026)

Omistajan päätös 5.9.2026: nykyihmisen leviäminen Afrikasta koko
maapallolle, 20 pysäkkiä 300 000 vuotta sitten → n. 1300 jaa.
(js/linssit/ihmisen-matka.js + ihmisen-matka-data.js). Se on ensimmäinen
kaari, joka EI kulje vuosiluvuissa, ja siitä syntyi moottoriin kolme
yleistystä — kaikki kaaren valintoja, joten keksintölinssi on ennallaan:

| pilotissa | ihmisen matkassa |
|---|---|
| kello juoksee vuosiluvuissa (1769 → 1928) | `asteikko: 'vuosiaSitten'`: pysäkkivälit ovat kellossa yhtä pitkiä ja lukema interpoloidaan logaritmisesti — "300 000 v. sitten" → "n. 1250 jaa." |
| valo syttyy kaupunkiin ja jää palamaan | sama, ja valojen väliin piirtyy isoympyrää seuraava reittiviiva (`reitti: true`): kaari on yksi matka |
| lähikuva 260 lautayksikköä | `lahikuva: 520` ja `hyppykamera: true` — valtameren ylityksessä kamera nousee niin kauas, että lähtöranta näkyy |
| kortilla keksijän muotokuva | kortilla LÖYTÖ (`esine`): kallo, kivityökalu, kalastuskoukku — 300 000 vuoden takaa ei ole kasvoja |
| havainnekuvan alla "vuosi · keksintö" | havainnekuvan alla otsikko ja sen alla kuvaputken oma kuvateksti, joka sisältää jo ajoituksen |

# Pelissä nyt

Pelissä nyt olevat linssit valitsimen järjestyksessä (js/linssit/rekisteri.js ja moduulien
`jarjestys`-kenttä). Aikajanalinssit B1 ja C7 ovat tässä taulussa, vaikka niiden ryhmät
ovat B ja C ja moottori aikajana (osa 1). X1 ja X4–X7 sekä leikkilinssit Y1–Y6 ovat työkaluja
(koneluettavassa tiedostossa moottori `muu`), X2 ja X3 kuvakerroksia (moottori `pohjakartta`).

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| X1 | Karttapallo | maailma | nykyhetki | pyöritä palloa · napauta kohtaa · sukella laudalle | pallo | ★ | Pallolla mittasuhteet näkyvät oikein: Grönlanti on noin 14 kertaa Afrikkaa pienempi, vaikka litteällä kartalla ne näyttävät lähes samankokoisilta. | kohde: sukellus mille tahansa laudalle · perusvaruste, omistettu heti | Matkakirjan oma juliste pallon pinnoitteena; Globe.gl (MIT) | valmis — web (js/linssit/pallo.js); natiivissa koko peli on pallolla |
| X2 | Topografialinssi | maailma | nykyhetki | väri kertoo korkeuden · varjo kertoo muodon | pinta | ★ | Korkeusvärit ja varjostus paljastavat maaston muodon, joten näkee, miksi kaupungit ja joet ovat laaksoissa ja miten Andien ja Himalajan kaltaiset vuoristot jakavat mantereita. | linssilaatta Etelä-Amerikassa (web) · tietäjäpisteet 1400 (natiivi) | NOAA ETOPO1 (PD) | valmis — web + natiivi (js/linssit/topografia.js) |
| X3 | Vesistölinssi | maailma | nykyhetki | joet · järvet · meret topografian päällä | pinta | ★ | Joet ja järvet näkyvät maaston päällä, joten näkee, että vesi valuu aina alamäkeen, ja siksi Tyynenmeren läheltä Andeilta alkava Amazon virtaa koko mantereen poikki Atlanttiin. | tietäjäpisteet (web) · natiivissa kehittäjätilassa | Natural Earth 10m (PD), pohjana ETOPO1 (PD) | valmis — web + natiivi; laukussa harmaana keskeneräisenä (omistaja 20.9.2026) |
| B1 | Keksinnöt Euroopassa | Eurooppa | 1769–1928 | Watt · Stephenson · Daguerre · Siemens · Benz · Marconi · Fleming | pisteet | ★★★ | Kun isoisä lähtee 1873, kaaren 25 keksinnöstä 11 on jo tehty (höyrykone, rautatie, lennätin, valokuva, dynamiitti), mutta auto, radio, röntgenkuva ja elokuva ovat vasta edessä. | tietäjäpisteet 800 · aarre: Lontoo (rengas 1) · lehti: tiedeliite (keksijän lehtisivu) | Wikipedia (CC BY-SA 4.0); muotokuvat kuvaputki ja Commons PD | valmis — pilotti, hiotaan (v1470); web + natiivi (js/linssit/keksinnot.js) |
| C7 | Ihmisen matka (pari: R30) | maailma | 300 000 vuotta sitten – n. 1300 jaa. | Omo Kibish · Jebel Irhoud · Beringia · Sahul · Lapita · Aotearoa 1250 | alueet | ★ | Nykyihminen leviää Afrikasta kaikille asutuille mantereille jalan ja veneellä: Sahuliin yli 45 000 vuotta sitten, Beringian maasillan yli Amerikkaan jääkauden lopulla ja viimeisenä Aotearoaan noin 1250. | tietäjäpisteet 400 (ensimmäinen linssi) · kysymys: Livia kysyy kolme kysymystä joka jaksossa | Wikipedia (CC BY-SA 4.0); löytöjen kuvat Commons; havainnekuvat kuvaputki | rakenteilla — omistajan päätös 5.9.2026; moottori 5.9.2026, aineisto työn alla; värivirrat 6.9.2026 (reittiviiva pois); web + natiivi |
| X4 | Astronautin kamera | maailma | kuvat 1991–2026 | 64 kuvauskohdetta pallolla · galleria · info-nappi · Pulun kysymykset | pisteet | ★ | Astronauttien valokuvat näyttävät saman paikan eri vuosina (Etnan tuhkapilvi 2002 ja rauhallinen huippu 2006) ja opettavat lukemaan maapalloa ylhäältä: pilviä, savua, jäätä ja kaupunkeja. | kysymys: kaksi valmista kysymystä per kohde, Pulu vastaa · tietäjäpisteet 2200 | NASA Image Library, astronauttien Maa-kuvat (PD) | valmis — web + natiivi (js/linssit/satelliitti.js) |
| X5 | Maailmanradio | maailma | nykyhetki (suorat lähetykset) | kaupungit play-nappeina · viritysääni · suora lähetys | pisteet | ★ | Suorat lähetykset kertovat korvin, mitä maailmassa kuunnellaan juuri nyt: kielen, musiikin ja vuorokaudenajan, sillä Tokiossa on jo yö, kun Lontoossa on aamu. | kohde: kaupungit play-nappeina · tietäjäpisteet 1400 | Radio Browser (CC0) | valmis — web + natiivi (js/linssit/radio.js); radiouudistus natiivissa build 12 |
| X6 | Vertailulinssi | maailma | 1950 → nyt | enintään kolme maata · Suomi rinnalla · maakäyrät samoilla asteikoilla | alueet | ★ | Samoilla asteikoilla näkee, miten elinajanodote, syntyvyys ja tulotaso ovat muuttuneet eri maissa eri tahtiin, ja Suomi kulkee joka käyrässä vertailuviivana. | lehti: Maa numeroina -sivu | Maailmanpankki WDI (CC BY 4.0), UN WPP 2024 (CC BY 3.0 IGO) | valmis — web + natiivi (natiivissa kehittäjätilassa); laukussa harmaana keskeneräisenä (omistaja 20.9.2026) |
| X7 | Maiden tiedot | maailma | nykyhetki | napauta maata · rajat ja nimi · maan lehti | alueet | ★ | Minkä tahansa maan lehti aukeaa suoraan kartalta, joten naapurimaiden rajat, kielet ja historian voi selvittää matkustamatta sinne. | lehti: maalehti mistä tahansa maasta | Natural Earth (PD); pelin oma aineisto ja Commons | valmis — web + natiivi (natiivissa kehittäjätilassa); laukussa harmaana keskeneräisenä (omistaja 20.9.2026) |

- Rekisterissä on yhdeksän aktiivista riviä: yllä olevat seitsemän X-linssiä sekä keksinnot (B1) ja
  ihmisen-matka (C7). Vertailu, maiden tiedot ja vesistöt näkyvät webin laukussa harmaina
  keskeneräisinä (omistaja 20.9.2026), ja natiivissa ne aukeavat vain kehittäjätilassa.
- Eivät ole pelaajalle näkyviä linssejä vaan linssien apumoduuleja: aarteet.js (kaupunkien
  aarrepalkkioiden taulu, tuotannossa tyhjä), aikaselain.js (linssien yhteinen aikanauha),
  omistus.js (omistus ja löytyminen), reliefikuva.js (topografian ja astronautin kameran yhteinen
  reliefi) ja kerros.js (linssimoottori) sekä radion, astronautin kameran, topografian ja ihmisen
  matkan osamoduulit.
- Yökartta (Y5) ei ole vielä pelissä: mainin rekisteririvi on kommentoitu ja kuva on valmiina
  (js/packs/linssi-yokartta.js). Black Marble -yövalot tulevat myös pohjakartaksi (Q4) ja
  datalinssiin R7.
- Natiivissa on lisäksi kehittäjätilassa Q1 Isoisän linssi 1873 (erä 1, osa 2).

## Y. Leikki- ja katselulinssit (rengas 1): leikkilinssit

Omistajan kortti 21.9.2026: renkaan 1 sarjaan kuuluu 12 tarinalinssin lisäksi kuusi leikkilinssiä ja
neljä katselulinssiä. Y1–Y4 ovat valmiina haaroissa (Pelikoodari 21.9.2026) mutta eivät vielä
mainissa, koska uudet linssit odottavat kartan korjausta (omistaja 21.9.2026). Y5 ja Y6 ovat
hiomassa-rivejä haarassa pelikoodari-muuttolinnut. Katselulinssit Y7–Y10 ovat osassa 1.

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| Y1 | Kellot (pari: B9) | maailma | nyt ↔ 1873 | taskukellot kaupungeissa · 24 aikavyöhykettä · vipu 1873: paikallinen aurinkoaika · Livian kellokysymys | pisteet | ★★★ | Ennen aikavyöhykkeitä jokaisella kaupungilla oli oma aurinkoaikansa, neljä minuuttia pituusastetta kohden, joten isoisän Pariisin ja Marseillen kellot erosivat 12 minuuttia. | aarre: Praha (rengas 1) · kysymys: Livia kysyy kellonajan (±5 min, tietäjäpisteitä) | IANA tz (PD) selaimen Intl-rajapinnasta; aurinkoaika laskettu pituusasteesta | valmis — valmis haarassa pelikoodari-kellot (21.9.2026), ei mainissa; web |
| Y2 | Lippuarvaus | Eurooppa (vipu: maailma) | nykyhetki | liput pallolla · vipu Eurooppa / Maailma · Livia nostaa lipun · nimi- ja karttamuoto · sarjat ja ennätys | pisteet | ★ | Liput tunnistaa yksityiskohdista, jotka erottavat ne naapurimaiden lipuista, ja karttamuodossa pelaaja oppii samalla, missä kukin Euroopan maa on. | aarre: Bryssel (rengas 1) · kysymys: Livia nostaa lipun, neljä vaihtoehtoa (tietäjäpisteitä) | liput Wikimedia Commons (PD), maiden keskukset Natural Earth (PD) | valmis — valmis haarassa pelikoodari-lippuarvaus (21.9.2026; jatkoerä pelikoodari-lippuarvaus-2), ei mainissa; web |
| Y3 | Tähtitaivas (pari: R8) | maailma | nyt ↔ 1873 | kaupungin yön taivas kupuna · tähdistöt syttyvät kosketuksesta · valosaaste nyt / 1873 · Livian tähdistökysymys | pisteet | ★★ | Valosaaste vie tähdet: suurkaupungin taivaalta näkyvät nyt vain kirkkaimmat tähdet (magnitudi 2,5), kun vuonna 1873 samalta paikalta näkyi tähtiä himmeimpään 4,5:een asti. | aarre: Tromssa (rengas 1) · kysymys: Livia sytyttää tähdistön, neljä nimeä (tietäjäpisteitä) | Yale Bright Star (NASA ADC/CDS), ConstellationLines (CC BY 4.0), IAU-nimet | valmis — valmis haarassa pelikoodari-tahtitaivas (21.9.2026), ei mainissa; web |
| Y4 | Muuttolinnut (pari: R28) | Eurooppa–Afrikka | vuodenkierto | kurki · haarapääsky · tervapääsky · kiuru · valkoposkihanhi · käki | reitti | ★★ | Suomessa pesivät muuttolinnut matkaavat joka vuosi tuhansia kilometrejä, ja kuukauden mukaan liikkuvat parvet näyttävät, että esimerkiksi haarapääsky talvehtii eteläisessä Afrikassa ja palaa keväällä Suomeen. | aarre: Sevilla (rengas 1) · kysymys: Livia kysyy, missä maassa laji on kuukautena (tietäjäpisteitä) | pelin oma reittitaulukko lähteineen (Luomus, BirdLife, Euring, Lund 2016, BTO) | valmis — valmis haarassa pelikoodari-muuttolinnut (21.9.2026), ei mainissa; web |
| Y5 | Yökartta (pari: R7) | maailma | 2016 (kuvausvuosi) | maapallo yöllä · kaupunkien valot · sormella voi sammuttaa maan | pinta | ★ | Kaupunkien valot piirtävät yöllä maanosien rannikot ja suuret joet, joten yökartasta näkee, missä ihmiset asuvat ja mihin sähkö riittää. | aarre: Istanbul (rengas 1) | NASA Black Marble 2016 (PD; assets/linssit/yokartta.jpg, js/packs/linssi-yokartta.js) | jonossa — hiomassa-rivi haarassa pelikoodari-muuttolinnut; mainin rekisteririvi kommentoitu, kuva valmiina; odottaa (omistaja 21.9.2026) |
| Y6 | Vuodenajat | maailma | vuodenkierto (kuukaudet) | lumi ja vihreys vaeltavat pallolla · sormella kuukausi | rasteri | ★ | Kuukaudesta toiseen näkyy, miten lumiraja vaeltaa pohjoisella pallonpuoliskolla etelään ja takaisin ja miten kasvillisuus vihertyy vuorotellen pohjoisessa ja etelässä, koska Maan akseli on kallellaan. | aarre: Tallinna (rengas 1) | satelliittikuvasarjat (kartoitus 21.9.2026; lähde valitsematta) | jonossa — hiomassa-rivi haarassa pelikoodari-muuttolinnut; ei koodia; odottaa (omistaja 21.9.2026) |

# Osa 1: Aikajana — pisteet ja reitit (aikajanalinssit)

Kello juoksee, pysäkkikaupunkiin syttyy valo ja filminauha kertoo tapahtuman; malli on yllä
(Malli, jota monistetaan). Reittilinssit A6, C5, D2 ja L1 ovat tässä osassa, ja ne on merkitty
sarakkeeseen muoto: reitti (moottorin `reitti: true`).

## Moottorikortti

| kohta | sisältö |
|---|---|
| moottori | Aikajana (pisteet ja reitit). Kello juoksee vuosissa tai vuosina sitten, pysäkkikaupunkiin syttyy valo, ja filminauha ja ilmiöpaneeli kertovat tapahtuman; reittilinsseissä valojen väliin piirtyy isoympyrän reittiviiva (`reitti: true`). |
| mitä on rakennettu | Web: js/aikajana.js (kello ja `asteikko: 'vuosiaSitten'`, valot, karuselli, ilmiöpaneeli, tiedeliite, reittiviiva, hyppykamera), värivirrat ja vanat (js/aikajana-virrat.js, js/aikajana-vanat.js) ja yhteinen aikaselain (js/linssit/aikaselain.js). Natiivi: Linssit/Ydin/Aikajana (Kello, Esitys, Pysakkiajo, Valot, Tiedeliite, Tutkimusvaihe). |
| pilotti | B1 Keksinnöt Euroopassa (valmis, v1470) ja C7 Ihmisen matka (rakenteilla) |
| aineistoputki | Pysäkit käsin kaaren moduuliin (js/linssit/<linssi>.js tai -data.js); muotokuvat kuvaputkelta ja Commonsista (PD), ilmiö- ja havainnekuvat kuvaputkelta, musiikki generoi-siirtymamusiikki --laji, luenta; natiiviin Siirtosepän sisältöpaketti (moduulit/js/linssit/*.json). |
| web vai natiivi | web ja natiivi (molemmat pilotit kummassakin) |
| mikä puuttuu | Pelillinen ovi ja pilotin hionta (Järjestys 1); pohja uuden kaaren monistukseen; reittiviivaa ei vielä käytä yksikään valmis linssi (C7 luopui siitä 6.9.2026); A1:n ja A4:n kuvat (H4-tilaus). |
| tekninen viite | Malli, jota monistetaan (yllä); docs/moduulit/linssit.md (luvut 7–10 ja aikajanan ajon dynamiikka); js/aikajana.js; natiivi Assets/Matkakirja/Linssit/Ydin/Aikajana |

Ryhmät A–G ovat aiheittain (painopiste Euroopassa, missä pelin laudat nyt ovat), ryhmät H–L maanosittain (omistaja 2.9.2026: "lisäksi voisi eritellä muiden maanosien jutut").

## A. Uskonnot ja maailmankatsomukset

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| A1 | Suuret uskonnot syntyvät (pari: P1) | Lähi-itä, Intia, Kiina | 1500 eaa–632 | Veda-hymnit Punjab · Buddhan ensimmäinen saarna Sarnath · Kungfutse Qufu · Toinen temppeli Jerusalem · Jeesus Galilea ja Jerusalem · Muhammad Mekka ja Medina | pisteet | ★ | Kuuden suuren perinteen avainpaikat Punjabista ja Sarnathista Qufuun, Jerusalemiin ja Mekkaan osuvat samalle vyöhykkeelle 21. ja 36. pohjoisen leveyspiirin välille runsaan kahden vuosituhannen aikana. | kohde: Jerusalem, Mekka, Medina, Varanasi (pelin kaupunkeja) | PD-kuvat Commons (paikka ja hetki, ei perustajien kasvoja); Wikidata (CC0) | seuraava — kuvat H4-tilauksena |
| A2 | Kristinusko leviää Eurooppaan (pari: P1) | Eurooppa | 30–1000 | Paavali Ateena · Nikaian kirkolliskokous 325 · Iona 563 · Canterbury 597 · Kiovan kaste 988 · Uppsala | pisteet | ★ | Kristinusko leviää tuhannessa vuodessa Välimeren kaupungeista Brittein saarille, Kiovaan ja Uppsalaan, ja usein käänne on hallitsijan kaste, kuten Kentin kuninkaan Canterburyssa 597 ja Vladimirin Kiovassa 988. | aarre: Rooma (rengas 1) | PD-kuvat Commons; Wikidata (CC0) | jonossa |
| A3 | Islamin kultakausi (pari: P1) | Bagdad–Córdoba | 750–1258 | Bait al-hikma Bagdad · Córdoban suuri moskeija · al-Azhar Kairo · Samarkandin observatorio · Isfahan · Bagdadin tuho 1258 | pisteet | ★ | Bagdadin viisauden talossa kreikkalainen tiede käännettiin arabiaksi ja sitä kehitettiin eteenpäin, ja Córdoban kautta se kulkeutui Eurooppaan, kunnes mongolit tuhosivat Bagdadin 1258. | kohde: Bagdad, Kairo, Samarkand, Isfahan (pelin kaupunkeja) | PD-käsikirjoituskuvat Commons; Wikidata (CC0) | jonossa |
| A4 | Uskonpuhdistus (pari: P1) | Keski-Eurooppa | 1517–1648 | Wittenberg 1517 · Zürich · Geneve · Trenton kokous · Pyhän Bartolomeuksen yö Pariisi · Westfalenin rauha | pisteet | ★ | Wittenbergin teeseistä 1517 Westfalenin rauhaan 1648 kulkee vuosisata, jossa kirjapaino levittää uudet opit ja uskonsodat piirtävät katolisen etelän ja protestanttisen pohjoisen rajan Euroopan halki. | aarre: Berliini, Wittenberg (rengas 1) · kohde: hetki Wittenberg 1517 | PD-maalaukset ja -puupiirrokset Commons; ilmiökuvat kuvaputki (H4) | seuraava — kuvat H4-tilauksena |
| A5 | Buddhalaisuuden tie Aasian halki (pari: P1) | Intia–Japani | 250 eaa–800 | Sanchi · Dunhuangin luolat · Nara · Borobudur · Lhasa | pisteet | ★ | Buddhalaisuus kulkee Intiasta Silkkitien keitaiden kautta Kiinaan ja sieltä Japaniin, Himalajan yli Tiibetiin ja meritse Jaavalle, ja jokainen pysäkki Sanchin stupasta Boroboduriin on eri kulttuurin tulkinta samasta opista. | kohde: Lhasa, Kioto, Varanasi (pelin kaupunkeja) | PD-kuvat Commons; Wikidata (CC0) | idea |
| A6 | Pyhiinvaellusreitit | maailma | jatkuva | Santiago de Compostela · Mekan hajj · Varanasi · Shikokun 88 temppeliä · Jerusalem | reitti | ★★ | Pyhiinvaellus on vuodesta toiseen toistuva liike samoja reittejä pitkin: hajj osuu aina islamilaisen kalenterin viimeiseen kuukauteen, ja Santiagon tie ja Shikokun 88 temppelin kierros kuljetaan yhä jalan. | kohde: Mekka, Jerusalem, Varanasi (pelin kaupunkeja) | PD-kuvat Commons; Wikidata (pyhät paikat, CC0) | idea — T2 Pyhiinvaellukset (vuodenkierto) yhdistetty tähän 24.9.2026 |
| A7 | Luostarit ja kirjat | Eurooppa | 500–1500 | Monte Cassino · Iona · Cluny · Mont-Saint-Michel · Athos | pisteet | ★ | Ennen kirjapainoa kirjat säilyivät, koska munkit kopioivat niitä käsin: Monte Cassinosta Ionaan ja Clunyyn luostarit olivat Euroopan kirjastoja, ja Athoksella perinne jatkuu yhä. | aarre: Dublin (rengas 3) | PD-käsikirjoituskuvat Commons (Kellsin kirja) | idea |

Kuvatilaus (H4-ehdotus kuvaputkelle, kun H3 on hyväksytty): A1:n ja A4:n
pysäkit historian hetkinä, lähi + kauko, fotorealistinen. Kuvissa ei
esitetä profeettoja kasvoista tunnistettavina; paikka, ihmiset ja hetki.

## B. Tiede ja tekniikka

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| B2 | Tiede ennen höyryä | Eurooppa | 1543–1760 | Kopernikus Frombork · Tycho Ven · Galileo Padova · Kepler Praha · Newton Cambridge · Linné Uppsala | pisteet | ★ | Kopernikuksesta 1543 Newtoniin ja Linnéhen tieteestä tulee mittaamista: Tychon havainnot Venin saarelta antavat Keplerille planeettojen radat, ja Galileon kaukoputki näyttää Padovassa 1610 Jupiterin kuut. | aarre: Krakova (rengas 1) · kohde: hetket Padova 1610 ja Woolsthorpe 1666 | PD-muotokuvat ja -piirrokset Commons (Sidereus Nuncius) | seuraava |
| B3 | Lääketieteen läpimurrot | Eurooppa | 1796–1928 | Jenner · Semmelweis Wien · Snow Lontoo 1854 (kolera) · Pasteur · Koch Berliini · Röntgen Würzburg · espanjantauti 1918 · Fleming | pisteet | ★★★ | Sadassa vuodessa lääketiede siirtyy arvailusta todisteisiin: Jenner rokottaa 1796, Snow jäljittää Lontoon koleran vesipumppuun 1854, Pasteur ja Koch osoittavat bakteerien aiheuttavan tauteja, ja Fleming löytää penisilliinin 1928. | aarre: Budapest (rengas 1) · kohde: hetket Berkeley 1796, Rue d'Ulm 1862, Würzburg 1895, St Mary's 1928 | PD-muotokuvat Commons; ilmiökuvat kuvaputki (H3) | seuraava — H3-kuvat arvioinnissa; G1:n rokotukset ja espanjantauti 1918 yhdistetty 24.9.2026 |
| B4 | Sähkö ja viestintä | Eurooppa–Atlantti | 1800–1901 | Volta Pavia · Ørsted Kööpenhamina · Faraday Lontoo · Penny Black 1840 · Morse Washington 1844 · Reuters Aachen · Atlantin kaapeli 1866 · Marconi Poldhu 1901 | pisteet | ★★★ | Voltan paristosta 1800 Marconin radiosanomaan 1901 viesti nopeutuu hevosen vauhdista sähkön vauhtiin: Atlantin kaapelin 1866 jälkeen sähke kulkee Lontoosta Amerikkaan minuuteissa, kun laivalta meni yli viikko. | aarre: Kööpenhamina (rengas 2) · sähke: pelin sähkeet · kohde: hetki Royal Institution 1831 | PD-muotokuvat ja -postimerkit Commons; ilmiökuvat kuvaputki | idea — G6 Posti ja sähkösanoma yhdistetty 24.9.2026; kaapelit omina linsseinään U1 (virta) ja R33 (data) |
| B5 | Kartografia ja mittaaminen | Eurooppa | 1569–1884 | Mercator Duisburg · Cassini Pariisi · Struven ketju Hammerfest–Izmail · Greenwichin nollameridiaani 1884 | pisteet | ★★ | Maapallo mitataan kolmiomittauksella: Mercatorin projektio 1569 tekee kompassisuunnista suoria viivoja, Cassinit kartoittavat Ranskan, ja Struven ketju mittaa 2 820 km pituuspiirin kaarta Hammerfestistä Mustallemerelle Suomen kautta. | aarre: Amsterdam (rengas 2) | PD-kartat Commons (Mercator, Cassini) | idea — Greenwichin pysäkki: ks. B9 |
| B6 | Tähtitieteen observatoriot | maailma | 1576–1900 | Uraniborg · Greenwich · Pulkova · Lick · Ulugh Beg Samarkand | pisteet | ★★ | Observatoriot siirtyvät kaupungeista vuorille: Uraniborg mittaa tähtien paikat ennennäkemättömän tarkasti, Greenwich perustetaan 1675 ratkaisemaan pituusaste merellä, ja Lickin observatorio nousee 1888 Kalifornian vuorelle kauas kaupungin valoista. | kohde: Samarkand · aarre: Kööpenhamina (ehdotus) | PD-kuvat Commons; HYG (CC BY-SA 4.0) taivaalle | idea |
| B7 | Vanhin maailmankuva pallolla | Afrikka ja muut mantereet | 1507–1873 | Waldseemüller 1507 · Ortelius 1570 · Blaeu 1662 · d'Anville 1749 · Stanleyn Kongo 1877 — vanha kartta verhottuna karttapallon pinnalle, liukusäädin vanha → 1873 → nyt näyttää vääristymän | pinta | ★★★ | Vanhojen karttojen virheet näkyvät, kun ne verhotaan pallolle: d'Anville jättää 1749 Afrikan sisämaan rehellisesti tyhjäksi, ja Kongon juoksu selviää eurooppalaisille vasta Stanleyn matkalla 1877. | kohde: isoisän vuoden 1872 maailmankartta (perintö) | PD-kartat (LoC, Commons), georeferointi Allmaps | idea — omistaja 5.9.2026: "osoittaa miten pielessä se on. hyvin opettavaista"; vaatii pallolaudan vaiheen 3 |
| B8 | Valokuvan synty | Eurooppa–USA | 1826–1900 | Niépce Chalon 1826 · Daguerre Pariisi 1839 · Talbot Lacock · Nadar Pariisi 1858 · Muybridge 1878 · Kodak Rochester 1888 · Lumière Lyon 1895 | pisteet | ★★★ | Valotusaika lyhenee runsaassa 60 vuodessa tunneista sekunnin murto-osaan: Niépcen ensimmäinen kuva vaati tunteja tai päiviä, Muybridge pysäyttää laukkaavan hevosen 1878, ja Kodak tuo kameran kaikkien käteen 1888. | kohde: isoisän valokuvat ja havainnekuvat · hetki Grand Café 1895 | PD-valokuvat Commons (Niépce, Nadar, Muybridge); ilmiökuvat kuvaputki | idea — lisätty 24.9.2026 |
| B9 | Aika ja nollameridiaani (pari: Y1) | Britannia–maailma | 1675–1884 | Greenwich 1675 · Harrison H4 1761 · rautatieaika Britannia 1840 · Washingtonin meridiaanikonferenssi 1884 · aikavyöhykkeet | pisteet | ★★★ | Pituusaste ratkeaa kellolla: Harrisonin H4 pitää Lontoon ajan merellä 1761, rautatiet yhtenäistävät Britannian kellot 1840 ja nollameridiaani sovitaan Greenwichiin 1884, kun isoisän 1873 kaupungeissa kellot näyttävät vielä kukin omaa aurinkoaikaansa. | kohde: Foggin päivävirhe, pelin oma tarina | PD-kuvat Commons (Harrisonin kellot, Greenwich); ilmiökuvat kuvaputki | idea — lisätty 24.9.2026; B5:n Greenwich-pysäkki viittaa tähän |

*B1 Keksinnöt Euroopassa on osassa Pelissä nyt. Yhdistetty tänne: G1:n rokotukset ja espanjantauti → B3, G6 → B4. Uudet 24.9.2026: B8 ja B9.*

## C. Löytöretket ja liikkuminen

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 | Suuret löytöretket | Atlantti–Intian valtameri | 1415–1522 | Sagres · Dias 1488 · Kolumbus 1492 · da Gama 1497 · Magalhães 1519 (H1/H2-hetket) | pisteet | ★ | Portugalin ja Espanjan laivat avaavat sadassa vuodessa merireitit Afrikan ympäri Intiaan ja Atlantin yli Amerikkaan, ja Magalhãesin retkikunta kiertää maapallon 1519–1522, mutta viidestä laivasta palaa vain yksi. | kohde: hetket Lissabon 1484, Santa Fé 1492, Palos 1492, Restelo 1497, Sanlúcar 1519 · aarre: Lissabon (ehdotus) | PD-kartat ja -maalaukset Commons; hetkien kuvat kuvaputki | jonossa — H1/H2-hetket valmiina |
| C2 | Napa-alueiden valloitus | Arktis, Antarktis | 1845–1912 | Franklin · Nordenskiöld Koillisväylä 1878 · Nansen Fram 1893 · Amundsen 1911 · Scott 1912 | pisteet | ★★ | Franklinin retkikunta katoaa 1845 Luoteisväylälle, Helsingissä syntynyt Nordenskiöld purjehtii Koillisväylän läpi 1878–79, ja Amundsen ehtii etelänavalle 1911 runsaan kuukauden ennen Scottia. | kohde: hetket Kristiania 1893 ja Etelänapa 1911 · aarre: Oslo (ehdotus) | PD-valokuvat Commons (Nansen, Amundsen); NSIDC-merijää | jonossa |
| C3 | Rautatiet valloittavat maanosat (pari: P4) | maailma | 1825–1916 | Stockton–Darlington · Liverpool–Manchester · Pacific Railroad 1869 · Siperian rata · Orient Express · Berliini–Bagdad | pisteet | ★★★ | Rautatie kutistaa maanosat: Tyynenmeren rata 1869 lyhentää Yhdysvaltojen ylityksen kuukausista viikkoon, ja Siperian rata yhdistää Moskovan Vladivostokiin 1916. | kohde: Moskova, Irkutsk, Vladivostok (Siperian laudat) | PD-valokuvat ja -julisteet Commons; OSM-radat (ODbL) | idea |
| C5 | Maapallon ympäri 80 päivässä | maailma | 1872 | Foggin reitti Lontoo–Suez–Bombay–Kalkutta–Hongkong–Yokohama–San Francisco–New York–Lontoo (isoisän matka 1873 rinnalla) | reitti; pelin oma runko — toteutetaan pelin päälinjana, ei erillisenä linssinä | ★★★ | Suezin kanava ja Yhdysvaltain poikki kulkeva rata, molemmat 1869, tekivät maailman ympäri matkasta 80 päivän mittaisen, ja Vernen Fogg voittaa vetonsa, koska itään matkaaja saa matkalla yhden päivän. | pelin päälinja · kohde: Lontoo, Mumbai, Kolkata, Hongkong, San Francisco, New York (pelin kaupunkeja) | Verne 1872 (PD); ICOADS ja 20CRv3 reitin laivoille ja säälle | seuraava (pelin oma tarina) |
| C6 | Ilmailun synty | Eurooppa–USA | 1783–1927 | Montgolfier Annonay · Lilienthal Berliini · Wrightit Kitty Hawk · Blériot kanaali 1909 · Lindbergh 1927 | pisteet | ★★ | Ihminen nousee ilmaan kuumailmapallolla 1783, Lilienthal liitää 1890-luvulla, ja 24 vuotta Wrightien 12 sekunnin lennon jälkeen Lindbergh lentää yksin New Yorkista Pariisiin. | aarre: Pariisi (rengas 2) · kohde: hetki Kitty Hawk 1903 | PD-valokuvat Commons (Lilienthal, Wrightit) | idea |

*C7 Ihmisen matka on osassa Pelissä nyt. C4 Höyrylaivat ja kanavat on yhdistetty U2:een (osa 3).*

## D. Kaupungit, valtakunnat, aatteet

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| D1 | Antiikin kaupungit | Välimeri, Lähi-itä | 3500 eaa–476 | Uruk · Memfis · Babylon · Ateena · Aleksandria · Rooma · Konstantinopoli | pisteet | ★ | Kaupunkien painopiste siirtyy neljässä vuosituhannessa Urukista Babyloniin, Aleksandriaan, Roomaan ja Konstantinopoliin, ja Rooma on ensimmäinen kaupunki, jossa asuu arviolta miljoona ihmistä. | aarre: Ateena (ehdotus) · kohde: Rooma, Istanbul | Pleiades (CC BY 3.0), Reba ym. (CC BY 4.0); PD-kuvat Commons | idea |
| D2 | Silkkitie | Aasia–Eurooppa | 130 eaa–1453 | Chang'an · Dunhuang · Samarkand · Bagdad · Konstantinopoli · Venetsia | reitti | ★ | Silkkitie oli kauppiaiden ketju eikä yksi tie: tavara vaihtoi omistajaa monta kertaa Chang'anista Venetsiaan, ja samaa reittiä kulkivat myös paperi, uskonnot ja rutto. | kohde: Xi'an, Samarkand, Bagdad, Istanbul, Venetsia (pelin kaupunkeja) · aarre: Venetsia (ehdotus) | Pleiades (CC BY 3.0); PD-kuvat Commons | idea — säilyy aikajanan reittilinssinä (ei yhdistetä) |
| D3 | Hansa | Itämeri, Pohjanmeri | 1150–1669 | Lyypekki · Visby · Bergen · Novgorod · Brygge · Lontoo Steelyard | pisteet | ★ | Saksalaisten kauppakaupunkien liitto hallitsee Itämeren ja Pohjanmeren kauppaa viisi vuosisataa ilman omaa valtiota: Novgorodin turkikset, Bergenin turska ja Flanderin kangas kulkevat Lyypekin kautta. | aarre: Tallinna (rengas 2) · kohde: Bergen, Riika | Sound Toll Registers (lisenssi tarkistettava); PD-kuvat Commons | idea |
| D4 | Vallankumousten Eurooppa | Eurooppa | 1789–1849 | Bastilji · Wien 1848 · Frankfurtin parlamentti · Rooman tasavalta 1849 | pisteet | ★★ | Vaatimus kansan vallasta leviää Bastiljista 1789 vuoden 1848 kevääseen, jolloin kapinat syttyvät muutamassa viikossa Pariisista Wieniin ja Berliiniin, ja vaikka ne kukistetaan, Itävalta lakkauttaa maaorjuuden. | aarre: Pariisi (rengas 1) · kohde: hetki Bastilji 1789 | PD-maalaukset ja -litografiat Commons | idea |
| D5 | Kansallisvaltiot syntyvät (pari: O6) | Eurooppa | 1830–1918 | Belgia 1830 · Italia 1861 · Saksa 1871 · Bulgaria 1878 · Norja 1905 · Suomi 1917 | pisteet | ★★★ | Euroopan kartasta tulee kansallisvaltioiden kartta alle sadassa vuodessa: Saksa yhdistyy 1871 juuri ennen isoisän matkaa, Bulgaria saa autonomian 1878 ja Suomi itsenäistyy 1917. | aarre: Bryssel (rengas 2) · kohde: Bulgarian lauta (1878) | PD-kuvat Commons; Wikidata (CC0) | idea |
| D7 | Suomi isoisän aikaan | Suomi | 1809–1917 | Porvoon valtiopäivät 1809 · Helsinki pääkaupungiksi 1812 · Saimaan kanava 1856 · markka 1860 ja kultakanta 1877 · rautatie Helsinki–Hämeenlinna 1862 · kansakouluasetus 1866 · nälkävuodet 1866–68 · 1917 | pisteet | ★★★ | Suomi rakentaa Venäjän autonomisena suuriruhtinaskuntana valtion palaset ennen itsenäisyyttä: oman rahan 1860, rautatien 1862, kansakoulut 1866 ja kultakannan 1877, samaan aikaan kun nälkävuodet 1866–68 koettelevat maata. | kohde: pelaajan kotimaa (Helsinki, Tampere, Rovaniemi) · isoisän lähtö | PD-kuvat Finna ja Commons; Helsingin sääsarja 1844→ (Ilmatieteen laitos, CC BY 4.0; ent. R35) | idea — lisätty 24.9.2026; sisältää R35:n Suomen sään aineiston viitteenä |

*D6 Imperiumit ja siirtomaat on yhdistetty S1:een (osa 3) ja O2:een (osa 2). Uusi 24.9.2026: D7 (sisältää R35:n).*

## E. Taide ja kulttuuri

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| E1 | Renessanssi (pari: E7) | Italia | 1400–1600 | Firenze Brunelleschi · Rooma Sikstus · Venetsia Tizian · Milano Leonardo | pisteet | ★ | Renessanssi syntyy Italian kilpailevissa kaupungeissa: Brunelleschi ratkaisee Firenzessä perspektiivin ja rakentaa tuomiokirkon kupolin, Michelangelo maalaa Sikstuksen kappelin, ja Venetsiassa öljyväristä kankaalla tulee uusi tapa maalata. | aarre: Firenze (rengas 1) · kohde: hetki Sikstuksen kappeli 1510 | PD-kuvat Commons; Italian valtion museoiden teokset pois (Fable 24.9.2026) | jonossa — renkaan 1 aarrelinssi Firenze webissä; E7 on vain natiivissa |
| E2 | Säveltäjien Eurooppa | Eurooppa | 1685–1900 | Eisenach Bach · Salzburg Mozart · Wien Beethoven · Leipzig · Bayreuth · Pietari Tšaikovski · Helsinki Sibelius | pisteet | ★★ | Kahdessa vuosisadassa musiikki siirtyy hovista ja kirkosta konserttisaliin: Mozart jättää Salzburgin arkkipiispan palveluksen 1781, Beethoven elää Wienissä ilman hovivirkaa, ja Sibeliuksen Finlandia 1899 on jo kansallinen protesti. | aarre: Wien (rengas 2) · kohde: hetket Burgtheater 1786, Kärntnertor 1824, Ruotsalainen teatteri 1899 | PD-muotokuvat Commons; PD-äänitteet (Musopen, tarkistettava) | idea |
| E3 | Kirjallisuuden kaupungit | Eurooppa | 1600–1900 | Lontoo Shakespeare · Weimar Goethe · Pietari Dostojevski · Dublin · Pariisi Hugo | pisteet | ★★ | Kirjailijat tekevät kaupungeista koko maailman tuntemia, Shakespearen Lontoosta Dostojevskin Pietariin, ja isoisän vuonna 1873 sekä Dostojevski että Victor Hugo kirjoittavat yhä uusia teoksiaan. | aarre: Edinburgh (rengas 2) · kohde: hetki Globe 1599 | PD-muotokuvat ja -painokset Commons; tekstit PD (Project Gutenberg) | idea |
| E4 | Maailmannäyttelyt | maailma | 1851–1900 | Lontoo Crystal Palace · Pariisi 1889 Eiffel · Chicago 1893 · Pariisi 1900 | pisteet | ★★★ | Maailmannäyttelyissä yleisö näkee uutuudet ensimmäisenä, kuten puhelimen Philadelphiassa 1876 ja Eiffel-tornin Pariisissa 1889, ja isoisän vuonna 1873 näyttely pidetään Wienissä. | kohde: hetki Champ de Mars 1888 · aarre: Lontoo (ehdotus) | PD-litografiat ja -valokuvat Commons; Wikidata (CC0) | idea |
| E5 | Arkkitehtuurin ihmeet | maailma | 2560 eaa–1889 | Giza · Pantheon · Hagia Sofia · Alhambra · Kölnin tuomiokirkko · Eiffel | pisteet | ★★ | Rakennustekniikka näkyy siinä, miten korkealle ja laajalle päästään: Pantheonin kupoli on yhä maailman suurin raudoittamaton betonikupoli, ja Kölnin tuomiokirkko valmistuu 1880, 632 vuotta aloituksen jälkeen. | kohde: Granada, Istanbul, Rooma, Pariisi · hetki Champ de Mars 1888 · aarre: Rooma (ehdotus) | PD-kuvat Commons; Wikidata (CC0) | idea — ihmesarjan jatko |
| E6 | Museot ja kirjastot syntyvät | Eurooppa | 1683–1900 | Ashmolean · British Museum · Louvre 1793 · Eremitaasi · Ateneum | pisteet | ★★ | Kuninkaiden ja keräilijöiden aarteet avautuvat kaikille: Ashmolean 1683 on ensimmäinen yliopistomuseo, Louvre avataan kansalle vallankumouksessa 1793, ja Helsingin Ateneum valmistuu 1887. | aarre: Pietari (rengas 3) · kohde: Helsinki | PD-kuvat Commons; Wikidata (CC0) | idea |

*E1 Renessanssi on webin aikajanalinssi ja E7:n pari (E7 on vain natiivissa). E7–E9 ja uusi E10 ovat esitysmoottorin linssejä (osa 5).*

## F. Luonto ja ympäristö

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| F3 | Kasvien matkat (pari: R24) | maailma | 1492–1900 | peruna · kahvi · tee · sokeri · kumi · kaneli | pisteet | ★★ | Kolumbuksen jälkeen kasvit vaihtavat mannerta: peruna Andeilta Eurooppaan, kahvi Etiopiasta Brasiliaan ja kumi Amazonilta Aasian plantaaseille 1876, ja monen maan perinneruoka syntyy tästä vaihdosta. | avoin | MapSPAM 2020 (CC BY 4.0), HYDE 3.2 (CC0); PD-kasvikuvat Commons | idea |
| F5 | Elämän matka | maailma | 4 mrd v sitten → nyt | ensimmäinen elämä · happi · kambrikausi · maalle nousu · dinosaurukset · asteroidi 66 milj. · nisäkkäät · ihminen | pisteet | ★ | Jos neljän miljardin vuoden matka olisi yksi vuorokausi, eläimet runsastuisivat kambrikaudella vasta iltayhdeksän maissa, asteroidi tuhoaisi dinosaurukset kello 23.36 ja ihminen ilmestyisi viimeisillä sekunneilla. | kohde: C7 Ihmisen matkan jatko taaksepäin | PD-fossiilikuvat Commons; havainnekuvat kuvaputki | idea — lisätty 24.9.2026; asteikko vuosiaSitten kuten C7 |

*F1, F2 ja F4 on yhdistetty datalinsseihin (osa 4): F1 → R13, F2 → R28, F4 → R12. Uusi 24.9.2026: F5.*

## G. Arki ja yhteiskunta

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| G2 | Raha ja pankit | Eurooppa | 1252–1873 | Firenzen floriini · Amsterdamin pörssi 1602 · Bank of England 1694 · kultakanta 1873 | pisteet | ★★★ | Rahasta tulee luottamusta: Firenzen kultafloriini 1252 kelpaa koko Euroopassa, Amsterdamin pörssissä myydään osakkeita 1602, ja 1873 Saksa ja Yhdysvallat siirtyvät kultakantaan samana vuonna, kun pörssiromahdus aloittaa pitkän laman. | aarre: Amsterdam (rengas 3) · pelin punnat (isoisän kukkaro) | Maddison (CC BY 4.0); PD-kolikko- ja setelikuvat Commons | idea |
| G3 | Ruoan ja juoman historia | Eurooppa | 1500–1900 | Pilsen 1842 · Champagne · Lyonin keittiö · Wienin kahvilat · Milanon risotto | pisteet | ★★ | Moni ikuiselta tuntuva eurooppalainen maku on nuori: vaalea pils-olut syntyy Plzeňissä 1842, ja Wienin kahvilakulttuuri alkaa vasta osmanien piirityksen jälkeen 1683. | aarre: Praha (rengas 3) | PD-maalaukset ja -julisteet Commons; ilmiökuvat kuvaputki | idea |
| G4 | Urheilun synty | Eurooppa | 1857–1903 | Sheffield FC 1857 · Wimbledon 1877 · Ateena 1896 · Tour de France 1903 | pisteet | ★★ | Nykyurheilu syntyy yhteisistä säännöistä: jalkapallo, tennis ja olympialaiset saavat pysyvät sääntönsä ja kilpailunsa 1857–1903, ja isoisän vuonna 1873 pelataan jo ensimmäisiä jalkapallon maaotteluita. | aarre: Ateena (rengas 3) · kohde: hetki Panathinaiko 1896 | PD-valokuvat ja -julisteet Commons | idea |
| G5 | Naisten oikeudet | maailma | 1791–1918 | Olympe de Gouges · Seneca Falls · Uusi-Seelanti 1893 · Suomi 1906 · Britannia 1918 | pisteet | ★★ | Naisten äänioikeuden tie kestää vuosisadan: Olympe de Gouges julistaa naisen oikeudet 1791, Uusi-Seelanti antaa äänioikeuden 1893, ja Suomi on 1906 ensimmäinen maa, jossa naiset saavat myös asettua ehdolle. | kohde: Helsinki (1906), Wellington (1893) | PD-muotokuvat ja -valokuvat Commons | idea |

*G1 Taudit ja rokotukset on yhdistetty B3:een ja P2:een, G6 Posti ja sähkösanoma B4:ään.*

## H. Aasia

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| H1 | Kiinan keksinnöt | Kiina | 105–1450 | paperi Luoyang 105 · kompassi · ruuti · kirjapaino Kaifeng · Suuri kanava · Zheng Hen laivasto Nanjing 1405 | pisteet | ★ | Paperi, kompassi, ruuti ja irtokirjaimet keksitään Kiinassa vuosisatoja ennen Eurooppaa, ja Zheng He purjehtii 1405 alkaen Afrikan rannikolle asti satojen alusten laivastolla. | kohde: Peking, Xi'an, Shanghai (pelin kaupunkeja) | PD-kuvat Commons (kiinalaiset maalaukset ja painotuotteet); ilmiökuvat kuvaputki | seuraava |
| H2 | Intian valtakunnat ja tiede | Intia | 2600 eaa–1653 | Mohenjo-daro · Ashoka Pataliputra · Nalandan yliopisto · Aryabhata · Taj Mahal Agra 1653 | pisteet | ★ | Intian kaupungit ja tiede ovat vanhoja: Mohenjo-darossa on viemäröinti jo 2600 eaa., Nalandassa opiskellaan vuosisatoja, ja intialaisten nolla lukuna kulkee arabien kautta Eurooppaan. | kohde: Delhi, Varanasi, Kolkata (pelin kaupunkeja) | PD-kuvat Commons; Wikidata (CC0) | idea |
| H3 | Japanin aikakaudet | Japani | 710–1868 | Nara · Heian-Kioto · Kamakura · Edo · Meiji 1868 (Yokohama isoisän reitillä) | pisteet | ★★★ | Japani eristäytyy Edon kaudella yli 200 vuodeksi ja avautuu Meiji-restauraatiossa 1868 niin nopeasti, että isoisän vuonna 1873 se ottaa käyttöön länsimaisen kalenterin. | kohde: Tokio, Kioto (pelin kaupunkeja) | PD-puupiirrokset (ukiyo-e) ja -valokuvat Commons | jonossa |
| H4 | Mongolien maailma (pari: M5) | Aasia | 1206–1405 | Karakorum · Peking Kublai · Bagdad 1258 · Samarkand Timur | pisteet | ★ | Mongolit luovat historian suurimman yhtenäisen maaimperiumin, ja sen rauha avaa Silkkitien niin turvalliseksi, että Marco Polo pääsee Kublai-kaanin hoviin Pekingiin. | kohde: Ulan Bator, Peking, Bagdad, Samarkand (pelin kaupunkeja) | PD-kuvat Commons (persialaiset miniatyyrit) | idea |
| H5 | Kaakkois-Aasian temppelit | Kaakkois-Aasia | 800–1431 | Borobudur · Bagan · Angkor · Ayutthaya | pisteet | ★ | Kaakkois-Aasian temppelikaupungit rakentuvat Intiasta tulleiden hindulaisuuden ja buddhalaisuuden varaan, ja Angkor on teollista aikaa edeltäneen maailman laajimpia kaupunkialueita. | kohde: Mandalay (Bagan), Bangkok (Ayutthaya), Jakarta (pelin kaupunkeja) | PD-kuvat Commons (1800-luvun valokuvat) | idea |

*H6 Maustereitit on yhdistetty S3:een (osa 3).*

## I. Lähi-itä ja Pohjois-Afrikka

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| I1 | Sivilisaation synty | Mesopotamia, Persia | 3500 eaa–330 eaa | Uruk · Ur · Babylon · Niniven kirjasto · Persepolis | pisteet | ★ | Kirjoitus, kaupungit ja lait syntyvät Mesopotamiassa: Urukin savitaulut kuuluvat vanhimpaan kirjoitukseen, Babylonissa kirjataan Hammurabin laki, ja Niniven kirjaston savitaulut säilyivät, koska tulipalo poltti ne koviksi. | kohde: Bagdad, Mosul (Niinive), Persepolis (pelin kaupunkeja) | PD-kuvat Commons (British Museumin taulut, 1800-luvun kaivauspiirrokset) | idea |
| I2 | Egyptin dynastiat | Egypti | 2650 eaa–30 eaa | Sakkara · Giza · Theba ja Luxor · Amarna · Aleksandria | pisteet | ★ | Faaraoiden Egypti kestää lähes kolme vuosituhatta Sakkaran porraspyramidista Aleksandriaan, ja Kleopatra eli ajallisesti lähempänä meitä kuin Gizan suuren pyramidin rakentajia. | kohde: Kairo, Luxor · hetket Rosetta 1799 ja Kuninkaiden laakso 1922 | PD-valokuvat ja -piirrokset Commons (1800-luku) | idea |
| I3 | Osmanien valtakunta (pari: M7) | Turkki, Balkan, Levantti | 1299–1923 | Bursa · Konstantinopoli 1453 · Wienin piiritys 1683 · Kairo · Suez 1869 · Ankara 1923 | pisteet | ★★★ | Osmanien valtakunta hallitsee kuusi vuosisataa kolmella mantereella, ja isoisän vuonna 1873 se on yhä suurvalta, jonka Balkanin alueet irtoavat viiden vuoden kuluttua Berliinin kongressissa 1878. | kohde: Bulgarian lauta (1878 pelissä), Istanbul, Ankara · hetki Konstantinopoli 1453 · aarre: Istanbul (ehdotus) | PD-maalaukset ja 1800-luvun valokuvat Commons | jonossa — Bulgaria 1878 pelissä |
| I4 | Persian puutarhat ja kaupungit | Iran | 550 eaa–1722 | Pasargadae · Persepolis · Isfahan · Shiraz | pisteet | ★ | Persialainen puutarha, josta tulee sana paratiisi, jaetaan vesikanavin neljään osaan jo Kyyroksen Pasargadaessa, ja sama malli toistuu Isfahanissa ja Taj Mahalissa. | kohde: Isfahan, Persepolis, Teheran (pelin kaupunkeja) | PD-kuvat Commons; Wikidata (CC0) | idea |

## J. Saharan eteläpuolinen Afrikka

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| J1 | Kultavaltakunnat | Länsi-Afrikka | 700–1591 | Ghana · Timbuktu · Mansa Musan hajj 1324 · Djenné · Songhai · Kano | pisteet | ★ | Länsi-Afrikan kulta ja suola rakentavat Ghanan, Malin ja Songhain valtakunnat, ja Mansa Musan pyhiinvaellus 1324 kuljettaa niin paljon kultaa, että kullan hinta laskee Kairossa vuosiksi. | kohde: Timbuktu, Gao, Kano (pelin kaupunkeja) | PD-kuvat Commons (Katalaaninen atlas 1375) | jonossa |
| J2 | Swahilirannikko ja Suuri Zimbabwe | Itä- ja Etelä-Afrikka | 1000–1500 | Kilwa · Sansibar · Mombasa · Suuri Zimbabwe · Sofala | pisteet | ★★ | Monsuunituulet yhdistävät Itä-Afrikan kauppakaupungit Arabiaan, Intiaan ja Kiinaan, ja Suuren Zimbabwen kivimuurit on ladottu ilman laastia sisämaan kultakaupan keskukseksi. | aarre: Suuren Zimbabwen kivilinnut (Aarnin luettelo) · kohde: Sansibar, Mosambik (pelin kaupunkeja) | PD-kuvat Commons | idea |
| J3 | Etiopia | Etiopia | 100–1700 | Aksum · Lalibela · Gondar | pisteet | ★ | Etiopia on maailman vanhimpia kristittyjä maita: Aksumin kuningas kääntyy 300-luvulla, ja Lalibelan kirkot hakataan 1200-luvulla suoraan kallioon. | kohde: Lalibela, Addis Abeba (pelin kaupunkeja) | PD-kuvat Commons | idea |
| J4 | Tutkimusmatkat Afrikassa | Afrikka | 1795–1877 | Mungo Park Niger · Livingstone Victorian putoukset 1855 · Burton ja Speke · Stanley ja Livingstone Ujiji 1871 · Stanley Kongo 1877 | pisteet | ★★★ | Eurooppalaiset kartoittavat Nigerin, Niilin ja Kongon juoksut vasta 1800-luvulla paikallisten oppaiden avulla, ja Livingstone kuolee 1873, isoisän matkavuonna, etsiessään Niilin lähteitä. | kohde: Viktorian putoukset, Tanganjika, Viktoria Nyanza, Kongo (pelin kaupunkeja) | PD-kuvat ja -kartat Commons (1800-luvun matkakirjat) | jonossa |
| J5 | Siirtomaajako ja rautatiet (pari: O3) | Afrikka | 1869–1914 | Suez · Berliinin konferenssi 1884 · Kap–Kairo-hanke · Uganda-rata | pisteet | ★★ | Berliinin konferenssi 1884–85 sopii säännöt, joilla Euroopan maat jakavat Afrikan, ja 1914 vain Etiopia ja Liberia ovat itsenäisiä, kun radat rakennetaan viemään raaka-aineita satamiin. | kohde: Nairobi (Uganda-rata), Kairo, Kapkaupunki (pelin kaupunkeja) | PD-kartat ja -valokuvat Commons | idea |

## K. Amerikat

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| K1 | Mesoamerikka ja Andit | Meksiko, Peru | 200–1532 | Teotihuacán · Tikal · Chichén Itzá · Tenochtitlán · Cusco · Machu Picchu | pisteet | ★ | Amerikan suurkaupungit syntyvät erillään muusta maailmasta: Tenochtitlán on 1500-luvun alussa suurempi kuin yksikään Espanjan kaupunki, ja inkat hallitsevat Andeja solmunarujen (quipu) avulla ilman kirjoitusta. | kohde: Mexico City, Mérida, Machu Picchu (pelin kaupunkeja) · hetki Machu Picchu 1911 | PD-kuvat Commons; Wikidata (CC0) | jonossa |
| K2 | Valloitus ja hopea | Latinalainen Amerikka | 1492–1600 | Hispaniola · Tenochtitlán 1521 · Cajamarca 1532 · Potosí · Lima | pisteet | ★ | Muutama sata espanjalaista kukistaa atsteekit ja inkat liittolaisten ja isorokon avulla, ja Potosín hopeavuoresta tulee maailman suurin hopeakaivos, jonka hopea kulkee Euroopan kautta Kiinaan. | kohde: Mexico City, Lima (pelin kaupunkeja) | PD-kuvat Commons (Firenzen koodeksi, Guaman Poma) | idea |
| K3 | Yhdysvaltain synty ja länsi (pari: O5) | USA | 1776–1869 | Philadelphia 1776 · Lewis ja Clark · Oregon Trail · kultaryntäys 1849 · Pacific Railroad 1869 | pisteet | ★★★ | Yhdysvallat laajenee Atlantilta Tyynellemerelle alle sadassa vuodessa, ja Tyynenmeren rata valmistuu 1869, neljä vuotta ennen isoisän matkaa, alkuperäiskansojen maiden halki. | kohde: Foggin reitti (San Francisco–New York), Chicago, Denver (pelin kaupunkeja) | PD-kuvat Commons (Library of Congress) | jonossa — Foggin reitti |
| K4 | Latinalaisen Amerikan itsenäistyminen | Etelä-Amerikka | 1810–1825 | Caracas Bolívar · Buenos Aires San Martín · Chacabuco · Ayacucho 1824 | pisteet | ★★ | Viidessätoista vuodessa lähes koko Espanjan Etelä-Amerikka itsenäistyy, kun Bolívar ja San Martín vievät armeijansa Andien yli, ja Ayacuchon taistelu 1824 päättää Espanjan vallan mantereella. | kohde: Caracas, Buenos Aires, Lima (pelin kaupunkeja) | PD-maalaukset Commons | idea |
| K5 | Amerikan keksinnöt | USA | 1793–1903 | Whitney · Morse 1844 · Bell 1876 · Edison Menlo Park · Wrightit 1903 | pisteet | ★★★ | Yhdysvalloista tulee 1800-luvun lopulla keksintöjen keskus: puhelin 1876, hehkulamppu 1879 ja lentokone 1903 syntyvät Atlantin takana, minkä Keksinnöt Euroopassa -linssin loppusanat sanovat ääneen. | kohde: hetket Menlo Park 1879 ja Kitty Hawk 1903 | PD-muotokuvat ja patenttipiirrokset Commons | idea — Keksinnöt Euroopassa -linssin sisar |
| K6 | Pohjoinen: viikingeistä rautatiehen | Grönlanti, Kanada | 1000–1885 | L'Anse aux Meadows · Hudsonin lahti · Luoteisväylä · Kanadan rata 1885 | pisteet | ★★ | Viikingit asuvat Newfoundlandissa noin vuonna 1000, lähes 500 vuotta ennen Kolumbusta, ja Kanadan halki valmistuu rautatie Atlantilta Tyynellemerelle 1885. | kohde: St. John's, Churchill, Vancouver (pelin kaupunkeja) | PD-kuvat ja -kartat Commons | idea |

## L. Oseania ja Tyynimeri

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| L1 | Polynesialaisten merenkulku | Tyynimeri | 1000 eaa–1250 | Samoa · Tahiti · Havaiji · Rapa Nui · Aotearoa noin 1250 | reitti | ★ | Polynesialaiset asuttavat Tyynenmeren kolmion ilman kompassia lukemalla tähtiä, aaltoja ja lintuja, ja Aotearoa asutetaan noin 1250 viimeisenä suurena maa-alueena. | kohde: Havaiji, Auckland (pelin kaupunkeja) | Glottolog (CC BY 4.0), GEBCO (PD); PD-kuvat Commons | idea |
| L2 | Cook ja Tyynimeri | Tyynimeri | 1768–1779 | Plymouth 1768 (hetki) · Tahiti · Uusi-Seelanti · Botany Bay · Havaiji 1779 | pisteet | ★★ | Cookin kolme matkaa kartoittavat Tyynenmeren eurooppalaisille: Venuksen ylikulku mitataan Tahitilla 1769, ja Cook kuolee Havaijilla 1779. | kohde: hetki Plymouth 1768 · Sydney, Havaiji | PD-maalaukset ja -kartat Commons | jonossa — H1-hetki; Plymouth on jo Historian hetki |
| L3 | Australia | Australia | 1788–1901 | Sydney 1788 · Ballaratin kultaryntäys 1851 · Burke ja Wills 1860 · liitto 1901 | pisteet | ★★★ | Brittien vankisiirtola Sydneyssä 1788 kasvaa kultaryntäyksen myötä, ja siirtokunnat yhdistyvät Australian liitoksi 1901, kun alkuperäiskansojen maat on otettu ilman virallisia sopimuksia. | kohde: Sydney, Melbourne, Uluru (Ayers Rock nimetään 1873) (pelin kaupunkeja) | PD-valokuvat ja -maalaukset Commons | idea |
| L4 | Evoluution saaret | Galápagos, Malaijisaaristo | 1835–1862 | Darwin Galápagos 1835 (hetki) · Wallace Ternate 1858 · Alfred Wallacen linja | pisteet | ★★ | Darwin ja Wallace oivaltavat luonnonvalinnan toisistaan riippumatta saarilla, ja Wallacen linja Balin ja Lombokin välissä erottaa Aasian ja Australian eläimistöt. | kohde: hetki Galápagos 1835 · Bali (pelin kaupunki) | PD-kuvat ja -piirrokset Commons (Darwin, Wallace, Gould) | idea — Galápagos on jo Historian hetki |

## Y. Leikki- ja katselulinssit (rengas 1): katselulinssit

Kevyt kaari tai vapaa selaus (Fablen kartoitus 21.9.2026); nimet rekisterin hiomassa-riveistä
haarassa pelikoodari-muuttolinnut. Koodia ei vielä ole. Leikkilinssit Y1–Y6 ovat osassa Pelissä nyt.

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| Y7 | Maailman ruoat | maailma | nykyhetki | kaupunkien ruoat kartalla · kuva ja yksi lause | pisteet | ★ | Monen maan tunnetuin ruoka on syntynyt tuoduista raaka-aineista: tomaatti tuli Italiaan Amerikasta vasta 1500-luvulla ja chili Intiaan portugalilaisten mukana. | aarre: Barcelona (rengas 1) | PD/CC-kuvat Commons; tekstit pelin omat | jonossa — katselulinssi (G3 kevyenä); hiomassa-rivi haarassa pelikoodari-muuttolinnut; ei koodia |
| Y8 | Maailman musiikki | maailma | nykyhetki | soittolista kaupungeittain · radion jatke | pisteet | ★ | Kaupunkien musiikkia kuuntelemalla kuulee, miten soittimet ja rytmit ovat kulkeneet maanosasta toiseen, kuten afrikkalaiset rytmit Amerikan bluesiin ja sambaan. | aarre: Wien (rengas 1) · kohde: kaupungit (radion jatke) | avoin (vain PD/CC-äänitteet) | jonossa — katselulinssi; hiomassa-rivi haarassa pelikoodari-muuttolinnut; ei koodia |
| Y9 | Maailman eläimet | maailma | nykyhetki | eläimet pallolla ilman kaarta · F2:n lajit | pisteet | ★ | Eläimet elävät siellä, mihin niiden ravinto ja ilmasto riittävät, ja monen lajin levinneisyys kertoo mantereiden historiasta, kuten pussieläinten Australia. | aarre: Kreeta (rengas 1) | avoin (GBIF ja OBIS vain CC0/CC BY -osat; PD-kuvat Commons) | jonossa — katselulinssi (F2 ilman kaarta); hiomassa-rivi haarassa pelikoodari-muuttolinnut; ei koodia |
| Y10 | Suurimmat kaupungit (pari: R18) | maailma | vuosi vuodelta (3700 eaa → nyt) | suurimmat kaupungit palloina · pallot kasvavat vuosi vuodelta | pisteet | ★★ | Kaupunkien kärkilista vaihtuu vuosisadoittain: Lontoo on suurin 1800-luvulla ja Tokio 1900-luvun lopulla, ja nyt nopeimmin kasvavat kaupungit ovat Aasiassa ja Afrikassa. | aarre: Moskova (rengas 1) | Reba ym. (CC BY 4.0), GHSL (CC BY 4.0) | jonossa — katselulinssi; hiomassa-rivi haarassa pelikoodari-muuttolinnut; ei koodia |

# Osa 2: Alue — rajat liukuvat ajassa (aluelinssit, toinen moottori)

Omistaja 2.9.2026 ilta: *"Kiinan dynastiat olisi kiva näyttää (ehkä
yksinkertaistetulla) karttapohjalla niin, että eri dynastiat olisivat eri
väreillä ja ne muovaisivat rajoja vuosien vieriessä. Samaa voisi soveltaa
maailmansotiin… napoleon, rooma."* Kello ja filminauha ovat samat kuin
aikajanalinssissä, mutta kartalle ei sytytetä pisteitä vaan piirretään
värialueita, joiden rajat liukuvat avainvuodesta toiseen.

| osa | aluelinssissä |
|---|---|
| pohja | yksinkertaistettu maakartta (rannat, suuret joet, ei nykyrajoja), pelin patina |
| alueet | avainvuosien monikulmiot (10–20 per linssi), rajat interpoloidaan välillä; väri per dynastia/valtio, selite reunassa |
| pysäkit | taistelut, rauhat, kruunaukset filminauhaan kuten aikajanassa |
| aineisto | historialliset rajat avoimista lähteistä (PD/CC BY -GeoJSON; lisenssi tarkistetaan ennen käyttöä), yksinkertaistetaan käsin — suurin työ |
| musiikki ja kuvat | sama putki kuin aikajanalinssissä |

## Moottorikortti

| kohta | sisältö |
|---|---|
| moottori | Alue (rajat liukuvat ajassa). Kello ja filminauha kuten aikajanassa, mutta kartalle piirretään värialueita, joiden rajat liukuvat avainvuodesta toiseen; Q1 on erikoistapaus, jossa vuosi on lukittu vuoteen 1873 ja päällä on mediakerros. |
| mitä on rakennettu | Ei omaa moottoria. Lähimmät palat: Q1 Isoisän linssi 1873 erä 1 natiivissa (vuoden 1873 rajat ja nimet pallolla, Linssit/Ydin/Isoisa/Isoisa1873.cs) ja C7:n värivirrat (laajenevat värialueet; web js/aikajana-virrat*.js, natiivi Linssit/Ydin/Virrat), jotka sopivat leviämislinsseihin (P). |
| pilotti | M1 Kiinan dynastiat (omistajan päätös, ennallaan 24.9.2026) |
| aineistoputki | Puuttuu. Historialliset rajat ovat GPL-3.0 (historical-basemaps), joten niistä tehdään omat käsin yksinkertaistetut CC0-monikulmiot 10–20 avainvuodelle linssiä kohden; välivuodet interpoloidaan. |
| web vai natiivi | avoin (Q1:n erä 1 on natiivissa; webin erä haarassa karttaseppa-isoisan-linssi, ei mainissa) |
| mikä puuttuu | Moottori (monikulmioiden interpolointi, värit ja selite), rajojen digitointiputki ja pilotin aineisto. |
| tekninen viite | Tämän osan johdanto; Raamattu, Karttalinssit "ISOISÄN LINSSI"; docs/raportit/linssi-1873-aineisto-20260921.md; docs/raportit/datalahteet-linsseille-20260924.md luvut 2.16 ja 6 |

## M. Valtakunnat ja dynastiat

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| M1 | Kiinan dynastiat | Kiina | 221 eaa–1912 | Qin · Han · Kolme kuningaskuntaa · Tang · Song · Yuan · Ming · Qing · tasavalta 1912 | alueet | ★★★ | Kiina yhdistyy ja hajoaa kahden vuosituhannen aikana monta kertaa, mutta sama kirjoitus ja virkamieskokeet säilyvät dynastiasta toiseen, ja isoisän vuonna 1873 maata hallitsee yhä Qing-dynastia. | kohde: Kanton (isoisän valokuva 1873), Peking, Xi'an (pelin kaupunkeja) | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0); PD-kuvat Commons | seuraava — 1. aluelinssi (omistajan esimerkki); aluemoottorin pilotti |
| M2 | Rooman nousu ja tuho | Välimeri | 509 eaa–476 | tasavalta · puunilaissodat · Caesar Gallia · Augustus · Trajanus 117 · jako 395 · 476 | alueet | ★ | Rooma kasvaa kaupunkivaltiosta koko Välimeren hallitsijaksi ja on laajimmillaan Trajanuksen aikaan 117, jakautuu 395, ja sen länsiosa lakkaa 476, kun itäinen jatkaa vielä lähes tuhat vuotta. | aarre: Venetsia (rengas 1) · kohde: hetki Pompeji 79 | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0); Pleiades (CC BY 3.0) | jonossa — 4. aluelinssi |
| M3 | Aleksanteri Suuri | Kreikka–Intia | 336–301 eaa | Makedonia · Issos · Egypti · Gaugamela · Persepolis · Hydaspes · diadokit | alueet | ★ | Aleksanteri valloittaa 11 vuodessa alueen Kreikasta Intiaan häviämättä yhtään suurtaistelua, mutta valtakunta jaetaan hänen kuoltuaan, ja kreikasta tulee itäisen Välimeren yhteinen kieli. | kohde: Persepolis, Kairo, Ateena (pelin kaupunkeja) | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea |
| M4 | Islamin leviäminen | Lähi-itä–Espanja | 622–750 | Medina · Jerusalem 638 · Persia · Pohjois-Afrikka · Iberia 711 · Poitiers 732 | alueet | ★ | Sadassa vuodessa Medinasta leviävä kalifaatti ulottuu Iberiasta Indusjoelle, ja vuoteen 750 mennessä se on yksi historian suurimmista valtakunnista. | kohde: Medina, Mekka, Jerusalem, Damaskos (pelin kaupunkeja) | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea |
| M5 | Mongolien imperiumi (pari: H4) | Aasia–Eurooppa | 1206–1368 | Tšingis-kaani · Kiova 1240 · Bagdad 1258 · Kublai · kaanikunnat · Yuan kaatuu | alueet | ★ | Tšingis-kaanin perilliset valloittavat noin 50 vuodessa alueen Koreasta Kiovaan, ja imperiumi jakautuu neljäksi kaanikunnaksi, joista Kultainen orda kerää veroa Venäjän ruhtinailta vielä 1400-luvulla. | kohde: Ulan Bator, Kiova, Bagdad, Samarkand (pelin kaupunkeja) | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea |
| M6 | Bysantti | itäinen Välimeri | 395–1453 | Justinianus 555 · arabit · Basileios II · 1204 · 1453 | alueet | ★ | Itä-Rooma eli Bysantti kestää tuhat vuotta Konstantinopolin muurien turvin, ja kaupunki vallataan ensimmäisen kerran vasta 1204, kristittyjen ristiretkeläisten toimesta. | aarre: Istanbul (rengas 2) · kohde: hetki Konstantinopoli 1453 | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea |
| M7 | Osmanien nousu ja lasku (pari: I3) | Turkki, Balkan, Lähi-itä | 1299–1923 | Bursa · 1453 · Suleiman 1566 · Wien 1683 · Bulgaria 1878 · 1923 | alueet | ★★★ | Osmanien raja etenee Wienin porteille 1683 ja vetäytyy sieltä kahden vuosisadan aikana pala palalta, kunnes Berliinin kongressi 1878 irrottaa Balkanin ja Turkin tasavalta syntyy 1923. | kohde: Bulgarian lauta (1878 pelissä), Istanbul | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | jonossa — Bulgaria pelissä |
| M8 | Reconquista | Iberia | 711–1492 | Covadonga · Toledo 1085 · Las Navas 1212 · Granada 1492 | alueet | ★ | Kristittyjen kuningaskuntien raja siirtyy Iberian niemimaalla pohjoisesta etelään lähes 800 vuoden ajan, ja Granadan kukistuminen 1492 osuu samaan vuoteen kuin Kolumbuksen lähtö. | aarre: Granada (rengas 2) · kohde: hetki Santa Fé 1492 | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea |
| M9 | Viikinkien maailma | Pohjois-Eurooppa–Atlantti | 793–1066 | Lindisfarne · Danelaw · Normandia 911 · Islanti · Grönlanti · Vinland · 1066 | alueet | ★ | Pohjolan merenkulkijat ryöstävät, käyvät kauppaa ja asuttavat Lindisfarnesta 793 Normandiaan, Islantiin ja Vinlandiin asti, ja viikinkiaika päättyy Englannin taisteluihin 1066. | aarre: Oslo (rengas 2) · kohde: hetki Roskilde 1040 · Islanti, Nuuk | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea |
| M10 | Ruotsin suurvalta ja Suomi | Itämeri | 1561–1809 | Tallinna 1561 · Kustaa II Aadolf · Westfalen 1648 · Poltava 1709 · Uusikaupunki 1721 · Hamina 1809 | alueet | ★★ | Ruotsi nousee Itämeren suurvallaksi ja menettää asemansa Poltavan tappiosta 1709 alkaen, kunnes Haminan rauhassa 1809 Suomi siirtyy Venäjän yhteyteen. | aarre: Tukholma (rengas 2) · kohde: Helsinki, Tallinna, Tukholma · hetki Jänissaari 1703 | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea — Suomen rajat 1323–1947 jatkona |
| M11 | Inkat ja atsteekit | Andit, Meksiko | 1325–1572 | Tenochtitlán 1325 · Pachacuti · Huayna Capac · Cortés 1521 · Cajamarca 1532 · Vilcabamba 1572 | alueet | ★ | Atsteekkien ja inkojen valtakunnat kasvavat suurvalloiksi vasta 1400-luvulla ja kaatuvat alle sadassa vuodessa espanjalaisten, heidän liittolaistensa ja tautien edessä. | kohde: Mexico City, Machu Picchu, Lima (pelin kaupunkeja) | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea |

## N. Sodat ja rintamat

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| N1 | Napoleonin Eurooppa | Eurooppa | 1796–1815 | Italia 1796 · Egypti · Austerlitz 1805 · Jena · Tilsit · Espanja · Moskova 1812 · Leipzig · Waterloo 1815 | alueet | ★★ | Napoleonin valta ulottuu 1812 Espanjasta Moskovan porteille ja romahtaa kolmessa vuodessa, mutta hänen lakikirjansa ja metrijärjestelmä jäävät Euroopan arkeen. | aarre: Marseille (rengas 1) · kohde: hetki Trafalgar 1805 | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | jonossa — 2. aluelinssi (omistajan esimerkki) |
| N2 | Ensimmäinen maailmansota | Eurooppa, Lähi-itä | 1914–1918 | Sarajevo · Marne · Gallipoli · Verdun · Somme · Brest-Litovsk · 11.11.1918 | alueet | ★★ | Laukaus Sarajevossa käynnistää liittoumien ketjun, rintamat jähmettyvät juoksuhaudoiksi vuosiksi, ja neljässä vuodessa neljä keisarikuntaa kaatuu ja Euroopan kartta piirretään uudelleen. | aarre: Sarajevo (rengas 1) · kohde: Sarajevo | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0); PD-valokuvat Commons (sävy 13+) | jonossa — 3. aluelinssi (omistajan esimerkki) |
| N3 | Toinen maailmansota | Eurooppa, Tyynimeri | 1939–1945 | Puola · Ranska 1940 · Barbarossa · Pearl Harbor · Stalingrad · Normandia · Berliini · Hiroshima | alueet | ★ | Kuudessa vuodessa rintamat liikkuvat Atlantilta Volgalle ja Tyynellemerelle, ja sodan jälkeen perustetaan YK 1945 estämään uusi maailmansota. | aarre: Berliini (rengas 2) | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | jonossa — 5. aluelinssi (pelin aikakauden ulkopuolella, linssi katsoo eteenpäin; sävy 13+: rintamat ja rauhat, ei kauhukuvia) |
| N4 | Kolmikymmenvuotinen sota | Keski-Eurooppa | 1618–1648 | Prahan ikkuna · Breitenfeld · Lützen 1632 · Westfalen | alueet | ★ | Uskonsotana alkava sota autioittaa osia Saksasta, suomalaiset hakkapeliitat taistelevat Ruotsin riveissä, ja Westfalenin rauha 1648 luo periaatteen valtioiden itsemääräämisestä. | aarre: Praha (rengas 3) · kohde: Praha | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea |
| N5 | Krimin sota | Musta meri, Itämeri | 1853–1856 | Sinope · Sevastopol · Bomarsund · Pariisin rauha | alueet | ★★ | Krimin sota on ensimmäisiä sotia, joista uutiset kulkevat sähkeinä ja valokuvina, ja se ulottuu Suomeenkin: Britannian ja Ranskan laivasto tuhoaa Bomarsundin linnoituksen Ahvenanmaalla 1854. | aarre: Odessa (rengas 3) · kohde: Odessa | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0); PD-valokuvat Commons (Fenton 1855) | idea — isoisän aikalaisten sota; Ahvenanmaa |
| N6 | Yhdysvaltain sisällissota | USA | 1861–1865 | Fort Sumter · Antietam · Gettysburg · Sherman · Appomattox | alueet | ★★ | Sisällissota on Yhdysvaltain verisin sota, rautatiet ja lennätin ratkaisevat sen kulkua, ja sen lopussa 1865 orjuus lakkautetaan koko maassa. | avoin | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0); PD-valokuvat Commons (Library of Congress) | idea |
| N7 | Balkanin sodat | Balkan | 1877–1913 | Pleven 1877 · San Stefano · Berliini 1878 · 1912 · 1913 | alueet | ★★★ | Venäjän–Turkin sota 1877–78 luo Bulgarian, ja Balkanin kansallisvaltiot taistelevat 1912–13 ensin osmaneja ja sitten toisiaan vastaan, mikä tekee alueesta Euroopan ruutitynnyrin ennen vuotta 1914. | aarre: Sofia (rengas 3) · kohde: Bulgarian lauta | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea — Bulgarian lauta |

## O. Imperiumit, siirtomaat ja kartan uusjako

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| O1 | Espanja ja Portugali maailmalla | maailma | 1494–1825 | Tordesillas 1494 · Filippiinit · Brasilia · itsenäistymiset 1810–1825 | alueet | ★ | Tordesillasin sopimus 1494 jakaa maailman Espanjan ja Portugalin kesken Atlantin halki vedetyllä viivalla, ja siksi Brasiliassa puhutaan nykyään portugalia ja muualla Etelä-Amerikassa enimmäkseen espanjaa. | kohde: Lissabon, Madrid, Manila, Rio de Janeiro (pelin kaupunkeja) | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea |
| O2 | Britannian imperiumi | maailma | 1600–1922 | Itä-Intian kauppakomppania · Plassey 1757 · Kanada · Australia · Intia 1858 · Egypti 1882 · 1922 | alueet | ★★★ | Kauppakomppaniasta syntyy imperiumi, joka kattaa laajimmillaan 1922 noin neljäsosan maapallon maa-alasta ja väestöstä, ja isoisän vuonna 1873 Intiaa hallitaan suoraan Lontoosta. | kohde: Lontoo, Mumbai (isoisän valokuva Bombay 1873), Kolkata | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea — D6:n Kalkutta ja Kap yhdistetty 24.9.2026 |
| O3 | Afrikan jako (pari: J5) | Afrikka | 1870–1914 | Suez · Berliini 1884 · Kongo · Fashoda 1898 · buurisota · 1914 | alueet | ★★★ | Vuonna 1870 eurooppalaiset hallitsevat noin kymmenesosaa Afrikasta ja 1914 lähes kaikkea, ja jako tehdään neuvottelupöydissä Euroopassa usein viivoitinta käyttäen. | kohde: Kongo, Kairo, Kapkaupunki (pelin kaupunkeja) | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | jonossa |
| O4 | Venäjä laajenee Siperiaan | Venäjä–Tyynimeri | 1582–1867 | Jermak 1582 · Jakutsk 1632 · Ohotsk · Kamtšatka · Alaska 1867 | alueet | ★★ | Venäjä etenee turkisten perässä Uralilta Tyynellemerelle alle 70 vuodessa, Jermakista 1582 Ohotskiin 1647, ja myy Alaskan Yhdysvalloille 1867. | kohde: Siperian laudat (Irkutsk, Jakutsk, Kamtšatka) | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea — Siperian laudat pelissä |
| O5 | Yhdysvallat laajenee (pari: K3) | Pohjois-Amerikka | 1783–1912 | 1783 · Louisiana 1803 · Texas 1845 · Oregon · Meksiko 1848 · Alaska 1867 · 1912 | alueet | ★★★ | Yhdysvaltojen pinta-ala noin nelinkertaistuu ostamalla (Louisiana 1803, Alaska 1867) ja sotimalla (Meksiko 1848), ja jokainen rajan siirto työntää alkuperäiskansoja pois. | kohde: New Orleans, Santa Fe, San Francisco, Sitka (pelin kaupunkeja) | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | idea |
| O6 | Euroopan kartta uusiksi (pari: D5) | Eurooppa | 1815–1923 | Wien 1815 · Italia 1861 · Saksa 1871 · Berliini 1878 · Versailles 1919 · Lausanne 1923 | alueet | ★★★ | Euroopan rajat piirretään kongresseissa uusiksi Wienissä 1815, Berliinissä 1878 ja Versailles'ssa 1919, ja isoisän vuoden 1873 kartta on välivaihe, jossa Saksa ja Italia ovat juuri yhdistyneet. | aarre: Wien (rengas 2) · kohde: Q1 Isoisän linssi (rajat 1873) | omat käsin yksinkertaistetut CC0-rajat (historical-basemaps on GPL-3.0) | jonossa — isoisän Eurooppa 1873 keskellä |

*D6:n Kalkutta ja Kap on yhdistetty O2:een.*

## P. Leviämiset

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| P1 | Uskontojen levinneisyys (pari: A1–A5) | maailma | 500 eaa–1900 | buddhalaisuus · kristinusko · islam · uskonpuhdistus · lähetystyö | alueet | ★ | Uskontojen levinneisyys seuraa kauppareittejä, valloituksia ja lähetystyötä, ja kartta näyttää, miksi islam on Indonesian ja kristinusko Filippiinien suurin uskonto. | kohde: Jerusalem, Mekka, Varanasi, Lhasa (pelin kaupunkeja) | omat CC0-alueet; Wikidata (pyhät paikat, CC0), World Historical Gazetteer | jonossa — uskontojen aikajanalinssien pari |
| P2 | Musta surma | Eurooppa | 1347–1353 | Kaffa · Messina 1347 · Marseille · Pariisi 1348 · Lontoo · Bergen 1349 · Moskova 1353 | alueet | ★ | Rutto leviää Mustanmeren Kaffasta laivojen mukana Messinaan 1347 ja kuudessa vuodessa koko Eurooppaan, ja se tappaa arviolta kolmanneksen tai jopa puolet väestöstä. | aarre: Marseille (rengas 3) · kohde: Sisilia (Messina), Marseille, Bergen | omat CC0-alueet; PD-kuvat Commons | idea — G1:n musta surma yhdistetty 24.9.2026 |
| P3 | Indoeurooppalaiset kielet | Euraasia | 3500 eaa–1500 | arot · Anatolia · Kreikka · Italia · germaanit · slaavit · Intia | alueet | ★ | Ruotsi, venäjä, hindi ja persia ovat sukua keskenään, koska ne polveutuvat todennäköisesti Euraasian aroilta yli 5 000 vuotta sitten levinneestä kantakielestä, mutta suomi ei kuulu tähän sukuun. | avoin | Glottolog (CC BY 4.0); omat CC0-alueet | idea |
| P4 | Rautatieverkon kasvu (pari: C3) | Eurooppa | 1825–1900 | Britannia · Belgia 1835 · Saksa · Ranska · Venäjä · Suomi 1862 | alueet | ★★★ | Euroopan rataverkko kasvaa 75 vuodessa koko maanosan kattavaksi, ja isoisän vuonna 1873 Helsingistä pääsee jo junalla Pietariin (1870) ja sieltä Varsovan kautta Keski-Eurooppaan. | aarre: Bryssel (rengas 3) · kohde: Helsinki, Pietari | OSM-radat start_date-kentällä (ODbL), Martí-Henneberg (tarkistettava) | idea — verkko piirtyy vuosi vuodelta |
| P5 | Kirjapainon leviäminen | Eurooppa | 1450–1500 | Mainz · Venetsia · Pariisi · Lontoo 1476 · Tukholma 1483 | alueet | ★ | Gutenbergin kirjapaino leviää Mainzista 50 vuodessa yli 250 kaupunkiin, ja vuoteen 1500 mennessä painettuja kirjoja on jo miljoonia. | aarre: Venetsia (rengas 3) · kohde: hetki Mainz 1454 | Wikidata (painopaikat, CC0); PD-kuvat Commons | idea |
| P6 | Mantereet liikkuvat | maailma | 250 milj. v sitten → nyt | Pangaea · Gondwana · Atlantti avautuu · Intia törmää · nyt | alueet | ★ | Mantereet liikkuvat muutaman senttimetrin vuodessa, suunnilleen kynnen kasvuvauhtia, ja 250 miljoonassa vuodessa Pangaea hajoaa, Atlantti avautuu ja Intian törmäys Aasiaan nostaa Himalajan. | avoin | PALEOMAP/GPlates, lisenssi tarkistettava | idea — lisätty 24.9.2026; syvä aika |

*G1:n musta surma on yhdistetty P2:een. Uusi 24.9.2026: P6.*

## Q1. Isoisän linssi (ryhmä Q; lisätty 21.9.2026, omistajan linjaus)

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| Q1 | Isoisän linssi — vuosi 1873 | maailma | 1873 | 1873 rajat ja maiden nimet · Horation reitti katkoviivana · isoisän valokuvat · ajan äänet ja media | alueet | ★★★ | Isoisän vuoden 1873 kartalla Osmanien valtakunta ulottuu Balkanille, Saksa on juuri yhdistynyt ja Afrikan sisämaa on vielä ilman siirtomaarajoja, joten pelaaja näkee, mikä kaikki on muuttunut 150 vuodessa. | lahja pelin alussa, ei aarre (21.9.2026) · kohde: kaikki laudat | historical-basemaps 1878→1873 (GPL-3.0, striimataan ämpäristä); nimistö aika=1873; ICOADS, 20CRv3, HYDE 3.2 ym. (datalähteet luku 3) | rakenteilla — alue-moottorin erikoistapaus: vuosi lukittu 1873:een + mediakerros; natiivissa erä 1 (rajat ja nimet pallolla, proto master 23.9.2026, kehittäjätilassa); web-haara karttaseppa-isoisan-linssi |

- **Q1 Isoisän linssi — vuosi 1873** — vahvasti retro linssi VAIN isoisän
  matkan vuodesta: 1873 rajat ja maiden nimet (nimistön aika=1873, raja-
  aineisto historical-basemaps GPL-3.0 korjattuna), Horation reitti
  katkoviivana, isoisän valokuvat (havainnekuvat), ajan äänet ja media
  (CC-julisteet, ääninäytteet). Ei aikajanaa. Raamattu: Karttalinssit
  "ISOISÄN LINSSI". Tila: aineisto valittu, toteutus odottaa Fablen sanaa.
- Tila 24.9.2026: rakenteilla — natiivissa erä 1 (rajat ja nimet pallolla) on proto-masterissa
  23.9.2026 kehittäjätilassa; webin erä on haarassa karttaseppa-isoisan-linssi, ei mainissa.
- Muut historialliset tapahtumat (mm. N2 ja N3 maailmansodat) saavat omat
  linssinsä nykyisen kartan päälle; Q1 ei korvaa niitä.

# Osa 3: Virta — hiukkaset reiteillä (virtalinssit, kolmas moottori)

Omistaja 2.9.2026 ilta: *"visuaalisesti voimakkain linssi jonka pohjana olisi
koko maailmankartta ja aiheena siirtomaat … salamanisku merireittiä pitkin
valloittajamaista siirtomaihin … sen jälkeen merireitille piirtyisi pieniä
veneitä jotka kuljettaisivat banaania, teetä, yms. … ääniefektit ja
kuulutukset megafonista."*

Moottori: kello ja filminauha samat, mutta kartalla liikkuu jatkuvasti satoja
hiukkasia reittikäyrillä → Canvas-kerros (M7+-linssialusta), ei DOM. Isku =
salama emämaasta alueelle ensimmäisen alistuksen vuonna, alue saa emämaan
värin; virta = laivoja, joiden määrä ja lasti seuraavat vuosia ja loppuvat
kaupan tai siirtomaavallan loppuun. Ääni: satama-ambienssi, torvi, kuulutus
megafonista pysäkeillä, generoidaan lukijaäänellä etukäteen. Orjat kuulutetaan
kuten muu lasti ("laiva on lastattu orjilla"), koska niin heihin silloin
suhtauduttiin; orjalaivat vetävät mustaa viivaa, Pulu tulee väliin ja selittää,
ja tyhjälle merelle projisoidaan generoituja aikalaiskuvia orjien oloista ja
siirtomaavaltojen arjesta (13+, mutta asia kerrotaan niin kuin se oli).

## Moottorikortti

| kohta | sisältö |
|---|---|
| moottori | Virta (hiukkaset reiteillä). Kello ja filminauha samat, mutta kartalla liikkuu jatkuvasti satoja hiukkasia reittikäyrillä; isku on salama emämaasta alueelle, ja virta on laivoja, joiden määrä ja lasti seuraavat vuosia. |
| mitä on rakennettu | Ei omaa moottoria eikä hiukkaspiirtoa. Lähin pala on C7:n vanat pallolla (js/aikajana-vanat.js); datalinssi R20 Kauppavirrat 1873 synnyttää virtamoottorin datarajapinnan (selvityksen luku 7). |
| pilotti | S1 Siirtomaat (omistajan päätös, ennallaan 24.9.2026) |
| aineistoputki | Puuttuu. Lähteet: historical-basemaps (alueen väri; GPL-3.0 → omat CC0-alueet), RICardo (kauppavirrat 1787–, ODbL), CLIWOC ja ICOADS (laivat), SlaveVoyages (vain PD-kentät). |
| web vai natiivi | avoin |
| mikä puuttuu | Hiukkasmoottori reittikäyrillä, merireittien verkko, salama ja alueen värinvaihto, satama-ambienssi ja megafonikuulutukset lukijaäänellä. |
| tekninen viite | Tämän osan kuvaus; docs/raportit/datalahteet-linsseille-20260924.md luvut 3, 6 ja 7 |

## S. Siirtomaat ja kauppa

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| S1 | Siirtomaat | maailma | 1415–1960 | Ceuta 1415 · Goa 1510 · Hispaniola · VOC Amsterdam 1602 · Batavia 1619 · Kalkutta · Kap 1652 · Sydney 1788 · Algeria 1830 · Berliinin konferenssi 1884 · Kongo 1885 · Intia 1947 · Afrikka 1960 | hiukkaset | ★★★ | Viidessä vuosisadassa pienet Euroopan maat alistavat suuren osan maailmasta Ceutasta 1415 alkaen, raaka-aineet ja ihmiset virtaavat emämaihin, ja siirtomaavalta purkautuu vasta 1947–1960, kun Intia ja suurin osa Afrikasta itsenäistyvät. | kohde: Kolkata, Mumbai, Jakarta, Kapkaupunki, Kongo (pelin kaupunkeja) | historical-basemaps (GPL-3.0) → omat CC0-alueet; RICardo (ODbL); PD-kuvat Commons | seuraava — omistajan kolmas linssi; virtamoottorin pilotti; salama emämaasta alueelle, sitten lastilaivat vuosien mukaan; D6:n pysäkit (VOC Amsterdam, Berliinin konferenssi 1884) yhdistetty 24.9.2026 |
| S2 | Kolmiokauppa | Atlantti | 1500–1867 | Elmina · Liverpool · Nantes · Karibia · Bahia · Charleston · kielto 1807 · viimeinen laiva 1867 | hiukkaset | ★★ | Kolmiokaupassa laivat vievät Euroopasta tavaraa Afrikkaan, orjuutettuja ihmisiä Amerikkaan ja sokeria, puuvillaa ja tupakkaa takaisin Eurooppaan, ja valtameren yli kuljetetaan arviolta 12,5 miljoonaa afrikkalaista. | kohde: Orjarannikko, Lagos, Havanna, Salvador (pelin kaupunkeja) | SlaveVoyages (historialliset kentät PD, imputoidut NC vain luvalla); PD-kuvat Commons | jonossa — orjat kuulutetaan kuten muu lasti, koska niin heihin silloin suhtauduttiin; orjalaivat vetävät mustaa viivaa, Pulu selittää, merelle projisoidaan aikalaiskuvia (13+, totuudellisesti) |
| S3 | Maustereitit ja teekauppa | Intian valtameri–Eurooppa | 1000–1900 | Malabar · Molukit · Malakka · Lissabon · Batavia · Kanton · Kalkutta · teekilpalaivat 1866 · Suez 1869 | hiukkaset | ★★★ | Neilikka ja muskotti kasvavat vain Molukeilla ja pippuri Malabarin rannikolla, joten niiden hallinnasta kilpailevat vuosisatoja arabit, portugalilaiset, hollantilaiset ja britit, kunnes 1800-luvulla teestä tulee tärkein lasti. | kohde: Kanton (isoisän valokuva 1873), Kolkata, Jakarta, Singapore (pelin kaupunkeja) | RICardo (ODbL), CLIWOC (CC BY 3.0), ICOADS (CC BY 4.0); PD-kuvat Commons | idea — H6 Maustereitit yhdistetty 24.9.2026 (Malabar, Lissabon, Batavia; kaari alkaa 1000) |
| S4 | Hopea ja kulta | Amerikat–Eurooppa–Aasia | 1545–1900 | Potosí 1545 · Manilan galeonit · Sevilla · kultaryntäykset 1849, 1851, 1886 | hiukkaset | ★★★ | Amerikan hopeasta tulee ensimmäinen maailmanlaajuinen raha, kun Potosín hopea kulkee Sevillaan ja Manilan galeoneilla Kiinaan, ja 1800-luvun kultaryntäykset Kaliforniassa, Australiassa ja Etelä-Afrikassa synnyttävät kokonaisia kaupunkeja. | kohde: San Francisco, Melbourne, Manila (pelin kaupunkeja) | RICardo (ODbL), Wikidata (kaivokset, CC0); PD-kuvat Commons | idea |
| S5 | Turkikset ja valaat | pohjoinen | 1600–1900 | Hudsonin lahti · Siperia · Huippuvuoret · Nantucket · Beringinmeri | hiukkaset | ★★ | Turkikset ja valaanrasva vetävät eurooppalaiset pohjoiseen: majavanturkikset rahoittavat Hudsonin lahden komppaniaa 1670 alkaen, ja valaanpyynti tyhjentää Huippuvuorten ja Beringinmeren valaskannat. | kohde: Churchill, Kamtšatka, Nome (pelin kaupunkeja) | ICOADS (valaanpyytäjien lokit, tarkistettava), OBIS (vain CC0/CC BY -osat); PD-kuvat Commons | idea |
| S6 | Luonnonvarat valuvat | maailma | 1850–2000 | guano Chincha 1840 · kumi Kongo ja Amazon · kupari Chile · timantit Kimberley 1867 · öljy Baku ja Pennsylvania 1859, Persia 1908 · harvinaiset maametallit | hiukkaset | ★★★ | Teollisuuden raaka-aineet louhitaan kaukana käyttäjistä: Perun guano lannoittaa Euroopan pellot, Kongon kumi ja Kimberleyn timantit rikastuttavat emämaita, ja 1859 alkava öljyaika nostaa Bakun ja myöhemmin Lähi-idän merkityksen. | kohde: Kimberley, Kongo, Manaus, Antofagasta (pelin kaupunkeja) | Global Energy Monitor, GPPD, EDGAR (CC BY 4.0); PD-kuvat Commons | jonossa — louhintamaa värilänttinä, joka valuu maailmalle; raaka-aine omalla värillään |
| S7 | Lähi-itä ja musta kulta | Lähi-itä | 1908–1973 | Masjed Soleyman 1908 · Sykes–Picot 1916 · mandaatit 1920 · Kirkuk 1927 · Bahrain 1932 · Dammam 1938 · Iran 1951 · Suez 1956 · OPEC 1960 · 1973 | hiukkaset | ★ | Lähi-idän öljy löydetään 1908 Persiasta, alueen rajat piirretään Sykes–Picot-sopimuksessa 1916 ja mandaateissa, ja vasta OPEC 1960 ja öljykriisi 1973 siirtävät öljyn hinnan tuottajamaiden käsiin. | kohde: Bagdad, Mosul, Kuwait, Doha, Dubai, Teheran (pelin kaupunkeja) | GEM Oil & Gas Extraction Tracker (CC BY 4.0); omat CC0-alueet (mandaatit) | jonossa — omistaja 2.9.: Lähi-itäkin oli aluksi siirtomaa ja alistettu; salama ja mandaatin väri, sitten öljy valuu ulos, Pulu kertoo kenelle tuotto meni |

*D6 on yhdistetty S1:een (pysäkit VOC Amsterdam 1602 ja Berliinin konferenssi 1884) ja H6 S3:een.*

## T. Ihmisten virrat

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| T1 | Siirtolaisuus Amerikkaan | Eurooppa–Amerikat | 1840–1914 | Irlanti 1845 · Bremen · Liverpool · Ellis Island 1892 · Hanko–New York | hiukkaset | ★★★ | Vuosina 1840–1914 kymmenet miljoonat eurooppalaiset muuttavat Amerikkaan nälkää, köyhyyttä ja vainoa pakoon, ja heidän joukossaan on noin 300 000 suomalaista, joista moni lähtee Hangon satamasta. | kohde: Helsinki (Hanko), Dublin, New York (pelin kaupunkeja) · aarre: Helsinki (ehdotus) | RICardo (satamat, ODbL), UN WPP (CC BY 3.0 IGO); PD-valokuvat Commons (Ellis Island) | jonossa — suomalaiset siirtolaiset mukana |
| T3 | Siperian karkotukset ja asutus | Venäjä | 1590–1917 | Tobolsk · Irkutsk · Sahalin · rata 1891 | hiukkaset | ★★ | Siperia on Venäjälle yhtä aikaa vankila ja siirtomaa: karkotetut ja vapaat uudisasukkaat asuttavat sen Tobolskista Sahaliniin, ja 1891 aloitettu Siperian rata tuo miljoonia uusia asukkaita. | kohde: Siperian laudat (Irkutsk, Sahalin, Novosibirsk) | HYDE 3.2 (CC0); PD-kuvat Commons | idea |

*T2 Pyhiinvaellukset on yhdistetty A6:een (osa 1).*

## U. Yhteydet

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| U1 | Sähkösanomakaapelit (pari: R33) | maailma | 1851–1902 | Dover–Calais 1851 · Atlantti 1866 · Intia 1870 · Australia 1872 · Tyynimeri 1902 | hiukkaset | ★★★ | Merikaapelit kytkevät maanosat parissakymmenessä vuodessa, ja vuonna 1873 sähke kulkee Lontoosta Intiaan ja Australiaan tunneissa, kun kirjeeltä meni viikkoja. | sähke: pelin sähkeet kulkevat näitä · aarre: Lontoo (ehdotus) | historialliset kaapelikartat (PD, digitoidaan), OSM-merikaapelit (ODbL) | jonossa — pelin sähkeet; 1873 keskellä |
| U2 | Höyrylaivat, kanavat ja postilinjat | maailma | 1807–1914 | Clermont · P&O · Cunard · Great Eastern · Suez 1869 · Fogg 1872 · Kielin kanava · Titanic · Panama 1914 | hiukkaset | ★★★ | Höyry ja kanavat tekevät merimatkoista aikataulun mukaisia: Suezin kanava 1869 lyhentää Lontoon ja Bombayn välin noin 40 prosenttia, ja postilinjat kulkevat säännöllisesti kuin junat. | kohde: hetket Port Said 1869 ja Southampton 1912 · Foggin reitti | ICOADS 1873 (CC BY 4.0), World Port Index (PD); PD-kuvat Commons | idea — C4 Höyrylaivat ja kanavat yhdistetty 24.9.2026; nimi ennen: Postireitit ja höyrylinjat |

*C4 on yhdistetty U2:een, jonka nimi on nyt Höyrylaivat, kanavat ja postilinjat (ennen Postireitit ja höyrylinjat); U3 Muuttolinnut on yhdistetty R28:aan (osa 4).*

# Osa 4: Data — aikasarjat ja rasterit (datalinssit)

## Moottorikortti

| kohta | sisältö |
|---|---|
| moottori | Data (aikasarjat ja rasterit). Julkinen data kartalle: rasteripino (vuodet tekstuureina, välivuodet varjostimessa), pisteet ja reitit aikaikkunassa sekä vertailut 1873 ↔ nyt; aikaselain kelaa vuosia. |
| mitä on rakennettu | Ei datamoottoria. Valmiit palat: aikaselain (web ja natiivi), reliefirasteri pallolla (js/linssit/reliefikuva.js), NASA-kuvat pisteinä (astronautin kamera), maakäyrät (vertailu) ja webin yökartta-kuva (js/packs/linssi-yokartta.js). |
| pilotti | R36 Maapallon tila (NASA/NSIDC, vain natiivissa): rakentaa rasteripinon ja aikaselaimen kytkennän, joita muut datalinssit käyttävät |
| aineistoputki | Suunniteltu: tools/<linssi>/*.mjs tai Python Macilla → ämpäri virta/<linssi>/ lahde-kenttineen; vain PD/CC0/CC BY/avoin, jakoehdolliset samalla lisenssillä, ei NC:tä. |
| web vai natiivi | natiivi (Maapallon tila on vain natiivissa, omistaja 24.9.2026); muiden alusta avoin |
| mikä puuttuu | Rasteripino (Texture2DArray), pistemoottori (R4) ja aineistoputket; toteutus alkaa pariteetin ja omistajan build-kokeilun jälkeen. |
| tekninen viite | docs/raportit/datalahteet-linsseille-20260924.md (luvut 5–7); linssi-maapallon-tila-suunnitelma-20260924.md (haara linssiseppa-tyo-20260923); Raamattu, DATALINSSIT ja MAAPALLON TILA -LINSSI |

## R. Datalinssit (lisätty 24.9.2026, omistajan tilaus: julkisen datan visualisointi kartalle)

Selvitys: docs/raportit/datalahteet-linsseille-20260924.md (145 avointa lähdettä 19 aihealueelta,
lisenssit tarkistettu 24.9.2026; lähteiden kytkentä osiin A–Q ja Osa 3 on selvityksen luvussa 3).
Ensimmäinen datalinssi on Maapallon tila (Raamattu, NASA/NSIDC; suunnitelma
docs/raportit/linssi-maapallon-tila-suunnitelma-20260924.md) — se rakentaa rasteripinon ja aikaselaimen,
joita muut käyttävät. Lisenssiehto: vain PD/CC0/CC BY/avoin attribuutiolla; NC-lisenssit eivät kelpaa;
jakoehto (ODbL, CC BY-SA) ja ilmaiset datatilit odottavat omistajan päätöstä (kortti 24.9.).
Vaikeus: helppo/keski/vaikea. 1873-sidos: ★★★ isoisän matkaan, ★★ ennen ja nyt, ★ nykyhetki.
Toteutusjärjestys (selvityksen luku 7): 1 Maapallon tila → 2 R4+R5 → 3 R7 → 4 R1+R2 → 5 R11 → 6 R12+R13 →
7 R16–R18 → 8 R20 → 9 R3+R9 → 10 R14+R15.

Tarkennus: Raamatun DATALINSSIT-linjaus (omistaja 24.9.2026 klo 11.0x–11.2x) salli jakoehdolliset
lisenssit (ODbL, CC BY-SA) samalla lisenssillä ja ilmaiset datatilit (ECMWF/Copernicus, EOG, GBIF),
mutta ei Earthdataa. HYDE 3.3 on CC BY-NC-SA, joten HYDE-aineistona käytetään HYDE 3.2:ta (CC0;
Raamatun loki 24.9.2026 klo 13.06). Maapallon tila sai id:n R36 (ryhmän seuraava vapaa).

### Järjestyksessä (selvityksen luku 7, kohdat 1–10)

| järj. | # | Linssi | Mitä pelaaja näkee | Lähteet | Aikasarja | Vaikeus | Muoto | 1873 | Mitä opitaan | Pelikytkös | Tila |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | R36 | **Maapallon tila** | Arktisen ja Etelämantereen merijään minimi 1979→nyt animaationa napojen yllä, lämpötilan poikkeama koko pallolla 1880→nyt ja merenpinta 1993→nyt; vuosia voi vetää aikaselaimesta. | NSIDC G02135 (viittaus ehtona), NASA GISTEMP v4 (PD), NOAA STAR LSA (PD); merkintä "NASA / NSIDC" | animoitu (vuosi) | keski | rasteri | ★★ | Arktisen merijään syyskuun minimi on pienentynyt noin kolmanneksen vuodesta 1979, ja maapallon keskilämpötila on noussut runsaan asteen 1880-luvulta. | kohde: natiivin linssivalikossa heti Astronautin kameran jälkeen, sama avauskynnys | seuraava (data) — vain natiivissa (omistaja 24.9.2026); suunnitelma linssi-maapallon-tila-suunnitelma-20260924.md (haara linssiseppa-tyo-20260923); ei aiempaa id:tä, R36 on ryhmän seuraava vapaa |
| 2 | R4 | **Laivat 1873** | Jokainen vuoden 1873 laivahavainto piirtyy pisteenä, ja reitit piirtyvät vähitellen kuukausi kerrallaan. | ICOADS R3 | animoitu | keski | pisteet | ★★★ | Vuoden 1873 lokikirjoista koottu aineisto näyttää, että laivat kulkevat tuulten ja virtojen määräämiä käytäviä ja höyrylaivat oikaisevat jo Suezin kautta. | kohde: isoisän laivamatkat 1873 | seuraava (data) |
| 2 | R5 | **Meriliikenne ennen ja nyt** | Liukusäädin vaihtaa ICOADS 1873:n harvat reitit nykypäivän AIS-tiheyteen. | ICOADS + Maailmanpankin laivatiheys | staattinen vertailu | helppo | rasteri | ★★★ | Nykyinen laivaliikenne peittää meret tiheänä verkkona, mutta tiheimmät reitit ovat samat kuin 1873: Englannin kanaali, Gibraltar, Suez ja Malakansalmi. | kohde: pelin laivamatkat | seuraava (data) |
| 3 | R7 | **Yön valot ennen ja nyt** (pari: Y5) | Pallo pimenee yöksi: nyt kaupungit loistavat, ja vuoden 1873 asetuksella palaa vain kaasuvalojen kaupunkeja. | Black Marble (GIBS), EOG VNL, Reba (kaupungit 1875) | staattinen + vertailu | helppo | rasteri | ★★ | Vuonna 1873 yö on pimeä lähes kaikkialla ja vain suurimmissa kaupungeissa palaa kaasuvalo, kun nykyään valoista voi piirtää mantereiden rannikot ja moottoritiet. | kohde: radiolinssin hämärä ja lennon yöosuus (sama Black Marble -pinta, Q4) | seuraava (data) |
| 4 | R1 | **Maailma palaa** | Viimeisen viikon palot hehkuvat pallolla, ja valitun kuukauden palot syttyvät ja sammuvat päivä kerrallaan. | FIRMS 7 pv (ei tunnusta), GIBS-palokerros | animoitu | keski | pisteet | ★ (Peshtigo 1871 ja Chicago 1871 pysäkkeinä) | Maapallolla palaa joka päivä tuhansia paloja, ja suurin osa niistä on Afrikan savanneilla ihmisten sytyttämiä peltojen ja laidunten polttoja. | kohde: Chicago (pysäkki 1871) | seuraava (data) |
| 4 | R2 | **Savun tie** | Palojen ja pölyn aerosolipilvet kulkevat mantereelta toiselle kolmen kuukauden ajan. | CAMS AOD (CC BY 4.0, tili), vaihtoehtona GIBS MODIS AOD | animoitu | vaikea | rasteri | ★ (Krakatau 1883: auringonlaskut punaisina ympäri maailman) | Savu ja aavikkopöly eivät tunne rajoja: Saharan pöly kulkee Atlantin yli Amazonille ja Karibialle, ja suurten palojen savu kiertää koko pallon. | avoin | seuraava (data) |
| 5 | R11 | **Myrskyjen radat** | Kaikki trooppiset myrskyt 1850-luvulta alkaen piirtyvät vuosi kerrallaan, ja voimakkuus näkyy värinä. | IBTrACS, HURDAT2 | animoitu | helppo | reitti | ★★★ (1873 Nova Scotian hurrikaani) | Trooppiset myrskyt syntyvät lämpimän meren yllä ja kaartavat Maan pyörimisen vuoksi, ja 170 vuoden radat näyttävät, missä ne iskevät useimmin: Karibialla, Filippiineillä ja Bengalinlahdella. | kohde: Halifax (hurrikaani 1873), Havanna, Manila (pelin kaupunkeja) | seuraava (data) |
| 6 | R12 | **Maa järisee** | Viimeisen 30 päivän järistykset sykkivät, ja historiasta nousevat Lissabon 1755 ja muut merkittävät. Pysäkit (F4): Lissabon 1755 · San Francisco 1906 · Messina 1908. | USGS ComCat, NCEI | reaaliaika + historia | helppo | pisteet | ★★ | Maanjäristykset piirtävät mannerlaattojen rajat näkyviin, sillä Tyynenmeren tulirengas syttyy joka kuukausi, ja Lissabonin 1755 kaltainen suurjäristys voi tuhota kaupungin minuuteissa. | kohde: Lissabon, Sisilia (Messina 1908), San Francisco (1906) | seuraava (data) — F4 Maanjäristykset ja kaupungit yhdistetty 24.9.2026 |
| 6 | R13 | **Tulen vuoret** | Merkittävät purkaukset 4 000 vuoden ajalta, ja purkauksen koko (VEI) näkyy renkaana. Pysäkit (F1): Thera · Vesuvius 79 · Laki 1783 · Tambora 1815 (vuosi ilman kesää) · Krakatau 1883. | NCEI Volcanoes, GIBS SO₂ | animoitu | helppo | pisteet | ★★ (Krakatau 1883 kymmenen vuotta matkan jälkeen) | Suurin purkaus ei ole aina tunnetuin: Tamboran purkaus 1815 viilentää koko maapallon ja tekee vuodesta 1816 vuoden ilman kesää, ja Krakataun 1883 tuhka värjää auringonlaskut ympäri maailman. | kohde: hetki Pompeji 79 · Sisilia (Etna astronautin kamerassa) | seuraava (data) — F1 Suuret tulivuorenpurkaukset yhdistetty 24.9.2026 |
| 7 | R16 | **Pellot valtaavat maan** | Viljelyksen leviäminen 10 000 eaa.→nyt, ja vuosi 1870 on merkkipaalu. | HYDE 3.3 | animoitu | keski | rasteri | ★★★ | Pelto ja laidun peittävät nykyään noin kolmanneksen maapallon maa-alasta, ja suurin osa raivauksesta on tapahtunut vasta 1700-luvun jälkeen. | avoin | seuraava (data) — HYDE 3.3 on NC, käytetään HYDE 3.2:ta (CC0) |
| 7 | R17 | **Ihmisiä pallolla** | Väestötiheys kasvaa ja keskittyy: 1870 (HYDE) → 1975–2030 (GHSL). | HYDE, GHSL | animoitu | keski | rasteri | ★★★ | Vuonna 1870 maapallolla asuu noin 1,3 miljardia ihmistä ja nyt yli kahdeksan miljardia, joista yli puolet kaupungeissa. | avoin | seuraava (data) — HYDE 3.2 (CC0), ei NC-lisenssistä 3.3:a |
| 7 | R18 | **Kaupungit kasvavat** (pari: Y10) | Maailman suurimmat kaupungit 3700 eaa.→2000 pylväinä, ja kärkikymmenikkö vaihtuu. | Reba ym., GHSL UCDB | animoitu | helppo | pisteet | ★★★ (vuoden 1875 kärkikaupungit isoisän reitillä) | Maailman suurimman kaupungin titteli vaeltaa Mesopotamiasta Roomaan, Kiinaan, Lontooseen ja Tokioon, ja isoisän aikaan suurin on Lontoo. | kohde: Lontoo, Pariisi, Peking (vuoden 1875 kärki) | seuraava (data) |
| 8 | R20 | **Kauppavirrat 1873** | Maiden väliset kauppavirrat valuvat nuolina, ja paksuus kertoo arvon (RICardo). Nykyvertailu tehdään BACIlla. | RICardo, BACI | animoitu + vertailu | keski | hiukkaset | ★★★ | Vuonna 1873 Britannia on maailmankaupan keskus, jonka kautta kulkevat puuvilla, vilja ja teollisuustuotteet, kun nykyään suurin viejä on Kiina. | kohde: Lontoo ja isoisän satamat · virtamoottorin datarajapinta (S1–S4) | seuraava (data) |
| 9 | R3 | **Isoisän sää** | Pelaaja valitsee päiväkirjan päivän, ja pallolle piirtyvät sen päivän matalapaineet ja tuulet vuonna 1873. | 20CRv3 | animoitu (päivä) | vaikea | hiukkaset | ★★★ | Vuoden 1873 sää voidaan laskea jälkikäteen laivojen ja asemien ilmanpainehavainnoista, joten päiväkirjan jokaiselle päivälle näkyy, millainen matalapaine isoisän laivaa keinutti. | kohde: isoisän päiväkirjan päivät | seuraava (data) |
| 9 | R9 | **Isoisän tähtitaivas** | Päiväkirjan yön taivas planeettoineen oikeasta paikasta nähtynä, ja Venuksen ylikulku 9.12.1874 omana pysäkkinään. | HYG, JPL Horizons, Stellarium-tähtikuviot, NASA Eclipse | animoitu (yö) | keski | pisteet | ★★★ | Tähtitaivas riippuu paikasta ja päivästä: eteläisellä pallonpuoliskolla isoisä näkee Etelän ristin mutta ei Pohjantähteä, ja Venuksen ylikulku 1874 on tilaisuus mitata Auringon etäisyys. | kohde: isoisän päiväkirjan yöt | seuraava (data) |
| 10 | R14 | **Lämpenevä meri** | Meren pintalämpö 1854→nyt: vuoden 1873 meri on vertailupohja, ja poikkeama värjää pallon. | ERSST v5 | animoitu | keski | rasteri | ★★★ | Meren pinta on lämmennyt 1850-luvulta lähes asteen, ja lämpeneminen näkyy lähes kaikilla merillä, kun vertailukohtana on mittauksiin perustuva vuoden 1873 meri. | avoin | seuraava (data) |
| 10 | R15 | **Ilmastovyöhykkeet liikkuvat** | Köppenin vyöhykkeet 1901–1930 → 1991–2020 → 2071–2099, jolloin Sahara ja tundra siirtyvät. | Köppen–Geiger (Beck 2023) | jaksot | helppo | rasteri | ★★ | Ilmastovyöhykkeet siirtyvät kohti napoja ja ylemmäs vuorille, jolloin tundra ja arktiset vyöhykkeet kutistuvat ja kuivat vyöhykkeet laajenevat. | avoin | seuraava (data) |

### Ideapankki

| # | Linssi | Mitä pelaaja näkee | Lähteet | Aikasarja | Vaikeus | Muoto | 1873 | Mitä opitaan | Pelikytkös | Tila |
|---|---|---|---|---|---|---|---|---|---|---|
| R6 | **Purjelaivojen tuulet** | 1750–1854 lokikirjojen reitit ja tuulihavainnot näyttävät, miksi laivat kiersivät Atlantin kaarena. | CLIWOC | animoitu | keski | reitti | ★★ | Purjelaivat eivät kulje suorinta tietä, sillä pasaatituulet vievät Euroopasta Brasilian rannikon kautta Hyväntoivonniemelle, ja lokikirjojen tuulihavainnot näyttävät syyn. | avoin | idea |
| R8 | **Näetkö Linnunradan?** (pari: Y3) | Valitun paikan taivas: tähtien määrä vähenee valosaasteen mukaan, ja vuoden 1873 taivas on täynnä tähtiä. | HYG, Deep Star Maps, EOG VNL (Falchin atlas vain luvalla) | staattinen | keski | pisteet | ★★ | Kolmasosa ihmiskunnasta ei enää näe Linnunrataa kotoaan valosaasteen takia, vaikka vuonna 1873 se näkyi useimmista kaupungeista. | avoin | idea |
| R10 | **Revontulet nyt** | Revontuliovaali elää napojen ympärillä reaaliajassa, ja vertailuna on suuri revontulimyrsky helmikuussa 1872. | NOAA OVATION | reaaliaika | helppo | rasteri | ★★ | Revontulet syntyvät, kun Auringon hiukkaset osuvat ilmakehään magneettinapojen ympärillä, ja helmikuun 1872 kaltaisessa suurmyrskyssä ne näkyvät Bombayssa asti. | kohde: Mumbai (revontulet 1872), Rovaniemi, Tromssa (pelin kaupunkeja) | idea |
| R19 | **Maailmantalouden painopiste** | Talouden painopiste vaeltaa Aasiasta Eurooppaan ja takaisin vuodesta 1 jaa. nykyhetkeen. | Maddison | animoitu | keski | pisteet | ★★★ | Talouden painopiste on ollut suurimman osan historiasta Aasiassa, siirtyy teollistumisen myötä kohti Pohjois-Atlanttia ja palaa 2000-luvulla takaisin itään. | avoin | idea |
| R21 | **Metsät katoavat** | Metsäkato 2001–2024 punaisena vuosi vuodelta. Pellot 1870 (HYDE) kertovat, mitä raivattiin ennen. | Hansen GFC, HYDE | animoitu | vaikea (datamäärä) | rasteri | ★★ | Satelliitit näkevät metsäkadon vuosi vuodelta, ja 2000-luvun suurin kato on Amazonilla, Indonesiassa, Kongon altaalla ja pohjoisissa havumetsissä palojen ja hakkuiden takia. | kohde: Manaus, Borneo, Kongo (pelin kaupunkeja) | idea — HYDE 3.2 (CC0), ei NC-lisenssistä 3.3:a |
| R22 | **Pisaran matka** | Pelaaja napauttaa maata, ja pisara virtaa jokia pitkin mereen, jolloin valuma-alue valaistuu. | HydroRIVERS, HydroBASINS | interaktiivinen | keski | reitti | ★★ (Niili, Kongo ja Mississippi isoisän tutkimusmatkoilla) | Jokainen maapallon kohta kuuluu jonkin joen valuma-alueeseen, ja Suomesta lähtevä pisara päätyy Itämereen, kun Kongon altaalta lähtevä kulkee Atlanttiin. | kohde: Viktoria Nyanza, Kongo, New Orleans (pelin kaupunkeja) | idea |
| R23 | **Kielten kirjo** | 8 000 kieltä pisteinä, joissa kielisuku on värinä ja uhanalaiset kielet himmenevät. | Glottolog, Grambank | staattinen | helppo | pisteet | ★★ (monet kielet olivat 1873 elinvoimaisia) | Maailmassa puhutaan noin 7 000 elävää kieltä, joista yli 800 pelkästään Papua-Uudessa-Guineassa, ja moni pieni kieli katoaa, kun sen viimeiset puhujat kuolevat. | avoin | idea |
| R24 | **Mitä maa kasvaa** (pari: F3) | Kahvin, teen, riisin ja perunan viljelyalueet, joiden alle maaperän pH ja ilmastovyöhyke valaisevat syyn. | MapSPAM, SoilGrids, Köppen | staattinen | keski | rasteri | ★★ (F3 kasvien matkat) | Kahvi, tee, riisi ja peruna kasvavat nykyään kaukana alkuperästään, ja maaperä ja ilmasto selittävät miksi: kahvi viihtyy päiväntasaajan vuoristoissa ja tee monsuunirinteillä. | avoin | idea |
| R25 | **Sähkö syttyy** | Voimalaitokset syttyvät avausvuosinaan: hiili, vesi, ydin, tuuli ja aurinko. Vuonna 1873 ei vielä yhtään. | Global Energy Monitor, GPPD, Ember | animoitu | keski | pisteet | ★★ | Ensimmäiset voimalat syttyvät 1880-luvulla, kuten Edisonin Pearl Street 1882, ja nykyään sähköä tuotetaan yhä eniten hiilellä, vaikka tuuli ja aurinko kasvavat nopeimmin. | kohde: hetki Menlo Park 1879 | idea |
| R26 | **Tuulet nyt** | Nullschool-tyyliset tuulihiukkaset huomisen ennusteesta, ja vertailuna isoisän 1873 tuulet samasta kuukaudesta. | ECMWF Open Data tai GFS, 20CRv3 | animoitu | vaikea | hiukkaset | ★★ | Tuulet kiertävät kummallakin pallonpuoliskolla kolmena vyöhykkeenä (pasaatit, länsituulet ja napatuulet), ja samat vyöhykkeet ohjasivat isoisän purjelaivoja 1873. | avoin | idea |
| R27 | **Ilma jota hengitämme** | Asemien PM2.5-pallot ja EDGAR-päästöhila kertovat, mistä saaste tulee. | OpenAQ, EDGAR | staattinen + kk | keski | pisteet | ★ (hiilisavu 1873 Lontoossa pysäkkinä) | Pienhiukkaset ovat ilmansaasteista suurin terveyshaitta, ja päästöhila näyttää niiden lähteet: liikenteen, teollisuuden, kodit ja palot, joista Lontoon hiilisavu 1873 oli varhainen muoto. | kohde: Lontoo 1873 (hiilisavu) | idea |
| R28 | **Eläinten matkat** (pari: Y4) | Kurkien, haikaroiden, gnujen ja merikilpikonnien GPS-jäljet liikkuvat vuodenkierrossa. Lajit (F2, U3): kurjet · haarapääskyt · gnut · valaat · monarkkiperhoset · lohet. | Movebank (CC0/CC BY), OBIS | animoitu | keski | reitti | ★ (F2) | GPS-pannat näyttävät eläinten matkojen pituuden: kurjet muuttavat Suomesta Afrikkaan asti, ja gnut kiertävät Serengetiä vuodenkierrossa sateiden perässä. | avoin | idea — F2 Eläinten muuttoreitit ja U3 Muuttolinnut yhdistetty 24.9.2026 |
| R29 | **Korallien helle** | Lämpöstressin viikot värjäävät riutat, ja korallien vaalenemisvuodet sykkivät. | Coral Reef Watch, Allen Coral Atlas | animoitu | keski | rasteri | ★ | Kun meri pysyy liian lämpimänä viikkoja, korallit hylkivät leviään ja vaalenevat, ja vaalenemisvuodet ovat yleistyneet 1980-luvulta lähtien. | kohde: Cairns (Iso valliriutta) | idea |
| R30 | **Jääkauden rannat** (pari: C7) | Merenpinta laskee 120 m, jolloin Beringia, Doggerland ja Sahul nousevat ja uppoavat uudelleen. | GEBCO/ETOPO, Spratt & Lisiecki | animoitu | helppo | rasteri | ★★ (C7:n tausta) | Jääkauden huipulla noin 20 000 vuotta sitten merenpinta oli noin 120 metriä nykyistä alempana, joten Aasiasta pääsi kävellen Amerikkaan ja Britanniasta Manner-Eurooppaan. | kohde: C7 Ihmisen matkan tausta | idea |
| R31 | **80 päivää → 80 tuntia** | Matka-ajan kartta Lontoosta: Bartholomew'n isokrooninen kartta 1914 (PD) rinnakkain nykyisten lentoyhteyksien kanssa. | Commons (PD), OurAirports, OpenFlights (2014) | staattinen vertailu | keski | rasteri | ★★★ (Fogg 1872 ja isoisä 1873) | Matka-aika Lontoosta maailman ääriin on lyhentynyt viikoista tunteihin: vuonna 1914 Australiaan meni yli kuukausi, nyt lento kestää alle vuorokauden. | kohde: Foggin reitti (C5) ja isoisän matka | idea |
| R32 | **Lentävä maapallo** | Yhden vuorokauden kaikki lennot valojuovina (adsb.lol), ja vertailuna Foggin laivareitti. | adsb.lol (ODbL) | animoitu (24 h) | vaikea | pisteet | ★★ | Taivaalla on yhtä aikaa noin 10 000 lentokonetta, ja reitit kaartavat pallolla isoympyröitä pitkin, joten New Yorkista Tokioon lennetään läheltä pohjoisnapaa. | kohde: Foggin laivareitti vertailuna | idea |
| R33 | **Sähkeet 1873 ja nyt** (pari: U1) | Vuoden 1873 kaapelit (digitoitu PD-kartoista) välähtävät, ja nykyinen merikaapeliverkko häivytetään päälle. | Commons/LoC-kaapelikartat, OSM-merikaapelit | vertailu | keski | reitti | ★★★ (pelin sähkeet) | Vuoden 1873 kaapeliverkko kulkee monin paikoin samoja merireittejä kuin nykyinen merikaapeliverkko, joka kuljettaa valtaosan mannerten välisestä internetliikenteestä. | sähke: pelin sähkeet | idea |
| R34 | **Elinajan kartta** | Elinajanodote maittain 1800→nyt: vuonna 1873 kaikkialla alle 45 vuotta. | Gapminder, UN WPP | animoitu | helppo | alueet | ★★★ | Maailman keskimääräinen elinajanodote on noussut 1800-luvun noin 30 vuodesta yli 70 vuoteen, ja suurin syy on lapsikuolleisuuden romahdus. | avoin | idea |

*Yhdistetty tänne: F1 → R13, F4 → R12, F2 ja U3 → R28. R35 Suomen sää on yhdistetty D7:ään Suomi isoisän aikaan (osa 1).*

# Osa 5: Esitysmoottori — natiivi 3D: sali, pallon kasvu, paikkarekonstruktio

Raamattu (TAIDEMUSEO-LINSSI ja ESITYSMOOTTORI, omistaja 24.9.2026): museo rakennetaan yhdeksi
modulaariseksi esitysmoottoriksi, jonka päälle tulevat lavat SALI (aikakausisiivet ja kaupunkien
omat museot) ja PALLO (kaupungin kasvu vuosisatojen yli 3D-pallon päällä). Paikkarekonstruktiot E8
ja E9 käyttävät samaa moottoria. Vain natiivissa.

## Moottorikortti

| kohta | sisältö |
|---|---|
| moottori | Esitysmoottori (natiivi 3D: sali, pallon kasvu, paikkarekonstruktio). Aikajana, kamerakoreografia, kertoja aikaleimasynkalla ja ilmaan piirtyvät merkinnät; lavat SALI (museosalit), PALLO (kaupungin kasvu pallolla) ja paikka (rekonstruktio Cesiumin maastossa). |
| mitä on rakennettu | Ei vielä. Suunnitelma on hyväksytty (Natiiviseppä tarkisti luvut 6–7), ja toteutus alkaa Fablen käskystä. |
| pilotti | E7 Taidemuseo-linssi: renessanssisali Firenze–Rooma–Venetsia (28 NGA:n CC0-maalausta ja 5 SMK:n valosta) |
| aineistoputki | Museoiden avoimet PD/CC0-aineistot (NGA, Met, AIC, Cleveland, Rijksmuseum, Paris Musées) ja Commons PD; kaupungin kasvuun Reba ym. (CC BY 4.0), HYDE 3.2 (CC0), GHSL, OSM (ODbL) ja PD-kartat. |
| web vai natiivi | vain natiivi (Unityn omat paketit: Cinemachine, Splines, Timeline, TextMeshPro, Addressables, glTFast, URP) |
| mikä puuttuu | Koko moottori. Järjestys: pariteetti ja elokuvalento → renessanssisali → Rooman kasvu → monistus. |
| tekninen viite | Raamattu, TAIDEMUSEO-LINSSI ja ESITYSMOOTTORI; docs/raportit/linssi-taidemuseo-suunnitelma-20260924.md (liitteet haarassa linssiseppa-tyo-20260923) |

## E. Taide ja kulttuuri — esitysmoottorin linssit

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| E7 | Taidemuseo-linssi (natiivi, 3D-salit) (pari: E1) | maailma | antiikki–moderni | siivet aikakausittain: antiikki · renessanssi (pilotti: Firenze–Rooma–Venetsia) · barokki · romantiikka · impressionismi · moderni; opastettu kamerakierros + kertoja, ilmaan piirtyvät vuosiluvut, suuntaukset, omakuvat ja karttapiirrokset; ovet kaupunkilehdistä (Louvre, Uffizi, Prado, Rijksmuseum) | sali | ★★ | Taidehistoria etenee saleittain aikakausi kerrallaan ja jokainen teos kytkeytyy syntykaupunkiinsa, joten renessanssisalissa näkee, miten perspektiivi syntyy Firenzessä ja öljyväri yleistyy Venetsiassa. | lehti: ovet kaupunkilehdistä (Louvre, Uffizi, Prado, Rijksmuseum) · kohde: hetki Sikstuksen kappeli 1510 | museoiden PD/CC0-aineistot (NGA, Met, AIC, Cleveland, Rijksmuseum, Paris Musées) ja Commons PD; Italian valtion museot pois | seuraava (esitys) — omistaja 24.9.2026; suunnitelma linssi-taidemuseo-suunnitelma-20260924.md, toteutus pariteetin ja elokuvalennon jälkeen; teokset vain PD/CC0 |
| E8 | Ishtarin portti paikallaan (natiivi, paikkarekonstruktio) | Babylon | 575 eaa | portti + Prosessiotie + muuri + palmulehdot + Eufrat Cesiumin maastossa; kamera ajaa Prosessiotietä; tekstuurit Commonsin PD-kuvista (Pergamon) | paikka | ★ | Babylonin pääportti rakennettiin noin 575 eaa. sinisistä lasitetuista tiilistä Nebukadnessar II:n aikana, ja sen kappaleet ovat nykyään Berliinin Pergamonmuseossa. | kohde: Bagdad (Babylonin rauniot lähellä), Berliini (Pergamonmuseo) | tekstuurit Commonsin PD-kuvista (Pergamon); maasto Cesium | idea — omistaja 24.9.2026; esitysmoottorin paikka-lava, 1–2 erää museopilotin jälkeen |
| E9 | Konstantinopoli kulta-aikanaan (natiivi, dioraama) | Konstantinopoli | n. 1000 | Hagia Sofia · Hippodromi · Suuri palatsi · Theodosiuksen muurit · Kultaisen sarven ketju tarkkoina, muu kaupunki proseduraalisena massana, hidas orbit illan valossa | paikka | ★ | Noin vuonna 1000 Konstantinopoli on Euroopan suurin ja rikkain kaupunki, ja Hagia Sofia on ollut jo lähes 500 vuotta maailman suurin kirkko. | kohde: Istanbul · hetki Konstantinopoli 1453 | PD-kuvat ja -kartat Commons; ei avoimia valmiita malleja | idea — omistaja 24.9.2026; 3–4 erää, ei katutasoa; ei avoimia valmiita malleja |
| E10 | Rooman kasvu pallolla | Rooma | n. 750 eaa–2020 | n. 750 eaa. Palatinus · n. 378 eaa. Serviuksen muuri · n. 200 jaa. huippu (1,2 milj.) · 1377 pohja (17 000) · 1748 Nolli · 1871 pääkaupunki · 2020 | pallo | ★★ | Rooma kasvaa noin vuonna 200 yli miljoonan asukkaan kaupungiksi, kutistuu keskiajalla vuoteen 1377 mennessä noin 17 000 asukkaaseen ja nousee uudelleen Italian pääkaupungiksi 1871. | kohde: Rooma (pelin kaupunki) | Reba ym. (CC BY 4.0), HYDE 3.2 (CC0), GHSL (CC BY 4.0), OSM Aurelianuksen muuri (ODbL), Nolli 1748 (PD) | seuraava (esitys) — lisätty 24.9.2026; Raamattu ESITYSMOOTTORI, lava PALLO; järjestys renessanssisalin jälkeen; aikaleikkeet suunnitelman luvusta 2B |

# Osa 6: Pohjakartat (eivät linssejä)

Karttasepän lista: pinnat, joita peli ja linssit käyttävät pohjanaan. Satelliittipinta on natiivin
aloituslennon pinta, yövalot tulevat radiolinssin hämärään, datalinssiin R7 ja lennon yöosuuteen, ja
atlaslehti näyttää isoisän ajan kartan sellaisenaan. Pohjakartalla ei ole kelloa eikä pysäkkejä,
mutta sen rivi on samoin kentin kuin linsseillä.

## Moottorikortti

| kohta | sisältö |
|---|---|
| moottori | Pohjakartat (eivät linssejä). Pinnat, joita peli ja linssit käyttävät pohjanaan: vanha atlaskartta, satelliittikuva ja yön valot laattapyramidina pallolla. |
| mitä on rakennettu | Karttasepän laattaputki (pohjapoltot ja satelliittiputki); satelliittipinta on ämpärissä 24.9.2026. |
| pilotti | Q3 Satelliittipinta (natiivin lennon pinta) |
| aineistoputki | Karttasepän poltot Macilla → ämpäri julisteet/pallo/<sarja>/<versio>/ ja laatat.json; lähteet NAS:iin. |
| web vai natiivi | natiivi (webissä yökartta-kuva js/packs/linssi-yokartta.js) |
| mikä puuttuu | Yövalojen poltto (25.9.2026) ja atlaslehden vedos omistajalle. |
| tekninen viite | satelliitti-lennon-pinta-20260924.md (haara karttaseppa-satelliitti); Raamattu, RADIOLINSSIN UUDISTUS (YÖN VALOT) |

## Q. Retro- ja pohjakarttalinssit (lisätty 21.9.2026, omistajan linjaus)

| id | linssi | alue | kaari | pysäkit | muoto | 1873 | mitä opitaan | pelikytkös | aineisto | tila |
|---|---|---|---|---|---|---|---|---|---|---|
| Q2 | Atlaslehti | maailma | 1875 | Stieler 1875 -atlaksen PD-skanni georeferoituna pallon päälle | pinta | ★★★ | Isoisän aikainen Stielerin atlas pallon pinnalla näyttää, miten 1870-luvun kartografi piirsi maailman: tarkat rannikot mutta tyhjiä sisämaita Afrikassa ja arktisilla alueilla. | aarre: Amsterdam (rengas 1) | Stieler 1875 (PD, Commons/LoC), georeferointi Allmaps | jonossa — omistaja haluaa vedoksen ensin (Karttaseppä) |
| Q3 | Satelliittipinta (lennon pinta) | maailma | 2004 ja 2016 (kuvausvuodet) | Blue Marble NG merineen koko pallolle · Sentinel-2 72 kaupungin ympärille | pinta | ★ | Satelliittikuvasta näkee maapallon oikeat värit, aavikot, sademetsät, jäätiköt ja kaupungit, ja lennon aikana näkee, miten maisema vaihtuu leveyspiiriltä toiselle. | kohde: natiivin elokuvallinen aloituslento (lennon pinta) | NASA Blue Marble NG 2004 (PD) + EOX Sentinel-2 cloudless 2016 (CC BY 4.0) | valmis — ämpärissä 24.9.2026 (julisteet/pallo/satelliitti/2026-09-24/, bmng-bathy + s2-alkup); Karttasepän raportti satelliitti-lennon-pinta-20260924.md (haara karttaseppa-satelliitti) |
| Q4 | Yövalot (Black Marble) | maailma | 2016 (kuvausvuosi) | kaupunkien valot hehkuvana kerroksena Z0–Z6 | pinta | ★ | Yön satelliittikuva näyttää, missä ihmiset asuvat ja mihin sähkö riittää: Niilin laakso, Japanin rannikko ja Euroopan kaupunkiverkko loistavat, kun suuri osa Afrikan ja Amazonin sisämaasta on pimeää. | kohde: radiolinssin hämärä (build 12), R7 Yön valot, lennon yöosuus | NASA Black Marble 2016 (PD), attribuutio "NASA Earth Observatory (Black Marble)" | jonossa — Fable hyväksyi 24.9.2026, poltto 25.9.2026 → julisteet/pallo/yovalot/2026-09-25/; webin yökartta-kuva js/packs/linssi-yokartta.js (rekisterin yokartta-rivi kommentoitu) |

- **Q2 Atlaslehti** — rasterinen linssi: Stieler 1875 -atlaksen PD-skanni
  georeferoituna pallon päälle, isoisän aikainen kartta sellaisenaan.
  Tila: omistaja haluaa vedoksen ensin (Karttaseppä).

# Yhdistetyt

Pienempi linssi sulautui isompaan 24.9.2026 (omistajan päätös klo 22.1x). Vanhan id:n rivi poistui
taulusta, eikä id:tä käytetä uudelleen.

| vanha id | uusi id | miksi |
|---|---|---|
| F2 | R28 | sama aihe (eläinten vuodenkierron matkat); R28:lla on aito GPS-aineisto (Movebank), F2:n lajit sen pysäkeiksi |
| U3 | R28 | muuttolinnut ovat F2:n ja R28:n osajoukko; lajit R28:n pysäkeiksi |
| T2 | A6 | sama aihe; pyhiinvaellusten vuodenkierto on A6:n reittilinssin tila, samat neljä paikkaa ovat jo A6:ssa |
| G1 | B3 | rokotukset ja Lontoon kolera ovat jo B3:n pysäkkejä; espanjantauti 1918 lisätty B3:een |
| G1 | P2 | musta surma on P2:n aihe (Messina 1347 on jo sen pysäkki) |
| D6 | S1 | siirtomaat ovat S1:n aihe; VOC Amsterdam 1602 ja Berliinin konferenssi 1884 lisätty S1:n pysäkeiksi |
| D6 | O2 | Kalkutta ja Kap kuuluvat Britannian imperiumin aluelinssiin |
| H6 | S3 | maustereitit ovat S3:n virta; Malabar, Lissabon ja Batavia lisätty, kaari alkaa vuodesta 1000 |
| C4 | U2 | höyrylaivat, kanavat ja postilinjat ovat samaa verkkoa; C4:n pysäkit lisätty ja U2 nimetty uudelleen (Höyrylaivat, kanavat ja postilinjat) |
| G6 | B4 | posti ja sähkösanoma ovat B4:n viestintäosa; Penny Black 1840, Morse Washington 1844 ja Reuters Aachen lisätty |
| F1 | R13 | tulivuoret datana (NCEI); F1:n viisi purkausta R13:n pysäkeiksi |
| F4 | R12 | maanjäristykset datana (NCEI, USGS); F4:n kolme järistystä R12:n pysäkeiksi |
| R35 | D7 | Suomen sääsarja 1844→ on uuden Suomi-linssin aineistoa |

# Järjestys

Datalinssien (R) järjestys on osassa R; ne kulkevat omalla moottorillaan rinnakkain.

1. Keksinnöt Euroopassa hiotaan valmiiksi (pelillinen ovi, kuvat kuvaputkelta, musiikki kuunneltu).
2. A1 Suuret uskonnot syntyvät + A4 Uskonpuhdistus (omistajan linjaus; kuvat H4-tilauksena).
3. B2, B3, C1, C2 — pysäkeistä iso osa on jo pelin hetkiä tai kohteita.
4. C5 Maapallon ympäri 80 päivässä — pelin oma tarina, tarvitsee maailmankartan.
5. Maanosat: H1 Kiinan keksinnöt, H3 Japani, I3 Osmanit, J1 Kultavaltakunnat, J4 Afrikan tutkimusmatkat, K1 Mesoamerikka ja Andit, K3 Yhdysvallat, L2 Cook — järjestys sen mukaan, mille laudalle peli laajenee seuraavaksi.
6. Aluelinssit (toinen moottori), omistajan päätös 2.9.2026 ilta: M1 Kiinan dynastiat → N1 Napoleon → N2 ensimmäinen maailmansota → M2 Rooma → N3 toinen maailmansota (sävy 13+: rintamat ja rauhat). Aloitus, kun aikajanamoottori on hiottu; pohjakartan ja rajojen aineistotyö ensin.
7. Loput ideasta seuraavaksi omistajan päätöksellä.

Pilotit ovat omistajan päätös 24.9.2026: aluemoottorin pilotti on M1 Kiinan dynastiat ja
virtamoottorin S1 Siirtomaat.

Datalinssit (osa 4) ja esitysmoottori (osa 5) kulkevat omilla moottoreillaan tämän järjestyksen
rinnalla: datalinssien järjestys on osan 4 taulussa Järjestyksessä, ja esitysmoottori etenee
Raamatun mukaan pariteetti ja elokuvalento → renessanssisali (E7) → Rooman kasvu (E10) → monistus.
