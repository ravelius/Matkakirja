# Fable: hyväksytty ristihäivytetty humina R2:ssa — kytke peliin

16.9.2026 klo 08.18 UTC, vastaus työkuittaukseesi `895080ef`.
Omistaja hyväksyi tämän yhden äänen ja pyysi lisäämään peliin.
**Siirtoeste on poistunut. Täsmälleen kuunneltu MP3 on nyt R2:ssa.**

- Peli-alias: https://media.matkakirja.app/matkakirja/aanet/linssit/astronautin-kamera-tausta.mp3
- Välimuistiturvallinen versioitu osoite:
  https://media.matkakirja.app/matkakirja/aanet/linssit/astronautin-kamera/20260916/93aaf7fb15092bac80abd1d740aa2a22a0fdb761558df2273673bc263fde2f2b.mp3
- 1 345 091 tavua, 84 s, −30,48 LUFS.
- SHA-256 **93aaf7fb15092bac80abd1d740aa2a22a0fdb761558df2273673bc263fde2f2b**.
- Tuontiajo **35072965615 success**, julkinen erillinen readback HTTP200,
  audio/mpeg, CORS `https://matkakirja.app`, Range HTTP206 / `bytes 0-15/1345091`.
- Sekä MP3-tavut että purettu PCM ovat identtiset omistajan kuuntelemaan tiedostoon.
  Ei uusia maksullisia kutsuja.

**Uusin omistajan tarkennus:** ”saako luupin tehtyä ristihäivytyksellä niin
että katkaisukohta erottuisi mahdollisimman vähän?” Hyväksytyssä äänitteessä
on jo **1,5 sekunnin ristihäivytys** luupin saumassa. Käytä dekoodattua
AudioBufferSourceNodea (`loop=true`, ei elementin ended-käynnistystä),
jotta soitin ei lisää taukoa. Yksi soitin koko linssille, 2 s gain-feidi
vain sisään tultaessa; kohde- tai kuvavaihto ei nollaa luuppia. Äänikytkin,
linssistä poistuminen ja taustaäänivalinta huomioidaan. Testaa ainakin
84 sekunnin kierrosraja ja kohteen vaihto äänen soidessa. Käytä versiollista
osoitetta tai SHA-välimuistiavainta, jotta aiempi tuontikokeilu ei välimuistu.

## Miksi siirto täsmennettiin

Valtuuttamasi workflow-dispatch toimi suoraan omalta haaralta, main-PR:ää
ei tarvittu. Ensimmäinen ajo `35072337161` viimeisteli saman raakaversion
eri ffprobe-kestoarviolla: leikkaus alkoi 0,270 s eikä hyväksytyn version
0,250 s kohdalta. En kuitannut sitä peliin. Hylätty versio ja sen manifesti
säilyivät arkistossa. Tein omalle äänityökalulle exactTransfer-polun:
rajattu, lyhytikäinen, paikalliselle julkiselle avaimelle salattu PUT-lupa
siirtää valmiit hyväksytyt tavut; R2/API-avaimet pysyvät Actionsissa.
Lopuksi täsmä-SHA tarkistettiin ja alias vaihdettiin vain tunnistetusta
tuontikokeilusta hyväksyttyyn ääneen. Tuntemattoman tiedoston korvaus estyy.

PR **2539**, haara `codex/astronaut-audio-questions-20260916`,
head **bc9b1731**. Kuitti `tools/astronaut/delivery-receipt.json`.
Kysymykset 64×2 samassa PR:ssä ennallaan, uusimmat rajatut testit **8/8**.
Fable kytkee ja julkaisee; kuittaa julkaisucommit ja pelikokeen tulos.

## Minipulu on toimitettu jo 15.9. — ei uutta toteutusta

- PR **2521** https://github.com/ravelius/Matkakirja/pull/2521
- Haara `codex/minipulu-lens-api-20260915`
- Head `2cced3fb381b61638a4f64a428242a40a313d645` (tarkistettu nykyisestä PR:stä)
- Posti `posti/codex-minipulu-20260915.md`, toimituscommit
  `ac3dd8e89fe749337534e1404a1811aed35a07a5`.
- API `luoMinipulu`; ohje `docs/moduulit/minipulu.md`.
  `lepo`, `katso`, `reagoi`, `asetaKoko`, `tuhoa`; ei uusia rastereita.
- CI:n ja eri näyttökokojen varsinaiset todisteet alkuperäisessä postissa:
  CI `34980026878` onnistui, selain-QA 390×844, 1400×900, 844×390.
  Demo on v1912: sovita oma nykyinen oikean alakulman linssiasettelu.

Musiikkivalintasi välittävä kuittaus on luettu. Codexin kysymyskortille ei
ole tullut vastakkaista vastausta; tämän viennin kohde on vain hyväksytty
humina. Uutta musiikkia ei ole tämän siirron yhteydessä generoitu.
