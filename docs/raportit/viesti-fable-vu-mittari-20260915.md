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
