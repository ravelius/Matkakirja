# Ihmisen matka: kehys poissa koko avaruusvaiheen ajan (16.9.2026)

Omistajan huomautus 15.9.2026 klo 19.05 (iPhone-kuva avaruusvaiheesta
"He vain lähtivät.", sanatarkasti): *"Alussa oli vain musta mutta sitten
kehys palasi liian aikaisin"*. Raamattu, kohta "IHMISEN MATKA -LINSSI …
JATKO": kehys — yläpalkki, sen alareunan viiva, hampurilaisen nuoli,
aikajanan alapalkki ja Liiku — pysyy poissa KOKO avaruusvaiheen ajan ja
palaa vasta kun kartta valkenee, samassa feidauksessa.

Haara `claude/bold-ride-vow4ki-ihmisen-matka-kehys`, pohja v1917.

## Juurisyy (mitattu)

Kehyksen piilotus roikkui luokassa `esitys-musta`, joka elää VAIN
ensimmäisen virkkeen ajan (`js/linssit/ihmisen-matka-esitys.js`,
`nostaMusta`). Kun musta nousi harsoksi, yläpalkin 1 px kultainen
reunaviiva ja hampurilaisen nuoli palasivat tähtitaivaan ja pienen Maan
päälle — vaikka avaruusvaihe jatkui vielä noin 19 sekuntia. Kyse ei siis
ollut ajastimesta vaan siitä, että piilotus oli sidottu väärään,
lyhyempään jaksoon.

Toinen, pienempi vuoto löytyi mittauksessa: linssin **alapalkki**
(aikaselain) oli piilossa `esitys-pimea`-luokassa, mutta omalla 500 ms:n
liu'ullaan — savuke luki sen peittävyydeksi 1,0 vielä 640 ms mustan
alettua, eli valaistu nauha jäi hetkeksi mustan päälle.

## Muutos

1. **`js/linssit/ihmisen-matka-esitys.js`**
   - `aloita` asettaa `--avaruuden-feidi: 0ms` ja lisää luokat
     `esitys-pimea` + `esitys-avaruus` (kehys katoaa ilman liukua).
   - Uusi `paljastaKehys(feidi)` poistaa `esitys-avaruus`-luokan.
     Kutsujia on tasan yksi: `sytytaValot`, samassa
     silmänräpäyksessä kuin peite saa `pois`-luokkansa, feidiksi
     `VALOJEN_MS` (2600 ms).
   - `tila()` palauttaa uuden mittarin `kehysPiilossa`.
   - **Pakotietä ei ole.** Kokeiltiin ikkunan pointerdown-kuuntelijaa,
     mutta pallolauta ottaa kosketukset vastaan koko esityksen ajan:
     yksi vahinkokosketus tähtitaivaalla olisi tuonut kehyksen takaisin
     — juuri se, mistä omistaja huomautti. Oma Esc-kuuntelija taas
     olisi paljastanut kehyksen linssistä, jonka Esc joka tapauksessa
     sulkee (`js/aikajana.js` `nappain` → `ui.pysaytaAikajana`).
     Avaruusvaihe päättyy itsestään, kuten musta alkukin (v1913).
2. **`css/aikajana.css`** — `.aikajana.esitys-avaruus .aikajana-ylarivi`
   ja `.aikajana.esitys-avaruus .aikaselain` peittävyyteen 0 ja
   `pointer-events: none`; siirtymä `.esitys-kaynnissa`-säännössä
   lukee `--avaruuden-feidi`-muuttujaa, jonka ohjaaja asettaa (0 ms
   alussa, 2600 ms paluussa). Myös liikkeenvähennyksen lohkoon.
3. **Liiku ja pelin yläpalkki** eivät tarvinneet muutosta: Liiku on
   piilossa koko linssin ajan (`css/styles.css`
   `body.aikajana-paalla .toimintorivi .monitoimi-nappi { display: none }`,
   v1913) ja pelin oma `.topbar` on nollakorkuinen
   (`body.aikajana-palkki-auki`). Liikun sijoittelua ei koskettu —
   rinnakkainen maainfo-alakulma-haara saa siirtää sen vapaasti.

## Mittaukset (390 × 844 ja 1400 × 900)

Aikasarja 250 ms:n välein Käynnistä-napista kartan valkenemiseen:

| ms (390 px) | yläpalkki | valikkonappi | alapalkki | Liiku | kartta |
|---|---|---|---|---|---|
| 720 | 0 | 0 | 0 | 0 | 0 |
| 15 259 (puoliväli) | 0 | 0 | 0 | 0 | 0 |
| 21 107 | 0,85 | 0,85 | 0,85 | 0 | 0,85 |
| 21 837 | 0,99 | 0,99 | 0,99 | 0 | 1,0 |

Kehyksen nousu alkaa samasta näytteestä kuin kartan valkeneminen
(390 px: molemmat 19 902 ms, kesto 1 935 ms; 1400 px: 24 875 ms,
kesto 835 ms — kontin ohjelmisto-WebGL piirtää harvoin, joten mitattu
kesto jää alle 2 600 ms:n, mutta kehys ja kartta liikkuvat yhtä matkaa).
Mustan peitteen oma lasku tapahtuu jo 10–14 s kohdalla, eikä kehys
seuraa sitä enää.

Kuvamitta yläreunan 86 px nauhasta avaruusvaiheessa: kirkkaita
(≥ 96) pikseleitä 1 kpl, täsmälleen sama kuin vertailussa, jossa
yläpalkki on `display: none`. Vastakokeessa (luokka pois, vanha käytös)
samasta nauhasta luettiin 161 kirkasta pikseliä, maksimi 241 — viiva ja
hampurilainen palaavat.

## Vartiot

- `tests/ihmisen-matka-esitys.test.mjs`: uusi testi "kehys on poissa koko
  avaruusvaiheen ajan ja palaa kartan kanssa" (luokka lisätään
  aloituksessa, `nostaMusta` ei saa poistaa sitä, `paljastaKehys`-kutsuja
  tasan yksi, ei pointerdown-kuuntelijaa, alapalkin ja Liikun säännöt
  olemassa). **40/40 läpi.**
- Uusi savuke `tools/savukkeet/savuke-ihmisen-kehys.mjs`: 390 ja
  1400 px, aikasarja + kuvamitta + vastakoe + "napautus ei tuo
  kehystä". **13/13 väitettä läpi.** (Savukevartija
  `tools/tarkista-savukkeet.mjs` löytää sen itse kansiosta.)
- `tools/savukkeet/savuke-ihmisen-rintama.mjs`: **7/7.** Sen vastakoe
  piti päivittää poistamaan MOLEMMAT piilotusluokat — pelkkä
  `esitys-musta` pois ei enää tuo viivaa näkyviin, koska
  `esitys-avaruus` pitää sen poissa.
- `tests/rules.test.mjs` 334/334, `node tools/tarkista-savukkeet.mjs`
  kunnossa, `node --check` puhdas.

## Kuva

`docs/raportit/kuvat/ihmisen-matka-kehys-390-20260916.jpg` — 390 px,
avaruusvaiheen puoliväli ("Ei kukaan heistäkään tiennyt."): tähtitaivas
reunasta reunaan, ei yläpalkkia, ei reunaviivaa, ei hampurilaista, ei
alapalkkia eikä Liikua.

## Huomio omistajalle

Avaruusvaihe kestää mitattuna noin 19–25 sekuntia, ja sen ajan
hampurilainen — ainoa tie ulos linssistä — on piilossa. Näppäimistöllä
Esc sulkee linssin kuten ennenkin, mutta puhelimessa ulospääsyä ei ole
ennen kuin kartta valkenee. Tämä on linjauksen mukaista ("kehys pysyy
poissa KOKO avaruusvaiheen ajan"), mutta jos odotus tuntuu pitkältä,
vaihtoehto olisi tuoda pelkkä hampurilainen näkyviin esimerkiksi
kymmenen sekunnin kohdalla.
