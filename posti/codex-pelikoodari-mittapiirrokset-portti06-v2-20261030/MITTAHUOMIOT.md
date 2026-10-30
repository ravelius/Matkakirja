# Meridiaaniportti 06 — v2 mittahuomiot

30.10.2026. Korjaustilaukset #1307–1308. Tämä versio korvaa #1299–1300:n omistajakortille menevänä ehdokkaana. V1-tiedostot ja niiden toimituskuitti säilyvät historiassa. Tämä korjaus ei itsessään ole vastaanottajan tai omistajan hyväksyntä.

## Kehys

Pohja on 1830 × 1640 px, 8 px/m, marginaalit 70/120 px, x −105…105 ja z −492…−352 m. Eteläjulkisivu on 2680 × 1040 px, 12 px/m, marginaalit 80/120 px, x −105…105 ja y −3…42 m. Vain alamarginaali on kasvanut. Muunnokset säilyvät: pohja `u=910+8x, v=−2696−8z`; julkisivu `u=1340+12x, v=624−12y`. Lähteen 2,03° akselikiertoa ei tehdä uudelleen. Ruudukko on 1 m / 10 m.

## Uudet kuvamittaukset [K]

K tarkoittaa tilaajan toimittamaa valokuvaan perustuvaa mittausta, ei paikan päällä tehtyä mittausta. Aukkojen ilmoitettu tarkkuus on noin ±0,3 m ja kerrosten ±0,7 m. K-mitat merkitään vihreällä. Niitä ei esitetä senttimetritarkoiksi todellisuuden mittauksiksi, vaikka vektorikoordinaatit toistavat annetut arvot täsmällisesti.

| Kohde | V2-arvo | Lähde / huomio |
|---|---|---|
| Keskiaukko | 5,4 × 5,4 m; x −2,7…2,7 | K |
| Keskiaukon kultainen otsapalkki | leveys 8,6 m; yläreuna 6,2 m | K |
| Länsisivuaukko | 5,1 × 4,6 m; x −16,85…−11,75 | K; keski x −14,3 |
| Itäsivuaukko | 5,1 × 4,6 m; x 11,75…16,85 | K; keski x 14,3; suljettu ovilla |
| Pylväskerros | y 13,0…19,7 m | alapää A, yläpää K |
| Alaräystään palkkivyö | y 19,7…20,9 m | K |
| Alakatto | y 20,9…24,7 m | K |
| Yläräystään palkkivyö | y 24,7…27,9 m | K |
| Yläkatto harjaan | y 27,9…35,6 m | K |
| Harjakoristeen huippu | y 37,95 m | [2] |

Eteläaukkojen ulkorajat ovat suorakulmaiset. Holvi on aukon sisäinen syvyys-/muotokaavio, ei ulkorajan muuttaminen kaarevaksi. Otsapalkin ja sisäholvin koristejako eivät lisää uusia rakennusmittoja. Itäisen sivuaukon ovet täyttävät annetun aukon. Pohjapiirros näyttää eteläaukkojen leveydet samoissa x-paikoissa; tuntemattomia tunnelisyvyyksiä tai viiden pohjoisen aukon paikkoja ei keksitä.

## Jäljelle jäävät arviot ja lähde-erot

- Harmaa sokkeli y 0…3,0 m sekä marmorikaide y 12…13 m pysyvät A-arvioina. Pylvään alapää 13,0 m on A. Sokkeli on mittauskuvassa väkijoukon takana eikä sitä ole tällä kuvalla varmennettu.
- Kulmapaviljonkien huippu 32,5 m, kattokoko 13,8 m ja sijainnit x ±51,5 sekä z −380,3 / −466,9 m ovat A. Perspektiivissä eri syvyydellä olevien paviljonkien korkeutta ei johdeta päälinnan valokuvamittakaavasta.
- Päälinnan 60,05 × 25,00 m koko [1], jalustan 12,00 m korkeus [1] ja 126,90 m leveys [3] säilyvät. Vaihtoehtoinen jalustan 12,9 m [3] ei korvaa tilauksen ensisijaista 12,00 m arvoa. OSM:n 125,6 m leveys poikkeaa mittausartikkelin 126,9 m leveydestä.
- Jalustan z-rajat antavat 107,2 m kokonaispituuden [4], kun [3] ilmoittaa 114,9 m. Mahdollinen pohjoisluiskien mukaan laskeminen on lähteen selitysehdotus, ei tässä varmennettu ratkaisu.
- Päälinnan nimellinen räystäsala 65,4 × 30,3 m on A. Julkisivun eritasoiset katot seuraavat uuden mittapohjan siluettia; yhden nimellisen räystäsmitan avulla ei korvata PNG:n erillisiä kattomuotoja. PNG-jäljennös sisältää rasterin pyöristyksen. K-korkeusrajojen mahdolliset rasterierot eritellään tarkistusaineistossa.
- Eteläisten paviljonkien kattoraja ulottuu pohjan lähtökoordinaateissa 0,6 m jalustan eteläpuolelle. Lähteen tilanne säilytetään. Paviljongin 13,8 m nimetään JSON:ssa kattokooksi, vaikka PNG:n vanha yhteisselite viittaa seinälinjaan; tuntematonta erillistä seinäpohjaa ei lisätä.
- Kello- ja rumpupaviljonkien koko ja tarkka paikka puuttuvat. Selitteen katkoviivasymbolit eivät ole karttakoordinaatteja. Siipien sisäkulmien pohjoisille lisäaukoille ei keksitä mittoja.
- Nanjingin portti [N] on vain vertailukohde. Sen 6×8 m tai 5×7 m aukkomittoja ei ole siirretty Pekingin piirrokseen.

## Rasteripohjan tarkkuus ja peittyneet kohdat

Julkisivun kattosiluetit on jäljitetty uudesta v2-mittapohjasta. Rasterirajat vastaavat esimerkiksi pylvään yläreunassa 19,6667 m, alapalkin yläreunassa 20,8333 m, alakaton yläreunassa 24,6667 m, yläpalkin yläreunassa 27,8333 m ja pääharjalla 35,5833 m. Nimelliset K-arvot ovat vastaavasti 19,7 / 20,9 / 24,7 / 27,9 / 35,6 m. Ylin ornamenttipikseli vastaa 38,0 m, kun nimellismitta on 37,95 m. Nämä enintään yhden rasteripikselin erot on säilytetty päällekkäisvertailua varten; 12 px/m tarkoittaa 0,0833 m pikseliä kohden. Aukot ja otsapalkki on piirretty tarkkoihin K-vektorikoordinaatteihin.

Alakaton maalattu leveys on noin 68,5 m ja yläkaton noin 64,5 m; ne eivät ole sama asia kuin yhden räystäsalan nimellinen 65,4 m leveys. Oikean paviljongin mittalapun alle jääviä osia on palautettu ehjän vasemman vastineen avulla 1236 px siirrolla. Näkyvät galleriaräystäät on luettu omilta puoliltaan. Sivumuurin 10 m korkeus on rasterin A-arvio. Koristeiden viivat eivät ole uusia mittaustuloksia.

## Kuvalähde ja tekijätieto

**BrokenSphere, “Meridian Gate center.JPG”, Wikimedia Commons, CC BY-SA 3.0.** Lähdesivu: <https://commons.wikimedia.org/wiki/File:Meridian_Gate_center.JPG>. Lisenssi: <https://creativecommons.org/licenses/by-sa/3.0/>. Tilaajan liittämä alkuperäinen valokuva ja pikseliviivaimella varustettu rajaus on säilytetty vastaanotetussa lähdepaketissa. Piirroksen aukkojen ulkonäössä ja K-mittauksissa on käytetty tätä kuvaa; viivapiirros ja merkinnät on tehty uudelleen. Valokuvaa ei ole upotettu SVG:hen.

Lähteen K-selite mainitsee tarkistuksena myös BrokenSpheren “Meridian Gate, Forbidden City center.JPG”, CC BY 3.0. Tätä toista alkuperäiskuvaa ei ollut liitteenä eikä sitä väitetä tässä työssä erikseen tarkastetuksi. K-arvot on vastaanotettu tilaajan mittauksina.

Muut lähteet ovat vastaanotetun `portti06-mitat.json`-tiedoston [1]–[5]: Palatsimuseo, Zhihu, Chongqing Science & Technology News, OpenStreetMap ja Wikipedia zh. OSM: © OpenStreetMap contributors, ODbL 1.0. Tiilirivit, palkkikoristeet, kaiteen jako ja ovien yksityiskohdat ovat kaaviomaisia ja leikattu kyseisten rajojen sisään.

PK:n päällekkäisvertailu, PT:n arvio, omistajan KK-korttihyväksyntä, 3D-mallinnus, pelin runtime-kytkentä ja julkaisu ovat erillisiä vaiheita. Tämä toimitus sisältää 2D-piirrokset ja niiden tarkistusaineiston.
