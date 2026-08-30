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

## Miksi 3 kaariminuuttia riittää

Raamatun lukittu linjaus: laattapyramidi käyttää 3 kaariminuuttia
**kaikilla zoomtasoilla**. Syvimmällä tasolla (7,2 px lautayksikköä
kohti) yksi korkeussolu on **12 × 12 kuvapikseliä**, joten tarkempi
aineisto ei toisi yhtään näkyvää yksityiskohtaa — se vain nelinkertaistaisi
muistin ja latauksen.

Jos joskus halutaan tarkempi ajo, `tools/hae-korkeusruudukko.mjs` osaa
yhä noutaa alkuperäisen yhden kaariminuutin aineiston NOAA:lta
(`--ruutu`), ja tämä tiedosto ohitetaan automaattisesti, koska sen
ruutukoko ei täsmää pyydettyyn.

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
