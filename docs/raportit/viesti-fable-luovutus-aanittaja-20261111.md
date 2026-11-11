# Äänittäjä: luovutus 11.11.2026 (kontekstivahti 34 %)

Haara koti/Matkakirja-aanittaja, commitit 5e919c8bc ja d739aa8c3 (ei vielä mainissa; PT/JU yhdistää). Työkansio: /Users/Shared/Claude/proto-3d/_tyo/kaupunkinimet-william-20261111/ (raaka.json, fa.json, leikkaa4.py, gemini-tulokset4.json, vaduz2/).

## Valmis
- 61 kaupungin nimi + iskulause William-ääni, YKSI otto 08.42 (eleven_v4_turbo, style 0, fi pakotettu), leikattu kaupungeittain (nimi, nimi-iskulause). Vaduz uusinta (KK:n lupa, "Reinin laaksossa"). Media VIETY: aanet/kaupunkinimet-william-v2/<id>/… (v1 vanhoilla reunoilla EI käytössä, ämpäri muuttumaton).
- Kytkentä haarassa: js/packs/saapumispuheet.js (William, SAAPUMISPUHEET_NIMET erikseen), iskulauseet.js +16, tests/saapumispuhe-aineisto.test.mjs. Isoisän tiedostot jäävät levylle (PT: ei poistoja). Sisältöpaketin skeemaa EI laajennettu (nimi erikseen vain jos NS pyytää).
- Raportti: docs/raportit/aanittaja-kaupunkinimet-william-20261111.md. NS käyttää v2-URL:eja (saapumiskoe Pariisi).

## Avoinna
1. KK:n tarkistus uusinnan ja v2:n raportista (viesti jonossa 10.5x). valletta/nimi: Gemini aikakatkaisi, ei tulosta (aaltomuoto kunnossa).
2. Haaran yhdistys mainiin (PT/JU) ja pelissä tarkistus, että trailer soittaa url:n (nameUrl-kenttiä ei enää ole).
3. KENKÄLEIMA (PK:n tilaus 10.11., juoksupeli LeimaAaniUrl): ehdokas Soundly Pro "Footsteps, Human, Boot, Soldier, Single Stamp" (valittu, ei vielä viety). Soundlyn File > Send to Folder ei toimi taustaohjauksella (app_menu ei tuota tiedostoa; kohde /Users/Shared/Claude/proto-3d/_tyo/soundly-saapuvat/); tarvitaan kokoruudun ohjaus (request_full_control ei saanut vastausta kahdesti). Sitten Gemini-sokkokuuntelu (3× toisto alle 0,5 s), vienti aanet-vN/hahmo/kenka-tomahdys-1.mp3, URL + kuvaus PK:lle local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7. NAS:n Soundly-originaaleista ja Sonnissista ei löytynyt sopivaa yksittäistä tehostetta.

## Kenkäleima: tilanne 16.00 (omistaja salli kokoruudun 15.55, näyttö nyt vapautettu)
- Soundly (ajaa koodaus-käyttäjänä) auki, haku "footsteps human boot single stamp", rivi 1 "Footsteps, Human, Boot, Soldier, Single Stamp" valittu. Sekä File > Send to Folder että työkalupalkin nappi (oikea alakulma) EIVÄT tuota tiedostoa: preset-kansio on symlinkki T7:lle (/Volumes/T7 4TB/koodaus/proto-arkisto/_tyo/soundly-saapuvat; T7 97 % täynnä). Hylättyjä syitä: ei ikkunaa/virhettä näkyvissä.
- Kesken: File > Send to Folder > Add Folder… → "Send To Folder" -ikkuna → klikkaa kenttää → Open-ikkuna (Downloads valittuna sivupalkista) → Open → Save; sitten Send. Go to Folder -kenttään kirjoitus sotkeutui (täydennys); käytä sivupalkin Downloads/Desktop. Uusi tyhjä kansio olemassa: /Users/Shared/Claude/proto-3d/_tyo/kenka-saapuvat (sisäinen levy). UserNotificationCenter-ikkuna tuli eteen kesken (ei sallittu), siksi pysähdyin.
- Sen jälkeen: Gemini-sokkokuuntelu (3× toisto), vienti aanet-vN/hahmo/kenka-tomahdys-1.mp3, URL + kuvaus PK:lle (local_d3bb1f78…).

## Opit (kirjattava tekotapaan/Raamattuun PT:n kautta)
- ElevenLabsin with-timestamps-alignment on useita 0,3–0,9 s pielessä → leikkaus ELEVENLABSIN /v1/forced-alignment-kutsulla (multipart file + text, 200 OK) lähtöarvauksena ja rajat aaltomuodosta (hiljainen < −50 dBFS); tarkista reunat raakaotosta ennen vientiä.
- Gemini ei kuule < 0,5 s nimiä; 3× toisto arviointikopiossa. gemini-3.1-pro-preview vastaa hitaasti (10 rinnakkaista, aikakatkaisuja).
- aaniportti.py: ajettava /opt/homebrew/bin/python3:lla tai korjatulla venvillä (PK korjasi 11.11.).
- Raaka talteen heti (raaka.json); yksi otto = ei uusintaa ilman lupaa (ota.py kieltäytyy, jos raaka.json on).
