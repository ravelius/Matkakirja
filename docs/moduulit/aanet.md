# Siirtymämusiikki ja pelin äänet — tuotanto-ohje

Sitovat linjaukset ovat Raamatussa (js/tyohuone-raamattu.js). Tämä
dokumentti kertoo, miten musiikkiraidat (siirtymät ja linssit)
tuotetaan ja viedään. Koodin kuvaus on moduulin
js/siirtymamusiikki.js otsikkokommentissa.

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

## Linssien musiikki (omistaja 2.9.2026 ilta)

Omistajan tilaus: *"Generoi linssille oma musiikki"*. Aikajanalinssi
(js/aikajana.js + js/linssit/keksinnot.js) soittaa omaa raitaansa koko
ajon ajan. Raita on saman moduulin (js/siirtymamusiikki.js) laji siinä
missä siirtymätkin — koneisto, kaksi polkua, väistö ja puuttuvan
raidan sietäminen ovat samat — mutta mitat ovat toiset.

| ominaisuus | vaatimus |
|---|---|
| tiedosto | `linssi-keksinnot.mp3` (laji `keksinnot`) |
| kesto | 45–60 s; linssi kestää minuutteja (25 pysäkkiä), joten lyhyt kierto alkaisi kuulua silmukaksi |
| looppi | saumaton äänitteessä itsessään, kuten siirtymäraidoilla |
| taso ja formaatti | −33 LUFS; mp3, mono, 128 kbps, 44,1 kHz |
| luonne | 1800-luvun keksintöjen aikakausi: hillitty kellokoneiston tikitys ja tasainen mekaaninen pulssi pohjalla, uteliaisuus ja odotus; akustinen (jouset, puupuhaltimet, kevyt vasarapiano tai cembalo) |
| ei | ei elektronista, ei laulua, ei tekstiä, ei liian tunnelmoivaa — kello ja filminauha liikkuvat musiikin päällä |

Peli feidaa sisään 600 ms ja ulos 800 ms (siirtymää rauhallisemmin:
linssi avataan kerran), voima 0,11, looppi päällä koko ajon ajan.
Musiikki alkaa, kun linssi käynnistyy (kamera-ajon kanssa, ennen
kelloa), **jatkuu tauon yli puoleen tasoon hiljennettynä** (napautus
kelloon tai korttiin) ja feidataan pois, kun linssi suljetaan tai
juttu avataan nähtävyyskorttina — kortin sulkeutuessa se palaa.
Kaari kertoo raidan kentässä `aikajana.musiikki`; ilman kenttää ajo
on hiljainen.

Generointi on sama työkalu: `--laji keksinnot`. Valinta `kaikki` EI
sisällä sitä (ks. alla).

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
vakioina, yhteinen tyylilause kaikille lajeille.

```
node tools/generoi-siirtymamusiikki.mjs --laji kaikki
node tools/generoi-siirtymamusiikki.mjs --laji laiva --ei-vientia
node tools/generoi-siirtymamusiikki.mjs --laji keksinnot --kuiva
```

| lippu | merkitys |
|---|---|
| `--laji jalan\|laiva\|lento\|keksinnot\|kaikki` | pakollinen; `kaikki` = kolme **siirtymäraitaa**, ei linssiraitaa |
| `--kuiva` | ei API-kutsua eikä vientiä: tulostaa suunnitelman ja promptit ja ajaa koko ffmpeg-ketjun syntetisoidulla siniäänellä |
| `--ei-vientia` | generoi ja leikkaa, mutta jätä tiedosto vain levylle |

Ketju: mallilta tilataan 24 s (linssiraidalle 66 s), siitä leikataan
keskeltä looppi (jalan 12 s, laiva ja lento 16 s, keksinnöt 50 s) ja
sauma ommellaan ffmpegillä ristihäivytyksellä niin, että loopin loppu
jatkuu lähteessä sen alkuun. Taso mitataan loudnormilla ja korjataan yhdellä lineaarisella
vahvistuksella −33 LUFSiin — dynaaminen normalisointi rikkoisi juuri
tehdyn sauman. Valmis mp3 (mono, 128 kbps, 44,1 kHz) tarkistetaan:
kesto lajin rajoissa (siirtymät 10–20 s, linssi 45–60 s), taso ±1 LU
tavoitteesta, ei hiljaisuutta päissä (`silencedetect`). Kelvoton raita
jää viemättä.

Tiedostot kirjoitetaan `media/`-kansioon (.gitignoressa, tarkistetaan
ennen ensimmäistäkään maksullista kutsua) ja viedään sieltä ämpärin
`aanet/`-kansioon samalla `aws s3 cp` -komennolla kuin
`vie-aanet.yml`. Lopuksi ajo tulostaa julkiset osoitteet ja
HEAD-tarkistuksen. Raakatuotos jää talteen kansioon
`media/siirtymamusiikki-raaka/`, joten loopin voi leikata uudelleen
ilman uutta kutsua.

Ajo: `.github/workflows/generoi-siirtymamusiikki.yml`
(workflow_dispatch, input `laji`: `kaikki`, `jalan`, `laiva`, `lento`
tai `keksinnot`). Linssiraita pyydetään nimeltä, koska `kaikki` on
vain kolme siirtymäraitaa — näin valmiita raitoja ei generoida
vahingossa uudestaan, ja jokainen kutsu maksaa. Ajo asentaa ffmpegin,
ajaa ensin kuivan ajon, sitten oikean, eikä committoi repoon mitään. Ei
automaattista triggeriä: musiikki maksaa rahaa. Salaisuudet ovat
Actions-asetuksissa: `ELEVEN_API_KEY` ja neljä R2-salaisuutta.
API-avain vain ympäristömuuttujana, ei koskaan repoon eikä lokiin.

Koneellinen tarkistus ei kuule saumaa: raidat **kuunnellaan** ajon
jälkeen, ja loopin on kierrettävä ilman naksahdusta.
Leikkauslaskennan vartija on `tests/siirtymaraidat.test.mjs`.
