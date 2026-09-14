# Viesti Fablelle: Linssiluennan ja ui:n luentataso Web Audiolla 14.9.2026

Opus-työagentti. Haara `claude/bold-ride-vow4ki-taso-linssit`, pohja
`origin/main` (`4a08a86f`). Kolmas erä samaa iOS-korjausta: #2461 (Livia),
#2466 (Horatio), tämä (linssiluenta + hihkaisu).

## Tilanne yhdellä rivillä

**Mittaus: linssiluennassa ei ole naksahdusta — vika on TASOSSA, ei
häivytyksessä.** Linssiluenta ja hihkaisu ovat soineet iOS:ssä *tiedoston
omalla tasollaan*, koska `audio.volume` ei mene siellä perille, eikä
Lukija-liuku ole tavoittanut niitä lainkaan. Korjattiin vain tason kirjoitus.
Neljä porttia vihreinä, `# fail 0`.

## 1. Mittaus: viimeinen 50 ms ja viimeinen näyte

Kolme linssiluentaa ämpäristä (`aikajana/keksinnot/puhe/`), dekoodattuna
`mpg123-decoder`illa.

| äänite | kesto s | loppu 50 ms RMS | loppu 50 ms huippu | **viimeinen näyte** | loppuhiljaisuus | alkuhiljaisuus | alku 20 ms huippu |
|---|---|---|---|---|---|---|---|
| 1769-james-watt | 7,744 | −∞ dBFS | −∞ dBFS | **0,000000** | 153,2 ms | 6,6 ms | −31,8 dBFS |
| 1783-joseph-montgolfier | 7,670 | −∞ dBFS | −∞ dBFS | **0,000000** | 150,9 ms | 2,0 ms | −55,6 dBFS |
| 1796-edward-jenner | 7,524 | −∞ dBFS | −∞ dBFS | **0,000000** | 163,9 ms | 1,6 ms | −36,4 dBFS |

**Vastaus: EI NAKSAHDUSTA.** Viimeinen näyte on tasan nolla, viimeiset 50 ms
digitaalista hiljaisuutta ja loppuhiljaisuutta on 0,15 s. Linssiluenta
käyttäytyy siis **kuin Livian repliikit**, ei kuin kertojan matkakirjaluenta
(jonka loppuhiljaisuus mitattiin 0,0 ms:ksi ja viimeinen näyte kuuluvalle
tasolle, ks. #2466). Alkukin on puhdas.

**Siksi loppuhäivytystä EI lisätty.** Sitä ei tarvita tiedoston lopussa, eikä
tämä erä muuta luentalogiikkaa — kuten toimeksianto sanoi.

## 2. Mitä siis oli rikki

Sekä `soitaLinssiluenta` (`js/linssipuhe.js`) että `soitaHihkaisu`
(`js/ui.js`) asettivat tasonsa `audio.volume = puheVoima()`. **iOS:n WebKit
ei tottele sitä**: kirjoitus menee läpi ilman virhettä ja lukema palaa
ykköseksi (mittaus ja perustelu `js/musiikkivahvistin.js`, omistajan kaksi
vikailmoitusta 8.9. ja 9.9.2026). Puhelimessa:

- linssiluenta ja hihkaisu ovat soineet **tiedoston omalla tasolla**, eivät
  puheVoiman tasolla — eli kertojan yläpuolella;
- **Lukija-liuku ei ole tavoittanut niitä**: `paivitaLuentojenVoima` kirjoittaa
  samaan volumeen.

Tämä on sama juurisyy kuin taustamusiikin vikailmoituksessa, ja se korjataan
samalla tavalla.

## 3. Toteutus: vain tason kirjoitus

`volumeToimii()`-valinta mittaamalla (koe-elementti, ei user-agent):

| selain | reitti |
|---|---|
| työpöytä, Android | `audio.volume` kuten ennen: ei uusia solmuja, ei crossOriginia, pyyntö tavu tavulta entinen |
| iOS | pelin **oma** äänikonteksti (`sfx.ensureContext`) → `MediaElementAudioSourceNode` → `GainNode`, taso gainiin |

- `js/linssipuhe.js`: uudet viennit `linssiluennanTaso`, `asetaLinssiluennanTaso`;
  uusi sisäinen `linssiluennanSoitin`, joka asettaa `crossOrigin`in **ennen**
  srciä ja **vain** reitittävällä polulla. Reititys puretaan sekä
  `ended`/`error`-poluilla että `pysaytaLinssiluennassa`, jossa kumpikaan
  tapahtuma ei tule.
- `js/ui.js` `soitaHihkaisu`: sama kuvio paikan päällä (yksi kutsupaikka, ei
  uutta apufunktiota) ja `irrotaMusiikinVahvistin` purkuun.

**Vahvistin talletetaan nimellä `luennanVahvistin`** — samalla, jota #2466:n
`js/luenta.js` käyttää. Kun molemmat erät ovat mainissa, Lukija-liu'un kesken
nauhaa tekemä päivitys löytää reititetyn linssiluennan gainin itsestään, eikä
kahta eri nimeä tarvitse sovitella jälkikäteen.

**Ei koskettu `js/linssit.js`:ään** (toisen agentin työn alla: kerrokset ja
äänten pysäytys). Muutokset ovat `js/linssipuhe.js`:ssä ja `js/ui.js`:n
yhdessä metodissa.

## 4. Testit

**Uusi** `tests/linssiluennan-taso.test.mjs` (6 testiä): taso volumeen ilman
vahvistinta ja **vahvistimeen reititettynä, jolloin elementin volume jää
ykköseen**; kirjoitus ei kaadu selaimeen, joka torjuu arvon; **yhtään tason
kirjoitusta ei jäänyt suoraan volumeen** (tasan yksi osuma,
`asetaLinssiluennanTason` varapolku — portin ydin: suoraan volumeen
kirjoittava uusi tasonasetus toimisi työpöydällä ja katoaisi puhelimessa ilman
että mikään kaatuu); `crossOrigin` ennen srciä ja vain reitittävällä polulla
molemmissa tiedostoissa; hihkaisu vie tason vahvistimeen, varapolku on
tallella ja reititys puretaan.

**Päivitetty portti** (yhtä tiukkana): `tests/lukijaliuku.test.mjs` tunnistaa
nyt kolme aloitusmuotoa, jottei uusi reitti pääse puhujakirjanpidon ohi.

## 5. Savuke (Playwright, Chromium /opt/pw-browsers/chromium)

Keksintöluenta `1769-james-watt` oikeasta tuotanto-mp3:sta (7,74 s, tarjoiltu
ämpärin osoitteeseen oikeina tavuina), puheVoima 0,6. Mitattiin **sekä gain
että elementin oma `volume`**, ja kesken nauhan tehtiin tasonmuutos
0,6 → 0,2 — juuri se kirjoitus, joka iOS:llä on kadonnut.

| mitattu | koe (työpöytäpolku) | vastakoe (iOS-reitin jäljitelmä) |
|---|---|---|
| luenta soi, `ended` | kyllä, 7,74 s | kyllä, 7,74 s |
| taso ennen muutosta | 0,6 | 0,6 |
| taso muutoksen jälkeen | **0,2** | **0,2** |
| **elementin oma `volume` muutoksen jälkeen** | 0,2 (seuraa mukana) | **0,6 — ei liiku** |
| taso loppuun asti | 0,2 | 0,2 |
| puhujan rooli vapautui, `ui.linssiluenta` tyhjä | kyllä | kyllä |
| vahvistin purettu | kyllä | kyllä |
| konsolivirheet / JS-poikkeukset | **0** | 0 |

**Vastakokeen merkitys:** kun soittimelle on vahvistin, taso menee **gainiin**
ja elementin oma `volume` ei liiku lainkaan. Juuri se on korjaus: iOS:llä
`volume` on jäädytetty ykköseen, joten ainoa tapa saada taso perille on gain.

Savuke on kertaluontoinen mittaus eikä repossa (sama käytäntö kuin kahdessa
edellisessä erässä); savukerekisteriin ei tullut riviä.

## 6. Portit

```
npm test                                → # tests 3384, # pass 3371, # fail 0
node tools/tarkista-kaksoisavaimet.mjs  → ei kaksoisavaimia
node tools/tarkista-niputus.mjs         → 387 moduulia, ei törmäyksiä
node tools/tarkista-savukkeet.mjs       → 1651 ui-viittausta, 405 metodia
```

## 7. Mitä ei tehty

Ei `js/linssit.js`-muutoksia (toisen agentin alue), ei luentalogiikan muutoksia
(viive, kelaus, puhujakirjanpito, `pysaytaLinssiluenta` ennallaan), ei
loppuhäivytystä (mittaus sanoo, ettei sitä tarvita), ei tiedostojen muokkausta,
ei ElevenLabs-kutsuja, ei Raamattu-muutoksia, ei versionostoa, ei mergeä, ei
`dist/`-kansiota.

## 8. Kirjattavaksi

1. **`pysaytaLinssiluenta` katkaisee ilman häivytystä** (`pause()` +
   `removeAttribute('src')`). Matkakirjaluennalla ja Livialla on molemmilla
   katkaisuhäivytys; linssiluennalla ei. Ei mitattu eikä muutettu tässä
   erässä — omistajan/Fablen päätettäväksi, kuuluuko se lainkaan.
2. **Kolme kopiota samaa kolmen funktion kuviota** on nyt `js/liviapuhe.js`,
   `js/luenta.js` (#2466) ja `js/linssipuhe.js`. Kun molemmat edeltävät PR:t
   ovat mainissa, ne kannattaa koota yhdeksi moduuliksi. Sitä ei tehty nyt,
   koska uusi moduuli vaatisi rivit `sw.js`:n esilatauslistaan ja
   `tools/build-standalone.mjs`:ään — kolme tiedostoa, joita muut agentit
   muokkaavat rinnakkain, eli turha konfliktipinta yhden erän sisällä.
