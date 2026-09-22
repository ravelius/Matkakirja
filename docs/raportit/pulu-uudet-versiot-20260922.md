# Pulun neljä uutta katseluversiota, 22.9.2026

Omistajan rajaus: ensin muutama nykyisen eleen parannettu versio gallerian
Uudet versiot -kohtaan, ei vertailua eikä vielä peliin kytkentää.

## Katseltava tulos

- Kyllä kyllä (2,1 s): vastaliike, nopea nyökkäys, pienempi vahvistus, hidas palautus.
- Hetkinen! (2,75 s): katse ehtii ensin, lyhyt havaintotauko ja nopea toinen reaktio;
  vartalo seuraa päätä viiveellä.
- Hauska nähdä (2,9 s): eri aikaan aukeavat siivet, pieni toinen painotus,
  siivenkärkien viive ja rauhallinen sulkeminen.
- Kirjan selaus (4,4 s): rivin seuraaminen, sivuun tarttuminen, napakka sivunkääntö,
  paperin vaimeneva jälkiliike ja siiven palautus rinnan kautta.

`docs/livia-uudet-versiot.mjs` omistaa vain nämä katseluehdotukset. Kasvon muodot
tulevat pelin nykyisestä `livianSvgPaa`-funktiosta, ja vastaavien SVG-geometrioiden
numerot interpoloidaan. Nyökkäys ei siis enää hypi pikseliasennosta toiseen.
Piirretyt Hermite-radat säilyttävät nopeuden välipisteissä; pysähdykset on
kirjoitettu eleisiin tarkoituksella. Liike ei riipu aiemmista ruuduista.

Galleria avautuu Uudet versiot (4) -ryhmään. Ryhmän eleet peräkkäin näyttää vain
valitun ryhmän. Nykyiset 70 pelielettä ovat edelleen omissa kategorioissaan;
entinen Uudet eleet (19) on nimetty Lisätyt eleet -ryhmäksi. Katseluehdotusten
lähikuva on suurempi. Sivulla kerrotaan, etteivät uudet versiot ole vielä pelissä.

## Varmennus

- Koko testisarja: 3929 testiä, 3916 PASS, 13 SKIP, 0 FAIL.
- Lisäksi kasvopohjien topologiavartio lisätty ja ajettu (kohdesarja 5/5).
- Chromium: neljän version sarja aidolla kellolla, vaihdot, 390 px leveys ilman
  vaakaylivuotoa, reduced motion ja 90 % kohdalta jatkaminen tarkistettu.
- 1280 px ja 390 px kaappaukset sekä 24 asennon kuvasarja katsottu.
- Kaksoisavaimet, niputus, savukevartio, nimiöpäällekkäisyydet ja standalone PASS.
- Pelin js/, css/, sw.js ja ääni-/cue-aineisto eivät muutu.

Julkaisun kohde on vain `docs/livia-svg.html` ja sen katselumoduulit.
Kuvaputken tilauksia ei tarvita. Omistajan taiteellinen katselmus seuraa tästä
valmiista neljän ehdotuksen erästä; hyväksyntää ei väitetä etukäteen.

## Suukokeilu ja kirjan suunta, jatkopalaute 22.9.2026

Omistaja piti liikkeitä parempina ja pyysi Hauska nähdä -eleeseen suukokeilun
sekä kirjan kääntämisen lukijaa eli Pulua kohti. Tervehdyksessä nokka avautuu
nyt suuremmaksi linnunsuuksi: ylänokka säilyy, alaleuka laskee, pieni kieli
näkyy ja suu sulkeutuu omalla sulavalla liikeradallaan. Muut eleet eivät
saa suuta. Kirjasta näkyvät katsojalle ulkokannet ja selkä; sivunkääntö
piirretään kansien taakse ja sen yläkaari näkyy.

Omistaja antoi luvan päivittää myöhemmin kaikki vanhatkin eleet samaan
liikepohjaan, mutta haluaa ensin katsoa suun ja sen soveltuvuuden muihin
ilmeisiin. Tämä erä säilyy neljän eleen katseluna, ei pelin muutoksena.

- Kohdetestit 7/7 PASS, mukaan lukien suun jatkuvuus ja nokan korvautuminen
  sekä sivun ja kansien oikea piirtojärjestys.
- Koko sarja 3932 testiä: 3919 PASS, 13 SKIP, 0 FAIL.
- Kaksoisavaimet, niputus, savukevartio ja nimiöpäällekkäisyydet PASS.
- Päivitetty 24 asennon kuvasarja katsottu: suu näkyy ja kirjan kansi on ulospäin.
- Itsenäinen katselujulkaisu valmistellaan erilliseen `ravelius/pulun-eleet`
  -repoon. Lähdehaara ja pelin julkaisu pysyvät erillisinä.

Omistajan jatkopalaute: **kirja on hyvä**, eli tämä kirjan versio hyväksyttiin.
Suuta pyydettiin vaaleammaksi ja kieltä näkyviin. Sisäosa on nyt lämmin
roosanruskea, kieli vaaleampi ja alaleuka vain sen alapuolinen reunus:
ensimmäisen kokeilun alaleuka peitti kielen. Kirjaan ei tehty jatkomuutoksia.

## Viides ehdotus: kiireinen kirjanhaku

Omistajan erillisestä pyynnöstä lisättiin `uusi-bookPanic`, 9,8 s:
neljä nopeaa sivunkääntöä kirja ylösalaisin ja kuusi lentävää hikipisaraa;
pysähdys ja havahtuminen; katse sivulle, pieni viheltävä suu ja nuotit;
kirjan kääntö oikeinpäin; yksi harkittu sivunkääntö ja arvokas loppuasento.
Vihellys on tässä vaiheessa visuaalinen, katselusivu on äänetön.
Kannen ATLAS-teksti tekee kirjan suunnan näkyväksi.

Ele on erillinen viides painike Uudet versiot -ryhmässä. Sen lopussa
Pulu jää ryhdikkääksi. Se ei ole satunnainen tai jatkuva idle-ele eikä
sitä vielä kytketä peliin. Hyväksytty rauhallinen kirja säilyy.
Neljä aiempaa versiota verrattiin ennen lisäystä tallennettuun committiin
98307d72e: 404 SVG-asentoa (101 per ele) täsmäsivät tavulleen.
Uusi regression tarkistaa tarinan vaiheiden järjestyksen, näkyvät pisarat
ja nuotit, sivunkääntöjen tauon peittelyn aikana sekä kirjan jatkuvan käännön.

### Liioiteltu toinen kierros

Omistajan tarkennus korvasi ensimmäisen sähläyskoreografian: seitsemän nopeaa
sivunkääntöä syvässä kyyryssä, alle 200 ms läimäys kiinni, suoristautuminen
hyvin pitkäksi, noin 2,9 sekunnin hidas kirjan kääntö vihellellen, kirjan
avaaminen ja vasta sitten siivellä silmälasien oikaisu. Kesto nyt 11 s.
Kansi pysyy suljettuna koko käännön. Painotus on klassisen piirretyn
ihmismäisessä näyttelemisessä, ei realistisessa lintuanatomiassa.

Tervehdyksen toinen siipi nousee nyt pään yli. Nokan aukko leikkaa takana
olevan posken pois, joten suusta näkyy taustaa läpi; kieli ja lämmin kurkku
jäävät takaosaan. Ei ihmishuulia eikä hampaita.
Hyväksytty rauhallinen kirja, nyökkäys ja havahtuminen tarkistettiin taas:
303 SVG-asentoa täsmää edelleen tavulleen committiin 98307d72e.

Viimeisen kierroksen testit: 3933 yhteensä, 3920 PASS, 13 SKIP, 0 FAIL.
Kohdesarja 8/8 PASS; kaksoisavaimet, niputus, savukevartio, nimiöt ja
diff-check PASS. Kyyry, suljettu kirja ja vihellys, lasien oikaisu sekä
tervehdyksen suu ja ylös nostettu siipi tarkistettu lähikuvista.
