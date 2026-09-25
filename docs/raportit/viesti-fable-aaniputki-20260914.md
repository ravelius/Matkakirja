# Viesti Fablelle: pulun ääniputken häiriö mitattu ja korjattu 14.9.2026

Opus-työagentti. Haara `claude/bold-ride-vow4ki-aaniputki`, pohja `origin/main`
(`e344d5e7`). Ei yhtään ElevenLabs-kutsua, ei veloittavaa työnkulkuajoa, ei
R2-vientiä, ei mediatiedostoja repoon.

## Lyhyt vastaus

**Häiriön lähde on toinen häviöllinen mp3-sukupolvi.** Livian putki purki
ElevenLabsin valmiin `mp3_44100_128`:n ja koodasi sen **uudelleen samalla
128 kbps:llä** libmp3lamella. Horation putki ei tee tätä lainkaan — ja juuri
Horation äänistä ei ole valitettu. Ero näkyy suoraan tiedostojen omista
tunnisteista, eikä sitä tarvitse päätellä kuulokuvasta.

**Korjaus:** mallin mp3 menee nyt sellaisenaan sekä raaka- että final-avaimeen.
Ei purkua, ei uudelleenkoodausta, ei leikkausta, häivytyksiä, loudnormia,
atempoa eikä kaikua. Todistettu ilmaiseksi: uusi ketju on **bittitarkka**
(sama sha256 sisään ja ulos), vanha ketju tuottaa **−25 dB** virheen.

## 1. Mittausmenetelmä

ffmpeg ja ffprobe **eivät ole kontissa** (`which ffmpeg` → tyhjä), joten koko
analyysi on tehty Node-koodilla dekoodatusta PCM:stä (`mpg123-decoder`) ja
mp3-kehysotsakkeiden suorasta luvusta. Kaskadikokeen koodaus tehtiin
`@breezystack/lamejs`illa (npm:n oma `lamejs` 1.2.0 on rikki:
`ReferenceError: MPEGMode is not defined`).

Aineisto: kuusi Livia city-3 -mp3:a (pariisi, ateena, lontoo, tampere, varsova,
rooma), kolme Horatio-luentaa vertailuksi (pariisi, ateena, lontoo) ja **kaksi
vanhaa 13.9. Livia-mp3:a** (alpit-3, sisilia-3, v2-malli, vanha putki) — kaikki
ladattu ämpäristä raapustuskansioon, ei repoon.

**Huomio ajopakettiin:** toimeksianto oletti, että `generoi-pulu.yml` asentaa
`npm install mpg123-decoder lamejs`. Se ei asenna kumpaakaan — työnkulku asentaa
`ffmpeg`in (rivi 217), ja koko käsittely tehtiin ffmpegillä. Kysymykseen
"uudelleenkoodataanko MP3 lamejs:llä" vastaus on siis: uudelleenkoodattiin
kyllä, mutta **libmp3lamella ffmpegin sisällä**, ei lamejs:llä.

## 2. Ratkaiseva todiste: kooderitunniste tiedostossa

Jokaisen mp3:n ID3-otsakkeesta luetaan sen tehneen ohjelman nimi.

| tiedosto | kooderitunniste | mitä se tarkoittaa |
|---|---|---|
| Horatio ×3 | `Lavf60.16.101` | vain ElevenLabsin oma muksaus — **yksi** koodaus |
| Livia (14.9.) ×6 | `Lavf60.16.100` + **`Lavc60.31`** | myös **meidän** libavcodec-koodaus — **kaksi** koodausta |
| Livia (13.9.) ×2 | `Lavf60.16.100` + **`Lavc60.31`** | sama kaksinkertainen koodaus |

Kaikki yhdeksän ovat muuten identtisiä: 128 kbps, 44 100 Hz, mono, MPEG1 Layer
III, `Info`-tagi (CBR). Ainoa ero on `Lavc`-tunniste, eli meidän oma
uudelleenkoodauksemme. **Vain siinä joukossa, jossa tunniste on, on valitettu.**

## 3. Taulukko: Livia vs Horatio vs vanha Livia

`max Δ` = suurin näytteiden välinen hyppy, `ST-vaihtelu` = lyhyen aikavälin
(400 ms) RMS:n vaihteluväli p10…p95, `tosihuippu` = 4× ylinäytteistetty
huippu, `+1 sukupolvi` = paljonko virhettä yksi ylimääräinen 128 kbps koodaus
lisää signaaliin nähden.

| tiedosto | kesto s | huippu dBFS | tosihuippu dBTP | ≥−2 dB kpl | leikkaus | max Δ | ST-vaihtelu dB | +1 sukupolvi 128k |
|---|---|---|---|---|---|---|---|---|
| H-ateena | 30,88 | −0,67 | −0,66 | 2614 | 0 | 0,252 | 25,7 | −25,9 dB |
| H-lontoo | 31,92 | −0,72 | −0,70 | 1574 | 0 | 0,238 | 25,3 | −26,0 dB |
| H-pariisi | 30,32 | −0,69 | −0,69 | 1552 | 0 | 0,307 | 22,5 | −25,9 dB |
| L-ateena-3 | 18,39 | −1,47 | −1,44 | 139 | 0 | 0,477 | 33,6 | −25,5 dB |
| L-lontoo-3 | 13,34 | −2,58 | −2,58 | 0 | 0 | 0,469 | 13,7 | −25,5 dB |
| L-pariisi-3 | 25,68 | −0,59 | −0,59 | 173 | 0 | 0,778 | 17,2 | −25,3 dB |
| L-rooma-3 | 17,62 | −0,81 | −0,81 | 142 | 0 | 0,672 | 19,2 | −25,1 dB |
| L-tampere-3 | 16,55 | **−0,30** | **−0,30** | 680 | 0 | 0,625 | 14,3 | −25,2 dB |
| L-varsova-3 | 18,23 | −1,22 | −1,21 | 265 | 0 | 0,475 | 21,2 | −25,7 dB |
| OLD-alpit-3 (13.9.) | 13,61 | −1,32 | −1,32 | 27 | 0 | 0,628 | 15,4 | −25,1 dB |
| OLD-sisilia-3 (13.9.) | 12,08 | **+0,03** | **+0,03** | 901 | **1** | 0,526 | 27,6 | −25,4 dB |

Spektri (taso puhekaistaan 300–3000 Hz nähden):

| | 4–8 kHz | 8–12 kHz | 12–16 kHz | 16–20 kHz |
|---|---|---|---|---|
| Horatio (3 kpl) | −24,5…−28,4 dB | −26,6…−30,0 dB | −38,9…−39,3 dB | ≈ −100 dB |
| Livia 14.9. (6 kpl) | −11,6…−15,6 dB | −9,1…−13,7 dB | −16,3…−25,4 dB | ≈ −98 dB |
| Livia 13.9. (2 kpl) | −10,3…−13,4 dB | −9,5…−10,1 dB | −14,6…−22,6 dB | ≈ −97 dB |

### Mitä taulukosta luetaan — ja mitä ei

**Yli 16 kHz on katkaistu kaikilla** (≈ −100 dB), myös Horatiolla. Se on
128 kbps:n normaali alipäästö, ei vika eikä ero.

**Livian kirkkaus ei ole häiriö.** 4–12 kHz alue on Livialla 12–17 dB
voimakkaampi kuin Horatiolla, mutta **vanha 13.9. Livia on täsmälleen yhtä
kirkas**. Kyse on äänestä (Flicker) eikä putkesta. Sama koskee suurempaa
`max Δ`-arvoa: Livialla 0,47–0,78, Horatiolla 0,24–0,31 — mutta vanhalla
Livialla 0,53–0,63, eli sama haarukka. **Yksikään mitattu epäjatkuvuus ei
osunut häivytyksen tai leikkauksen kohdalle** (alku, loppu); suurimmat hypyt
ovat keskellä puhetta, siis konsonanttien transientteja.

**Naksahduksia tai leikkautumista ei ole 14.9. tiedostoissa:** ei yhtään
näytettä ≥ 0 dBFS, ja tosihuippu on kaikilla alle nollan.

**Mutta taso oli menossa sinne.** Viimeistelyn `volume`-vahvistus oli puhdas
lineaarinen vahvistus **ilman rajoitinta**: `loudnorm`in `TP=-2` esiintyi vain
mittausajossa (`-f null -`), eikä sitä koskaan sovellettu. Todiste, että vahvistus
todella ylitti rajan: **vanha `sisilia-3` leikkautuu — tosihuippu +0,03 dBTP ja
yksi näyte täydessä asteikossa**. 14.9. tiedostoista lähimmäksi pääsi
`tampere-3` (−0,30 dBTP, 680 näytettä ≥ −2 dB). Tämä on toinen, pienempi
mekanismi, ja se poistui samalla päätöksellä.

## 4. Häiriön lähde yhdellä lauseella

Ainoa mitattu ero Livian ja Horation putkien välillä on **ylimääräinen
128 kbps mp3-sukupolvi**, jonka Livian viimeistely lisäsi ja jota Horatiolla ei
ole; kaikki muut erot (kirkkaus, transienttien jyrkkyys, kesto) ovat samat myös
vanhassa Livia-äänessä eivätkä siis voi selittää putken vikaa.

**Rehellisyyden nimissä:** uudelleenkoodaus oli mukana myös 13.9. ajoissa. Se ei
ole uusi vika, vaan vanha vika, joka tuli kuuluviin kun kuunneltavaa tuli 40
repliikkiä lisää. Se on silti ainoa ketjun vaihe, joka voi tuottaa juuri
"digitaalisen" kuuloisen artefaktin, ja se on nyt pois.

## 5. Korjaus ja ennen/jälkeen — todistettu ilmaiseksi

Sama syöte, kaksi ketjua. Vanha ketju = dekoodaus + 128 kbps uudelleenkoodaus
(leikkaus, häivytys ja vahvistus jätetty pois, koska ne eivät vaikuta
pakkaukseen). Uusi ketju = kopio.

| syöte | VANHA: virhe | VANHA: sha256 muuttui | UUSI: virhe | UUSI: sha256 |
|---|---|---|---|---|
| ämpärin `livia-ateena-3.mp3` | **−25,5 dB** | kyllä (`4cab3ee…` → `45540e7…`) | **−∞** | **muuttumaton** `4cab3ee…` |
| ämpärin `puhe-fokus-ateena.mp3` | **−25,9 dB** | kyllä (`5ab669b…` → `1d84116…`) | **−∞** | **muuttumaton** `5ab669b…` |
| synteettinen testiääni (sinit 300/1200/5000/9000 Hz + kohina) | **−21,4 dB** | kyllä | **−∞** | **muuttumaton** |

Vertailuluku sille, mikä on "läpinäkyvä": sama yksi sukupolvi **320 kbps**:llä
jää −58,6…−70,8 dB:hen, eli 33–45 dB vaimeammaksi kuin 128 kbps. Uusi ketju on
vielä sitäkin parempi, koska se ei koodaa lainkaan.

## 5b. Ulostulomuoto 128 → 192 kbps

Omistaja päivitti ElevenLabs **Pro** -tasoon 14.9.2026 ja hyväksyi
`mp3_44100_128` → **`mp3_44100_192`** sekä Livialle että Horatiolle seuraavista
ajoista alkaen.

**Miksi tämä on nyt merkityksellinen ja ennen ei ollut.** Kun putki koodasi
uudelleen 128 kbps:llä, korkeampi lähtölaatu olisi hukkunut siihen toiseen
sukupolveen — mittausten mukaan kaskadin virhe (−25 dB) määräytyy viimeisestä,
huonoimmasta koodauksesta. Nyt kun uudelleenkoodaus on poissa, **mallin oma
koodaus on ainoa koodaus**, jonka ääni käy läpi, ja sen bittinopeus vaikuttaa
suoraan lopputulokseen.

| | ennen | nyt |
|---|---|---|
| ElevenLabsin koodaus | 128 kbps | **192 kbps** |
| putken uudelleenkoodaus | 128 kbps | **ei lainkaan** |
| sukupolvia yhteensä | **2** | **1** |

Toteutus: uusi vakio `PULU_ULOSTULOMUOTO` (`tools/generoi-pulu.mjs`) ohjaa sekä
API-kyselyn `output_format`-parametria että kuitin `outputFormat`-kenttää samasta
paikasta, jottei pyyntö ja kuitti voi eriytyä; `OUTPUT_FORMAT`
(`tools/generoi-luennat.mjs`) vastaavasti Horatiolle. Muoto on osa Horation
erätunnusta (`tuotantoEraId`), joten uudet ajot saavat oman tunnuksensa eivätkä
sekoitu vanhoihin.

`kohdista-pulu-eleet.mjs` hyväksyy **molemmat** muodot (`kelpaaUlostulomuoto`) —
vanhan siksi, että niiden 40 jo generoidun äänen kohdistus on yhä ajamatta.
Mikä tahansa muu muoto hylätään, koska kohdistus luottaa 44 100 Hz:iin.

Muut ääniputket (`generoi-tehosteet`, `generoi-musiikki`,
`generoi-siirtymamusiikki`, `generoi-linssiluennat`, `generoi-kaari`,
`generoi-avaus`, `generoi-hihkaisut`, `generoi-kohtaamiset`) **jätettiin
128 kbps:iin**: toimeksianto koski Liviaa ja Horatiota, ja osa niistä on muiden
agenttien aluetta. Niissä muutos kannattaa tehdä samalla kertaa kuin
uudelleenkoodauksen poisto.

**Ateena/Sofia-ajoa ei koskettu** — se lähti liikkeelle 128 kbps:llä ennen tätä
muutosta, ja sen kuitti kertoo sen oikein.

Kuiva-ajo:

```
  ulostulomuoto: mp3_44100_192 (ElevenLabs Pro, omistaja 14.9.2026).
```

### Mitä koodiin muuttui

`tools/generoi-pulu.mjs`, vakio `LIVIA_KASITTELY = false`:

- `viimeistele()` ja `teeKaiku()` ohitetaan; tilalle `copyFileSync(lahde, kohde)`.
- Validointi on enää kesto 0,3–30 s, luettuna `ffprobe`lla — se **vain lukee**
  eikä koske tavuihin. Tasoa ei mitata tavoitetta vasten, koska tasoa ei enää
  korjata.
- `voice_settings` antaa vain `stability: 0.5`; `similarity_boost`, `style` ja
  `use_speaker_boost` jätetään pyynnöstä pois → rajapinnan omat oletukset.
- Ulostulomuoto `mp3_44100_192` (ks. kohta 5b).
- **Malli `eleven_v3`, ääni Flicker, tekstit ja TTS-tagit koskemattomat.**
- Vakio on lippu, joten `tools/generoi-luennat.mjs` (Horatio) ja
  `tools/generoi-tehosteet.mjs` eivät muuttuneet lainkaan.

Suodatinfunktiot (`viimeistelySuodatin`, `kaikuSuodatin`) jätettiin paikalleen
lipun taakse, jotta päätös on peruttavissa yhdellä rivillä ja
`tests/pulun-aanen-nopeus.test.mjs`:n atempo-vartio pysyy voimassa.

## 6. Raakatallennus — omistajan sitova sääntö toteutettuna

Sääntö: jokaisen maksullisen generoinnin raakatuotos viedään **aina** ämpäriin
versionoituun avaimeen **ennen käsittelyä**, kuitti kirjaa avaimen ja sha256:n,
raakaa ei koskaan poisteta eikä ylikirjoiteta, ja ajo joka ei tallenna raakaa on
virheellinen — työkalun pitää **kieltäytyä**, ei jatkaa hiljaa.

### Livia (`tools/generoi-pulu.mjs`)

| vaihe | mitä |
|---|---|
| avain | `aanet/pulu/raaka/<erätunnus>/raaka-<nimi>.mp3` — **eräkohtainen**, ei revisiokohtainen |
| ajoitus | heti `haeApista`n jälkeen, **ennen** käsittelyhaaraa |
| varmistus | `HEAD` julkiseen osoitteeseen; muu kuin 200 **kaataa ajon** |
| kuitti | `rawArtifact.objectKey`, `.url`, `.sha256`, `.bytes`, `.actualDurationSeconds` |
| hylätty äänite | raaka on **silti** viety ja kirjattu — uusi leikkaus onnistuu ilmaiseksi |
| kieltäytyminen | `raakavientiEste()` pysäyttää `--ei-vientia`-ajon **ennen** ensimmäistäkään API-kutsua |
| avaimen turva | kelvoton erätunnus **hylätään**, ei siivota (siivottu tunnus voisi törmätä toisen erän kanssa) |

Lähtötilanne oli, että raaka kirjoitettiin vain `media/pulu-raaka`-kansioon, joka
on `.gitignoressa` ja katoaa Actions-ajon mukana. Kuitissa oli `rawArtifact`,
mutta pelkkä sha256 ilman avainta — eli tieto siitä, että alkuperäinen oli
olemassa, muttei siitä, mistä se löytyy.

### Horatio (`tools/generoi-luennat.mjs` + `generoi-luennat.yml`)

Horation putki ei käsittele ääntä lainkaan (`postprocess.kind === 'none'`), joten
raaka ja final ovat sama tavujono ja sama sha256. Se **ei silti riittänyt**:
raa'alla ei ollut omaa avainta, ja jos käsittely joskus lisättäisiin, final
lakkaisi olemasta alkuperäinen huomaamatta.

- `tuotantoAvaimet` sai avaimen `raw: audio/raw/horatio/<erä>/<nimi>` —
  eräkohtaisen, jotta uusi koodideploy ei siirrä alkuperäistä muualle.
- `kuittirivi`n `rawAudio` ja `finalAudio` saivat `objectKey`-kentän.
- Työnkulku **kieltäytyy viemästä mitään**, jos yhdeltäkin onnistuneelta riviltä
  puuttuu `objectKeys.raw` tai `rawAudio.sha256` (`process.exit(3)`), ja kopioi
  raa'an **ensimmäisenä**, ennen staging- ja final-avaimia.

### Muut ääniputket: tarkistettu

| työkalu | tilanne |
|---|---|
| `generoi-tehosteet.mjs` | **sama puute**, ei korjattu tässä erässä — ks. kohta 8 |
| `generoi-linssiluennat.mjs`, `generoi-siirtymamusiikki.mjs`, `generoi-musiikki.mjs`, `generoi-hihkaisut.mjs`, `generoi-avaus.mjs` | tarkistettavina samalla säännöllä; eivät kuulu tämän erän alueeseen, jotta rinnakkaiset agentit eivät törmää |

### Kuiva-ajo todisteeksi

```
$ node tools/generoi-pulu.mjs --kuiva --repliikit ateena-3,sofia-3
KUIVA AJO (--kuiva) — APIa ei kutsuta, ämpäriin ei viedä. 2 repliikkiä, malli eleven_v3, tempo 1.
  voice_settings: stability 0.5 — similarity_boost, style ja use_speaker_boost jätetään pois
    (ElevenLabsin omat oletukset, omistaja 14.9.2026).
  jälkikäsittely: EI MITÄÄN — mallin mp3 sellaisenaan, sama sha256 raaka- ja final-avaimessa.
  raakatuotokset menisivät avaimeen aanet/pulu/raaka/pulu-9754e721b5a05785d624/ :
    aanet/pulu/raaka/pulu-9754e721b5a05785d624/raaka-livia-ateena-3.mp3
    aanet/pulu/raaka/pulu-9754e721b5a05785d624/raaka-livia-sofia-3.mp3
  raakavienti on pakollinen: --ei-vientia kaataa maksullisen ajon.
```

Tagit ja tekstit tulostuvat ennallaan (`[curious] … [mischievously] … [softly]`),
tiivisteet `572e0e85` ja `83dd2f15` ovat samat kuin ennen muutosta.

## 7. Testit

**Uusi `tests/pulun-aaniputki.test.mjs`, 9 vartiota:**

| vartio | mitä kaataa |
|---|---|
| kieltäytyy ilman raakavientiä | jos `--ei-vientia` pääsisi generoimaan |
| vienti päällä ja kuiva saavat jatkaa | jos portti olisi liian tiukka |
| raaka-avain eräkohtainen | jos kaksi erää voisi ylikirjoittaa toistensa raa'at |
| raaka ennen käsittelyä | jos vienti siirtyisi käsittelyn jälkeen |
| kuitissa objectKey, molemmissa haaroissa | jos hylätyn äänitteen raaka jäisi kirjaamatta |
| `LIVIA_KASITTELY === false` | jos käsittely palaisi |
| kopio, ei uudelleenkoodausta | jos kopiohaaraan lipsahtaisi ffmpeg |
| ei kaikuversiota | jos kaiku palaisi |
| `voice_settings` vain stability | jos style/similarity/boost palaisivat |
| malli, ääni ja tagit ennallaan | jos v3, Flicker tai tagit vaihtuisivat |
| molemmat äänet pyytävät 192 kbps | jos muoto jäisi 128:aan tai pyyntö ja kuitti eriytyisivät |
| kohdistus hyväksyy uuden ja vanhan muodon | jos vanha 128 kbps hylättäisiin (40 kohdistusta kaatuisi) tai portti löystyisi mihin tahansa muotoon |

**Muutetut odotukset — mitään vartiota ei poistettu:**

| testi | muutos | miksi |
|---|---|---|
| `tests/livia-aani.test.mjs` | `u.postprocess.tempo === 1.08` → `deepEqual(u.postprocess, { kind: 'none' })`, ja uudet vaatimukset `settings.similarityBoost/style/useSpeakerBoost === null` | Kuitti ei saa valehdella siitä, mitä rajapinnalle lähetetään. Vaatimuksia tuli **lisää**, ei vähemmän. |
| `tests/generoi-luennat.test.mjs` | `objectKeys` sai `raw`-avaimen, `rawAudio`/`finalAudio` `objectKey`-kentän; **uusi testi** "Horation vienti kieltäytyy ilman raaka-avainta" lukee työnkulun | Raakasääntö Horatiolle. |
| `tests/livia-aani.test.mjs`, `tests/generoi-luennat.test.mjs` | `outputFormat` 128 → 192 | Omistajan Pro-päätös 14.9.2026. |
| `tools/kohdista-pulu-eleet.mjs` | kaksi lukittua sointireseptiä yhden sijaan (`kelpaaSointiresepti`) ja kaksi lukittua ulostulomuotoa (`kelpaaUlostulomuoto`) | Niiden 40 jo generoidun äänen kohdistus on **yhä ajamatta**; vanha resepti on pidettävä voimassa tai kohdistus kaatuisi. Portti ei löystynyt: `stability 0.5` vaaditaan yhä, ja muu yhdistelmä hylätään. |

`tests/pulu-tehosteet.test.mjs` ja `tests/pulun-aanen-nopeus.test.mjs` **eivät
tarvinneet muutosta**: edellinen ei koske Livian viimeistelyketjuun, ja
jälkimmäinen testaa `viimeistelySuodatin`-funktiota, joka on yhä olemassa ja
ennallaan lipun takana.

## 8. Portit

```
npm test                                → # pass 3360  # fail 1 (ks. alla)
node tools/tarkista-kaksoisavaimet.mjs  → ei kaksoisavaimia
node tools/tarkista-niputus.mjs         → 387 moduulia, 4221 julistusta, ei törmäyksiä
node tools/tarkista-savukkeet.mjs       → ks. alla
```

**Ainoa fail on `tests/pollo.test.mjs`:n KUORMAVARTIO** "indeksi rakentuu ja on
kokoluokaltaan järkevä" (`indeksointi kesti 2954 ms`). Se on ajastusraja
kuormitetussa kontissa, ei tämän erän muutos:

- **Yksin ajettuna sama tiedosto on 124/124 vihreä** — todennettu kahdesti.
- Yhdessä välissä koko sarja meni läpi **3372/0**, samalla koodilla.
- Muutos ei koske `js/pallolauta/*`:aa, `js/kaupunkinosto.js`:ää eikä
  indeksointia lainkaan; kaikki muutetut tiedostot ovat ääniputkessa.

Kirjattu ajopaketin ohjeen mukaan (kuormavartiot saa kirjata).

**Kaikki 16 työnkulkua tarkistettu `yaml.safe_load`illa.** Tämä tuli tarpeeseen:
ensimmäisessä checkpointissa lisäsin step-nimen, jossa oli lainaamaton `": "`,
jolloin koko `generoi-pulu.yml` ei jäsentynyt ja GitHub vastasi dispatchiin
"Workflow does not have 'workflow_dispatch' trigger". Korjattu commitissa
`fd6db48f`; molemmissa ääniajoissa `workflow_dispatch` on nyt näkyvissä.

## 9. Mitä uusintageneroituinti vaatii

| erä | mitä | krediitit |
|---|---|---|
| **Livia city-3, 40 kpl** | uusiksi korjatulla putkella **192 kbps**:llä; tekstit ja tagit ennallaan, joten cue-sopimusten `tekstiSha256` **ei muutu** — mutta `finalArtifact.sha256` ja `LIVIAN_KESTOT` muuttuvat, ja `js/liviapuhe.js`:n versionoidut polut on päivitettävä | 40 repliikkiä, n. 700 merkkiä/repliikki |
| **Erä 5, 5 kaupunkia** | sisilia, islanti, alpit, lappi, tromssa — yhä 13.9. tekstissä ja äänessä; nämä saavat suoraan korjatun putken | 5 repliikkiä + 5 Horatio-luentaa |
| **Kohdistukset** | 40 kaupunkia × 2 roolia. **Tämä on pakko ajaa uudelleen joka tapauksessa**, koska kohdistus on kryptografisesti sidottu juuri siihen mp3:een: uusi tavujono = uusi sha256 = vanha kohdistus hylätään | ei ElevenLabs-krediittejä (forced alignment), mutta ajoaikaa |

**Järjestys on sitova:** ensin Livian 40 uusiksi, vasta sitten kohdistukset —
päinvastaisessa järjestyksessä kohdistustyö menisi hukkaan. Horation 40 luentaa
**eivät vaadi uusintaa häiriön takia**: ne eivät koskaan kulkeneet
uudelleenkoodauksen läpi. 192 kbps koskee niitäkin vasta seuraavista ajoista,
eli erästä 5 eteenpäin — vanhoja ei kannata ajaa uusiksi pelkän bittinopeuden
vuoksi.

**Krediittien käytön voi puolittaa,** jos raakatiedostot olisivat tallessa —
niitä ei ole niiltä 40:ltä, koska sääntö tuli voimaan vasta nyt. Tästä eteenpäin
jokainen leikkaus- tai tasopäätös voidaan tehdä uudelleen ilmaiseksi raa'asta.

## 10. Mitä ei tehty

Ei ElevenLabs-kutsuja, ei veloittavia työnkulkuajoja, ei R2-vientiä, ei tekstien,
tagien, mallin, äänen tai vakauden muutoksia, ei pelin datan muutoksia, ei
Raamattuun kirjoittamista, ei versionostoa, ei mergeä, ei `dist/`-kansiota, ei
mediatiedostoja repoon (ladatut mp3:t ovat raapustuskansiossa), ei avaimia lokiin.
Ei koskettu `js/pallolauta/*`:aan, CSS:ään, fokusvirtaan, `pollo.js`:n sijoitukseen
eikä nostodataan.

**Jäi tekemättä, tietoisesti:** `tools/generoi-tehosteet.mjs`:ssä on sama
raakavientipuute (se kirjoittaa raa'an vain `media/tehosteet-raaka`-kansioon) ja
sama kaksinkertainen koodaus (`libmp3lame` `-b:a 128k`, rivit 294 ja 346). Tehosteet
eivät ole tämän erän alueella, ja niiden tasotavoite on eri (−30 LUFS, oikea
normalisointi lyhyille tehosteille), joten korjaus vaatii oman päätöksensä
omistajalta: **säilytetäänkö tehosteiden normalisointi ja nostetaanko vain
bittinopeus, vai jätetäänkö nekin koskematta?** Suositus mittausten perusteella:
tehosteille normalisointi kannattaa pitää (ne tulevat eri lähteistä eri tasoissa),
mutta koodaus pitäisi tehdä **320 kbps**:llä — se veisi virheen −25 dB:stä
−59 dB:hen eli kuulumattomiin.
