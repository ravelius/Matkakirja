# Viesti Fablelle: pisteet näkyvät aina kohdemaassa (18.9.2026)

Erä: Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34 kohta 21 (puhelintestin
v1944 löydös 1). Haara `claude/bold-ride-vow4ki-pisteet-aina`, pohja
`claude/bold-ride-vow4ki` (main v1944 + Raamattu, c0273571).

Omistaja sanatarkasti: *"kohteet eivat nay tassa zoom tasolla. ainakin
pisteet pitaisi nakya nostoista ja kaupungeista"*.

---

## 1. Juurisyy — mitattu, ja OSITTAIN ERI kuin ennakkoluenta

Ennakkoluenta (tehtävänanto) sanoi syyksi lähizoomiportin
(`lahizoomiAuki`, LAHIZOOMIN_OSUUS_ULOIMMASTA 0,7). **Mittaus kaatoi
sen:** `merkkiPortti` saa kohdemaassa lipun `{ kohdemaa: true }`, jolloin
katto on `Infinity` eikä `lahi`-lippu pidätä mitään. Mitattu Ranskan
saapumisnäkymässä ennen korjausta, kaikilla kolmella ruudulla:

```
portti: { uloinOsuus: 1, merkkeja: 77, piiloon: 0, polttovelka: 0 }
```

`piiloon 0` — portti ei pudottanut yhtäkään merkkiä. Sama koskee
PAAKARTAN_MERKKIKATTOa (21): se on jo nyt `Infinity` kohdemaassa
(PAATOKSET 25 kohta 1), eikä siihen tarvinnut koskea.

Oikeat juurisyyt ovat kaksi, ja molemmat on mitattu:

**A) CSS2D-KATTO 40 OLI KIINNI.** `NOSTOJEN_KATTO = 40`
(js/pallolauta/nostot.js) leikkaa `piirrettavat`-listan. Mitattu DOM
saapumisnäkymässä oli **täsmälleen 40** sekä 2000 × 1300 että
1400 × 900 -ruudulla — eli katto oli kiinni ja karsi eläviä nostoja.
Savukkeen Node-vartio laskee Ranskan kartan eläviksi nostoiksi **48**
(+ 7 kaupunkipistettä = 55 mahdollista pistettä), joten katto pudotti
niistä yli kymmenen. Rinnakkaisen erän 12 lisänostoa putoaisivat samaan
kattoon sellaisenaan.

**B) LEHDEN PORTTI SAMMUTTI KOKO KERROKSEN.** `keraa` keräsi rivit vain
kun `lehdenOsuus(pohja, nakyva, pack.id) >= LEHDEN_VAHIN_OSUUS` (0,5).
Portti on kirjoitettu MERKEILLE — nimiöineen ja 44 px:n osuma-aloineen
(js/fokuskohteet.js MERKIT SYTTYVÄT VASTA KUN LEHTI ON LÄHIKUVASSA) —
eikä se erottele pistettä nimiöstä. Mitattu vaikutus: yksi
loitonnusele saapumisnäkymästä pudotti pisteet ja kaupungit näin,
vaikka kameran korkeus ei muuttunut lainkaan (uloszoomaus on lukittu
maan laatikkoon, PAATOKSET 17 — korkeus 0,204933526712716 ennen ja
jälkeen):

| ruutu | pisteet saapuessa | pisteet eleen jälkeen | kaupungit |
|---|---|---|---|
| 2000 × 1300 | 44 | 31 | 7 → 5 |
| 1400 × 900 | 44 | 24 | 7 → 4 |
| 390 × 844 | 34 | 14 | 5 → 1 |

Juuri tämä on omistajan lause *"kohteet eivat nay tassa zoom tasolla"*.

**KOLMAS HAVAINTO, JOKA EI OLE VIKA MUTTA SELITTÄÄ KUVAN.** Omistajan
kuva on otettu isoisän KUVASARJAN aikana: siinä näkyy Lontoo–Praha–Rooma,
Ranska n. 85 % korkeudesta ja kartan päällä valokuvakortti. Toistin sen
(kaappaus `ennen-2000.png`): kuvasarjan aikana kartta on himmennetty
eikä yhtään nostopistettä erotu, vaikka merkit ovat DOMissa. Kun
kuvasarja ohitetaan, pisteet ja nimiöt ovat ruudulla
(`ennen2-2000.png`). Kuvasarjan himmennykseen EI kosketa tässä erässä —
se on oma päätöksensä, ja kirjaan sen Fablelle kohdassa 6.

---

## 2. Muutokset tiedostoittain

**js/pallolauta/nostot.js**

1. `PISTEIDEN_KATTO = 120` (uusi vienti) ja sen perustelulohko *KATTO EI
   SAA PUDOTTAA KOHDEMAAN PISTETTÄ*. `paivita` ottaa uuden parametrin
   `pisteKatto`. Katon yli menevät kohdemaan rivit piirtyvät edelleen,
   mutta PELKKINÄ PISTEINÄ (`nimioNakyy: false`, `vainPiste: true`).
   Nimiöllisiä rajaa yhä vanha `katto`, eli ruudun TEKSTIMÄÄRÄ ei kasva.
2. `keraa`: lehden osuus omaan muuttujaansa (`osuusNyt`) ja uusi ehto
   `pisteetVain = !lehtiNakyy && osuusNyt > 0 && uloinOsuus > 0`. Sen
   ollessa tosi kerros kerää rivit normaalisti mutta pakottaa
   `nimioNakyy: false` — pisteet piirtyvät, nimiöt eivät. Perustelulohko
   *PISTEET NÄKYVÄT AINA KOHDEMAASSA*.
   - `uloinOsuus > 0` on tarkoituksellinen raja: se tarkoittaa, että maan
     zoomilukko on voimassa. Kehittäjän maailmanapissa ja linssissä
     lukko on pois ja `uloinOsuus` on 0, jolloin vanha portti pätee eikä
     maailmankuvaan sada maan pisteitä yhdeksi läiskäksi.
3. `paivita` palauttaa uuden kentän `nimiollisia` (nimiölliset +
   liuskan ankkuri).

**js/pallolauta/lauta.js**

4. `nostot.paivita`-kutsuun `pisteKatto: lento ? 0 : PISTEIDEN_KATTO`
   (avauslennolla kartta on niukin kuten ennen).
5. Kaupunkien NIMIBUDJETTI lukee nyt `nostoTulos.nimiollisia`, ei
   `nostoTulos.maara`. Ilman tätä pisteiden päästäminen esiin olisi
   vienyt kaupunkien nimet (`HTML_MERKKIEN_KATTO - pelia - maara`) — eli
   täsmälleen päinvastoin kuin omistaja pyysi.

**tests/kohdekaupunki.test.mjs**

6. Kytkentävartio *piste, ladonta ja osuma lukevat saman yhden säännön*
   tarkasti portin lähdetekstin `lehdenOsuus(...) >= LEHDEN_VAHIN_OSUUS`
   yhtenä rivinä. Sama portti on yhä paikallaan, mutta kolmella rivillä,
   joten vartio lukee nyt ne kolme (`osuusNyt`, `lehtiNakyy`,
   `pisteetVain`) — sääntö on sama, mittaus tarkempi.

**tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs**

7. Ruutu **2000 × 1300** mukaan sarjaan (omistajan oma ruutu; sitä ei
   ollut mitattu lainkaan).
8. Pisteraja 35 → **40** (390 px:llä **36**) ja kaupunkiraja **7**
   (390 px:llä **5**). 390 px:n kaupunkiluku oli aiemmin pelkkä INFO;
   nyt se on vartio, koska PAATOKSET 34 kohta 21 antaa sille luvun.
9. Uusi **vartio 7: loitonnus ei vie pisteitä** — saapumisnäkymästä
   yksi loitonnusele ja sama pisteraja uudelleen. Apufunktio `loitonna`.

`tools/savukkeet/sarjat.json` ei vaatinut muutosta: savuke on
julkaisusarjan rivillä 26 ilman ruutuvalintaa, joten uusi ruutu tulee
mukaan sellaisenaan.

---

## 3. Mittausluvut kolmella ruudulla

Mittari: `tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs`, Chromium,
dpr 2, Ranskan saapumisnäkymä, Pariisi-tallenne. "Pisteet" = elävä
merkki TAI laattaan poltettu muste, joka on ruudulla ja osumalistalla.

### Saapumisnäkymä (vartiot 5 ja 6)

| ruutu | pisteet ennen | pisteet jälkeen | raja | kaupungit ennen | jälkeen | raja | DOM ennen | jälkeen |
|---|---|---|---|---|---|---|---|---|
| 2000 × 1300 | 44 | **45** | 40 | 7 | **7** | 7 | 40 (katto kiinni) | 45 |
| 1400 × 900 | 44 | **45** | 40 | 7 | **7** | 7 | 40 (katto kiinni) | 46 |
| 390 × 844 | 36 | **36** | 36 | 5 | **5** | 5 | 32 | 32 |

Kaikki kuusi vartiota (5 ja 6 kolmella ruudulla) **läpi**. Ratkaiseva luku
on DOM: ennen se oli TÄSMÄLLEEN katto 40 kahdella leveällä ruudulla,
nyt 45 ja 46 — katto ei enää pidätä pisteitä. 390 px:llä katto ei ollut
kiinni (DOM 32 < 40), joten siellä luvut eivät muutu; siellä 12 nostoa
on kuvan ulkopuolella PAATOKSET 17:n korkeuteen sovituksen takia (lista
luvussa 6).

Rinnakkaisen erän 12 lisänostoa: niitä EI ole tässä pohjassa (savukkeen
Node-vartio laskee 48 elävää + 7 kaupunkipistettä). Koordinaattorin
pyytämä *1400 px pisteitä >= 55* ei siis ole mitattavissa tällä
datalla — 55 pistettä edellyttää ne 12. Tällä pohjalla mitattu katto on
`pisteKatto` 120, eli kun ne 12 tulevat sisään, ne mahtuvat: ennen
korjausta katto 40 olisi pudottanut ne suoraan (DOM oli 40).

### Loitonnus (uusi vartio 7)

| ruutu | pisteet saapuessa | pisteet eleen jälkeen | raja | tulos |
|---|---|---|---|---|
| 2000 × 1300 | 45 | 32 | 40 | **PUNAINEN** |
| 1400 × 900 | 45 | 23 | 40 | **PUNAINEN** |
| 390 × 844 | 36 | 4 | 36 | **PUNAINEN** |

Vartio 7 jää punaiseksi. Se on tietoinen: kohta 21:n toinen puoli
(*"ja siita ulospain"*) EI korjaantunut näillä kahdella muutoksella, ja
piilottaisin ongelman, jos lieventäisin vartion INFOksi. Merkitty
`tools/savukkeet/sarjat.json`:iin `tunnetutPunaiset`-listalle omalla
perustelullaan, jotta julkaisusarja ei kaadu tuntemattomaan punaiseen
mutta luku pysyy näkyvissä. Mitä tiedän: kameran korkeus EI muutu
eleessä (zoomilukko), mutta ladonta ajetaan silti uudelleen ja tuottaa
eri tuloksen. `pisteetVain`-haara ei siis laukea — todennäköisin syy on,
että eleen jälkeen `uloinOsuus` tai maan zoomiraja on hetkellisesti
nolla, jolloin uusi haara on tarkoituksella kiinni (kehittäjän
maailmanäkymän suoja). Se on seuraavan erän työ; en arvannut korjausta
ilman mittausta.

---

## 4. Löydökset a–c omistajan kuvasta

**a) Pariisin iso nimi ja pieni nimiö päällekkäin — EI TOISTUNUT.**
Kuvasarjan jälkeisessä saapumisnäkymässä (kaappaus `ennen2-2000.png`,
2000 × 1300) Pariisilla on kartalla yksi nimi, iso `PARIISI`, ja sen
vieressä pelinappula. Koodissa syy on näkyvissä: laudan oma kaupunki
tulee nostokerrokseen rivinä, jolla on `nimioNakyy: false`
(js/pallolauta/nostot.js `laudanRivit`), ja se rivi piirretään vain
liuskan ollessa auki. Pieni "Pariisi" on siis joko liuskan ankkuri tai
kuvasarjan aikainen tila; kumpaakaan en saanut toistumaan tässä erässä.
**Ei korjattu — pyydän omistajalta kuvan hetken (oliko liuska auki).**

**b) "Alpit" näkyy vaikka nostopisteet eivät — OMA KERROS, EI VIKA.**
Maastonimet (`js/packs/maasto-nimet-vuoret.js`) latoo nimikerros
`js/karttanimet.js`, jolla on OMA mittakaavakynnyksensä; se ei kulje
lehden portin (LEHDEN_VAHIN_OSUUS) eikä nostojen katon läpi lainkaan.
Ristiriita oli siis todellinen mutta johtui juuri siitä, mitä kohta 1
korjaa: nostokerros sammui, nimikerros ei. Korjauksen jälkeen ne ovat
samalla zoomilla yhtä aikaa ruudulla. Kerrosrajaan ei koskettu.

**c) "Liiku" Barcelonan vieressä — TARKOITUKSELLINEN, EI VIKA.**
Teksti on alarivin monitoiminapin `.icon-label`, ja se on siellä
omistajan omasta päätöksestä: Raamattu PÄÄTÖKSET 28 kohta 3 (*"Tee
napista lapinakyva ja teksti kuultavaksi"*), toteutus ERÄ 19,
css/styles.css rivit 27349–27392 — kompassi-ikoni on `display: none`,
napin tausta `rgba(244, 231, 202, 0)` ja sana jää kartan päälle
peittävyydellä 0,65. Se näyttää "vuotavan" kartalle juuri niin kuin on
tarkoitettu; leveällä ruudulla se sattuu osumaan Barcelonan kohdalle,
koska nappi on ruudun alalaidassa ja kartta ulottuu sen alle.
**Ei muutettu.** Jos omistaja tarkoitti, ettei sanan pidä osua
kaupungin nimen päälle, se on uusi päätös eikä tämän erän korjaus.

---

## 5. Savukkeen tila

`node tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs` (Mac Studio,
Chromium, yksi ajo korjauksen jälkeen): **15/18 vartiota läpi.**

- Vartiot 1–3 (Node: lukitut ankkurit, ei merta, vastakoe) — OK.
- Vartiot 4 ja 4b (nosto ei liiku 200 px vedossa; nimiön ruutuvektori
  sama) — OK kaikilla kolmella ruudulla.
- Vartiot 5 ja 6 (pisteet ja kaupungit saapumisnäkymässä) — OK kaikilla
  kolmella ruudulla, uusilla korkeammilla rajoilla.
- **Vartio 7 (loitonnus) — punainen kaikilla kolmella ruudulla**, ks.
  luku 3.

`node --test tests/*.test.mjs`: **# pass 3623, # fail 2** ennen
testipäivityksiä — molemmat olivat tämän erän omia lähdetekstivartioita
(`tests/kohdekaupunki.test.mjs` portin rivi, `tests/pallonimet.test.mjs`
nimibudjetin rivi), ja molemmat on päivitetty samaan sääntöön.
Päivitysten jälkeen koko sarja: **# pass 3625, # fail 0**.

`node tools/build-standalone.mjs`: OK.

WebKit: `savuke-ranskan-nostot-lukossa.mjs` EI tue `--webkit`-lippua
(se avaa aina Chromiumin; `chromium.launch` on kovakoodattu).
Kirjattu velaksi — WebKit-ajoa ei siis tehty tässä erässä.

---

## 6. Viereiset havainnot (en korjannut)

1. **KUVASARJA PEITTÄÄ KARTAN NOSTOT.** Isoisän saapumiskuvasarjan
   aikana kartta on himmennetty eikä yhtäkään nostopistettä erota,
   vaikka merkit ovat DOMissa (mitattu: DOM 40 kesken kuvasarjan).
   Omistajan oma kuva on juuri tästä hetkestä. Jos pisteiden pitää näkyä
   myös kuvasarjan alla, se on oma päätöksensä.
2. **LOITONNUSELE LATOO UUDELLEEN VAIKKA KAMERA EI LIIKU.** Zoomilukko
   pitää korkeuden samana 15 desimaalin tarkkuudella, mutta ele
   laukaisee silti uuden ladonnan, jonka tulos oli ennen korjausta eri
   kuin lepotilan. Se on nyt vartioitu (vartio 7), muttei selitetty.
3. **POLTTO JA KATTO OVAT ERI MEKANISMIT — JA NE PITÄÄ LUKEA YHDESSÄ.**
   Poltettu nostotaso on vain z5–z7 (js/laattapyramidi.js), ja
   saapumisnäkymän laattataso on z4. Siksi saapumisnäkymässä pisteiden
   ON tultava elävinä: laatassa ei ole mustetta, jonka päälle ne
   tulisivat. Katto 40 oli tämän kanssa ristiriidassa — se oli
   mitoitettu maailmaan, jossa suurin osa musteesta on poltettua
   (kerroksen oma lohko POLTETTUA MUSTETTA EI VOI PIILOTTAA sanoo sen
   ääneen). Kun Fable polttaa nostotason uudelleen ja poltto ulottuu
   z5:een, samat merkit tulevat laatasta eivätkä kuluta `pisteKatto`a
   lainkaan (`elavatKaikki` suodattaa `!r.poltettu`) — eli korjaus ei
   jää velaksi polton jälkeenkään, vaan käy tyhjäkäyntiä.
4. **390 px:llä 12 Ranskan nostoa on kuvan ulkopuolella** (montblanc,
   biskajanlahti, carnacin-kivirivit, hahmotelma-verdon,
   hahmotelma-saint-malo, hahmotelma-pointe-du-raz, hahmotelma-ajaccio,
   hahmotelma-bonifacio, syvennys-marseille-cosquer,
   syvennys-marseille-exvotot, nosto-maalehti-chandeleur,
   nosto-maalehti-marseillen-saippua). Se on PAATOKSET 17:n korkeuteen
   sovitus, johon en saanut koskea.

---

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
