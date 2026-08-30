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

Moottorin muut mitat kerrotaan `S`:llä, jolloin ne ovat saman kokoisia
KARTALLA joka tasolla — rannikon viiva ja paperin rae kuuluvat juuri
niin. **Nimiö ei kuulu.** Peli valitsee tason ruudun tarkkuuden mukaan
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
laatan reunalla. Reunus johdetaan tason mittakaavasta
(`8 · ceil((9s + 16) / 8)`): kiinteä 64 px olisi jäänyt syvimmällä
tasolla rantavyön (7 · 13,5 = 95 px) alle. Kahdeksan monikerta pitää
patinan pienennetyt kentät (J4, J8) samassa kohdassa joka lohkolla.

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

### KERROTTAVA: patinan mittakaava syvillä tasoilla

Kohdistusheitto ja leviäminen skaalautuvat `s`:llä eli ovat saman
kokoisia KARTALLA joka tasolla. Uloimmilla tasoilla se on oikein;
syvimmällä `s` on 13,5, jolloin:

| | viitearvo (6400 px arkki) | z6 | z7 |
| --- | --- | --- | --- |
| kohdistusheitto | 2,6 px | 18 px | **35 px** |
| musteen leviäminen | 2 px | 14 px | **27 px** |

Nähtynä (Peloponnesos, z7, VERTAILUPALA): `taysi` maalaa koko
mantereen **sateenkaaren värisiksi läiskiksi** ja hukuttaa
rantaviivan usvaan. Se ei ole hienovarainen väriripsaus vaan
painovirhe. Työkalu varoittaa tästä ajossa.

**Ehdotus (ei toteutettu — resepti on omistajan päätös):** kohdistus ja
leviäminen ovat PAINOJÄLJEN ominaisuuksia, eivät kartan, joten ne
kuuluvat paperin pikseleihin samalla perusteella kuin nimiöt (luku 4).
Käytännössä `* s` pois kolmesta kohdistusrivistä ja leviämisen säteestä
(tools/patina.mjs). **6400 pikselin lehdille se ei muuta mitään**,
koska niillä `s` = 1. Kokeiltu ja kuvattu: jälki on `keskitason`
kaltainen mutta täyden reseptin rosoisuudella — juuri se, mitä
tyyliohje pyytää sanalla "varovasti".

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

## 12. Avoimet

1. **Patinan kohdistusheitto ja leviäminen syvillä tasoilla** (luku 6b)
   — ehdotus tehty, päätös omistajalla. Tämä on ainoa asia, joka
   kannattaa ratkaista ennen täysajoa.
2. **Syvyyskäyrät oikeasta datasta** — päätetty myöhemmäksi eräksi.
3. **Vinjetointi pelitilakerroksessa.** Se ei tule laattoihin
   (luku 6b), ja Raamattu listaa sen pelin ohueen pelitilakerrokseen.
   Jos sitä ei siellä vielä ole, se on oma tehtävänsä — ei tämän erän.
