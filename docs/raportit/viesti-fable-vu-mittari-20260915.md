# Viesti Fablelle: kaiuttimen kaaret seuraavat puheen äänitasoa

**Opus-sessio 15.9.2026. Lähtötilanne: main = v1908 (96e100df). Ei
versionostoa, ei mergeä, ei Raamattu-muokkausta.**

Omistajan havainto iPhonella (15.9.2026 klo 08.35 UTC, v1908),
sanatarkasti: *"Kajutin kuvake elää, mutta se ei elä puheen tahdissa."*
Raamattu-linjaus haarassa `claude/bold-ride-vow4ki`, osio KAIUTTIMEN
KAARET SEURAAVAT PUHETTA, EIVÄT AJASTUSTA.

---

## 1. Juurisyy — yhdellä lauseella

**Horation luenta reititettiin Web Audioon vain iOS:llä ja vain jos
äänikonteksti sattui olemaan `running` sillä sekunnilla, kun soitin
luotiin — ja koska `AudioContext.resume()` on asynkroninen, istunnon
ensimmäinen luenta (saapumisluenta) jäi lähes aina reitittämättä,
jolloin `audio.aaniMittari` oli `null` ja VU-mittari piirsi ajastettua
sinikuviota, joka elää mutta ei puheen tahdissa.**

### Löydös lokiotteineen

`js/luenta.js` (v1908):

```js
function liitaLuennanVahvistin(audio) {
  if (!audio || kertojanVolumeToimii()) return false;   // ← portti 1
  const vahvistin = liitaMusiikkiin(audio);             // ← portti 2
  if (!vahvistin) return false;
  ...
}
```

**Portti 1 — vain iOS.** `kertojanVolumeToimii()` palauttaa `true`
kaikkialla muualla kuin iOS:ssä, joten työpöydällä ja Androidilla
reititystä ei yritetty *lainkaan*. Analysaattori ei syntynyt, eikä
mittarilla ollut mitään mitattavaa.

**Portti 2 — vain hereillä oleva konteksti.**
`js/musiikkivahvistin.js` `liitaMusiikkiin` tarkistaa
`kaynnissa(ctx)`, eli `ctx.state === 'running'`. `musiikkiKonteksti()`
kyllä kutsuu `resume()`, mutta ei odota lupausta. Tämä on **täsmälleen
sama aukko, joka löydettiin musiikista 8.9.2026** ja korjattiin sinne
odottajamekanismilla (`kuunteleReitityksenAvautumista`) — luennalle
korjausta ei koskaan tehty, joten luenta jäi vanhaan vikaan.

**Analysaattorin lukeminen oli kunnossa.** `js/kaiutinmittari.js`
`mittarinTaso()` luki jo `getByteTimeDomainData` + RMS. Vika ei siis
ollut lukemisessa vaan siinä, että luettavaa ei ollut — ja siinä, että
moduuli putosi silloin vaiti ajastettuun kuvioon.

**Mitattu ennen korjausta** (Chromium, työpöytäruutu, savuke-ajo):

```
lahde: "kuvio"      vahvistin: false    aaniMittari: false
kaarien tilat (3 hetkeä, 320 ms välein): 110 → 110 → 110
```

**Mitattu korjauksen jälkeen** (sama ajo, puhelinruutu 390 × 844):

```
TILA {
 "ctxState": "running",
 "src": "https://media.matkakirja.app/audio/versions/horatio/.../puhe-fokus-matkakirja-dubrovnik.mp3",
 "crossOrigin": "anonymous",
 "vahvistin": true,
 "gain": 0.8999999761581421,
 "mittari": true,
 "volume": 1,
 "lahde": "mitattu"
}
```

---

## 2. Reitti korjauksen jälkeen

```
<audio crossOrigin="anonymous">
   → MediaElementAudioSourceNode
   → GainNode   (luennan taso; iOS:n tottelematon volume ohitettu)
   → AnalyserNode (fftSize 256 — mittarin lukema)
   → ctx.destination
```

Yksi jaettu `AudioContext` (`js/sound.js` `sfx.ensureContext`), sama
jonka musiikki, äänimaisema ja Livian puhe käyttävät. Muutokset:

1. **`js/luenta.js` `liitaLuennanVahvistin`** — iOS-portti poistettu:
   reititys tehdään **kaikilla laitteilla**. Taso luetaan talteen ennen
   reititystä ja kirjoitetaan gainiin sen jälkeen, joten liu'un keskellä
   oleva luenta ei hyppää.
2. **`js/luenta.js` `varaaReitityksenUusinta`** (uusi) — jos konteksti
   nukkui soittimen syntyessä, reititys yritetään uudelleen heti kun
   konteksti herää. Odottaja on jo olemassa oleva
   `kuunteleReitityksenAvautumista`, jonka vahti kuuntelee
   `pointerdown` / `touchend` / `keydown` -eleitä ja
   `visibilitychange`-paluuta. Vahti puretaan `ended`/`error`-
   tapahtumasta (`irrotaLuennanVahvistin`), joten kuolleita kahvoja ei
   jää.
3. **`js/luenta.js` `luentaSoitin`** — `crossOrigin = 'anonymous'`
   asetetaan ennen `srciä` kaikilla laitteilla (ei enää vain
   reitittävällä polulla). Ilman lupaa MediaElementSource antaisi
   **hiljaisuutta ilman virhettä**.
4. **`js/kaiutinmittari.js`** — verhokäyrän seuraaja, kynnykset,
   hiljaisuusportti ja kuvion rajaaminen (alla).
5. **`js/ui.js` luentavahti** — mittarille annetaan analysaattorin
   lisäksi `haeVahvistus`, jotta Lukija-liuku ei himmennä kaaria.

Livian ja linssien reittejä (`js/liviapuhe.js`, `js/linssipuhe.js`) ei
koskettu. iOS:n äänenvoimakkuuden Web Audio -gain-reitti on ennallaan:
taso menee yhä gainiin, elementin `volume` jää ykköseen.

---

## 3. Kynnykset ja verhokäyrä

| Suure | Arvo | Perustelu |
|---|---|---|
| Kynnys 1 kaari | RMS **0,04** | hiljaisuus jää alle |
| Kynnys 2 kaarta | RMS **0,10** | Horation puheen mediaani 0,082 |
| Kynnys 3 kaarta | RMS **0,20** | huiput (mitattu maksimi 0,478) |
| Attack | **18 ms** | tavun alku näkyy heti |
| Release | **120 ms** | lyhyempi kuin lausetauko (300–700 ms), pitempi kuin tavuväli (30–80 ms) |
| Päivitys | `requestAnimationFrame` | DOM:iin kosketaan vain kun luku vaihtuu |

Seuraaja on **aikaan sidottu**, ei kehyksiin: kerroin on
`1 − exp(−dt/τ)`. v1908:n kehyskohtainen vakiokerroin 0,35 oli kartan
kuormittamalla 10 fps:n ruudulla jo puolen sekunnin aikavakio ja
litisti puheen keskiarvokseen.

**Taso normalisoidaan gainilla.** AnalyserNode on yhteisessä ketjussa
gainin *jälkeen* (`js/musiikkivahvistin.js`), joten ilman
normalisointia Lukija-liuku olisi himmentänyt kaaret. Mittari näyttää
puheen tason, ei säätimen asennon.

**Hiljaisuusportti:** taso alle 0,04 → kaikki kaaret sammuvat.

**Ajastettu kuvio** on jäljellä vain selaimelle, jossa AudioContextia
ei ole lainkaan, ja silloin siitä jää kerran istunnossa
`console.info`-merkintä:

```
[kaiutinmittari] ajastettu kuvio käytössä: AudioContext puuttuu selaimesta.
Kaaret eivät seuraa todellista äänitasoa.
```

Jos AudioContext on olemassa mutta analysaattoria ei ole vielä (reititys
avautumassa), kaaret pysyvät **sammuksissa** — mittari ei valehtele
puheen tahtia. Tila kestää korkeintaan yhden eleen verran.

`kaiutinmittarinLahde()` kertoo vartijoille lähteen: `'mitattu'`,
`'kuvio'` tai `null`.

---

## 4. Korrelaatiomittaus

Menetelmä: kaarien tilasarja (0–3 palavaa) näytteistetään **50 ms:n
välein** soittimen `currentTime`-kohdalla; vertailukohta lasketaan
**riippumattomasti** purkamalla sama mp3 `OfflineAudioContextissa` ja
laskemalla siitä 50 ms:n RMS-verhokäyrä. Mittarin omaa lukemaa ei
käytetä missään.

Mittaus ajetaan **eristetyllä sivulla**: pelisivulla kartan piirto
varaa pääsäikeen niin, että `setTimeout(50)` venyi mitattuna 600
ms:iin ja 25 sekunnista kertyi vain ~30 näytettä — liian harva sarja.
Eristetyllä sivulla on sama `js/kaiutinmittari.js`, sama äänitiedosto
ja sama äänigraafi (lähde → gain → analyser → ulos).

Aineisto: Horation Dubrovnik-saapumisluenta, 25,0 s, ~435 näytettä.

| Ajo | Korrelaatio *r* | Taukojaksot (>150 ms) | Kaarijakauma |
|---|---|---|---|
| **A. Mitattu lähde (normaali)** | **0,765** | 5 / 5 sammuksissa | 0:152 1:24 2:113 3:146 |
| B. Vastakoe: ajastettu kuvio pakolla | **0,057** | 0 / 4 sammuksissa | 0:58 1:137 2:132 3:108 |
| C. Vastakoe: gain 0 (hiljaisuus) | — | 5 / 5 sammuksissa | 0:436 |

**Vaatimus r > 0,6 täyttyy (0,765).** Ajastettu kuvio romahtaa
nollaan (0,057) ja jättää kaikki neljä taukojaksoa palamaan → vartio
punainen. Hiljaisuus sammuttaa kaikki 436 näytettä poikkeuksetta.

Taukoehto mitataan muodossa: jokaisesta yli 150 ms:n
hiljaisuusjaksosta annetaan alkuun **100 ms armonaikaa** (release-
vakio), sen jälkeen kaarien on oltava sammuksissa jakson loppuun asti.
A ja C läpäisevät tämän täydellisesti.

---

## 5. CORS-tarkistus

`curl` Originilla `https://matkakirja.app`:

```
$ curl -s -D- -o /dev/null -r 0-10 -H "Origin: https://matkakirja.app" \
    https://media.matkakirja.app/audio/intro-puhe.mp3
HTTP/2 206
content-type: audio/mpeg
vary: Origin
access-control-allow-origin: https://matkakirja.app
cache-control: public, max-age=2592000
```

**CORS on kunnossa GET-pyynnöllä** — juuri sillä metodilla, jota
`<audio>`-elementti käyttää. `crossOrigin = "anonymous"` toimii, eikä
MediaElementSource anna hiljaisuutta.

**Yksi huomio Fablelle (ei korjausta tässä):** sama tiedosto **HEAD**-
pyynnöllä vastaa ilman `access-control-allow-origin`- ja `vary`-
otsakkeita. HEAD ei ilmeisesti ole ämpärin CORS-säännön sallituissa
metodeissa. Selain ei käytä HEADia äänen lataamiseen, joten tämä ei
vaikuta peliin — mutta jos ämpärin CORS-sääntöä joskus muokataan, HEAD
kannattaa lisätä, jotta `cf-cache-status`-välimuisti ei voi täyttyä
CORS-otsakkeettomalla vastauksella.

---

## 6. Vartiot

`tools/savukkeet/savuke-kaiutin-luentakuvat.mjs`:

- **Vartio 2 tiukennettu.** Vanha ehto *"vähintään kaksi eri tilaa"*
  oli väljä — **ajastettu kuvio läpäisi sen, ja juuri se oli vika.**
  Tilalle kaksi tarkkaa ehtoa kummallakin ruudulla:
  - luenta kulkee Web Audion läpi (`luennanVahvistin` **ja**
    `aaniMittari` **ja** `crossOrigin === 'anonymous'`);
  - `kaiutinmittarinLahde() === 'mitattu'` (ei `'kuvio'`).
- **Vartio 13 (uusi):** korrelaatio > 0,6 ja jokainen yli 150 ms:n
  tauko sammuksissa ±100 ms.
- **Kolme vastakoetta:** pakotettu kuvio → korrelaatio romahtaa ja
  tauot palavat; gain 0 → kaikki kaaret sammuvat; mittari pakolla seis
  → tila ei vaihdu (vanha vastakoe ennallaan).
- Chromium käynnistetään lipulla `--autoplay-policy=no-user-gesture-
  required`, jotta `<audio>` pääsee soimaan ilman elettä eikä
  analysaattorilla ole tyhjä ketju.
- Elävyysnäytteitä nostettiin kolmesta kahteentoista (250 ms:n välein,
  3 s). Syy: mittari seuraa nyt oikeaa puhetta, ja isoisän lauseiden
  välissä on useamman sekunnin taukoja — kolme näytettä olisi voinut
  osua kokonaan tauon sisään ja antaa perusteettoman punaisen.

`tests/horatio-loppuhaivytys.test.mjs`:

- Vartio *"crossOrigin vain reitittävällä polulla"* päivitettiin
  vastaamaan uutta linjausta: lupa kaikilla laitteilla, mutta yhä
  ennen `srciä`, ja `kertojanVolumeToimii`-porttia ei saa palata.
- Uusi vartio: reititys ei saa portittua volumen tottelemisella,
  `kuunteleReitityksenAvautumista`-uusinta on olemassa ja vahti
  puretaan `irrotaLuennanVahvistimessa`.

---

## 6b. Porttien tulokset

| Portti | Tulos |
|---|---|
| `npm test` | **3441 testiä, 3428 läpi, fail 0** |
| `tarkista-kaksoisavaimet` | ei kaksoisavaimia |
| `tarkista-niputus` | 391 moduulia, ei törmäyksiä |
| `tarkista-savukkeet` | kunnossa |
| `rules.test` + `dokumentit.test` | 337/337 |
| `savuke-kaiutin-luentakuvat` (ajo 1) | 48/49 |
| `savuke-kaiutin-luentakuvat` (ajo 2) | 47/49 |

**Kaikki 13 kaiutin/VU-vartiota ja kolme vastakoetta menivät läpi
MOLEMMISSA ajoissa**, ja korrelaatio toistui: 0,758 → 0,756 (pakotettu
kuvio 0,060 → 0,057).

Punaiseksi jääneet ovat v1908:n TEKSTIPIILO-osion vartioita, joiden
mittaus nojaa 400 ms:n odotukseen, ja ne vaihtoivat paikkaa ajojen
välillä — merkki kuormasta, ei tästä muutoksesta:

- ajo 1: `ipad: lapun napautus näyttää merkinnän kesken luennan`
  (meni läpi ajossa 2);
- ajo 2: `ipad`/`tyopoyta: pulun repliikki ei jää ruudulle vaan
  pluskuplaan`, molemmat `piilo: false` eli kertoja ei ollut äänessä
  mittaushetkellä (menivät läpi ajossa 1).

Kumpikaan ei kosketa luennan äänireittiä eikä kaiutinmittaria. Kone oli
molemmissa ajoissa raskaasti kuormitettu (rinnakkainen `npm test` ja
toisen session ajo); samasta syystä 50 ms:n näytteistys jouduttiin
tekemään eristetyllä sivulla (osio 4).

Ei uusia moduuleja, joten `sw.js` SHELL ja `build-standalone` MODULES
ovat ennallaan (`js/kaiutinmittari.js` oli niissä jo).

---

## 6c. Jatko 15.9.2026: savuke-iphone-tekstit 40/41 (julkaisuagentin pysäytys)

Julkaisuagentti pysäytti v1910:n: tässä haarassa
`tools/savukkeet/savuke-iphone-tekstit.mjs` antoi **40/41 kahdesti
identtisesti**, rivi ~344: *"FAIL kaiuttimen VU-mittari elää kertojan
luennassa — kaaret=000 animaatio=none"*. Puhtaalla mainilla 41/41.

**Syy ei ollut tuotantokoodissa — vartio löysi oikean asian.** Savukkeen
`puhu()`-apuri luo oman `new Audio()`:n ja kutsuu `merkitsePuhuja():a`
suoraan, ohittaen `luentaSoitin()` / `liitaLuennanVahvistin()` -ketjun,
eikä aseta `ui.diaryVoicea`. Luentavahdin `haeMittari` palautti siis
`null`. v1908:ssa tämä ei näkynyt, koska mittarilla oli ajastettu
varapolku, joka eli ilman ääntäkin; nyt varapolku on poistettu ja
mittari lukee todellisen RMS:n, joten **äänetön tynkä jättää kaaret
perustellusti sammuksiin**. Savuke mittasi tilaa, jota pelissä ei ole.

**Korjaus savukkeeseen, ei tuotantoon.** `puhu()` rakentaa kertojalle
saman ketjun kuin tuotanto (lähde → gain → analyser → ulos) ja syöttää
siihen testisignaalin (180 Hz, gain 0,3); analysaattori asetetaan
`audio.aaniMittari`ksi ja soitin `ui.diaryVoice`ksi. Mykkä loppusolmu
pitää ajon hiljaisena muuttamatta analysaattorin näkemää tasoa.

- Vain kertojalle: pulun repliikki ei saa sytyttää kaiutinta (oma
  vartionsa), joten pululle jää pelkkä puheenvuoro ilman äänigraafia.
- `vaikene()` pysäyttää testisignaalin ja nollaa `ui.diaryVoicen`,
  jottei vastakoe saa apua soimaan jääneestä äänestä.
- Chromiumille `--autoplay-policy=no-user-gesture-required`.

**Ajastettua varapolkua EI palautettu tuotantokoodiin.**

Tulokset korjauksen jälkeen: `savuke-iphone-tekstit` **41/41**,
`savuke-kaiutin-luentakuvat` **49/49**, `npm test`
**3441 / 3428 läpi / fail 0**, `tarkista-savukkeet` kunnossa.

### Aiemmat 47–48/49 olivat mittarin oma kuormavika, eivät koodin

Aiemmissa ajoissa `savuke-kaiutin-luentakuvat` jäi 48/49:ään ja
47/49:ään vaihtuvilla punaisilla (`ipad: lapun napautus näyttää
merkinnän kesken luennan`, `pulun repliikki ei jää ruudulle`). Nämä
ajot tehtiin koneella, jota kuormitti rinnakkainen `npm test` JA tämän
session omat jumiin jääneet odotusprosessit — kun taas puhtaan mainin
verrokkiajo (41/41) ajettiin tyhjällä koneella. Vertailu ei siis ollut
kelvollinen.

Kun haara ajettiin YKSIN tyhjällä koneella, tulos oli **49/49**, ja
iPadin napautusvartio antoi täsmälleen samat luvut kuin puhdas main:
`klikki "ok (143,87 → H2.paikka-aika)"`, `lappu:false`,
`rivi {w:329, h:0}`. Ero aiempiin ajoihin oli kuormassa, ei koodissa.
Nämä vartiot nojaavat 400 ms:n odotukseen napautuksen jälkeen, joten
ne on ajettava yksi kerrallaan.

Korrelaatio toistui kolmannen kerran: **r = 0,746** (tauot 5/5
sammuksissa), pakotettu kuvio 0,085 ja 5/5 taukoa rikki, hiljaisuus
436/436 näytettä nolla kaarta.

---

## 7. Mitä omistajan pitää vahvistaa iPhonella

1. Saapumisluenta **istunnon ensimmäisenä** (juuri se tapaus, joka
   ennen jäi reitittämättä): kaaret nousevat ja laskevat isoisän
   puheen tahdissa, ja **lauseiden väleissä kaikki kolme kaarta
   sammuvat**.
2. **Äänenvoimakkuus ei muuttunut.** Luenta kuuluu samalla tasolla kuin
   v1908:ssa, ja Lukija-liuku säätää sitä yhä.
3. **Lukija-liuku hiljaiselle:** ääni hiljenee, mutta **kaaret elävät
   yhtä vahvasti** (mittari näyttää puheen, ei säätimen asennon).
4. **Mykistys:** kaikki kaaret sammuvat.
5. **Livia ja linssit** kuulostavat ja toimivat ennallaan.
