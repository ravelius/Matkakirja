# Laitetestaajan luovutus 29.9.2026 klo 06.5x (kontekstinvaihto, Päätoimittajan pyynnöstä)

Haara laitetestaaja-savukierros-b13. Omat simulaattorit: iPhone 18 Pro
1572C658-6455-4E55-8C05-3F88CB3C32F6 ja iPad 3B4CDACB-CCBE-42EC-809D-FB4D0B43CC7D — **molemmat
Shutdown**, ei booted-laitteita.

## LUE ENSIMMÄISENÄ — kärki: 1.0.42-yhdistelmän radio-löydös
Viimeisin savuke **1.0.42-yhdistelmä (25c7c971, juna/b13 76f6f422 = BUILD 42 + Linssiseppä 2:n
radiolinssi)**, Natiivisepän pyynnöstä (kohdat 1-4), on AJETTU iPhonella ja tulokset ilmoitettu
Natiivisepälle+Julkaisijalle viestillä, mutta **ei vielä kirjoitettu omaksi raporttitiedostoksi
docs/raportit/:iin** — tee se ensimmäisenä jos Natiiviseppä ei ole jo reagoinut löydökseen.

- **1) Asennus+käynnistys: PASS.**
- **2) Radiolinssi: EI PASS.** `linssi radio` (linssi-komento.txt) avaa Codexin radio-UI:n oikein:
  mastot ja signaalirengas piirtyvät, asteikko näyttää "ROOMA" keskellä, näyttö "RAI RADIO 1 /
  ROOMA · ITALIA" oikein. Tarvitsee napautuksen "ROOMA"-tekstin kohdalle asteikossa (ei
  automaattista viritystä) — koordinaatti löytyy `ui puu`:sta luokalla `mk-radio__kaupunki--keski`.
  Linssi-loki etenee oikein: "Viritys/Haku" → "Viritys/Lukittuu" → "Soi ITA Rooma Rai Radio 1",
  yhteys muodostuu ("kuuluu ~1000 ms, uusi yhteys"). **MUTTA `aani mittaa` näyttää rms=0,00000,
  soivia 0 koko ajan** — testattu kahdesti eri sessioissa, yli 2 min odotuksella kummallakin
  kerralla, sama tulos. Samassa sessiossa nostokortin kaiutin (mk-lukija__kaari) toimi normaalisti
  (rms 0,125) — mittaustyökalu on siis luotettava, radiosta ei vain tule oikeaa ääntä. Kuva:
  docs/raportit/kuvat/radiolinssi-25c7c971-hiljaa.png. **EI TESTATTU vielä iPadilla.**
- **3) Radion sulku:** `linssi pois` sulki siististi ("Hiljaa" → "auki: ei mitään"), ei
  poikkeuksia peli-/ui-lokissa. Hiljeneminen on kuitenkin triviaalia koska ääntä ei alun perinkään
  ollut — ei todista varsinaista mykistys-toiminnallisuutta.
- **4) Astroselite + nostokortin kaiutin: PASS.** `ui linssi kuvaselite auki/kiinni/tila` liukuu
  pehmeästi (146x27 → 326x144, ~2 s), luenta jatkuu automaattisesti. Nostokortti (Delfoi) LISÄÄ +
  oma kaiutin: rms 0,125, kortti pysyi auki.

**Seuraavaksi:** kirjoita raportti (esim. `docs/raportit/savukierros-1042-radio-20260929.md`),
committaa+pushaa, ja aja sama radio-tarkistus iPadilla Päätoimittajan aiemman kaavan mukaan (ks.
alla "iPad-stressitesti"-kohta) jos Natiiviseppä/Julkaisija pyytävät.

## Aiemmat tässä sessiossa tehdyt kierrokset (kaikki jo raportoitu ja pushattu)
- 1.0.40 (60f69fe4→1ad1c538 uusinta): perussavuke, syväsavuke A/B/C, iPad-stressitesti
  (RETRAKTIO: ensimmäinen kaiutin-FAIL oli väärästä UI-elementistä — oikea `mk-lukija__kaari`
  antoi 20/20/20 PASS, 0/60 sulkeutumista). Raportit: savukierros-1040-*.md,
  ipad-nostokortti-korjattu-20260929.md.
- 1.0.41 (e434161d): iPhone-savuke PASS (Cupola3, maakuntakortti, Visby/Krumlov-nimiöt).
  Raportti: savukierros-1041-20260929.md.
- 1.0.41-laajakierros (46ffc622, Päätoimittajan tilaus): iPad-täydennys PASS — Cupola3 iPad
  (pyöreä ikkuna keskellä, lippu näkyy), maakuntatila v2 iPad (rajat, kokoruutu, poisto),
  Visby+Birka-nimiöt. Raportti: 1041-laajakierros-ipad-20260929.md.
- 1.0.42 (46ffc622, sama käännös eri kohdat): astroselite auki/kiinni + kertoja+hush + yleissavuke,
  kaikki PASS. Raportti: savukierros-1042-20260929.md.

**TÄRKEÄ MENETELMÄMUISTUTUS (opittu kantapään kautta tässä sessiossa):** kun sama luokannimi
(esim. `mk-kaiutin__osa`) esiintyy useassa UI-paikassa (yleinen matkakirja-paneeli JA nostokortin
oma lukijarivi), pelkkä luokka ei riitä kohteen tunnistamiseen ennen napautusta — tarkista aina
lisäluokka (esim. `mk-lukija__kaari`) tai sijainti suhteessa muihin tunnettuihin elementteihin
(`mk-lukija__valikkoikoni`) `ui puu`:sta ENNEN napautusta. Väärä kohde voi näyttää siltä kuin
kortti "sulkeutuisi" napautuksesta, kun todellisuudessa napautus vain osui taustaan.

## Viestikanava
Fable (Päätoimittaja): local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (tarkista ettei vaihtunut).
Julkaisija: local_24e63224-112c-449a-b6a3-e10e4ed43f4b. Natiiviseppä: local_fcc10552-5810-49bf-
b0cf-188456f1231c. Natiivi-UI: local_c6d63773-0270-4873-96f8-63c66cf52794.
**SendMessage-raja (~10/vuoro) täyttyy usein tässä roolissa** — kun se sanoo "paused", käytä
VARAKANAVAA `mcp__ccd_session_mgmt__send_message` (session_id = vastaanottajan local_-id, EI
nimeä, paitsi jos id ei toimi kokeile nimeä).

JUMI → FABLE: ei AskUserQuestion-korttia; viesti Fablelle ja jatka muuta.
Vain valmis kierros, jumi tai kysymys Fablelle, enintään 8 riviä.

Ensin uudessa sessiossa: kuittaa Fablelle yhdellä rivillä, tarkista juna.log
(`/Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log`) ja odota kutsua seuraavaan
savukierrokseen.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
