# Viesti Fablelle: asetusten avaaminen ei pura luennan näkymää

**Opus-sessio 15.9.2026. Lähtötilanne: main = v1910 (985d4b96, ajon
aikana 80ab5b50). Ei versionostoa, ei mergeä, ei Raamattu-muokkausta.**

Omistajan havainto (15.9.2026 klo 10.55 UTC), sanatarkasti: *"Jos
klikkaan esimerkiksi hammasratasta, sinä aikana kun isoisän luenta on
päällä, niin kuvat pienentyvät heti"*. Raamattu-linjaus haarassa
`claude/bold-ride-vow4ki`, osio **VIKA: ASETUSTEN AVAAMINEN KESKEN
LUENNAN KUTISTAA LUENTAKUVAT**.

---

## 1. Juurisyy — yhdellä lauseella

**Luennan isokuvasarja päättyy kartan liikkeeseen, mutta sen vartija
kuunteli koko dokumentin `pointerdown`-tapahtumaa, joten myös
hammasrattaan, hampurilaisen ja muun päällysikkunan napautus luettiin
kartan liikkeeksi ja kutisti ison kuvan pieneksi pakaksi kartalle —
vaikka luenta jatkoi soimistaan häiriöttä.**

### Löydös

`js/fokusvirta.js`, `kytkeSarjanKartanLiike` (v1910):

```js
const kasittele = (tapahtuma) => {
  if (tapahtuma.target?.closest?.('.fokusvirta-isokuva, .fokuszoom')) return;
  if (ui.luentakuvasarja === tila) paataLuentakuvasarja(ui, { heti: true });
};
document.addEventListener('pointerdown', kasittele);
```

Ainoa poikkeus oli iso kuva itse ja sen suurennos. Kaikki muu ruudulla
— ylärivin hammasratas, hampurilainen ≡, matkalaukku, saapumiskortin
lappu — kelpasi "kartan liikkeeksi". `paataLuentakuvasarja(… heti)`
poistaa `.fokusvirta-isokuva`-päällyksen heti ja nostaa pienen pakan
kartalle (`nostaPieniPakka` → `pienennaLuentakuva`). Juuri tämä näkyy
omistajan kahdessa työpöytäkuvassa Ateenasta: jälkimmäisessä iso kuva
on poissa ja kartalla on pieni pakka.

### Ääni ei liity vikaan lainkaan

Ennakko-oletus oli, että asetusikkuna pysäyttää tai mykistää äänen,
`soivaPuhuja` → `null` ja luentavahti purkaa `kertoja-aanessa`,
`luenta-huntu` ja tekstipiilon. **Mittaus kumosi tämän.** Rattaan
käsittelijä (`js/main.js`, `kehittajaValikkoNappi` click) tekee vain
kolme asiaa: lukee valikon tilan, tyhjentää vihjerivin ja kääntää
`hidden`-lipun. Ääneen se ei koske. Sama pätee hampurilaiseen.
Luennan pysäytys on olemassa vain Tutki-näkymälle (`js/ui.js`
`openArrival` → `ui.luentaTauolla`), eikä sitä ajeta valikoista.

**Mitattu ennen korjausta** (Chromium 1400 × 900, Dubrovnik, rattaan
napautus kesken isoisän luennan):

```
ENNEN    isokuva 1071×738  ruutuja 1  pakka 0  sarja true
         huntu true  piilo true  paused false  currentTime 0,93
JÄLKEEN  isokuva null      ruutuja 0  pakka 1  sarja false
         huntu true  piilo true  paused false  currentTime 2,97
```

Kuva katosi, mutta `paused === false` ja `currentTime` kasvoi koko
ajan: **luenta soi ikkunan alla häiriöttä.**

---

## 2. Valittu käytös: (a) ääni jatkuu ikkunan alla, näkymä pysyy

Koska mittaus osoitti, ettei päällysikkuna kosketa ääneen, tauko­tilaa
ei tarvita eikä sitä rakennettu. Vaihtoehto (b) — eksplisiittinen
"tauolla"-tila luentavahdille — olisi ollut uusi tila ilman
vastinparia todellisuudessa, ja se olisi myös lähentynyt v1908:n
vikaa, jossa varattu vuoro näytti luennan vaikka ääntä ei kuulunut.
Nyt ruudun tila seuraa yhä **kuuluvaa ääntä** (`soivaPuhuja`), kuten
15.9. tehty korjaus vaatii.

Korjaus rajaa "kartan liikkeen" siihen, mitä sana lukee:

* `js/ui-apurit.js` — uusi `onkoKartanLiike(tapahtuma)`. Napautus on
  kartan oma vain jos se osuu `KARTAN_ALUE`-alueelle (`.map-pane`),
  ei kartan päällä kelluvaan nappiin tai kenttään (`OMA_HALLINTA`)
  eikä kelluvaan valikkoon (`VALIKKOKERROKSET`). Sama rajaus, jota
  valikon sulkuvartija `asennaValikonSulkuvartija` on käyttänyt
  7.9.2026 lähtien.
* `js/fokusvirta.js` — `kytkeSarjanKartanLiike` kysyy tätä ennen
  sarjan päättämistä.

Rajaus kattaa kaikki päällysikkunat kerralla: hammasratas,
hampurilainen ≡ ja modaalit dialogit (matkalaukku, linssivalitsin,
lehti) elävät kaikki `.map-panen` ulkopuolella, samoin saapumiskortin
lappu `.rail`-kerroksessa. Iso luentakuva ja sen suurennos asuvat
`.stage`:ssa `.map-panen` vieressä, joten ne jäävät ulkopuolelle jo
tämän ehdon nojalla — vanha nimenomainen poikkeus on silti jätetty
paikalleen, koska se on ehdon ydin eikä sattuma.

Molemmat lauta­tyypit toimivat samalla ehdolla: pallolauta asuu
`.map-panen` sisällä (`js/pallolauta/lauta.js` `ui.mapPane.appendChild`),
tasokartan `#board` samoin.

---

## 3. Mittaukset korjauksen jälkeen

Vartiot 14–17 `tools/savukkeet/savuke-kaiutin-luentakuvat.mjs`:ssä,
kaksi ruutua × kaksi päällysikkunaa. Jokaisessa: odota kunnes
`kertoja-aanessa` on päällä ja iso kuva ruudulla → avaa ikkuna →
mittaa → sulje Escillä → mittaa kaaret.

| ruutu | ikkuna | isokuva ennen → jälkeen | huntu / piilo | currentTime |
|---|---|---|---|---|
| 1400 × 900 | hammasratas | 1071×738 → **1071×738** | true / true | 1,07 → 3,85 → 11,73 |
| 1400 × 900 | valikko ≡ | 1071×738 → **1071×738** | true / true | 0,93 → 2,83 → 10,73 |
| 390 × 844 | hammasratas | 367×256 → **367×256** | true / true | 0,70 → 2,37 → 7,60 |
| 390 × 844 | valikko ≡ | 367×256 → **367×256** | true / true | 0,50 → 2,01 → 7,17 |

Ero mitoissa on 0 px (vaatimus ±2 px). Sarja on yhä käynnissä
(`ui.luentakuvasarja` tosi), pientä pakkaa ei ole noussut kartalle
(`.fokusvirta-luentakuva.nakyy` = 0), ja ikkuna oli mittaushetkellä
oikeasti auki (`hidden === false`).

Sulkemisen jälkeen kaiuttimen kaaret elävät entiseen tapaan, esim.
1400 × 900 / hammasratas (10 näytettä 250 ms:n välein):

```
000 → 110 → 100 → 100 → 000 → 000 → 000 → 111 → 000 → 000
```

Kuvakaappaus ikkuna auki kesken luennan:
`docs/raportit/kuvat/asetukset-luenta-1400-20260915.jpg`.

### Vastakokeet

1. **Korjaus pois.** Vanha, rajaamaton vartija asennetaan takaisin
   sivulle ajon aikana → rattaan napautus purkaa sarjan → vartio
   "isokuva pysyy isona" kääntyy punaiseksi. Näin tiedetään, että
   vartio mittaa korjausta eikä satunnaista ajoitusta.
2. **Napautus itse kartalle.** Piste haetaan ruudulta
   (`elementFromPoint` kunnes päällimmäisenä on kartta eikä nappi tai
   kortti; 1400 × 900:lla saapumiskortin lappu peittää kartan koko
   vasemman laidan, joten pistettä ei saa arvata) → sarja purkautuu
   kuten ennenkin: iso kuva pois, pieni pakka kartalle. Kartan liike
   on yhä pelaajan tahdonilmaus.

---

## 4. Muutetut tiedostot

| tiedosto | muutos |
|---|---|
| `js/ui-apurit.js` | uusi `onkoKartanLiike` + perustelu mittauksineen |
| `js/fokusvirta.js` | `kytkeSarjanKartanLiike` käyttää rajausta |
| `tools/savukkeet/savuke-kaiutin-luentakuvat.mjs` | vartiot 14–17 ja kaksi vastakoetta |
| `tests/luentakuvasarja.test.mjs` | `kartanVeto` osuu nyt oikeasti karttaan; uusi testi "päällysikkunan napautus ei pura sarjaa" |
| `docs/raportit/viesti-fable-asetukset-luenta-20260915.md` | tämä raportti |
| `docs/raportit/kuvat/asetukset-luenta-1400-20260915.jpg` | kuvakaappaus |

---

## 5. Portit

| portti | tulos |
|---|---|
| `NODE_USE_ENV_PROXY=1 npm test` | 3442 testiä, **fail 0** (13 skip) |
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 391 moduulia, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | kunnossa |
| `tests/rules.test.mjs` + `tests/dokumentit.test.mjs` | 337 / 337 |
| `savuke-kaiutin-luentakuvat` | **79 / 79** (49 vanhaa + 30 uutta) |
| `savuke-luentakuvan-kerros` | 23 / 23 |
| `savuke-iphone-tekstit` | 41 / 41 |

Kaksi yksikkötestiä `tests/luentakuvasarja.test.mjs`:ssä punastui
korjauksesta odotetusti: niiden "kartan veto" oli irrallinen
`<canvas>`, joka ei ollut kartta-alueella lainkaan. Tynkä korjattiin
vastaamaan oikeaa DOM:ia (kohde `.map-panen` sisällä), ja rinnalle
tuli uusi testi, joka pitää huolta uudesta säännöstä.

---

## 6. Fablelle päätettäväksi

Korjaus on rajattu tähän yhteen vikaan. Kaksi asiaa jäi näkyviin,
jotka eivät kuulu tämän tehtävän alle:

1. **Saapumiskortin lapun napautus** ei enää pura sarjaa. Se on sama
   sääntö ("lappu ei ole kartta") ja tuntuu oikealta — mutta jos
   omistaja haluaa lapun avaamisen vievän sarjan loppuun, se on oma
   linjauksensa.
2. **Huntu jäi mittauksissa päälle myös pienen pakan kanssa**, koska
   luentavahti laskee kuvaksi sekä ison kerroksen että kartalle
   ankkuroidun pakan. Omistajan kuvauksessa huntu poistui; se voi olla
   puhelimen eri ajoitus. Jos huntu ei kuulu pienen pakan päälle,
   sekin on oma linjauksensa.
