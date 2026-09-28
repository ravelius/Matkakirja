# Pelikoodarin luovutus 28.9.2026 klo 13.1x (-b, kontekstin nollaus)

Jatkoa luovutukselle `-20260928`. Fable = session id local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, NIMI nyt
**"Päätoimittaja (Opus, xhigh)"** (kaksi samannimistä → SendMessage refillä `[e6550e]`, paikallinen). Julkaisija, Natiivi-UI,
Natiiviseppä, Linssiseppä, Siirtoseppä NIMELLÄ. Omistaja käyttää Macia klo 17 asti: yksi agentti kerrallaan, vain kohdennetut
testit `nice -n 15`, ei koko sarjaa, ei suorituskykysavukkeita. `tools/tarkista-niputus.mjs` ennen jokaista PR:ää (#3537 kaatui
nimitörmäykseen). Pakkopush estetty → rebasetun haaran PR `…-2`-haarasta.

## 0. KÄRKI NYT: xAI-reaaliaikanappi NATIIVIIN (Fable: omistaja kokeilee asap, tavoite merge-pyyntö ~16.00)

- **Worker valmis:** https://github.com/ravelius/Matkakirja/pull/3553 (v2356, `'realtime'` natiivin sallittuihin, vaatii yhä
  kehittäjäkoodin) Julkaisijalla etusijalla → pollo-julkaisu mergen jälkeen. Ennen sitä tuotanto antaa natiiville 403.
- **Natiivi ALOITTAMATTA (agentti ehti vain tutkia, pysäytetty nollausta varten):** proto-worktree
  `/Users/Shared/Claude/wt/proto-pelikoodari-pulu-realtime`, haara `pelikoodari/pulu-realtime` (master 17c2928b), puhdas.
  Suunnitelma (anna yhdelle Opus-agentille, brief alla tiivistettynä):
  1. `Assets/Plugins/iOS/MatkakirjaPuhekanava.mm`: AVAudioSession PlayAndRecord + VoiceChat (kaiunpoisto) + DefaultToSpeaker |
     MixWithOthers | AllowBluetoothA2DP, EI AllowBluetooth (kuten `MatkakirjaSanelu.mm` rivit 191–250, myös palautus);
     AVAudioEngine inputNode voice processing, tap → AVAudioConverter 24 kHz mono Int16 → rengaspuskuri; C#: Aloita/Lue/Lopeta;
     mikrofonilupa; NSMicrophoneUsageDescription (tarkista sanelun plist-käsittely).
  2. `Assets/Matkakirja/Scripts/Peli/PuluRealtime.cs`: token UnityWebRequestillä kuten `Puhe.cs SynteesiPyynto`
     (x-matkakirja-natiivi, User-Agent, x-pollo-kehittaja = Asetukset.PolloKoodi) → {token, osoite, enintaanS, istunto};
     ClientWebSocket `Authorization: Bearer <token>` (tarkista docs.x.ai ephemeral-tokens); `session.update` istunnon RAAKA-JSONilla;
     tapahtumat kuten web `js/pulu-realtime.js kasittele`; toisto striimaavalla AudioClipillä (24 kHz) Puhe.cs:n lähteen
     mixer-ryhmään; lopetus napista / chatin sulku / OnApplicationPause / enintaanS.
  3. `Assets/Matkakirja/UI/Pulu/PuluChat.cs`: nappi "Puhu Pululle (koe)" vain kehittäjätilassa (Asetukset.Kehittaja &&
     PolloKoodi), tilatekstit kuten web `REALTIME_NAPPI_TEKSTIT`; PIDÄ MUUTOS PIENENÄ — Natiivi-UI työstää samaa tiedostoa
     (natiivi-ui/pulu-puhekeskustelu e9b54e55 + natiivi-ui/pulu-virkevirta).
  4. Kehittäjäkomento `pulu realtime paalle|pois|tila`; Peli-testit puhtaalle logiikalle; `kaanna.sh` + `unity-tarkistus.sh` 0.
  5. Käännös `/Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh pelikoodari/pulu-realtime <oma UDID>`, simulaattorissa
     token/WebSocket/session.updated/append-laskuri; puhe-edestakainen laitteella omistajalla. Merge-pyyntö Natiivisepälle +
     SHA Fablelle ja Natiivisepälle.
- Web-malli: main `js/pulu-realtime.js`, `js/pollo.js vaihdaRealtime`, `tools/pollo/realtime-koe.mjs` (toimiva Node-asiakas).

## 1. JUNASSA / JULKAISIJALLA

| PR | Sisältö | Huom |
|---|---|---|
| #3517 ihme kuvana | ennallaan | ihme-lyhyt odottaa tätä |
| #3526 astronautin kuvaselain | ennallaan | selite-erä + ISS-kyyti odottavat tätä |
| #3528 katkaisija, #3532 kulmanauha | ennallaan | |
| #3535 aloituslennon vaskimarssi A | web; natiivi 8409b0a6 Natiivisepän junassa | omistajan valinta |
| #3537 lukijan valikko | niputuskorjaus 16e48b5f2 (suljeLukijanValikko) | kappaleet 1 rivillä, kelaus alimpana, latausrengas, ulosnapautus nielee eleen |
| #3540 nostot/nimet häipyvät pehmeästi | 220 ms smoothstep, kutsun asentolukko | Natiivi-UI:lle mitat |
| #3541 maan nimiset kaupungit (Geysir) | Natiivi-UI teki natiivin 25215c25 | |
| #3544 Pulun äänikeskustelu xAI (koe) | **MERGED**, Pöllö julkaistu (Pages vielä v2353 klo 12.5x) | selainsavuke 7/7 oikeaa xAI:ta vasten |
| #3546 puhekeskustelu sanelusta | Kuuntelen → Mietin → "Puhun… napauta mikkiä, jos haluat keskeyttää" → TYHJÄ, mikki hiljentää | Natiivi-UI e9b54e55 (ilman virtaluentaa, suositeltu virta) |
| #3547 Pöllön kehote välimuistiin | 0,034 → 0,009 $/vastaus mitattu | pollo-julkaisu mergen jälkeen |
| #3553 worker realtime natiiville | etusija | pollo-julkaisu mergen jälkeen |

## 2. ODOTTAA MERGEÄ

- **Selite-erä** `pelikoodari-astro-selite` f9bc7c9a6 → PR kun #3526 mainissa (rebase, versio, niputus).
- **Ihmekuvan lyhyt kuvateksti** `pelikoodari-ihme-lyhyt` 2c265743d (#3517:n päällä) → PR kun #3517 mainissa. Kuva `proto-3d/lokit/ihme-lyhyt/`.
- **ISS-kyyti web** `pelikoodari-iss-kyyti` 83ff36a52 (astro-selite-haaran päällä): savuke 34/34, testit 24/24, kuvaparit
  `proto-3d/lokit/iss-kyyti-web/`. Fable kuittasi todellisen nopeuden myös kaukonäkymään. PR selite-erän jälkeen.

## 3. ISS-KYYTI VALMIS HAARASSA (891958e17), ODOTTAA

Tehty: nopeutus LIVE·10×·100×·1000× + Palaa LIVE, "Lennä kohteen ylle" (25 Euroopan NASA-kohdetta, SGP4 seuraava ylilento
500 km raja, kelaus, 'kohde'-tila vinokuva), Siirtosepän koukut (SHA ilmoitettu), turva-alue, NASA-kuvakoe 3 kohdetta
(`?koe=nasakuva`, kuvaparit `proto-3d/lokit/iss-kyyti-web/nasa-koe/` → OMISTAJAN ARVIO odottaa). Linssisepälle natiiviohje
lähetetty. PR vasta kun #3526 + selite-erä mainissa. Auki: Cupola2-kuvat (vakio CUPOLA_VERSIO), kehysaika laitteella,
savuke-astro-pallo ajamatta (todellinen nopeus avauksessa, Fable kuittasi todellisen nopeuden).

Alkuperäinen tilaus (tehty):

Omistaja 12.1x: nopeutuskahva 1×/10×/100×/1000× (LIVE-pilleri → kerroin, "Palaa LIVE"), "Lennä kohteen ylle" (Eurooppa, SGP4:n
seuraava todellinen ylilento, kelaus, vinokuva), KOE: NASA-kuva piirretyn pallon tilalle 3 kohteessa → kuvapari Fablelle.
Lisäksi Siirtosepän realismikoukut (realismi.rakenna/paivita(simuloitu ms)/pura, YOKUOREN_JARJESTYS, kaari.aurinko()) ja
Linssisepän turva-alue (pilleri ja ✕ safe-area + 10 px). Valmistuttua: raportti Fablelle, SHA Siirtosepälle, natiiviohje +
kuvat Linssisepälle, Cupola2-vakio kun Linssiseppä ilmoittaa kuvat.

## 4. MUUT

- Opit: taskpolicy -b rikkoo headless-selaimen mikrofoniäänen (audiosäie) → mikki-savukkeet `nice -n 10`; realtime- ja
  puhekeskustelusavukkeet ajavat workerin prosessissa oikeita avaimia vasten (`~/.matkakirja-avaimet-koodaus.zsh` + `~/.zshrc`).
- Worktreet: ihme-lyhyt, iss-kyyti ja proto-pelikoodari-pulu-realtime; muut poistettu (pushattu).
- Natiivi-UI: puhekeskustelu natiiviin tehty (e9b54e55) + virkevirta (katselmoitu, korjattu LopetaVirta); Geysir 25215c25.
- Julkaisija: kevyt tila pois 12.43 → raskaat ajot nice -n 15 täysillä ytimillä.
