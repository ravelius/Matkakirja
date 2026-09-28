# Pelikoodarin luovutus 28.9.2026 klo 12.3x (-b)

Jatkoa luovutukselle `-20260928`. Fable = session id local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, NIMI nyt
**"Päätoimittaja (Opus, xhigh)"** (kaksi samannimistä → SendMessage refillä `[e6550e]`, paikallinen). Julkaisija, Natiivi-UI,
Natiiviseppä, Linssiseppä, Siirtoseppä NIMELLÄ. Omistaja käyttää Macia klo 17 asti: yksi agentti kerrallaan, vain kohdennetut
testit `nice -n 15`, ei koko sarjaa, ei suorituskykysavukkeita. `tools/tarkista-niputus.mjs` ennen jokaista PR:ää (#3537 kaatui
nimitörmäykseen). Pakkopush estetty → rebasetun haaran PR `…-2`-haarasta.

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
| #3544 Pulun äänikeskustelu xAI (koe) | **MERGED** → pollo-julkaisu Julkaisijalla | selainsavuke 7/7 oikeaa xAI:ta vasten |
| #3546 puhekeskustelu sanelusta | Kuuntelen → Mietin → Puhun, mikki hiljentää | Natiivi-UI e9b54e55 (ilman virtaluentaa, suositeltu virta) |
| #3547 Pöllön kehote välimuistiin | 0,034 → 0,009 $/vastaus mitattu | pollo-julkaisu mergen jälkeen |

## 2. ODOTTAA MERGEÄ

- **Selite-erä** `pelikoodari-astro-selite` f9bc7c9a6 → PR kun #3526 mainissa (rebase, versio, niputus).
- **Ihmekuvan lyhyt kuvateksti** `pelikoodari-ihme-lyhyt` 2c265743d (#3517:n päällä) → PR kun #3517 mainissa. Kuva `proto-3d/lokit/ihme-lyhyt/`.
- **ISS-kyyti web** `pelikoodari-iss-kyyti` 83ff36a52 (astro-selite-haaran päällä): savuke 34/34, testit 24/24, kuvaparit
  `proto-3d/lokit/iss-kyyti-web/`. Fable kuittasi todellisen nopeuden myös kaukonäkymään. PR selite-erän jälkeen.

## 3. KESKEN (agentti a34282f… samassa haarassa pelikoodari-iss-kyyti)

Omistaja 12.1x: nopeutuskahva 1×/10×/100×/1000× (LIVE-pilleri → kerroin, "Palaa LIVE"), "Lennä kohteen ylle" (Eurooppa, SGP4:n
seuraava todellinen ylilento, kelaus, vinokuva), KOE: NASA-kuva piirretyn pallon tilalle 3 kohteessa → kuvapari Fablelle.
Lisäksi Siirtosepän realismikoukut (realismi.rakenna/paivita(simuloitu ms)/pura, YOKUOREN_JARJESTYS, kaari.aurinko()) ja
Linssisepän turva-alue (pilleri ja ✕ safe-area + 10 px). Valmistuttua: raportti Fablelle, SHA Siirtosepälle, natiiviohje +
kuvat Linssisepälle, Cupola2-vakio kun Linssiseppä ilmoittaa kuvat.

## 4. MUUT

- Opit: taskpolicy -b rikkoo headless-selaimen mikrofoniäänen (audiosäie) → mikki-savukkeet `nice -n 10`; realtime- ja
  puhekeskustelusavukkeet ajavat workerin prosessissa oikeita avaimia vasten (`~/.matkakirja-avaimet-koodaus.zsh` + `~/.zshrc`).
- Worktreet: ihme-lyhyt ja iss-kyyti; muut poistettu (pushattu).
