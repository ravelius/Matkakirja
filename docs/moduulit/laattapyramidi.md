# Laattapyramidi — mittaussuunnitelma ja siirtymä

*(Linjaus: Raamattu › "YKSI MAAILMANBITTIKARTTA - MAALEHDISTA
LUOVUTAAN" (omistaja 30.8.2026), "LAATTAPYRAMIDI JA KARTAN PATINA"
(29.8.2026) ja "BITTIKARTTA VAIHEET 2-3, MITATUT RAJAT". Tämä
dokumentti kertoo vain MITEN — ristiriidassa Raamattu voittaa.
Työkalu: tools/generoi-laattapyramidi.mjs · sisältö:
tools/fokuskartta/sisalto.mjs · moottori:
tools/fokuskartta/maailmapiirto.js · peli: js/laattapyramidi.js ·
savuke: tools/savukkeet/savuke-laattapyramidi.mjs.)*

Omistajan sanatarkka vaatimus: *"koko maailma on kokoajan yksi iso
bittikartta josta vain ladataan kulloinkin tarvittava palanen,
riippumatta siita onko maailma paalla vai ei? Maailma nappi pitaisi
vain ja ainoastaan rajoittaa miten pitkalle pelaaja voi panoroida
kartalla."*

**Kaikki luvut on MITATTU 30.8.2026** tässä kontissa (Chromium
/opt/pw-browsers/chromium, yksi säie), ellei niitä ole merkitty
arvioksi. Mittausajot luvussa 10.

---

## 1. Lukitut mitat

Omistajan päätökset, eivät tämän työn johtopäätöksiä. Työkalu kantaa
ne vakioina ja tämä ajo todensi ne laskennallisesti.

| Asia | Arvo | Todennus |
| --- | --- | --- |
| Projektio | Miller, leveys 12000 = 360°, lon0 −175, pohjoinen 76 | muuttumaton |
| Kartta-ala | **84 °N … 66 °S** (sama kuin yleislehdellä) | y −611,31 … 5811,41 ✓ |
| Arkki laattoineen | kartta-ala + atlaskehyksen marginaali | y **−1046,31**, korkeus **7307,72** ✓ |
| Tiheys syvimmällä | 7,2 px / lautayksikkö | = 240 px/aste = 4 px/kaariminuutti ✓ |
| Syvin taso | 86 400 × 52 616 px | 12000·7,2 ja 7307,72·7,2 ✓ |
| Tasoja | 8, kerroin 2 (675 → 86 400 px) | ✓ |
| Laatta | 512 × 512 | ✓ |
| Laattoja syvimmällä | 169 × 103 = 17 407 | ✓ |
| Laattoja yhteensä | **23 340** | ✓ |
| Korkeusdata | 3 kaariminuuttia kaikilla tasoilla | = 0,05° ✓ |
| webp-laatu | 0,9 | ✓ |

Korkeusdatan perustelu: ETOPO1:n natiivi 1′ on tässä mittakaavassa
kohinaa varjostuksessa (varjo lasketaan naapuriruutujen EROSTA), ja
keskiarvoistava harvennus on alipäästösuodatin — pehmeämpi pinta, ei
köyhempi. Syvimmällä tasolla yksi korkeussolu on 12 × 12 kuvapikseliä.
Tarkempi ajo on myöhemmin pelkkä `--kaariminuutit`-arvon muutos samalle
laattaruudukolle.

### Origo EI siirtynyt, vaikka arkki kasvoi

Tämä oli suurin yksittäinen riski arkin vaihdossa, ja se osoittautui
olemattomaksi. Projektion vakiot ovat koskemattomat, joten:

- **y = 0 on yhä 76. leveyspiiri.** Todennettu: `lautaLat(0)` = 76,0000.
- **Jokainen esilaskettu piste on entisellä paikallaan.** Todennettu:
  Ateena laudan y-arvolla 1882 on 37,9699 °N, kuten ennenkin.
- Vain KUVAN laatikko alkaa laudan yläpuolelta, eli sen y on
  negatiivinen (−1046,31) — täsmälleen kuten yleislehdellä jo oli.

**Mekaanista muunnosta ei siis tarvittu mihinkään**: js/fokusmitat.js,
packien `laudat.maailmankartta` x/y ja kaikki merkkien koordinaatit
ovat koskemattomia. Merkin ja maaston suhde on todennettu savukkeella
(P5a: vierekkäisten laattojen väliin ei jää rakoa; sisältö piirretään
samasta laudan koordinaatista kuin maasto).

## 2. Tasotaulu ja mitatut koot

| z | leveys × korkeus px | px/yks | sar × riv | laattoja | Mpx | tavua/px | koko taso |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 675 × 411 | 0,056 | 2 × 1 | 2 | 0,3 | **0,307** | 0,09 Mt |
| 1 | 1 350 × 822 | 0,113 | 3 × 2 | 6 | 1,1 | **0,300** | 0,33 Mt |
| 2 | 2 700 × 1 644 | 0,225 | 6 × 4 | 24 | 4,4 | **0,288** | 1,28 Mt |
| 3 | 5 400 × 3 288 | 0,450 | 11 × 7 | 77 | 17,8 | **0,265** | 4,71 Mt |
| 4 | 10 800 × 6 577 | 0,900 | 22 × 13 | 286 | 71,0 | **0,238** | 16,90 Mt |
| 5 | 21 600 × 13 154 | 1,800 | 43 × 26 | 1 118 | 284,1 | **0,220** | 62,44 Mt |
| 6 | 43 200 × 26 308 | 3,600 | 85 × 52 | 4 420 | 1 136,5 | 0,202 … 0,226 | 230 … 257 Mt |
| 7 | 86 400 × 52 616 | 7,200 | 169 × 103 | 17 407 | 4 546,0 | 0,186 … 0,211 | 847 … 959 Mt |
| | | | | **23 340** | **6 061** | | **1,16 … 1,30 Gt** |

**Lihavoidut tavua/px-luvut on mitattu koko maailmasta** (z0–z5, 1 513
laattaa, **85,75 Mt**, patina `taysi` + sisältö + ladonta, q0,9). z6 ja
z7 on mitattu Kreikan alueelta — maapainotteinen eli **yläraja**;
alempi luku on mitatun sarjan oma trendi (suhde 0,92 tasoa kohti).

**Koko: 1,16–1,30 Gt**, ja luku on kasvanut mittaus mittaukselta
tunnetuista syistä:

| vaihe | koko | mikä muuttui |
| --- | --- | --- |
| lukittu arvio | ~690 Mt | — |
| mittaus 1 (ei patinaa, q0,82, 76 °N arkki) | 122–166 Mt | mitattu |
| mittaus 2 (q0,9, 84 °N arkki + kehys, sisältö) | 207–314 Mt | +laatu, +14 % korkeutta, +sisältö |
| **mittaus 3 (patina `taysi`)** | **1,16–1,30 Gt** | **+patina** |

**Patina on kolme neljäsosaa koko pyramidin koosta.** Syy on
rakenteellinen: patinan rae, kuitu ja rosoisuus ovat korkeataajuista
kohinaa, ja kohina on juuri se mitä kuvanpakkaus ei voi pakata. Se myös
poistaa aiemman ilmaisen edun — ennen patinaa tavua/px puolittui joka
tasolla (0,307 → 0,061), patinan kanssa se laskee enää 0,92-kertaisesti
(0,307 → 0,220), koska rae ei harvene tason mukana.

R2:n ilmaisraja on 10 Gt, joten 1,3 Gt mahtuu — mutta se ei ole enää
merkityksetön luku, ja se on hyvä syy tehdä patinan mittakaavapäätös
(luku 6b) ennen täysajoa: syvät tasot ovat 94 % tavuista.

## 3. Generointinopeus ja täysajon kesto

| tapa | Mpx/s | laattaa/s |
| --- | --- | --- |
| laatta kerrallaan, ei patinaa | 0,44 | 1,74 |
| lohko 4 × 4, ei patinaa | 1,17 | 4,67 |
| **lohko 4 × 4 + patina `taysi`** | **0,44** | **1,62** |

Lohkopiirto on ~3× nopeampi kuin laatta kerrallaan. Patina syö sen
edun kokonaan takaisin: se on oma täysi pikselikierroksensa (itse
asiassa useita) koko lohkon yli.

Reunus lisää työtä 9 % (mitattu: 414,7 Mpx piirrettyä 380,6 Mpx:n
tuloksesta).

**Koko maailman täysajo: 6 061 Mpx + 9 % reunusta / 0,44 Mpx/s =
4,2 h yhdellä säikeellä.** Viidellä agentilla noin 50 min.

Aineiston keruu on 1,6 s välimuistista ja ~50 s kylmänä. Pysyvän
sisällön keruu on alle sekunnin.

## 4. Pysyvä sisältö laatoissa

Raamattu (omistajan täsmennys 29.8.2026): *"kaikki reittipisteet ja
kaupungit yms voidaan piirtaa suoraan yhteen karttaan, eika tarvita
muita kikkoja kuin rajoitettu liikkuvuus"*. Sisältö poltetaan siis
laattoihin **ennen täysajoa**, jottei pyramidia ajeta kahdesti.

> **Tämä luku kuvaa tilanteen ennen 30.8.2026 iltaa.** Omistajan päätös
> samana päivänä siirsi NIMIÖT ja niiden MERKIT laatoista peliin —
> laattoihin jäävät joet ja reitit. Ks. **luku 6g**, joka on tältä osin
> tätä lukua uudempi ja voittaa sen; alla olevat kynnykset ja määrät
> pätevät yhä, mutta niiden koti on nyt `js/karttanimet.js`.

Mitattu kooste (tools/fokuskartta/sisalto.mjs):

| laji | määrä | lähde |
| --- | --- | --- |
| kaupungit | 261 | maailmankartta.js `cities` |
| reitit | 408 | `edges` |
| lentoreitit | 71 | `airRoutes` |
| joet (polyviivat) | 123 | maailmankartta-nimet.js |
| järvet | 38 | samasta |
| vuoret | 52 | samasta |
| kohteet | 197 | fokuskohteet-*.js (22 maata) |

Kaikki koordinaatit ovat **laudan yksiköitä**, eikä mitään projisoida
uudelleen — juuri siksi merkit osuvat laattoihin pikselilleen.

### Merkinnät mitoitetaan RUUTUUN, eivät karttaan

Tämä on kohta, jossa pyramidi eroaa yhden arkin lehdestä, ja se tehtiin
ensin väärin, mitattiin ja korjattiin.

Moottorin kalusteet kerrotaan `S`:llä, jolloin ne ovat saman kokoisia
KARTALLA joka tasolla — kehys ja kartussi kuuluvat juuri niin.
**Nimiö ei kuulu**, eikä rannikon viiva tai paperin rae kuulu: ne
osoittautuivat samaksi viaksi ja korjattiin luvussa 6d (tämä luku
väitti 30.8. aamulla toisin). Peli valitsee tason ruudun tarkkuuden mukaan
ja katsoo laattaa noin 1:1, joten `koko · S` pikseliä on `koko · S`
LAITEPIKSELIÄ ruudulla: 14 pikselin nimi olisi uloimmalla tasolla
1,5 px (näkymätön) ja syvimmällä **189 px** (absurdi). Ensimmäinen
toteutus teki juuri sen.

Nimiöt, pisteet ja viivat mitoitetaan siksi laitepikseleinä (`S`
jaetaan pois), jolloin ne ovat aina samankokoisia ruudulla ja kattavat
sitä pienemmän maa-alan mitä lähemmäs zoomataan — kuten kartan kuuluu
käyttäytyä.

### Yleistys

Kynnykset ovat px/lautayksikkö ja johdettu **nimiötiheydestä**: 261
kaupunkia jakautuu W pikselin maailmalle noin W/16 pikselin välein, ja
60 pikselin nimi tarvitsee vähintään sen verran. z3 (5400 px) antaa
330 px, z2 (2700) 170 px ja z1 (1350) enää 84 px.

| laji | kynnys px/yks | huom |
| --- | --- | --- |
| pääjoet | 0,11 | kaikki joet 0,45 |
| kaupunkipisteet | 0,11 | vain isot; kaikki 0,22 |
| reitit, lentoreitit | 0,22 | |
| vuorisymbolit | 0,22 | pienemmät 0,45 |
| isojen kaupunkien nimet | 0,22 | kaikki nimet 0,45 |
| vuorten ja järvien nimet | 0,45 | korkeusluku 0,9 |
| kohteet | 0,9 | |

## 5. Atlaskehys

Toteutettu Raamatun kuvauksen mukaan uloimman tason näkymään:
kermanvalkoinen paperimarginaali (232 ja 240 px 6400 px:n viitearkilla
= 435 ja 450 lautayksikköä), ohut kaksoisviivakehys kulmakorein,
kartussi "MATKAKIRJA — Unohdettu aarre" kaiverrustyylillä,
painajanrivi "Painettu Matkakirjan kustantamossa MDCCCLXXIII" +
huomaamaton © Matkakirja, kompassiruusu eteläiselle Tyynellemerelle ja
mittakaavajana.

Kompassiruusu ja valtamerten nimet ovat kartan alalla eivätkä
marginaalissa, ja ne piirretään vain uloimmille tasoille (luku 6e);
muut kalusteet ovat arkilla joka tasolla.

**Kehys on arkilla joka tasolla, ei vain uloimmalla.** Mitat
skaalautuvat `S`:llä, joten kehys on kaikilla tasoilla saman kokoinen
kartalla — vain terävämpi syvemmällä. Jos marginaali olisi vain
uloimmalla tasolla, arkin korkeus vaihtelisi tasoittain eikä
laattaruudukko olisi enää pyramidi.

**JÄÄMERI-nimiö (80,5 °N) mahtuu nyt mukaan**, koska kartta-ala yltää
84 °N:ään.

## 6. Meri

### Vesiviivoitus pois

`tools/patina.mjs` `VESIVIIVOITUS = null`. Syy on rakenteellinen eikä
säätökysymys: viivat piirretään **rantaetäisyydestä eivätkä
syvyydestä**. Ne näyttävät syvyyskäyriltä mutta eivät kerro syvyydestä
mitään — mannerjalustan reuna, syvänmeren hauta ja keskiselänne saavat
kaikki saman samankeskisen viivaston. Koneisto (`VESIVIIVAT_TIHEA`,
`VESIVIIVAT_HARVA`) jää koskemattomana tallelle.

### Litistys 0,20 → 0,70

Litistyksen ainoa peruste oli **lehtien saumat**: 23 lehden otoksessa
oman meren keskisävy vaihteli L=199,9…211,2, ja ilman voimakasta
litistystä naapurilehtien avomeri asettui eri sävyyn. **Pyramidissa ei
ole saumoja**, joten peruste katosi ja sen mukana syy hukata 80 %
syvyyssignaalista.

### Syvyysramppi silotettiin — ja ensimmäinen yritys mitattiin vääräksi

Banding **on taite, ei portaiden vähyys**. Mitattuna vanhasta rampista
syvän meren (alle −200 m) pahin gradientin taite oli **6,9 sävyä /
1000 m**, koska väliä −120…−5000 m kannatteli neljä lineaarista jaksoa.

Ensimmäinen korjaus — kymmenen käsin asetettua välipistettä — mitattiin
ja **hylättiin: se pahensi taitteen 12,3:een**, koska jokainen
silmämääräinen piste tuo oman taitteensa. Tilalle tuli monotoninen
kuutiollinen interpolointi (Fritsch–Carlson) alkuperäisten seitsemän
ankkurin läpi, näytteistettynä 25 metrin välein (201 pistettä).

| | portaita | kokonaiskontrasti | pahin taite (alle −200 m) |
| --- | --- | --- | --- |
| vanha | 7 | 42,0 sävyä | 6,94 sävyä / 1000 m |
| käsin tihennetty (hylätty) | 17 | 42,0 sävyä | 12,31 |
| **monotoninen kuutio** | 201 | **42,0 sävyä** | **1,84** |

Lisäksi todennettu: ramppi on monotoninen (0 nousevaa askelta 0…−5000
m) ja kulkee ankkurien kautta 0,55 sävyn tarkkuudella.

### Mitä tämä EI vielä tee — kerrottava havainto

**Pyramidin generointiputki ei aja patinapassia lainkaan.**
`tools/patina.mjs` on erillinen jälkikäsittely, jonka
`.github/workflows/patinoi-fokus.yml` ajaa valmiille lehdille. Siksi:

- syvyysrampin silotus **vaikuttaa pyramidiin heti** (se on
  piirtomoottorissa),
- vesiviivoituksen sammutus ja litistyksen nosto **eivät vaikuta
  pyramidiin lainkaan** — ne muuttavat vain vanhaa lehtiputkea.

Raamattu vaatii patinan poltettavaksi laattoihin. Patinapassin
liittäminen pyramidiin on siis oma tehtävänsä, eikä sitä tehty tässä
erässä (kulukuuri). Mitattu sivuvaikutus: pyramidin meren sävyn
vaihteluväli (p05…p95) on nyt 11 sävyä R-kanavalla; se on hillitty
mutta ei tyhjä.

Varsinaiset syvyyskäyrät (marching squares kiinteillä syvyyksillä) ovat
myöhempi oma eränsä, eikä niitä tehty.

## 6b. Patina laattoihin

Raamattu vaatii patinan poltettavaksi laattoihin. `tools/patina.mjs` on
nyt **sekä työkalu että moduuli** (`AJETAAN_SUORAAN`-vartio): pyramidi
ajaa SAMAN reseptin samasta tiedostosta, ei kopiota. Tiedoston oma
sääntö — *"reseptiolio on yhdessä paikassa eikä hajallaan koodissa"* —
pysyy siis voimassa.

Passille lisättiin kolme valinnaista parametria, joita ilman se
käyttäytyy sanasta sanaan kuten ennen:

| parametri | merkitys |
| --- | --- |
| `koko` | arkin mitat, kun kuva on vain pala siitä — `s` lasketaan siitä |
| `pikselit` | valmis ImageData sisään (ei PNG-kiertoa lohkoa kohti) |
| `palauta: 'pikselit'` | pikselit ulos; laatat pakataan vasta lohkon leikkauksen jälkeen |

**Resepti: `taysi`** (omistajan päätös 30.8.2026) — mukana rosoisuus,
kohdistusheitto ja leviäminen, jotka Raamatun tyyliohje nimeää.
`taitteet: false` ja `vinjetti: null` kaikilla tasoilla.

### Mikä meni laattoihin ja mikä ei

| osa | laattoihin? | miksi |
| --- | --- | --- |
| sävyt, sävykäyrä, muste, kerma | **kyllä** | pikselikohtaisia |
| paperin syy, rae, klimppi | **kyllä** | faasi arkista (`faasiX/Y`) |
| ikääntymisen laikku | **kyllä** | mittakaava ja faasi laudalta (`maailmaX/Y`) |
| meren litistys | **kyllä** | tavoite on kiinteä globaali sävy |
| reunakertymä, rosoisuus, kohdistus, leviäminen | **kyllä** | paikallisia; reunus kattaa naapuruston |
| **vinjetointi** | **EI** | säteittäinen termi on KEHYS: jokainen laatta on laudan pala, ja vieretysten ladottuna kehyksistä tulisi ruudukko meren päälle. Kuuluu pelin ohueen pelitilakerrokseen ruutuavaruudessa (Raamattu). `vinjetti: null` kaikilla tasoilla jo ennestään. |
| **taitejäljet** | **EI** | toteutus hylättiin 29.8. (*"näyttävät feikiltä"*); koodi jää lipun taakse |
| **vesiviivoitus** | **EI** | omistajan päätös 30.8.: ei pohjaudu oikeaan dataan (luku 6) |
| `IKAANTYMINEN.reunapaino` | **0** | sama säteittäinen ongelma kuin vinjetillä; ei palautettu |

### Jatkuvuus: reunus, ja yksi mittaamalla löytynyt vika

Lohko piirretään **reunuksen verran isompana** ja laatat leikataan sen
sisältä, jolloin paikalliset operaattorit näkevät oikeat naapurit myös
laatan reunalla. Reunus on **32 px joka tasolla** (`8 · ceil((9 · 1 +
16) / 8)`) sen jälkeen, kun jokainen paikallinen operaattori on
paperivakio (luku 6d). Sitä ennen se johdettiin tason mittakaavasta ja
oli z7:llä 144 px, koska rantavyö oli 7 · 13,5 = 95 px. Kahdeksan
monikerta pitää patinan pienennetyt kentät (J4, J8) samassa kohdassa
joka lohkolla.

**Mittaus paljasti vian, jota ei olisi huomannut katsomalla:** patinan
pikselikohtainen rae ja dither luettiin *lehden omasta* pikselistä.
Lehdelle se oli oikein (naapurilehti on eri paperi), mutta laatoissa se
antoi JOKAISELLE laatalle täsmälleen saman kohinakentän — rakenteeton
kohina muuttuu rakenteeksi, kun se toistuu 512 pikselin ruudukossa.
Mitattuna **52 % kanavista erosi**. Nyt avain on arkin pikseli.

### Kaksi eri saumakoetta — ja vain toinen kertoo tuotannosta

| koe | mitä vertaa | tulos |
| --- | --- | --- |
| `--saumatesti` | 1024 px:n kangas vs. neljä 512 px:n kangasta | z3 pahin 97, muut ≤ 19 |
| **lohkoraja** | kaksi VIERELLISTÄ samankokoista lohkoa | **z0–z2 ja z6–z7 pahin 0; z3–z4 pahin 3; z5 pahin 18** |

Ensimmäinen on ankarampi kuin tuotanto: selaimen viivan- ja
kirjasinrasterointi riippuu hitusen kankaan KOOSTA, joten erikokoiset
kankaat eroavat vaikka syöte olisi sama. Tuotannossa kaikki lohkot ovat
saman kokoisia ja niiden nurkat eroavat vain kokonaisella
pikselimäärällä — ja kokonaispikselin siirto on rasteroinnille
täsmällinen. **Lohkoraja-koe mittaa juuri sen tilanteen**, ja sen
mukaan laattojen väliin ei jää saumaa.

### Hinta

Patina hidastaa generoinnin **1,17 → 0,44 Mpx/s** (2,7-kertainen) ja
kasvattaa tavut noin 2,6-kertaisiksi (patinan kohina pakkautuu
huonosti). Molemmat päivitetyt luvut ovat luvussa 2 ja 3.

### Patinan mittakaava syvillä tasoilla — ratkaistu luvussa 6d

Kohdistusheitto ja leviäminen skaalautuivat `s`:llä eli olivat saman
kokoisia KARTALLA joka tasolla: 2,6 px → 18 px (z6) → **35 px** (z7),
ja leviäminen 2 px → 14 → **27**. Nähtynä (Peloponnesos, z7,
VERTAILUPALA) `taysi` maalasi koko mantereen sateenkaaren värisiksi
läiskiksi. Ne irrotettiin `s`:stä 30.8., ja **muut passit seurasivat
30.8. iltapäivällä** — koko luokitus on nyt luvussa 6d.

## 6d. Paperivakiot ja karttavakiot — mitattu ja korjattu

*(Raamattu, "PAPERIVAKIOT JA KARTTAVAKIOT". Mitattu 30.8.2026 tässä
kontissa; laatat verrattu tuotannon ämpäriin ja lähtötila todettu
tavulleen samaksi ennen mittausta.)*

Kohdistusheitto ja leviäminen olivat vain kaksi tapausta laajemmasta
vikaluokasta. Sama virhe oli **koko piirtoketjussa**: yleislehden
moottorissa `S = arkin leveys / 6400` on yhden arkin lehdellä pelkkä
TARKKUUSKERROIN (sama kartta tarkempana, katsotaan kutistettuna) mutta
pyramidissa MITTAKAAVAKERROIN (sama arkki isompana, katsotaan 1:1).
Kaikki, mikä oli kerrottu `S`:llä, kasvoi siis tasoittain ruudulla.

**Korjaus:** moottori ja patina saavat valinnaisen `paperiS`-asetuksen
(`P` moottorissa, `sp` patinassa), joka on **oletuksena sama kuin `S`**
— vanhat lehtityökalut eivät muutu. Pyramidi antaa `paperiS: 1`.

| luokka | mitä | mistä |
| --- | --- | --- |
| **PAPERI (P)** | rannikon kaksi vetoa, järven viiva, asteverkon viiva, paperin kuitu/rae/laikku, akvarellin pigmentti, hypsometrian ja meren kohinan kudos, leikatun reunan tummennus ja häivytys | painojälki: kaivertajan kynä ja paperin kuitu eivät tiedä mitä mittakaavaa lehti esittää |
| **PAPERI (P)**, patina | rosoisuus, paperin syy/rae/klimppi/warp, rantaviivan suojavyö (`rantaVali`), taitteet, vesiviivoitus (pois päältä), kohdistus + leviäminen (jo 30.8.) | sama peruste |
| **KARTTA (S)** | rannikon MUOTO, hypsometria, rinnevarjostus, ikääntymisen laikku | maastoa ja maailmaa; tarkentuu tasoittain kuten pitääkin |
| **ARKIN GEOMETRIA (S)** | kehyksen marginaali `kehys.yla/ala` | määrää laattaruudukon — lukittu mitta, ei saa muuttua |
| **ARKIN KALUSTEET (S)** | kaksoisviivakehys, kartussi, mittajana, painajanrivi, kompassiruusu, valtamerten nimet | ladottu arkin mittoihin; **kaksi viimeistä myös piirretään vain uloimmille tasoille, ks. luku 6e** |

### Mitattu: rannikon musteen leveys laatassa

Mediaani yhtenäisen mustejakson pituudesta (L < 120) laatan riveiltä ja
sarakkeilta, Ateenan seutu ja Länsi-Afrikka:

| taso | S | ennen | jälkeen |
| --- | --- | --- | --- |
| z0 (koko maailma 675 px) | 0,105 | 1 px, rannikko käytännössä näkymätön | 2 px, rannikko ja asteverkko näkyvät |
| z3 (5 400 px) | 0,84 | 1 px | 1 px |
| z6 (43 200 px) | 6,75 | **11 px** | 1 px |
| z7 (86 400 px) | 13,5 | **19–23 px** | 1 px |

Silmällä: z7 oli tummanruskeaa vyötä, jossa saaret olivat läiskiä ja
maasto litteä vaalea pesu; nyt z7 on sama kartografia kuin z6, vain
lähempää. **Uloin taso parani samalla korjauksella toiseen suuntaan:**
z0:lla viiva oli 0,12 px eli näkymätön, ja mantereet sulivat mereen.

### Hinta ja hyöty

| | ennen | jälkeen |
| --- | --- | --- |
| tavua/px z6 (Ateenan otos) | 0,222 | 0,247 |
| tavua/px z7 (Ateenan otos) | 0,217 | 0,248 |
| koko pyramidi (skaalattu tasotaulusta) | 1,16…1,30 Gt | **noin 1,32…1,48 Gt** |
| reunushukka z7:llä (lohko 4 × 4) | 30 % (reunus 144 px) | **6 % (reunus 32 px)** |

Tavut kasvavat, koska paperin rae on nyt joka tasolla yhtä hienoa eikä
harvene tason mukana — rae on korkeataajuista kohinaa, jota
kuvanpakkaus ei voi pakata. Vastaavasti reunuksen kutistuminen vähentää
piirtotyötä syvimmillä tasoilla noin viidenneksen. R2:n ilmaisraja on
10 Gt, joten 1,5 Gt mahtuu yhä.

### Sauma todennettu uudestaan

`--saumatesti` kaikilla kahdeksalla tasolla korjatulla koodilla ja
32 pikselin reunuksella:

| taso | lohkoraja (tuotannon koe) | ankara saumatesti |
| --- | --- | --- |
| z0–z2 | 0 | 0 |
| z3 | 6 | 6 (**ennen 97**) |
| z4 | 3 | 2 |
| z5 | 22 | 22 (ennen 20) |
| z6–z7 | **0** | **0** |

Erot ovat hajallaan vektorien reunapehmennyksessä eivätkä kasaudu
laattarajalle (z5: 49 eroavaa kanavaa 6 224:stä on rajalla), ja
työkalun oma saumavaroitus ei lauennut. Ankara koe **parani z3:lla
97:stä 6:een**, koska erikokoisten kankaiden rasterointiero syntyi
juuri paksuista viivoista.

### Vanhat lehdet: no-op, todennettu

| todiste | md5 ennen | md5 jälkeen |
| --- | --- | --- |
| `tee-yleislehti --leveys 1600` | `2179b10e…` | `2179b10e…` |
| `patina.mjs --taso taysi` samalle kuvalle | `93468202…` | `93468202…` |

Molemmat ovat tavulleen samat: yhden arkin lehdellä `paperiS` puuttuu,
jolloin `P = S` ja `sp = s`.

## 6e. Merten nimet ja kompassi: vain uloimmille tasoille

*(Omistajan päätös 30.8.2026, kysymyskortti: **"Vain uloimmille
tasoille."** Perustelu sanatarkasti: valtamerten nimet ja kompassiruusu
piirretään vain kun koko meri on näkyvissä, ja lähemmäs zoomatessa ne
katoavat — se on painetun atlaksen oma tapa, sillä valtameri nimetään
kerran maailmankartalla eikä jokaisella lehdellä, ja kompassiruusu
kuuluu arkin kalusteisiin eikä maastoon. Toteutus:
maailmapiirto.js osiot 7–8, koot generoi-laattapyramidi.mjs MERET ja
KOMPASSI. Kaikki alla oleva on mitattu 30.8.2026 tässä kontissa.)*

Tämä oli luvun 6d ainoa avoimeksi jäänyt kohta, ja se **ei ollut
pelkkä kynnys**: sama kaluste oli väärin molemmissa päissä.

Vanhoilla koolla mitattuna (kirjainkorkeus = versaalin todellinen
korkeus selaimen `measureText`istä, ei kirjasinkoko):

| kaluste | z0 (uloin) | z2 | z7 (syvin) |
| --- | --- | --- | --- |
| TYYNIMERI, kirjaimen korkeus | 1,8 px | 7,2 px | **229 px** |
| ATLANTIN VALTAMERI, koko nimi | 37 px | 148 px | **4 725 px eli 9,2 laattaa** |
| kompassiruusun ulkokehä | 35 px | 138 px | **4 419 px eli 8,6 laattaa** |

Syvimmällä laatta Tyynenmeren nimen kohdalla oli kokonaan kirjainten
sisällä ja kompassin kohdalla kokonaan ruusun navan sisällä (molemmat
katsottu). Uloimmalla nimi oli parin pikselin sumua.

### Kynnys on mitattu, ei valittu tunnelmalla

Kriteeri on omistajan **"koko meri on näkyvissä"**, ja se mitattiin
merimaskista: kunkin nimiön kohdalta käveltiin itään ja länteen
rantaan asti (alle 2 asteen saaret siedettiin). Meren oma leveys
laitepikseleinä:

| meri | z1 | z2 | z3 |
| --- | --- | --- | --- |
| Tyynimeri | 619 | 1 238 | 2 476 |
| Jäämeri | 626 | 1 251 | 2 502 |
| Intian valtameri | 306 | 611 | 1 222 |
| Atlantti | 310 | 619 | 1 239 |
| Eteläinen Atlantti | 252 | 504 | 1 008 |

Peli katsoo valittua tasoa noin 1:1 **laitepikseleinä**
(js/laattapyramidi.js `valitseTaso` saa `skaala · dpr`), joten näkymä
on puhelimella 1 170 ja työpöydällä 1 440–3 024 laitepikseliä leveä.
Tasolla z2 jokainen nimetty meri mahtuu näkymään kaikilla näillä
laitteilla; z3:lla Tyynimeri ja Jäämeri ovat jo kaksi ruudullista.
**Raja kulkee siis z2:n ja z3:n välissä**, ja se on koodissa samassa
yksikössä kuin muutkin yleistyskynnykset (kuvapikseliä lautayksikköä
kohti): `KALUSTEIDEN_YLARAJA = 0,3`, kun z2 on 0,225 ja z3 on 0,45.

Sama luku on generoi-laattapyramidi.mjs:ssä umpimeren karsintaa varten
(`umpimeriSavy` ehto 4 koskee vain kalustetasoja) — kaksi kopiota, ja
ne on pidettävä samana.

### Koot mitoitettiin uudestaan sen mukaan, missä ne piirretään

Nimet ja ruusu **pysyvät kartan mittakaavassa (`S`)**: nimi kuuluu
merelle, jonka se nimeää, ja kasvaa sen mukana, jolloin sen osuus
merestä on joka tasolla sama eikä tason vaihtuminen näy nykäyksenä.
Laitepikselimitoitus olisi rikkonut uloimman pään pahemmin kuin korjannut
(z0:lla nimi ylittäisi koko altaan). Koska syvät tasot jäävät nyt pois,
uloin pää saatiin korjattua suurentamalla — ja suurennoksen ylärajan
kertoo avovesi nimen ympärillä:

| nimi | puolikas leveys | lähin ranta | täyttöaste |
| --- | --- | --- | --- |
| ATLANTIN VALTAMERI | 9,85° | 23,5° (Länsi-Afrikka) | **42 %** |
| ETELÄINEN ATLANTTI | 8,39° | 32,1° | 26 % |
| INTIAN VALTAMERI | 8,57° | 36,1° | 24 % |
| JÄÄMERI | 3,43° | 12,8° | 27 % |
| TYYNIMERI | 5,69° | 60,3° | 9 % |

Tiukin on Atlantti. 80 %:n täyttöaste antaa kertoimeksi **1,9**, ja se
on todennettu myös silmällä: 1,9:llä nimen ja Afrikan rannikon väliin
jää selvä rako, 2,2:lla viimeinen I osuu rannikkoon. Kaikki koot on
siksi kerrottu 1,9:llä, jolloin typografinen hierarkia säilyy
(Tyynimeri suurin).

**Kompassilla on oma mittansa**: lähin maa ruusun keskipisteestä on
14,1° (Pitcairnin saaret) ja nykyinen ulkokehä 9,2°. Kerroin **1,5**
vie kehän 13,8°:een eli juuri avoveden sisään; 1,9 veisi sen
17,5°:een, jolloin kehä kulkisi saarten yli.

### Lopputulos tasoittain

| taso | maailma px | TYYNIMERI, kirjain | ATLANTIN VALTAMERI, koko nimi | kompassin halkaisija | piirretään |
| --- | --- | --- | --- | --- | --- |
| z0 | 675 | 3,4 px | 71 px | 52 px | kyllä |
| z1 | 1 350 | 6,8 px | 141 px | 104 px | kyllä |
| z2 | 2 700 | **13,5 px** | **282 px** | **207 px** | kyllä |
| z3 | 5 400 | (27,0) | (564) | (414) | **ei** |
| z4–z7 | 10 800–86 400 | (54–432) | (1 128–9 026) | (829–6 629) | **ei** |

Katsottu: z2 on nyt luettava maailmankartta, jossa jokainen meri on
nimetty ja ruusu on kunnon kaluste; z1 on luettava (ennen paria pikseliä
sumua); z0 on peukalonkynnen kokoinen eikä siinä ole luettavaa mitään —
sen kartografia on muutenkin 2 pikselin rannikkoa (luku 6d) eikä peli
valitse sitä (maailmanäkymä osuu z1:een tai z2:een, ks. yllä).
Syvimmältä tasolta molemmat laatat ovat nyt tyhjää ulappaa paperin
rakeineen.

Lohkorajakoe kaikilla kahdeksalla tasolla, sama otos kuin luvussa 6d
(ilman patinaa, koska muutos koskee vain vektorikerrosta): **z0–z2, z6
ja z7 pahin 0**, z3–z5 muutama hajapikseli vektorien
reunapehmennyksessä (pahin 34) — sama lähtötilanne kuin ennen
muutosta, mitattuna erikseen samalla kokeella `origin/main`-versiolla.

## 6f. Atlaskehyksen tekstit: sama vika, sama ratkaisu

*(Sama vikaluokka kuin luvussa 6e, havaittu sen yhteydessä. Toteutus:
maailmapiirto.js osio 9. Mitattu 30.8.2026.)*

Kartussi, mittakaavajana ja painajanrivi olivat **kaikki kerrottu
S:llä**, eikä kukaan ollut päättänyt niin — se on jäänne siitä, että
S tarkoitti kerran vain tarkkuutta. Mitattuna z7:llä:

| kaluste | z0 | z2 | z7 |
| --- | --- | --- | --- |
| MATKAKIRJA, kirjainkorkeus | 3,3 px | 13,1 px | **419 px** |
| MATKAKIRJA, koko sana | 41 px | 164 px | **5 256 px eli 10,3 laattaa** |
| painajanrivi | 53 px | 213 px | **6 805 px eli 13,3 laattaa** |
| mittakaavajana | 84 px | 337 px | **10 780 px eli 21,1 laattaa** |

### Kaksi eri asiaa samassa marginaalissa

**Paperi ja kaksoisviiva ovat joka tasolla.** Marginaalin korkeus on
arkin geometriaa (luku 5) eikä sitä saa muuttaa, ja kaksoisviiva on
kartan reuna, jonka kuuluu näkyä myös silloin kun pelaaja panoroi
laidalle syvässä zoomissa.

**Kartussi, jana ja painajanrivi seuraavat luvun 6e kynnystä.**
Peruste on Raamatun oma sanamuoto atlaskehyksestä: *"kaukaisimmalla
zoomtasolla kartta makaa paperilla … Poltetaan uloimman tason
laattoihin"*. Ne kertovat mikä ARKKI tämä on, ja arkkia katsotaan
kokonaisena vain uloimmilla tasoilla — syvällä pelaaja katsoo seutua,
ei lehteä.

### Koot ja rivivälit mitoitettiin uudestaan

Kun kalusteet piirretään vain z0–z2:lle, ne on mitoitettava sen
mukaan. Vanhoilla koolla ne olivat siellä missä niitä oikeasti
katsotaan liian pieniä: z2:lla painajanrivin kirjainkorkeus oli 5,9 px
ja **mittakaavajanan lukema 4,2 px** — mittavälineen lukema, jota ei
voi lukea.

Kerroin on yksi luku kaikille (`TEKSTIKERROIN = 1,8`), jotta
kartussin ladonta ja alamarginaalin rivijako säilyvät. Ylärajan
kertoo tiukin kaluste: kartussin laatikko (980 × 150 · S) ja
alamarginaalin nelirivinen pino.

**Riviväliä oli pakko kasvattaa samalla, ja se löytyi katsomalla:**
ensimmäisellä yrityksellä vain kirjasin kasvoi, jolloin janan lukemat
ja painajanrivi melkein koskettivat toisiaan samalla kun marginaalin
alapuolisko oli tyhjä. Rivivälit lasketaan nyt samasta kertoimesta, ja
pino päättyy noin 176 · S:ään, kun marginaalia on 240 · S.

| kaluste | kirjainkorkeus z1 | z2 | ennen z2 |
| --- | --- | --- | --- |
| MATKAKIRJA | 11,7 px | 23,5 px | 13,1 px |
| Unohdettu aarre | 6,5 px | 13,0 px | 7,2 px |
| janan lukema | 3,8 px | 7,6 px | 4,2 px |
| painajanrivi | 5,3 px | 10,6 px | 5,9 px |

Katsottu: z2:n ja z1:n ylämarginaali (kartussi luettava, laatikko ei
ahtaudu), z2:n alamarginaali (jana, lukemat, painajanrivi ja ©-rivi
omilla riveillään), z3:n ylämarginaali (pelkkä kerma ja kaksoisviiva,
kuten leikatun atlaslehden reuna) ja z7:n alamarginaali (meri,
kaksoisviiva, kerma — ei jättiläiskirjaimia).

### Mittajanasta: se on tarkka vain tason omassa mittakaavassa

Janan PITUUS on oikein — `kmPerPikseli` lasketaan päiväntasaajan
kierroksesta ja tason omasta tiheydestä, ja 5 000 km on tasan 5 000 km
sen tason kuvapikseleissä. **Ruudulla se ei silti pidä paikkaansa**,
koska asiakas valitsee lähimmän tason ja skaalaa kuvaa: mitattuna
kerroin on 0,708 … 1,413, joten "5000 km" on ruudulla oikeasti
3 538 … 7 066 km eli enimmillään **41 % pielessä**.

Tämä on täsmälleen se vika, jonka takia `js/fokusmitat.js` on
olemassa (omistaja 25.8.2026: *"Mittajana valehteli heti kun pelaaja
zoomasi… Mittakaava on kuitenkin ruudun ominaisuus, ei kuvan"*), ja
peli piirtää jo oman ruutuun ankkuroidun janansa. Poltettu jana jää
tähän, koska Raamattu listaa sen atlaskehyksen osaksi, ja kynnys
pitää sen niillä tasoilla joilla arkkia katsotaan kokonaisena —
mutta **kahden janan ristiriita on kirjattu Fablelle**
(docs/viesti-fable.md, päätöskysymys A).

### Avoimeksi jäi: kehysviivojen paksuus

Kaksoisviiva piirretään yhä `paksuus * S`, eli z0:lla 0,15 ja 0,32 px
(näkymätön) ja z7:llä 18,9 ja **40,5 px** (leveä ruskea palkki), kun
rannikon kynä on paperivakiona 1,1 px joka tasolla. Viivan PAIKKA on
arkin geometriaa mutta sen LEVEYS on painotyötä, eli luvun 6d säännön
mukaan se kuuluisi P:hen. Ei korjattu tässä erässä: se ei ole tekstiä,
ja se muuttaa ilmeen myös uloimmassa päässä. Kirjattu Fablelle
(päätöskysymys B).

## 6g. Nimet pois laatoista, peli latoo ne (omistajan päätös 30.8.2026)

Kysymyskortilla kolme päätöstä. Ne käsitellään tässä yhdessä, koska ne
ovat sama vikaluokka: **laattaan poltettu asia ei voi tietää, millä
ruudulla sitä katsotaan.**

### 6g.1 Poltettu mittajana pois

Arkille poltettu mittakaavajana oli koko atlaskehyksen ainoa kaluste,
joka väitti jotain **mitattavaa** — ja ainoa, joka ei voinut pitää
väitettään. Asiakas valitsee lähimmän laattatason logaritmisesti ja
skaalaa kuvaa sen jälkeen kertoimella **0,708 … 1,413**
(`js/laattapyramidi.js valitseTaso`). Poltettu jana venyy mukana mutta
lukema pysyy: *"5000 km"* on ruudulla oikeasti 3 538 … 7 066 km, eli
enimmillään **41 % pielessä**.

Jana on poistettu. Pelin oma, ruutuun ankkuroitu jana
(`js/fokusmitat.js laskeMittajana`) jää ainoaksi; se on oikeassa
rakenteeltaan, koska mittakaava on ruudun ominaisuus eikä kuvan.
Kartussi ja painajanrivi jäävät laattoihin — ne eivät väitä mitään
mitattavaa vaan kertovat mikä arkki tämä on.

### 6g.2 Kehysviivat paperivakioksi

Kaksoisviivakehys piirrettiin `paksuus * S`, eli kartan mittakaavassa:

| taso | ohut reunaviiva (1,4) | vahva kehysviiva (3,0) |
| --- | --- | --- |
| z0 | 0,15 px (näkymätön) | 0,32 px (näkymätön) |
| z2 | 0,59 px | 1,27 px |
| z7 | 18,9 px | **40,5 px** |

Luvun 6d sääntö ratkaisee: **painojälki on paperivakio, arkin geometria
on S:ssä.** Viivan PAIKKA on geometriaa, sen LEVEYS on painotyötä.
Leveydet ovat nyt `paksuus * P` — myös kartussin kehykset,
kulmakoristeet ja jakoviiva, samasta syystä.

**Kaksoisviivan väli sai paperivakioisen alarajan** (`6 * P`).
Ilman sitä uloimmilla tasoilla väli (`14 * S` = 1,5…2,9 px) olisi ollut
kapeampi kuin viivat itse, ja hiusviiva ja vahva viiva olisivat
sulaneet yhdeksi noin 3,6 pikselin palkiksi — kaksoisviivaa ei olisi
ollut. Syvemmillä tasoilla geometria on jo suurempi ja voittaa itse.

Todennettu silmällä z0:n laatasta: ennen kehystä ei käytännössä
näkynyt, nyt arkin ylä- ja alareunassa on kaiverretun atlaksen
kaksoisviiva. Se on tarkoitus — juuri uloimmalla tasolla arkkia
katsotaan kokonaisena.

### 6g.3 Nimiöt ja merkit pois laatoista

**Tämä kumoaa nimien osalta linjauksen "kaikki pysyvä poltetaan
laattoihin".** Syy on rakenteellinen eikä työmäärä.

Laatta on sama tiedosto kaikille laitteille eikä tiedä katsojan
pikselitiheyttä. Asiakas valitsee tason luvusta `skaala · dpr`, joten
yksi kuvapikseli on ruudulla noin `1 / dpr` CSS-pikseliä ja poltettu
`k` pikselin nimi on `k / dpr` CSS-pikseliä. Tasoindeksi ei erota
dpr:ää zoomista — **sama taso valitaan sekä "dpr 3 ja kaukana" että
"dpr 1 ja kolme kertaa lähempänä"** — joten yksi luku laatassa ei voi
palvella kahta riippumatonta muuttujaa.

Mitattu pelistä (390×844, sama näkymä, skaala 0,7993):

| | valittu taso | poltetun nimen koko ruudulla |
| --- | --- | --- |
| dpr 1 | z4 (0,9 px/yks) | 10,7 CSS-px |
| dpr 3 | z5 (1,8 px/yks) | **5,3 CSS-px** |

(Lähtökaupungin nimi, ladonnan `koko` 12.) Yleisesti
`koko · skaala / taso.px`, ja koska `taso.px` on √2:n päässä
`skaala · dpr`:stä, 12 pikselin nimi on dpr 3:lla 2,8…5,7 CSS-pikseliä
ja dpr 1:llä 8,5…17,0.

**Mitä laatoista poistuu:** kaupunkien, vuorten ja järvien nimiöt sekä
kaupunkipiste (2,0 / 2,6 px), sen rengas (4,6 px), vuorisymboli
(4–5 px) ja kohderengas (3,2 px).

**Mitä jää:** maasto, meri, rannat, joet, järvet, asteverkko,
atlaskehys, kartussi, painajanrivi, kompassiruusu ja merten nimet.
Myös **reitit ja jokien uomat jäävät**: ne ovat viivatyötä samassa
paperivakioluokassa kuin rannikko, niissä ei ole tekstiä, eikä 602:ta
polyviivaa kannata palauttaa siihen elävään kerrokseen, jonka
purkaminen teki panoroinnista sujuvan (v1365).

#### Miksi merkit lähtevät nimien mukana

Kolme merkkiä, kolme perustetta samasta säännöstä *"piste ja sen nimi
pysyvät samassa suhteessa"*:

- **Kaupunkipiste ja sen rengas** ovat nimen ANKKURI. Ladonta varaa
  pisteen ennen nimiä, jottei nimi peitä toisen kaupungin merkkiä; jos
  piste jäisi laattaan ja nimi lähtisi peliin, varaus ei enää vastaisi
  sitä, mitä ruudulla on.
- **Vuorisymboli** on saman nimiön merkki: sen nimi kirjoitetaan 11
  pikseliä sen alle.
- **Kohderengas lähtee ILMAN korvaajaa.** Kohteilla on jo elävä,
  ruutuun mitoitettu merkki nimineen ja napautusaloineen
  (`js/fokuskohteet.js`) siinä maassa, jossa pelaaja on — poltettu
  rengas oli sen alla toinen, pienempi merkki samasta asiasta. Muualla
  siitä jäi nimetön ympyrä, joka on dpr 3:lla yhden CSS-pikselin
  kokoinen. Kaikkien 197 kohteen tuominen elävään kerrokseen vaatisi
  kaikkien 22 maapaketin lataamisen heti alussa; ne ladataan nyt maa
  kerrallaan.

#### Ladonta siirrettiin, ei keksitty uudestaan

`js/karttanimet.js` on suora käännös generaattorin `__ladonta`-
funktiosta (luku 6c): laudan oma asettelu ensin, sitten neljä
tavanomaista karttapaikkaa, viimeisenä pudotus; tärkeysjärjestys
lähtökaupunki (+8) → lentokenttä (+4) → reittisolmun aste (+0…3);
pisteet varataan ennen nimiä; kaksoisnimen tasokohtainen päätös;
kynnykset nimitiheydestä; leveys mitataan `measureText`illä samalla
kirjasimella jolla piirretään.

**Kolme asiaa muuttui, ja jokainen on korjaus:**

1. **Kynnysten yksikkö on CSS-pikseli**, ei kuvapikseli. Kynnykset
   johdettiin nimitiheydestä, ja sekä nimen leveys että lukukelpoinen
   väli ovat ruudun ominaisuuksia. Työpöydän käytös säilyy, tiheä
   näyttö saa saman.
2. **Kirjasin on pelin oma kartta-antiikva** (`.city-label`in perhe)
   eikä kontin Liberation Serif. Mittaus ja piirto käyttävät samaa
   merkkijonoa, joten törmäystesti pysyy totena.
3. **Ladonta ajetaan kerran ZOOMIA kohti, ei kerran tasoa kohti.**
   Tulos on laudan yksiköissä, joten panorointi ei laske mitään
   uudelleen eikä nimi voi hypätä kartan liikkuessa. Tulos muistetaan
   mittakaavan mukaan.

Vuorisymbolia EI varata (laatoilla ei varattu myöskään). Mitattu:
varauksella jokainen vuoren nimi törmäisi omaan symboliinsa — 296
nimiötä ja 49 pudotettua; ilman varausta sama **345** kuin laatoilla.

#### Kaksoisnimivaara ja se, miten se on hoidettu

v1366 korjasi kaksoisnimen vaientamalla elävän kerroksen. Nyt suunta
kääntyy, ja **laatat vaihtuvat eri aikaan kuin koodi**. Siksi päätöksen
tekee LUETTELO eikä versionumero: `pyramidi.json` kantaa kentän
`nimiot: false`, ja `js/laattapyramidi.js laatoissaOnNimet()` lukee sen.

- vanha luettelo (kenttää ei ole) tai luettelo ei vielä ladattu
  → laatoissa on nimet → **peli vaikenee** (nykytila, ei muutu)
- `nimiot: false` → **peli latoo**

Kumpikaan ei siis voi puhua yhtä aikaa eikä kumpikaan vaieta yhtä
aikaa. Laudan VANHAT nimikerrokset (`.city-label`, `.maastonimi`)
pysyvät hiljaa pyramidilaudalla kuten v1366:sta asti: niissä nimi on
laudan yksiköissä ja kasvaa zoomin mukana.

Savukevartiot: `savuke-laattapyramidi` P6 (nimettömien laattojen päällä
peli latoo, sama nimi vain kerran, nimen korkeus CSS-pikseleinä) ja
`savuke-maailmanakyma` 10a–10d (ilman luetteloa kaikki kerrokset
vaikenevat).

### 6g.4 Mitattu hinta

**Laattojen koko** (pilotti z0–z4, 395 laattaa, sama kone ja sama
aineisto ennen ja jälkeen):

| taso | ennen | jälkeen |
| --- | --- | --- |
| z0 | 0,09 Mt | 0,09 Mt |
| z1 | 0,34 Mt | 0,33 Mt |
| z2 | 1,24 Mt | 1,23 Mt |
| z3 | 4,62 Mt | 4,58 Mt |
| z4 | 17,54 Mt | 17,48 Mt |
| **yhteensä** | **23,83 Mt** | **23,71 Mt (−0,5 %)** |

Säästö on pieni, ja se on odotettu: luku 6d mittasi jo, että tavuista
valtaosa on paperin raetta — korkeataajuista kohinaa, jota
kuvanpakkaus ei voi pakata. Nimet ovat sen rinnalla ohutta mustetta.
Koko pyramidissa (1,32…1,48 Gt) tämä on noin 7 Mt.

**Nimien määrä** (ladonta koko laudalle; ruudulla 390×844):

| skaala (CSS-px/yks) | ladottu | pudotettu | ruudulla |
| --- | --- | --- | --- |
| 0,799 | 307 | 6 | 29 |
| 1,198 | 342 | 3 | 12 |
| 1,797 | 345 | 0 | 5 |
| 2,696 | 345 | 0 | 3 |
| 4,044 ja yli | 345 | 0 | 1 |

Vertailu laattoihin: z2 62, z3 297 (19 pudotettu), z4 344 (7), z5 350
(1), z6–z7 351 (0). Samat luvut samassa suuruusluokassa — ero tulee
siitä, että kynnykset ovat nyt CSS-pikseleissä.

**Kehysaika.** Mitattu Chromiumissa (390×844, dpr 3, kolme
edestakaista pyyhkäisyä):

| | ennen | jälkeen |
| --- | --- | --- |
| panoroinnin longtaskit | 0 ms | **0 ms** |
| `paivitaMaastonimet` asettumisessa, mediaani | 0,8–1,1 ms | **1,6–1,8 ms** |
| sama, pahin | 1,5–2,0 ms | 2,2–3,4 ms |
| kylmä ladonta uudelle mittakaavalle | — | 2,0–2,4 ms (pahin 3,5–7,3) |
| SVG-solmuja uloimmassa näkymässä | 2026 | 2091 (+65) |

Hinta on siis **alle millisekunti asettumista kohti** ja kertaluonteinen
2–7 ms uudelle zoomportaalle. Panorointi ei maksa mitään, koska ladonta
ei riipu panoroinnista ja solmuja on kymmeniä eikä satoja — vanha elävä
kerros piti 261 nimilappua puussa aina.

**Silmillä dpr 1, 2 ja 3** (sama näkymä, sama laattakansio): nimiön
ladottu laatikko ruudulla **14,0 CSS-pikseliä kaikilla kolmella**,
ladottujen nimien määrä sama (29) ja paikat samat. Ennen sama nimi oli
10,7 ja 5,3 CSS-pikseliä (dpr 1 / dpr 3).

### 6g.5 Kohdenimiöt samaan ladontaan (omistajan päätös 30.8.2026)

Kysymyskortti, kuvakaappaus Sofiasta: **"Sama ladonta kuin
paikannimillä."** Kohdenimiöt (`js/fokuskohteet.js`) menevät samaan
ruutuavaruuden ladontaan kuin kaupunkien nimet — sama koko, sama
törmäyksenvältely, samat tiheyskynnykset. **Merkit jäävät
napautettaviksi myös ilman nimeä.**

**Vika.** Kun paikannimet siirtyivät laatoista peliin (6g.3), ne saivat
ruutuun mitoitetun koon. Kohdenimiöt jäivät omaan mittaansa, joka ei
ollut kartan mitta lainkaan vaan kahden kertoimen tulo:
`NOSTOSYM_NIMIO_KOKO` 11 × `KOHDE_SYMBOLI_SKAALA` 11/21 = **5,8
CSS-pikseliä** lehden perustasolla. Sofiassa se tarkoitti
toistakymmentä lukukelvotonta nimiötä kaupungin kyljessä, eikä yksikään
pudonnut: väistö tunsi vain kaksi paikkaa eikä yhtään mittakaavakynnystä.

**Miksi ei omaa ladontaa, vaikka sellainen jo oli.** Juuri se oli vika.
Kaksi rinnakkaista ladontaa ei voi ratkaista törmäystä keskenään, koska
kumpikaan ei tiedä toisesta — sama juurisyy kuin kaksoisnimillä (6c.1).
Kohdekerros ILMOITTAUTUU nyt ladontaan (`karttanimet.js
asetaKohdenimet`) ja antaa nimensä merkkien LOPULLISISSA
piirtopaikoissa; riippuvuus osoittaa yhteen suuntaan eikä kehää synny.
Tämä on myös järjestysvaatimus: `paivitaFokuskohteet` ajetaan
`paivitaKarttanimet`in EDELLÄ (js/ui.js paivitaMaastonimet).

**Tärkeysjärjestys, ja sen perustelu.** Kaupungit ladotaan ensin,
kohteet niiden jälkeen, maastonimet viimeisenä.

1. *Kaupungin nimi voittaa kohteen nimen.* Kaupunki on kartan
   perusrakennetta ja pelaajan navigoinnin ankkuri. Kohde on saman
   kaupungin yksityiskohta, ja sen kortti aukeaa merkkiä napauttamalla
   myös ilman nimeä — kaupungin nimen katoaminen ei korvaudu millään.
2. *Kohteen nimi voittaa maastonimen.* Maastonimi on kuvitusta, jota
   kartta latoo koko maailmaan; kohde on pelin omaa sisältöä ja vain
   siinä maassa, jossa pelaaja nyt on.

**Yleistys tulee väljyysvarasta, ei mittakaavakynnyksestä.** Kohteet
ovat kaikki yhden kaupungin ympärillä, ja merkkirypäs
(`js/fokusniput.js`) järjestää ne sarakkeeksi eli tekee niille tilaa.
Pelkkä törmäystesti hyväksyisi ne kaikki joka mittakaavassa. Varaus
tehdään siksi nimeä isompana (`NIMION_VALJYYS_X/Y`, 4 ja 5 CSS-px):
sarake levenee lähennettäessä ja päästää lisää nimiä läpi.

**Nosto.** Kun nimi ei mahdu merkin neljään kylkeen, se nostetaan
lähituntumaan (`NOSTON_PITUUDET` 14 ja 26 CSS-px) ja sidotaan merkkiin
katkoviivalla, jonka paksuus ja katkot ovat CSS-pikseleitä
(paperivakio) eivätkä kartan mittakaavaa. Pidempää nostoa ei ole: se ei
enää kertoisi kenen nimi on kyseessä, ja silloin nimen kuuluu pudota.

**Mitattu** (iPad-mitat 834×1112, tuotannon laatat 2026-08-30b,
pelaaja Sofiassa):

| skaala (CSS-px/yks) | kohdenimiöitä ruudulla ENNEN | JÄLKEEN |
| --- | --- | --- |
| 0,955 (kerros piilossa) | 0 | 0 |
| 1,355 | 18 | **12** |
| 2,710 | 18 | **17** |
| 4,743 | 18 | 17 |
| 9,214 | 18 | 16 |

Nimiön korkeus ruudulla **5,8 → 11 CSS-pikseliä**, ja **dpr 2 ja dpr 3
antavat täsmälleen saman tuloksen** (17 nimiötä, samat paikat) — se on
koko korjauksen ydin, sama kuin 6g.3:ssa.

**Merkit todennettu napautettaviksi** ilman nimeä: samassa näkymässä
ruudulla oli 6 nimetöntä ja 17 nimellistä merkkiä, ja jokainen kokeiltu
nimetön merkki avasi korttinsa.

**Samalla kertaa** (omistajan pelitesti Ateenasta): rypään
yhdysviiva kevennettiin (paksuus 1,2 → 0,8, himmeys 0,42 → 0,3, katko
2,6 → 2,0) ja sarake tuotiin lähemmäs kaupunkia (`NIPPU_DX` 37 → 28).

## 6h. Rantaviiva ja maaväri samasta vektorista

*(Omistajan havainto iPadilta 30.8.2026: "Ääriviiva ja korkeus väritys
eivät täsmää." Mitattu ja korjattu samana päivänä. Koodi:
tools/fokuskartta/maailma.mjs `meriRenkaat` ja maailmapiirto.js
"VEKTORI ON AUKTORITEETTI".)*

Vika oli rakenteellinen: **rantaviiva piirrettiin Natural Earthin
10m-vektoreista, mutta maa/meri-jako luettiin korkeusruudukosta**
(3 kaariminuuttia = 5,5 km solussa) ja sen merimaskista. Kaksi
lähdettä, kaksi tarkkuutta, eivätkä ne voineet olla samaa mieltä.

### Mitattu ennen korjausta

Kummankin lähteen maa/meri-vastaus laskettiin TÄSMÄLLEEN samoille
kuvapikseleille kuin moottori ne laskee, ja verrattiin. "Siirtymä" on
kuvarivillä mitattu etäisyys vektorin rantaviivan ja moottorin
värinvaihdoksen välillä; "vuoto" on erimielisen pikselin etäisyys
rantaviivaan.

| alue | z5 | z6 | z7 | vuoto enimmillään | eri-% (z7) |
| --- | --- | --- | --- | --- | --- |
| Egeanmeri | 1,0 px | 2,5 px | **5,5 px** | 21 px | 3,8 % |
| Länsi-Afrikka (sileä rannikko) | 4,0 px | 3,5 px | **13,0 px** | 11 px | 1,4 % |
| Norja (vuonot) | 20 px | 40 px | **yli 40 px** | 48 px | 10,5 % |
| Chile (saaristo) | 22 px | 32 px | **yli 40 px** | 23 px | 12,3 % |

Kilometreinä ero pysyy suunnilleen samana (2–40 km eli murto-osasta
muutamaan ruudukkosoluun), joten **pikseleinä se kaksinkertaistuu joka
tasolla** — juuri siksi omistaja näki sen vasta lähikuvassa.
Egeanmeren otoksessa **9 saarta 29:stä jäi kokonaan ilman maaväriä**:
pelkkä ääriviiva meren päällä.

### Korjaus

Vektori kertoo MISSÄ maa on, korkeusruudukko vain KUINKA KORKEALLA se
on. Meren monikulmion renkaat kulkevat nyt moottorille asti, ja maa ja
meri erotetaan juovapyyhkäisyllä samoista kärkipisteistä, joista
rantaviiva piirretään: `rannikot` JOHDETAAN samasta harvennetusta
rengasjoukosta, joten viiva ja täyttö eivät voi ajautua erilleen.

Miller-projektiossa kuvarivi on tasan yksi leveyspiiri ja sarake tasan
yksi pituuspiiri, joten maski voidaan laskea suoraan kuvan
tarkkuudella ilman välirasteria.

**Reunatapaukset ratkesivat ilman uusia sääntöjä**, koska värit oli jo
kummassakin päässä leikattu:

| tapaus | mitä tapahtuu |
| --- | --- |
| matala rannikkomeri, jonka ruudukko luulee maaksi (+m) | `lerpSyvyys(m >= 0)` → matalin merisävy |
| vuono tai salmi, jota ruudukko ei näe | sama matalin merisävy |
| saari, jonka ruudukko luulee mereksi (−m) | `Math.max(0, m + …)` → hypsometrian alin sävy |
| kuiva maa merenpinnan alla (Kuollutmeri, Kaspian alanko, Qattara) | ei meren monikulmiossa → maata, kuten ennenkin |
| Kaspianmeri | ON meren monikulmiossa → vettä, kuten ennenkin |
| järvet ja sisävedet | olivat jo kunnossa: `ne_10m_lakes` piirretään ja täytetään samoista renkaista |

**Merimaski ja korkeusruudukko jäävät** — niitä lukee yhä umpimeren
karsinta (`--harva`) ja maalehtien moottori (piirto.js).

### Hinta — mitattu, ei arvattu

| mitta | ennen | jälkeen |
| --- | --- | --- |
| piirtoaika z6 (Eurooppa, 4x4-lohko) | 10,1 s | 10,3 s (**+2 %**) |
| piirtoaika z7 (Egeanmeri, 4x4-lohko) | 9,7 s | 10,0 s (**+3 %**) |
| tavua/px z6 (webp q0,9) | 0,265 | 0,266 |

Monikulmioleikkaus ei siis moninkertaista piirtoa: juovapyyhkäisy
tehdään kerran koko kankaalle, ja reunat indeksoidaan asteen koreihin
kerran koko ajolle.

## 6i. Joet pehmeinä käyrinä

*(Omistaja 30.8.2026: "Joet eivät mutkittele pehmeästi vaan
kantikkaasti." Koodi: maailmapiirto.js `lautaKaari`.)*

Mitattu jokiaineistosta (123 uomaa, 4 330 pistettä, 4 207 jaksoa):

| taso | jakso mediaani | p90 | pisin |
| --- | --- | --- | --- |
| z3 | 6,0 px | 13,3 px | 55 px |
| z5 | 23,9 px | 53,4 px | 219 px |
| z6 | 47,9 px | 106,8 px | 438 px |
| z7 | **95,8 px** | 213,5 px | 875 px |

Taitteen mediaanikulma on **49 astetta**. Sadan pikselin välein
puolisuora kulma ei ole kaivertajan kynää.

Uomat piirretään nyt **sentripetaalisella Catmull-Romilla
(alpha = 0,5)** kuutiollisiksi Béziereiksi muunnettuna. Käyrä kulkee
jokaisen pisteen KAUTTA, joten uoma ei siirry; alpha 0,5 on
todistetusti silmukaton ja kärjetön, mikä on tässä välttämätöntä,
koska pisin jakso on yli 200-kertainen lyhimpään.

**Jatkuvuus laattarajan yli**: silotus nojaa koko uomaan, ei lohkoon
osuvaan pätkään. `sisalto.joet` on maailmanlaajuinen lista, jota
mikään ei rajaa ennen piirtoa, ja kärjet muunnetaan ARKIN pikseleiksi,
jotka ovat samat joka lohkossa. Ainoa katkos on laudan sauma, joka on
arkin ominaisuus eikä lohkon.

**Rantaviivaa ja järviä EI silotettu, ja se on mitattu päätös:**
harvennettu rantaviiva on z7:llä mediaanina 3,55 px jaksoa kohti
(järvet 3,38) eli 27 kertaa tiheämpi kuin joet — kanttia ei ole. Sitä
paitsi rantaviiva on nyt myös maan ja meren raja (luku 6h), joten
viivan silottaminen täyttöä silottamatta palauttaisi juuri sen eron,
joka korjattiin. Reitit ovat kahden kaupungin janoja.

## 6j. Erikoispiirit ja nollameridiaani, nimettyinä

*(Omistaja 30.8.2026: "Poista pituus ja leveyspiiri viivat. Jätä vain
0 ja päiväntasaaja sekä kääntöpiirit ja napapiiri ja nimeä ne." ja
"Etelän napapiiriä ei tarvita.")*

Tasavälinen 20 asteen asteverkko on poistettu. Jäljelle jää viisi
viivaa, jotka eivät ole ruudukkoa vaan maantiedettä: nollameridiaani,
päiväntasaaja, Kravun ja Kauriin kääntöpiirit (±23,4365 astetta) ja
pohjoinen napapiiri (66,5635 °N).

**Eteläinen napapiiri ei mahdu arkkiin.** Tarkistettu arkin omista
mitoista (`pyramidi.json` `rajaus`: y −611,31, h 6422,72 eli
84 °N…66 °S): 66,56 °S on reunan ulkopuolella. Omistaja vahvisti
ettei sitä tarvita, eikä arkkia kasvateta sen takia.

### Nimet ovat paperivakioita — ja siksi kynnystä ei tarvita

Merten nimillä kynnys (z0–z2) on välttämätön, koska ne skaalautuvat
kartan mukana ja z7:llä ATLANTIN VALTAMERI olisi 4 725 px leveä
(luku 6e). Nämä nimet ovat eri lajia: **ne nimeävät VIIVAN, ja
viivalla ei ole leveyttä, jonka mukaan nimi kasvaisi.** Nimi on siis
pelkkää painojälkeä ja mitoitetaan `P`:llä — 13 px joka tasolla.
Silloin se ei voi kasvaa jättiläiseksi eikä kutistua näkymättömiin, ja
koska nämä viivat kulkevat ruudun poikki joka tasolla, nimi on
mielekäs joka tasolla.

Kynnyksen työn tekee **toistoväli**: nimi toistetaan noin 2 400
laitepikselin välein, jolloin näkymässä (puhelin 1 170 px, työpöytä
1 440–3 024 px) on korkeintaan yksi kappale kutakin nimeä. Määrä
lasketaan ARKIN mitoista, joten se on sama joka lohkossa:

| taso | z0–z2 | z3 | z4 | z5 | z6 | z7 |
| --- | --- | --- | --- | --- | --- | --- |
| nimiä viivaa kohti | 1 | 2 | 5 | 9 | 18 | 36 |

Jokaisella viivalla on oma faasi toistovälin sisällä (0,17 / 0,26 /
0,5 / 0,74), koska samalla faasilla kaikki neljä nimeä asettuisivat
samaan pystysarakkeeseen. Nollameridiaanin päälle osuva kappale
siirretään sivuun oman leveytensä verran — ei jätetä pois, koska
uloimmilla tasoilla kappaleita on vain yksi.

**Nimi on "Nollameridiaani" eikä "Greenwichin meridiaani"**, ja se on
mitta: nimi kulkee pystyviivan vartta, jolloin sen pituus on
korkeutta. 22 merkkiä olisi paperivakiona noin 150 px pystyyn ja
leikkaisi kääntöpiirien nimet; 15 merkkiä ei leikkaa.

## 6k. Reittien nopanheittoaskelmat

*(Omistaja 30.8.2026: "Kaupunkien välissä pitäisi näkyä nopanheitto
askelmat, ei katkoviiva. Lentoreitin punaisella katkoviivalla ja
laivareitit sinisellä niin että noppa askelmat näkyy." Koodi:
tools/fokuskartta/sisalto.mjs ja maailmapiirto.js osio 8b.)*

Reitti ei ole enää jana vaan pelilaudan rata. **Askelmien paikat
lasketaan pelin omilla funktioilla**, ei omalla jaolla: `js/rules.js`
`edgePolyline` rakentaa murtoviivan (merireitin `via`-välipisteet,
maareitin pienen determinististä hajautusta käyttävän mutkan) ja
`pointAlong(poly, idx/steps)` antaa askelman paikan kaarenpituuden
mukaan tasavälein. Jos työkalu jakaisi janan omalla kaavallaan,
laattaan poltettu ruutu ja nappulan pysähdyspaikka eroaisivat — se
olisi pelivirhe eikä ulkoasuvirhe.

| | määrä |
| --- | --- |
| reittejä | 408 (297 maa + 111 meri) |
| lentoreittejä | 71 |
| askelmia yhteensä (`steps`) | 1 526 |
| **piirrettyjä askelmamerkkejä** | **1 118** (steps − 1 reunaa kohti) |

**Merireitti erotetaan pakan omalla kentällä `type === 'sea'`**, joka
on jo olemassa (sama kenttä, jota tools/korjaa-merireitit.mjs
käyttää). Omaa sääntöä ei keksitty.

**Lentoreiteillä ei ole askelmia, eikä se ole työkalun puute:**
`airRoutes`-riveillä on vain `a` ja `b`, ja pelissä lentäminen siirtää
nappulan suoraan perille (js/game.js `actionMannerLento`:
`p.pos = { type: 'city', … }`). Lennolla ei ole ruutuja.

Tästä syntyy sääntö: **muste kertoo kulkutavan, helmet kertovat
askelmat, ja katkoviiva on varattu sille reitille, jolla ei ole
askelmia.**

| reitti | muste | viiva | helmet |
| --- | --- | --- | --- |
| maa | seepia `rgba(120,88,54,…)` | yhtenäinen | kyllä |
| meri | preussinsininen `rgba(32,60,98,…)` | yhtenäinen | kyllä |
| lento | poltettu sinooperi `rgba(150,54,40,…)` | katkoviiva | ei |

Värit ovat aikakauden musteita eivätkä näyttövärejä: preussinsininen
(1706) on kaivertajan vakiosininen ja sinooperi sen punainen,
kumpikin murrettuna niin ettei paperin illuusio rikkoudu.

**Kynnys on reittien oma (`px >= 0,22`), ja se riittää mitattuna:**
askelvälit ovat z2:lla (se taso, jolla reitit ilmestyvät) p10 11,4 px
ja mediaani 17,9 px, joten 2,4 pikselin helmet erottuvat toisistaan
heti ensimmäisellä tasolla, jolla reitti ylipäätään piirretään.

| taso | askelväli p10 | mediaani | p90 |
| --- | --- | --- | --- |
| z2 | 11,4 px | 17,9 px | 35,1 px |
| z4 | 45,4 px | 71,4 px | 140,2 px |
| z6 | 181,6 px | 285,7 px | 560,9 px |

**Sauman yli kulkevat reitit korjaantuivat samalla.** Reitin
murtoviiva on avattu sauman yli (`avaaSauma`), joten sen x voi olla
laudan ulkopuolella; reitti piirretään kolmena kappaleena (−laudan
leveys, 0, +laudan leveys), jolloin Tokio–San Francisco näkyy sauman
molemmin puolin eikä katkea.

## 6l. Sauma näiden neljän muutoksen jälkeen

`--saumatesti` kaikilla kahdeksalla tasolla, sama kone ja sama
aineisto ennen ja jälkeen (pahin kanavaero 0–255):

| taso | ennen (main) | jälkeen |
| --- | --- | --- |
| z0–z1 | 0 | **0** |
| z2 | 0 | 5 |
| z3 | 6 | 6 |
| z4 | 2 | 10 |
| z5 | 22 | **5** |
| z6–z7 | **0** | **0** |

Syvimmät tasot — ne, joita pelaaja katsoo 1:1 ja joilla sauma näkyisi
— ovat yhä tavulleen samat. Väliltä löytyvät erot ovat hajallaan
vektorien reunapehmennyksessä (uudet käyrät, helmet ja nimet
rasteroituvat eri kokoisilla kankailla hitusen eri tavoin), pahin ero
on 10 kanavaa 255:stä eli 4 %, eikä työkalun oma saumavaroitus
lauennut. z5 parani 22:sta 5:een.

## 7. Harva pyramidi — mitattu, päätetty POIS

Karsinta laattamäärästä (`--harva-raja 8`, koko maailma, uusi arkki):

| taso | laattoja pois |
| --- | --- |
| z5 | 7,1 % |
| z6 | 21,5 % |
| z7 | **37,0 %** |

**Mutta tavusäästö on selvästi pienempi.** Mitattu z5:n oikeista
tiedostokoista: 7,1 % laatoista = **4,7 % tavuista**, koska karsittavat
laatat ovat juuri ne, jotka pakkautuvat parhaiten. z7:llä 37 %
laatoista tarkoittaa siis noin 20 % tavuista eli ~29 Mt — kun koko
pyramidi on 207–314 Mt.

Päätös (omistaja/koordinaattori 30.8.2026): **ei oteta käyttöön.**
Perustelut: säästö ~10 % kokonaisuudesta, karsitulta laatalta katoaa
paperin rae (syvimmällä tasolla rakeen solu on parikymmentä pikseliä,
ja tasainen laatta erottuisi rakeisten naapureiden vierestä), eikä peli
voi syntetisoida rakeen tilalle mitään (suodattimet kielletty kartan
kerroksilla, tests/rules.test.mjs). Koneisto jää paikalleen oletuksena
pois (`--harva`, `--harvamittaus`).

## 8. Korkeusasteikko yltää huipulle

Asteikko päättyi 2900 metriin ja `lerpVari` clamppaa ylimpään
portaaseen — kaikki Tiibetistä Andeille oli samaa sävyä. Lisätyt
portaat: 4200 / 5500 / 7000 / 8850 m, ylin pää ikuisen lumen harmaa ja
valkoinen.

**Portaat 2900 ja alle eivät muutu**, joten alle 2900 metrin maasto
piirtyy pikselilleen kuten ennen. **Tämä ei silti tarkoita, että vanhat
lehdet olisivat ennallaan**: jokainen lehti, jossa on yli 2900 metrin
maastoa (Alpit, Himalaja, Andit, Kaukasus), piirtyy eri näköisenä — se
on muutoksen tarkoitus. Todennettu md5:llä
(`d5820eb…` → `7c3fb3d…`). **Jos `patinoi-fokus.yml` ajetaan uudestaan,
js/media.js `FOKUS_VUOSIKERTA` on nostettava.**

## 9. Sauma

`--saumatesti` piirtää saman alueen kerran isona kuvana ja kerran
laattoina ja vertaa raakoja pikseleitä (tiedostovertailu ei kelpaa:
webp-enkooderi ei tuota tavulleen samaa tulosta eri kokoiselle
kuvalle).

- **Ero on tasan 0** kaikkialla, missä kuva on pikselisilmukan tulosta
  (paperi, rae, meri, hypsometria, varjostus). Kohinan, mittakaavan ja
  kehyksen laskenta on **todistetusti jatkuvaa laattojen yli**.
- Ero on 0,04–0,10 % kanavista siellä, missä on **vektoreita**,
  enimmillään 32/255 hiusviivan reunapehmennyksessä. Syy on selaimen
  viivanpiirrossa: vektorikoordinaatit siirrettiin laskettavaksi arkin
  origosta (kokonaisluku-`translate`), ja ero pieneni vain 8 % — mikä
  sulkee kartan kaavat pois.

Lisäksi **kalusteet jatkuvat laatan yli**: kartussin teksti katkeaa
"MATKA" ja jatkuu "AKIRJA" naapurilaatassa.

**Moottorin laattatuki on todistettu oletuspolulla no-opiksi**
(md5 `d5820ebf8548ebbe75e4f8242617e467` ennen ja jälkeen). Todiste
koskee vain laattatukea; korkeusasteikko ja syvyysramppi ovat erillisiä
tarkoituksellisia muutoksia.

## 10. Pilotti ja pelin mittaukset

```
node tools/generoi-laattapyramidi.mjs <kohde> --data <ne-kansio> --tasot 0-5
node tools/generoi-laattapyramidi.mjs <kohde> --data <ne-kansio> \
     --tasot 6-7 --alue 17,33,30,43
```

- **z0–z5 koko maailmasta**: 1 513 laattaa, 85,75 Mt, 933 s.
- **z6–z7 Kreikasta ja lähinaapureista**: 60 laattaa, 3,37 Mt, 124 s.
- Levyllä yhteensä **89 Mt / 1 573 laattaa**, kontin scratchpadissa
  (`scratchpad/pilotti3/`). **Laatat eivät ole repossa.**

**Alueajossa lohko hukkaa työtä reunoilla** (Kreikan ajossa 62 %; koko
maailman ajossa 0 %). Parven osa-alueet on rajattava lohkorajoille.

Selaimessa (savuke, iPhone-profiili 390 × 844 dpr 3, kolme
zoomiporrasta Ateenaan, syvin taso z7):

```
laattoja näkymässä       25
purettu muisti           26,2 Mt
epäonnistuneita hakuja   0
näkyvän palan päivitys   0 ms (alle mittaustarkkuuden)
kehysaika panoroinnissa  p50 16,6 ms · p95 25,1 ms
```

**Muisti laskee, ei nouse:** 26 Mt on samaa luokkaa kuin yksi nykyinen
yleislehti puhelimessa (18 Mt), mutta nyt kartalla ei ole sen lisäksi
neljää maalehteä. Päivityksen kustannus vertautuu vanhan järjestelmän
140–677 ms:iin samassa kohdassa.

**Kehysaika on EMULAATTORILUKU.** Raamattu vaatii mittauksen oikealla
iOS-laitteella.

Pilotti on **kehityslipun takana**: `?pyramidi=1`. **Lippu pois =
oletuspolku ennallaan.** Lippu päällä sammuttaa lehdet kolmesta
portista:

| portti | mitä se sammuttaa |
| --- | --- |
| `atlasPaalla` | atlasryhmä, naapurilehdet, yleislehti |
| `nykyinenMaa` | nykyisen maan lehti |
| `esilammitaFokuspohja` | saapumisen esilataus |

Kolmas löytyi vasta savukkeesta; sitä vartioi väite P2b.

## 10b. Tuotanto: työnkulku, ei konttiparvi

Raamattu: *"Sisältöpäivitys = pyramidin uudelleenajo napista."*
**Työnkulku on se nappi** — `.github/workflows/generoi-pyramidi.yml`.
Kontissa ajaminen olisi umpikuja: R2-tunnukset ovat GitHubin
secreteissä, eivät kontissa, joten siellä generoitu 1,3 Gt ei pääsisi
mihinkään.

Malli on olemassa oleva `patinoi-fokus.yml` (generointi ja
`aws s3 sync` samassa jobissa) ja `vie-fokus.yml`. Secretit ovat samat:
`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`,
`R2_ACCOUNT_ID`.

### Matriisi korvaa parven

| shardi | erä | laattoja |
| --- | --- | --- |
| z0-z6 | tasot 0–6 kokonaan | 5 933 |
| z7a | z7 sarakkeet 0–43 | 4 532 |
| z7b | z7 sarakkeet 44–87 | 4 532 |
| z7c | z7 sarakkeet 88–131 | 4 532 |
| z7d | z7 sarakkeet 132–168 | 3 811 |
| | **yhteensä** | **23 340** ✓ |

Summa täsmää tasotaulun laattamäärään, ja se on tarkistettu ajamalla
jokainen kaista `--kuiva`-tilassa.

**Kaistarajat ovat lohkorajoilla** (sarake jaollinen neljällä), ja se
on mittaustulos eikä siisteyttä: asteilla rajattu alue katkaisee lohkon
keskeltä, jolloin lohko piirretään kokonaan mutta osa heitetään pois —
mitattuna **62 % hukkaa** Kreikan alueajossa, **0 %** koko maailman
ajossa. Sarakerajaus (`--sarakkeet a-b`) osuu lohkorajalle.

**Jokainen shardi synkkaa oman tuotoksensa samassa jobissa.** Jos
tuotos kulkisi artefaktina, yli gigatavu kulkisi verkon yli kahdesti ja
täyttäisi levyn; nyt levyltä vaaditaan enintään yhden shardin osuus
(suurin noin 250 Mt).

**Luettelo on oma jobinsa.** `pyramidi.json` kuvaa KOKO pyramidin, eikä
yksikään shardi tunne muiden tasoja — jos shardit kirjoittaisivat sen,
viimeisenä valmistuva jättäisi ämpäriin luettelon, joka tuntee vain
omat tasonsa. Luettelo syntyy pelkästä geometriasta
(`--vain-luettelo`) ja viedään vasta kun kaikki shardit ovat valmiit.

Samasta syystä **laatasto-bittikartta kirjoitetaan vain harvassa
pyramidissa**: matriisiajossa shardi näkee levyllä vain omat laattansa
ja kertoisi luettelossa, ettei muita ole. Kun karsintaa ei ole,
kenttä on `null` ja peli tulkitsee sen "kaikki olemassa".

### Osoitteet ja välimuisti

```
julisteet/pyramidi/<versio>/z<taso>/<sarake>/<rivi>.webp   immutable, 1 v
julisteet/pyramidi/pyramidi.json                           max-age 300
```

Laatat ovat muuttumattomia, koska versio on polussa; luettelo ei ole,
koska se osoittaa uusimpaan versioon. Peli lukee version luettelosta
ja rakentaa laatan osoitteen siitä (js/laattapyramidi.js).

Julkinen isäntä on `https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/`
(js/media.js `R2_JUURI`), joten viedyt laatat ovat suoraan selaimen
haettavissa — sama reitti kuin lehdillä ja julisteilla.

### Korkeusaineisto tulee reposta, ei NOAA:lta

Ensimmäinen CI-koeajo (33311158965, 30.8.2026) kaatui siihen, ettei
NOAA:n ERDDAP vastannut ajokoneelta lainkaan — `fetch failed` jo
ensimmäisellä kaistalla, kolme uusintaa, **ei HTTP-statusta** eli
yhteystason virhe. Kehityskontista sama osoite vastaa alle sekunnissa,
joten vika on ajokoneen ja NOAA:n välissä eikä korjattavissa koodista.

Omistajan päätös: **yksikään ajo ei saa riippua NOAA:n
tavoitettavuudesta.** Harvennettu ruudukko noudettiin kerran ja se elää
repossa: `tools/korkeusaineisto/etopo-3kaariminuuttia.bin.gz`
(**28,9 Mt**). Se tulee jokaiseen jobiin checkoutin mukana ilman
yhtäkään verkkopyyntöä.

Kovempi uudelleenyritys ei olisi ollut korjaus muutenkaan: viisi
shardia olisi noutanut kukin 104 Mt samasta lähteestä yhtä aikaa.

| muoto | koko | huom |
| --- | --- | --- |
| Float32 raakana | 103,7 Mt | välimuistin entinen muoto |
| Int16 raakana | 51,9 Mt | |
| Int16 + gzip −9 | 39,9 Mt | |
| **Int16 + rivierotus + gzip −9** | **28,9 Mt** | repoon |

Molemmat askeleet ovat häviöttömiä ja mitattuja; häviöttömyys
todennettiin koko aineistolla (25 930 801 solua, 0 eroa).

**Int16 ei menetä mitään**, ja se on todennettu eikä pääteltiin:
`tools/fokuskartta/maailma.mjs` pyöristää arvot Int16:een joka
tapauksessa rakentaessaan arkin ruudukkoa, joten Float32:n desimaalit
katosivat jo ennen piirtoa. Kuusikymmentä laattaa ajettiin uudelleen
repon aineistosta ja verrattiin pikselitasolla vanhaan ajoon:
**60/60 täysin identtisiä, pahin kanavaero 0.**

**Aineistoa ei harvenneta toiseen kertaan.** Tiedostossa on valmis
keskiarvoistettu ruudukko ja `hae-korkeusruudukko.mjs` purkaa sen
sellaisenaan; kaksi kertaa keskiarvoistettu maasto olisi liian sileä ja
hiljainen laatuvirhe. Sama pikselivertailu todistaa senkin: jos
harvennus tapahtuisi kahdesti, laatat eivät olisi identtisiä.

Natural Earth saa jäädä verkkonoutoon, koska se tulee GitHubista, joka
on todistetusti ajokoneelta tavoitettavissa — ja se noudetaan kerran
valmistelujobissa eikä kerran shardia kohti.

Jos joskus halutaan tarkempi ajo, `hae-korkeusruudukko.mjs` osaa yhä
noutaa alkuperäisen yhden kaariminuutin aineiston NOAA:lta; repon
tiedosto ohitetaan automaattisesti, kun pyydetty ruutukoko ei täsmää.

### Aikakatto ja levy

Suurin shardi on noin 1 240 Mpx reunuksineen eli mitatulla 0,44 Mpx/s
nopeudella **noin 47 min**. `timeout-minutes: 330` antaa
seitsenkertaisen varan ja jää GitHubin kuuden tunnin katon alle.
Työnkulku tulostaa `df -h` ennen ja jälkeen, joten ensimmäinen ajo
vahvistaa levytilan mitattuna.

## 11. Siirtymä

**Vaihe 1 — pilotti (tämä erä).** Työkalu, moottorin laattatuki, pysyvä
sisältö, atlaskehys, pelin lataaja lipun takana, mittaukset.

**Vaihe 2 — täysgenerointi parvella.** z7 on 75 % työstä.

| agentti | erä | Mpx | aika @0,44 Mpx/s |
| --- | --- | --- | --- |
| 1 | z0–z6 kokonaan | 1 515 | 63 min |
| 2–5 | z7 neljänä pituuskaistana (43 saraketta / agentti) | 1 137 kukin | 47 min kukin |

Kokonaisaika **noin tunti viidellä agentilla** (reunushukka mukana).
Jos patinan mittakaavapäätös (luku 6b) muuttaa reseptiä, ajo on
tehtävä sen JÄLKEEN — syvät tasot ovat 94 % työstä ja tavuista. Kaistarajat
lohkorajoille (sarake jaollinen neljällä). Laatta ei koskaan riipu
naapurilaatasta, koska kaikki lasketaan arkin koordinaateista.

**Vaihe 3 — vanhan lehtijärjestelmän purku omana eränään.** Purettavat:
js/fokuskartta.js (maalehdet, atlas, yleislehti, lehtivalinta,
esilämmitys, muistipienennys), reunahäivytys (moottorin osio 11),
`bbox`/`rajaus`-kaksoislaatikko, **v1346:n jättilaislehtiväistö**,
per-lehti-resoluutioerot (RUS), js/packs/fokus-grc.js -taulut,
js/media.js `FOKUS_ALIPOLKU`/`FOKUS_VUOSIKERTA`/`fokuskarttaUrl`,
tools/tee-fokuskartta.mjs, tools/tee-yleislehti.mjs,
tools/fokuskartta/maat.mjs, patinoi-fokus.yml, savukkeet
`savuke-fokuskartta`, `savuke-atlas-purku`, `savuke-lehtimuisti`,
`savuke-fokusvirta`, ja ämpäristä `julisteet/fokus/`.

**Maailma-nappi vaiheen 3 jälkeen** ei vaihda karttaa vaan vain
löysentää panorointirajoja.

## 6c. Nimiöiden ladonta ja törmäyksenvälttely

> **Ladonta on siirretty peliin 30.8.2026** (omistajan päätös, luku 6g):
> koodi asuu nyt `js/karttanimet.js`:ssä ja ajetaan kerran ZOOMIA kohti
> ruutuavaruudessa. Kaikki tämän luvun säännöt, kynnykset ja mitatut
> luvut pätevät sellaisenaan — vain yksikkö vaihtui kuvapikselistä
> CSS-pikseliin ja ajopaikka generaattorista peliin.

**Ladonta ajetaan KERRAN TASOA KOHTI koko arkille, ei lohkoittain.**
Se on ainoa kohta putkessa, jossa piirto ei voi olla paikallinen:
törmäyksenvälttely on globaali päätös — se että yksi nimi jää pois,
riippuu siitä mitkä muut on jo asetettu. Lohkokohtaisena kaksi
vierekkäistä lohkoa päätyisi samasta kaupungista eri tulokseen, ja
lohkorajalle jäisi joko kaksoisnimi tai katoava nimi.

Mittaus tehdään samalla moottorilla joka piirtää: kirjaimen leveys
luetaan `measureText`illa samalla fontilla ja harvennuksella. Arvattu
leveys johtaisi joko turhiin pudotuksiin tai päällekkäisyyksiin.

**Laudan oma asettelu on lähtökohta, ei lopputulos.** `la/lx/ly` on
käsin hiottua työtä (nimi ei peitä rannikkoa eikä naapuria), joten sitä
kunnioitetaan aina kun se ei törmää. Vasta törmätessä kokeillaan neljää
tavanomaista karttapaikkaa (oikea, vasen, ylä, ala), ja viimeisenä nimi
**pudotetaan** — se on yleistystä, ei virhe.

**Tärkeysjärjestys** (pelin merkitys voittaa koristeen):
lähtökaupunki (+8) → lentokenttä (+4) → reittisolmun aste (+0…3).
Kaupunkien PISTEET varataan ennen nimiä, jottei nimi peitä toisen
kaupungin merkkiä. Vuorten ja järvien nimet ovat samassa
törmäysjoukossa matalammalla tärkeydellä: kaupunki on pelin kohde,
maastonimi on kuvitusta.

Mitattu, ja tarkistus on riippumaton (kaikki asetetut nimiöt käydään
pareittain läpi ja lasketaan todelliset leikkaukset; ajo kaatuu jos
niitä on):

| taso | nimiötä | pudotettu | **päällekkäisyyksiä** |
| --- | --- | --- | --- |
| z0–z1 | 0 | 0 | **0** |
| z2 | 62 | 0 | **0** |
| z3 | 297 | 19 | **0** |
| z4 | 344 | 7 | **0** |
| z5 | 350 | 1 | **0** |
| z6–z7 | 351 | 0 | **0** |

Pudotusten määrä käyttäytyy kuten yleistyksen kuuluu: tiheimmällä
tasolla (z3, jossa kaikki nimet syttyvät) putoaa 19, ja tila riittää
kaikille z6:sta alkaen. Todennettu myös silmällä Keski-Euroopan ja
Benelux–Ruhrin alueelta.

### 6c.1 Sama nimi vain kerran (kaksoisnimet)

Ensimmäisessä koeajossa z3-laatalla Saharassa **Ahaggar oli kartalla
kahdesti**: kerran vuorisymbolin ja kerran kaupunkipisteen kanssa. Syy
on lähteissä — laudan paikat (`maailmankartta.js`) ja maastonimet
(`maailmankartta-nimet.js`) ovat eri tiedostoja, eikä kumpikaan tiedä
toisesta. Osa laudan paikoista on oikeasti vuoristoja tai järviä.

Sääntö on **yleinen, ei nimilista**: pari on sama normalisoitu nimi
lähekkäin. Mittaus osoitti nimilistan olevan väärä tapa — pareja on
**kuusi, ei kolme**, koska myös järvet kaksintuvat:

| pari | laji | etäisyys (lautayksikköä) |
| --- | --- | --- |
| Titicaca | järvi | 3,8 |
| Appalakit | vuori | 20,3 |
| Tšad-järvi | järvi | 30,3 |
| Tanganjika | järvi | 54,4 |
| Ahaggar | vuori | 95,6 |
| Alpit | vuori | 114,7 |

Normalisointi ansaitsee paikkansa: lauta sanoo *Tšad-järvi*, nimilista
*Tšadjärvi*. Etäisyysraja **400** on vakuutus eikä viritysruuvi — kaikki
rajat välillä 115…6000 antavat täsmälleen saman kuuden joukon.

**Molemmat merkit jäävät, vain nimiö yhdistetään.** Kaupunkipiste on se,
johon pelaaja matkustaa; vuorisymboli kertoo mistä on kyse.

**Päätös on tasokohtainen, ja se perustuu mittaukseen.** Vuorennimen
kynnys on sama 0,45 kuin kaupungin nimen, mutta järven nimi syttyy
vasta 0,9:llä kun tärkeys > 1. Jos kaupungin nimiö vaiennettaisiin
suoralta kädeltä, Titicaca, Tanganjika ja Tšad-järvi jäisivät välillä
0,45…0,9 pisteeksi **ilman nimeä** kokonaisen tason ajan. Siksi
kaupungin nimiö väistää vasta silloin, kun maastonimi oikeasti piirtyy
tällä tasolla.

Kaksoisnimi **ei ole päällekkäisyys** — Ahaggar oli kahdesti satojen
pikselien päässä itsestään, eikä leikkaustesti nähnyt siinä vikaa.
Sillä on siksi oma tarkistuksensa, ja ajo kaatuu jos kaksoisnimi pääsee
läpi. Tarkistus todennettiin pariutus pois kytkettynä: se löysi ja
kaatoi ajon (`ahaggar x2`).

## 12. Avoimet

1. ~~Patinan kohdistusheitto ja leviäminen syvillä tasoilla~~ —
   **ratkaistu**, ja koko vikaluokka sen mukana (luku 6d).
1b. ~~Kalusteet syvillä tasoilla~~ — **ratkaistu** (luvut 6e ja 6f,
   omistajan päätös 30.8.2026 "vain uloimmille tasoille"): valtamerten
   nimet, kompassiruusu, kartussi, mittakaavajana ja painajanrivi
   piirretään vain tasoille z0–z2 ja ne on mitoitettu uudestaan
   niiden mukaan.
1c. ~~Kehysviivojen paksuus~~ — **ratkaistu** (luku 6g): viivanleveys on
   nyt paperivakio kuten rannikon kynä, ja kaksoisviivan väli sai
   paperivakioisen alarajan, jottei viivapari sula yhdeksi uloimmilla
   tasoilla.
1d. ~~Poltettu mittajana vs. pelin oma jana~~ — **ratkaistu** (luku 6g,
   omistajan päätös 30.8.2026): poltettu jana on poistettu laatoista.
   Mittakaava on ruudun ominaisuus, ja pelin oma jana
   (`js/fokusmitat.js`) on ainoa joka osaa mitata.
1e. ~~Nimiöt laitepikseleinä vs. CSS-pikseleinä~~ — **ratkaistu**
   (luku 6g, omistajan päätös 30.8.2026): nimiöt ja niiden merkit
   poistuvat laatoista, ja peli latoo ne ruutuavaruudessa
   (`js/karttanimet.js`).
2. **Syvyyskäyrät oikeasta datasta** — päätetty myöhemmäksi eräksi.
3. **Vinjetointi pelitilakerroksessa.** Se ei tule laattoihin
   (luku 6b), ja Raamattu listaa sen pelin ohueen pelitilakerrokseen.
   Jos sitä ei siellä vielä ole, se on oma tehtävänsä — ei tämän erän.
