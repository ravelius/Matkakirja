# Horatio–Livia Eurooppa-pilotti — tekninen RC-tila 12.9.2026

## Tila

**Hyväksytty r2-teksti on koottu RC:hen ja Livian ääni on lukittu, mutta
maksullisen audioajon portti on HOLD.** Tämä haara ei ole julkaisupyyntö.
Maksullisia ääniajoja, R2-vientiä, mergeä tai julkaisua ei ole valtuutettu
eikä tehty.

- RC-haara: `codex/horatio-livia-rc-20260912`
- pohja: `86038bcc` (`v1816`)
- sisältörevision tunnus: `eu-hl-pilot-20260913-r2-approved1`
- kaupungit: Marseille, Ateena, Sarajevo ja Venetsia
- hyväksytty tekstilähde: PR #2325, commit
  `b874501bdfdd4faa63d89b191704244f71c2045c`, puu
  `1d8bf04eb8c533cb48dc0a55358af9d55b85e350`
- ilme-, ele- ja ohjainlähde: `f2ee37b1`, koontipuun vastaava commit
  `7958bfb0`

## Lukittu Livian/Pulun ääni

- nimi: `flicker - cheerful fairy & sparkly sweetness`
- ElevenLabs voice_id: `piI8Kku0DcvcL6TTSeQt`
- model_id: `eleven_v3`
- stability: Natural / `0.5`

Nämä ovat rajatun pilotin aktiivisen ajopaketin sekä
`tools/generoi-pulu.mjs`-työkalun ja
`.github/workflows/generoi-pulu.yml`-työn pysyvät oletukset. Aiempi Dr. Von /
v2 säilyy historiassa ja vanhoissa tuotantoäänissä, mutta ei ohjaa uusia
Pulu-ajoja. V3-tagit lisätään vain TTS-syötteeseen; näkyvät kuplatekstit eivät
muutu.

Julkaisun v1819 69 kanonista Flicker-ääntä ovat eri kokonaisuus kuin tämä
neljän kaupungin hyväksytty r2-pilotti. Ne eivät todista, että pilotin neljä
uutta city-3-äänitettä tai niiden kohdistukset olisi tuotettu.

## Mukana oleva kuva

Marseillen hyväksytty P2 on liitetty pakettiin. Vanha P1 säilyy.

- URL: `https://media.matkakirja.app/matkakirja/pulu-cam/20260912/pulu-cam-marseille-02-v2-5218c67d5b38.jpg`
- SHA-256: `5218c67d5b3868d83854107900a88da7acd1597efc8d035a52401255daf52464`
- 1536 × 1024, 890920 tavua, `image/jpeg`, sRGB

Kuva on julkaistu ja objektin readback on tarkistettu. Pelikoodin julkaisu ja
kuvan tarkistus julkaistussa kaupunkitilassa ovat silti vielä tekemättä.

## Livian eleiden tekninen sopimus

`js/livia-pilotti-cuet.js` sitoo pilotin cue-ID:t hyväksyttyihin näkyviin
teksteihin. `tools/kohdista-pulu-eleet.mjs` ei generoi ääntä: se tarkistaa
ankkurit, kohdistaa valmiit mp3:t ElevenLabsin forced alignmentilla ja
kirjoittaa `.eleet.json`-tiedostot. Runtime hyväksyy tiedoston vain, kun
revision, näkyvä teksti ja sen SHA-256 sekä soivan mp3:n nimi, tavumäärä ja
SHA-256 täsmäävät.

Offline-portti:

```sh
node tools/kohdista-pulu-eleet.mjs --kuiva
```

Nykyinen tulos ennen ääntä: `4/4 kaupunkia kunnossa`, ankkurit
`4/4, 4/4, 4/4, 6/6`. Kuiva ajo ei käytä verkkoa, avainta eikä kirjoita
tiedostoja.

Kun tekstit on hyväksytty ja omistaja on erikseen valtuuttanut maksullisen
ajon, TTS-ajopaketti antaa lukitun generointikomennon. Kohdistus tehdään vasta
hyväksytyille lopullisille mp3-tiedostoille:

```sh
ELEVEN_API_KEY=<secret> node tools/kohdista-pulu-eleet.mjs
```

Tämä kirjoittaa paikalliset tiedostot `assets/aikaleimat/livia-<kaupunki>-3.eleet.json`.
R2-vienti vaatii erikseen `--vie`-lipun ja R2-tunnukset. Salaisuuksia ei
tallenneta repoon.

## Jäljellä olevat pakolliset portit

1. Rajatulle neljän kaupungin Horatio- ja Livia-ajolle pyydetään erillinen
   maksullisen ajon lupa.
2. Valmiit äänet kuunnellaan kokonaan; SHA-256 ja tavumäärä kirjataan.
3. Horatio kohdistetaan uudelleen ja Livian neljä `.eleet.json`-tiedostoa
   tuotetaan lopullisista mp3-tiedostoista.
4. Ääniversiot ja `LIVIAN_AANITETYT` päivitetään vasta hyväksyttyihin
   tuotoksiin.
5. Koko testisarja ja CI ajetaan vihreäksi.
6. Merge ja julkaisu tehdään vasta erillisellä hyväksynnällä.
7. Julkaistulla `https://matkakirja.app`-originilla tarkistetaan jokaisen
   kaupungin tarkka tila: puhe, pause/resume, seek, nopeus, loppu, ohitus,
   keskeytys, hiljainen fallback, chat, lehdet ja kartalle paluu. Safari/
   asennettu sovellus on omistajan lopullinen katselmuspinta.

Rajatussa neljän kaupungin kuuntelussa tarkistetaan lisäksi, etteivät tagit
kuulu sanoina, sanat vastaavat kuplaa, alkuun ei synny kaikua, Sarajevo pysyy
hillittynä, Venetsian kuiskaus on ymmärrettävä, Marseille/Ateena eivät
kiirehdi loppua ja jokainen tiedosto jää alle 20 sekunnin.

## Tämän RC:n tarkoituksellinen ääni-HOLD

Ennen uusia ääniä vartioiden pitää näyttää neljä pilotin city-3-repliikkiä
muuttuneina ja estää niiden vanhojen äänten sekä kohdistusten käyttö. Tämä on
nyt vihreäksi testattu odotettu tila, ei hyväksytty testirikko:

- `tests/livia-aani.test.mjs` odottaa täsmälleen Ateena-, Marseille-,
  Sarajevo- ja Venetsia-3:n olevan muuttuneita; muut pysyvät ajan tasalla.
- `tests/luentareaktiot.test.mjs` todistaa, että Marseillen vanha kohdistus on
  sisäisesti ehjä mutta hylätään hyväksytyn r2-tekstin kanssa.
- hiljaisen kuplan enimmäisvarakesto on 18 sekuntia, jotta hyväksytyn pitkän
  Venetsian tekstin voi lukea loppuun ennen uutta äänitettä.

Kohdennettu integraatiosarja läpäisi paikallisesti `106/106`. Koko paikallinen
testiportti läpäisi `3184`, ohitti ympäristösyistä `13` ja epäonnistui `0`.
Visuaalinen desktop- ja 390 px mobiilitarkistus on tehty paikallisessa
Chromium-harnessissa; julkaistun originin, Safarin ja asennetun sovelluksen
tarkistus odottaa mahdollista erikseen hyväksyttyä julkaisua.

## Palautus

Jos pilotti epäonnistuu QA:ssa, RC-haaraa ei yhdistetä. Jos virhe havaitaan
vasta yhdistämisen jälkeen, sisältö-, ele- ja ääni/versionostot palautetaan
yhtenä kokonaisuutena edelliseen julkaistuun versioon; vanhoja kuvaobjekteja
ja äänitiedostoja ei poisteta.
