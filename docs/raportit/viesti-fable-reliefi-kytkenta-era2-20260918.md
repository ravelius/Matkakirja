# Viesti Fablelle: reliefipyramidi, erä 2

Opus-agentti 18.9.2026 klo 09.02–09.35 (Suomen aikaa), haara
`claude/bold-ride-vow4ki-reliefi-kytkenta`. Kaksi committia pushattu,
PR:ää ei avattu. Versionostoa EI tehty (`uusi-versio.mjs` ajamatta,
kuten tehtävänannossa sanottiin) — kytkin on oletuksena pois, joten
pelinäkymä ei muutu ilman `?reliefipyramidi=1`.

**Mitä on tehty:** kohta 1 kokonaan (sarake 166 korjattu ja poltettu,
pyramidi ehjä z0–z7). Kohta 2 kytkennän osalta: laatasto, kytkin,
pohjattomuus ja paikanpitäjä ovat koodissa ja testeissä. **Kohta 3
(savukemittaukset) jäi tekemättä** — syy on alempana, ja se on
konkreettinen eikä aikapula.

---

## 1. Sarake 166: juurisyy ei ollut se, mitä arveltiin

Edellinen erä arveli leveysvahdin olevan rikki. **Se ei ollut.** Pala
oli 308 saraketta leveä eli täsmälleen oikean levyinen (katto 311);
väärin oli sen **paikka**. Leveysvahti ei voi nähdä paikkaa, joten se
teki juuri sen, mitä siltä pyydettiin.

Paikkavahtikin päästi palan läpi, ja sen syy on se oikea juurisyy.
Mittasin sen instrumentoimalla `haePala`:n (diagnostiikkarivi poistettu
commitista):

```
pala pyydetty -180.00000 -178.72500
  | saatu lon 180 ... 181.27916666666667  | n 308
  | norm 180 ... -178.72083333333333
```

NCSS palautti W180-laatasta pyydetylle ikkunalle −180…−178,725
pituusasteet **180…181,279** — sama meridiaani, eri kierros. Koodin
alkiokohtainen normalisointi (`while (v > 180) v -= 360`) **rikkoi
taulukon**: 180 ei ole `> 180`, joten ensimmäinen alkio jäi
paikalleen, kun heti sen jälkeinen 180,004 hyppäsi arvoon −179,996.

Taulukko lakkasi olemasta kasvava. `lon[0]` luki 180 ja
`lon[leveys−1]` luki −178,72 — **kumpikin pää näytti erikseen
uskottavalta**, ja juuri siksi paikkavahti (joka katsoo vain päitä)
päästi palan läpi. Liimaus lukee vain `lon[0]`:n, joten pala sijoittui
hilassa 86 400 saraketta väärään kohtaan.

**Korjaus:** kierros valitaan ENSIMMÄISESTÄ alkiosta ja vähennetään
kaikista; puoliavoin väli [−180, 180) kuvaa 180:n arvoon −180.
Yksi pala ei koskaan ylitä päivämäärärajaa (`kaarra` katkaisee
±180:ssä, `rajat` 15°:n rajoilla), joten koko pala saa saman
kierroksen. Lisäksi kasvavuustarkistus, joka olisi napannut tämän.

### Mitattu tulos

| | ennen | jälkeen |
| --- | --- | --- |
| `haeIkkuna({ lon0: 179.13, lon1: 181.275 })` | 86 917 saraketta | **517** |

Sarake 166 poltettu: **33 laattaa + 44 avomerta = 77**, eli tasan se,
mikä puuttui (rivit 14–90). Koot 2–101 kt eli tavallista maastoa, ei
enää 1–8 kt:n tyhjiä. Ajossa **ei yhtään virhettä**.

Silmätarkistus kahdesta laatasta (Read, PNG:ksi purettuna):

- `z7/166/21` — vuoristoa, harjanteet ja laaksot erottuvat, rannikko
  oikeassa kohdassa, ei saumaviivaa eikä toistoa.
- `z7/166/19` — rannikkoa ja avomerta, rantaviiva terävä.

Alinäytteistys `--jatka --tasot 0-6` ajettu, ei virheitä. **Pyramidi on
nyt ehjä:**

| taso | laattoja | koko |
| --- | --- | --- |
| z7 | 6 631 | 287,8 Mt |
| z6 | 1 958 | 91,9 Mt |
| z5 | 626 | 25,4 Mt |
| z4 | 201 | 6,6 Mt |
| z0–z3 | ~92 | 2,3 Mt |

Levyllä `<scratch>/reliefi15/maailma/`. **En vienyt mitään R2:een** —
avain on omistajalla. Vientikomennot ovat edellisessä raportissa
(`viesti-fable-reliefi-kytkenta-20260918.md`) ja pätevät sellaisinaan;
versio `20260918`.

---

## 2. Linssikytkentä: laatasto pääkartan laattakoneessa

Uusi moduuli **`js/reliefipyramidi.js`**. Kytkentä perustuu yhteen
mitattuun havaintoon, joka teki tästä helpon: **reliefipyramidin arkki
on pikselilleen pääkartan arkki.** Manifestissa lukee
`{x: 0, y: −1046.3149255312064, w: 12000, h: 7307.715927310571}` —
sama olio kuin `js/laattapyramidi.js`:n `ARKKI_VARALLA` — ja tasot
ovat samat 675 → 86 400 px 512:n laatoissa. Reliefilaatta `z7/166/21`
osuu siis täsmälleen samaan lautaruutuun kuin pohjalaatta `z7/166/21`,
eikä yhtään uutta geometriaa tarvita. Testi vartioi tätä
koneellisesti (jos se joskus eriytyy, reliefi piirtyisi väärään
kohtaan eikä sitä huomaisi muuten kuin silmällä).

### Mitä koodiin tuli

- `js/reliefipyramidi.js` — kytkin, oma luettelo, osoitekaava,
  meripeitto bittikartaksi, meren taustaväri.
- `js/laattapyramidi.js` — `pyramidinKerrostasot` palauttaa
  reliefitason; `laattaUrl`, `tasonVersio` ja `noutoEtuliite` saivat
  reliefihaaran (etuliite `f`). Reliefin portti kulkee saman oven
  kautta kuin luettelo ja osoitteet (`pyramidinReliefiKaytossa`), jottei
  pallo tuo moduulia itse — tuontilistaa vartioi testi.
- `js/pallolaatat.js` — `lepokerroksenKerrokset` portti, avomeren
  taustavärin maalaus.
- `js/linssit/topografia.js` — lippu nousee `pallolle`ssa, laskee
  `pura`ssa; `tila()` kertoo savukkeelle `reliefipyramidi`-kentän.

### Kytkin vaatii KAKSI ehtoa

`?reliefipyramidi=1` **ja** avoin topografialinssi. Tämä ei ole
kosmetiikkaa: reliefi piirtyy samalla laattakoneella kuin pohja, joten
pelkän kytkimen varassa se värittäisi pelin oman seepiakartan
maastoksi — juuri sen, minkä omistaja 4.8.2026 kielsi (*"pidetään
seepia normaalissa pelinäkymässä"*).

Oletus on pois, koska laatat eivät ole ämpärissä. Ilman kytkintä peli
on täsmälleen entisensä: yksi kuva ja laastari, peittävyys 0,72.
Vanhaa kuvapolkua ei ole kosketettu rivilläkään.

### Pohjattomuus (omistajan lisäys, Raamattu LISAYS 16 kohta 49)

Sain lisäyksen kesken erän ja toteutin sen samaan committiin.
**Reliefi korvaa pohjan eikä peitä sitä:** kun linssi on auki,
`pyramidinKerrostasot` palauttaa `[reliefi, ranta?, viiva?, nosto?]` —
pohjalaatta ei ole listalla lainkaan, joten **seepialaattoja ei haeta
linssin ajan yhtäkään**. Paikanpitäjä on laattakoneen oma karkea
kerros eli SAMAN pyramidin ylemmän tason laatta skaalattuna, kuten
pääkartallakin. Vaaleaa karttaa ei voi välähtää, koska sitä ei ole.

Ranta-, viiva- ja nostotaso jäävät reliefin päälle — ne ovat merkkejä
kartan päällä, ja lisäys sanoo ne nimenomaan reliefin päälle.

**Oma päätös, jonka kirjaan:** pudotin myös **väritason** pois linssin
ajaksi. Se on kohdemaan tasoitus seepiakartalle eikä maaston päälle
tarkoitettu; lisäys ei ottanut siihen kantaa. Jos se halutaan mukaan,
muutos on yksi rivi.

**Avomeri oli lisäyksen piilevä hinta.** Reliefipyramidi on harva —
6 228 laattaa 6 631:stä on z7:llä merta, eikä niistä polteta laattaa
lainkaan — ja ilman pohjaa alla jokainen merilaatta olisi ollut
`virhe` ja meri jäänyt reikinä. Tason `taustavari` maalataan nyt
kankaalle samalla värillä, jonka polttotyökalu antaa merelle
(`rgb(38, 78, 145)`). **Tämä luku on nyt kahdessa paikassa** (työkalu
ja peli); oikea korjaus on kirjoittaa se luetteloon seuraavassa
poltossa, ja se on jätetty kommenttiin näkyviin.

### Testit

`tests/reliefipyramidi.test.mjs`, 8 testiä: kytkimen oletus,
kaksoisehto, paikallinen kansio, osoitekaava, meripeitto
bittikartaksi (myös roskarivit), tasojen muoto, arkin yhtäpitävyys ja
pohjattomuuden rivit. **Koko sarja `node --test tests/*.test.mjs` on
vihreä** (3 603 läpi, 0 kaatunutta, 13 ohitettua). Kolme vanhaa testiä
päivitettiin, koska ne vartioivat juuri niitä rakenteita, joihin uusi
kerros tuli: kerrosportin muoto (`reliefi: false`),
`js/pallolaatat.js`:n tuontilista ja SHELL-luettelo.

`node tools/build-standalone.mjs` ajettu ennen pushia; moduuli lisätty
`MODULES`-listaan ENNEN `js/laattapyramidi.js`:ää (tuoja ei saa olla
ennen tuotua) ja `sw.js`:n SHELLiin. Laattoja ei committoitu.

---

## 3. Mittaukset: EI AJETTU, ja syy on konkreettinen

**`tools/savuke-topografialinssi.mjs` ei ole olemassa.** Tarkistin:
`tools/`-kansiossa on 13 savuketta, eikä yksikään koske
topografialinssiä tai palloa tällä tavalla. Tehtävänanto oletti sen
olevan valmiina; se ei ole. Sen kirjoittaminen (Playwright-ajuri,
paikallinen palvelin, laattojen route-välitys levyltä, rAF-mittaus,
gradienttienergian laskenta ennen/jälkeen) on oma eränsä, ei
mittauksen sivutuote.

**Kaappauksia ei siis ole eikä kansiota
`docs/raportit/kuvat/reliefipyramidi-20260918/` luotu** — siihen ei ole
mitään pantavaa. En myöskään väitä mitään fps:stä, laattamääristä tai
kirkkaudesta, koska en mitannut niitä.

Paikallinen ajo on kuitenkin **valmiiksi tuettu**, jotta mittaaminen ei
odota vientiä: `globalThis.RELIEFIPYRAMIDI_KANSIO` korvaa ämpärin
juuren, ja savuke välittää sen Noden route-välityksellä levyltä kuten
ämpärin muutkin kuvat. Laatat ovat levyllä valmiina.

### Mitä savukkeen pitää mitata (omistajan lisäys mukaan lukien)

1. Ensimmäinen reliefikehys avauksessa **< 300 ms**.
2. **Seepiapohjan laattapyyntöjä linssin aikana 0** — verkkolokista,
   suodatin `julisteet/pyramidi/`. Tämä on pohjattomuuden ainoa
   kelvollinen todiste; koodi on sitä varten kirjoitettu, mutta
   koodinluku ei ole mittaus.
3. Näkyvän ikkunan laattahaut **≤ 12** (390 px, Alpit lähizoomi).
4. Reliefi näkyy: gradienttienergia kasvaa ennen/jälkeen.
5. **fps ≥ 50** (rAF 3 s) + yksi WebKit-tarkistus samasta.
6. Muisti vs. nykyinen — lisäyksen mukaan tämän pitäisi **laskea**,
   koska kahta karttaa ei enää kompositoida.

---

## 4. Astronautin kamera: suunnitelma, ei koodia

`js/linssit/satelliitti-avaruus.js` on **koskematon** — lisäys sanoi
"tee pohjattomuus + paikanpitäjä ennen Astronautin kameraa", ja niin
tein. Suunnitelma:

Kamera saa saman pyramidin laastarina lähizoomissa näkyvälle
ikkunalle, saman kytkimen takana. Työ on pienempi kuin
topografialinssin, koska laatasto on nyt olemassa: kamera kysyy
`reliefinTaso(z)`:ltä tason ja `pyramidinLaattaUrl`:ltä osoitteet,
eikä sen tarvitse tietää pyramidista muuta. Kaksi ratkaistavaa kohtaa:

1. **Kytkimen kolmas ehto.** Lippu on nyt topografialinssin tila
   (`asetaReliefiLinssi`). Kamera tarvitsee oman lippunsa, tai
   nykyisestä tehdään laskuri — muuten kameran avaus sammuttaisi
   reliefin, jos linssi suljetaan sen alta.
2. **Meren taustaväri ei kelpaa avaruudesta katsottuna** samana
   vakiona: kameran oma merenväri tulee sen omasta kuvasta. Sama
   `taustavari`-kenttä toimii, mutta arvon on tultava kameralta.

Muistikatto ja iOS-säännöt ovat yhä avaamatta kummallakin — ne
kannattaa mitata vasta savukkeella, ei arvata.

---

## 5. Mitä EI koskettu

Raamattu, `sarjat.json`, pääkartan pyramidi, `js/pallolauta/nostot*.js`,
kaupunkiliuska, fokusvirta. Uusia .md-tiedostoja vain
`docs/raportit/`-kansioon (tämä).
