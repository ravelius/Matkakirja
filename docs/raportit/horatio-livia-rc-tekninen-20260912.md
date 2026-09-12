# Horatio–Livia Eurooppa-pilotti — tekninen RC-tila 12.9.2026

## Tila

**RC koottu ja Livian ääni lukittu, mutta sisältö- ja maksullisen audioajon
portit ovat HOLD.** Tämä haara ei ole julkaisupyyntö. Maksullisia ääniajoja,
R2-vientiä, mergeä tai julkaisua ei ole valtuutettu eikä tehty.

- RC-haara: `codex/horatio-livia-rc-20260912`
- pohja: `86038bcc` (`v1816`)
- sisältörevision tunnus: `eu-hl-pilot-20260912-r1`
- kaupungit: Marseille, Ateena, Sarajevo ja Venetsia
- tekstilähde: PR #2325, sisältö `aa3a61d7`, ajopaketti `76a7eeff`,
  Sarajevo-ankkurikorjaus `15b9f720`
- ilme-, ele- ja ohjainlähde: `f2ee37b1`, koontipuun vastaava commit
  `7958bfb0`

## Lukittu Livian/Pulun ääni

- nimi: `flicker - cheerful fairy & sparkly sweetness`
- ElevenLabs voice_id: `piI8Kku0DcvcL6TTSeQt`
- model_id: `eleven_v3`
- stability: Natural / `0.5`

Nämä ovat `tools/generoi-pulu.mjs`-työkalun ja
`.github/workflows/generoi-pulu.yml`-työn pysyvät oletukset. Aiempi Dr. Von /
v2 säilyy historiassa ja vanhoissa tuotantoäänissä, mutta ei ohjaa uusia
Pulu-ajoja. V3-tagit lisätään vain TTS-syötteeseen; näkyvät kuplatekstit eivät
muutu.

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

Odotus ennen ääntä: `4/4 kaupunkia kunnossa`. Kuiva ajo ei käytä verkkoa,
avainta eikä kirjoita tiedostoja.

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

1. Horation neljän tekstin aito tiivistys hyväksytään; nykyinen
   341→316, 346→337, 328→318 ja 348→348 merkin luonnos ei vielä läpäise
   sisältöporttia.
2. Rajatulle neljän kaupungin Horatio- ja Livia-ajolle pyydetään erillinen
   maksullisen ajon lupa.
3. Valmiit äänet kuunnellaan kokonaan; SHA-256 ja tavumäärä kirjataan.
4. Horatio kohdistetaan uudelleen ja Livian neljä `.eleet.json`-tiedostoa
   tuotetaan lopullisista mp3-tiedostoista.
5. Ääniversiot ja `LIVIAN_AANITETYT` päivitetään vasta hyväksyttyihin
   tuotoksiin.
6. Koko testisarja ja CI ajetaan vihreäksi.
7. Merge ja julkaisu tehdään vasta erillisellä hyväksynnällä.
8. Julkaistulla `https://matkakirja.app`-originilla tarkistetaan jokaisen
   kaupungin tarkka tila: puhe, pause/resume, seek, nopeus, loppu, ohitus,
   keskeytys, hiljainen fallback, chat, lehdet ja kartalle paluu. Safari/
   asennettu sovellus on omistajan lopullinen katselmuspinta.

Rajatussa neljän kaupungin kuuntelussa tarkistetaan lisäksi, etteivät tagit
kuulu sanoina, sanat vastaavat kuplaa, alkuun ei synny kaikua, Sarajevo pysyy
hillittynä, Venetsian kuiskaus on ymmärrettävä, Marseille/Ateena eivät
kiirehdi loppua ja jokainen tiedosto jää alle 20 sekunnin.

## Tämän RC:n tunnettu tarkoituksellinen punainen tila

Ennen uusia ääniä kolme vanhoihin tiedostoihin sidottua testiä saa kaatua:

- `tests/livia-aani.test.mjs`: kuiva ajo tunnistaa neljä muuttunutta
  city-3-repliikkiä.
- `tests/pulu-tunteet.test.mjs`: tunnetagivartio havaitsee saman muuttuneen
  Livia-tiivisteen eikä hyväksy vanhaa äänitettä.
- `tests/luentareaktiot.test.mjs`: Marseillen vanha luenta/kohdistus ei vastaa
  uutta tekstiä.

Näitä vartioita ei saa löysentää hyväksymään vanhoja ääniä. Kaikki muut
testit ja rakennusportit on saatava vihreiksi ennen ääni- ja julkaisuajoa.

## Palautus

Jos pilotti epäonnistuu QA:ssa, RC-haaraa ei yhdistetä. Jos virhe havaitaan
vasta yhdistämisen jälkeen, sisältö-, ele- ja ääni/versionostot palautetaan
yhtenä kokonaisuutena edelliseen julkaistuun versioon; vanhoja kuvaobjekteja
ja äänitiedostoja ei poisteta.
