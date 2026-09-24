# Vesiviivat laudan yksiköihin (omistaja 22.9.2026 klo 15.55)

Omistaja: vesiviivoitus säilyy, mutta se on saatava toimimaan tasoissa.
Päätetty työnjako: viivojen **väli, kasvu ja huojunta laudan yksiköihin**,
**paksuus ja voima paperipikseleihin**, ja **alle ~3 px:n viivavälillä joka
toinen viiva pois**. Paperin hieno rae siirtyy poltosta peliin
ruutuavaruuden kerroksena (Pelikoodari); isot laikut laudan yksiköihin.

Tämä dokumentti kattaa ensimmäisen osan: vesiviivat.

## Muutos (tools/patina.mjs)

Patinassa oli ennestään kaksi mittaluokkaa: paperin omat efektit saivat
vain faasisiirron (`faasiX/faasiY`), ikääntymisen laikku koko muunnoksen
laudalta (`maailmaX/maailmaY`). Vesiviivoitus oli kolmatta lajia, jota jako
ei tuntenut: **viivan leveys on paperin mitta, mutta viivan paikka on
maailman mitta.** Paperivakiona (`paperiS: 1`) viivasto oli joka tasolla eri
kohdassa merta.

- Uusi `vvSkaala` = pikseliä `VIITE_PX`-yksikköä kohti tällä tasolla.
  Sillä kerrotaan `aloitus`, `vali`, `kasvu` ja `huojunta`.
- Huojunnan ja roson koordinaatit luetaan `maailmaX/maailmaY`:stä, joten
  sama maailmankohta saa saman mutkan joka tasolla.
- `paksuus` ja `voima` jäävät `sp`:hen: viiva on ruudulla yhtä paksu ja
  yhtä tumma joka tasolla.
- Harvennus `VV_VAHIN_VALI_PX = 3`: askel on 1, 2, 4 … sen mukaan, paljonko
  paikallinen viivaväli alittaa kolme pikseliä, ja ehto on `k % askel === 0`.
  Koska harvennus on viivan INDEKSISTÄ eikä paikasta, karkean tason viivat
  osuvat tarkan tason viivojen päälle — ristihäivytyksessä ne vahvistavat
  toisiaan sen sijaan että sotkisivat.

Ilman `maailma`-bbox:ia (yksittäinen koekuva) kaikki palautuu vanhaan.
`npm test` 3913/0.

## Vedokset

`docs/raportit/kuvat/vesiviivat-ennen-jalkeen-z5-z8-20260922.jpg` — sama
maa-ala Lioninlahdella z5, z6, z7, z8 (vasemmalta oikealle); ylärivi vanha,
alarivi uusi. Vanhassa viivasto on joka tasolla eri kohdassa ja eri
määräisenä; uudessa sama vyö seuraa rantaa kaikilla tasoilla ja karkeilla
tasoilla viivoja on harvempi, ei tummempi.
`…-avomeri-…jpg` — sama avomerellä (Sardinian pohjoispuoli).

## MITÄ TÄMÄ EI VIELÄ KORJAA

Tasojen välinen korkeataajuinen korrelaatio EI parantunut tästä:

| | ennen | jälkeen |
| --- | --- | --- |
| matalataajuus (meren sävy) z5↔z6 | 0,961 | 0,973 |
| korkeataajuus (rae, kuitu, viivat) z5↔z6 | 0,136 | **0,125** |

Syy on odotettu ja tärkeä: **korkeataajuisesta energiasta valtaosa on
paperin raetta, ei vesiviivoja** — viivat ovat pieni osa pikseleistä.
Meren "lika" zoomatessa korjautuu siis vasta, kun hieno rae siirtyy pois
poltosta ruutuavaruuteen (omistajan valinta b, Pelikoodari) ja isot laikut
laudan yksiköihin. Tämä erä korjaa sen, minkä omistaja näkee viivoissa:
viivat ovat samassa paikassa tasosta toiseen.

Mittaus toistuu: vedokset z5 ja z6 samasta alueesta, z5-laatan 20/9
neljännes (256..512, 256..512) skaalataan 512:een ja verrataan z6-laattaan
41/19; kuvat jaetaan 9 × 9 keskiarvolla matala- ja korkeataajuiseen osaan.

---

# Erä 2: laikut laudalle, hieno rae lipun taakse (22.9.2026 klo 17)

Omistajan valinta b): hieno rae pois poltosta ja peliin ruutuavaruuden
kerroksena; isot laikut laudan yksiköihin.

## Muutos

- `tools/fokuskartta/maailmapiirto.js`: uusi asetus `paperiRaeRuudulla`
  nollaa kuidun ja rakeen laatasta. Laikku (260 px) siirtyi laudan
  yksiköihin (`LAIKKU_YKSIKOT = 260 / 7,2`, sama viitetaso kuin meren
  vyöhykekohinalla) ja seuraa samaa kytkintä `--syvyyskohina lauta`.
- `tools/generoi-laattapyramidi.mjs`: uusi lippu `--paperirae ruutu`,
  joka välittää asetuksen piirtoon JA nollaa patinan paperikentät
  (`rae`, `raeKarkea`, `kuitu`, `kuituRisti`, `klimppi`). Ikääntymisen
  laikku ei ole mukana: se on jo sidottu laudalle (`maailmaX/maailmaY`).
- Lippu kirjataan luetteloon (`paperirae: 'ruutu'`), jotta ämpäristä
  näkee mitä ajettiin. `npm test` 3913/0.

Vedos: `docs/raportit/kuvat/paperirae-rannikko-z5-z8-20260922.jpg`
(z5–z8 sama maa-ala; ylärivi tuotanto, alarivi uusi resepti).

## Mittaustulos, joka on syytä lukea ennen kuin peliin rakennetaan mitään

Rakeen poisto muuttaa laattaa **vähemmän kuin odotti**. Saman z6-laatan
korkeataajuinen rms (paikallinen poikkeama 9 × 9 keskiarvosta):

| | z5 | z6 |
| --- | --- | --- |
| A, tuotanto | 7,36 | 8,39 |
| B, vesiviivat laudalle + `--paperirae ruutu` | 7,21 | **8,17** |

Eli poltettu kuitu ja rae ovat vain noin 3 % meren hienorakenteen
energiasta. Loppu tulee muualta: patinan muista passeista (syvyyden
litistys, rosoisuus, kohdistus, leviäminen), meren sävyrampista ja
laatan häviöllisestä pakkauksesta. **Jos "lika" zoomissa on tätä
hienorakennetta, ruutuavaruuden rae ei yksin sitä poista.**

Samalla on sanottava suoraan, että aiemmin raportoitu korrelaatioluku ei
kelpaa edistymismittariksi: z5 skaalataan z6:n mittaan, jolloin z5:n
puolella ei ole lainkaan sisältöä z6:n hienoimmalla taajuudella, ja
korrelaatiolla on siksi katto selvästi alle ykkösen riippumatta siitä,
mihin kuvio on sidottu (ilman patinaa 0,49, patinan kanssa 0,13–0,14).
Luku kelpaa osoittamaan KONTRASTIN matalan taajuuden (0,96) ja hienon
kuvion välillä — sen se osoitti — mutta ei sen mittaamiseen, paraneeko
tilanne. Päätökset on tehtävä vedoksista ja siitä, mihin kukin kuvio on
koodissa sidottu.

Ehdotus jatkoksi: ennen kuin Pelikoodari rakentaa ruutukerroksen,
mitataan pelistä, mikä zoomin aikana todella vaihtuu — kahden peräkkäisen
tason ristihäivytys samasta näkymästä, ja erotuskuva. Se kertoo, onko
jäljellä oleva lika laatassa vai kerrosten sekoituksessa.
