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
1b. ~~Kalusteet syvillä tasoilla~~ — **ratkaistu** (luku 6e,
   omistajan päätös 30.8.2026 "vain uloimmille tasoille"): valtamerten
   nimet ja kompassiruusu piirretään vain tasoille z0–z2 ja ne on
   mitoitettu uudestaan niiden mukaan.
2. **Syvyyskäyrät oikeasta datasta** — päätetty myöhemmäksi eräksi.
3. **Vinjetointi pelitilakerroksessa.** Se ei tule laattoihin
   (luku 6b), ja Raamattu listaa sen pelin ohueen pelitilakerrokseen.
   Jos sitä ei siellä vielä ole, se on oma tehtävänsä — ei tämän erän.
