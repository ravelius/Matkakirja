# Päätoimittajan luovutus 19.10.2026 klo 16.21 (oma nollaus, konteksti 30 %)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. KK local_8e4fcfed-fc40-464c-854a-1d031b005332. Id:t /Users/Shared/Claude/osoitekirja.md.
Edellinen: viesti-fable-luovutus-20261019-1525.md (käsitelty kokonaan). Asemataulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy.

## 0. HETI ALUSSA
1. Monitorit: odottajat-vahti.py ja codex-posti-vahti.sh (30 min, uudelleen). Edellinen vuoro unohti ne alussa → Codex-toimitus odotti 32 min.
2. Codex-posti: odotetaan TUMMAN taustan versioita aarre-middleeast-star.jpg ja aarre-northamerica-star.jpg (tilaus 99769ad3f). Pergamenttiversiot a90ac0160 kuitattu sisällöltään, mutta pelisarjan tausta on tumma (PT:n virhe tilauksessa). Tarkista täysikokoisina + sarjavertailu → SK/PK kytkee kuvat (js/packs middleeast/northamerica `kuva:`) ja ämpäriin.
3. Oseanian höyhenviittatilaus PERUTTU (a3cd79aad → peruutus 199c2146d); jos Codex toimittaa sen silti, älä käytä.

## 1. Omistajan päätökset tässä vuorossa (kaikki kirjattu ja mergetty)
- J2 15.23 tilaukset → Raamattu 12.24 KÄYTÖSSÄ OLEVAT TILAUKSET, 11.5, 5.20; ElevenLabsin ja Codexin taso/voimassaolo PUUTTUU 12.24:stä (täydennä kun tieto löytyy).
- 15.32 tavoitteen muoto putkittain → 4.21 + jokaisen tuotantopohjan alku.
- 15.35 keskeneräiset pohjat + junan retrospektiivi → 8.1/8.2. Opit siirretty pohjiin #4972 (25 oppia). Pohjattomat opit: kamera, UI, 2D-kuvat, äänitehosteet/maisemat, 3D-sali → pohja tehdään kun putkea seuraavan kerran käytetään. JUNAN 204 JÄLKEEN PT kokoaa retrospektiivin omistajan löydöksistä.
- 15.36 äänimaisemat sokkona (5.27) + CC BY-SA sallittu (11.1).
- 15.39 Oseania höyhenviitta → PERUTTU 15.42 (aarteiden on oltava löytymättömiä). Sama vika Afrikassa (Zimbabwen linnut löydetty) ja Etelä-Amerikassa (Muiscan lautta 1969). KK tutkii korvaajat → omistajan kortti. ÄLÄ muuta näitä kolmea ennen sitä. SK:n paikallinen haara sk-oseania-viitta jää pushaamatta.
- 16.1x omistajan kysymys "suurin osa levossa?" → SWAP-rajoitus purettu, JU ajaa 2 käännöslinjaa (paluu yhteen jos kuorma > 100 tai levy < 30 Gi); Asemataulun roolivientiin tila "odottaa käännösvuoroa" (Postivahti).

## 2. Merget tässä vuorossa
#4966, #4967, #4971 (Raamattu J1–J4 + Oseania-peruutus), #4972 (opit pohjiin), #4973 (BY-SA-kuvat H4-kello, Absalon), #4974 (uusi-linssi-pohja; #4771 suljettu), #4975, #4976, #4977, #4978 (merge vihreänä, taustaseuranta — tarkista `gh pr view 4978`).

## 3. Juna 204 PIDOSSA (ei lukitusta ennen "OMISTAJA PYYSI JULKAISUA"; lukituksen jälkeen Laitetestaaja ennen ulkoisia, 9.11)
- Runko NS 928c05077 VIHREÄ (Linssit 2135, Peli 632, Kartta 517). Mukana: LS museo + kysy, VS nostokortti 5ffefb69e, NUI valikko-204 348fa6b76, kehysvarjo.
- PT kuittasi, odottaa NS:llä: Lavastajan kehyssävy-204 429cb6099 (kulta).
- Odottaa: PK kuvalahde-linkki f90444f85 (BY-SA-linkki lähderiville; kuvat PT:lle käännöksen ~17.45 jälkeen), PK aanet-204, VS x-sulku-reuna-204 3c17f1f32 (8 pt), LS Kysy-✕ 36 px aa19d8ec7 ennen/jälkeen (JU:n jono ~17.00), NUI valikko-jatko-204 0f1f3a757 (aarteen otsikko "EUROOPAN AARRE" + nimi, palstaleveys) + kulta-nappi Perusta/Liity + 1. nimimerkki esivalittuna (PT:n päätös) → kuvapari + tuore lukija.

## 4. Roolien erät
- Äänittäjä: 6 pallokierrossilmukkaa sokkona → 1 OK (Ateena kaskaat), 5 uusintaan Soundlysta (levyltä 0/14). Raakatiedostot NAS:lle heti. Tulos PT:lle kun Gemini hyväksyy kaikki.
- SK: jono tyhjä (#4978 viimeinen) kunnes omistaja päättää 3 aarretta.
- Työkaluseppä: tests/tuotantopohjat.test.mjs (4.21:n automaattinen pohjatarkistus) + SHA-listalöydös → PR PT:lle.
- Karttaseppä: TÄYDENTÄÄ: Karttaseppä -osiot 3d-maamerkki, kuumailmapallokierros, paakaupungin-avaus → PR PT:lle.
- Lavastaja: kehyksen kiilto omana eränään (ennen/jälkeen) + skenaarion SK-C-6-osuma.
- VS: "(1/1)" piiloon kun nostoja yksi (seuraava erä); ✕-reuna NUI:n kanssa.
- PK ja LS nollattu tässä vuorossa (luovutukset 71a05d1fa, 618aaf997).
