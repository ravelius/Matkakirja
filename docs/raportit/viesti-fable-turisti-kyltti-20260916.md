# Viesti Fablelle: turisti-infon kyltti saa saman ruutupikselikaton kuin nimiöt

**Opus-sessio 16.9.2026. Haara `claude/bold-ride-vow4ki-turisti-kyltti`
(pohja origin/main v1925). Ei PR:ää, ei versionostoa, ei
Raamattu-muokkausta.**

Tilaus: Raamattu, KARTTAUUDISTUKSEN PAATOKSET 31 **TARKENNUS 1 kohta 3**
(Fable 16.9.2026 klo 20.45 UTC): *"turisti-infon kyltti
(js/kaupunkinosto.js:n oma merkki, 'Turisti-in…') kasvaa lähizoomissa
rajatta ja leikkautuu ruudun laidasta — kohdan 2 ruutupikselikatto ei
koske sitä; korjataan samaan kattoon (kyltti ei kasva yli nimiökaton
ruudulla, pysyy ruudussa ja klikattavana)."*

**Kuva (ennen | jälkeen, 390 × 844 dpr 2, Pariisin sisin sallittu
zoomi):** `docs/raportit/kuvat/turisti-kyltti-390-20260916.jpg` (87 kt)

Kaksi kolmesta on tehty ja mitattu. **Klikattavuus on mitattu, mutta
JÄTETTY KORJAAMATTA** — se ei ole katon asia vaan osumasääntöjen
järjestys, ja kaksi kokeiltua korjausta kaatoi omistajan omia
vartioita muualla. Luku 4 kertoo mitä mitattiin ja mitä se maksaisi;
päätös on sinun.

---

## 1. Mitattu ennen ja jälkeen

Chromium 390 × 844 ja 1400 × 900, dpr 2, Ranska-tallenne, pelaaja
Pariisissa, saapumissarja loppuun ajettuna, kamera uloszoomauksen
eston pohjaan (osuus 0,341 uloimmasta — se, mihin pelaaja pääsee).

| mitta (Pariisin lähizoomi) | ENNEN | JÄLKEEN |
|---|---|---|
| kyltin nimiö ruudulla, 390 px | **33,00 px** | **16,00 px** |
| kyltin nimiö ruudulla, 1400 px | 22,97 px | 16,00 px |
| kyltin piirretty ala, 390 px | 200,4 → **401,4** px (leveys 201 px) | 211,8 → 309,3 px (leveys 97,5 px) |
| kotelo, 390 px | 373,6 px | 373,6 px |
| **valuma oikean laidan yli, 390 px** | **27,8 px** | **0 px** |
| kyltin nimiö saapumisnäkymässä, 390 px | 27,18 px | 16,00 px |
| kyltin nimiö saapumisnäkymässä, 1400 px | 8,25 px | 8,25 px |
| nostojen ja kaupunkimerkkien nimiöt | 16,00 px (v1925) | 16,00 px (ennallaan) |

Vastakoe on ajettu molempiin suuntiin:

- **koko savuke peruuttamattomalla koodilla** (vartiot 7 ja 7b lisättiin
  ENNEN korjausta): 25/32 läpi, 7 ja 7b punaisina yllä olevin luvuin;
- **lippu `?nimiokatto=0` kesken ajon** (uusi, ks. luku 3): sama näkymä,
  sama kyltti ilman kattoa — **79,80 px** puhelimella (leveys 486 px eli
  yli ruudun) ja 22,97 px työpöydällä.

Puhelimen 79,8 px on isompi kuin ENNEN-sarakkeen 33,00 px, ja se on
juuri se, mitä luku 2 selittää: kyltillä *oli* katto, oma ja väärä.

---

## 2. Juurisyy yhtenä kappaleena

Kyltillä oli oma kattonsa, ja se oli kaksinkertainen nimiöiden kattoon
nähden: `js/kaupunkinosto.js` katkaisi merkin mittakaavan omaan
lukuunsa `KAUPUNKIMERKIN_MITTA_MAX = 3`, eli nimiö 3 ×
`NOSTOSYM_NIMIO_KOKO` = 33 px ruudulla, kun v1925:ssä säädetty
nimiöiden katto (`NOSTON_NIMIO_KATTO_PX = 16`) asui
`js/pallolauta/nostot.js`:ssä eikä koskenut tätä merkkiä lainkaan —
kyltti on pallon merkkikerroksen oma datum, ei karttanosto. Puhelimella
katto puri jo ennen sisintä zoomia (raaka mitta 7,25 → 3), joten kyltti
seisoi 33 px:ssä ja sen piirretty ala oli 201 px 373,6 px:n kotelossa:
27,8 px valui oikean laidan yli, ja siitä syntyi omistajan näkemä
katkennut *"Turisti-in…"*.

**Korjaus on katon muutto, ei uusi katto.** Luku ja katkofunktio
asuvat nyt siellä, missä nimiön kirjasinkokokin —
`js/fokusnosto-symbolit.js` `NOSTOSYM_NIMIO_KATTO_PX`,
`NOSTOSYM_MITAN_KATTO` ja `nostosymKatettuMitta(mitta)` — ja
molemmat piirtäjät TUOVAT sen: `js/pallolauta/nostot.js` vie
`NOSTON_NIMIO_KATTO_PX`/`NOSTON_MITAN_KATTO` edelleen omalla
sanastollaan (savukkeet ja aihemerkit lukevat niitä), mutta ne ovat nyt
saman luvun kaksi nimeä eivätkä kahta lukua. `kaupunkimerkinMitta`
päästää mittansa saman funktion läpi; lattia
(`KAUPUNKIMERKIN_MITTA_MIN = 0,75`) on ennallaan.

**Muita samalla säännöllä korjattavia merkkejä ei löytynyt.** Kävin
läpi kaikki pallolaudan merkit, jotka kirjoittavat oman `scale()`-
muunnoksensa: karttanostot, kaupunkimerkki ja aihemerkit
(`js/pallolauta/nostot.js`, `aihemerkit.js` — kaikki `nostonMitta`n
kautta, siis katossa jo v1925:stä), pelinappula ja lennon kone
(`siirto.js` — ruutuvakioita, ei kameran mittaa), linssien merkit
(`linssit.js` — ei kameraskaalausta) ja satelliittilinssin kuvakatselin
(oma zoominsa, ei kartan merkki). **Turisti-infon kyltti oli ainoa
merkki katon ulkopuolella.** Kaupunkien NIMIKYLTIT
(`js/pallolauta/nimet.js`, `NIMEN_KARTTAKERROIN_MAX = 64`) skaalautuvat
yhä käytännössä rajatta — mutta ne ovat PAATOKSET 14:n mukaan samaa
mittaa kuin maapaneelin leipäteksti, ja v1925:n päätös jätti ne
tietoisesti katon ulkopuolelle; en koskenut niihin.

---

## 3. Vartiot ja vastakoe

`tools/savukkeet/savuke-pariisi-lahizoom.mjs` sai neljä uutta riviä,
jotka mittaavat kyltin OMASTA elementistä (`.pallolauta-turisti-info`,
mitta sen siirtoryhmän `scale()`-muunnoksesta) — vartiot 1 ja 2 eivät
sitä koskaan mitanneet, koska se ei ole `.pallolauta-nosto`:

- **7.** kyltin nimiö ruudulla ≤ 16 px lähizoomissa;
- **7b.** kyltin piirretty ala mahtuu kokonaan koteloon;
- **7c.** *(INFO, ei vartio)* avaako kyltin napautus matkailijan
  oppaan — ks. luku 4;
- **7d.** VASTAKOE: uusi lippu **`?nimiokatto=0`**
  (`js/fokusnosto-symbolit.js`, sama kuvio kuin `?aihemerkit=0`)
  kääntää katon pois **kesken ajon** — `history.replaceState` +
  `ladoHeti`, ei sivun uudelleenlatausta — ja savuke mittaa saman
  kyltin uudelleen. Lippu on tässä tarpeen, koska kyltin kerrointa ei
  voi laskea savukkeessa kuten nostojen (vartio 1b): sen vertailuleveys
  on maan laatikko × 1,15 eikä laitteen saapumisnäkymä, eikä laatikko
  ole savukkeen ulottuvilla. Vastakoe on siis aito mittaus eikä
  laskutoimitus.

Kyltin napautus mitataan **ennen muita kortteja**. Mitattu 16.9.2026:
kun sama napautus tehtiin kolmen nostokortin jälkeen, se ei avannut
mitään, koska laudan oma `korttiOliAuki`-lukko (*"sulkeva napautus ei
avaa mitään uutta"*) nielaisi sen. Lukko on oikein; se on vain eri
asia kuin tämän erän väite.

---

## 4. Klikattavuus: mitattu, EI korjattu — päätös sinulle

**Mitattu tilanne.** Pariisin lähizoomissa sormi TÄSMÄLLEEN kyltin
päällä avaa *Guimardin metron*, jonka merkki on **16,4 px** päässä
kyltin ankkurista (mitattu molemmilla ruuduilla). Kyltti voittaa
lähimmän merkin kilpailun (etäisyys 0), mutta häviää sen jälkeen
mustekilpailussa. Syy on kahden omistajan oman säännön yhteentörmäys:

1. **7.9.2026** (*"Symboli ottaa klikkauksen mutta teksti ei"*, VIAT
   v1680): nostojen osumalaatikkoa venytetään joka suuntaan
   `LAPUN_KOSKETUSVARA_PX` = **16 px**, jotta sormi osuu ohuen nimiön
   tekstiin;
2. **14.9.2026** (Chambord-havainto): noston OMA muste voittaa
   turisti-infon, jottei kyltti nielaise naapurinoston napautusta.

Yhdessä ne tarkoittavat, että kyltiltä vie napautuksen nosto, joka on
pelkän KOSKETUSVARAN päässä — ei sellainen, jonka musteella sormi on.
Rykelmässä se tapahtuu aina.

**Kaksi korjausta kokeiltiin ja molemmat peruttiin, mitattuna:**

| kokeiltu korjaus | korjasi | kaatoi |
|---|---|---|
| (a) kyltin oma muste voittaa, kun sormi on sen päällä eikä minkään noston musteella (`lahinMerkki`) | 7c vihreäksi molemmilla ruuduilla | `savuke-pallo-nostolaput.mjs` vartiot **6 ja 7** Bukarestissa (lapun tekstin napautus 8 px:n sormenpoikkeamalla) — 7/8 → 5/8 |
| (b) kyltin laatikko sovittelun esteeksi, jolloin nostojen laput väistävät sitä (`merkit.js` `mustevalitsin` + `sovittele({ esteet })`) | nostojen laput pois kyltin päältä; ei yksin riittänyt 7c:hen | sama savuke, vartio **2** (kaupunkinimi ei leikkaa liikkumatonta mustetta, Bukarestissa 2 limitystä) — 7/8 → 6/8 |

Molemmat siis korjasivat oman asiansa ja rikkoivat toisen omistajan
tilauksen. **Osumajärjestys rykelmässä on oma eränsä ja oma
päätöksesi**, ei tämän katon sivutuote, joten peruutin molemmat ja
jätin luvun savukkeeseen INFOna perusteluineen, jottei se unohdu.

Sivulöydös, joka kannattaa tietää päätöstä varten: **(b) paljasti, että
kyltin varaus nimiladonnassa on ollut PISTE eikä kyltti.** Merkin svg
on 1 × 1 px ja koko piirros elää `overflow: visible` -ryhmässä, joten
`merkit.laatikot('turistiinfo')` palautti 1 × 1 px:n laatikon — sekä
nimiladonta että nostojen sovittelu ovat siis koko ajan latoneet
kyltin päälle. Se näkyy omistajan kuvassakin (*"Turisti-in…"* ja *"Mona
Lisan varkaus"* päällekkäin). Korjaus on kolme riviä, mutta se siirtää
ladontaa muuallakin — siksi se on osa samaa päätöstä.

---

## 5. Toinen mitattu löydös: kyltin kerroin ei ole sama kuin nimiöillä

Katto korjasi oireen, mutta alla on mitattu epäsuhta, joka kuuluu
sinulle eikä minulle:

| saapumisnäkymä (uloin sallittu zoomi) | kyltin nimiö |
|---|---|
| 390 × 844 | **27,18 px** (ennen korjausta) → nyt 16,00 px (katossa) |
| 1400 × 900 | **8,25 px** (lattiassa 0,75) — ennen ja jälkeen sama |

Sama pelitilanne antaa siis kyltille puhelimella 3,3-kertaisen koon
työpöytään nähden. Syy: kyltin mitta on `uloin / näkyvä`, jossa `uloin`
on **maan laatikko × 1,15** (`js/pallolauta/lauta.js`
`paivitaTuristiInfo`, PAATOKSET 1:n uloszoomausraja), kun nostojen ja
kaupunkimerkkien nimiöt käyttävät **laitteen omaa saapumisnäkymää**
(`nostonKarttakerroin`, PAATOKSET 14). Pystyssä olevassa puhelinruudussa
maan laatikko on paljon leveämpi kuin näkymä, vaakaruudussa kapeampi.

Seuraus katon jälkeen: **puhelimella kyltti on 16 px jo
saapumisnäkymässä eikä skaalaudu enää lainkaan**, työpöydällä se
kasvaa 8,25 px:stä 16 px:iin. Jos haluat kyltin käyttäytyvän kuten
muutkin kartan merkit — 11,5 px saapuessa, 16 px lähizoomissa, sama
kummallakin ruudulla — se on yhden kertoimen vaihto
(`paivitaTuristiInfo` lukisi `nostonKarttakerroin`in vertailun), mutta
se muuttaa kyltin kokoa myös siellä, missä omistaja ei ole valittanut,
joten en tehnyt sitä kysymättä.

`savuke-kaupunkipopup.mjs`:n vartio *"merkki skaalautuu zoomatessa"*
on käännetty tämän mukaiseksi: mitta ei koskaan ylitä kattoa, ja se
kasvaa lähikuvassa AINA kun katto ei jo pure (puhelimella puree jo
saapuessa — luku on vartion omassa perustelussa).

---

## 6. Muutetut tiedostot

| tiedosto | muutos |
|---|---|
| `js/fokusnosto-symbolit.js` | katto yhteiseksi: `NOSTOSYM_NIMIO_KATTO_PX`, `NOSTOSYM_MITAN_KATTO`, `nostosymKatettuMitta()` ja vastakokeen lippu `?nimiokatto=0` (muistetaan hakumerkkijonoa kohti, joten lipun voi kääntää kesken ajon) |
| `js/pallolauta/nostot.js` | katto tuodaan eikä toisteta: `NOSTON_NIMIO_KATTO_PX`/`NOSTON_MITAN_KATTO` ovat nyt saman luvun nimiä, `nostonMitta` käyttää yhteistä katkofunktiota |
| `js/kaupunkinosto.js` | `KAUPUNKIMERKIN_MITTA_MAX` = yhteinen katto (oli oma luku 3), `kaupunkimerkinMitta` katkaisee saman funktion läpi; perustelu mitattuine lukuineen tiedostossa |
| `tools/savukkeet/savuke-pariisi-lahizoom.mjs` | kyltin mittaus (`turisti`-kenttä), vartiot 7, 7b ja 7d, INFO 7c perusteluineen; kyltin napautus ennen muita kortteja |
| `tools/savukkeet/savuke-kaupunkipopup.mjs` | vartio *"merkki skaalautuu zoomatessa"* katon mukaiseksi (kaksiosainen väite) |
| `tools/savukkeet/README.md` | uudet vartiorivit savukkeen kuvaukseen |
| `docs/raportit/viesti-fable-turisti-kyltti-20260916.md` | tämä |
| `docs/raportit/kuvat/turisti-kyltti-390-20260916.jpg` | ennen/jälkeen 390 px |

---

## 7. Ajot

Kaikki 16.9.2026, tässä haarassa, etualalla yksi kerrallaan.

| ajo | tulos |
|---|---|
| `savuke-pariisi-lahizoom.mjs` (390 + 1400) | **30/30** — ja samalla savukkeella korjaamattomalla koodilla **25/32** (7 ja 7b punaisina, 7c ja 7d olivat silloin vielä vartioita) |
| `savuke-nimikyltti.mjs` | 61/68 — **sama kuin v1925:n pohja**: tunnetut punaiset 4 (kyltti/paneeli-suhde), 9b (limittyviä pareja 5) ja 7a/7b (Venetsia ja Firenze). Vartio 6b (nimiön katto) vihreä molemmilla ruuduilla |
| `savuke-kaupunkipopup.mjs` | 40/57 — **täsmälleen sama FAIL-lista kuin pohjalla** (mitattu peruuttamalla muutokset ja ajamalla uudelleen); 17 punaista ovat vanhoja eivätkä tästä erästä |
| `savuke-pallo-nostolaput.mjs` | 7/8 — **sama kuin pohja** (tunnettu punainen 4, korjattu aihenostot-haarassa) |
| `node --test` aihemerkit, nimiolimitys, pallonimikyltti, karttamerkit, pallosovittelu, nostot-kartalla, nostomerkit, rules, dokumentit | **386/386** |
| `node --check` muutetuille tiedostoille | puhdas |

---

## 8. Mitä jäi tekemättä

1. **Kyltin klikattavuus rykelmässä** (luku 4) — mitattu, kaksi
   korjausta kokeiltu ja peruttu, koska molemmat kaatoivat omistajan
   omia vartioita. Tarvitsee oman eränsä ja päätöksen siitä, kumpi
   sääntö väistää.
2. **Kyltin vertailukerroin** (luku 5) — puhelimen ja työpöydän 3,3-
   kertainen ero saapumisnäkymässä. Yhden kertoimen vaihto, mutta
   muuttaa kokoa siellä, missä valitusta ei ole ollut.
3. **Kyltin varaus ladonnassa on piste eikä kyltti** (luku 4, sivulöydös)
   — nimet ja nostojen laput latovat yhä kyltin päälle.
4. Raamattuun ei koskettu, versiota ei nostettu, PR:ää ei tehty
   (tehtävänannon mukaisesti).
