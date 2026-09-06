# Korkeusaineisto — `etopo-3kaariminuuttia.bin.gz`

**Muuttumaton lähtöaineisto. Älä generoi uudestaan ellei ruudun kokoa
muuteta.**

## Mikä tämä on

Koko maailman korkeus- ja syvyysruudukko **3 kaariminuutin** (0,05
asteen) tarkkuudella, 7201 × 3601 solua eli 25 930 801 lukua. Yksi
luku on metriä merenpinnasta; meri on negatiivinen.

Ruudukon suunnat ovat sen tärkein sopimus:

- `y = 0` on **etelänapa** (lat −90), y kasvaa pohjoiseen
- `x = 0` on **lon −180**, x kasvaa itään
- sarakkeet `0` ja `leveys−1` ovat **sama meridiaani kahdesti**
  (sekä −180 että +180 on mukana), joten kiertävää naapuria haettaessa
  sarakkeen 0 länsinaapuri on `leveys−2` eikä `leveys−1`

## Lähde ja lisenssi

NOAA NGDC **ETOPO1 Global Relief Model, Ice Surface**, 1 kaariminuutti
— Amante & Eakins 2009, doi:10.7289/V5C8276M.

**Public domain** (Yhdysvaltain liittovaltion viraston tuottama).
ERDDAPin lisenssiteksti: *"The data may be used and redistributed for
free but is not intended for legal use, since it may contain
inaccuracies."*

Haettu osoitteesta
`https://coastwatch.pfeg.noaa.gov/erddap/griddap/etopo360`.

## Miten se on johdettu

```
# 1. Nouto ja keskiarvoistus (kahden kaariminuutin näytteistä
#    0,05 asteen ruudukkoon) — vaatii pääsyn NOAA:n ERDDAPiin:
NODE_USE_ENV_PROXY=1 node tools/hae-korkeusruudukko.mjs

# 2. Välimuistiruudukosta tämä tiedosto:
node tools/tee-korkeusaineisto.mjs
```

Näytteenottoväli on **kaksi** kaariminuuttia eikä kolme, vaikka
lopputulos on kolmen: kolmella jokainen ruutu saisi tasan yhden
näytteen, mikä on poiminta eikä keskiarvo, ja poiminta valitsee
sattumanvaraisesti joko huipun tai rinteen. Varjostus lasketaan
naapurien erosta, joten sattuma näkyisi siinä kohinana.

**Aineistoa ei harvenneta enää lukuvaiheessa.** Kaksi kertaa
keskiarvoistettu maasto olisi liian sileä, ja se olisi hiljainen
laatuvirhe jota kukaan ei huomaisi katsomalla.
`tools/hae-korkeusruudukko.mjs` purkaa tämän tiedoston sellaisenaan.

## Miksi repossa eikä verkosta

Omistajan päätös 30.8.2026: **yksikään ajo ei saa riippua NOAA:n
tavoitettavuudesta.** Laattapyramidin ensimmäinen CI-koeajo kaatui
juuri siihen — ERDDAP ei vastannut GitHubin ajokoneelta lainkaan
(`fetch failed`, ei HTTP-statusta eli yhteystason virhe), vaikka
kehityskontista sama osoite vastaa alle sekunnissa. Vika on ajokoneen
ja NOAA:n välissä eikä korjattavissa koodista.

Natural Earth saa jäädä verkkonoutoon, koska se tulee GitHubista, joka
on todistetusti ajokoneelta tavoitettavissa.

## Miksi 3 kaariminuuttia riittää — KAUKOTASOILLA

Alkuperäinen linjaus (30.8.2026) oli 3 kaariminuuttia **kaikilla**
zoomtasoilla. **Omistajan tilaus 2.9.2026 kumosi sen syvimmän tason
osalta:** z7 poltetaan yhdellä kaariminuutilla, z0–z6 yhä kolmella
(ks. docs/moduulit/laattapyramidi.md osio 8b).

Perustelu on sama luku kummallakin puolella: yksi korkeussolu on
z7:llä 12 × 12 kuvapikseliä 3′:llä ja 4 × 4 pikseliä 1′:llä, joten
siellä tarkkuus näkyy. Jo z6:lla 1′-solu on 2 pikseliä ja z5:llä yksi
— aineisto olisi piirtoa tarkempaa, eli tarkempi ruudukko ei toisi
kaukotasoille yhtään näkyvää yksityiskohtaa vaan nelinkertaisen
muistin. Tämä tiedosto on siis edelleen kaukotasojen aineisto, ja
**sitä ei generoida uudestaan.**

Vanha lupaus siitä, että tarkemman ajon aineisto noudettaisiin
NOAA:lta `--ruutu`-valitsimella, **ei ole enää voimassa**: ERDDAP ei
vastaa GitHubin ajokoneelta, ja 1′-aineisto on nyt omassa
R2-ämpärissämme 10°-paloina (alempana). `tools/hae-korkeusruudukko.mjs`
ohjaa kaikki 1′-pyynnöt sinne.

## Muoto

Yksi gzip, jonka sisällä on otsikko ja runko:

| kenttä | tavua | arvo |
| --- | --- | --- |
| tunnus | 4 | `MKR3` |
| leveys | 4 | uint32 LE — 7201 |
| korkeus | 4 | uint32 LE — 3601 |
| ruutu | 8 | float64 LE — 0,05 |
| näyte | 4 | uint32 LE — 2 (kaariminuuttia) |
| runko | 2 × n | Int16 LE, **rivikohtainen erotus** |

Runko on erotuskoodattu riveittäin (`arvo − edellinen`, rivin alussa
edellinen = 0), ja purku on rivin yli kulkeva summa.

Molemmat askeleet ovat häviöttömiä ja mitattuja (30.8.2026):

| muoto | koko |
| --- | --- |
| Float32 raakana (välimuistin muoto) | 103,7 Mt |
| Int16 raakana | 51,9 Mt |
| Int16 + gzip −9 | 39,9 Mt |
| **Int16 + erotus + gzip −9** | **28,9 Mt** |

Int16 riittää, koska arvot ovat −10 728 … 8 266 m eikä yksikään solu
jää rajan ulkopuolelle (tarkistettu). Float32:n desimaalit olivat
keskiarvoistuksen jäänne eivätkä mittaustarkkuutta: piirtomoottori
interpoloi ruudukon bilineaarisesti ja lisää siihen satojen metrien
kohinaa, joten alle metrin tarkkuudella ei ole vastinetta missään
näkyvässä.

Häviöttömyys todennettu koko aineistolla: 25 930 801 solua, 0 eroa.

---

# 1′-PALAT — `korkeus/1min/`

**Ei repossa. Ei koskaan repoon.** Nämä palat viedään R2-ämpäriin ja
laattapoltto lukee ne sieltä.

## Mikä tämä on

ETOPO1:n **natiivi yksi kaariminuutti** 10° × 10° -paloina, 600 × 600
solua palassa. Aineisto tehtiin 1.9.2026 omistajan tilauksesta
(*"korkeusdata pitää tehdä 1 [kaariminuutin] tarkkuudella
uudestaan"*).

**LIVEKOKEILU ON PURETTU (2.9.2026).** Palat syntyivät alun perin
selainkokeilua varten: peli haki ne verkosta ja laski niistä
rinnevarjon laattojen päälle (v1436, js/korkeuskerros.js,
js/korkeus-worker.js). Omistaja päätti kokeilun heti nähtyään sen —
sanatarkasti: *"Ota live pois ja polta 1 kaarisekuntti."* Selainkerros
ja sen worker on poistettu; **palat itse jäävät**, koska 1′-tarkkuus
tulee jatkossa siitä, mitä pohjalaattoihin poltetaan. Tämä osio
kuvaa siis aineiston, ei enää sen lukijaa.

Tämä ei kumoa yllä olevaa 3′-linjausta takautuvasti: nykyisissä
pohjalaatoissa varjo on poltettu kolmesta kaariminuutista, ja se
vaihtuu vasta uusintapoltossa.

## Palojen lukeminen takaisin ruudukoksi

`tools/korkeuspalat-lukija.mjs` on kirjoittajan vastapari: se kokoaa
paloista sen ruudukonpalasen, jonka kutsuja tarvitsee, eikä yhtään
enempää. Koko maailma olisi 1′:llä 21601 × 10801 solua eli 466 Mt
Int16:na; yksi laattapyramidin pituuskaista tarvitsee siitä noin
neljäsosan.

Kokoaja puhuu **maailmanhilan** sarakkeista ja riveistä, ja hila on
sama sopimus kuin 3′-aineistolla, vain tiheämpänä: `x = 0` on lon
−180, `y = 0` on lat −90, ja sarakkeet 0 ja 21600 ovat sama
meridiaani — sarakeindeksi kiertää siis **modulo 21600**, koska
sarakkeen 0 länsinaapuri on 21599. Lauta on 361 astetta leveä, joten
ikkuna todella kiertää maailman ympäri.

Ylin hilarivi (`y = 10800`, lat +90) ei ole missään palassa, koska
palan yläreuna kuuluu jo seuraavaan palaan; kokoaja lainaa siihen
alapuolisen rivin. Laudan arkki (89 °N…−74 °S) ei yllä sinne.

```
# Ruudukko ikkunana (moduulina):
haeKorkeusikkuna({ ruutu: 1/60, x0, leveys, y0, korkeus,
                   pohjoinenEnsin: true, palat: 'korkeuspalat' })

# Komentoriviltä koko maailma (466 Mt — harvoin mitä haluat):
NODE_USE_ENV_PROXY=1 node tools/hae-korkeusruudukko.mjs --kaariminuutit 1

# Mitkä palat yksi laattapyramidin ajo tarvitsee:
node tools/generoi-laattapyramidi.mjs ulos --tasot 7 --sarakkeet 0-43 \
  --kaariminuutit 1 --vain-palat palat.txt
```

Palat luetaan kolmesta lähteestä tässä järjestyksessä: `--korkeuspalat
<kansio>` (ajokoneen tapa — työnkulku kopioi palat ennen polttoa,
jolloin ajossa ei ole yhtään verkkopyyntöä), levyvälimuisti
(tmpdir) ja julkinen R2-osoite. Puuttuva pala on ajon pysäyttävä
virhe eikä hiljainen merenpinta.

## Miten

```
# Muutama pala (koeajo: Alpit, Kreikka, Andit):
node tools/tee-korkeuspalat.mjs --koeajo --ulos korkeus/1min

# Nimetyt palat:
node tools/tee-korkeuspalat.mjs --palat N40E000,N30E020 --ulos korkeus/1min

# Koko maailma (648 palaa):
node tools/tee-korkeuspalat.mjs --ulos korkeus/1min
```

Vienti ämpäriin: `.github/workflows/vie-korkeuspalat.yml`
(workflow_dispatch; syötteet `lahde` = ncei|erddap, `koeajo`, `palat`).
Julkinen juuri
`https://media.matkakirja.app/julisteet/korkeus/1min/`.

## Muoto

Sama resepti kuin 3′-tiedostolla: yksi gzip, jonka sisällä otsikko ja
rivikohtaisesti erotuskoodattu Int16-runko.

| kenttä | tavua | arvo |
| --- | --- | --- |
| tunnus | 4 | `MK1P` |
| lon0 | 8 | float64 LE — palan LOUNAISNURKKA |
| lat0 | 8 | float64 LE — palan lounaisnurkka |
| ruutu | 8 | float64 LE — 1/60 |
| leveys | 4 | uint32 LE — 600 |
| korkeus | 4 | uint32 LE — 600 |
| runko | 2 × n | Int16 LE, rivikohtainen erotus |

Suunnat ovat samat kuin 3′-aineistolla: **y = 0 on palan eteläreuna**
ja y kasvaa pohjoiseen, x = 0 on länsireuna ja x kasvaa itään. Solu
(x, y) on hilapiste lon = lon0 + x/60, lat = lat0 + y/60.

Palat **eivät mene päällekkäin**: solu lon0 + 10° kuuluu jo seuraavaan
palaan. Reunan yli menevä bilineaarinen näyte tarvitsee siis
naapuripalan — lukijan on koottava näytteenottajansa kaikista
tarvitsemistaan paloista, ei palasta kerrallaan.

Nimi on lounaisnurkka: `N40E020`, `S30W070` (leveys kahdella ja pituus
kolmella numerolla, kuten SRTM-laatoilla).

## Mitattu (1.9.2026, tässä kontissa, NCEI-lähde)

| asia | luku |
| --- | --- |
| lähdezip (etopo1_ice_g_i2.zip) | 322 Mt |
| purettu binääri | 467 Mt |
| pala pakattuna | 320–414 kt (8 palan otos Välimereltä ja Alpeilta) |
| suhde raakaan Int16:een | 54–56 % |
| pilkkomisnopeus | 8 palaa 0,6 s (binääri jo levyllä) |
| koko maailma (arvio otoksesta) | 648 palaa, ~150–250 Mt |

Yksi z7-näkymä osuu 1–4 palaan (mitattu puretulla livekokeilulla:
Kroatia–Bosnia neljä palaa, varjokuva 1308 × 1223 px, laskuaika
selaimessa 0,2–1,0 s).

## Lähde ja lisenssi

Sama kuin yllä: NOAA NGDC ETOPO1 Global Relief Model, Ice Surface,
public domain. Binäärilähde
`https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO1/data/ice_surface/grid_registered/binary/etopo1_ice_g_i2.zip`
(vastasi tästä kontista 1.9.2026; ajokoneelta EI ole kokeiltu — työnkulku
tarkistaa sen ensimmäisenä ja kaatuu äänekkäästi jos ei vastaa).
