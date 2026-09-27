# Erikoismalli: Hohensalzburg (speksi, pohja docs/raportit/erikoismalli-speksi-pohja.md)

*Mallinseppä 27.9.2026 (esikatselu tyokalut/mallinseppa-esikatselu-f). Elämänidea hyväksytty omistajalla 07.5x.*

## 0. ELÄMÄNIDEA
- Hohensalzburg on Salzburgin tunnus: Keski-Euroopan suurimpiin kuuluva keskiaikainen linna valkoisena vanhankaupungin
  yllä. FestungsBahn (1892, Itävallan vanhin toiminnassa oleva köysirata) nousee suoraa rataa jyrkkää rinnettä, ja
  Krautturmin Salzburger Stier (1502), maailman vanhin toimiva urkuhorni, mylvi aikoinaan F-duurisointuaan kaupungin
  porttien avaamisen ja sulkemisen merkiksi (nimi "härkä" tulee tästä mylvinnästä). Yöllä linna valaistaan.
- **Perusliike:** punainen FestungsBahn-vaunu nousee vanhastakaupungista linnaan (14 s), odottaa vuoriasemalla 10–30 s,
  laskee (14 s) ja odottaa laaksoasemalla 20–60 s.
- **Harvinainen (noin 1/10 saapumisista):** Salzburger Stier mylvii. Kolme äänirengasta laajenee Hoher Stockin
  katolta porrastettuina, ja kyyhkyparvi pyrähtää lentoon, kiertää linnan ja laskeutuu (7 s). Yöllä Stier ei mylvi
  itsestään, koska todelliset soittoajat ovat 7, 11 ja 18.
- **Reaktio:** lähestyttäessä odottava vaunu lähtee heti. Napautus soittaa Stierin heti, enintään kerran 20 s:ssa
  (myös yöllä).
- **Yöllä:** kaupungin puoleiset julkisivut (muurit, Hoher Stock, tornit ja kirkko) ja muurien harjat hehkuvat
  lämpimästi. Hoher Stockin ikkunat jäävät tummiksi hehkun eteen.

## 1. Tunniste ja paikka
- `kohde:hohensalzburg`, avain `hohensalzburg`. Itävalta (AUT), 47,7956 N, 13,046 E, taso 1 (historia).

## 2. Viitekuvat (Commons, lisenssit tarkistettu Commonsin API:sta 27.9.)
- Ilmasta: File:Aerial image of Hohensalzburg Fortress (view from the southwest).jpg (CC BY-SA 4.0, Carsten Steger) ja
  File:Festung Hohensalzburg aerial view 004.jpg (CC BY-SA 3.0, MatthiasKabel; idästä, rata ja Reißzug näkyvät).
- Kaupungista eli pohjoisesta: File:Festung Hohensalzburg (2).jpg (CC BY-SA 3.0 AT, Pedro J Pacheco) ja
  File:Festung Hohensalzburg von Nordost.jpg (CC BY-SA 4.0, Andreas Stiasny; sama kuin noston kuva).
- FestungsBahn: File:HGG-Salzburger-Festungsbahnwagen-Bj2011.JPG (CC BY-SA 3.0, H.G.Graser).
- Piirros: File:Homann Salzburg Hohensalzburg.jpg (PD, J. B. Homann n. 1712). Selitteessä mainitaan "weit
  erschallendes Orgelwerk" eli Stier. PD-pohjapiirrosta ei löytynyt. Rakennusten sijainnit on otettu
  OpenStreetMapin pohjapiirroksesta (ODbL, © OpenStreetMapin tekijät) vain viitteeksi, ja mallin muodot on piirretty
  käsin tyyliteltyinä (reuna 16 kärkeä).

## 3. Siluetti ja tunnusmerkit (tärkein ensin)
1. Pitkä valkoinen linnoitus jyrkän metsäisen vuoren laella. Muurien alla on tumma kallioseinä, kuten kaupungista
   katsottuna.
2. Keskellä Hoher Stock: korkein valkoinen massa, kaksi ikkunariviä kaupunkiin päin ja tumma lonkkakatto. Sen kulmassa on
   pyöreä Glockenturm, takana pyöreä tasakattoinen Kuchlturm ja oikeassa (läntisessä) päässä hoikka neliömäinen
   Reckturm.
3. Punainen FestungsBahn suoralla radallaan kaupungin puoleisessa rinteessä vanhankaupungin katoilta vuoriasemalle.
4. Vasemmassa (itäisessä) päässä Georgskirchen vihreä kattoratsastaja, Krautturm sekä Kuenburgin bastioni ja sen
   kulmassa Bürgermeisterturm. Takana on pitkiä siipiä tummine kattoineen.
- Pois jätetään Reißzug (liian pieni), Nonnbergin luostari, muurit Mönchsbergin suuntaan, köysiradan kohtauspaikka ja
  toinen vaunu (hyväksytyssä ideassa on yksi vaunu), yksittäiset ikkunat (paitsi Hoher Stockin rivit) sekä Salzach ja
  tuomiokirkko. Kokeilussa (v1) Salzach näkyi 60 pt:ssä pelkkänä viivana ja talorivi aitana. Vanhankaupungin vihjeeksi
  jäi kolme kattoa laaksoaseman vieressä.

## 4. Mitat ja koko
- Linnoitus 250 × 150 m ja yli 7 000 m² rakennettua alaa. Festungsberg on noin 100 m vanhankaupungin yläpuolella.
  FestungsBahn on 198,5 m pitkä, nousu 96,6 m ja suurin kaltevuus 60 %.
- Yksikkö: vuoren pidempi sivu on 1,0 (≈ 285 m), ja linnoitus on 0,88 pitkä. Syvyys on tiivistetty 0,7-kertaiseksi
  (0,37), jotta linnoitus näyttää pitkältä. Vuoren juuri on tiivistetty noin puoleen, joten rinteet ovat todellista
  jyrkemmät (laki 0,24, suhteessa leveyteen noin 1,4 × todellinen). Rakennukset on liioiteltu noin kaksinkertaisiksi:
  Hoher Stock 0,17 ja katto 0,08, eli harja 0,49. Vaunu on liioiteltu noin kolminkertaiseksi (0,06 × 0,034).
- **Suunta tyylitelty:** klassinen näkymä on kaupungista pohjoisesta, mutta kallistettu kamera katsoo etelästä. Malli on
  siksi käännetty 180° pystyakselin ympäri. Todellinen pohjoisjulkisivu, rata ja vanhakaupunki ovat mallin −Z-puolella,
  todellinen itä (Kuenburg) vasemmalla ja länsi (Reckturm, Mönchsbergin harjanne) oikealla. Näin kallistettu kamera näkee
  saman siluetin kuin kaupungista katsottaessa.
- Koko 60 pt (KokoKerroin 1,5). Juuri on vuoren keskellä maassa (linnoituksen keskikohta), ja mitat ovat
  1,00 × 0,49 × 0,75. Pohjalevyä ei ole.

## 5. Paletti ja aksentti
- Muurit ja rakennukset: valkoinen paperi #f3ebd6. Pihat ovat vaalea kivi #e2d8bd, joten linna näyttää valkoiselta myös
  ylhäältä. Katot ovat EmKatto ja Hoher Stockin katto hieman tummempi #62503a. Bastionien kivi on #978870, kallio #8d806a,
  metsärinne #7c885a ja puut #5f6e45. Georgskirchen kattoratsastaja on kuparinvihreä #86a08a (materiaaliväri).
- **Aksentti:** FestungsBahnin punainen #b4503c eli --sym-historia #a05c3f punaisemmaksi säädettynä, jotta vaunu
  luetaan 60 pt:ssä punaisena. Aksentti on vain liikkuvassa vaunussa (alle 1 % alasta). Oikeat vaunut (2011) ovat
  valkoiset ja niissä on punainen nauha. Hyväksytyssä ideassa vaunu on punainen.
- Äänirenkaat ovat EmSeepia, kyyhkyt harmaita #938d84 (erottuvat valkoisesta linnasta ja kartasta) ja valot
  EmIkkunavalo.

## 6. Animaatio (HohensalzburgLiike, malli/Elava/ErikoisLiikeHohensalzburg.cs)
- **vaunu:** liuku radan suuntaan laaksoasemalta (pivot) vuoriasemalle. Matka on (−0,041; 0,197; 0,271), pituus 0,337,
  ja sama vakio on mallissa (HsVaununMatka) ja liikeytimessä (MatkaX/Y/Z). Smootherstep 14 s. Seisonta on 10–30 s
  vuoriasemalla ja 20–60 s laaksoasemalla, ja siemen tulee noston tunnuksesta (Vali-kanavat 60–63). Alussa vaunu odottaa
  vuoriasemalla 5–30 s.
- **aani0–2:** vaakarengas (säde 0,3, leveys 0,018) Hoher Stockin katon harjalla. Skaala 0,12 → 1 hidastuen (ease-out)
  2,4 s:ssa, nousu 0,02, porrastus 0,6 s, minkä jälkeen rengas piiloon.
- **parvi:** kuusi kyyhkyä lähtee 0,5 s mylvinnän jälkeen. Parvi ilmestyy katolta 0,6 s:ssa, nousee 0,1, kiertää 300°
  myötäpäivään (positiivinen kierto Y:n ympäri, linnut katsovat kiertosuuntaan) ja laskeutuu katolle kutistuen 0,8 s:ssa.
  Kokonaiskesto on 6,5 s.
- **valot:** Valot() eli syttyminen ja sammuminen 1,5 s, ei välähdystä. Pivot on linnan keskellä pihatasolla.
- Harvinaisen arpa heitetään jokaisessa saapumisessa (p 0,1, kanava 62). 10 tunnin simulaatiossa tuli 86 mylvintää
  815 saapumisesta (10,6 %).
- Kehys piirretään vain, kun vaunu, renkaat tai parvi oikeasti liikkuvat (d > 0) tai valo vaihtuu. Kun vaunu odottaa,
  tai liikettä on vähennetty (Liike 0), piirretään 0 kehystä.
- Puhdas C#: Asento vertaa nimiä suoraan ilman Substringiä. 3 600 kehyksen testissä ei ollut allokaatioita (0 tavua), ja
  sama tunnus tuottaa saman aikataulun.

## 7. Kolmiot ja LOD
- Runko 835:
  - vuori 112 (16 kärkeä × 3 vyötä ja laki) ja 27 puuta 189
  - muurirengas 160 ja kurtiinin ikkunat 6
  - Hoher Stock 36 (runko, lonkkakatto ja 10 ikkunaa)
  - Glockenturm ja Kuchlturm 48, Reckturm 22, Georgskirche ja Krautturm 50, Bürgermeisterturm 24
  - 8 siipeä 112
  - rata ja asemat 34, vanhankaupungin talot 42
- Osat: vaunu 16, äänirenkaat 3 × 40, parvi 24 ja valot 58.
- **LOD0 yhteensä 1 053** (budjetti 1 500).
- LOD1 ei ole tasolla 1 käytössä (Erikoismalli.Lod1 on valinnainen, ja taso 1 piirtää LOD0:n). Tarvittaessa noin 330
  kolmiota: vuori ilman puita, muuri 8 osana, Hoher Stock, kolme tornia ja siivet laatikkoina.

## 8. Ääriviiva ja perspektiivi
- Omat ääriviivaosansa: vuori (viiva kiertää juuren), muurirengas, Hoher Stock kattoineen, jokainen torni, kirkko,
  jokainen siipi ja rata.
- Ilman ääriviivaa jäävät puut, vanhankaupungin talot, asemat, ikkunat ja kattoratsastaja, koska niiden puoliväli on
  alle 0,035. Liikkuvilla osilla ei ole ääriviivaa.
- Perspektiivi on mallin juuressa. Kaikki geometria on maan yläpuolella (y ≥ 0).

## 9. Hyväksyminen
- Kuvat kansiossa `kuvat/`:
  - `hohensalzburg-{lepo,tapahtuma,yo}-{ylhaalta,kallistus30,reuna55}.png` (668 px leveitä, 600 px / yksikkö) ja kolmen
    kuvan rivi `-kolme.png`
  - pelikokoarviot `-pelikoko60.png` (180 px) ja `-pelikoko33.png` (100 px)
- Video `kuvat/hohensalzburg-video30.mp4`: 12 s, 30°, vaunu laskee ja Stier mylvii 2 s:n kohdalla.
- ≤ 0,3 ms ja unity-tarkistus integroinnin yhteydessä.
