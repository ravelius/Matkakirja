# Viesti Fablelle: ennakkozoomi ajetaan loppuun ennen nappulan lähtöä

*Opus-erä 18.9.2026, haara `claude/bold-ride-vow4ki-ennakkozoomi`
(pohja `claude/bold-ride-vow4ki-v1946`, commit 34763203). Raamattu,
KARTTAUUDISTUKSEN PAATOKSET 40 — edellisen erän avoimet 1 ja 2
(docs/raportit/viesti-fable-siirtozoomi-20260918.md luku 5).*

Omistajan sääntö 1.9.2026, sanatarkasti: *"kartta saisi zoomautua
lähemmäksi ensin ja sitten vasta pelaaja alkaisi liikkua."*

## 1. Juurisyy — pinotiedolla mitattu, ei arvattu

Ennakkozoomin ajo keskeytettiin OHJELMALLISESTI yhden millisekunnin
päästä sen alusta. Chromium-pino (1400 × 900, Marseille → Lyonin suunta,
kolmen askeleen maasiirto; `pysaytaKameraAjo` käärittiin ja pino
kirjattiin):

```
t =  9 ms  ajaKamera({ leveys 396, kesto 760 → sovitettu 1054 })
   at UI.ennakoiSiirtoZoomi   (js/ui.js:22383)
   at UI.animatePawnSisalla   (js/ui.js:22826)

t = 10 ms  pysaytaKameraAjo()   ← ennakon ajo oli kesken (oli: true)
   at Object.ajaKamera         (js/pallolauta/kamera.js:918)
   at Object.kotiin            (js/pallolauta/kamera.js:1162)
   at saavu                    (js/pallolauta/lauta.js:4415)
   → ajaKamera({ leveys 240, saapuminen: true, kesto 1400 })

t = 10 ms  ennakon lupaus ratkeaa arvolla FALSE
t = 131 ms saatto alkaa (= pelkkä ENNAKON_HENGAHDYS_MS 120)
```

**Kuka `saavu`n käynnisti:** pallolaudan TELEPORTTIVAHTI
(js/pallolauta/lauta.js `paivita`, rivi 4305):

```js
if (!liikkuu && !lento && !ui.lentoKaari && pos) {
  if (nappulanPaikka !== null && nappulanPaikka !== posAvain) {
    void saavu({ kesto: PALLOKAMERAN_AJO_MS });
  }
  nappulanPaikka = posAvain;
}
```

Ketju kokonaisuudessaan:

1. `ui.run` ajaa `game.actionMove(key)` **ennen** animaatiota, joten
   `player.pos` on jo MÄÄRÄNPÄÄ, kun `animatePawnSisalla` alkaa.
2. `ui.movingPlayerId` nousee vasta ennakkozoomin JÄLKEEN — tahallaan,
   jotta ruudulla on zoomin ajan tavallinen nappula. Siinä välissä
   `liikkuu` on epätosi.
3. Siirron ensimmäinen teko `matkanKermattomuus(true)` → `paivita()`
   luki paikanvaihdoksen teleportiksi ja käynnisti `saavu()`n.
4. `saavu` on ASYNKRONINEN (se odottaa `saapumislaatikko()`a), joten
   sen oma `ajaKamera` osui ennakkozoomin päälle vasta seuraavalla
   millisekunnilla — ja `ajaKamera` aloittaa aina `pysaytaKameraAjo()`lla.

Täsmälleen sama ansa oli korjattu lennolle 16.9.2026
(`ui.lentoKaari`, PAATOKSET 30); maa- ja merimatkalta se jäi auki.

**Miksi `ajaKamera` palautti `false`:** ei siksi, että tavoite olisi ollut
nykyinen näkymä, eikä siksi, että ajo olisi hylätty. Ajo LÄHTI normaalisti
ja se PYSÄYTETTIIN — `pysaytaKameraAjo` ratkaisee lupauksen arvolla
`false`. Kamera ei erottanut pelaajan elettä ohjelmallisesta
keskeytyksestä, joten koreografia luuli saaneensa "ELE VOITTAA"
-tilanteen.

## 2. Korjaus

### a) Juurisyy: teleporttivahti vaikenee koreografian ajan

`js/ui.js animatePawnSisalla` nostaa lipun HETI koko koreografian alussa
(ennen `matkanKermattomuus`ta) ja laskee sen vasta kun kuljettaja on
laskenut nappulan ja merkinnyt paikkansa (`merkitseNappulanPaikka`) —
sama kaava kuin lennolla. `js/pallolauta/lauta.js` lisää sen vahtiin:

```js
if (!liikkuu && !lento && !ui.lentoKaari && !ui.siirtoKaynnissa && pos) {
```

### b) ELE VOITTAA on nyt sääntö eikä sattuma

`js/pallolauta/kamera.js`: `pysaytaKameraAjo(syy)` kirjaa, MIKSI ajo
päättyi — `'perilla' | 'ele' | 'ohjelma'` — ja kotelon kuuntelijat
(sormi, nipistys, rulla) antavat `'ele'`. Uusi `kamera.ajonKeskeytys()`
kertoo syyn ulos. Kestoja, käyrää tai kuuntelijoita ei muuteta.

`js/ui.js ajaEnnakkozoomi(kartta, kohde)` (uusi, ennakon ainoa ajuri):

- perillä tai pelin kuoltua → valmis;
- keskeytyksen syy **ei** ole `'ohjelma'` (ele tai tuntematon lauta) →
  luovutetaan heti ja nappula lähtee siitä näkymästä, jonka pelaaja
  valitsi — vanha sääntö sellaisenaan;
- syy on `'ohjelma'` → ajo jatketaan **jäljellä olevalla** ajalla,
  enintään `ENNAKON_JATKOT` = 2 kertaa. Kesto ei siis kerrannu: vaihe on
  yhä yksi `ENNAKKOZOOMIN_MS` (760 ms) kamera-ajon oman `sovita`-säännön
  venyttämänä, ja `sovita` luetaan vain ensimmäisellä kierroksella.

Perään jää entinen `ENNAKON_HENGAHDYS_MS` (120 ms), ja vasta sitten
nappula poimitaan laudalta.

### c) `SAATON_VAHIN_PX` mitataan TAVOITEmittakaavassa (kohta 3)

`aloitaSaattavaKamera` laski siirtymän pikseleiksi sillä mittakaavalla,
jossa kamera SATTUI olemaan. Edellisessä erässä mitattiin, että kynnys
esti saaton kokonaan juuri silloin kun sitä eniten tarvittiin (kamera oli
nykäisty avaruuteen → koko matka 15,7 px < 24 px). Nyt:

```js
const tavoiteLeveys = this.siirtozoominLeveys;
const skaala = tavoiteLeveys > 0 && nyt.leveys > 0
  ? nyt.skaala * (nyt.leveys / tavoiteLeveys) : nyt.skaala;
const matka = Math.hypot(kohta.x - nyt.x, kohta.y - nyt.y) * skaala;
```

Ilman tavoitelukua (laiva, tuntematon kulkutapa) mitta on entinen.

### d) Nappula ei enää seiso väärässä päässä zoomin ajan

Kun ennakkozoomi nyt AIDOSTI kestää sekunnin, tuli näkyviin vanha
sivuvika: koska `actionMove` on jo ajettu, paikallaan oleva nappula
piirtyi MÄÄRÄNPÄÄHÄN koko ennakkozoomin ajaksi ja hyppäsi takaisin
lähtöön vasta kun liikkuva kopio syntyi. Ennen korjausta se välähti
~130 ms, korjauksen jälkeen se olisi näkynyt ~1,2 s. `ui.siirtoKaynnissa`
on siksi siirron LÄHTÖpaikka eikä `true`, ja `lauta.paivita` piirtää
paikallaan olevan nappulan siihen niin kauan kuin lippu on päällä.
Todiste: `ennakko-390.png` (nappula Marseillessa zoomin lopussa).

## 3. Luvut ennen ja jälkeen

Marseille, maasiirto silmäluvulla 3 (3 askelta, askel 58,9
lautayksikköä), dpr 2.

| mitta | ENNEN (v1946) | JÄLKEEN |
| --- | --- | --- |
| ennakon `await` kesti | **1 ms** | **1 005–1 192 ms** |
| saatto alkoi ennakon jälkeen | 121–131 ms | 1 019–1 193 ms |
| kamera-ajoja siirrossa | 3 (ennakko, `saavu`, saatto) | 2 (ennakko, saatto) |
| `saavu` kesken siirron | kyllä (keskeytti ennakon) | ei |

### 390 × 844 (karttaruutu 374 × 771 px)

| mitta | ENNEN | JÄLKEEN |
| --- | --- | --- |
| näkyvä leveys ennen → saatossa | 177,0 → 177,0 yks | 177,0 → 177,0 yks |
| korkeus nappulan lähtiessä | lähtönäkymän 0,2049 (ei tavoitteessa) | **0,2049 vs. tavoite 0,2051 = 0,1 %** |
| askel ruudulla | 124 px (33 %) | 124 px (33 %) |
| nappula keskimmäisellä 60 %:lla | 206/206 | **201/201** |

Puhelinruudulla askelvaatimus (4 × askel = 235,8 yks) on LEVEÄMPI kuin
lähtönäkymä, joten min-sääntö pitää näkymän ennallaan — siellä korjaus
näkyy vain siinä, että zoomivaihe on aito vaihe eikä nollan mittainen.

### 1400 × 900 (karttaruutu 1379 × 821 px)

| mitta | ENNEN | JÄLKEEN |
| --- | --- | --- |
| näkyvä leveys ennakon jälkeen | 613,1 yks (ei ehtinyt) | **396,0 yks (= tavoite)** |
| näkyvä leveys saatossa (mediaani) | 488,5 yks | **396,0 yks** |
| korkeus nappulan lähtiessä | 0,2049 (lähtönäkymä) | **0,1324 vs. tavoite 0,1325 = 0,1 %** |
| askel ruudulla | 166 px (20 %) | **205 px (25 %)** |
| nappula keskimmäisellä 60 %:lla | 175/203 | **204/204** |
| saaton kesto | 3 160 ms | 3 160 ms (ennallaan) |

## 4. Savuke ja kaappaukset

`tools/savukkeet/savuke-siirtozoomi.mjs`, uusi **vartio 7**: sillä
kehyksellä, jolla liikkuva nappula ilmestyy laudalle, kameran korkeus on
ennakkozoomin TAVOITEkorkeudessa ±5 % (tavoite lasketaan kameran omalla
`korkeusLeveydesta`lla ennakkoajon pyytämästä leveydestä, kattoineen ja
lattioineen). Mitattu heitto molemmilla ruuduilla **0,1 %**.

**Tulos: 14/14 vihreää** (7 vartiota × 2 ruutua), ei tunnettuja punaisia.
Koko ajo Macilla **44 s**, joten riviä EI jaettu ruuduittain — savuke
tukee silti `SAVUKE_RUUTU`-rajausta, jos jako joskus tarvitaan.

Kaappaukset:

- `tools/savukkeet/kaappaukset/siirtozoomi/ennakko-390.png` —
  ennakkozoomin lopussa, nappula vielä paikallaan **Marseillessa**
  (koreografia jäädytetään kuvan ajaksi `ajaEnnakkozoomi`n jälkeen).
- `tools/savukkeet/kaappaukset/siirtozoomi/saatto-1400.png`
- `tools/savukkeet/kaappaukset/siirtozoomi/saatto-390.png`

**sarjat.json-rivi** (julkaisusarjan loppuun):

```
"julkaisu": [ … , "savuke-reittihelmet.mjs", "savuke-siirtozoomi.mjs" ]
"asetukset": { …, "savuke-siirtozoomi.mjs": { "kuvakansio": true, "huomautus": "…" } }
```

`node tools/savukkeet/rakenna-matriisi.mjs julkaisu` → 27 riviä, uusi
rivi `nimiTunniste: savuke-siirtozoomi`, `kuvakansio: true`,
`salliEpaonnistua: false`. Savuke lukee kaappauskansion nyt
`KAAPPAUKSET`-ympäristömuuttujasta (aja-sarja.mjs asettaa sen), joten
Actionsin artefakti osuu oikeaan kansioon.

`node --test tests/*.test.mjs`: **# pass 3628, # fail 0** (skipped 13).
`node tools/build-standalone.mjs`: dist 32 733 kt, ok.
Versiota EI nostettu, PR:ää ei avattu.

Päivitetyt lähdetekstivartiot (sama väite, uusi muoto):
`tests/pallo.test.mjs` (wheel/pointerdown → `pysaytaKameraAjo('ele')`),
`tests/pallolauta.test.mjs` (teleporttivahdin ehto + nappulan lähtöpaikka),
`tests/pallolinssit.test.mjs` (`nappulanKohta`),
`tests/siirtoajoitus.test.mjs` (ennakon ajuri, ELE VOITTAA, jatkojen katto).

## 5. Viereiset havainnot (ei korjattu tässä erässä)

1. **`palaaMaanRajaukseen` ja teleporttivahti ajavat molemmat saapumisen.**
   Mittauksessa näkyi, että molemmat päätyvät samaan `saavu`en samalla
   kestolla (1 400 ms = sekä `MATKARAJAUKSEN_PALUU_MS` että
   `PALLOKAMERAN_AJO_MS`). Nyt vain toinen laukeaa, mutta kaksi eri
   polkua samaan ajoon on ansa seuraavalle muutokselle — ja kaksi eri
   vakiota samalla arvolla tekee pinosta lukukelvottoman. Ehdotus: yksi
   nimetty saapumisajo, jolla on yksi kesto.
2. **`nappulanPaikka` on laudan tilaa, mutta sen merkitsee kuljettaja.**
   Jos siirto katkeaa ennen `laske()`ä (peli kuolee, lauta puretaan),
   lippu `ui.siirtoKaynnissa` nollataan mutta `nappulanPaikka` jää
   vanhaan — seuraava `paivita` lukee sen teleportiksi ja ajaa
   saapumisen. Ei pelissä havaittu, mutta looginen aukko.
3. **`SIIRTOZOOMIN_LAHENNYS` 2,0 on yhä vain laivan ja tuntemattoman
   kulkutavan luku** (edellisen erän avoin 4, ennallaan).
4. **Vartio 2 osuu työpöytäruudulla tasan rajalle.** `askelenSiirtoleveys`
   tähtää TÄSMÄLLEEN 25 %:iin, joten mitattu 205,1 px vs. vaadittu
   205,25 px. Savukkeessa on siksi `ASKELEN_SIETO` 0,99. Jos Fable haluaa
   vartiolle aitoa varaa, oikea paikka on kaava (esim. 0,26), ei savuke.
