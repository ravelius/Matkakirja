# Erikoismalli: Malborkin linna (luonnos omistajan korttiin 27.9.2026, Linssiseppä)

*Pohja docs/raportit/erikoismalli-speksi-pohja.md. OMISTAJA VALITSI A:N 27.9.2026 (Fablen kautta klo 18.4x): mallinnus
alkaa. B jää pois.*

## 0. ELÄMÄNIDEA (omistaja valitsee A tai B)

- **Kolme riviä:** Malbork on pinta-alaltaan maailman suurin linna ja valmistuessaan 1406 maailman suurin tiililinna. Se
  oli Saksalaisen ritarikunnan suurmestarin istuin Nogat-joen rannalla vuodesta 1309. Vuoden 1410 piirityksen muistoksi
  linnassa järjestetään joka kesä piiritysnäytös ja ritariturnaus. Legendan mukaan piirittäjien kivikuula ammuttiin
  Kesärefektorin ainoaan tukipilariin, mutta se osui seinään, jossa se on yhä. Joella kulkee kaksi pientä vesibussia, ja
  yöllä linna valaistaan.

### A (suositus): Turnaus ja piirityksen kivikuula
- **Perusliike:** Nogatin rantaniityllä linnan edessä on turnausaita. Kaksi ritaria odottaa kentän päissä, laukkaa
  toisiaan kohti ja laskee kopjat vaakaan. Ritarit ohittavat toisensa aidan eri puolilla, hidastavat, kääntyvät ja
  jäävät odottamaan (laukka 3,2 s, odotus 15–45 s). Toisella ratsulla on punainen loimi ja toinen on vaalea. Siemenestä
  vaihtelevat odotus ja laukan nopeus (±10 %), ja joskus vain toinen ritari ratsastaa harjoituskierroksen.
- **Harvinainen (noin 1/10 kohtaamisista): Kesärefektorin kivikuula (legenda 1410).** Punainen lippu ilmestyy
  Suurmestarin palatsin ikkunaan petturin merkiksi. Joen toiselta rannalta tuprahtaa savu, ja kivikuula kaartaa hitaasti
  joen yli palatsin seinään. Kuula jää seinään tummaksi pisteeksi, lippu vedetään sisään, ja kuula näkyy vielä 6 s.
  Kesto on noin 7 s, eikä mitään rikkoudu, koska kuula meni legendan mukaan ohi (de-Wikipedia; petturin punainen lippu
  pl-Wikipedia).
- **Reaktio:** lähestyttäessä ritarit ratsastavat Siltaportista kentälle ja aloittavat heti. Napautus eli kortin avaus
  käynnistää legendan heti (enintään kerran 20 s:ssa, myös yöllä).
- **Yöllä:** julkisivut Nogatin puolella, Siltaportin tornit ja Suurmestarin palatsin korkeat ikkunat hehkuvat
  lämpiminä, kuten linnan iltavalaistuksessa. Ritarit eivät ratsasta yöllä.
- **Laatukynnys:** laukkaavat ritarit ovat mallin suurin liike ja tunnistettava keskiajan merkki, ja punainen loimi
  erottuu 40 pt:ssä. Legenda on lyhyt ja opettaa linnan tarinan. Kaikki tapahtuu mallin jalanjäljellä. Turnaukset ja
  piiritysnäytökset ovat nykyajan tapahtumia (AIKA sallii). Todellisuudessa turnaukset pidetään linnan vallihaudoissa ja
  esilinnassa, ja mallissa kenttä on tyylitellysti rantaniityllä kameran puolella.

### B: Nogatin laiva ja iltarusko
- **Perusliike:** vesibussi Malbork lähtee linnan juurella olevasta laiturista ja ajaa linnan editse vasemmalle kohti
  rautatiesiltaa (18 s). Se kääntyy (2,4 s), palaa ja odottaa laiturissa 20–60 s. Siemenestä vaihtelevat odotus ja
  vauhti, ja joskus toinen vesibussi Żuławy tulee vastaan (malbork.naszemiasto.pl: kaksi vesibussia, noin 30 min:n
  kierros).
- **Harvinainen:** iltarusko. Tiilen puna leviää päätornin huipusta ja kattojen päädyistä alas, hehkuu hetken kuten
  auringonlaskukuvissa ja vetäytyy (10 s, enintään 10 % alasta). Ei yöllä.
- **Reaktio:** lähestyttäessä laiva lähtee heti, ja napautus käynnistää iltaruskon.
- **Heikkous:** laiva ja hehku muistuttavat jo hyväksyttyjä malleja (Bruggen vene ja Matterhornin alppihehku), ja laiva
  on 40 pt:ssä pieni. Siksi suositus on A.

## 1. Tunniste ja paikka
- `kohde:malbork`, avain `malbork`. Puola (POL), 54,0397 N, 19,0278 E (en-Wikipedia "Malbork Castle"), taso 1 (historia,
  js/packs/maastokohteet-pol.js).

## 2. Viitekuvat (Commons, lisenssit tarkistettu tiedostosivuilta 27.9.)

| Tiedosto | Näkymä | Lisenssi ja tekijä |
|---|---|---|
| PL GMB Malbork Castle across Nogat.jpg | klassinen näkymä Nogatin länsirannalta (mallin suunta) | CC BY-SA 3.0 PL, Radu Ana Maria |
| MalborkCastleSunset.jpg | sama suunta auringonlaskussa: Siltaportti keskellä, lippu päätornissa, Gdanisko oikealla | CC BY-SA 4.0, Salacinskik |
| Malbork zamek (dron1).jpg | ilmasta kaakosta: Korkea, Keski- ja Alalinna, Nogat vasemmalla | CC BY-SA 4.0, Kapitel |
| Zamek Malbork z lotu ptaka 3.jpg | ilmasta etelästä: Korkea linna, päätorni, Gdanisko, Nogat ja sillat | CC BY-SA 4.0, Sebastiangora |
| Plan der Ordensburg Marienburg.png | pohjapiirros: Hochschloss, Mittelschloss, Hochmeisterpalast, Brücktor, Herrendansk | CC BY-SA 2.5, Maximilian Dörrbecker (Chumwa) |
| Malborg plan przyziemia zamku.jpg | pohjakerros: Korkea linna ja Keskilinna, Gdanisko | PD, Brockhaus Konversations-Lexikon 1892 |
| Dansker der Marienburg.jpg | Gdanisko-torni ja käytävä etelästä | CC BY-SA 4.0, Chattus |
| Malbork rekonstrukcja 2009 (1).JPG | turnausritarit linnan muurin vieressä, punainen loimi | CC BY 2.0, Alistair Young |

- Kuvat ovat vain viitteitä. Malli on oma (CC0), eikä kuvista kopioida pintoja eikä tekstuureja. Osien paikat on otettu
  pohjapiirroksista ja OpenStreetMapista (ODbL, © OpenStreetMapin tekijät) vain viitteeksi.

## 3. Siluetti ja tunnusmerkit (tärkein ensin)
1. Pitkä tiilinen linnarivi leveän joen takana. Vasemmalla on Keskilinna ja Suurmestarin palatsi (korkea tornimainen
   massa ja jyrkkä lonkkakatto), keskellä Siltaportin kaksi pyöreää tornia kartiokattoineen ja oikealla Korkea linna
   jyrkkine harjakattoineen ja porraspäätyineen.
2. Korkean linnan neliömäinen päätorni sakaroineen (66 m vallihaudan pohjalta). Se on mallin korkein kohta, ja huipussa
   on lippu.
3. Leveä Nogat edessä ja matala rantamuuri torneineen joen suuntaisesti.
4. Gdanisko oikealla edessä: erillinen neliötorni, jota kantaa kaaririvi ja johon johtaa pitkä kaarikäytävä.
- **Pelikoko 40 pt (kallistus 30–55°):** tunnistus tulee pitkästä tiilimassasta joen takana, päätornin pystyviivasta ja
  kahdesta kartiokatosta keskellä. Gdanisko näkyy 60 pt:ssä erillisenä tornina ja 40 pt:ssä massan jatkeena. Ylhäältä
  luetaan Korkean linnan neliö sisäpihoineen, Keskilinnan U-muoto ja joen kaista.
- **Pois jätetään:** Alalinna lähes kokonaan (vain kaksi tornia vasemmassa reunassa), Plauenin valli ja itäpuolen
  ulkovarustukset, Madonnan patsas (kirkon itäpäässä kameralta piilossa, vain lähitasossa), kaupunki, rautatiesilta,
  sisäpihojen rakennukset ja yksittäiset ikkunat (paitsi palatsin korkeat ikkunat).

## 4. Mitat ja koko
- Korkea linna on 51,6 × 60 m, Gdaniskon käytävä 64 m ja Alalinna 140 × 270 m (zamkiobronne.pl). Päätorni on 66 m
  vallihaudan pohjalta ja yli 50 m pihalta (zawszepomorze.pl ja zamkiobronne.pl). Keskilinna on 129 × 112 m ja
  Suurmestarin palatsi 54 × 26 m (OpenStreetMap). Koko alue on 21 ha (en-Wikipedia), ja Madonna on 8 m (de-Wikipedia).
  Siltaportti (1335–1341) on kaksi massiivista tornia ja kaksi porttia Nogatin puolella (pl-Wikipedia). Nogat on linnan
  kohdalla noin 150 m leveä (OpenStreetMap).
- Muiden rakennusten korkeudet on arvioitu kuvista suhteessa päätorniin: siivet noin 25 m ja katot noin 15 m, palatsi
  noin 30 m ja Siltaportin tornit noin 18 m.
- **Yksikkö:** 1,0 ≈ 380 m. Keskilinnan koillispäästä Korkean linnan lounaispäähän on noin 270 m (OpenStreetMap), ja
  vasemmalle jää tilaa Alalinnan vihjeelle. Nogat on tiivistetty 0,16:een (noin 0,4 ×), ja rantaniitty ja muuri ovat
  0,10. Pystyliioittelu on 1,6: muurit 0,03–0,06, Keskilinnan harja 0,12, Korkean linnan räystäs 0,11 ja harja 0,17,
  palatsi 0,18, Siltaportin tornit 0,11 ja päätorni 0,25 (lippu 0,28). Ritarit on liioiteltu noin 11-kertaisiksi (ratsu
  ja ratsastaja 0,07 × 0,05, kopja 0,08), jotta laukka näkyy 40 pt:ssä.
- **Suunta tyylitelty kuten Brandenburgin portissa:** Nogat virtaa linnan ohi pohjoiskoilliseen, ja jokijulkisivu katsoo
  länsiluoteeseen (OpenStreetMap). Klassinen näkymä on joen länsirannalta, mutta kallistettu kamera katsoo etelästä.
  Siksi malli on käännetty noin 110° vastapäivään. Joki ja jokijulkisivu ovat mallin −Z-puolella (edessä), Keskilinna ja
  Alalinna (todellisuudessa koillisessa) vasemmalla ja Korkea linna ja Gdanisko (lounaassa) oikealla. Joki virtaa
  mallissa oikealta vasemmalle.
- Koko 60 pt (KokoKerroin 1,5). Mitat ovat 1,00 × 0,28 × 0,64. Juuri on jalanjäljen keskellä maassa, eikä pohjalevyä
  ole.

## 5. Paletti ja aksentti
- Tiili on lämmin seepia #8d6d50 (kuten Bruggen torni) ja varjossa #6f5540. Katot ovat EmKatto hieman lämpimämpänä, ja
  palatsin kivikehykset ja graniittipylväät ovat paperia #efe4cc. Punaista ei käytetä rungossa, jotta aksentti erottuu.
- Joki on EmVesi, rantaniitty #bdb48c (kuten Matterhornin niitty), ruovikko EmPuu ja turnausaita ja teltat paperia.
- **Aksentti on punainen #9a3b2c:** ratsun loimi ja viiri (noin 1 % alasta), legendan lippu ikkunassa (alle 1 %) ja
  päätornin lipun punainen puolisko. Yhteensä alle 3 % alasta (raja 10 %). B:ssä iltarusko on enintään 10 % tapahtuman
  ajan.
- Toinen ratsu on paperia, ritarit teräksenharmaita #938d84 (kuten Hohensalzburgin kyyhkyt), kopjat paperia ja savu
  #fbf8f0 alapinta seepiana. Kivikuula on mustetta.
- Yövalot ovat EmIkkunavalo ja palatsin ikkunat vaaleampia #f4d898. Ei täysiä värejä eikä kiiltoa.

## 6. Animaatio (A: MalborkLiike, malli/Elava/ErikoisLiikeMalbork.cs)
- **ritari0–1:** liuku X-akselilla turnausaidan suuntaisesti ±0,28 (smootherstep 3,2 s). Kopja laskeutuu pystystä
  vaakaan 0,6 s ennen kohtaamista ja nousee ohituksen jälkeen. Ratsun runko keinuu laukassa ±4° (jakso 0,45 s) ja nousee
  0,004. Kentän päässä käännös 180° kestää 1,6 s. Odotus on 15–45 s kummassakin päässä, ja noin joka viidennellä
  kierroksella vain toinen ritari ratsastaa.
- **Reaktio:** alkutilassa ritarit ovat Siltaportissa. Lähestyminen tuo ne ravilla kentän päihin (6 s), minkä jälkeen
  ensimmäinen laukka alkaa heti.
- **legenda:** lippu (pivot ikkunan yläreunassa) laskeutuu 0,5 s:ssa ja liehuu ±6°. Etualan rannalla tykin savu (kolme
  möykkyä) kasvaa 1,2 s:ssa skaalaan 1,2. Kuula lentää paraabelia palatsin seinään (1,6 s, laki 0,12), jää pinnalle 6 s
  ja katoaa skaalalla 0,5 s:ssa. Lippu nousee pois. Harvinainen arvotaan jokaisesta kohtaamisesta (p 0,1, oma kanava).
- **valot:** Valot() eli syttyminen ja sammuminen 1,5 s ilman välähdystä. Pivot on julkisivujen juuressa.
- Vaihtelu: KayMinS 5, KayMaxS 8, SeisooMinS 15, SeisooMaxS 45, TaukoTod 0,2 (yksi ratsastaja) ja Puuska 0. Siemen tulee
  noston tunnuksesta, joten sama tunnus tuottaa saman aikataulun ja eri tunnus eri aikataulun.
- Liikkuvat osat ovat alle kolmanneksen mallista. Kun ritarit odottavat, piirretään 0 kehystä, ja vähennetty liike
  pysäyttää pehmeästi.
- **B:n liike:** laiva liukuu X-akselilla −0,40…+0,30 (18 s) ja kääntyy 180° 2,4 s:ssa, ja vana toimii kuten Bruggessa.
  Iltarusko on kuori päätornin ja päätyjen päällä: nousu alaspäin 2,5 s, hehku 4 s ja vetäytyminen 3 s, kuten
  Matterhornin alppihehku.

## 7. Kolmiot ja LOD
- **Runko 844:**
  - Nogat 24, rannat ja ruovikko 30 ja niitty 8
  - rantamuuri ja 5 tornia 110 sekä muurin sakarat vihjeenä 30
  - Siltaportti 64 (kaksi pyöreää tornia kartiokattoineen ja portti)
  - Korkea linna 208: neljä siipeä, harjakatot ja porraspäädyt 96, päätorni sakaroineen 56, kulmatornit 32 ja kirkon
    kuori 24
  - Gdanisko ja käytävän neljä kaarta 64
  - Keskilinna 96 (kolme siipeä ja päädyt) ja Suurmestarin palatsi 64
  - Alalinnan kaksi tornia ja muurinpätkä 40, kuivahauta 8 ja laituri 8
  - turnausaita ja kaksi telttaa 28, tykki 14 ja puut 48 (12 × 4)
- **Osat (A) 172:** ritarit 64 (2 × ratsu 18, ratsastaja 8, kopja 4 ja kilpi 2), legendan lippu 4, savu 48 (3 × 16),
  kuula 8 ja valot 48 (julkisivut 24, palatsin ikkunat 12, Siltaportti 8 ja Gdanisko 4). **LOD0 yhteensä 1 016**
  (budjetti 1 500).
- B:ssä turnausaita, teltat ja tykki jäävät pois (−42). Tilalle tulevat laiva 32, vana 8 ja iltaruskokuori 56. LOD0 on
  noin 946.
- LOD1 ei ole tasolla 1 käytössä. Tarvittaessa noin 330: joki, muuri yhtenä osana, Korkea linna ja päätorni, Keskilinna
  ja palatsi laatikkoina sekä Siltaportti ilman kartioita.
- **Lähitaso (MalborkLahi, arvio 2 600 eli 3,1 × runko, katto 3 000).** Siluetti, värit, ääriviivaosat ja pivotit ovat
  samat kuin rungossa. Lisätään:
  - sakarat muurien ja päätornin harjalla sekä Korkean linnan porraspäätyjen sokeakaaret ja pinaakkelit
  - Suurmestarin palatsin 12 korkeaa ikkunaa ja graniittipylväät kärkiväreinä sekä kulmatornien kartiot
  - Gdaniskon käytävän kuusi kaarta ja sokeakaaret, Siltaportin kaksi ovikaarta ja sakarat
  - Alalinnan Karwan ja Pyhän Laurentiuksen kappeli, kirkon kuoriosa ja Madonnan syvennys takaseinällä (näkyy vain
    reunalla), laituri ja ruovikon tupsut sekä 16 puuta lisää.
  - Liikkuvat osat sopivat edelleen: turnauskenttä, palatsin ikkuna ja ranta ovat samoissa kohdissa.

## 8. Ääriviiva ja perspektiivi
- Omat ääriviivaosansa: Korkea linna siipineen, päätorni, Keskilinna, palatsi, Siltaportti, Gdanisko käytävineen,
  rantamuuri, Alalinnan tornit ja joki (viiva kiertää vain veden reunan).
- Ilman ääriviivaa jäävät puut, teltat, aita, tykki ja laituri. Sakarat ja ikkunat ovat kärkivärejä. Liikkuvilla osilla
  ei ole ääriviivaa: ritarit erottuvat niitystä punaisena ja vaaleana, ja kuula on musta.
- Perspektiivi on mallin juuressa, ja kaikki geometria on maan yläpuolella (y ≥ 0).

## 9. Hyväksyminen
- Kuvat kansioon `kuvat/`: `malbork-{lepo,legenda,yo}-{ylhaalta,kallistus30,reuna55,kolme}.png` (vähintään 600 px,
  rajattuna, kulma ja versio kuvaan) ja pelikokoarviot `-pelikoko60.png` (180 px), `-pelikoko40.png` (120 px) ja
  `-pelikoko33.png` (100 px).
- Video `malbork-video30.mp4`: 14 s, 30°. Ritarit ratsastavat kahdesti, ja napautus käynnistää legendan 8 s:n kohdalla.
- Lähitaso: `malbork-lahitaso-45.png`, `-lahitaso-55.png` ja 2 × 2 -vertailu keski vs lähi (kulma, versio ja kolmiomäärä
  kuvaan).
- Kehyshinta ≤ 0,3 ms mallia kohden, levossa 0 kehystä ja unity-tarkistus 0 virhettä integroinnin yhteydessä. Omistaja
  hyväksyy kuvat ennen seuraavaa erää.

## 10. Tiedostomuoto ja toimitus
- Koodina: `Assets/Matkakirja/Kartta/Erikoismallit/Malbork.cs` (partial class Symbolimallit: `Malbork()`,
  `MalborkLahi()` ja liikkuvat osat omina verkkoinaan). Rekisteröinti `{ "malbork", Malbork }`, ja liike lisätään
  ErikoisLiikkeen Luo-kytkimeen.
- Haara `mallinseppa/<erä>` junan päälle, merge-pyyntö Natiivisepälle ja kuvat kansioon
  proto-3d/lokit/erikoismallit/malbork/.
