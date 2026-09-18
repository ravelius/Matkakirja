# Viesti Fablelle: kamera heti, liuska aina oikealle, nimi piiloon (18.9.2026)

Opus, haara `claude/bold-ride-vow4ki-liuska-oikealle` (origin/main v1936
päältä, ei versionostoa, ei PR:ää). Aloitus 18.9.2026 klo 09.01 Suomen
aikaa, mittaukset Mac Studiolla (Chromium 1234, dpr 2). Tehtävä: Raamattu
KARTTAUUDISTUKSEN PAATOKSET 34 kohta 14 a–d (Fablen haarassa
`origin/claude/bold-ride-vow4ki`; Raamattuun ei koskettu).

## 1. a) Kamera lähtee heti — juurisyy oli käyrä, ei viive

Omistaja: *"Kartta pitaisi siirtya heti napautuksen jalkeen. Nyt siina on
turhan pitka tauko ennen kuin liike tapahtuu."*

**Napautuksen ja ajon välissä ei ollut odotusta.** Luin polun läpi
(`js/pallolauta/lauta.js` `napautaPintaan` → `napautaKaupunki` → async-IIFE):
liuskan tilantarve lasketaan ja `kamera.ajaKamera` kutsutaan SAMASSA
kehyksessä, eikä välissä ole `ladoLevossa`-odotusta, lepotestiä eikä
edellisen ajon odotusta (`ajaKamera` katkaisee edellisen ajon itse).

**Tauko oli ajon oma kiihdytysramppi.** Avausajo käytti oletuskestoa
`PALLOKAMERAN_AJO_MS` = 1400 ms ja koreografian trapetsia, jonka ramppi on
30 % kestosta (`js/siirtokoreografia.js` `SAATON_RAMPPI`). Kaavasta:

| aika napautuksesta | kuljettu osuus matkasta (1400 ms / ramppi 0,30) |
|---|---|
| 100 ms | **0,5 %** |
| 200 ms | 1,9 % |
| 300 ms | 4,1 % |

Kun ajon matka on ~150 px, sadassa millisekunnissa liikutaan alle pikselin.
Silmä lukee sen taukona — täsmälleen se, mitä omistaja näki.

**Korjaus:** liuskan avauksella on oma kesto ja oma ramppi
(`js/pallolauta/kamera.js`: `LIUSKAN_AJO_MS` = 420 ms, `LIUSKAN_AJON_RAMPPI`
= 0,12, `LIUSKAN_PEHMENNYS`). Sama trapetsi kuin muualla, mutta lyhyt
kiihdytys: 100 ms:n kohdalla on kuljettu noin viidennes matkasta. Muut ajot
(saapuminen, siirto, sukellus) eivät muutu — luku on vain tällä ajolla.
Kesto 420 ms alittaa kohdan 10 vaatiman 600 ms:n, ja liuska avautuu yhä
vasta ajon päätyttyä (lepotesti ei sulje sitä).

## 2. b) Liuska aina merkin oikealle puolelle

Omistajan kuvassa v1936 liuska aukesi merkin **vasemmalle** nappulan päälle
ja oli oikealle tasattu. Syitä oli kolme, ja kaikki kolme on poistettu:

1. **Puoli oli hakutulos.** `viuhkanAsemat` kokeili molempia puolia ja
   valitsi pienemmän sakon; runsas muste oikealla vei listan vasemmalle.
   Nyt liuska antaa `vainOikea: true` (`js/pallolauta/aihemerkit.js`),
   jolloin puolia on yksi. Viuhka latoo kuten ennen (oletus epätosi).
2. **Reunakiinnitys veti listaa vasemmalle.** Kun rivi ei mahtunut oikeaan
   laitaan, kiinnitys siirsi koko listaa vasemmalle — merkin yli. Nyt
   `vainOikea` lattioi siirron: lista ei koskaan siirry merkin vasemmalle
   puolelle (`dx = Math.max(dx, dx0)`).
3. **Rivin leveys oli `max(oikean puolen tila, puoli ruutua)`.** Se pakotti
   listan leveämmäksi kuin mitä oikealle mahtui. Nyt leveys on se, mikä
   oikealle jää (katto 78 % ruudusta, lattia neljännes) ja **liian pitkä
   nimi rivittyy** — leveys joustaa, puoli ei. Vaakapaon ehdokkaista jäivät
   vain oikean puolen ehdokkaat (esteen oikea reuna).

Kamera-ajo vie merkin ruudun vasempaan neljännekseen
(`LIUSKAN_MERKIN_OSUUS_X` = 1/4) ja pystysuunnassa vapaan kaistan keskelle
(yläpalkki/paikkarivi ja pulu/Liiku rajaavat) — se osa oli jo kohdasta 12 ja
pysyi ennallaan. Kelaus on yhä viimeinen keino (`keskitettyMahtuvatRivit`).

## 3. c) Kaupungin iso nimi piiloon liuskan ajaksi

Omistaja: *"Pariisin nimikyltinhan voi vaikka ottaa pois nakyvista
silloin, kun viuhka aukeaa."*

Nostokerros tietää nyt, minkä kaupungin liuska on auki
(`nostot.liuskanKaupunkiId()`), ja `nimet.lado` saa `piilota`-tunnuksen
(`js/pallolauta/nimet.js`). **Piilotus on ladonnan viimeinen vaihe, ei
ehdokkaiden karsinta:** nimi latoo ja saa paikkansa kuten ennen, joten sen
LUKKO (kohta 13 b, kylki ja asento lukitaan kerran saapumisessa) syntyy ja
säilyy — pois jää vain muste, este (`laatikot`) ja osumapinta. Sulkiessa
nimi palaa täsmälleen samaan asentoon.

`nimetyt` ei kutistu: siitä riippuu kartan PISTE (piste vain nimen kanssa),
ja piilotettu nimi ei saa viedä sitä merkkiä, johon liuska on ripustettu.
Liuskan oma ladonta pudottaa saman tunnuksen kovista esteistä (edellisen
ladonnan laatikko eläisi muuten yhden kierroksen).

d) Nappula, pulu ja Liiku ovat yhä kovia esteitä, ja muiden nostojen nimiöt
väistyvät kuten ennen (lukkosääntöihin, kohta 13, ei koskettu).

## 4. Mittaus

MITTAUSTULOKSET

## 5. Mitä EI tehty

- Raamattuun, `sarjat.json`iin, `js/linssit/`-tiedostoihin tai
  `js/fokusvirta.js`:ään ei koskettu; versionostoa ei tehty (Fable).
- Kohdan 13 lukkosääntöihin ei koskettu. Huomio: nimen piilotus muuttaa
  esteistöä, joten muiden nostojen nimiöt voivat asettua liuskan avatessa
  eri kyljelle kuin ennen avausta — veto ja zoomi eivät sitä tee (vartiot
  8m ja 8n), mutta jos omistaja haluaa nimiöiden pysyvän myös avauksen yli,
  se on oma päätöksensä.

## 6. Tiedostot

- `js/pallolauta/kamera.js` — `LIUSKAN_AJO_MS`, `LIUSKAN_AJON_RAMPPI`,
  `LIUSKAN_PEHMENNYS`.
- `js/pallolauta/lauta.js` — avausajo omalla kestolla ja käyrällä,
  `nimet.lado({ piilota })`.
- `js/pallolauta/aihemerkit.js` — `viuhkanAsemat({ vainOikea })`.
- `js/pallolauta/nostot.js` — vain oikean puolen vaakaehdokkaat, rivin
  leveys oikean puolen tilasta, `liuska.kaupunkiId`,
  `nostot.liuskanKaupunkiId()`, oman nimen pudotus esteistä.
- `js/pallolauta/nimet.js` — `lado({ piilota })`, laatikot kantavat
  tunnuksensa.
- `tools/savukkeet/savuke-pariisi-lahizoom.mjs` — vartiot 8o, 8p, 8p2, 8q
  saapumisnäkymästä.
