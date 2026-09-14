# Viesti Fablelle: Livian loppuhäivytys toistossa 14.9.2026

Opus-työagentti. Haara `claude/bold-ride-vow4ki-haivytys`, pohja `origin/main`
(`e344d5e7`). Omistajan päätös (Raamattu, "PULUN ÄÄNI … LOPPUHÄIVYTYS"):
*"Pululle voi tehdä ne loppu feidit, ne ei varmaan edellytä uudelleen
pakkausta"* — Fablen linjaus: häivytys toistoon, ei tiedostoon.

## Tilanne yhdellä rivillä

**Mittaus: naksahdusta ei ole kummassakaan päässä.** Neljä tuotantoäänitettä
päättyy jo digitaaliseen nollaan, ja alku on yhtä puhdas. Häivytys on silti
toteutettu — mutta se toteutettiin niin, että se samalla korjaa sen häivytyksen,
joka oikeasti puuttui: **katkaisuhäivytys ei ole koskaan toiminut iOS:ssä.**
Kolme porttia vihreinä, savuke kahdella vastakokeella, tiedostoihin ei koskettu.

## 1. Mittaus: onko naksahdusta?

Neljä versionoitua tuotanto-mp3:a ladattiin ämpäristä
(`media.matkakirja.app`) ja dekoodattiin `mpg123-decoder`illa — ffmpeg/ffprobe
ei ole saatavilla. Mitattiin viimeisten 50 ms:n RMS ja huippu, **viimeisen
näytteen arvo** (DC-hyppy nollaan olisi naksahdus), loppu- ja alkuhiljaisuus
(−60 dBFS) sekä alun 20 ms.

| äänite | kesto s | loppu 50 ms RMS | viim. näyte | loppuhiljaisuus s | alkuhiljaisuus s | alku 20 ms huippu |
|---|---|---|---|---|---|---|
| livia-pariisi-3 | 25,679 | −∞ dBFS | **0,000000** | 0,152 | 0,005 | −35,9 dBFS |
| livia-rooma-3 | 17,616 | −∞ dBFS | **0,000000** | 0,150 | 0,007 | −31,4 dBFS |
| livia-ateena-3 | 18,389 | −∞ dBFS | **0,000000** | 0,160 | 0,088 | −76,7 dBFS |
| livia-sofia-3 | 11,973 | −∞ dBFS | **0,000000** | 0,156 | 0,008 | −33,8 dBFS |

Tarkempi häntäprofiili (huippu 5 ms ikkunoissa, pariisi-3, dBFS):

```
… −22 −21 −22 −25 −30 −37 −43 −52 −79 −84 −95 −119 −127 −151 −227 −∞ −∞ …
```

**Vastaus: EI NAKSAHDUSTA.** Puhe vaimenee itsestään noin 40 ms:ssä
−20 dBFS:stä alle −99 dBFS:n, ja sen jälkeen on 0,15 s digitaalista
hiljaisuutta. Viimeinen näyte on tasan nolla kaikissa neljässä, eli äänite ei
katkea kesken aaltoa. Sama koskee alkua: ensimmäinen näyte on suuruusluokkaa
1e−4 ja alkuhiljaisuutta on 5–88 ms. **ALKUNOUSUA EI SIKSI TEHTY LAINKAAN.**

Aiemman ffmpeg-vaiheen 30 ms häivytykset päihin eivät siis olleet se, mikä
näissä tiedostoissa esti naksahduksen — eleven_v3:n oma lopetus tekee sen.

## 2. Se häivytys, joka oikeasti puuttui

Kun seuraava kupla katkaisee repliikin kesken, `pysaytaLivianAani` on
häivyttänyt äänen (`LIVIAN_HAIVYTYS_MS` 160 ms) — mutta se kirjoitti
`audio.volumeen`, **jota iOS:n WebKit ei tottele** (mittaus ja perustelu:
`js/musiikkivahvistin.js`, omistajan kaksi vikailmoitusta 8.9. ja 9.9.2026).
Puhelimessa katkaisu on siis ollut kova leikkaus keskellä sanaa, vaikka
koodissa luki häivytys. Nyt molemmat häivytykset kulkevat samaa polkua, ja
iOS:ssä se polku on vahvistinsolmu.

## 3. Toteutus (`js/liviapuhe.js`, ~120 riviä + kytkennät)

Kaksi reittiä, valinta **mittaamalla** (`volumeToimii()` kirjoittaa
koe-elementtiin ja lukee takaisin — ei user-agentista):

| selain | reitti | häivytys |
|---|---|---|
| työpöytä, Android (volume tottelee) | taso `audio.volumeen`, **ei uusia solmuja, ei crossOriginia** | ajastin, 4 ms askel |
| iOS (volume ei tottele) | `sfx.ensureContext()` → `MediaElementAudioSourceNode` → `GainNode` | `linearRampToValueAtTime` äänisäikeellä (näytetarkka) |

Uudet vientilistat: `LIVIAN_LOPPUHAIVYTYS_MS` (40), `livianLoppuKerroin`,
`livianTaso`, `asetaLivianTaso`. Käyrä on lineaarinen ja sama funktio
soittaa sen ja tulee testatuksi — ei kahta totuutta.

**Konteksti on pelin oma** (`js/sound.js` `sfx.ensureContext`) `js/musiikkivahvistin.js`:n
kautta — toista AudioContextia ei luoda, ja se herää käyttäjän eleestä kuten
ennenkin. Jos reititys ei onnistu (konteksti nukkuu, ei elettä vielä), taso jää
elementin volumeen eli käytös on täsmälleen entinen: **hiljaisuutta ei koskaan
valita häivytyksen takia.**

### Milloin ramppi käynnistyy

`timeupdate` ei riitä yksin: selain lähettää sen noin neljä kertaa sekunnissa,
eli ~250 ms tarkkuudella, kun häivytys on 40 ms. **Mitattu selaimessa:** suoraan
timeupdatesta viritetty häivytys ei ehtinyt laskea tasoa lainkaan ennen
`ended`-tapahtumaa (taso 0,8 loppuun asti). Siksi vahti vain **ajastaa** rampin
kohtaan `duration − 40 ms − 20 ms jitterivara`, ja ramppi itse ajetaan
ajastimesta. Jos ajastin on myöhässä, ramppi lyhennetään jäljellä olevaan
aikaan. Jitterivara mahtuu mitattuun 0,15 s loppuhiljaisuuteen eikä syö puhetta.

Toinen mitattu yksityiskohta: askeltava ramppi **kirjoittaa nollan** lopuksi
eikä jätä sitä viimeisen askeleen varaan. Ilman sitä taso jäi mitatusti
**0,096**:een (perustaso 0,8), koska ajastin ei tikitä millisekunnilleen.

### Mikä EI muuttunut

- `livianKuplanAjastin` ja eleet: koskematta. Kupla lukee kestoa, ei tasoa.
- `ended` tulee normaalisti — tasoa lasketaan, toistoa ei katkaista.
- Tasokaava `pulunVoima() * LIVIAN_PERUSTASO * vaimennus` on yhä yhdessä
  paikassa; rajaus 0…1 siirtyi `asetaLivianTasoon` ja portit vaativat molemmat.
- `paivitaPulunVoima` ei nosta ääntä takaisin kesken loppurampin (viimeiset
  40 ms); seuraava repliikki lähtee uudella tasolla.
- `crossOrigin` asetetaan **vain** reitittävällä polulla: työpöydän pyyntö
  pysyy tavu tavulta entisenä.
- `js/pollo.js`, `js/livia-*.js`, `js/luenta.js`: koskematta.

## 4. CORS — mitattu, ja reitti on auki

```
GET (Origin: https://matkakirja.app)     → 206, vary: Origin,
                                            access-control-allow-origin: https://matkakirja.app
GET (Origin: https://ravelius.github.io) → 206, access-control-allow-origin: https://ravelius.github.io
OPTIONS-preflight                        → 204, access-control-allow-methods: GET
```

Ämpäri peilaa Originin, joten `crossOrigin = 'anonymous'` toimii eikä Web Audio
-reitti mykistä ääntä. **Sama kuvio kuin musiikilla ja äänimaisemalla**, jotka
lataavat samasta ämpäristä samalla luvalla tuotannossa. Ilman Origin-otsaketta
(pelkkä HEAD) vastauksessa ei ole ACAO-riviä — se on Cloudflaren normaali
`vary: Origin` -käytös, ei puute.

## 5. Testit

**Uusi yksikkötesti** `tests/livia-loppuhaivytys.test.mjs` (6 testiä):
käyrä on 1 ennen ikkunaa ja 0 lopussa; käyrän ikkuna on tasan 40 ms
äänitteen lopussa; käyrä on lineaarinen (puolivälissä 0,5, neljänneksessä
0,25) ja monotonisesti laskeva 41 pisteessä; tuntematon kesto (NaN, Infinity,
0, null) ei häivytä mitään; taso menee volumeen ilman vahvistinta ja
**vahvistimeen reititettynä, jolloin elementin oma volume jää ykköseen**.

**Päivitetyt portit** (kaava ja rajaus vartioidaan yhä, uudessa muodossa):
`tests/aanisaatimet.test.mjs`, `tests/livia-aani.test.mjs`.

## 6. Savuke (Playwright, Chromium /opt/pw-browsers/chromium)

Pariisin `pollo.kommentti[0]` soitettiin oikeasta tuotanto-mp3:sta
(`livia-pariisi-3.mp3`, 25,68 s, tarjoiltu ämpärin osoitteeseen oikeina
tavuina), taso näytteistettiin 4 ms välein `ended`-tapahtumaan asti.

| mitattu | tulos |
|---|---|
| repliikki soi, `ended` tuli | kyllä |
| taso ennen häivytysikkunaa | 0,8 (= `pulunVoima × LIVIAN_PERUSTASO`) |
| **taso `ended`-hetkellä** | **0** |
| pienin mitattu taso | 0 (saavutettiin ennen `ended`ia) |
| konsolivirheet / JS-poikkeukset | **0** |
| kuplan ajastin | kahva numero, jatko 26,08 s = kesto + häntä (ennallaan) |
| `ui.liviaAani` / `ui.luennat` siivottu | kyllä |

**Vastakoe 1 (teksti):** kuplan tekstiä muutettiin yhdellä sanalla →
tiivistevartio hylkäsi äänitteen, **repliikki ei soinut lainkaan** — eli
häivytyskoodi ei ohita ajantasaisuusporttia.

**Vastakoe 2 (häivytys pois):** sama ajo lipulla, joka estää rampin
virittymisen → **taso pysyi 0,8:ssa loppuun asti**, `tasoEndedHetkellä 0,8`.
Mittari siis huomaa puuttuvan häivytyksen.

**Havaittu vaihtelu:** kolmesta ajosta kahdessa näytteistin näki rampin
kokonaan; yhdessä pääsäie nälkiintyi (vain 1 näyte 45 ms ikkunassa) eikä
ramppia näkynyt. Se on mittarin, ei toiston, resoluutio-ongelma — mutta
todettakoon rehellisesti: ajastinkuristuksessa loppuramppi voi jäädä ajamatta.
Silloin kuuluu täsmälleen se, mitä ennenkin, ja äänite on siinä kohtaa joka
tapauksessa jo hiljaa (mitattu 0,15 s).

Savuke on kertaluontoinen mittaus eikä repossa (sama käytäntö kuin 14.9.
ääni-integraation savukkeella); savukerekisteriin ei tullut riviä.

## 7. Portit

```
npm test                                → # tests 3368, # pass 3353, # fail 2
node tools/tarkista-kaksoisavaimet.mjs  → ei kaksoisavaimia
node tools/tarkista-niputus.mjs         → 387 moduulia, ei törmäyksiä
node tools/tarkista-savukkeet.mjs       → 1651 ui-viittausta, 405 metodia
```

Failit ovat `tests/pollo.test.mjs`:n **kuormavartioita** (*"indeksi rakentuu
ja on kokoluokaltaan järkevä"*, *"haku on nopea myös koko aineistolla"*) —
ajastusmittauksia, jotka kaatuvat konttiympäristön kuormassa. **Todistettu,
ettei syy ole tässä muutoksessa:** sama tiedosto ajettiin erikseen sekä tästä
haarasta että koskemattomasta `origin/main`-työpuusta, ja molemmissa kaatui
yksi kuormavartio — eri vartio eri ajolla (haarassa "indeksi rakentuu",
mainissa "haku on nopea"), mikä on vartion satunnaisuutta, ei regressio.
Kirjattu ohjeen mukaan.

## 8. Mitä ei tehty

Ei tiedostojen muokkausta eikä uudelleenpakkausta, ei ElevenLabs-kutsuja, ei
`js/pollo.js`- tai `js/livia-*.js`-muutoksia (Codexin alue), ei Horation
toistoon (`js/luenta.js`) — sama vika olisi siellä mitattava erikseen, ks. alla.
Ei Raamattu-muutoksia, ei versionostoa, ei muutoslokiriviä, ei mergeä, ei
`dist/`-kansiota, ei avaimia lokiin.

## 9. Kirjattavaksi: Horatio

Horation luenta (`js/luenta.js`) asettaa tasonsa suoraan `audio.volume =
puheVoima()` ja häivyttää samalla tavalla volumea pitkin. **Sama iOS-rajoite
koskee siis kertojaa**, ja 14.9. ääni-integraatioraportin kestomittaus (ei oma) näyttää, että Horation
40 mp3:n loppuhiljaisuus on 0,00 s — eli kertojan äänite päättyy TIUKASTI
puheen loppuun, toisin kuin Livian (0,15 s). Toteutusta ei tehty ohjeen
mukaan; tämä on se mittaus, jonka perusteella Fable voi päättää erillisen erän.
