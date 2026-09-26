# Musiikki- ja äänisuunnitelma (26.9.2026)

**Tämä on suunnitelma, eikä yhtään Lyria-ajoa ole vielä tehty.** Omistajan tilaus on 25.9. klo 23.1x ja Fablen tehtävänanto
26.9. Omistaja hyväksyy suunnitelman ennen generointia. Laatijat:
- Pelikoodari: musiikki, tehosteet ja kerrokset.
- Linssiseppä: linssien tunnelmat (`linssien-aanitoiveet-20260925.md`, c9efd54f0).

Pohjana on nykytilan inventaario (web js/sound.js, musiikkivalitsin.js, kaupunkimusiikki.js, siirtymamusiikki.js ja
natiivin Peli/Aani/*). Raamatun linjaukset:
- ÄÄNET JA MUSIIKKI: kaikki musiikki Lyria 3.5:llä, yksi säädin kaikelle musiikille ja viisi äänentasoa samassa listassa.
- EI ÄÄNITIEDOSTOJA REPOSSA.
- LINSSIT — YHTEISET SÄÄNNÖT.

Merkinnät:
- **[ON]** = olemassa ja käytössä
- **[UUSI]** = ehdotettu
- **[PÄÄTÖS]** = omistajan valinta ennen generointia

## 1. Tyyli

### 1.1 Isoisän johtoaihe
Lyhyt, laulettava melodia, 4 tahtia ja 7–9 säveltä, joka kulkee kaikkien raitojen läpi: isoisän päiväkirja soi.
- **Rakenne:** nouseva kvartti ja laskeva askelkulku takaisin (kysymys ja vastaus). Sävellaji on d-molli / F-duuri, jotta
  sama aihe kääntyy sekä kaipaavaksi että lämpimäksi.
- **Käyttö:** aihe ei ole joka raidassa kokonaan.
  - Täytenä: etusivu, loppu ja pääaarre.
  - Katkelmana (2 ensimmäistä tahtia): saapuminen, aarre ja kohtaaminen.
  - Sisäänrakennettuna (soitin vaihtuu maanosan mukaan): maanosaraidat.
  - Linsseissä ei johtoaihetta, koska linssi on oma maailmansa (Linssiseppä: "melodia ei saa viedä huomiota kartalta").
- **Lyrialle:** aihe kirjoitetaan kehotteeseen sanallisesti ja nuottinimin ("D–G–F–E–D–C–D, rising fourth then stepwise
  descent"). Lyria 3.5 ei ota nuotteja syötteenä, joten aihe toistuu vain likimain. [PÄÄTÖS] Hyväksytäänkö tämä
  likimääräisyys, vai tehdäänkö johtoaihe kerran käsin (PD-soitinnäytteillä) ja muut raidat sen jälkeen Lyrialla
  referenssinä?

### 1.2 Aikakausi ja soittimet
- Vuosi 1873: **vain akustiset soittimet, ei syntetisaattoria, ei rumpusettiä, ei sanoja** (voimassa oleva linja). Sallittuja
  ovat kehysrumpu, käsirummut ja pienet lyömäsoittimet.
- **Pohjasoittimet kaikkialla:** jousikvartetti, piano (1870-luvun sointi, pehmeä), klarinetti tai huilu, harmoni.
- **Maanosien soittimet** (pääsoitin + väri, pohja säilyy):

| Maanosa | Pääsoitin | Väri |
|---|---|---|
| Pohjois- ja Länsi-Eurooppa | piano, sello | harmoni, huilu |
| Välimeri ja Balkan | kitara, mandoliini/bouzouki | tamburiini, klarinetti |
| Itä-Eurooppa ja Venäjä | balalaikka, viulu | zimbal |
| Lähi-itä ja Pohjois-Afrikka | oud, ney | darbuka (pehmeä), qanun |
| Saharan eteläpuoli | kora, balafon | käsirummut, puuhuilu |
| Etelä-Aasia | sitar (hiljaa), bansuri | tabla (pehmeä) |
| Itä-Aasia | guzheng/koto, erhu | shakuhachi |
| Pohjois-Amerikka | fiddle, banjo (1870-luku) | huuliharppu |
| Etelä-Amerikka | charango, kitara | quena |
| Oseania | kitara, jouset | (ei kulttuurilainaa ilman lähdettä) |

Kulttuurilainassa noudatetaan rajausta: soittimet ja moodit, ei pyhiä lauluja eikä tunnistettavia kansansävelmiä.

### 1.3 Tempo ja äänekkyys
- **Tempo:**
  - Kartta ja lehti 60–76 bpm.
  - Saapuminen ja aarre 80–96 bpm.
  - Linssit 50–66 bpm (sykkeen tahti).
  - Visa ja kohtaaminen 90–100 bpm, kevyt pulssi.
- **Äänekkyys, nykyinen linja** (kaikki Lyria-raidat, docs/moduulit/aanet.md):
  - musiikkitiedostot −33 LUFS ja soivat voimilla 0,03–0,13 (`MUSIIKIN_PERUSTASO` 0,034 × liuku × `MUSIIKIN_KATTO` 8)
  - äänimaisemat ja taustaäänet −30 LUFS
  - Pulun puhe −17 LUFS
- **Fablen tehtävänanto:** musiikki −18 LUFS ja ambienssi −30. [PÄÄTÖS] Suositus: tiedostot pidetään −33 LUFS:ssä. Kaikki
  soittovoimat (40+ vakiota webissä ja natiivissa) on kuunneltu tätä tasoa vasten, joten −18 vaatisi ne uusiksi.
  - −18 LUFS on hyvä *kuultava tavoite*: musiikin soiva taso pelissä liukusäätimen keskellä on noin −18…−20 LUFS-S.
  - Tämä varmistetaan mittaamalla koko miksaus (tools/aanitasot.json-putki), ei tiedostoja nostamalla.

### 1.4 Lyria 3.5 -kehotepohja
```
[Kohtaus]: <yksi lause, mitä ruudulla tapahtuu>.
Period: 1870s, acoustic instruments only, no synthesizers, no drum kit, no vocals, no lyrics.
Instruments: <pohja> + <maanosan pääsoitin ja väri>.
Motif: grandfather's theme — D–G–F–E–D–C–D (rising fourth, stepwise descent) <täytenä | kaksi ensimmäistä tahtia | ei>.
Tempo: <bpm> BPM. Mood: <2–3 sanaa>. Dynamics: <tasainen | nousee lopussa>.
Form: <seamless loop 60–70 s | one-shot 20–30 s with soft ending>.
Mix: soft, intimate, room reverb, leaves space for a narrator voice; no sudden peaks.
```
Nykyinen putki (`tools/lyria.mjs`, `generoi-musiikki.mjs`, `generoi-siirtymamusiikki.mjs`) tekee raidasta 50 s:n saumattoman
loopin 66 s:n lähteestä ja LUFS-normalisoinnin. Uudet raidat tehdään samalla putkella.

## 2. Raitalista

### 2.1 Nykyiset raidat [ON]
| Raita | Kohtaus |
|---|---|
| `musa-etusivu` | etusivu, lähtökaupungin valinta (natiivissa buildissa) |
| `musa-pohja` | pohjavire, kun mikään muu ei sovi |
| `musa-lehti`, `musa-matkalaukku` | lehden lukurauha, matkalaukku |
| `musa-kaupunki-ateena` | Ateena (ainoa kaupunkiraita) |
| 6 alueraitaa | britteinsaaret, pohjola, keski-eurooppa, välimeri, balkan, itä-eurooppa |
| `siirtyma-jalan/laiva/lento` | siirtymät |
| `linssi-keksinnot`, `linssi-ihmisen-matka` | linssit |
| `musa-aarre`, `musa-paaaarre` | aarteen paljastus |

Yhteensä 18 musiikkitiedostoa: tehtävänannon 16 ja kaksi aarreraitaa. Lisäksi Astronautin kameran raita on pidossa
(omistaja 16.9.).

### 2.2 Ehdotetut uudet raidat (28) [UUSI]
**Pelin kulku (6)**
1. `musa-aloituslento`: Lontoosta kohteeseen, 12 s + kortti. Johtoaihe täytenä, nouseva, ja päättyy laskuun (one-shot 25 s).
2. `musa-saapuminen`: lyhyt tunnus uuteen kaupunkiin (one-shot 8–10 s). Johtoaiheen 2 tahtia maanosan soittimella, 10
   versiota (yksi per maanosa, taulukko 1.2).
3. `musa-kohtaaminen`: henkilön tapaaminen ja tehtävä (looppi). Kevyt pulssi, uteliaisuus.
4. `musa-ratkaisu`: oikea ratkaisu ja vihreä piste syttyy (one-shot 4–6 s). Johtoaiheen vastausosa.
5. `musa-epaonnistuminen`: väärä vastaus tai aika loppui (one-shot 3–4 s). Lempeä, ei rangaistus.
6. `musa-loppu`: matkan loppu, kaikki aarteet (one-shot 60–90 s). Johtoaihe täytenä, orkestraalisempi (jouset + piano).

**Maanosat (9, looppeja 60–70 s, korvaavat ja täydentävät alueraidat maanosan mukaan):** Pohjois- ja Länsi-Eurooppa,
Välimeri, Itä-Eurooppa, Lähi-itä ja Pohjois-Afrikka, Saharan eteläpuoli, Etelä-Aasia, Itä-Aasia, Amerikat (pohjoinen ja
etelä omina), Oseania. Nykyiset 6 alueraitaa jäävät Euroopan hienojaoksi, ja maanosaraita on niiden varareitti.

**Tunnuskaupungit (6, looppeja, johtoaihe paikallisella soittimella):** Pariisi (piano ja viulu), Lontoo, Rooma, Istanbul, Kairo, Pietari. [PÄÄTÖS] Kaupunkien valinta. Ehdotus on matkan pääkaupungit,
joissa pelaaja viipyy pisimpään.

**Yöversiot (3):** `musa-pohja-yo`, `musa-lehti-yo` ja maanosaraidan yöväri (sama aihe, hiljaisempi, ilman lyömäsoittimia).
Käyttöön vain, jos peli saa vuorokaudenajan (Aurinko-kerros). [PÄÄTÖS]

**Välinäytös (1):** `musa-valinaytos`: lehden luvun tai kaaren vaihto (one-shot 15 s).

**Linssit (3 uutta + 2 nykyistä):**
| Linssi | Musiikki | Taustaääni |
|---|---|---|
| Ihmisen matka I | [ON] `linssi-ihmisen-matka` | ei (säilyy sellaisenaan) |
| Ihmisen matka II | [ON] sama + [UUSI] `linssi-ihmisen-matka-loppukue` 20–30 s (jakso 21, "perillä", lämmin) | [ON] 15 kenttä-äänitettä |
| Keksinnöt | [ON] `linssi-keksinnot` | — |
| Astronautin kamera | ei (omistaja 16.9.) | [ON webissä, UUSI natiiviin] humina, 84 s, −30,48 LUFS |
| Topografia | ei (omistaja 20.9.) | [UUSI, PÄÄTÖS] korkean ilman tuuli 60–90 s |
| Vesistöt | ei omaa | [UUSI, PÄÄTÖS] kaukainen virtaava joki |
| Maapallon tila (tuleva) | [UUSI] `linssi-maapallon-tila`: viileä, tasainen piano, matalat jouset, lasikello; pulssi ei kiristy | humina (sama kuin Astro) |
| Taidemuseo (tuleva) | [UUSI] siipikohtaiset raidat, pilottina renessanssi (luuttu, gamba, nokkahuilut) | salin huoneääni |
| Radio | ei (radion omat asemat) | — |

Webin Vesistöt ei pidä musiikkia kiinni, joten kaupungin raita voi jatkua linssissä. Tämä tarkistetaan ja korjataan samalla
(Linssiseppä).

## 3. Äänitehosteet

### 3.1 Nykyiset [ON]
Web `sfx.play` ja natiivin Tehostetaulu, sama siivutaulu:
- dieTick, dieLand, pen, quizOpen, click, paper, coin, correct, wrong, swipe, step, arrive, ferry, flight
- hint, kupla, popup, tick, timeout, flip, clack, star, gem, empty, stuck, turn, win
- lentomoottori (Tehostetaulu.Lento)
- Pulun 15 tehostetta (Natiivi-UI:n kirjasto)
- kohahdukset 1–4, varalla eikä käytössä

Webissä syntetisoidut eivätkä natiivissa: owl, typeBell, kirjoituskone, bling, keksinto, vuosi.

### 3.2 Puuttuvat ja ehdotetut [UUSI]
| Tehoste | Missä | Lähde | Huom |
|---|---|---|---|
| `keksinto` | Keksinnöt: uusi keksintö | Freesound CC0 (lasikello, lyhyt) tai webin FM-synteesi renderöitynä | natiivin aukko |
| `vuosi` | Keksinnöt, Maapallon tila: vuosilaskuri | Freesound CC0 (mekaaninen laskuri) | natiivin aukko, harvennus |
| `kortti-auki` | karttanosto ja kaupunkikortti | nykyinen popup riittää, äänitaso tarkistetaan | ei uutta tiedostoa |
| `sivu` | lehden sivu (WKWebView) | Freesound CC0 paperi | lehti ei nyt soita mitään |
| `zoom-liuku` | kartan liike/zoom | ei (natiivissa tarkoituksella pois) | [PÄÄTÖS] pidetään pois |
| `lasku` | aloituslennon laskeutuminen | Freesound CC0 (kumipyörä/tömähdys, pehmeä) | täydentää moottoria |
| `tuuli-lento` | lennon tuuli moottorin alla | Freesound CC0 | hyvin hiljaa |
| `aarre-avautuu` | laatta kääntyy | [ON] star/gem/flip | ei uutta |
| `vihrea-piste` | vihreä piste syttyy (löydös 145) | [UUSI] pehmeä kello (sama perhe kuin keksinto) | uusi tapahtuma |
| `kohtaaminen-alku` | henkilön kortti avautuu | [ON] quizOpen | ei uutta |
| `saa-sade`, `saa-tuuli` | sääkerros, jos tulee | Freesound CC0 | [PÄÄTÖS] vain jos sää toteutetaan |
| `pulu-*` | pulun huudahdukset | [ON] 15 + puheet | ei uutta |
| II: `pilvisyoksy`, `soihtu`, `aikahyppy` | Ihmisen matka II | Linssiseppä hankkii itse | hiljaa |
| Maapallon tila: `pysahdys` | animaatio pysähtyy 1979/2026 | Freesound CC0 (pehmeä lyönti) | tuleva |
| Taidemuseo: `sulka`, `pergamentti` | merkinnät, salin vaihto | Freesound CC0 | tuleva |
| Astro: `suljin` | kuvan avaus | Freesound CC0, hyvin hiljaa | [PÄÄTÖS] |

Lähdejärjestys:
- CC0/PD ensin, CC BY attribuutiolla samassa muutoksessa (lahteet.js). NC ei kelpaa.
- Generointia (ElevenLabs SFX) käytetään vain, jos lähdettä ei löydy.
- Kaikki ämpäriin (`media.matkakirja.app/audio/`), ei repoon.

## 4. Kerroksellisuus, häivytykset, hiljaisuus ja haptiikka
- **Kerrokset (voimassa):** pohja/paikka- tai alueraita, äänimaisema (−30), tilaraita (lehti, matkalaukku, visa),
  siirtymäraita ja tehosteet.
  - Väistö: puhe (kertoja ja pulu) 0,25, näyte 0,15, linssi pitää pohjan kiinni.
  - Linssin taustaääni soi äänimaiseman paikalla ja on väistämätön linssin omalle hiljennykselle (natiivi
    `AaniTila.LinssiTausta`, 26.9.).
- **Tahtiin sidotut häivytykset [UUSI]:** kun kohtaus vaihtuu kesken raidan, uusi raita aloittaa lähimmästä tahdinrajasta.
  Lyria-raidoille kirjataan tempo ja ensimmäinen isku generoinnin yhteydessä. Häivytys on 1 tahti (≈ 0,8–1 s), ei kiinteää
  300–800 ms.
- **Hiljaisuus:**
  - Linssin avaus alkaa 0,5 s:n hiljaisuudella ennen raitaa.
  - Luennan alussa musiikki väistää ennen ensimmäistä sanaa, ei samanaikaisesti.
  - Loppuraidan jälkeen 3 s hiljaisuutta ennen etusivua.
- **Haptiikka [UUSI, natiivi]** (iOS UIImpactFeedbackGenerator, äänien pariksi):
  - kevyt: napautus
  - keskitaso: oikea vastaus, vihreä piste
  - raskas: aarteen paljastus
  - notification-success: pääaarre

  Asetuksiin tulee kytkin. Ei haptiikkaa liukujen aikana.

## 5. Generointijärjestys ja kustannusarvio
1. **Johtoaihe ja 3 koeraitaa** (aloituslento, saapuminen Välimeri, loppu). Omistaja kuuntelee ja hyväksyy aiheen ja tyylin.
2. **Pelin kulku** 6 raitaa + Välimeren ja Pohjois-/Länsi-Euroopan maanosat (pelaajan ensimmäinen tunti).
3. **Loput maanosat** (7) ja tunnuskaupungit (6).
4. **Linssit:** loppukue, Maapallon tila, Taidemuseon renessanssi ja taustaäänet (Topografia, Vesistöt), kun päätökset
   on tehty.
5. **Yöversiot ja välinäytös**, jos hyväksytään.
6. **Tehosteet** rinnakkain vaiheen 2 kanssa (Freesound-haku ja LUFS-mittaus, tools/aanilahteet.mjs).

**Kustannus:**
- Lyria 3.5 (Gemini API) laskutetaan raitaa tai kestoa kohden. Tarkka hinta tarkistetaan Googlen hinnastosta ennen
  vaihetta 1, eikä sitä ole arvattu tähän.
- Määrä: 28 raitaa × 2–3 ehdokasta = 56–84 generointia, ja jokainen 66 s:n lähde leikataan loopiksi.
- Aiemmat 16 raitaa tehtiin samalla putkella ilman erillistä budjettipäätöstä.
- Freesound-tehosteet ovat ilmaisia.
- ElevenLabs SFX -varareitti: arviolta ≤ 10 tehostetta.
- [PÄÄTÖS] Budjettikatto vaiheille 1–3.

## 6. Päätökset omistajalle (yhteenveto)
1. Johtoaihe Lyrian likimääräisenä vai kerran käsin (1.1).
2. Tiedostojen äänekkyys: −33 LUFS säilyy (suositus) vai −18 (1.3).
3. Tunnuskaupungit (2.2).
4. Yöversiot vain vuorokaudenajan kanssa (2.2).
5. Topografian ja Vesistöjen taustaäänet, Astron suljin (2.2, 3.2).
6. Zoom-ääni pois natiivista (3.2).
7. Haptiikka ja sen kytkin (4).
8. Budjettikatto (5).
