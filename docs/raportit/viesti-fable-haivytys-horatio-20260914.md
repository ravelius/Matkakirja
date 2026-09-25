# Viesti Fablelle: Horation loppuhäivytys ja taso Web Audiolla 14.9.2026

Opus-työagentti. Haara `claude/bold-ride-vow4ki-haivytys-horatio`, pohja
`origin/main` (`10c52aac`). Jatkoa Livian häivytys-PR:lle (#2461); Fablen
toimeksianto: sama iOS-korjaus kertojalle.

## Tilanne yhdellä rivillä

**Mittaus kääntää kysymyksen ympäri: Horatiolla naksahdus ON — ja häivytys
oli jo olemassa.** `pehmeaLoppu` on häivyttänyt kertojan lopun vuosia, mutta
se kirjoitti `audio.volumeen`, jota iOS ei tottele: **puhelimessa koko
häivytys on ollut olematon ja `pause()` on osunut täyteen ääneen 25 ms ennen
tiedoston reunaa.** Korjattiin vain tason kirjoitus. Kaikki neljä porttia
vihreinä, `# fail 0`.

## 1. Mittaus: viimeiset 50 ms ja viimeinen näyte

Kolme Horatio-tuotanto-mp3:a ladattiin ämpäristä ja dekoodattiin
(`mpg123-decoder`; ffmpeg/ffprobe ei saatavilla).

| äänite | kesto s | loppu 50 ms RMS | loppu 50 ms huippu | **viimeinen näyte** | loppuhiljaisuus | alkuhiljaisuus | alku 20 ms huippu |
|---|---|---|---|---|---|---|---|
| pariisi | 30,320 | −36,9 dBFS | −29,2 dBFS | **−0,000850** (−61,4 dBFS) | **0,0 ms** | 73,9 ms | −74,3 dBFS |
| ateena | 30,880 | −37,6 dBFS | −26,2 dBFS | **−0,005189** (−45,7 dBFS) | **0,0 ms** | 77,4 ms | −77,4 dBFS |
| lontoo | 31,920 | −31,7 dBFS | −20,6 dBFS | **+0,011618** (−38,7 dBFS) | **0,0 ms** | 137,8 ms | −77,0 dBFS |

**Vastaus: KYLLÄ, DC-hyppy on.** Toisin kuin Livialla (0,15 s hiljaisuutta,
viimeinen näyte tasan 0), kertojan äänite ei päädy hiljaisuuteen lainkaan:
loppuhiljaisuus on **0,0 ms** kaikissa kolmessa ja viimeinen näyte on
kuuluvalla tasolla. Lontoon −38,7 dBFS:n hyppy nollaan on kuuluva naksahdus.
Häntäprofiili (huippu 5 ms ikkunoissa) vahvistaa saman: lontoo päättyy
tasoille −22 … −21 dBFS, ei vaimenemiseen.

**Alku on puhdas**: alkuhiljaisuutta 74–138 ms ja alun 20 ms huippu
−74…−77 dBFS. **Alkunousua ei tehty.**

## 2. Se, mitä mittaus paljasti koodista

Tiedoston reunan töksähdys on tunnettu ja hoidettu jo: `pehmeaLoppu`
(`js/luenta.js`) häivyttää viimeiset **120 ms** (`LOPUN_HAIPYMA_S`) nollaan
**25 ms** ennen reunaa (`LOPUN_HILJAISUUS_S`) ease-in-käyrällä ja pysäyttää
soittimen vasta vaienneena. Moduulin oma kommentti sanoo sen suoraan:
*"ElevenLabsin tiedosto päättyy keskeltä signaalia, ja kova reuna kuului
pienenä töksähdyksenä"*. Mittaus yllä on siis riippumaton vahvistus sille,
että kyseinen ratkaisu on oikea ja tarpeen.

**Vika on siinä, mihin taso kirjoitettiin.** Jokainen tasonkirjoitus
moduulissa meni `audio.volumeen`, jota iOS:n WebKit ei tottele (mittaus ja
perustelu: `js/musiikkivahvistin.js`, omistajan kaksi vikailmoitusta 8.9. ja
9.9.2026 — kirjoitus menee läpi ilman virhettä ja lukema palaa ykköseksi).
Puhelimessa siis:

- `pehmeaLoppu` ei vaimentanut mitään, ja `pause()` osui **täyteen ääneen**
  25 ms ennen reunaa — naksahdus, jota koodi luuli estävänsä;
- keskeytyshäivytykset (`haivytaAani`, `haivytaJaSiivoa`, `stopDiaryVoice`)
  olivat kovia leikkauksia keskellä lausetta;
- Lukija-liuku (`paivitaLuentojenVoima`) ei säätänyt soivaa luentaa.

## 3. Toteutus: vain tason kirjoitus vaihtui

Fablen ohje oli "40 ms ramppi kohtaan duration − 60 ms". **Sitä ei
toteutettu, ja syy on mittauksessa:** olemassa oleva ramppi on pidempi ja
päättyy aiemmin (120 ms → nolla 25 ms ennen reunaa), ja sen nykyiset arvot
ovat omistajan hienosäätämiä — aiempi pidempi häivytys *söi viimeisen sanan*,
mistä `tests/rules.test.mjs` pitää erillistä porttia. 40 ms ramppi loppuun asti
olisi ollut askel taaksepäin. **Häivytyskäyriä, kynnyksiä, cue-ajastusta,
aikaleimoja eikä keskeytyksiä ei muutettu.**

Muuttui se, MIHIN taso kirjoitetaan — sama `volumeToimii()`-valinta kuin
Livialla (koe-elementti, ei user-agent):

| selain | reitti |
|---|---|
| työpöytä, Android | `audio.volume` kuten ennen: ei uusia solmuja, ei crossOriginia, pyyntö tavu tavulta entinen |
| iOS | pelin **oma** äänikonteksti (`sfx.ensureContext`) → `MediaElementAudioSourceNode` → `GainNode`, taso gainiin |

Uudet viennit: `luennanTaso`, `asetaLuennanTaso`. Uusi sisäinen `luentaSoitin`,
joka asettaa `crossOrigin`in **ennen** srciä ja **vain** reitittävällä polulla,
liittää vahvistimen ja purkaa sen soittimen kuollessa (myös pysäytyksessä,
jossa `ended` ei tule).

Kaikki kuusi tasonkirjoituskohtaa kulkevat nyt `asetaLuennanTason` kautta:
`playIntroVoice`, `playDiaryVoice`, `paivitaLuentojenVoima`, `pehmeaLoppu`,
`haivytaAani`, `haivytaJaSiivoa` ja `stopDiaryVoice`. Jos reititys ei onnistu
(konteksti nukkuu, ei elettä vielä), taso jää volumeen kuten ennen:
**hiljaisuutta ei koskaan valita häivytyksen takia.**

CORS mitattu jo Livian yhteydessä: ämpäri peilaa Originin
(`access-control-allow-origin: <pyynnön origin>`, `vary: Origin`), joten
`crossOrigin = 'anonymous'` toimii.

## 4. Testit

**Uusi** `tests/horatio-loppuhaivytys.test.mjs` (6 testiä): taso volumeen
ilman vahvistinta ja **vahvistimeen reititettynä, jolloin elementin volume jää
ykköseen**; kirjoitus ei kaadu selaimeen, joka torjuu arvon; **yhtään tason
kirjoitusta ei jäänyt suoraan volumeen** (tasan yksi osuma, `asetaLuennanTason`
varapolku — tämä on portin ydin: suoraan volumeen kirjoittava uusi häivytys
toimisi työpöydällä ja katoaisi puhelimessa ilman että mikään kaatuu);
häivytyksen käyrää ei muutettu (120 ms / 25 ms / ease-in); `crossOrigin` ennen
srciä ja vain reitittävällä polulla.

**Päivitetyt portit** (yhtä tiukkoina): `tests/livia-aani.test.mjs` ja
`tests/lukijaliuku.test.mjs` tunnistavat molemmat aloitusmuodot, jottei uusi
reitti pääse puhujakirjanpidon ohi.

**Korjattu hauras portti:** `tests/rules.test.mjs` *"luennan loppuhäivytys ei
niele viimeistä sanaa"* leikkasi `pehmeaLoppu`-funktiosta kiinteät 2000
merkkiä, ja ikkuna katkesi kesken, kun funktioon lisättiin perustelukommentti
— portti kaatui vaikka koodi oli oikein. Rajaus on nyt funktion **oma loppu**:
sekä tarkempi että kestävämpi. Vaatimukset ennallaan.

## 5. Savuke (Playwright, Chromium /opt/pw-browsers/chromium)

Pariisin kertojaluenta soitettiin oikeasta tuotanto-mp3:sta (30,32 s,
tarjoiltu ämpärin osoitteeseen oikeina tavuina), ja **sekä gain että elementin
oma volume** näytteistettiin 4 ms välein loppuun asti.

| mitattu | koe (työpöytäpolku) | vastakoe (iOS-reitin jäljitelmä) |
|---|---|---|
| luenta soi, kesto | 30,32 s | 30,32 s |
| taso ennen häivytysikkunaa | 0,9 | 0,9 |
| taso häivytysikkunassa | laski **0,0395**:een | laski **0,110**:een |
| **elementin oma `volume` ikkunassa** | laski mukana 0,0395 | **pysyi 0,9:ssä koko ajan** |
| taso lopussa | **0** | **0** |
| pysähtyi | kyllä, 30,30–30,32 s (= reuna − 25 ms) | kyllä, 30,30 s |
| `matkakirja:luenta-loppu` | **kyllä** | kyllä |
| `luentaPaattyiLuonnollisesti` | **kyllä** | kyllä |
| konsolivirheet / JS-poikkeukset | **0** | 0 |

**Vastakokeen merkitys:** kun soittimelle on vahvistin, häivytys laskee
**gainia** ja elementin oma `volume` **ei liiku lainkaan**. Juuri se on koko
korjaus: iOS:llä `volume` on jäädytetty ykköseen, joten ainoa tapa saada
häivytys kuulumaan on viedä se gainiin. Ennen tätä muutosta ramppi kirjoitti
yksinomaan volumeen.

Savuke on kertaluontoinen mittaus eikä repossa (sama käytäntö kuin Livian
häivytyksessä); savukerekisteriin ei tullut riviä.

## 6. Portit

```
npm test                                → # tests 3372, # pass 3359, # fail 0
node tools/tarkista-kaksoisavaimet.mjs  → ei kaksoisavaimia
node tools/tarkista-niputus.mjs         → 387 moduulia, ei törmäyksiä
node tools/tarkista-savukkeet.mjs       → 1651 ui-viittausta, 405 metodia
```

## 7. Mitä ei tehty

Ei tiedostojen muokkausta eikä uudelleenpakkausta, ei ElevenLabs-kutsuja, ei
luentalogiikan muutoksia (cue-ajastus, aikaleimat, lauserajat, keskeytykset,
puhujakirjanpito ennallaan), ei uutta häivytyskäyrää. Ei Raamattu-muutoksia,
ei versionostoa, ei muutoslokiriviä, ei mergeä, ei `dist/`-kansiota, ei
avaimia lokiin. `js/liviapuhe.js` on tässä haarassa koskematon — Livian
korjaus on omassa PR:ssään #2461.

## 8. Huomio jatkoon

`js/linssipuhe.js` ja `js/ui.js` aloittavat luentoja samalla
`audio.volume = puheVoima()` -muodolla (`tests/lukijaliuku.test.mjs` käy ne
läpi). **Sama iOS-rajoite koskee niitä**, mutta niitä ei mitattu eikä
muutettu tässä erässä. Fable päättää, tarvitaanko kolmas erä.
