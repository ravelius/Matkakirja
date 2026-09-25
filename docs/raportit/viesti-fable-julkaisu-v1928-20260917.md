# Julkaisu v1928 — Sonnet-agentin raportti 17.9.2026

Haara `claude/bold-ride-vow4ki-julkaisu-v1928`, pohja `origin/main`
= v1927 (`413204c7`). Kaksi haaraa yhdistetty **puhtaasti, ei
konflikteja**. Muutoslokirivi: *"Ihmisen matka: kertojan simpukkavirke
takaisin, pulun pois"*. PR **#2552**, head-SHA `06703592`.

## 1. Mitä haarassa on

| haara | commit | sisältö |
|---|---|---|
| claude/bold-ride-vow4ki-simpukka-palautus | 18980997 | Ihmisen matka -linssin Arabia-jaksoon palautettu kertojan simpukkavirke (poistettu vahingossa aiemmin), `aanitePaivitettava`-lippu pois, pulun repliikki "Simpukoita. Hyvä alku." poistettu kokonaan, Livian linssilähteissä varattu paikka |
| claude/bold-ride-vow4ki (Fable) | 8910c8d3 | Raamattu-päivitys (linjaukset) |

Molemmat mergesit menivät läpi ilman konfliktimerkkejä (`ort`-strategia,
ei manuaalista ratkaisua). Raamattuun ei koskettu käsin — Fablen haaran
versio meni sellaisenaan. `js/main.js`:ään tuli vain
`APP_VERSION`-rivi versiotyökalulta (tarkistettu `git diff`:llä ennen
committia: myös `js/muutokset.js` ja `sw.js` vain odotetut rivit).

**Vastakoe diffin laajuudelle:** `git diff --name-only
origin/main..HEAD` ennen versionostoa antoi täsmälleen tämän erän 12
tiedostoa (Ihmisen matka -linssi, Livian puhe, Raamattu, testit,
savukkeet, raportti) — ei yhtään poistoa.

## 2. Testit: 3556 pass / 0 fail / 13 skip

`NODE_USE_ENV_PROXY=1 npm test` → `# tests 3569`, `# pass 3556`,
`# fail 0`, `# skipped 13`. Sama luku kuin v1927:ssä. Ohitukset ovat
ympäristön omia (geo-kirjastot, manifesti, rantaviiva-aineisto),
yhtään ei ohitettu, poistettu eikä karanteenattu.

| työkalu | tulos |
|---|---|
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 394 moduulia, 4388 julistusta, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | 1898 ui-viittausta, 409 metodia, 539 kenttää, 31 lehtitilan kenttää |
| `tools/build-standalone.mjs` | läpi, `dist/matkakirja.html` 32 493 kt |

## 3. Savukkeet (nopeutussääntö: täysinä vain diffiä koskevat)

| savuke | näkymä | tulos |
|---|---|---|
| savuke-ihmisen-kappaleet | 390 + 1400 | 1. ajo 36/38, **uusinta 38/38** |
| savuke-ihmisen-kehys | 390 + 1400 | 20/21 (tunnettu, ei tämän erän) |
| savuke-ihmisen-esitys (VAIN_AVAUS=1) | 390 | **13/13** |
| savuke-astro-pallo | puhelin (`NAKYMAT=puhelin`) | **37/37** |
| savuke-pariisi-lahizoom | puhelin + työpöytä (oletus — ei tue yhden ruudun rajausta) | **56/56** |

`savuke-astro-pallo.mjs` tukee `NAKYMAT=puhelin`-rajausta, joten se
ajettiin yhdellä ruudulla ohjeen mukaisesti. `savuke-pariisi-
lahizoom.mjs`:ssä ei ole vastaavaa ympäristömuuttujaa (tarkistettu
lähdekoodista), joten se ajettiin oletusasetuksin — molemmilla
ruuduilla, kuten se aina tekee.

## 4. Tunnetut punaiset — mitattu, ei korjattu

### 4.1 `savuke-ihmisen-kappaleet` — kaksi punaista 1. ajossa, kumpikin hävisi uusinnassa

**390px "saapuminen siirtyy tasan ZOOMIN_JATKO_MS (5000 ms) jakson
alun yli"**: mitattu kesto 16 570 ms, mallin odotus 19 580 ms. Tämä on
ohjeessa nimetty tunnettu häilyvä vartio (sama kuin v1926/v1927:ssä).
**Ei tämän erän aiheuttama**: yksikään Ihmisen matka -linssin
kameran/ajoituksen tiedosto ei muuttanut tätä väitettä tässä
diffissä.

**1400px "avauksen loppuasennossa koko Afrikka on ruudulla"** —
tuloksena `null` (ei vain kynnyksen alitus vaan koko mittaus jäi
tekemättä). Tämä EI ollut ohjeessa nimetty tunnettu punainen, joten
se tutkittiin erikseen:

- `git diff origin/main..HEAD -- tools/savukkeet/savuke-ihmisen-kappaleet.mjs`
  osoittaa, että tämä väite (4b, "AVAUKSEN LOPPUASENTO") ja sen
  mittauslogiikka eivät muuttuneet tässä PR:ssä — diffi koskee vain
  pulun simpukkakommentin ja kertojan simpukkavirkkeen mittareita.
- Tiedoston oma kommentti (rivit 318–331) toteaa, että mittaus on
  ajastettu 250 ms:n välein sivun SISÄLLÄ juuri siksi, että yksi
  `evaluate`-kutsu maksaa kontissa satoja millisekunteja — sama
  kuormitusherkkä kategoria kuin ZOOMIN_JATKO_MS-vartiolla.
- **Vastakoe: koko savuke ajettiin uudestaan kokonaan.** Tulos
  **38/38** — molemmat väitteet vihreitä, kumpikaan ei jäänyt
  kiinni kahdesti.

Kumpaakaan ei korjattu eikä kynnystä muutettu, kuten ohje edellyttää.

### 4.2 `savuke-ihmisen-kehys` 1400px "kehys ja kartta nousevat SAMASSA feidauksessa"

20/21 — pysyvästi avoin, samat pyörimisestä johtuvat häilyvät vartiot
kuin edellisissä julkaisuissa (v1927-raportin luku 6: "1400 px kahden
ruudun ajossa, kaksi pyörimisestä johtuvaa häilyvää vartiota"). Tässä
ajossa vain yksi niistä laukesi (`naytteita:1`, ero 0 mutta pisteiden
"0.99/1.00" -pari jäi ainoaksi näytteeksi). Ei ihmisen-kehys-
tiedostoja tämän PR:n diffissä.

### 4.3 Ennallaan mainista — muut savukkeet eivät kuulu tähän erään

`savuke-nimikyltti` ja `savuke-kaupunkipopup` tunnetut punaiset
(v1927-raportin luku 5.2) jätettiin ajamatta, koska tämän erän diffi
ei kosketa Pariisin karttaa eikä nostoja — nopeutussäännön mukaisesti
vain diffiä koskevat savukkeet ajettiin täysinä, muut yhden ruudun
otannalla (astro-pallo, pariisi-lahizoom).

## 5. Avoimeksi jäi

1. `savuke-ihmisen-kehys` 1400 px:n kahden pyörimisestä johtuvan
   häilyvän vartion korjaus (satelliittilinssi/astro-pallo-kategoriaa,
   avoin useasta julkaisusta).
2. `savuke-ihmisen-kappaleet`:n kameran aikasarjan nappaus (`avausLoppu`,
   250 ms:n `setInterval` sivun sisällä) on herkkä kontin kuormitukselle
   1400 px:n ruudulla — sama juurisyykategoria kuin ZOOMIN_JATKO_MS-
   vartiolla. Ei korjattu tässä erässä (ei ohjeistettu, mitattiin vain).
3. Kaikki v1927-raportin luvun 6 avoimet kohdat (nimikyltin katto,
   kyltin klikattavuus, vertailukerroin, ladonnan piste-varaus,
   aihenostojen 1 pari) — ei kosketettu tässä erässä.

## 6. Kesto

Merge alkoi n. klo 04.14 UTC, PR ja tämä raportti valmiit n. klo
04.45 UTC — kokonaiskesto n. **30 minuuttia**.
