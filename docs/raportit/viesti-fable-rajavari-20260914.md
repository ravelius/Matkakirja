# Viesti Fablelle: kohdemaan raja muiden rajojen väriseksi

**Erä:** KARTTAUUDISTUKSEN PAATOKSET 15 kohta 3 (omistaja 14.9.2026, sanatarkasti:
*"Muuta maanraja saman variseksi kuin muut rajat."*).
**Haara:** `claude/bold-ride-vow4ki-rajavari` (pohja `origin/main` e344d5e7).
**Ei versionostoa, ei Raamattuun, ei mergeä** — Fable versioi ja julkaisee.

---

## 1. Mitä muuttui yhdellä lauseella

Kohdemaan kehä on nyt **täsmälleen naapurimaiden rajan muste `#6b5539`**
(`--raja-muste`, entinen musteensininen `#1f3a5f`); leveys pysyy 3,1 css-px:ssä,
joten **kohdemaa erottuu paksuudella, täydellä peitolla ja yhtenäisyydellä, ei
värillä**.

## 2. Mitattu väri — mistä luku tuli

Mittaus: Chromium `/opt/pw-browsers/chromium`, Fogg Pariisissa, pallolauta,
saapumiskohtaus odotettu ohi. Kaappauksesta luettiin pikselit kahdelta
naapurirajalta (Espanja–Portugali, Saksa–Puola) ja rinnalle materiaalien
ajonaikaiset arvot pallon näyttämöstä.

| mitattu asia | arvo |
|---|---|
| **vektoriraja, materiaali** (js/pallovektorit.js `RAJA_MUSTE`) | **#6b5539, peitto 0,34, leveys 0,95–2,25 css-px** |
| vektoriraja ruudulla, Saksa–Puola (52,5 N 14,62 E) | rgb(205, 194, 163) taustaa rgb(255, 252, 220) vasten |
| vektoriraja ruudulla, Espanja–Portugali (39,65 N 7,35 W) | rgb(199, 187, 155) taustaa rgb(249, 241, 207) vasten |
| *lasku samoista luvuista:* #6b5539 × 0,34 + tausta × 0,66 | rgb(205, 195, 165) ja rgb(202, 187, 154) — **osuu mitattuun ±2** |
| laattoihin poltettu raja (tools/fokuskartta/maailmapiirto.js `RAJATYYLI`) | rgba(96, 74, 46, 0,52) = **#604a2e**, peitto 0,52 |
| rantaviiva (vertailu) | #5a4330, peitto 0,58 |
| kohdemaan kehä ENNEN | #1f3a5f, peitto 1, leveys 3,1 css-px |

**Vektorirajan ja poltetun rajan ero on 11/11/11 yksikköä RGB:ssä** (#6b5539 vs.
#604a2e): poltettu on hiuksenverran tummempi ja kylmempi ruskea. Ohjeen mukaan
valittiin **vektorirajan sävy**, koska juuri se on se raja, joka kulkee
kohdemaan viivan rinnalla samassa piirtokerroksessa ja samalla peitolla
laskettuna; ero on kirjattu tähän ja koodin kommenttiin.

**Kohdemaan kehän mitattu pikseli muutoksen jälkeen on rgb(107, 85, 57)** eli
tasan #6b5539 täydellä peitolla (mitattu kahdeksasta kohdasta Ranskan rajaa,
sama luku joka kohdassa). Sama muste siis, eri vahvuisena — kaiverruksen tapa.

Kontrasti riittää yhä ilman sinistä: seepiapaperiin (#efdcb4) **5,24** ja
värilliseen maahan (230, 219, 172) **5,06**, molemmat yli vaaditun 4,5
(entinen sininen 8,51 / 8,25, entinen punainen 6,32 / 6,13). Testi laskee
molemmat joka ajolla.

## 3. Muutetut tiedostot

- **`css/styles.css`** — `--raja-muste: #1f3a5f` → **`#6b5539`**. Muuttujan nimi
  pysyy (sama nimi, uusi merkitys: *kaikkien* rajojen muste), ja kommentti
  kirjoitettiin uusiksi: mitatut naapurirajan pikselit, ero poltettuun rajaan ja
  se, että kohdemaa erottuu nyt paksuudella. `.maatummennus-viiva` (tasokartan
  kehä) lukee saman muuttujan kuten ennenkin, eli tasokartta muuttui samassa.
  Kehällä ei ole omaa arvoa missään.
- **`js/pallovektorit.js`** — `KOROSTUS_MUSTE` ei ole enää oma heksaluku vaan
  `= RAJA_MUSTE`; funktio `korostuksenMuste` → **`rajanMuste`**, ja **molemmat**
  rajamateriaalit (tavallinen raja ja kohdemaan kehä) rakennetaan siitä, joten
  ne eivät voi ajossa erota toisistaan. Funktio hylkää arvon, joka ei ole väri
  (selvittämätön `var()` kaataisi kolmion). **Leveyteen, peittoon,
  päätypyörylöihin, katkokorjaukseen tai renderöintijärjestykseen ei koskettu.**
- **`tests/maakorostus.test.mjs`** — värivartio: kehän sävy on *sama kuin*
  `RAJA_MUSTE` (ei enää "sininen"), on paletin `--raja-muste`, ei ole `--mark`,
  on tumma ja murrettu, ja kontrastit ≥ 4,5 lasketaan. Uusi vartio: kehä on
  vähintään kolminkertainen leveydeltään ja kaksinkertainen peitoltaan
  tavalliseen rajaan — jos joku ohentaa kehän, kohdemaa katoaa naapuriensa
  sekaan eikä yksikään värivartio huomaisi sitä.
- **`tools/savukkeet/savuke-maan-aariviiva.mjs`** — värimitta uusiksi (ks. 4).

## 4. Savukkeen uusi värimitta

Vartio on nyt ohjeen mukainen: **kehän väri = muiden rajojen väri ±toleranssi JA
viiva 3 px paksu.**

1. kehän materiaalin sävy = paletin `--raja-muste`;
2. paletin sävy = pallon `RAJA_MUSTE` eli naapurirajan muste (savuke tuo vakion
   koodista, ei toista heksalukua savukkeessa);
3. **samasta kuvasta** luetun naapurirajan materiaalin sävy = kehän sävy
   ±4 sRGB-yksikköä (mitattu ero 0);
4. kehä on naapurin rajaa vähintään 1,5 × leveämpi (mitattu 3,66 vs. 2,03 css-px
   työpöydällä, 3,07 vs. 1,39 puhelimella) ja yli entisen 2,5 px:n;
5. sävy ei ole `--mark` eikä entinen sininen `#1f3a5f`.

**Pikselimitta vaihtui sinikanavasta täyden peiton musteeksi.** Koska kehä ja
naapuriraja ovat nyt samaa sävyä, väri ei enää erota niitä ruudulla — *peitto*
erottaa. Pikseli kelpaa kehäksi, jos se on tumma (L ≤ 111) ja lämmin
(R − B ≥ 25). Mitatut luvut, joista raja on johdettu:

| pinta | pikseli | L | lähde |
|---|---|---|---|
| kohdemaan kehä (peitto 1) | rgb(107, 85, 57) | 88 | mitattu 8 kohdasta |
| rantaviiva (peitto 0,58) | rgb(153, 131, 103) | 134 | laskettu peitosta |
| naapurin raja (peitto 0,34) | rgb(205, 194, 163) | 196 | mitattu |
| seepiapaperi | rgb(239, 220, 180) | 222 | paletin `--paper` |

Raja 111 on kehän (88) ja seuraavaksi tummimman pinnan välissä: se ei kelpuuta
rantaviivaa, naapurirajaa, poltettua rajaa eikä merta. **Tämä on tarkoituksella
tiukempi mitta kuin sininen oli:** löysempi kynnys hyväksyisi laattaan poltetun
rajan kehäksi, jolloin savuke menisi läpi vaikka vektorikehä katoaisi kokonaan.

**Uusi poissulku, ja se on syytä sanoa ääneen:** rengaspiste, joka on pelin oman
puoliläpinäkyvän paneelin alla (matkapäiväkirjan kortti, maapaneeli), jätetään
mittaamatta. Työpöydällä 201/1700 pistettä on paneelien alla; siellä kehä näkyy
puoliksi haalistuneena (mitattu Bretagnen kärjessä rgb(180, 164, 138) ≈ puolet
mustetta), eikä se ole kehän vaan kortin ominaisuus — pelaaja ei näe sitä kohtaa
lainkaan. Piste tunnistetaan `elementFromPoint`illa. Sininen mitta ei törmännyt
tähän, koska sen kynnys osui käytännössä puoleen peittoon; ruskea täyden peiton
mitta osuisi, joten poissulku on mitan tiukennuksen hinta.

## 5. Savuke ja vastakoe

```
66/66 vartiota läpi
  puhelin-saapuminen   peitto 100,0 %   #6b5539 / 2,92 px (raja 1,35)   renkaita 16/16   8/8 kohtaa +
  puhelin-zoom         peitto 100,0 %   #6b5539 / 3,07 px (raja 1,39)   renkaita 16/16   8/8 kohtaa +
  tyopoyta-saapuminen  peitto  99,9 %   #6b5539 / 3,66 px (raja 2,03)   renkaita 16/16   6/8 mitattavissa, 6 +
  tyopoyta-zoom        peitto  99,9 %   #6b5539 / 3,66 px (raja 2,03)   renkaita 16/16   6/8 mitattavissa, 6 +
```

Työpöydällä Pyreneet ja Bretagnen kärki ovat maapaneelin ja päiväkirjakortin
alla (INFO-rivi, ei vartio); puhelimella kaikki kahdeksan mitataan ja kaikki
osuvat.

**VASTAKOE** (`SAVUKE_VASTAKOE=1`: kehä maalataan ajossa takaisin entiseen
siniseen #1f3a5f, leveyteen koskematta):

```
22/66 vartiota läpi
  FAIL  <näkymä>: väri on paletin --raja-muste                 — #1f3a5f ≠ #6b5539   (4 ×)
  FAIL  <näkymä>: kehä ja naapurin raja ovat samaa väriä (±4)  — #1f3a5f vs #6b5539  (4 ×)
  FAIL  <näkymä>: väri ei ole entinen sininen                                        (4 ×)
  FAIL  <näkymä>: kehä on ehjä (peitto ≥ 0.9)                  — 1,2…2,3 %           (4 ×)
  FAIL  <näkymä>: <nimetyt kohdat> — ei rajan väriä                                 (28 ×)
```

Sinisellä viivalla ruskea mitta löytää **1,2–2,3 %** (nekin osumat ovat
rantaviivan ja kehän risteyskohtia, eivät kehää). Savuke mittaa siis juuri sitä
sävyä, joka vaihtui.

## 6. Kuvat

- `kuvat/rajavari-tyopoyta-20260914.png` — työpöytä 1400 × 900, Ranskan raja
  ruskeana; naapurien pisterajat näkyvät samassa kuvassa samaa mustetta.
- `kuvat/rajavari-puhelin-20260914.png` — puhelin 390 × 844, sama näkymä.

## 7. Portit

| portti | tulos |
|---|---|
| `npm test` | # pass 3350, # fail 0 (skipped 13 — pollo.test.mjs:n kuormavartiot) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | niputus kunnossa: 387 moduulia, 4221 top-level-julistusta |
| `node tools/tarkista-savukkeet.mjs` | savukkeet kunnossa: 1651 ui-viittausta, 405 metodia, 534 kenttää, 31 lehtitilan kenttää |
| `savuke-maan-aariviiva.mjs` | 66/66; vastakoe 22/66 |

**Rehellisyyden nimissä:** ensimmäinen `npm test` ajettiin samaan aikaan kahden
selainsavukkeen kanssa ja kaatoi 14 aikakriittistä vartiota (kuormahäiriö);
rauhallisessa ajossa tulos on yllä oleva 3350 / 0.

## 8. Mitä EI tehty

Ei leveyden eikä katkokorjauksen muutoksia, ei `--mark`-kosketusta, ei
Raamattuun, ei versionostoa, ei muutoslokiriviä, ei dist/-kansiota.
