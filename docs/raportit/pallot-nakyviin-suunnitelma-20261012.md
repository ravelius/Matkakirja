# Retkikunnan pallot näkyviin toisilleen: suunnitelma

Pelikoodari ja Linssiseppä 12.10.2026 (omistaja 12.5x: "Kuumailmapallossa saisi liikkua useammalla pallolla ja ne voisi näkyä toisille"; PT:n tilaus). Suunnitelma PT:n hyväksyttäväksi, ei koodia vielä. **Tulkinta:** jokainen retkikunnan jäsen lentää omaa palloaan. Kun jäsenet ovat samassa kaupungissa, he näkevät toistensa pallot ja nimimerkit reaaliajassa.

## 1. Nykytila (valmiit osat)

| Osa | Missä | Käyttö tässä |
|---|---|---|
| Retkikunta (enintään 8 jäsentä, koodi + jäsentunnus + avain) | worker `matkakirja-sahke` (D1), natiivi `Sahke.cs` / `SahkeYhteys.cs` | tunnistus ja yksityisyys: vain oma retkikunta |
| Natiiviportti (`x-matkakirja-natiivi` + User-Agent) ja avainotsake `x-sahke-avain` | worker `kasittelija.js` | sama portti uudelle reitille |
| Muut pallot (2–6 koristepalloa kaupungin yllä, paletit, poltin, polttimen ääni) | `Linssit/Ydin/Elava/MuutPallot.cs`, `ElavaKaupunki.cs`, `ElavatAanet.cs` (LS1) | jäsenten pallot piirretään samalla mallilla ja palettilla; poltin ja ääni sellaisinaan |
| Oman pallon vapaa lento ja kaupungin koordinaatit | `PalloKierto.cs`, `KaupunkiPalloMitat.cs`, `OpasSovitin` (LS1) | oma sijainti lähetetään tästä |

Tarkistus 12.10.: natiivin ja workerin retkikunnan päätepisteet täsmäävät. Elävä worker päästää iOS- ja TF-tunnuksen läpi. Kahden simulaattorin päästä päähän -testi on Laitetestaajalla.

## 2. Worker: huone per kaupunki

- **Durable Object `PalloHuone`**, avain `<retkikunnan koodi>:<kaupunki>`.
  - Uusi reitti samaan workeriin: `GET /pallot?koodi&jasenId&kaupunki` WebSocket-päivityksenä, avain otsakkeessa.
  - Yhteys hyväksytään vain, jos D1:n retkikuntatunnukset täsmäävät (sama tarkistus kuin `/retkikunta/tila`) ja natiiviportti tai sallittu origin on kunnossa.
  - Hibernation-API: huone ei maksa levossa.
- **Viesti** (JSON, noin 70 tavua): `{j, lat, lon, alt, suunta, poltin, t}`.
  - Sijainti on pelin pallon (kaupunkikameran silmän) sijainti WGS84:nä: lat/lon 1e-6 ja ellipsoidikorkeus metreinä (luku 4), ei laitteen paikannusta.
  - Huone välittää viestin muille huoneessa ja pitää vain viimeisimmän tilan muistissa. Mitään ei tallenneta levylle eikä historiaa synny.
- **Tahti:** liikkuessa 1 Hz (nopeassa liikkeessä tai käännöksessä 2 Hz), paikallaan 0,2 Hz. Hiljaisuus 30 s → jäsen poistuu huoneesta (`{j, pois: true}`).
- **Kaupungin vaihto** = huoneen vaihto: vanha yhteys suljetaan ja uusi avataan. Eri kaupungeissa olevat eivät näe toisiaan.
- **Rajat:** enintään 8 yhteyttä huoneessa (retkikunnan koko), enintään 4 viestiä sekunnissa jäsentä kohden (ylimenevät pudotetaan), viestin enimmäiskoko 256 tavua.
- **Kustannus:** 8 jäsentä × 1 Hz ≈ 29 000 viestiä tunnissa huonetta kohden. Saapuvat WebSocket-viestit laskutetaan 20:1 (noin 1 400 pyyntöä tunnissa). Ilmaisen ja maksullisen tason rajat tarkistetaan Julkaisijan kanssa ennen käyttöönottoa (Durable Objects SQLite-taustalla).

## 3. Natiivi asiakas

- **Yhteys:** `System.Net.WebSockets.ClientWebSocket` (toimii IL2CPP:llä iOS:llä ja Macilla). Oma `PalloYhteys`-luokka `SahkeYhteys`-mallin mukaan.
  - Katkos → uusi yhteys porrastetulla viiveellä 1, 2, 4 … 30 s.
  - Sovellus taustalle → yhteys kiinni. Ei verkkotyyppiehtoja (LATAUS SAMA KAIKILLA VERKOILLA).
- **Lähetys:** oman pallon tila `PalloKierto`sta tahdin mukaan. Lähetetään vain, kun pallo on kaupungin lentotilassa ja retkikunta on olemassa.
- **Interpolointi:** jäsenkohtainen puskuri (3–5 tilaa). Piirto 1,2 s jäljessä, ja tilojen välillä Hermite-käyrä paikalle sekä tasainen kulmainterpolointi suunnalle.
  - Puskurin loputtua ekstrapoloidaan enintään 1 s, sitten pallo pysähtyy ja häivytetään 10 s jälkeen.
  - Puhdas C#, Peli-testit (tahti, puskuri, ekstrapolointiraja, kaupungin vaihto).
- **Yksityisyys:** näkyy vain oman retkikunnan jäsenille. Asetuksiin kytkin "Näytä palloni retkikunnalle" (oletus päällä, kun retkikunta on perustettu), ja pois päältä yhteyttä ei avata. Ei vapaata tekstiä eikä chattia. Nimimerkki on jo retkikunnan nimimerkki (valmiista nimilistasta).

## 4. Piirto ja nimilappu (Linssiseppä; nimilapun pohja Natiivi-UI)

- **Oman pallon sijainnin lähde (LS1):** pelaaja on korissa (1. persoona), joten pallon paikka on piirretyn kaupunkikameran silmä, ei
  oppaan katsepiste. Lähetetään kaupunkikameran sijainti geodeettisena: `CesiumGeoreference`n ECEF-muunnos → WGS84 lat/lon ja
  **ellipsoidikorkeus** (ei merenpinta: laitteiden geoidimalli ei tällöin vaikuta), sekä suunta = kameran suuntima. Lähde on sama
  kaikissa kaupunkitiloissa (opas, kaupunkikierros, vapaa lento, aarretehtävän etsintä): `OpasSovitin`/`KierrosSovitin` kuvaavat kameran
  `PalloKierto.Kuvaa`n kautta, joten yksi lukukohta kameran jälkeen (KyydinKameraEnnen-vaiheen jälkeen) riittää. Kartalla (pallo
  koko maapallona) ei lähetetä.
- **Jäsenen pallo:** sama malli ja paletti kuin koristepalloilla (`MuutPallot` Ytimessä, piirto `ElavaKaupunki`). Paletti jäsentunnuksesta
  (0–5) → sama kaikilla laitteilla. Jokainen jäsenpallo kiinnitetään maailmaan `CesiumGlobeAnchor`illa viestin lat/lon/korkeuteen
  (kori = viestin piste, kuori sen yläpuolelle), joten Googlen laatat peittävät sen luonnollisesti syvyyden mukaan. Poltin ja ääni
  `ElavatAanet`ista: liekki ja ääni viestin `poltin`-bitistä, ääni 3D:nä vain < 600 m.
- **LOD:** < 1,5 km täysi malli + liekki; 1,5–4 km kevyt malli ilman liekkiä; > 4 km piiloon. Koristepallojen 300–800 m korkeussääntö ei
  koske jäseniä.
- **Lähellä kameraa:** jos jäsenpallo on alle 60 m omasta kamerasta, se häivytetään (ei leikkausta kameran läpi eikä kuoren täyttämää
  ruutua); alle 25 m piiloon. Ei törmäystä (pallot eivät estä toisiaan).
- **Koristepallojen väistö:** koristepalloja `max(0, 6 − näkyvät jäsenet)`, ja koristepallo ei synny alle 300 m:n päähän jäsenestä.
- **Nimilappu:** maailmaan kiinnitetty lappu jäsenpallon kuoren yläpuolelle, näkyy < 2 km ja häivytetään 1,5–2 km. Ehdotus pohjaksi:
  kartan kaupunkinimiön tyyli (`KaupunkiMerkit`in nimiö, TextMeshPro maailmassa, kartan fontti) tai kohdekartan kyltti
  `mk-kohdekartta__kyltti` ruutuun projisoituna; Natiivi-UI valitsee, puuttuva pohja → PT:n kautta omistajalle (UI-POHJAT).
  **Huom. Googlen ehdot:** kaupunkinäkymässä piilotetaan pelin karttaelementit (kartussi, nostot); jäsenen nimilappu on pelin oma
  päällyste kuten Pulu ja kompassi, mutta PT vahvistaa sen ennen toteutusta.
- **Testit (LS1):** Ydin-testit paletin valinnalle, LOD-rajoille, lähihäivytykselle ja koristepallojen väistölle; simulla kaksi palloa
  (Laitetestaajan kahden simulaattorin ajo) Pariisissa: näkyvyys, peitto rakennusten taakse, nimilapun häivytys.

## 5. Työmäärä ja vastuut

| Osa | Tekijä | Arvio |
|---|---|---|
| Worker: `PalloHuone`, reitti, tunnistus, rajat, testit (`tests/sahke-worker.test.mjs`-mallilla) | Pelikoodari | 1 pv |
| Natiivi: `PalloYhteys`, lähetystahti, interpolointipuskuri, asetus, Peli-testit | Pelikoodari | 1 pv |
| Piirto: oman sijainnin lähde (kamera → WGS84), jäsenpallot `MuutPallot`-pohjalla + GlobeAnchor, LOD, lähihäivytys, koristepallojen väistö, Ydin-testit | Linssiseppä | 1,5 pv |
| Nimilappu olemassa olevalla pohjalla | Natiivi-UI | 0,5 pv |
| Kahden simulaattorin testi (kaksi palloa samassa kaupungissa, kaupungin vaihto, katkos) | Laitetestaaja | 0,5 pv |
| **Yhteensä** | | **noin 4,5 työpäivää, juna 185** (184 on aarretehtävien) |

## 6. Riskit

- **WebSocket iOS-taustalla:** käyttöjärjestelmä katkaisee yhteyden. Ratkaisu on yhteys kiinni taustalla ja uusi yhteys palatessa.
- **Kustannus:** jos Durable Objects ei kuulu nykyiseen Cloudflare-tasoon, vaihtoehtona on HTTP-pollaus 1 Hz nykyiseen workeriin (`/pallot/paikka`, D1 ei käy, joten KV tai muisti). Pollaus on raskaampi, joten päätös tehdään ennen toteutusta (Julkaisija tarkistaa tason).
- **Kehysero:** jos pallon sijainti lasketaan kaupunkikohtaisesta origosta, lat/lon/alt-viesti on riippumaton laitteiden LOD-tasosta.
