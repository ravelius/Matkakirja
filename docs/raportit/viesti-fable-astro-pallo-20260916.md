# Avaruusvaiheen pallo: ISS radallaan, aurinko sivulta, kylläisyys alas

*Opus-työagentti Fablelle 16.9.2026. Haara
`claude/bold-ride-vow4ki-astro-pallo`, pohja origin/main (78e60489,
v1917). Ei PR:ää, ei versionostoa, ei Raamattu-muutoksia. Alue oli
AVARUUSVAIHEEN PALLO — valokuvanäkymään ja yläpalkkiin ei koskettu
(toinen agentti työskenteli niissä samaan aikaan).*

## 0. Lyhyesti

1. **ISS kiertää palloa** 51,6 asteen radalla, 6 % pinnan yläpuolella,
   kierros 75 s. Himmeä ratakaari näkyy vain etupuolella; takapuoli
   karsitaan pallon omalla horisonttitestillä. Liikkeenvähennyksellä
   merkki on paikallaan. Luku 1.
2. **Auringon sivuvalo** on ruudun ilmiö, ei tekstuurin: kotelon kalvo
   tummentaa vasenta reunaa (alfa 0 → 0,55 viimeisellä 12 %:lla
   säteestä) ja kirkastaa oikeaa (0 → 0,18 viimeisellä 8 %:lla).
   Mitattu pikseleistä: reuna −26 % (työpöytä) ja −9 % (puhelin),
   keskusta ja puoliväli **eivät muutu lainkaan**. Kohdepisteet ovat
   kalvon PÄÄLLÄ, koska kalvo on CSS2D-merkkikerroksen alla. Luku 2.
3. **Kylläisyys 0,8:aan** kankaan suodattimella samassa piirrossa,
   jolla reliefi ladotaan. Mitattu keskimääräinen HSL-kylläisyys
   **0,478 → 0,392 (suhde 0,82)**. Luku 3.
4. **8k-päätös: KYLLÄ leveille ruuduille, EI puhelimelle.** Kuva on
   olemassa ja se on 8192 × 4096 (ei 8192 × 2048). Se purkautuu 128
   Mt:n RGBA-puskuriksi, joten puhelin saa 4k:n. Valinta on kahden
   vakion ja yhden puhtaan funktion takana. Luku 4.
5. **Vartio** `tools/savukkeet/savuke-astro-pallo.mjs`: 19/19 läpi
   työpöydällä (1400 × 900) ja 20/20 puhelimella (390 × 844),
   vastakokeineen. Luku 5.

Muutetut tiedostot: `js/linssit/satelliitti-avaruus.js` (uusi luku 2c
ja reliefin valinta), `tests/satelliitti-avaruus.test.mjs` (kuusi uutta
testiä), `tools/savukkeet/savuke-astro-pallo.mjs` (uusi).
`js/linssit/satelliitti.js` säilyi koskemattomana — kaikki mahtui
avaruusnäkymän omaan moduuliin.

## 1. ISS radallaan

**Missä se piirretään.** Merkki, ratakaari ja reunavarjo ovat KOTELON
KALVOLLA (DOM + SVG), eivät three.js-olioita. Kolme syytä:

* Globe.gl kantaa three.js:n sisällään eikä vie sitä ulos, joten
  jokainen uusi olio pitäisi rakentaa heijastuksella jonkin olemassa
  olevan `constructor`ista (`js/pallolauta/linssit.js` kertoo saman).
  Kalvo ei tarvitse kirjastosta mitään.
* **Kohdepisteet jäävät varjon päälle ilmaiseksi.** Kalvo työnnetään
  kirjaston CSS2D-kerroksen ETEEN samaan vanhempaan — sama kuvio kuin
  `linssit.js kalvoRuudulle`n `alle`-tilassa. Se peittää WebGL-kankaan
  mutta jää merkkien alle.
* Pallo on aina kotelon keskellä ja sen halkaisija ruudulla tunnetaan
  kaavasta (`halkaisijaRuudulla`), joten varjon ympyrä osuu
  täsmälleen siihen kehään, jonka pelaaja näkee.

**Rata.** `radanPiste(u, solmu)` on pallokolmio: sin(lat) = sin(i) ·
sin(u), pituusero solmusta atan2(cos(i) · sin(u), cos(u)).
Vakiot: `ISS_INKLINAATIO` 51,6°, `ISS_KORKEUS` 0,06,
`ISS_KIERROS_S` 75 (= 4,8 °/s), `ISS_SOLMUN_KIERTO_S` 900 eli rata
pyörii hitaasti maan mukana (yksi kierros 15 min, kahdestoistaosa
merkin omasta vauhdista). Merkki on 8 px:n hohtava piste, kaari
1,1 px:n `rgba(198, 222, 255, 0.34)`.

**Syvyys ilman syvyyspuskuria.** Piste P (|P| = säde · 1,06) on kameran
C näkemällä puolella tasan kun **P · C > säde²** — pallon oma
horisonttitaso (`radallaEdessa`). Kaari katkaistaan jaksoiksi siitä,
missä testi vaihtuu, ja merkki piilotetaan peittävyydellä 0.
Mitattu: koko radan 241 pisteestä näkyvissä oli 91 (työpöytä) ja
106 (puhelin) — takapuoli on siis oikeasti poissa.

**Mitattu liike.** Työpöytä: (712,9, 834,1) → (1044,6, 647,6) eli
**380,5 px kahdessa sekunnissa** (pallo 774 px). Puhelin: 30,1 px
kahdessa sekunnissa (pallo 329 px). Liikkeenvähennyksellä
**0,00 px** — vastakoe toimii molemmilla näytöillä.

## 2. Aurinko sivulta

Kaksi liukua, molemmat vain reunan kaistassa ja pallon säteen sisällä
(yli 100 %:n kohdalla alfa katkaistaan nollaan, jottei tummennus vuoda
tähtitaivaalle):

```
varjo:      rgba(0,0,0,0)     88,0 % → rgba(0,0,0,0.55)     100 % → 0
valoreuna:  rgba(255,255,255,0) 92,0 % → rgba(255,255,255,0.18) 100 % → 0
```

Puoli valitaan sivuttaismaskilla (`linear-gradient`, häivytys 62 %),
aurinko on oikealla. Ympyrän säde luetaan kameran korkeudesta joka
kehyksellä, joten zoom ja laitteen kääntö hoituvat itsestään.

**Mittaus kuvakaappauksen pikseleistä** (kolme näytettä molemmilta
reunoilta 0,94 × säde, kolme keskustasta, kolme puolivälistä 0,5 ×
säde; luminanssi 0–255):

| näyte | työpöytä pois → päällä | puhelin pois → päällä |
|---|---|---|
| varjon reuna | 61,6 → **45,6** (−26 %) | 140,9 → **128,9** (−9 %) |
| valon reuna | 83,9 → **90,6** (+8 %) | 117,4 → **121,9** (+4 %) |
| keskusta | 53,2 → 53,2 (0) | 49,5 → 49,5 (0) |
| puoliväli (0,5 R) | — | 54,6 → 54,6 ja 118,5 → 118,5 |

**Miksi väite ei ole "reuna on keskustaa tummempi".** Puhelimen
ajossa varjon puolella sattui olemaan kirkasta maata (reuna 113,
keskusta 83) — maasto vaihtelee enemmän kuin varjo, joten suora
reuna/keskusta-vertailu mittaisi karttaa eikä valoa. Vartio lukee
siksi SAMAN pikselin ennen ja jälkeen (kytkin `asetaVarjostus`) ja
vaatii lisäksi, ettei puolivälissä tapahdu mitään — se on ainoa tapa
erottaa reunavarjo koko pallon himmennyksestä.

**Kohdepisteet.** 33/33 (työpöytä) ja 38/38 (puhelin) kameran puolen
pistettä näkyvissä, niistä 13 ja 16 varjon puolella. Kalvon
`pointer-events` on `none`, se on merkkikerroksen alla, ja pisteen
kohdalla päällimmäisenä on pallon oma `canvas` — napautus menee siis
sinne, minne se ennenkin meni. Napautus avasi havaintokortin
molemmilla näytöillä.

## 3. Kylläisyys

`kyllaisyysAlas(ctx, kuva, …)` asettaa `ctx.filter = 'saturate(0.8)'`
siihen samaan piirtoon, jolla reliefi ladotaan apukankaalle — ei omaa
pikselisilmukkaa (se olisi 8,4 Mpx ja 33 Mt JS-muistissa joka
avauksella). Tuki tunnistetaan kirjoittamalla arvo ja lukemalla se
takaisin; varareitti on sekoitustila `saturation` harmaalla täytöllä
alfalla 1 − 0,8, ja `destination-in` palauttaa läpinäkyvien napojen
alfan täsmälleen.

Mitattu selaimessa (reliefi 256 × 128:aan, vain läpinäkymättömät
pikselit, HSL-kylläisyyden keskiarvo 24 320 pikselistä):

* työpöytä (8k-kuva): **0,4778 → 0,3915, suhde 0,82**
* puhelin (4k-kuva): **0,4763 → 0,3904, suhde 0,82**

Kankaan suodatin oli tuettu molemmissa (`suodatinTuettu: true`), joten
varareitti jäi varalle — sen käyttäytyminen on yksikkötestattu.

## 4. 8k-päätös

**Kuva on olemassa.** `curl -sI` 16.9.2026: HTTP 200, `image/webp`,
2 311 950 tavua (4k-kuva 786 304 tavua). WebP-otsikon VP8X-kenttä:
**8192 × 4096**, ei 8192 × 2048 — kyseessä on täysi
kaksinkertaistus molempiin suuntiin.

**Mitattu sama ketju samalla koneella** (lataus + generoitu pohja +
valo- ja napaliuku + kylläisyys + PNG-blob, kontti/SwiftShader ja
välityspalvelin, eli yläraja-arvoja):

| | 4096 × 2048 | 8192 × 4096 |
|---|---|---|
| WebP verkosta | 786 kt | 2 312 kt |
| purettu RGBA | 32 Mt | **128 Mt** |
| ketju työpöytäajossa | 7 253 ms | 11 631 ms |
| ketju puhelinajossa | 5 830 ms | 10 203 ms (toisessa ajossa 16 953 ms) |
| linssin oma lataus | 6 268 ms (puhelin) | 11 416 ms (työpöytä) |

**Päätös: 8k vain leveille ruuduille.** `valitseReliefi({ leveys, dpr })`
antaa 8k:n vain kun CSS-leveys ≥ 1024 **ja** leveys × pikselisuhde
≥ 1024. Pelkkä laitepikselimäärä ei kelpaa: 430 px:n puhelin
kolminkertaisella pikselisuhteella on 1 290 laitepikseliä mutta yhä
puhelin — CSS-leveysehto pudottaa sen. Perustelu on lasku eikä
mielipide: ladonta tarvitsee kolme 128 Mt:n puskuria (pohja,
apukangas, tuloskangas) ja PNG-pakkauksen 33,5 megapikselistä, ja
iOS Safarin kangaskatto on käytännössä 384 Mt.

**Vaihto on yksi luku.** `RELIEFIN_8K_KAYTOSSA = false` vie kaikki
ruudut takaisin 4k:hon; kynnykset ovat omat vakionsa
(`RELIEFIN_8K_RAJA_CSS`, `RELIEFIN_8K_RAJA_LAITEPX`). Pelin oma
`js/packs/linssi-topografia-kuva.js` on koneen kirjoittama eikä sitä
koskettu — `RELIEFIN_OSOITE` osoittaa yhä sinne (ja
`tests/satelliitti-avaruus.test.mjs` valvoo sitä ennallaan),
8k-osoite on linssin oma vakio.

Huomio jatkoon: linssi näyttää generoidun Maan heti ja vaihtaa
reliefin tilalle vasta kun se on valmis, joten yllä olevat sekunnit
eivät ole odotusaikaa avauksessa — ne ovat aika, jonka pallo on
"vyöhykevärinen". Oikealla laitteella luvut ovat murto-osa näistä
(kontissa piirto on ohjelmistolla).

## 5. Vartio ja vastakokeet

`tools/savukkeet/savuke-astro-pallo.mjs` (1400 × 900 ja 390 × 844,
NAKYMAT-muuttuja rajaa näytöt):

```
19/19 läpi (tyopoyta)      20/20 läpi (puhelin)
```

Väitteet: ISS on DOMissa ja 8 px; ruutupaikka muuttuu 2 s:ssa; merkki
on etupuolella näkyvissä; kaari on piirretty ja takapuoli karsittu;
varjon puoli tummuu ja valon puoli kirkastuu; keskusta ei muutu; varjo
ei ulotu puoliväliin; varjon pudotus on tilauksen luokkaa;
kylläisyys on mitattu alas; kohdepisteet näkyvät (myös varjon
puolella) ja ovat klikattavissa; kalvo ei syö napautusta; reliefin
tarkkuus on ruudun mukainen; molemmat tarkkuudet latautuvat.

Vastakokeet: (a) **varjostuskytkin pois** palauttaa samat pikselit
(45,6 → 61,6 → 45,6), eli mittari osaa mennä punaiseksi; (b)
**liikkeenvähennys** jäädyttää ISS:n 0,00 px:iin, eli liikemittari ei
lue kohinaa.

Lisäksi ajettu: `node --test tests/satelliitti*.test.mjs
tests/pallolinssit.test.mjs tests/rules.test.mjs
tests/dokumentit.test.mjs` → **430/430 läpi** (kuusi uutta testiä
tässä), `node --check` kaikille muutetuille tiedostoille, ja
`tools/savukkeet/savuke-satelliittilinssi.mjs NAKYMAT=tyopoyta` →
**34/34 läpi** (linssin muu toiminta ei rikkoutunut).

Kuvat: `docs/raportit/kuvat/astro-pallo-1400-20260916.jpg` (65 kt) ja
`docs/raportit/kuvat/astro-pallo-390-20260916.jpg` (76 kt).
Työpöytäkuvassa ISS on pallon alareunalla omalla kaarellaan.

## 6. Mitä EI tehty

* Valokuvanäkymään, yläpalkkiin (selite, X, hampurilainen,
  pienoiskuvat) tai `css/satelliitti.css`:ään ei koskettu — kalvon
  tyylit ovat inline-tyylejä linssin omassa moduulissa, jotta
  rinnakkainen työ ei törmää.
* Ei versionostoa, ei muutoslokiriviä, ei PR:ää, ei Raamattu-muutosta.
* `js/packs/linssi-topografia-kuva.js` on koneen kirjoittama
  (`tools/tee-reliefikartta.mjs`) eikä sitä muokattu käsin; jos 8k
  halutaan pelin yhteiseksi pallokuvaksi, se kuuluu sinne ja vaatii
  työkalun ajon.
