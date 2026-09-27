# Laitetestaajan lyhyt luovutus (27.9.2026 klo 23.5x, tilinvaihtoa varten)

## Tila

Tänä iltana/yönä ajettu kaksi PASS-kierrosta täydellä lokilla:
- **1.0.32** (juna/b13 4be1a696): PASS 7/7, 0 poikkeusta.
  `docs/raportit/savukierros-tf1032-20260927.md`.
- **1.0.33-julkaisukierros** (juna/b13 508761e8): PASS 4/4, 0 poikkeusta (luenta ilman
  ohituksia/taukoa, Ateenan kuvakortti vakaa levossa, kartta ehjä 1.0.32→1.0.33-päivityksen
  jälkeen, äänenvaihto Aino→Aamu vaikutti oikeasti puhepyyntöön `kertoja|aurora|...`).
  `docs/raportit/savukierros-tf1033-julkaisu-20260927.md`.

Aiemmin illalla myös offline-verkkokatko-tutkimus (aito katko ei mahdollinen simulaattorilla,
löydös offline-pilleristä → Natiivi-UI korjasi: `natiivi-ui/offline-pilleri-levossa 50a83b9e`)
ja iPhonen vaakatilan "kiertobugi" -epäily kumottu (debug-komennon oma artefakti, ei oikea bugi).
`docs/raportit/savukierros-tf1031-offline-20260927.md`.

## YÖTAUKO käynnissä (Fable, klo 22.30 alkaen)

Kaikki simulaattorit (1572C658, 3B4CDACB, C1D5E34C, 993F8873) sammutettu UDID:llä. Ei ajoja
Karttasepän polton ajan. **Poikkeus:** omistaja 23.58 pyysi **BUILD 34:n** (1.0.33 + pelkät
puhetagit, "vain striimiluenta julkaisuun") — Natiiviseppä lähettää SHA:n kun valmis.

## Jono seuraavalle sessiolle

1. **Odota Natiivisepän SHA BUILD 34:lle.** Kun se tulee: lyhyt puhe-PASS omalla 1572C658:lla
   (ancestor-tarkistus ensin) — tarkista **kappalejako/tauot kuuluvat oikein, Pulun persoonatagi
   toimii, tagitekstejä (esim. äänen nimi/koodi) EI lueta ääneen, luenta jatkuu ilman ohituksia**.
   Sama kaava kuin 1.0.33: `ui nosto skandaali:shakkiturkkilainen` (säilötty teksti) + kaiutin
   (`mk-lukija__kaari`, ui puu antaa koordinaatit), `puhe palat`/`puhe: pala` -lokirivit todisteeksi.
2. Tulos → Julkaisijalle + Fablelle (max 8 riviä).
3. Muutoin yötauko jatkuu aamuun (Karttasepän poltto).

## Muistettavaa

- **Puheen xAI-kulutus rajattu** (Fable 27.9. ~18.0x): säilötyt tekstit + oletusääni,
  ≤5000 mrk/vrk per rooli. `ui offline avaus/lataa`, `ui livia avaus` jne. eivät kuluta xAI:ta —
  vain `ui chat`/`puhe lue` (uniikki teksti = uusi synteesi).
- **Konsolit**: `peli-komento.txt` (peli), `ui-komento.txt` (UI), `linssi-komento.txt` (linssit),
  `komento.txt` (kamera/maasto/**alue lataa/tila** — HUOM tämä EI ole peli-komento.txt:ssä).
- Fable: local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, Natiiviseppä: local_04e2850b-d63c-481d-be73-c7d784a7cbcb
  (tarkista uuden session aloitusviestistä, id saattaa vaihtua tilinvaihdossa).
- Peer-viestien ~10/vuoro-raja: käytä `mcp__ccd_session_mgmt__send_message` varakanavana.
- Kaikki tänään opitut komennot/sudenkuopat: `docs/raportit/laitetestaaja-reseptit.md`.
