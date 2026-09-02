# Siirtymämusiikki ja pelin äänet — tuotanto-ohje

Sitovat linjaukset ovat Raamatussa (js/tyohuone-raamattu.js). Tämä
dokumentti kertoo, miten siirtymämusiikin raidat tuotetaan ja viedään.
Koodin kuvaus on moduulin js/siirtymamusiikki.js otsikkokommentissa.

## Siirtymämusiikki (omistaja 2.9.2026)

Kolme raitaa, yksi per kulkumuoto: `siirtyma-jalan.mp3`,
`siirtyma-laiva.mp3`, `siirtyma-lento.mp3`.

| ominaisuus | vaatimus |
|---|---|
| kesto | 10–20 s; pisin siirto on n. 5,7 s, lyhin n. 1,4 s |
| looppi | saumaton äänitteessä itsessään (alku ja loppu samaan lepoon, ei häntää, ei hiljaisuutta) — peli ei ristihäivytä |
| taso | −33 LUFS, mittaus `node tools/mittaa-aanet.mjs` |
| formaatti | mp3, mono, 128 kbps, 44,1 kHz |
| luonne | jalan = kävelyn rytmi, kevyt ja etenevä; laiva = aallokon huojunta, hitaampi ja leveämpi; lento = ilmava ja liikkumaton, soi kabiiniäänen alla |
| ei tekstiä, ei laulua | instrumentaali |

Peli feidaa sisään 300 ms ja ulos 500 ms; voima jalan/laiva 0,11,
lento 0,06. Musiikki väistyy pöllön, kertojan ja lukijan alta.

## Vienti

1. Ensisijainen: raita ämpärin `aanet/`-kansioon (ei mediaa repoon,
   Raamatun "kaikki aina ämpäriin").
2. Vaihtoehto: `assets/audio/`-kansioon, jolloin
   `.github/workflows/vie-aanet.yml` vie sen ämpärin `audio/`-kansioon.
   Peli osaa molemmat polut.

Puuttuva raita ei aiheuta virhettä: soitto lähtee optimistina ja 404
merkitsee lajin hiljaiseksi. Kehittäjävalikon rivi "siirtymämusiikki"
kertoo, mitkä raidat löytyvät; kytkin "varamusiikki" (oletus pois)
soittaa syntetisoidun kuvion vain, jos oikea raita puuttuu.

## Generointi

Raidat generoidaan ElevenLabs Music -APIlla (omistajan päätös
2.9.2026; varalla Google Lyria) työkalulla
`tools/generoi-siirtymamusiikki.mjs`. Promptit ovat työkalussa
vakioina, yhteinen tyylilause kaikille kolmelle.

```
node tools/generoi-siirtymamusiikki.mjs --laji kaikki
node tools/generoi-siirtymamusiikki.mjs --laji laiva --ei-vientia
node tools/generoi-siirtymamusiikki.mjs --laji kaikki --kuiva
```

| lippu | merkitys |
|---|---|
| `--laji jalan\|laiva\|lento\|kaikki` | pakollinen |
| `--kuiva` | ei API-kutsua eikä vientiä: tulostaa suunnitelman ja promptit ja ajaa koko ffmpeg-ketjun syntetisoidulla siniäänellä |
| `--ei-vientia` | generoi ja leikkaa, mutta jätä tiedosto vain levylle |

Ketju: mallilta tilataan 24 s, siitä leikataan keskeltä looppi
(jalan 12 s, laiva ja lento 16 s) ja sauma ommellaan ffmpegillä
ristihäivytyksellä niin, että loopin loppu jatkuu lähteessä sen
alkuun. Taso mitataan loudnormilla ja korjataan yhdellä lineaarisella
vahvistuksella −33 LUFSiin — dynaaminen normalisointi rikkoisi juuri
tehdyn sauman. Valmis mp3 (mono, 128 kbps, 44,1 kHz) tarkistetaan:
kesto 10–20 s, taso ±1 LU tavoitteesta, ei hiljaisuutta päissä
(`silencedetect`). Kelvoton raita jää viemättä.

Tiedostot kirjoitetaan `media/`-kansioon (.gitignoressa, tarkistetaan
ennen ensimmäistäkään maksullista kutsua) ja viedään sieltä ämpärin
`aanet/`-kansioon samalla `aws s3 cp` -komennolla kuin
`vie-aanet.yml`. Lopuksi ajo tulostaa julkiset osoitteet ja
HEAD-tarkistuksen. Raakatuotos jää talteen kansioon
`media/siirtymamusiikki-raaka/`, joten loopin voi leikata uudelleen
ilman uutta kutsua.

Ajo: `.github/workflows/generoi-siirtymamusiikki.yml`
(workflow_dispatch, input `laji`). Se asentaa ffmpegin, ajaa ensin
kuivan ajon, sitten oikean, eikä committoi repoon mitään. Ei
automaattista triggeriä: musiikki maksaa rahaa. Salaisuudet ovat
Actions-asetuksissa: `ELEVEN_API_KEY` ja neljä R2-salaisuutta.
API-avain vain ympäristömuuttujana, ei koskaan repoon eikä lokiin.

Koneellinen tarkistus ei kuule saumaa: raidat **kuunnellaan** ajon
jälkeen, ja loopin on kierrettävä ilman naksahdusta.
Leikkauslaskennan vartija on `tests/siirtymaraidat.test.mjs`.
