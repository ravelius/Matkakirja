# Erikoismalli: Kronborg (speksi 27.9.2026, Mallinseppä)

*Pohja docs/raportit/erikoismalli-speksi-pohja.md. OMISTAJA HYVÄKSYI 27.9.2026 (erä 5, Fablen kautta; ehdotus
era5-ehdotus-20260927.md kohta 1): Juutinrauman tulli. Tässä on vain hyväksytty idea, B:tä ei ole.*

## 0. ELÄMÄNIDEA (hyväksytty)

- **Kolme riviä:** Kronborg on renessanssilinna ja linnoitus Helsingørissä Juutinrauman kapeimmassa kohdassa, jossa salmi
  on noin 4 km leveä. Se on UNESCOn maailmanperintökohde (2000) ja Shakespearen Hamletin Elsinore (en-Wikipedia
  "Kronborg"). Juutinrauman tulli otettiin käyttöön 1429 ja lakkautettiin 1857. Kaikkien vieraiden laivojen piti
  pysähtyä Helsingøriin maksamaan tulli, ja jos laiva ei pysähtynyt, Helsingørin ja Helsingborgin tykit saattoivat
  avata tulen (en-Wikipedia "Sound Dues"). Nykyään linnan vierestä lähtee Helsingborgin lautta noin 70 kertaa päivässä
  (en-Wikipedia "HH Ferry route").
- **Perusliike:** Helsingør–Helsingborg-lautta lähtee linnan viereisestä satamasta salmelle ja palaa. Se kääntyy
  takaisin mallin jalanjäljellä, eikä salmen vastarantaa mallinneta. Joskus salmen ohi lipuu purjealus. Tauko, suunta ja
  vauhti vaihtelevat siemenestä.
- **Harvinainen (noin 1/10 purjealuksen ohituksista): tulli.** Purjealus yrittää ohi pysähtymättä. Bastionilta
  tuprahtaa tykinsavu, ja aluksen keulan eteen nousee roiske. Alus kääntyy tuuleen, jolloin purjeet lepattavat, ja pieni
  tullivene soutaa sen luo ja takaisin (noin 8 s). Kapteenit asioivat Helsingørin tullikamarissa (en-Wikipedia
  "Skibsklarerergaarden"), joten soutuvene on tyylitelty kuva tullin maksusta. Tervehdysammuntoja tai muita
  tarkistamattomia tapoja ei väitetä.
- **Reaktio:** lähestyminen lähettää laiturissa odottavan lautan heti. Napautus käynnistää harvinaisen tapahtuman heti
  (enintään kerran 20 s:ssa): päivällä tullin ja yöllä haamun.
- **Yöllä:** ikkunat, Trompetertårnetin lyhty ja koillistornin majakka hehkuvat. Majakka on todellinen: Kronborg Fyr on
  linnan koillistornissa 34 m merenpinnasta, ja se sytytettiin ensimmäisen kerran 1772 (da-Wikipedia "Kronborg Fyr").
  Yön harvinainen tapahtuma on Hamletin isän haamu, joka kulkee hitaasti vallilla linnan edessä. Näytelmän avauskohtaus
  sijoittuu linnan edustan vallille ("SCENE I. Elsinore. A platform before the castle.", Hamlet 1.1, MIT Shakespeare
  -laitos), ja haamu on kuningas täydessä haarniskassa (en-Wikipedia "Ghost (Hamlet)"). Haamu on paperinvalkoinen
  hahmo ilman bloomia. Purjealukset eivät purjehdi yöllä, mutta lautta kulkee valoineen.
- **Laatukynnys:** vihreäkattoinen neliölinna, keskellä korkea neulatorni ja tähtilinnake vallihautoineen tunnistuvat
  sekunnissa. Valkoinen lautta, joka lähtee ja palaa, on koko ajan elossa, ja tullin tykinsavu ja lepattavat purjeet
  hymyilyttävät. Kaikki liike pysyy mallin jalanjäljellä. Lautta on nykyaikaa (AIKA sallii).

## 1. Tunniste ja paikka
- `kohde:kronborg`, avain `kronborg`. Tanska (DNK), 56,039 N 12,623 E (en-Wikipedia "Kronborg": 56,0386 N
  12,6219 E), taso 1 (historia, js/packs/maastokohteet-dnk.js).

## 2. Viitekuvat (Commons, lisenssi ja tekijä tarkistettu Commonsin API:sta 27.9.)

| Tiedosto | Näkymä | Lisenssi ja tekijä |
|---|---|---|
| Kronborg flygfoto 2, 2021.jpg | ilmasta etelästä (mallin suunta): eteläsiipi, Telegraftårnet vasemmalla, Kakkelborg oikealla, Trompetertårnet keskellä | CC0, David Castor |
| Kronborg flygfoto 1, 2021.jpg | ilmasta lounaasta: vallihauta, tiilinen luiska, bastionit ja linna | CC0, David Castor |
| Kronborg-Drone-001-6 (28619910290).jpg | lähes ylhäältä luoteesta: tähtilinnake, vallihauta ja sisäpiha | CC BY 2.0, CucombreLibre |
| Kronborg-Drone-001-14 (28619909590).jpg | koillisesta: pohjoissiipi, Lippubastioni ja lautta salmella | CC BY 2.0, CucombreLibre |
| Kronborg fra havet.jpg | mereltä etelästä (lautan näkymä): tornien järjestys ja korkeussuhteet | CC BY-SA 4.0, TEkman73 |
| Kronborg - Schlossplan.jpg | opastetaulun pohjapiirros: tornien nimet ja paikat, vallihauta, Kruunuvarustus | CC BY-SA 3.0, Wolfgang Sauber |
| Map of Kronborg.tif | linnoituksen pohjapiirros noin 1765 | PD, tuntematon tekijä |
| Constantin Hansen - Trompetertårnets spir, Kronborg, Studie - 1834.jpeg | Trompetertårnetin kupariset sipulit ja kaksi avointa lyhtyä | PD, Constantin Hansen |
| Carl Olsen - Skibe på sundet syd for Kronborg - 1858.png | purjealuksia salmella Kronborgin eteläpuolella | PD, Carl Olsen |

- Kuvat ovat vain viitteitä. Malli on oma (CC0), eikä kuvista kopioida pintoja eikä tekstuureja. Mitat ja paikat on
  otettu myös OpenStreetMapista (ODbL, © OpenStreetMapin tekijät) vain viitteeksi.

## 3. Siluetti ja tunnusmerkit (tärkein ensin)
1. Neliön muotoinen nelisiipinen linna: vaalea hiekkakivi, jyrkät kuparinvihreät katot yhtenä kehänä ja keskellä vaalea
   sisäpiha. Eteläsiipi on kameraa kohti, ja sen katolla on kolme isoa hiekkakivipäätyä.
2. Tornien kruunu. Trompetertårnet nousee sisäpihan puolelta eteläsiiven keskeltä ja on mallin korkein kohta: vihreä
   sipuli, avoin lyhty, pienempi sipuli ja lyhty sekä neula. Kulmissa ovat luoteessa Kongens tårnin korkea kuparikypärä,
   koillisessa Dronningens tårnin majakkalyhty ja tähtikruunuinen kupoli, kaakossa Kakkelborgin kivikupoli ja lounaassa
   massiivinen tasakattoinen Telegraftårnet.
3. Tähden muotoinen päävalli, jossa on neljä kärkibastionia. Vallin päällä on ruohoa ja sivuilla tiilinen luiska, ja
   maan puolella sitä kiertää vallihauta.
4. Juutinrauma kapeana kaistana edessä. Siellä kulkevat valkoinen lautta ja purjealukset, ja lautan laituri on
   vasemmalla.
- **Pelikoko 40 pt ja 33 pt (kallistus 30–55°):** tunnistus tulee vihreäkattoisesta neliöstä, jonka keskellä on
  korkea vihreä neula ja kulmissa pienempiä torneja, sekä vihreästä tähdestä, jota sininen vallihauta kiertää.
  Ylhäältä luetaan vihreä kattokehä ja vaalea piha, neljä kärkeä ja edessä valkoinen lautta. Tanska on pieni maa, joten
  muodot pidetään isoina ja yksinkertaisina, jotta malli luetaan vielä 33 pt:ssä.
- **Pois jätetään:** Kruunuvarustuksen rakennukset ja ravelinit, Kulturværftet, M/S Museet for Søfart, kaupunki ja
  venesatama, pienet kattoikkunat (125 kpl), porttipiha, portit ja sillat (vain lähitasossa) sekä yksittäiset ikkunat
  paitsi eteläjulkisivun rivi.

## 4. Mitat ja koko
- Linna on noin 80 × 80 m, ja siinä on neljä toisiinsa liittyvää kolmikerroksista siipeä (Trap Danmark, "Kronborg –
  Slots- og Kulturstyrelsen"). OpenStreetMapissa ulkoreunat tornien kanssa ovat 87 × 88 m ja sisäpiha 60 × 55 m.
  Siivet ovat länsi 18 m, etelä noin 20 m, pohjoinen 13 m ja itä vain 9 m. Itäsiipi on muita kapeampi ja matalampi (Trap).
- Keskiaikaisen Krogenin kehämuuri oli 80 m:n sivuinen ja 14–15 m korkea, ja kanuunatorni (nyk. Telegraftårnet) on
  15,8 m:n neliö (lex.dk "Kronborg"). Trompetertårnet on "godt 60 meter" ja valmistui 1575–1577 (kum.dk, uutinen
  Trompetertårnetin korjauksesta). Majakka on 34 m merenpinnasta (da-Wikipedia). Tanssisali on 62 × 12 m (en-Wikipedia).
- Muiden tornien korkeudet on arvioitu kuvasta Kronborg fra havet suhteessa Trompetertårnetiin (1,0): kattojen harja
  noin 0,4, Telegraftårnetin tasakatto noin 0,4, Kongens tårn noin 0,7 ja Dronningens tårn ja Kakkelborg noin 0,55.
  Tarkat metrit ovat AVOIN.
- Päävallin sisäreuna eli vallihaudan sisäreuna on OpenStreetMapissa noin 65–90 m linnan keskeltä. Juutinrauma on
  4 km leveä (en-Wikipedia "Kronborg").
- **Yksikkö:** 1,0 ≈ 300 m. Linna on 0,27 × 0,27 ja tähtivalli todellisessa mittakaavassa (kärjet noin 0,27 ja
  kurtiinit noin 0,19 linnan keskeltä), ja vallihauta on noin 0,03 leveä. Salmi on tyylitelty 0,09-leveäksi kaistaksi
  linnan eteen.
- **Pystyliioittelu** on noin 1,9, jotta tornit erottuvat 30°:n kallistuksessa. Vallin laki on 0,03, räystäs 0,10,
  harja 0,16, Telegraftårnet 0,16, Kakkelborg 0,21, Dronningens tårn 0,24, Kongens tårn 0,29 ja Trompetertårnetin neula
  noin 0,40.
- **Veneet ja hahmot:** lautta on 0,09 pitkä, eli noin neljäsosa oikeasta 111 m:n lautasta, jottei se peitä linnaa.
  Purjealus on 0,075, tullivene 0,022 ja haamu 0,035 korkea (noin kuusinkertainen).
- **Suunta todellinen:** pohjoinen on +Z. Eteläsiipi Telegraftårnetineen katsoo kameraan kuten satamasta ja lautalta
  otetuissa kuvissa. Salmi on tyylitelty kaistaksi linnan eteen, vaikka todellisuudessa se on linnan pohjois-, itä- ja
  kaakkoispuolella. Lautan reitti kulkee kaakossa itään kohti Helsingborgia (OpenStreetMap), ja satama on lounaassa,
  joten laituri on vasemmalla edessä. Kaistan oikea pää kaartuu hieman ylös niemen kärjen merkiksi.
- Koko 60 pt (KokoKerroin 1,5). Mitat ovat noin 1,00 × 0,40 × 0,75. Juuri on jalanjäljen keskellä maassa, eikä
  pohjalevyä ole.

## 5. Paletti ja aksentti
- Seinät ovat vaaleaa hiekkakiveä #e2d8bd, aukot ja ääriviiva mustetta #3b2f22, Telegraftårnetin tasakatto ja
  Kakkelborgin kupoli vaaleaa kiveä EmKiviVaalea ja isot päädyt paperia #efe4cc.
- Vallin laki on hillittyä niittyä #b3ae80 (keltaisempi kuin kupari, jotta ne erottuvat) ja luiska tiiltä #9a7256
  (kuten Malbork). Vallihauta ja salmi ovat EmVesi, ja ranta on EmHiekka.
- **Aksentti on kuparinvihreä** (#86a08a kuten Pannonhalman kupoli; kattojen tasainen sävy hieman tummempi): katot,
  kypärät, sipulit ja kupolit. Punaista ei käytetä (Dannebrog jää pois), joten aksentteja on vain yksi. Vihreän osuus
  on enintään 10 % näkyvästä alasta, ja se mitataan kuvasta.
- Lautta on paperinvalkoinen, ja alaosan kaista ja ikkunarivi ovat mustetta. Purjealuksen runko on tumma seepia
  #5a4632 ja purjeet paperia. Tullivene on seepiaa ja soutajat mustetta. Savu on #fbf8f0 ja alapinta seepiaa, roiske ja
  vana EmVaahto ja haamu paperinvalkoinen #f6f0e0.
- Yövalot ovat EmIkkunavalo, ja lyhdyt ovat vaaleampia #f4d898. Ei täysiä värejä eikä kiiltoa.

## 6. Animaatio (KronborgLiike, malli/Elava/ErikoisLiikeKronborg.cs)
- **lautta:** kaksisuuntainen kuten reitin Tycho Brahe, joka "vaihtaa suuntaa kääntymättä" (en-Wikipedia "MF Tycho
  Brahe"). Keula ja perä ovat samanlaiset. Lautta lähtee laiturista (x −0,40) salmen sisäkaistaa itään kääntöpisteeseen
  (x +0,02…+0,14 siemenestä). Menomatka kestää 10–12 s, ja alussa ja lopussa on 1,8 s:n pehmennys. Kääntöpisteessä
  lautta seisoo 1–2,5 s ja palaa. Laiturissa se odottaa 15–45 s (yöllä 25–60 s). Vauhti vaihtelee ±12 %.
- **vana:** vaahto-V lautan perässä (kulkusuunnan mukaan), skaala vauhdin mukaan.
- **laiva:** kolmimastoinen purjealus kulkee ulkokaistaa kaistan päästä päähän (26 s ±15 %), ilmestyy ja katoaa päissä
  1 s:ssa, ja suunta arvotaan. Tauko on 30–90 s, ja noin joka neljäs vuoro jää väliin (TaukoTod 0,25). Koko vaihtelee
  0,9–1,1, eikä laiva purjehdi yöllä.
- **tulli** (p 0,1 jokaisesta ohituksesta, oma arpakanava) laukeaa, kun alus on kaakkoisbastionin kohdalla
  (x ≈ +0,24):
  - 0 s: savu tuprahtaa bastionin tykistä (kasvaa 0,5 s ja hälvenee 2,1 s).
  - 0,45–1,4 s: roiske nousee keulan eteen ja laskee.
  - 0,6–2,4 s: alus kääntyy 70° tuuleen eli pohjoiseen maata kohti ja pysähtyy, ja purjeet (oma osa) kääntyvät ja
    lepattavat ±6°.
  - 2–5 s: tullivene soutaa bastionin alla olevasta laiturista aluksen kylkeen.
  - 5–6 s: vene on kyljessä.
  - 6–9 s: vene soutaa takaisin.
  - 7–9 s: alus palaa kurssiin, purjeet täyttyvät, ja alus jatkaa matkaa.
  - Napautus päivällä: jos alus on salmella, tulli laukeaa sen tullessa kohdalle (tai heti, jos se on jo ohi). Muuten uusi
    alus ilmestyy 0,12:n päähän ja tulee kohdalle 2,5 s:ssa.
- **tullivene:** levossa laiturissa. Airot eivät ole oma osa, vaan soutu näkyy veneen nytkähdyksinä, joiden tahti on
  1,1 s.
- **haamu** (yö, p 0,1 jokaisesta yön lautan lähdöstä, oma kanava, ja napautus yöllä): ilmestyy 1,5 s:ssa eteläisen
  kurtiinin vallille ja kävelee hitaasti toiseen päähän (10 s ±15 %, keinunta ±0,002, 0,9 Hz). Keskellä se pysähtyy
  1,5 s:ksi linnaa kohti ja katoaa lopuksi 1,5 s:ssa. Suunta arvotaan.
- **valot:** Valot() eli syttyminen ja sammuminen 1,5 s ilman välähdystä. Julkisivujen ikkunat, Trompetertårnetin lyhty
  ja majakka ovat omina osinaan pivot pintojen tasossa. Lautan valot seuraavat lauttaa.
- Vaihtelu: lautta KayMinS 20, KayMaxS 28, SeisooMinS 15, SeisooMaxS 45; laiva tauko 30–90 s, TaukoTod 0,25 ja
  Puuska 0. Siemen tulee noston tunnuksesta (ArkkityyppiLiike.Siemen), joten sama tunnus tuottaa saman aikataulun ja eri
  tunnus eri aikataulun.
- Lautta pysyy sisäkaistalla vasemmalla ja laiva ulkokaistalla, joten ne eivät törmää, ja tulli tapahtuu lautan alueen
  oikealla puolella. Levossa (lautta laiturissa, salmi tyhjä ja valo vakaa) piirretään 0 kehystä, ja vähennetty liike
  pysäyttää pehmeästi.

## 7. Kolmiot ja LOD
- **Runko noin 950:**
  - linna 560: seinät, kattokehä ja 6 päätyä 90, ikkunarivi 16, Telegraftårnet 34, Kakkelborg 70, Dronningens tårn 80,
    Kongens tårn 80, Trompetertårnet 120 ja kaksi porrastornia 50
  - tähtivalli 70 ja vallihauta pienistä paloista 60
  - salmi, ranta ja niemen kärki 120
  - laituri ja terminaali 30, vallin tykit 12, tullilaituri 6 ja puut 50
- **Osat noin 330:** lautta 60, vana 8, laiva 40, purjeet 32, laivan vana 6, tullivene 16, savu 48, roiske 16,
  haamu 24 ja valot 80 (ikkunat, kaksi lyhtyä ja lautan valot). **LOD0 yhteensä noin 1 280** (budjetti 1 500).
- LOD1 ei ole tasolla 1 käytössä. Tarvittaessa noin 350: linna laatikkona kattokehineen, Trompetertårnet kartiona,
  tähti ilman torneja ja salmi.
- **Lähitaso (KronborgLahi, arvio 2 600 eli 2,7 × runko, katto 3 000).** Siluetti, värit, ääriviivaosat ja pivotit
  ovat samat kuin rungossa. Lisätään:
  - kaikkien julkisivujen ikkunarivit ja listat sekä 12 isoa kaarevaa hiekkakivipäätyä ja pieniä kattoikkunoita
  - tornien kaiteelliset parvekkeet, Trompetertårnetin lyhtyjen aukot ja kello, majakan ikkunat ja tähtikruunu sekä
    Telegraftårnetin reunalista ja kaide
  - vallin rintavarustus ja tykkiaukot, Lippubastionin tykkirivi, porttipiha ja Mørkeportin portaali pohjoiskurtiinissa
    sekä vallihaudan silta
  - rannan kivikko, rantapatterin muuri, laiturin paalut, terminaalin ikkunat ja lisää puita.
  - Liikkuvat osat sopivat edelleen: kaistat, laiturit ja valli ovat samoissa kohdissa, ja yövalot osuvat ikkunoihin.

## 8. Ääriviiva ja perspektiivi
- Omat ääriviivaosansa: linnan runko kattoineen, tähtivalli (viiva kiertää tähden ja näkyy vallihaudan sisäreunassa),
  laituri terminaaleineen ja niemen kärjen ranta.
- Vesi on pienistä paloista (puolileveys alle 0,035), joten salmelle ja vallihaudalle ei tule ääriviivaa eikä
  kehystä. Kameran puoleinen reuna ja päät rajautuvat suoraan karttaan. Ohuet tornit jäävät ääriviivan kynnyksen alle.
- Liikkuvilla osilla ei ole ääriviivaa. Savu, roiske ja vana rakennetaan ilman ääriviivaryhmää, jottei 1,2 pt:n muste
  tee niistä tummia renkaita.
- Ikkunat, päätyjen aukot ja lyhtyjen aukot ovat sisäviivoja kärkiväreinä. Perspektiivi on mallin juuressa, ja kaikki
  geometria on maan yläpuolella (y ≥ 0).

## 9. Hyväksyminen
- Kuvat kansioon `kuvat/`: `kronborg-{lepo,tulli,yo,haamu}-{ylhaalta,kallistus30,reuna55,kolme}.png` (vähintään
  600 px, rajattuna, kulma ja versio kuvaan) ja pelikokoarviot `-pelikoko60.png` (180 px), `-pelikoko40.png` (120 px)
  ja `-pelikoko33.png` (100 px).
- Video `kronborg-video30.mp4`: 14 s, 30°. Lautta lähtee lähestyttäessä, ja napautus 6 s:n kohdalla käynnistää tullin.
- Lähitaso: `kronborg-lahitaso-45.png`, `-lahitaso-55.png` ja 2 × 2 -vertailu keski vs lähi (kulma, versio ja
  kolmiomäärä kuvaan).
- Kehyshinta ≤ 0,3 ms mallia kohden, levossa 0 kehystä ja unity-tarkistus 0 virhettä integroinnin yhteydessä. Omistaja
  hyväksyy kuvat ennen seuraavaa erää.

## 10. Tiedostomuoto ja toimitus
- Koodina: `Assets/Matkakirja/Kartta/Erikoismallit/Kronborg.cs` (partial class Symbolimallit: `KronborgRunko()`,
  `KronborgLahi()` ja liikkuvat osat omina verkkoinaan). Kaikilla apureilla ja vakioilla on etuliite `Kb`.
  Rekisteröinti `Rekisteroi("kronborg", …)`, ja liike (`KronborgLiike`, malli/Elava/ErikoisLiikeKronborg.cs) lisätään
  ErikoisLiikkeen Luo-kytkimeen.
- Haara `mallinseppa/<erä>` junan päälle, merge-pyyntö Natiivisepälle ja kuvat kansioon
  proto-3d/lokit/erikoismallit/kronborg/.

## 11. Toteutus 27.9.2026 (Opus-agentti, harness proto-3d/tyokalut/mallinseppa-esikatselu-n1)
- Runko 982 + osat 342 = **LOD0 1 324** (budjetti 1 500), **Lahi 2 521** (2,6 × runko). Mitat 1,000 × 0,428 × 0,797
  (z −0,411…0,386, juuri 0,012 jalanjäljen keskeltä pohjoiseen). Luo: `"kronborg" => new KronborgLiike(id),`
- Runko: tähtivalli 54, vallihauta 108, salmi 90, ranta 24, satama 30, linna 120 (seinät, kattokehä, kolme isoa päätyä ja
  ikkunarivit etelään ja itään), tornit 512 (Trompetertårnet 142, Dronningens tårn 100, Kakkelborg 94, Kongens tårn 80,
  porrastornit 72 ja Telegraftårnet 24) sekä tykit ja tullilaituri 44. Osat: lautta 52, lauttavana 8, lauttavalot 8,
  laiva 32, purjeet 26, laivavana 4, tullivene 23, savu 48, roiske 22, haamu 37, valot 22, valot1 12, valot2 16, lyhty0 16 ja
  lyhty1 16.
- Poikkeamat:
  - **Mittakaava:** linna on 0,37 (1,0 ≈ 235 m) eikä 0,27, koska ensimmäisessä versiossa tähti hallitsi ja linna jäi
    40 pt:ssä pieneksi. Tähti on tiivistetty noin 0,8 × todellisesta (kärjet 0,297 ja kurtiinit 0,225 linnan keskeltä), ja
    pystyliioittelu on noin 1,65: räystäs 0,105, harja 0,172, Telegraftårnet 0,175, Kakkelborg 0,221, Dronningens tårn
    0,252, Kongens tårn 0,31 ja Trompetertårnetin neula 0,428. Tullin kohta on x 0,33 (kaakkoisbastionin edessä), laituri
    x −0,42 ja lautan kääntöpiste −0,02…+0,12.
  - **Vesi:** salmi on vain linnan edessä (0,09), ja sen oikea pää kaartuu niemen kärjen merkiksi. L-muotoinen salmi, jossa
    oli myös itäpuolen kaista, kehysti mallin. Vallihauta on tasalevyinen (0,024) tähden ääriviivana, koska kurtiinien eteen
    levenevä hauta luki pelikoossa sinisinä kolmioina. Vesi ja ranta ovat pieninä paloina (198 vesikolmiota, suurin
    puolileveys 0,034), joten niille ei tule ääriviivaa.
  - **Kupari:** katot ovat kuparinvihreitä (materiaaliväri kuten Pannonhalman ja Krumlovin kupari), ja mitattuna vihreää on
    noin 14 % mallin pikseleistä (katot noin 13 %, kypärät ja kupolit noin 1,5 %). Jos katot lasketaan aksentiksi, 10 %:n
    raja ylittyy. Vaihtoehto B (hillitty salvia #86917f) on kuvassa kronborg-katto-AB.png, mutta 40 pt:ssä B harmaantuu eikä
    enää lue kuparikattoina, joten valittiin A. Vaihto on yksi rivi (KbKatto). Räystäskaista on vartiokäytävän vaaleaa
    kiveä, koska katot nousevat kaiteellisten vartiokäytävien yltä (Trap Danmark). Punaista ei käytetä.
  - **Koot:** purjealus on 1,25 × (runko 0,083), ja savu, roiske ja haamu (0,06) ovat suurempia kuin speksissä, jotta ne
    näkyvät 40 pt:ssä. Tullivene on 0,03 pitkä ja vaaleaa puuta #c9aa7c eikä seepiaa, koska tumma vene katosi aluksen
    kylkeen.
  - **Värit:** vallin ruoho #aeb07c, ranta #d9cba6, sisäpiha #d6caa9, Telegraftårnetin tasakatto #a8977a ja katot #7b9384.
  - **Tulli:** alus kääntyy tuuleen 60° (speksi 70°), koska 70°:ssa keulapuu ulottui rantaan. Tapahtuma kestää noin 9,5 s,
    ja tullivene on liikkeellä 2–9 s. Jos napautuksen hetkellä alus on kaukana tullin kohdasta, se haipuu 0,5 s:ssa ja uusi
    ilmestyy 0,09:n päähän kohdasta, koska laivaosia on vain yksi.
  - **Haamu** kulkee eteläisen kurtiinin vallin ulkoreunalla, jolloin se näkyy 30°:ssa ruohoa eikä vaaleaa julkisivua
    vasten. Pysähdyksessä se kääntyy katsojaan päin käsi koholla (viittoo) eikä linnaan päin.
  - **Lähitaso:** puut ovat vain lähitasossa, koska rungossa ne luettiin 40 pt:ssä nuolina. Lähitason isot päädyt ovat vain
    etelä- ja itäjulkisivussa, koska pohjoisen ja lännen päätyjen takapuolet olisivat näkyneet harjan yli ja muuttaneet
    siluettia. Ranta on pieninä paloina eikä ääriviivaosa.
  - **Yövalot** ovat viitenä osana (valot etelä, valot1 pohjoissiiven piha, valot2 itä, lyhty0 Trompetertårnet ja lyhty1
    majakka) ja lautan valot. Ikkunoiden paikat ovat samat rungossa, lähitasossa ja valo-osissa, joten hehku osuu ikkunoihin
    molemmilla tasoilla.
- Liikeydin (kronborg-testi, kaikki OK): 0 tavua allokaatioita 20 000 kehyksessä (Paivita ja 15 × Asento, tullit ja haamut
  mukana), noin 1 µs kehystä kohden (Mac Studio). 40 × 15 min: tulli 9,9 % ohituksista ja haamu 10,2 % yön lähdöistä.
  Lautta, laiva, tullivene ja roiske pysyvät jalanjäljellä, ja levossa piirretään 0 kehystä.
- Kuvat ja toteutusmuistio: harnessin kuvat/ ja kronborg-toteutus.md.
