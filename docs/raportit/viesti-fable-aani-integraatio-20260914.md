# Viesti Fablelle: Horatio–Livia-Eurooppa-paketin ääni-integraatio 14.9.2026

Opus-työagentti. Haara `claude/bold-ride-vow4ki-aani-integraatio`, pohja
`origin/main` + merge `origin/codex/europe-audio-20260914-r2` (konflikteitta).
Omistajan päätös 14.9.2026 klo 17.10 UTC: *"Integroi 80 nyt, loput myöhemmin."*

## Tilanne yhdellä rivillä

**80 luentaa (Horatio 40 + Livia city-3 40) on nyt pelin datassa** versionoiduissa
tuotantoavaimissa. **Viisi kaupunkia** — sisilia, islanti, alpit, lappi, tromssa —
pysyy vanhassa tekstissä JA vanhassa äänessä erän 5 ajoon asti. **Kohdistusta ei
ole ajettu**, eikä sitä tarvinnut tyhjentää: peli putoaa itsestään hiljaisuuteen,
koska kohdistus on kryptografisesti sidottu juuri siihen mp3:een ja tekstiin.
Kaikki neljä porttia vihreinä, savuke 34/34 vastakokeineen.

## 1. Kartoitus: missä ääni-URLit ja digestit asuvat

| paikka | mitä | muutettu |
|---|---|---|
| `js/media.js` `HORATIO_TUOTANTO` | Horation versionoitu polku + kuitin kesto | **40 riviä** (5 ennallaan) |
| `js/liviapuhe.js` `LIVIAN_VERSIOIDUT_AANET` | Livian city-3 versionoitu polku | **40 riviä** (5 ennallaan) |
| `js/liviapuhe.js` `LIVIAN_KESTOT` | kuitin mitattu kesto | **40 arvoa** |
| `js/liviapuhe.js` `LIVIAN_AANITETYT` | näkyvän tekstin FNV-tiiviste | **40 arvoa** |
| `js/livia-pilotti-cuet.js` | cue-sopimus + `tekstiSha256` | Codexin 40 uutta voimaan, **5 palautettu mainin arvoihin** |
| `tests/horatio-runtime-audio.test.mjs` | kuittipeili | **40 riviä** |
| `js/media.js` `UUSITUT_AANET` | kyselyversio `?v=` | **ei muutettu, perustelu alla** |

### Onko olemassa "julkaise live" -toimintoa? Ei ole — ja se on tarkoitus.

Mitattu: `generoi-luennat.yml`:n `toiminto` on `generoi | kohdista | sido`; live-
vientiä ei ole. Jokaisen kuitin `objectKeys.live` on `null` ja Livian kuitissa
`promotionStatus` on **`pending-code-deploy`**. Julkaisu live-avaimeen EI siis ole
erillinen vaihe, vaan **julkaisu on juuri nämä kaksi taulukkoa**. Siksi data
osoittaa suoraan versionoituihin final-avaimiin, eikä yhtään maksullista tai
kiintiötä kuluttavaa ajoa käynnistetty.

**Siksi myöskään `UUSITUT_AANET`-kyselyversiota ei nostettu:** `aaniUrl()` palauttaa
versionoidun polun ilman `?v=`-osaa, ja versionoitu polku on itsessään
välimuistimurtaja. Kyselyversion nosto olisi kuollut kirjain.

### Kuitit (9 kpl, kaikki `completed`)

Horatio: `horatio-9c5b6e4dd75608cdbe8e`, `-91c7e2c997078439dee1`,
`-623e51c1cd57ec159a43`, `-1c804d7ab293dc259dae`.
Livia: `pulu-b3a8d61baa0c4dd24123` (7 kpl), `pulu-3388cdde59d36a971f1a` (erän 1
uusinta, 3 kpl), `pulu-415d0075be837be8c5bd`, `pulu-85a34cad2355457c7e9b`,
`pulu-0090303ae274b1313286`. Erän 1 Livia on kahdessa kuitissa, kuten raportoitu.

### Tekstidigestit: 80/80 täsmää

Mitattu laskemalla SHA-256 pelin omista teksteistä ja vertaamalla kuittiin:

- Horatio 40/40: `matkakirja.teksti` = kuitin `visibleText.sha256`, ja
  `matkakirja.luenta + ' <break time="1.0s" />'` = kuitin `ttsText.sha256`.
- Livia 40/40: `pollo.kommentti[0]` = kuitin `visibleTextSha256` = runtimen
  `LIVIAN_LUENTA_CUET[kaupunki].tekstiSha256`.

**Peli ja äänite puhuvat siis sanasta sanaan samaa tekstiä kaikissa 40:ssä.**

### Saatavuus: 80/80 HTTP 200

Jokaiselle 80 final-avaimelle HEAD → 200. Lisäksi ladattujen tiedostojen
SHA-256 ja tavumäärä vastaavat kuittia **80/80** (ks. kestotaulukko).

## 2. Viisi kaupunkia: mitä palautettiin

Erä 5 (sisilia, islanti, alpit, lappi, tromssa) kaatui ElevenLabsin kiintiöön,
joten niille ei ole 14.9. tekstin mukaista ääntä. Teksti ja ääni on pidettävä
samassa polvessa, tai ankkurit osuisivat eri lauseeseen.

**Palautettu `origin/main`-versioon:**

1. `js/packs/fokusvirta-{sisilia,islanti,alpit,lappi,tromssa}.js` kokonaan
   (`git checkout origin/main --`): `matkakirja.teksti`, `matkakirja.luenta`,
   `matkakirja.reaktiot` ja `pollo.kommentti`.
2. `js/livia-pilotti-cuet.js`: näiden viiden cue-sopimus — `revision`,
   `tekstiSha256` ja `cuet` — uudessa `ERA5_ODOTTAA`-lohkossa, joka kerrostuu
   Codexin generoidun taulun päälle. Tarkistettu koneellisesti: entry on
   `JSON.stringify`-tasolla **identtinen mainin kanssa kaikilla viidellä**.
3. `js/media.js` ja `js/liviapuhe.js`: näiden viiden ääni-, kesto- ja
   tiivisterivejä ei koskettu.
4. `tools/generoi-pulu.mjs`: näiden viiden **tagiresepti luetaan 13.9.
   manifestista**, koska 14.9. tagiankkuri ei esiinny 13.9. tekstissä ja ajo
   kaatuisi. Muut 40 tulevat 14.9. manifestista.

Merkintä odottamisesta on kolmessa paikassa: uusi export
`ERA5_ODOTTAVAT_KAUPUNGIT` (`js/livia-pilotti-cuet.js`) sekä perustelukommentit
`js/media.js`:ssä ja `js/liviapuhe.js`:ssä, kussakin ohje "kun erä 5 on ajettu".

**Mitattu, että viisikko on ehjä:** kaikilla viidellä Horatio-mp3 200,
`.aikaleimat.json` 200, Livia-mp3 200 ja `.eleet.json` 200 — eli vanha teksti,
vanha ääni ja vanha kohdistus ovat yhä sama nelikko.

## 3. Kohdistus: mitattu käytös ja valittu fallback

**Kysymys:** käyttääkö peli vanhaa cue-dataa väärällä ajoituksella?

**Mittaus 1 — sivutiedostot puuttuvat.** Kohdistustiedoston osoite johdetaan
soivan äänen osoitteesta (`.mp3` → `.aikaleimat.json` / `.eleet.json`). Kaikille
80 uudelle versionoidulle avaimelle: **80/80 → HTTP 404.** Vanha kohdistus asuu
vanhan avaimen vieressä, johon data ei enää osoita. Se on siis jo poissa tieltä
— **mitään ei tarvinnut tyhjentää.**

**Mittaus 2 — vaikka tiedosto olisi, se hylätään.** Molemmat lataajat validoivat
tiedoston soivaa äänitettä vasten: `js/luentareaktiot.js` `tarkistaAikaleimat`
vaatii `data.teksti` merkilleen samaksi, `tekstiSha256`:n täsmäävän ja
`aani.sha256`:n vastaavan ladattua mp3:a; `js/livia-puheeleet-lataus.js`
`tarkistaLivianPilottiData` vaatii lisäksi revision, avaimen, cue-listan ja
mp3:n tavumäärän. Mikään näistä ei täsmää eri äänitteeseen.

**Vastakoe selaimessa (pakollinen, tehty):** tarjoiltiin Pariisin **vanha**
`livia-pariisi-3.eleet.json` (HTTP 200) uuden äänen viereiseen osoitteeseen.
Tulos: **eleet = null** — data hylättiin, eikä peli kaatunut. Eli vaikka vanha
kohdistus jotenkin päätyisi uuden äänen viereen, eleet eivät laukea.

**Valittu fallback:** hiljaisuus, ja se aktivoituu itsestään. 40 uudessa
kaupungissa Livian puhe-eleet ja Horation ajastetut reaktiot ovat pois päältä,
kunnes kohdistus ajetaan krediittien jälkeen. Viidessä vanhassa ne toimivat
ennallaan. Tämä on sama linjaus kuin moduulissa on kirjoitettuna: *"arvioitu
hetki osuisi väärään sanaan ja pulu nauraisi väärässä kohdassa, mikä on
huonompi kuin hiljaisuus."*

**Kohdistus on siis vielä tekemättä ja ajetaan krediittien jälkeen** (40 kaupunkia
× 2 roolia). Ajopaketin Bergen c4 -ankkurihuomio (`meitä. Meitä!`) koskee juuri
sitä ajoa. Kohdistustyökalun kuiva ajo lukee jo oikein uuden versionoidun
osoitteen (todettu `tests/luentareaktiot.test.mjs`-portissa).

## 4. Testimuutokset — portteja ei poistettu, odotukset päivitettiin

Lähtötilanne mergen jälkeen: 20 fail. Lopputilanne: **0 fail.**

| testi | muutos | perustelu |
|---|---|---|
| `tests/horatio-runtime-audio.test.mjs` | 40 kuittiriviä uusiin final-avaimiin ja kestoihin | Puhdas kuittipeili; 45/45-vaatimus säilyi. |
| `tests/livia-eurooppa-cuet.test.mjs` | Erän 5 viidelle: manifestivertailun tilalle **yhtä tiukka** sidonta pakin omaan tekstiin + vaatimus, ettei revisio saa olla 14.9. | Näillä ei ole 14.9. ääntä. Portti mittaa nyt sitä, mitä kohdistus oikeasti vaatii: cue-SHA = pakin teksti. |
| `tests/horatio-livia-e4.test.mjs` | Sama jako; odottaville `assert.notEqual`-vaatimus, ettei teksti saa olla 14.9. asussa | Portti kaatuu, jos teksti vaihdetaan ilman ääntä — eli vahvempi kuin ennen. |
| `tests/horatio-livia-europe-batches.test.mjs` | Sama jako; odottaville lisäksi vaatimus, että 13.9. tagiresepti vastaa pakin tekstiä | Koonnin oma eheys (sanat, SHA:t, tagit, ankkurit) tarkistetaan yhä kaikille 45:lle. |
| `tests/luentareaktiot.test.mjs` | Marseillen kuiva-ajo-odotus `r6` → luetaan pakin reaktiot ja vaaditaan **tasan** ne | Ajopaketissa ennakoitu vanhentuma; uusi muoto ei vanhene ja kieltää ylimääräiset. |
| `tests/livia-aani.test.mjs` | "mahtuu kuplaansa": **nimetty** 8 repliikin poikkeuslista + uusi kova vaatimus `arvio ≤ 30 s` kaikille + vaatimus, ettei poikkeus saa vanhentua | Ks. alla. |

### Ainoa portti, joka ei voi olla vihreä sellaisenaan — ja miksi se ei heikennä

Omistaja nosti 14.9. repliikin kestokaton 20 s → 30 s (`KESTO_MAX_S`). Hyväksytty
teksti on siksi paikoin pidempi kuin yhden kuplan lukuaika (18 s): mitattuna
**8 repliikkiä 45:stä** ylittää arviolla, suurin arvio 21,5 s eli selvästi katon
alla. **Kupla ei katkaise puhetta** — `js/liviapuhe.js` `livianKuplanAjastin`
odottaa äänen loppuun, ja moduulin oma kommentti sanoo sen suoraan. Ylitys on
tahtikysymys, ei tekninen vika.

Portti ei siis kadonnut: se sai **nimetyn** poikkeuslistan (bukarest-3,
budapest-3, pariisi-3, amsterdam-3, berliini-3, dubrovnik-3, tukholma-3,
kobenhavn-3), kaikille repliikeille **uuden** kovan 30 s katon, ja vaatimuksen,
että vanhentunut poikkeus kaataa testin. Jokainen muu repliikki mitataan yhä
kuplan lukuaikaa vasten.

(Kohdistusdatan olemassaoloon ei tarvinnut sitoa yhtään odotusta: runtime-portit
hoitavat puuttuvan kohdistuksen jo itse hiljaisuutena.)

## 5. Portit

```
npm test                                → # pass 3344  # fail 0
node tools/tarkista-kaksoisavaimet.mjs  → ei kaksoisavaimia
node tools/tarkista-niputus.mjs         → 387 moduulia, ei törmäyksiä
node tools/tarkista-savukkeet.mjs       → 1645 ui-viittausta, 405 metodia
```

## 6. Savuke (Playwright, Chromium) — 34/34

Kaksi uutta kaupunkia (**Pariisi**, **Ateena**) ja yksi vanha (**Alpit**).
Äänet haettiin ämpäristä Noden kautta ja tarjoiltiin selaimelle oikeina tavuina,
eli luenta soi aidosta mp3:sta.

| mitattu | Pariisi | Ateena | Alpit |
|---|---|---|---|
| Horatio-URL = odotettu versionoitu avain | OK (uusi) | OK (uusi) | OK (vanha) |
| Livia-URL = odotettu versionoitu avain | OK (uusi) | OK (uusi) | OK (vanha) |
| luenta käynnistyi, kello juoksee | OK | OK | OK |
| Livian repliikki soi | OK | OK | OK |
| JS-poikkeuksia | 0 | 0 | 0 |
| luenta-/repliikkiäänen latausvirheitä | 0 | 0 | 0 |
| Livian eleet | null (fallback) | null (fallback) | **4 (ennallaan)** |
| ajastetut reaktiot kytkeytyvät | ei (fallback) | ei (fallback) | **kyllä** |

**Vastakoe:** vanha `livia-pariisi-3.eleet.json` tarjoiltiin 200:lla uuden äänen
osoitteeseen → **hylättiin, eleet = null, ei kaatumista**. Lisäksi tarkistettiin,
ettei odotusavain vahingossa hyväksy väärän kaupungin tiedostoa.

Savukeskripti on kertaluontoinen mittaus eikä repossa (ei uutta savukerekisterin
riviä). Se ajetaan uudelleen samalla tavalla kohdistuksen jälkeen.

## 7. Kestomittaus — kuuntelun korvike

Kuuntelu ei ole mahdollinen konttiympäristössä. Sen sijaan kaikki 80 MP3:a
ladattiin ja **dekoodattiin** (`mpg123-decoder`; ffmpeg/ffprobe ei ole
saatavilla). Hiljaisuus mitattiin 20 ms ikkunoissa huippuamplitudista kynnyksellä
−60 dBFS.

**Yhteenveto:**

- **Kesto vs. kuitti: 80/80 toleranssissa.** Suurin poikkeama **0,052 s**
  (raja ±0,1 s). Kaikki mitatut ovat niukasti kuittia lyhyempiä — systemaattinen
  ero dekooderin ja ffprobe-kehyslaskennan välillä, ei sisältöero.
- **Tarkistussumma: 80/80.** Ladatun tiedoston SHA-256 ja tavumäärä vastaavat
  kuitin `finalAudio`/`finalArtifact`-arvoja täsmälleen. Yksikään äänite ei ole
  vaihtunut tai katkennut siirrossa.
- **Alkuhiljaisuus:** suurin **0,20 s** (raja 1,5 s). Ei yhtään poikkeamaa.
- **Loppuhiljaisuus:** suurin **0,32 s** (raja 1,5 s). Ei yhtään poikkeamaa.
- **Pisin tauko keskellä:** suurin **2,06 s** (ohjeraja 2,0 s).
- Yhteiskesto **26,8 min** (Horatio 15,3 min, Livia 11,5 min).

### Poikkeamat omistajan kuunneltavaksi (3 kpl)

Kolmessa Horatio-luennassa pisin tauko keskellä ylittää 2,0 s ohjerajan
hiuksenhienosti. Kaikki muut arvot ovat rajoissa, eikä yhdessäkään ole merkkejä
katkeamisesta.

| kaupunki | rooli | pisin tauko | huomio |
|---|---|---|---|
| lontoo | Horatio | 2,06 s | eleven_v3:n lausetauko |
| tampere | Horatio | 2,02 s | eleven_v3:n lausetauko |
| varsova | Horatio | 2,02 s | eleven_v3:n lausetauko |

Kaikissa kolmessa tauko on lauseiden välissä (esim. Ateenassa mitattiin seitsemän
0,5–1,9 s taukoa, mikä on mallin normaali rytmi), joten kyse on tulkinnan
hitaudesta eikä äänitteen viasta. **Kuuntelutarkistus, tagien ääneenluvun
tarkistus ja tunnekohtien arviointi jäävät yhä Fablen/omistajan QA:han** —
tämä mittaus sulkee pois vain teknisen vian.

### Horatio (40)

| kaupunki | R | kuitti s | mitattu s | ero s | alku s | loppu s | pisin tauko s |
|---|---|---|---|---|---|---|---|
| amsterdam | H | 23.876 | 23.840 | -0.036 | 0.00 | 0.00 | 1.62 |
| ateena | H | 30.929 | 30.880 | -0.049 | 0.06 | 0.00 | 1.94 |
| barcelona | H | 22.047 | 22.000 | -0.047 | 0.10 | 0.00 | 1.64 |
| bergen | H | 23.406 | 23.360 | -0.046 | 0.00 | 0.00 | 1.66 |
| berliini | H | 19.958 | 19.920 | -0.038 | 0.00 | 0.00 | 1.76 |
| budapest | H | 22.674 | 22.640 | -0.034 | 0.08 | 0.00 | 1.74 |
| bukarest | H | 23.719 | 23.680 | -0.039 | 0.04 | 0.00 | 1.74 |
| dublin | H | 22.753 | 22.720 | -0.033 | 0.02 | 0.00 | 1.86 |
| dubrovnik | H | 25.078 | 25.040 | -0.038 | 0.00 | 0.00 | 1.92 |
| edinburgh | H | 22.361 | 22.320 | -0.041 | 0.00 | 0.00 | 1.64 |
| firenze | H | 23.327 | 23.280 | -0.047 | 0.00 | 0.02 | 1.94 |
| granada | H | 22.282 | 22.240 | -0.042 | 0.00 | 0.00 | 1.54 |
| helsinki | H | 23.876 | 23.840 | -0.036 | 0.00 | 0.00 | 1.88 |
| istanbul | H | 21.081 | 21.040 | -0.041 | 0.02 | 0.00 | 2.00 |
| kiova | H | 19.226 | 19.200 | -0.026 | 0.18 | 0.00 | 1.76 |
| kobenhavn | H | 24.921 | 24.880 | -0.041 | 0.00 | 0.00 | 1.58 |
| krakova | H | 21.002 | 20.960 | -0.042 | 0.00 | 0.00 | 1.60 |
| kreeta | H | 17.868 | 17.840 | -0.028 | 0.04 | 0.00 | 1.70 |
| lissabon | H | 22.282 | 22.240 | -0.042 | 0.00 | 0.00 | 1.48 |
| lontoo | H | 31.948 | 31.920 | -0.028 | 0.12 | 0.00 | 2.06 |
| madrid | H | 24.921 | 24.880 | -0.041 | 0.00 | 0.00 | 1.90 |
| marseille | H | 22.518 | 22.480 | -0.038 | 0.04 | 0.00 | 1.96 |
| moskova | H | 25.469 | 25.440 | -0.029 | 0.12 | 0.00 | 2.00 |
| odessa | H | 17.868 | 17.840 | -0.028 | 0.00 | 0.00 | 1.88 |
| oslo | H | 20.036 | 20.000 | -0.036 | 0.00 | 0.00 | 1.64 |
| pariisi | H | 30.354 | 30.320 | -0.034 | 0.06 | 0.00 | 1.58 |
| pietari | H | 18.129 | 18.080 | -0.049 | 0.00 | 0.00 | 1.56 |
| praha | H | 22.988 | 22.960 | -0.028 | 0.10 | 0.00 | 1.78 |
| riika | H | 23.719 | 23.680 | -0.039 | 0.12 | 0.00 | 1.46 |
| rooma | H | 20.846 | 20.800 | -0.046 | 0.00 | 0.00 | 1.66 |
| sarajevo | H | 20.036 | 20.000 | -0.036 | 0.00 | 0.00 | 1.62 |
| sevilla | H | 24.529 | 24.480 | -0.049 | 0.00 | 0.00 | 1.94 |
| sofia | H | 18.599 | 18.560 | -0.039 | 0.12 | 0.00 | 1.58 |
| tallinna | H | 20.036 | 20.000 | -0.036 | 0.00 | 0.00 | 1.78 |
| tampere | H | 24.451 | 24.400 | -0.051 | 0.00 | 0.00 | 2.02 |
| tukholma | H | 19.487 | 19.440 | -0.047 | 0.00 | 0.00 | 1.78 |
| varsova | H | 31.556 | 31.520 | -0.036 | 0.00 | 0.00 | 2.02 |
| venetsia | H | 23.327 | 23.280 | -0.047 | 0.08 | 0.00 | 1.76 |
| vilna | H | 22.282 | 22.240 | -0.042 | 0.04 | 0.00 | 1.86 |
| wien | H | 24.529 | 24.480 | -0.049 | 0.00 | 0.00 | 1.62 |

### Livia city-3 (40)

| kaupunki | R | kuitti s | mitattu s | ero s | alku s | loppu s | pisin tauko s |
|---|---|---|---|---|---|---|---|
| amsterdam-3 | L | 23.432 | 23.406 | -0.026 | 0.00 | 0.16 | 1.22 |
| ateena-3 | L | 18.416 | 18.389 | -0.027 | 0.08 | 0.16 | 1.32 |
| barcelona-3 | L | 14.341 | 14.308 | -0.033 | 0.00 | 0.16 | 1.44 |
| bergen-3 | L | 21.133 | 21.088 | -0.045 | 0.00 | 0.16 | 1.52 |
| berliini-3 | L | 20.428 | 20.399 | -0.029 | 0.00 | 0.14 | 1.44 |
| budapest-3 | L | 21.394 | 21.350 | -0.044 | 0.20 | 0.16 | 1.40 |
| bukarest-3 | L | 24.503 | 24.470 | -0.033 | 0.00 | 0.16 | 1.72 |
| dublin-3 | L | 16.588 | 16.550 | -0.038 | 0.00 | 0.16 | 1.64 |
| dubrovnik-3 | L | 26.096 | 26.070 | -0.026 | 0.02 | 0.16 | 1.64 |
| edinburgh-3 | L | 17.554 | 17.519 | -0.035 | 0.00 | 0.14 | 1.66 |
| firenze-3 | L | 15.073 | 15.029 | -0.044 | 0.18 | 0.16 | 1.42 |
| granada-3 | L | 17.215 | 17.174 | -0.041 | 0.04 | 0.14 | 1.32 |
| helsinki-3 | L | 12.669 | 12.630 | -0.039 | 0.18 | 0.16 | 1.04 |
| istanbul-3 | L | 13.793 | 13.745 | -0.048 | 0.00 | 0.22 | 1.36 |
| kiova-3 | L | 13.558 | 13.509 | -0.049 | 0.00 | 0.16 | 1.70 |
| kobenhavn-3 | L | 23.144 | 23.104 | -0.040 | 0.00 | 0.16 | 1.56 |
| krakova-3 | L | 19.670 | 19.634 | -0.036 | 0.00 | 0.14 | 1.52 |
| kreeta-3 | L | 16.588 | 16.550 | -0.038 | 0.00 | 0.16 | 1.58 |
| lissabon-3 | L | 17.084 | 17.055 | -0.029 | 0.00 | 0.16 | 1.34 |
| lontoo-3 | L | 13.375 | 13.342 | -0.033 | 0.00 | 0.16 | 1.22 |
| madrid-3 | L | 18.469 | 18.428 | -0.041 | 0.00 | 0.16 | 1.24 |
| marseille-3 | L | 17.789 | 17.750 | -0.039 | 0.08 | 0.16 | 1.32 |
| moskova-3 | L | 12.147 | 12.108 | -0.039 | 0.00 | 0.16 | 1.14 |
| odessa-3 | L | 16.562 | 16.522 | -0.040 | 0.00 | 0.16 | 1.66 |
| oslo-3 | L | 16.327 | 16.288 | -0.039 | 0.00 | 0.32 | 1.48 |
| pariisi-3 | L | 25.731 | 25.679 | -0.052 | 0.00 | 0.14 | 1.44 |
| pietari-3 | L | 12.173 | 12.128 | -0.045 | 0.00 | 0.16 | 1.76 |
| praha-3 | L | 14.498 | 14.470 | -0.028 | 0.00 | 0.16 | 1.32 |
| riika-3 | L | 11.912 | 11.874 | -0.038 | 0.00 | 0.16 | 1.22 |
| rooma-3 | L | 17.659 | 17.616 | -0.043 | 0.00 | 0.14 | 1.52 |
| sarajevo-3 | L | 13.296 | 13.248 | -0.048 | 0.00 | 0.18 | 1.24 |
| sevilla-3 | L | 13.845 | 13.801 | -0.044 | 0.00 | 0.16 | 1.24 |
| sofia-3 | L | 12.016 | 11.973 | -0.043 | 0.00 | 0.16 | 1.16 |
| tallinna-3 | L | 15.517 | 15.471 | -0.046 | 0.00 | 0.14 | 1.28 |
| tampere-3 | L | 16.588 | 16.551 | -0.037 | 0.00 | 0.16 | 1.46 |
| tukholma-3 | L | 23.144 | 23.116 | -0.028 | 0.00 | 0.14 | 1.38 |
| varsova-3 | L | 18.260 | 18.229 | -0.031 | 0.08 | 0.16 | 1.66 |
| venetsia-3 | L | 19.043 | 18.998 | -0.045 | 0.02 | 0.14 | 1.18 |
| vilna-3 | L | 17.554 | 17.510 | -0.044 | 0.14 | 0.16 | 1.28 |
| wien-3 | L | 13.035 | 12.998 | -0.037 | 0.00 | 0.14 | 0.72 |

## 8. Mitä ei tehty

Ei ElevenLabs-kutsuja, ei workflow-ajoja, ei krediittien ostoa. Ei tekstien
muokkausta (ainoa tekstimuutos on viiden kaupungin palautus mainin versioon).
Ei Raamattu-muutoksia, ei versionostoa (`tools/uusi-versio.mjs` ajamatta), ei
muutoslokiriviä, ei mergeä, ei `dist/`-kansiota, ei mediatiedostoja repoon,
ei avaimia lokiin. Ei koskettu `js/pallolauta/*`-, `js/kaupunkinosto.js`-,
laattageneraattori- tai CSS:n rajaväri-tiedostoihin.

**Sofia city-4…13 ja muut ääniroolit säilyivät** — muutokset koskivat vain 40
Horatio-kaupunkiluentaa ja 40 Livian `-3`-repliikkiä.

## 9. Mitä seuraavaksi

1. **Erä 5** kahtena eränä (`sisilia,islanti,alpit` ja `lappi,tromssa`), sitten
   näiden viiden tekstit takaisin 14.9. asuun ja `ERA5_ODOTTAA`-lohkot pois
   kolmesta tiedostosta (ohje on kommentissa kussakin).
2. **Kohdistus** 40 kaupungille × 2 roolia completed-kuiteista ja niiden
   versionoiduista MP3:ista — vasta se herättää eleet ja ajastetut reaktiot.
   Bergen c4 -ankkuri `meitä. Meitä!`.
3. **Kuuntelu**: edustava H/L-otos, tagien ääneenluku, kolme yllä listattua
   taukoa.
