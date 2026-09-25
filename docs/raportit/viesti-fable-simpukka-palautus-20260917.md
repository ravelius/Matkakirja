# Viesti Fablelle — kertojan simpukkavirke takaisin, pulun repliikki pois

**Opus-työagentti, 17.9.2026.** Haara
`claude/bold-ride-vow4ki-simpukka-palautus`, pohjana `origin/main`
(`b840555c`, v1926+). Toimeksianto: Raamatun **IHMISEN MATKA** -osion
JATKO 2:n **KORJAUS** (omistaja 17.9.2026 klo 03.40 UTC).

Omistaja sanatarkasti: *"Se simpukka tarkoitti pulun simpukka
kommenttia. Ei kertojan."*

**Lyhyesti.** v1926 poisti väärän simpukan. Kertojan virke on nyt
takaisin **sanatarkasti** siinä muodossa, jossa se oli ennen commitia
`c3c5169f` — ja juuri siinä muodossa, jonka ämpärin äänite lukee.
Poistettu on sen sijaan pulun välihuomio *"Simpukoita. Hyvä alku."*,
eikä sitä ole enää datassa lainkaan. Äänitettä **ei uusita eikä
leikata**: mitattu, että palautettu teksti täsmää manifestin
aikaleimoihin sana sanalta.

---

## 1. Mitä palautettiin

`js/linssit/ihmisen-matka-kertomus.js`, jakso `arabia` (kohde
`al-wusta`, hiljainen nosto `blombos`):

> Sitten kului taas pitkä aika. **Etelän rannikolla ehdittiin hioa okraa
> punaiseksi ja pujotella simpukankuoria helmiksi, ennen kuin ylitys
> Arabian niemimaalle onnistui.** Silloin Arabia oli vihreä: autiomaan
> paikalla oli järviä ja ruohoa. Yhden järven rannalta on löydetty yksi
> ainoa sormiluu. Se riittää todisteeksi. Tästä ihmiset lähtivät kohti
> Aasiaa, eivätkä enää palanneet.

Palautettu sekä `teksti`- että `luenta`-kenttään, `[pause]`-merkintä
samassa kohdassa kuin ennen (sormiluun jälkeen). Kentät ovat
tavu tavulta samat kuin `c3c5169f~1`:ssä.

Samalla poistettiin kaikki, mikä oli kirjattu vain poiston takia:

- vakio `AANITE_PAIVITETTAVA` ja sen **ÄÄNITE UUSITTAVA** -lohko,
- jakson kenttä `aanitePaivitettava: true`,
- kenttäluettelon `aanitePaivitettava`-kuvaus tiedoston alusta,
- **SIMPUKKAVIRKE POISTETTU** -kommentti arabia-jaksossa (tilalle
  entinen BLOMBOS-kommentti + yksi rivi: *virke palautettu omistajan
  korjauksella 17.9.2026; äänite ennallaan*).

`c3c5169f`:n muut muutokset (kappaleet ≤ 240 merkkiä, pulu pois
esityksen ajaksi, hitaampi zoomi) **säilyvät koskemattomina**.
Kappalejakoa ei tarvinnut käsin muuttaa: `jaaOsiin` jakaa palautetun
kappaleen itse kolmeen osaan (165 / 146 / 60 merkkiä), eikä yksikään
osa ylitä 240:tä. Sanamuotoon ei koskettu.

## 2. Mitä poistettiin

`ranta`-jakson (Pinnacle Point) kenttä `pulu` oli
`'Simpukoita. Hyvä alku.'` → nyt `null`. Repliikki ei ole enää missään
datassa; `grep -rn "Simpukoita" js/ tests/ tools/` löytää sen vain
vartijoista, jotka valvovat sen **puuttumista**, sekä Raamatun omasta
kirjauksesta.

**Numero 1 jäi varatuksi.** Ämpärin `livia-ihmisen-matka-1.mp3` on yhä
se poistettu repliikki. Jos `ranta` olisi vain poistettu taulusta
`LIVIAN_LINSSILAHTEET`, denisova/beringia/loppu olisivat siirtyneet
numeroihin 1–3 ja **kaikki kolme olisivat vaienneet** (peli vertaa
tekstin tiivistettä, `livianAaniAjanTasalla`). Tilalle tuli sama
ratkaisu kuin kaupungeilla:

```js
'ihmisen-matka': [LIVIAN_VARATTU, 'denisova', 'beringia', 'loppu'],
```

Orvoksi jäänyt `ihmisen-matka-1` poistettiin tauluista
`LIVIAN_AANITETYT` ja `LIVIAN_AANIERAT` (varatuilla paikoilla ei ole
riviä kummassakaan). `tools/generoi-pulu.mjs linssinRepliikit` osaa nyt
varatun paikan: se ei vertaa sitä kaanoniin ja antaa siitä tyhjän rivin,
joka karsiutuu äänitettävien listalta mutta pitää järjestysnumeron.

Mitattu ajon jälkeen:

| jakso | indeksi | tiedosto | tiiviste kaanonista | taulussa | soi |
|---|---|---|---|---|---|
| (varattu) | 0 | livia-ihmisen-matka-1.mp3 | — | — | ei |
| denisova | 1 | livia-ihmisen-matka-2.mp3 | `45dafd6e` | `45dafd6e` | kyllä |
| beringia | 2 | livia-ihmisen-matka-3.mp3 | `77366164` | `77366164` | kyllä |
| loppu | 3 | livia-ihmisen-matka-4.mp3 | `dbfd92fe` | `dbfd92fe` | kyllä |

Poistetun repliikin tiiviste on `019b7159` — sama, joka taulussa oli
numerolla 1. Se vahvistaa, että numero 1 todella oli tämä repliikki.

## 3. Ajoituksen todennus äänitteeseen (mitattu, ei arvattu)

Haettu **live-manifesti**
`https://media.matkakirja.app/aikajana/ihmisen-matka/puhe/kertomus-manifesti.json`
(HTTP 200, `yhtena: true`, `tiedosto: ihmisen-matka-kertomus.mp3`,
kesto 394,74 s):

- `arabia`: alku **108 620 ms**, loppu **141 630 ms**
- lauseleimoja **6**: 108 620 · 111 640 · 122 560 · 129 460 · 134 340 · 137 120
- sanoja **50**, toinen lause alkaa sanasta **"Etelän"** (111 640 ms)

Palautettu kaanonin teksti: **6 virkettä, 50 sanaa**, ja sanalistat ovat
**merkki merkiltä identtiset** manifestin kanssa (vertailu normalisoitu
pienaakkosin ja välimerkit karsien → `true`).

**Vastakoe** (`osienHetket` samalla manifestilla, jakson kesto 33 010 ms):

| teksti | osia | virkkeitä | osien hetket | leimoista? |
|---|---|---|---|---|
| **palautettu** | 3 | 6 | 0 · 13 940 · 28 500 ms | **kyllä** |
| v1926 (virke poissa) | 2 | 5 | 0 · 16 910 ms | **ei** — putosi merkkiosuuksiin |

Eli ilman palautusta virkemäärä (5) ei osunut manifestin kuuteen
leimaan, turvaportti hylkäsi aikaleimat ja laatikot jaettiin
merkkiosuuksilla. Palautuksen jälkeen laatikot vaihtuvat täsmälleen
niillä hetkillä, joilla kertoja aloittaa osan ensimmäisen virkkeen.

Sama luku näkyy myös Codexin peruuntuneen leikkauksen kuitissa
(`tools/arabia/README.md`): *"Arabia: 50 → 40 words, 6 → 5 sentence
starts."* Leikkausta **ei ajeta**; README on merkitty peruutetuksi, eikä
livealiaksiin kosketa.

## 4. Testit ja savukkeet

| ajo | tulos |
|---|---|
| `node --test` kaikki `ihmisen-matka`/`kertomus` -testit (27 tiedostoa) | **826/826** |
| `node --test` liviapuhe-/pulu-testit + `dokumentit.test.mjs` (19 tiedostoa) | **291/291** |
| `savuke-ihmisen-kappaleet.mjs` (390×844 ja 1400×900) | **38/38** |
| `savuke-ihmisen-esitys.mjs` `VAIN_AVAUS=1` | **13/13** |

Savukkeen mitatut luvut 390 px:llä: kartta 828 px, korkein laatikko
139 px (17 %), Arabia-jakson laatikko **116 px = 14 %**, pulu ei näy
yhdessäkään 12 näytteestä, zoomi 2 329 → 7 329 ms (+5 000),
saapuminen siirtyy tasan 5 000 ms. Kaikki entiset luvut ennallaan.

Vartijat käännettiin toisin päin:

- `tests/ihmisen-matka-luenta.test.mjs`: kaanonin hyväksytty teksti on
  taas se pitkä muoto; `arabia.teksti` ja `arabia.luenta` **sisältävät**
  *"okraa punaiseksi"*; `arabia.aanitePaivitettava === undefined`; ja
  uusi vartio laskee, että jaksossa on **6 virkettä** — juuri se luku,
  josta aikaleimojen kelpaaminen riippuu.
- `tests/ihmisen-matka-esitys.test.mjs`: taulun ensimmäinen paikka on
  `LIVIAN_VARATTU`, loput vastaavat kaanonia, ja erikseen vartioidaan,
  ettei yhdessäkään jaksossa ole `pulu`-kenttää, jossa lukee
  *"Simpukoita"*. Indeksit: `denisova` → 1, `loppu` → 3.
- `savuke-ihmisen-kappaleet.mjs` väite 2 kääntyi: ennen se vaati, ettei
  simpukkavirke ole DOMissa; nyt se vaatii, ettei **pulun repliikki**
  ole DOMissa (kupla + koko sivun teksti, 12 näytettä molemmilla
  ruuduilla) ja että **kertojan virke on** Arabia-jakson tekstissä.
  Vastakoe: sama mitta löytää repliikin, kun se lisätään näytteeseen
  käsin.

## 5. Muutetut tiedostot

| tiedosto | mitä |
|---|---|
| `js/linssit/ihmisen-matka-kertomus.js` | kertojan virke takaisin, `aanitePaivitettava` ja `AANITE_PAIVITETTAVA` pois, `ranta.pulu` → `null` |
| `js/liviapuhe.js` | `LIVIAN_LINSSILAHTEET` varattu paikka; `ihmisen-matka-1` pois tiiviste- ja erätaulusta |
| `js/linssit/ihmisen-matka-esitys.js` | vain kommentti: viittaus poistettuun lippuun |
| `tools/generoi-pulu.mjs` | `linssinRepliikit` osaa varatun paikan |
| `tools/savukkeet/savuke-ihmisen-kappaleet.mjs` | väite 2 käännetty + uusi väite 2b, näytteeseen kuplan ja sivun teksti |
| `tools/savukkeet/savuke-ihmisen-esitys.mjs` | väite 7: kolme kuplaa neljän sijaan |
| `tools/arabia/README.md` | merkitty **CANCELLED 17.9.2026** |
| `tests/ihmisen-matka-luenta.test.mjs`, `tests/ihmisen-matka-esitys.test.mjs`, `tests/ihmisen-matka-kappaleet.test.mjs`, `tests/livia-aani.test.mjs` | vartijat käännetty |

## 6. Mitä EI tehty

- Raamattua ei muokattu, versionumeroa ei nostettu, PR:ää ei tehty
  (toimeksiannon rajaus). Julkaisu v1928 jää Fablelle.
- Ämpäriin ei koskettu: ei uutta äänitettä, ei manifestin muutosta, ei
  aliasten siirtoa, eikä orvon `livia-ihmisen-matka-1.mp3`:n poistoa
  (varattu numero saa jäädä ämpäriin, kuten kaupungeillakin).
- Koko `npm test` -ajoa ei ajettu, vain asiaan liittyvät tiedostot
  (toimeksiannon rajaus).
