## 6.11. 22.54 omistajan vaalea viiva, jäännös 3 (mittaa22-24.py, tee_levyt7u.py). Ei leivontaa, karttaa, vientiä.
Juova tunnistettu projektiolla (virhe noin 15 px): pala 3-1, V4_kivireunus, sivu (241,38; -112,06)-(258,53; -111,65), normaali +z. Pinta on olemassa, materiaali oikea, UV0 u 247-264, v = y, 1:1. Eli tällä kivellä tekstuurin puute EI selity UV:lla. Kamera näkee sivun 4-5 asteen kulmasta (2,5 m ylhäällä, 0,35 m sivusta): 0,24 m:n kivi on 10-16 px leveä. Sama juova levyt7:ssä ja 7b:ssä, väri ei valokartasta. Hypoteesi, ei todistettu: terävä kulma ja karkea mip-taso litistävät kuvan.
Löydös: samalla jalustalla päätysivut (n +x, -x) u lähes vakio (0,44 m / 5,7 m). Koko alueella kivireunus-sivuja, joilla u ei etene: 2 830 kolmiota, 3 514 m2 (u oikein 10 537 m2); levyt6:ssa sama, uudessa listassa 1 515 m2. Ei syntynyt levyt7:ssä.
Korjaus koejuureen koejuuri-levyt7u vain jäännös 3:n jalustalle ja B:n etu- ja takasivulle: u = metrit pituussuuntaan. Muut 3 514 m2 odottavat PT:n rajausta. Kuvat aja-levyt7r.zsh (levyt7), aja-levyt7u.zsh (levyt7u), sama 9 kameraa, vuoro JU:lta.

## 6.11. 23.2x kuvat-levyt7v katsottu (valokartta tasainen; jakokuva kuvat-pari-levyt7v, täysikoossa).
Jäännös 3: kiila ja raita poissa tasaisella valolla, eli syy on valokartta tai valo-UV. Pienet tummat pisteviivat taempana jäävät, eli eivät valokartasta. Vaalea juova ennallaan molemmissa.
B: laikku ennallaan tasaisella valolla ja heijastus pois; väri sama pikselin tarkkuudella heijastuksella ja ilman.

## 6.11. 23.5x kuvat-levyt7s, 7r, 7u katsottu; pari kuvat-pari-levyt7u (rajaukset täysikoossa). Ei leivontaa, karttaa, vientiä.
KORJAANTUI 7u: B:n etu- ja takasivu sekä jäännös 3:n länsipääty: venynyt kuva -> kivet ja saumat. Täysikoon rajaus B-etusivu.
JUOVA: suorista kuvista 3-1:n sivulla on kivikuva ja saumat jo ennen korjausta, joten tekstuurin puute kumoutuu tällä sivulla. Alkuperäisestä kamerasta kivi on 4-5 asteen kulmassa eikä kuva erotu; 7u ei muuta tätä.
OMISTAJAN SELITYS PÄTEE muihin sivuihin: 7u:n venyneet sivut olivat kuvattomia.
EPÄONNISTUNEET KAMERAT: j3-paaty-ita (seinän väärällä puolella), B-takakulma (rakennuksen sisällä).
LAIKKU: B-oikea-sivu (rajaus-B-laikku-oikealta): jalustan päällä pilarin vieressä, ei sivussa. Sileä, ei saumoja, reuna kaareva. Kolmio on suora ja sen materiaali vaihtui levyt6 -> levyt7 (kivireunus -> lattia), laikku ei muuttunut. Syy auki; hypoteesi: joku muu kohde tai varjostimen kuvio. Sijoitus-JSON:ista ei löytynyt kohdetta tästä pisteestä (vain koordinaattilistat haettu).
KOKO KOEJUURI: koejuuri-levyt7k (tee_levyt7k.py): sama sääntö kaikille paloille, 6 596 kolmiota, 4 711 m2 (laajempi rajaus du/L <= 0,9 kuin 3 514 m2:n du/L < 0,1). Vain lod0. Kuvat aja-levyt7p (levyt7) ja aja-levyt7k, vuoro JU:lta.

## 7.11. 23.54 PT: lisäkamerat 7p/7k: j3-alkup-kamera, B-takakulma uudesta paikasta (-86,5; 2; 431,5). Itäpääty EI kuvattavissa: x 258,6 on seinän x 258,1-259,1 sisällä (mittaa27.py), joten sitä ei voi nähdä mistään kamerasta.
Juova, yritys 1 (mittaa28.py, kuvat-levyt7r): sivun 3-1 kirkkaus L p50 151 / 151 / 147 / 145 kulmissa 5 / 20 / 32 / 41 astetta, eli vaaleus on kiven oma väri, ei kulman vika. Vaihtelu p10-p90 18 / 27 / 29 / 24: 5 asteessa noin kolmanneksen pienempi. Kulma-mip siis osittain tuettu, ei todistettu.

## 07.11. 00.02 kuvat-levyt7p ja 7k katsottu; pari kuvat-pari-levyt7k (2 rajausta täysikoossa, muut arkilla pienennettynä). Ei leivontaa, karttaa, vientiä.
KORJAANTUI: kohta-0-2 (täysikoossa), B-takakulma (täysikoossa), kohta-0-3 ja j3-paaty-lansi (arkilla): vaakajuovainen kuva -> kivet ja saumat. A-koko, C-koko1: ei muutosta näkyvissä pienennettynä. Kohta-1-1 ja 1-4: kamera ei osunut kiveen, ei näytä mitään.
LAIKKU: näkyy B-takakulmassa myös takaa, vaalea violetti kaista jalustan päällä, reuna kaareva pilarin ympäri; sama 7p:ssä ja 7k:ssa. Syy auki, aamun kysymys KK:lla.
JUOVA, yritys 2: aja-levyt7z.zsh: sama kamera ja 5 asteen kulma, kuvakulma 20 ja 10 astetta. Jos kivi ja saumat erottuvat, syy on pikselikoko ja kulma; jos eivät, kulma-mip kumoutuu.

## 07.11. 00.03 PT: pystysaumat pelikameralta, 1-1 ja 1-4 kuvattava (mittaa29.py). Kohta 1-1: sivu x -228,35 on 15 cm:n raossa toista kiveä vasten, ei näy mistään kamerasta. Kohta 1-4: edellinen kamera seinän sisällä; uudet kamerat. Ajo aja-levyt7m.zsh (koejuuri-levyt7k, 6 kuvaa), vuoro JU:lta.

## 07.11. 00.11 JUOVA, yritys 2, kuvat-levyt7z katsottu (zoom 20 täysikoossa pienennettynä, zoom 10 rajaus). Sama 5 asteen kulma, 2-8 x pienempi pikseli: kivikuva näkyy pituussuuntaan venyneenä, ja sauma erottuu ohuena viivana yläpäässä; lattia vieressä terävä. Tulkinta: kuva on olemassa, ja jyrkkä kulma litistää sen; kulma-mip ei ole pääsyy eikä sitä voi sulkea kokonaan pois. Vaaleus on kiven oma väri (yritys 1). Ei geometria-, UV- eikä valokarttavikaa. Ei korjausta. Sivulöydös: 7z:ssä näkyvät kiila ja raita (valokartta), tunnettu.

## 07.11. 00.12 OIKAISU kohta 1-1 (mittaa30.py, z -258): "ei näy mistään" oli väärin; sitä ei mitattu ylhäältä. Kivien välissä x noin -228,54..-228,27 ei ole vaakapintaa ollenkaan, ei lattiaakaan; sivut x -228,5 ja -228,35 ovat vastakkain, ja korkeampi sivu (y 0,24-0,55) voi näkyä yläviistosta. Oma vika: kapea rako ilman pohjaa, tällä poikkileikkauksella. Pituutta ei mitattu, ei kuvattu, ei korjattu.

## 07.11. 00.13 OIKAISU 2 kohta 1-1 (mittaa31.py, kaikki palat): reikää ei ole. Edellinen mittaus luki vain palan 1-1; lattia y 0 tulee palasta 1-0. Rako on kolo: z noin -261,5..-256,5, noin 5 m, leveys 12-17 cm, pohja lattia y 0, reunat y 0,24 ja 0,55. Ajo 7m oli jo käynnissä, joten kolosta ei ole kuvaa; näkyvyys ja pääsy pelaajalle ei mitattu. Ei korjattu.

## 07.11. 00.13 kuvat-levyt7m katsottu (6 kuvaa arkilla, rajaus täysikoossa peli-0-2). Kohta-1-4-suoraan: kivet ja saumat, korjaus näkyy. Kohta-1-4-kuja: kamera liian lähellä seinää, ei tietoa. Kohta 1-1 kuvaamatta. Sivuhuomiot, alkuperä mittaamatta: peli-B pilarissa tumma ristiviiva; peli-0-2-kauempaa vaalea pienkiviraita; peli-A valkoinen raita muurin vierellä.
