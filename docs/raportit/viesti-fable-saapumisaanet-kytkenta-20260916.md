# Saapumisäänet kytketty minitraileriin — viesti Fablelle 16.9.2026

Codexin aineisto-PR **#2535** (`codex/horatio-saapumiset-20260915`, lähde
`faf1ca50`) on nyt kytketty peliin haarassa
`claude/bold-ride-vow4ki-saapumisaanet` (pohjaan on mergetty `origin/main`
`78e60489`). Aineistoon, manifestiin tai ääniin ei ole koskettu; tämä on
pelkkä runtime-kytkentä. **Ei versionostoa, ei PR:ää, ei Raamattu-kirjausta**
— ne jäävät Fablelle.

Omistajan linjaus, johon kytkentä nojaa: *"Kokeile tehdä pelkästään isoisän
äänellä. Siinä paras että generaattori tekee itse tauon"* ja *"Nyt hyvä. Tee
kaikkiin ja vie peliin"* (15.9.2026). Isoisä sanoo kaupungin nimen ja nykyisen
iskulauseen yhtenä ottona; pulu ei puhu eikä näy saapumisäänessä.

## Mihin kohtaan soitto kytkettiin

Kaupungin minitraileri (`js/saapumistraileri.js`) soittaa puheen **samasta
hetkestä, jossa nimi lähtee lentoon** — eli kun kaupungin nimi ja iskulause
tulevat ruudulle:

- `naytaSaapumistraileri` → `nostaNimi` → `aloitaSaapumispuhe()`.
  Kutsu on saman `kirjaimetLahtivat`-lipun takana kuin kirjainten suhina,
  joten rAF ja 50 ms:n varakutsu nostavat saman nimen eikä puhetta lähde
  kahta.
- Puhe haetaan `haeSaapumispuhe(city)` (js/media.js → `SAAPUMISPUHEET`).
  Puhumaton kaupunki (Euroopan ulkopuoli) jättää trailerin ennalleen.
- Soitin on **js/luenta.js:n uusi `soitaSaapumispuhe(ui, url, { onLoppu })`**:
  traileriin ei tullut omaa Audio-koneistoa. Funktio käyttää luennan omaa
  `luentaSoitinta` (crossOrigin='anonymous', Web Audio -vahvistin ja
  analysaattori kaikilla laitteilla, taso `puheVoima()`:sta eli Lukija-liu'usta),
  merkitsee puhujan (`merkitsePuhuja` → taustamusiikin väistö, taustalle menon
  hiljennys, lukijaliuku) ja kirjaa soittimen `ui.luennat`-joukkoon, jolloin
  jokainen olemassa oleva pysäytystie (`stopDiaryVoice`, `haivytaLuenta`,
  `taustaHiljennaLuennat`) vaientaa myös saapumispuheen.
- Kytkin on kertojan nykyinen: `luentaKytkinPaalla()` (= valikon KERTOJA ja
  kortin kaiutin). Pois päältä → soitinta ei edes luoda. Radiotila estää
  samoin.
- **Ei pehmeää loppua eikä lauserajapysäytystä**: Codexin ohje *"Älä leikkaa
  puhetta kellon perusteella"* — loppu tulee soittimen omasta
  `ended`-tapahtumasta.

## Matkakirjaluenta odottaa puheen loppua

Trailerin **lupaus** (js/ui.js `renderFact` odottaa sitä ennen kirjoituskonetta,
luentaa, välihuutoa ja luentakuvasarjaa) ratkeaa nyt näin:

| poistumistie | puhe | lupaus |
| --- | --- | --- |
| traileri loppuun (`odotaPuhe: true`) | jatkuu leikkaamatta | vasta `ended`-tapahtumasta |
| napautusohitus | pysäytetään heti | heti (häivytyksen 200 ms:n jälkeen) |
| kaupungin vaihto / virran sulku (`peru`) | pysäytetään ja siivotaan | heti |
| hylätty `play()` (iOS NotAllowedError) | ei ääntä | heti, kuten ilman puhetta |

Lisäksi `naytaSaapumistraileri` vaientaa aina edellisen kaupungin puheen
(`pysaytaSaapumispuhe`), koska puhe voi elää trailerinsa yli. Varmuusraja
`SAAPUMISPUHEEN_KATTO_MS = 20 s` päättää odotuksen, jos soitin jää jumiin
(verkko poikki) — pisin otto on 5,6 s, joten rajaan ei osuta pelissä.

## Mitä vanhaa poistettiin

**Ei mitään.** Trailerissa ei ollut kertoja- tai pulu-ääntä eikä kaikua
kytkettynä: siellä soivat vain tehosteet `pulu.kamera-klik` ja
`pulu.kirjain-suhina` (omistajan oma tilaus 11.9.2026), ja ne jäävät. Vanhaa
erillistä Pulun slogan-ottoa ei kutsuta mistään (haku `js/`: ei osumia).
Livian saapumiskupla tulee yhä vasta matkakirjaluennan jälkeen.

## Kaiutinsymboli

Trailerissa ei ole kaiutinkuvaketta, joten sinne ei lisätty mittaria.
Matkakirjakortin kaiutin on saman kertojan merkki, ja se jäisi ilman
analysaattoria juuri saapumispuheen ajaksi (ajastettu kuvio, ks.
js/kaiutinmittari.js), joten `js/ui.js`:n luentavahti lukee mittarin lähteen
nyt `this.diaryVoice ?? saapumispuheenSoitin()` -kahvasta. Muuta ei muutettu.

## Mittaukset

**Yksikkötestit** (`NODE_USE_ENV_PROXY=1 node --test`):

- uusi `tests/saapumispuhe-traileri.test.mjs` 10/10 (valinta kytkimestä ja
  aineistosta, ei kaksoissoittoa, lupaus odottaa `endediä`, ohitus ja
  kaupunginvaihto siivoavat, hylätty `play()` ei jumita);
- `media`, `mediauusinta`, `saapumispuhe-aineisto`, `saapumisasento`,
  `saapumistraileri`, uusi testi: **109 läpi / 0 virhettä / 1 ohitettu**;
- ääni- ja luentatestit (`aanisaatimet`, `aanitasot`, `aanilahteet`,
  `livia-aani`, `luentareaktiot`, `lukija*`, `luentakuva*`,
  `pulun-aaniputki`, `horatio-loppuhaivytys`): **229/229**;
- `rules`, `dokumentit`, `sw`: **360/360**;
- `node tools/tarkista-niputus.mjs`: 392 moduulia, ei törmäyksiä.
  `node --check` kaikille muutetuille tiedostoille.

**Savuke `tools/savukkeet/savuke-saapumispuhe.mjs`** (Ateena, 390 × 844 ja
1400 × 900, Chromium): **26/26 vartiota läpi**. Mitattu kummallakin ruudulla:

- traileri ruudulla ja nimi "Ateena" ladottuna;
- soittimen `src` = `SAAPUMISPUHEET.ateena.url` (ämpärin alkuperäinen MP3,
  HTTP 200 Noden kautta — paikallista hiljaista varatiedostoa ei tarvittu
  tässä ajossa; savuke tarjoilee sen, jos lataus katkeaa välipalvelimeen, ja
  kirjaa asian lokiin);
- `play()` kutsuttu **tasan kerran** kyseiselle osoitteelle;
- `crossOrigin='anonymous'`, `luennanVahvistin` ja `aaniMittari` olemassa
  (Web Audio -reitti kuten muussa luennassa);
- `ui.diaryVoice` tyhjä puheen ajan; traileri päätetään kesken puheen →
  puhe jatkuu (`paused === false`) ja matkakirjaluenta **ei** ala; simuloitu
  `ended` → `diaryVoice` syntyy ja soitin siivoutuu;
- napautusohitus → puhe pysähtyy ja soitinkahva tyhjenee;
- **vastakoe**: `matkakirja-kertoja='ei'` → traileri pyörii, soitinta ei
  synny, `play()`-laskuri 0.

Mittauksen apu: puhe hidastetaan mittausjakson ajaksi (`playbackRate = 0.25`),
jotta trailerin päättäminen ja kaksi mittausta mahtuvat varmasti 3,2 sekunnin
oton sisään kuormitetulla koneella. Peliin tämä ei vaikuta.

**Savuke `savuke-kaiutin-luentakuvat.mjs`.** Savukkeen odotukset piti päivittää:
ne odottivat pelkkää `kertoja-aanessa`-luokkaa, joka syttyy nyt jo trailerin
saapumispuheesta sekunteja ennen matkakirjaluentaa, ja mittasivat siksi väärää
hetkeä (5 perusteetonta punaista). Odotuksiin lisättiin ehto `LUENTA_SOI`
(`ui.diaryVoice` soi) — se on juuri se luenta, jota nämä vartiot koskevat.
Päivityksen jälkeen kaikki TEKSTIT PIILOON -osiot ovat vihreitä.

Tässä kontissa savuke ei mahdu 10 minuutin ajoikkunaan (ajo katkaistiin
kesken; 41 OK / 2 FAIL 590 sekunnissa). Jäljelle jäänyt punainen on
`tyopoyta: mittarin lähde on MITATTU, ei ajastettu kuvio` — se **toistuu myös
ilman tätä kytkentää**: sama savuke ajettiin muutokset stashattuna samalla
koneella ja tulos oli identtinen (21 OK / 1 FAIL, sama vartio, `lahde: null`).
Kyse on tämän kontin hitaudesta: mittaus osuu 25 sekunnin luennan loppuun,
jolloin mittari on jo sammunut. Kytkennän jälkeinen ajo antaa nyt tismalleen
saman äänireitin kuin pohja (`vahvistin: true, mittari: true`).

**Savuke `savuke-era12.mjs`** (kartta, zoomin rajaus ja maapaneeli): ajo ei
sekään mahdu 10 minuuttiin tässä kontissa; ennen katkaisua **16 OK / 0 FAIL**
(zoomirajat, maapaneelin paikka ja koko, panorointi, Kreikan paneeli 390 ja
1400 px). Ei punaisia.

## Avointa Fablelle

1. Versionosto, CI ja julkaisu — sekä kytkentäcommitin ja versionumeron
   readback Codexille (postilaatikko `posti/codex-aanien-pelivienti-20260916.md`
   odottaa kuittausta).
2. Raamatun vanha kahden lukijan saapumislinjaus (*"LYHYET SAAPUMISAANET:
   kertoja sanoo kaupungin nimen ja Pulu iskulauseen"*, js/tyohuone-raamattu.js)
   on yhä voimassa oleva teksti; omistajan 15.9. päätös korvaa sen. Vain Fable
   kirjoittaa Raamattuun, joten muutos jätettiin tekemättä.
3. Omistajan hyväksymiskoe oikealla laitteella (vähintään yksi iOS/Safari-
   toisto) on yhä tekemättä — tässä kontissa on vain Chromium.
