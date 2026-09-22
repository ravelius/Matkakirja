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

Kirjan käännön jatkopalaute: pelkkä tasopyörähdys kiinteän keskipisteen
ympäri näytti robottimaiselta. Kääntöön lisättiin ranteen vastaliike,
kirjan nosto rinnan lähelle, kaksi epäsymmetristä kiertoa ja lyhyt
otteenvaihto niiden väliin. Kirja kallistuu syvyyssuunnassa, ja siipi,
sulat sekä vartalo seuraavat omilla viiveillään. Tämä muuttaa vain
kiireisen kirjahaun suljetun kirjan käsittelyä; rauhallinen selaus säilyy.

## Toinen erä: neljä suuta käyttävää nykyistä elettä

Omistaja pyysi jatkamaan nykyisten eleiden elävöittämistä ja suukokeiluja.
Uudet versiot -ryhmän neljä ensimmäistä painiketta ovat nyt:

- Hiljainen naurunpyrskähdys (3,6 s): pidätys, kaksi erikokoista pyrskähdystä,
  sisään- ja uloshengityksen rintaliike, pään jäljessä tuleva siipi suupieleen.
- Valtava haukotus (4,7 s, vanhan yawn-eleen versio): hitaasti kasvava suu,
  raskaat luomet, koko vartalon venytys, pidetty huippu ja pehmeä huokaus.
- Leveä virne (3,2 s): katse ja silmät aloittavat; suu leviää sivulle,
  pää ja rinta kallistuvat taakse, virne viipyy ja palautuu hillitysti.
- Et ole tosissasi (3,8 s, vanhan disbelief-eleen versio): havaintopito,
  nopea nokan loksahdus, pidetty avoin suu, epätasainen siipien kohautus,
  sivusilmäys ja hidas sulkeminen.

Suu ei käy samaa puhetta muistuttavaa sykettä jokaisessa eleessä.
Haukotuksen aukko venyy alaspäin ja virne sivulle. Nokan ja posken maskin
muodot muuttuvat yhdessä. Kieli näkyy kaikissa neljässä, ei hampaita tai
ihmishuulia. Siivet eivät peitä silmiä; naurun siiven asentoa laskettiin
kuvallisen tarkistuksen perusteella. Jalat pysyvät ankkureissaan.

Katselussa on nyt 9 ehdotusta ja 70 alkuperäistä elettä (79 eri valintaa).
Aiemmat viisi ehdotusta säilyivät tavulleen: 505/505 SVG-asentoa vastaa
committia 8782757eb0f1. Pelin js/, ääni, cue, ajoitus ja julkaisu eivät muutu.
Kuvaputkelle ei tule tilauksia. Muutokset ovat yhdessä katselumoduulissa,
kahdessa testitiedostossa ja tässä raportissa.

Varmennus: kohdetestit 9/9, koko sarja 3934 testiä / 3921 PASS / 13 SKIP /
0 FAIL. Kaksoisavaimet, niputus, savukevartio, nimiöt ja diff-check PASS.
24 kuvan asentosarja katsottu. Paikallisessa selaimessa jokaisen uuden
suun kielen näkyvyys tarkistettu osumatestillä; 70 % kohdalta jatko,
390 px ilman vaakaylivuotoa ja selainvirheet PASS.
Itsenäisen sivun julkaisu ja sen jälkitarkistus kirjataan erilliseen
julkaisukuittiin; tämä lähderaportti ei yksin ole kuitti live-julkaisusta.

## Erillinen sarjakuvatyylin kokeilu

Omistaja pyysi ensin sanallisen kuvauksen Aku Ankka -henkisestä versiosta,
sitten kokeilupiirroksen. Suunnaksi kuvattiin suurempi pää, suuret ja
joustavat silmät, venyvä nokka, käsien tavoin näyttelevät siivet ja selkeä
musteääriviiva. Omistajan tarkennukset: Livia on naaras, vielä nuori,
ja saa olla viehättävä; tyttömäistä väriä voi tuoda huivilla.

`uusi-sarjakuvapulu` on erillinen 2,9 sekunnin tervehdyskokeilu gallerian
ensimmäisenä painikkeena. Se käyttää omaa `docs/livia-sarjakuvakokeilu.mjs`
-SVG-piirrosta ja tutun tervehdyksen ajoitusta. Koralliroosan kaulahuivin
solmu pysyy kaulalla, vapaat päät seuraavat siiven jälkiliikettä.
Kyyhkyn harmaansininen väritys, vihreä kaula, vahanahka ja jalat säilyvät.
Suussa on näkyvä kieli ja läpinäkyvä nokkaväli, ei ihmishuulia tai hampaita.
Silmänräpäytys sulkee valkuaiset ja jättää näkyvän luomikaaren; siipi
palautuu suljettuun asentoon ilman katoavaa väliruutua.

Tämä ei ole hahmon vaihtaminen peliin. Vanha Pulu ja aiemmat yhdeksän
katseluehdotusta säilyvät: 909/909 SVG-asentoa täsmää tavulleen committiin
f5d6220999. Ääniä, cueita ja pelin runtimea ei muuteta. Kuvaputkelle ei
tule tilauksia; kokeilu on koodilla piirretty vektori, ei bitmap-kuva.

Kohdetestit 10/10 PASS. Koko testisarja 3935 = 3922 PASS, 13 SKIP, 0 FAIL.
Kaksoisavaimet, niputus, savukevartio, nimiöt ja diff-check PASS.
Kahdeksan asennon kuvasarja katsottu, huivi ja suljetut silmät mukaan lukien.
Itsenäinen katselujulkaisu sisältää uuden moduulin nimetyssä tiedostolistassa;
julkaisun jälkitarkistus ja commitit kirjataan ulkoiseen toimituskuittiin.

### Tyylikokeilun toinen piirros: oma kyyhkyhahmo

Omistajan tarkennus: tarkoitti Pulua yhtenä Aku Ankka -sarjakuvan omana
hahmona, ei Aku Ankkaa muistuttavaa Pulua. Hahmo saisi olla suloisempi
ja viehättävämpi nuori tyttöpulu. Selkeä piirrosjälki oli oikea suunta.

Lyhennettiin leveä nokka terävämmäksi kyyhkyn nokaksi ja pienennettiin
vahanahkaa. Pehmennettiin poskien siluettia ja takaraivon varjoa.
Laskettiin silmien hämmästynyttä vaikutelmaa isommilla iiriksillä,
lempeämmillä luomilla ja kevyemmillä kulmilla. Lisättiin pienet ripset
ja hienovarainen poskisävy. Ei ihmishuulia tai hampaita. Huivi, käden
tavoin moikkaava siipi ja tervehdysrata säilyvät ennallaan.

Sama tyylikokeilupainike päivittyy; ei uutta vertailunäkymää. Edellinen
piirros jää muuttumattomaan julkaisuversioon `cc2bf7a24c35-571733d1`.
Muut yhdeksän ehdotusta: 909/909 SVG-asentoa tavulleen ennallaan.
Kohdesarja 10/10 PASS; rakenteellinen nokka-/ripsivartio sekä selaimessa
mitattu nokan leveys täydentävät kuvallista tarkistusta. Pelin hahmoon,
ääniin tai cueihin ei tehdä muutoksia. Kuvaputkitilauksia ei tarvita.

Lopullinen koko sarja 3935 = 3922 PASS, 13 SKIP, 0 FAIL. Kaikki neljä
repon porttia ja diff-check PASS. Paikallinen selain: 80 valintaa ja
kaikki 10 ehdotusta ajallisena sarjana; nokka, ripset, huivi, kielet,
kirjat, 390 px ja reduced motion PASS, 0 selainvirhettä.

### Hyväksytyn hahmon oma ele: Ihana nähdä!

Omistaja hyväksyi nuoren kyyhkyhahmon ja pyysi sille animoidun eleen.
`uusi-livia-ilahtuu` (4,4 s) on Uudet versiot -ryhmän ensimmäinen painike.
Katse tunnistaa pelaajan ennen muuta liikettä. Lyhyt valmistelu vaihtuu
nopeaan ilahtumiseen: nokka aukeaa ja vartalo hengittää. Siipi painuu
noin puoleksi sekunniksi rinnalle, pää kallistuu lempeästi ja silmät
sulkeutuvat hetkeksi. Sitten siipi irtoaa rinnalta ja nousee tervehtimään.
Toinen siipi pysyy rauhassa. Huivi ja sormisulat seuraavat viiveellä.

Liike käyttää samaa jatkuvaa Hermite-interpolointia: nopeudet säilyvät
saman suuntaisilla avaimilla, valmistelu ja kontaktipito ovat tarkoituksella
eri tahtisia. Rintasiiven kyynärpää ja lyhyempi sulkaviuhka pitävät käden
rinnalla silmien alapuolella. Irrotus kulkee alas ennen ylös nostoa.
Jalat pysyvät maassa; hengitys joustaa vain niiden yläpuolella.
Eleen viimeinen SVG vastaa täsmälleen sen ensimmäistä asentoa.

Hyväksytty piirros ja aiemmat kymmenen ehdotusta säilyvät: 1010/1010
SVG-asentoa tavulleen ennallaan verrattuna committiin `0228e45468b3`.
Kohdetestit 11/11 PASS. Koko sarja 3936 = 3923 PASS, 13 SKIP, 0 FAIL.
Kaksoisavaimet, niputus, savukevartio, nimiöt ja diff-check PASS.
Kuvallinen kahdeksan vaiheen tarkistus ja paikallinen selain: 81 valintaa,
11 ehdotusta ajallisena sarjana, siipi ei peitä silmiä, mobiili 390 px,
vähennetty liike ja 0 selainvirhettä. Julkaisun kuitti kirjataan erikseen.

Ei muutoksia pelin hahmoon, ohjaimeen, audioon, cueihin tai julkaisuun.
Kuvaputkelle ei tilauksia. Tämä on vain itsenäisen katselusivun uusi ele.
