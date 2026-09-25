# Kaistat pois laajalla ruudulla — tasoituskerroksen reunat (13.9.2026)

*(Opus-työsessio Fablelle. Haara `claude/julkaisu-kaistat`, pohja
origin/main v1856, julkaisu v1857. Jokainen luku on MITATTU tässä
kontissa; arviot on merkitty sanalla "arvio".)*

## 0. Lyhyesti

Rootin live-QA:n näkemät **valtavat suorat teräväreunaiset kaistat ovat
poissa**, ja korjaus on yksi asiakaspuolen maalaus — uusia laattoja ei
ajettu. Vika ei ollut puuttuvissa laatoissa eikä 404-fallbackissa, vaan
tasoituslaataston KAHDESSA reunassa, joista kumpikin on suora viiva:

| reuna | missä | mitattu porras (luminanssia) |
| --- | --- | ---: |
| laattaruudukon läntinen | lon −21,40 (Atlantti) | **45,3** |
| laattaruudukon itäinen | lon 29,80 (Mustameri) | **41,6** |
| laatikon läntinen häive | lon −10,25 (Biskaja) | **37,3** |
| laatikon itäinen häive | lon 14,67 (Adrianmeri) | **10,2** |

Korjauksen jälkeen samat neljä lukua ovat **0,0 · 2,2 · 0,1 · 2,9**.
Sama pätee ruudulla 1920 × 1080 (44,4 · 41,6 · 36,6 · 10,4 → 0,0 · 2,2 ·
0,0 · 2,8), eli **vika oli myös tavallisella työpöytäruudulla** — ei
vain rootin 2560:llä.

Kuvat: `docs/raportit/kuvat/kaistat-2560-ennen.png` ja
`kaistat-2560-jalkeen.png` (sekä `kaistat-1920-*`). Savuke
`tools/savukkeet/savuke-kaistat-levea.mjs` on **9/9 vihreä** ja sen
vastakoe punainen oikeista väitteistä (luku 4).

**YKSI ASIA JÄI AVOIMEKSI JA SE ON LÖYDÖS ITSESSÄÄN: kaikkien 27 maan
tasoituslaatat kirjoitetaan SAMAAN osoitteeseen ämpärissä** (luku 5).
Se ei ole korjattavissa asiakkaassa, ja se näkyy korjatussakin kuvassa
yhtenä kämmenen kokoisena laikkuna Pohjois-Espanjassa.

---

## 1. Miten vika toistettiin

Playwright, Chromium `/opt/pw-browsers/chromium`, viewport 2560 × 1352
ja 1920 × 1080 (dpr 1), tallenne Fogg Ateenassa, nappula Pariisiin ja
`pallolauta.saavu({ kesto: 0 })` — sama pelitila kuin savukkeilla
`savuke-tasoitus-pallo` ja `savuke-pariisin-nostot`. Pohja, ranta-,
viiva-, nosto- ja tasoituslaatat tulevat TUOTANNON ämpäristä
(`media.matkakirja.app`), eli mitattu peli on sama, jonka root näki.

Saapumisnäkymän lepokerros: **taso z4, 27 laattaa, 11 värillistä,
`syy` tyhjä** — kerros oli siis päällä ja terve, eikä yksikään laatta
jäänyt jumiin (`jumissa 0`). Vika ei siis ole puuttuva laatta.

## 2. Mitattu juurisyy

### 2.1 Laattaruudukon reuna (kaistan ULKOreuna)

Tasoituslaatasto ajetaan vain kohdemaan laatikon alalle
(`--laatikko-nakyma`), mutta laatasto kattaa **kokonaisia laattoja**.
Ranskan luettelokirjaus (`varitasot.FRA`, luettu ämpäristä):

* laatikko lautayksiköinä `x 5491,77 · y 936,26 · w 830,66 · h 1218,97`
  = lon **−10,25…14,67**, lat 30,70…59,79;
* laatasto z4: sarakkeet **9…11**, rivit 3…5 (9 laattaa).

z4:llä laatta on 512 px / 0,9 ppu = **569 lautayksikköä ≈ 17°
pituuspiiriä**, joten olemassa olevien laattojen ala on lon
**−21,40…29,80** — eli laatikon ympärillä on 11°:n (lännessä) ja 15°:n
(idässä) marginaali, jossa kerma on TÄYSI. Marginaalin ulkoreunassa
laattoja ei ole, kerma loppuu kesken ja jäljelle jää pohjalaatan
alkuperäinen seepia. Se on laatan suora reuna, ja pallon pinnalla se
näkyy kaartuvana mutta täysin terävänä kaistana.

### 2.2 Feidauksen häive (kaistan SISÄreuna)

`tools/fokuskartta/maailmapiirto.js` `polttaVariLeikkuri` piirtää
häiveen neljänä kaistaleena LAATIKON REUNASTA SISÄÄNPÄIN
(`kaista(lx0, 0, lx0 + rx, H, true)`, `destination-out`): reunalla
pyyhkimä on täysi ja `feidausReuna` yksikköä sisempänä nolla. Laatikon
ULKOPUOLELLA — samassa laatassa, luvun 2.1 marginaalissa — mitään ei
pyyhitä, joten kerma on siellä taas täysi.

Mitattu suoraan laatasta
`…/2026-09-13-tasoitus/vari/z4/9/4.webp` (alfa vaakariviltä, laudan
x-koordinaatteina):

```
board 5422: 217   5431: 117   5440: 20   5476: 100   5511: 181   5529: 217
```

Alfa siis putoaa 217 → 20 ja nousee takaisin. Kartalla tämä on toinen
suora viiva, ja sen porras on mitattuna 37,3 (länsi) ja 10,2 (itä)
luminanssiyksikköä.

### 2.3 Miksi puhelin on ehjä ja työpöytä ei

Laatikko on mitoitettu kuvasuhteiden unionille
(`NAKYMAN_KUVASUHTEET`, kapein 390 × 844, levein 1920 × 1080). Näkyvä
leveys on `max(w·1,15, h·1,15·W/H)`:

| ruutu | kuvasuhde | näkyvä leveys (yks) | laatikon leveys | reuna näkyvissä? |
| --- | ---: | ---: | ---: | --- |
| 390 × 844 | 0,462 | 563 | 831 | ei (reunat ruudun ulkopuolella) |
| 1920 × 1080 | 1,778 | 830 | 831 | **kyllä** — häive on 125 yks laatikon sisällä |
| 2560 × 1352 | 1,893 | 884 | 831 | **kyllä**, myös ruudukon reuna |

Eli 1920:llä laatikon reuna osuu juuri ruudun laitaan, mutta HÄIVE
alkaa 125 yksikköä sisempää ja on siis näkyvissä; 2560:llä ruutu on
laatikkoa leveämpi ja myös luvun 2.1 marginaali tulee esiin. Puhelimen
pystyruudulla kumpikaan ei mahdu kuvaan. Tämä selittää rootin
havainnon sanasta sanaan.

## 3. Korjaus

**Peli maalaa saman kerman samalla peitolla itse kaikkialle SUOJATUN
SUORAKAITEEN ulkopuolelle ja piirtää laataston kuvan vain suorakaiteen
sisään.** Jokainen pikseli saa peiton täsmälleen kerran, joten sauma on
kahden identtisen värin välissä eikä sitä voi nähdä — eikä peitto
myöskään kertaudu (se olisi uusi porras vanhan tilalle).

| tiedosto | muutos |
| --- | --- |
| `js/laattapyramidi.js` | Uusi vienti **`pyramidinTasoitus()`**: lukee luettelosta kerman, peiton ja laatikon sekä laskee SUOJATUN SUORAKAITEEN. Uusi tuonti `puraMaanRenkaat`. |
| `js/pallolaatat.js` | Uusi vienti **`maalaaTasoitus()`** (4 × `fillRect` + laatan leikattu `drawImage`) ja sen kutsu laatan kankaan kokoamisessa, väritason omalla paikalla kerrosjärjestyksessä. `suorita` mitätöi laatat myös silloin, kun suoja tarkentuu (`tasoitusAvain`). |
| `tools/savukkeet/savuke-kaistat-levea.mjs` | **UUSI** savuke ja sen vastakoe (luku 4). |
| `tests/tasoitustaso.test.mjs` | Kolme uutta vartiota `maalaaTasoitus`ille: puuttuva laatta saa kerman koko alalleen, suojan ulkopuoli maalataan neljänä kaistaleena SAMOISTA kokonaisista pikseleistä kuin laatan leikkaus (ei rakoa eikä kertautuvaa peittoa), ja puuttuvilla parametreilla ei maalata mitään. |
| `tests/pallolaatat.test.mjs` | Tuontivartion regex tunnistaa uuden nimen. |
| `tools/savukkeet/README.md` | Savuke luetteloon. |

**SUOJATTU SUORAKAIDE ON KOHDEMAAN OMIEN RENKAIDEN LAATIKKO**, ei
laataston laatikko. Se on pienin suorakaide, joka varmasti sisältää
kaiken sen, minkä laatan leikkuri jätti alkuperäiseksi; koska häive on
maan ulkopuolella, se jää maalauksen alle ja katoaa. Ranskalla suoja on
`x 5662…6152 · y 1343…1749` (490 × 406 yks) eli mantere JA KORSIKA —
renkaat luetaan `puraMaanRenkaat`illa eikä `maanLautalaatikko`lla,
koska jälkimmäinen palauttaa yhden renkaan ja pudottaisi Korsikan.
Merentakaiset renkaat (Guyana, Réunion, Mayotte) karsiutuvat, koska
niiden laatikko ei osu laatastoon.

Ennen kuin maapolygonit (1,4 Mt, laiska ja jaettu punaisen kehän
kanssa) ovat perillä, suoja on KOKO LAATASTON LAATIKKO: maalaus
poistaa silloin ruudukon reunan mutta jättää häiveen, eikä se voi
koskaan osua kohdemaahan. Kun suoja tarkentuu, `tasoitusAvain`
muuttuu ja lepokerros mitätöi laattansa (mitattu: `varimitatointeja`
2 eikä enempää — kierrettä ei synny).

**KOHDEMAA EI MUUTU.** Suojan sisällä laatan kuva piirretään
ennallaan, eikä maalaus kirjoita yhtään pikseliä sinne. Savukkeen V5
mittaa tämän: Keski-Ranskan 9 × 9 reliefikontrasti on **σ 4,62** ja
Belgian Ardenneilla **σ 0,56** — Ranska on yhä reliefiä, naapuri
tasaista kermaa.

## 4. Savuke ja vastakoe

`tools/savukkeet/savuke-kaistat-levea.mjs` avaa pallon, saapuu
Pariisiin, odottaa levon, piilottaa kaiken pallon kankaan ulkopuolisen
(erän 1 ansa 1) ja mittaa neljän rajan yli luminanssieron kahdesta
AVOMERIPISTEESTÄ, mediaani 7 × 7 ruudusta. **Rajat luetaan pyramidin
luettelosta ja laataston bittikartasta** eikä kirjoiteta savukkeeseen:
jos laatasto joskus ajetaan uudestaan, savuke mittaa uutta laatastoa.

```
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers NODE_USE_ENV_PROXY=1 \
  node tools/savukkeet/savuke-kaistat-levea.mjs [--ruutu 1920x1080]
```

| väite | 2560 × 1352 | 1920 × 1080 |
| --- | --- | --- |
| V0 kerros päällä (FRA, `syy` tyhjä) | OK | OK |
| V1 ruudukon läntinen reuna | ero **0,0** | 0,0 |
| V2 ruudukon itäinen reuna | ero **2,2** | 2,2 |
| V3 laatikon läntinen reuna | ero **0,1** | 0,0 |
| V4 laatikon itäinen reuna | ero **2,9** | 2,8 |
| V5 kohdemaa ei tasoittunut | σ 4,62 > 0,56 | σ 5,28 > 0,65 |
| | **9/9** | **9/9** |

**VASTAKOE `--ilman-korjausta` on PAKOLLINEN ja se on punainen.**
Savuke tarjoilee `js/pallolaatat.js`:n niin, että maalaus on korvattu
nullilla — peli täsmälleen sellaisena kuin se oli v1856:ssa. Pelin
koodissa ei ole testilippua; vastakoe tehdään tarjoilussa, jotta
savuke mittaa tuotantokoodia eikä omaa haaraansa.

```
5/9 väitettä läpi (VASTAKOE: V1…V4 pitää kaatua)
FAIL V1 … ero 45,3   FAIL V2 … ero 41,6
FAIL V3 … ero 37,3   FAIL V4 … ero 10,2
```

Eli täsmälleen ne neljä väitettä, jotka tämä erä korjasi — ei enempää
eikä vähempää. V0 ja V5 pysyvät vihreinä myös vastakokeessa, mikä on
oikein: laatasto oli päällä ja Ranska alkuperäinen jo ennen korjausta.

## 5. AVOIN ASIA: 27 maan laatat kirjoitetaan samaan osoitteeseen

**Tämä on luvun 2 vikaa vakavampi, eikä sitä voi korjata asiakkaassa.**

Laatan osoite on `julisteet/pyramidi/<versio>/vari/z<z>/<x>/<y>.webp`
(js/laattapyramidi.js `laattaUrl`). Osoitteessa EI OLE MAATA, ja
luettelossa **kaikkien 27 maan `varitasot[ISO].versio` on sama
merkkijono `2026-09-13-tasoitus`** (tarkistettu ämpäristä). Maiden
laatikot menevät päällekkäin, joten saman avaimen kirjoittaa moni ajo
ja voimaan jää viimeinen.

Mitattu todiste, kolme laattaa samasta Ranskan laatastosta:

| laatta | Last-Modified |
| --- | --- |
| z4/9/3, z4/9/4 | 13.9.2026 **18:27:21** |
| z4/10/3, z4/10/4 | 13.9.2026 **19:13:06** |
| z4/11/4 | 13.9.2026 **19:15:56** |

Kolme eri ajoa. Ja laatan **alfakanava kertoo saman kuvana**:
`docs/raportit/kuvat/kaistat-laatan-alfa.png` on laattojen z4/9/4
(vasen) ja z4/10/4 (oikea) alfa mustavalkoisena — musta = alkuperäisenä
säilynyt ala. Oikeassa laatassa musta on Ranska ja Korsika, **mutta
molemmissa on lisäksi musta ala Pohjois-Espanjassa**, jota Ranskan ajo
ei ole voinut piirtää. Pelaaja siis lataa Ranskan laatastona laatan,
joka on osittain toisen maan laatta — ja sen häive on toisen maan
laatikon kohdalla (juuri siksi luvun 2.2 alfaprofiili ei osu Ranskan
laatikon reunaan vaan 60 yksikköä siitä länteen).

**Näkyvä jäännös korjatussa kuvassa.** Kuvassa `kaistat-2560-jalkeen.png`
on Pohjois-Espanjassa yksi vaalea suorakaide, leveys 41 ruutupikseliä
(lon −5,14…−4,32, mitattu). Se on juuri tämä: suojatun suorakaiteen
sisään jäävä siivu laattaa z4/9/4, jonka alfa on siinä kohdassa 0
ESPANJAN takia. Asiakas ei voi erottaa "alfa 0 = kohdemaa" ja "alfa 0 =
joku toinen maa" toisistaan, joten sitä ei voi maalata umpeen ilman
että Ranska maalattaisiin samalla.

**SUOSITUS (kaksi vaihtoehtoa, kumpikin Fablen päätettäväksi):**

1. **Maa osoitteeseen ja uusi ajo.** `…/vari/<ISO>/z<z>/<x>/<y>.webp`
   (tai maakohtainen `versio`), jolloin laatastot eivät enää törmää.
   Samassa ajossa kannattaa korjata häive: gradientti pitäisi piirtää
   laatikon reunasta ULOSPÄIN (tai laataston uloimpaan laattaan asti),
   ei sisäänpäin — nyt se tekee reunan sen sijaan että häivyttäisi sen.
   Ja laatikko kannattaa mitoittaa kuvasuhteelle 2,0 eikä 1,778.
2. **Tasoitus ilman laatastoa.** Tasoituslaatassa ei ole maastoa —
   se on pelkkä kerma ja reikä kohdemaan kohdalla — ja pelillä on jo
   reiän geometria muistissa (`maapolygonit.json`, sama aineisto, jonka
   generaattori luki). Tämän erän maalaus tekee jo kaksi kolmasosaa
   työstä suorakaiteella; renkailla leikattuna se tekisi koko kerroksen
   ilman yhtäkään laattaa, jolloin törmäys, laatikko ja häive lakkaavat
   olemasta ja kerros toimisi joka zoomilla ja joka kuvasuhteella.
   Se on isompi muutos kuin tämän tehtävän "pienin oikea korjaus",
   joten sitä EI tehty tässä erässä.

## 6. Mitä EI koskettu

Tekstit, äänet, kuvat, Pulun ohjain (`js/pollo.js`), lehdet,
tarinasisältö ja kameran rajat ovat ennallaan. Kameran uloszoomauksen
estoa ei muutettu: laskettuna se olisi vaatinut 1,28-kertaisen
lähentämisen 2560 × 1352:lla, jolloin Ranska (406 yks korkea) ei olisi
enää mahtunut ruutuun (438 → 365 yks) — eli "maa niin suureksi kuin
mahdollista" olisi rikkoutunut. Maalaus ei koske kameraan.

## 7. Julkaisu

`v1857` · `npm test` **# pass 3308 / # fail 0** (3321 testiä, 13 skipped) ·
`tarkista-kaksoisavaimet` · `tarkista-niputus` · `tarkista-savukkeet` ·
`build-standalone` (dist/ ei committiin) · ei konfliktimerkkejä.
