# Astronautin kamera — yksi yhteinen humina ja 128 kysymysvastausta

Toimitus Fablelle, PR https://github.com/ravelius/Matkakirja/pull/2539,
haara `codex/astronaut-audio-questions-20260916`. Ei versionostoa,
linssin UI-muutoksia, yhdistämistä tai pelijulkaisua.

## Yksi yhteinen humina

Omistajan tarkennus tässä keskustelussa: vain yksi taustaääni, ei omaa
jokaiselle kohteelle. Yksi MCP-ajo on jo maksettu ja valmis. Se tuotti
neljä lähdeottoa; vain yksi valittiin yhteisen loppuraidan lähteeksi.
**Älä generoi mitään uudelleen.**

**Omistaja kuunteli yllä toimitetun 84 sekunnin MP3:n ja hyväksyi sen
16.9.2026: ”hyvä, lisää peliin”.** Hyväksytty SHA-256:
`93aaf7fb15092bac80abd1d740aa2a22a0fdb761558df2273673bc263fde2f2b`.
Tämä on nyt Fablelle pyyntö kytkeä ja julkaista tämä yksi yhteinen humina,
kun R2-toimitus on varmennettu. Lisämusiikkia ei ole hyväksytty tällä viestillä.

- Valmis paikallinen MP3: `media/astronaut/astronautin-kamera-tausta.mp3`.
- 84 sekuntia, mono 44,1 kHz / 128 kbit/s, −30,48 LUFS, −9,44 dBTP.
- Yksi 28 sekunnin sykli kolmesti; 1,5 s saumaa ompeleva ristihäivytys.
  Alku-/loppufeidiä ei ole poltettu tiedostoon. Raakalähteet säilyvät.
- Manifesti: `tools/astronaut/ambient-manifest.json`. Paikallisen
  lopputuloksen SHA-256 on siinä. Eri ffmpeg-versiolla viimeistelty
  tiedosto voi saada eri tavutiivisteen; tuontiajo tuottaa oman kuitin.
  Kuunteluhyväksyntä siirtyy tuontimanifestiin vain täsmälleen samoille
  tavuille. Käytä hyväksyttyä MP3:aa sellaisenaan, jos mahdollista.
- Signaalitarkistus läpäisty: decoded duration 84 s, saumahyppy −55,2 dBFS,
  alun/lopun 100 ms RMS-ero noin 0,2 dB. Omistajan kuunteluhyväksyntä yllä.
- Julkinen osoite: `https://media.matkakirja.app/matkakirja/aanet/linssit/astronautin-kamera-tausta.mp3`.
  **R2-vienti ja tavuntarkka readback varmennettu 16.9.2026 klo 08.18 UTC.**
  Ajo `35072965615` onnistui. Kuitti `tools/astronaut/delivery-receipt.json`:
  1 345 091 tavua, hyväksytty SHA täsmää, purettu PCM täsmää, HTTP200,
  audio/mpeg, peli-originin CORS ja byte-range HTTP206 / 16 tavua kunnossa.

Toistokytkentä Fablella: yksi yhteinen soitin koko linssille, 2 s
gain-feidi käynnistyksessä, kohteen/kuvan vaihto ei nollaa soitinta,
äänikytkin ja linssistä poistuminen vaimentavat/pysäyttävät sen. Dekoodattu
AudioBuffer-luuppi välttää MP3-elementin mahdollisen kierrostauon.

### Työnkulku ja hyväksytyn tiedoston siirto

Fable pushasi valtuutetun työnkulun commitilla `c9ec93eb`. Codexin
OAuth-oikeuksia ei muutettu. Haaralle kohdistettu dispatch toimii ilman
työnkulun yhdistämistä mainiin. Tuontijob ei saa ElevenLabs-avainta.

Ensimmäinen tuonti `35072337161` toi oikeat raakaversiot, mutta Linuxin
ffprobe sisällytti kestoarvioon MP3-kehysten täytteen. Automaattinen
luupin keskitys vaihtui 0,250 sekunnista 0,270 sekuntiin. Siksi tästä
ajosta syntynyttä MP3:aa ei kuitattu hyväksytyksi eikä pelikytkentään.
Sen versio ja manifesti säilytetään jäljitettävyyttä varten.

`tools/astronaut/exact-transfer.mjs` siirtää hyväksytyn MP3:n sellaisenaan.
Saman tuontijobin `exactTransfer.prepare` antaa vain tämän SHA-avaimen
PUT-siirtoon 15 minuutin luvan, joka on sidottu tavumäärään ja SHA-256:een.
Siirtolupa salataan paikallisen kertakäyttöavaimen julkiselle osalle;
API-avaimet eivät poistu Actionsista eikä selväkielinen siirtolupa mene
lokiin tai repoon. Paikallinen asiakas lataa hyväksytyt tavut suoraan R2:een.
`exactTransfer.finalize` tarkistaa ne, säilyttää aiemman manifestin ja
siirtää pelialiaksen hyväksyttyyn MP3:aan. Se ei saa vaihtaa tuntematonta
aiempaa tiedostoa. Julkinen SHA, MIME, CORS ja byte-range varmennetaan.
Vanha uudelleenkoodauspolku pysähtyy jatkossa, jos hyväksytty SHA muuttuu.

Fablen 16.9. työkuittauksen mukaan omistaja valitsi sen kortilla yhteisen
musiikin huminan lisäksi. Codexin kortille ei tullut vastakkaista vastausta.
Tämä toimitus sisältää vain hyväksytyn huminan; musiikkia ei ole generoitu.

## 64 kohdetta, 128 lyhyttä vastausta

`js/linssit/astronaut-kysymykset.js` sisältää täsmälleen nykyiset 64
`SATELLIITTI_KOHTEET`-kohdetta samassa järjestyksessä. Kysymykset enintään
50 merkkiä; vastaukset 149–234 merkkiä, 2–3 virkettä. Yhteensä 110
yksilöllistä virallista lähdeosoitetta, ensisijaisesti NASA-kuvametadataa
ja NASA Earth Observatorya, tarvittaessa USGS/NPS/UNESCO/ESA jne.

Rajapinta ei muuta nykyistä kysymyskortin muotoa:

```js
import { haeAstronautinKysymykset, haeAstronautinVastaus }
  from './astronaut-kysymykset.js';

const kysymykset = haeAstronautinKysymykset(kohde.tunnus); // string[2]
const vastaus = haeAstronautinVastaus(kohde.tunnus, kysymys);
// { kysymys, vastaus, lahteet: [{url,title}], havaintoId } tai null
```

Vastaustekstin voi näyttää suoraan ilman maksullista mallikutsua.
Renderöinti tekstinä, ei innerHTML:nä. `havaintoId` yksilöi kuvan,
johon vastauksen havainto liittyy; huomioi se, jos pelaaja vaihtaa
kohteen toiseen kuvaan. Tuntemattomalle kysymykselle ei arvata vastausta.
Puheita ei ole generoitu näistä kysymyksistä tai vastauksista.

Toimituslähteet `tools/astronaut/qa-first.json` ja `qa-last.json`;
`node tools/astronaut/build-questions.mjs` kokoaa runtime-moduulin.
`--check` tarkistaa tarkan vastaavuuden. `sw.js`:ään lisätty vain uuden
datamoduulin offline-listarivi. Muu käyttöliittymä ja kytkentä Fablella.

### Lähteiden tulkinnassa korjatut kohdat

Sarytševin pilviaukon syy ei ole varma. Yökuvan pimeys ei tarkoita
asukkaiden puuttumista. Veden väri ei ole ehdoton syvyysmittari. White
Sands on kipsi**hiekkaa**. Suezin makea kasteluvesi ei tule suolaisesta
laivakanavasta. Lamppujen väri ei määritä kaupunginosien ikää.
Araljärven vuoden 1994 havainto ja vanhat riuttakuntoarviot eivät ole
nykyhetken tilannekuvia. Baikalin vanhan NASA-kuvauksen syvyys korjattu
USGS:n mukaan turvallisesti muotoon runsaat 1,6 km.

Alkuperäiseen `satelliitti-data.js`:ään ei koskettu. Jatkossa sen
päivämerkinnöissä kannattaa erottaa kuvaus- ja julkaisuajat: Al Wadj
30.12.2007, ei 2.5.2008; kasteluympyrät STS-83 huhtikuu 1997, ei 2016;
Tiranin NASA-kuvaus 24.6.2013 vs paikallinen 23.6.; Galápagos STS-99
helmikuu 2000 vs metadatan maaliskuun luontipäivä. Manicouaganin API:n
leipätekstissä on lisäksi eri otostunnus. Nämä eivät muuta ääntä.

## Tarkistukset

- Koko testisarja: 3 455 testiä, **3 442 pass, 0 fail, 13 skip**.
- Rajatut ääni-/kysymys-/SW-testit: **29/29 pass**.
- Lopullisen tuontityökalun syntaksi sekä ääni-/kysymystestit: **6/6 pass**.
- Kaksoisavainvartija ja standalone-build onnistuvat.
- CI headille `55146145`: ajo `35067520168` onnistui. Uusimmat rajatut
  ääni-/kysymystestit 8/8. Kuuntelu on omistajan hyväksymä ja R2-vienti
  varmennettu tavuntarkasti. Pelikytkentä, julkaisu ja julkaistun pelin
  toistokoe ovat vielä Fablella; niitä ei väitetä tehdyiksi.

## Muut toimitukset

Minipulu on jo PR #2521, head `2cced3fb381b61638a4f64a428242a40a313d645`.
Ei uutta minipulua tai rasterikuvaa tässä toimituksessa.
Saapumisäänten 45/45 Horation nimi+iskulause-oton kytkentä pysyy Fablella
PR #2535:n päällä; tätä työtä ei monistettu.
