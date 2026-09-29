# 1.0.42-yhdistelmä 25c7c971 — radiolinssi (Laitetestaaja, 29.9.2026 klo 06.4x-06.5x)

Käännös 25c7c971 (juna/b13 76f6f422 = BUILD 42 + Linssiseppä 2:n radiolinssi 9ee9136e),
laite 1572C658 (iPhone). Natiivisepän pyynnöstä, kohdat 1-4. EI TESTATTU iPadilla.

## 1) Asennus ja käynnistys: PASS
Puhtaasti, ei virheitä.

## 2) Radiolinssi: EI PASS (löydös: ei kuuluvaa äänta)
`linssi radio` (linssi-komento.txt) avaa Codexin radio-UI:n oikein: mastot ja signaalirengas
piirtyvät, asteikko näyttää "ROOMA" keskellä, näyttö "RAI RADIO 1 / ROOMA · ITALIA" oikein.
Tarvitsee napautuksen "ROOMA"-tekstin kohdalle asteikossa (ei automaattista viritystä) —
koordinaatti löytyy `ui puu`:sta luokalla `mk-radio__kaupunki--keski`. Linssi-loki etenee oikein:
"Viritys/Haku" → "Viritys/Lukittuu" → "Soi ITA Rooma Rai Radio 1", yhteys muodostuu (kuuluu
~1000 ms, uusi yhteys).

**MUTTA `aani mittaa` näyttää rms=0,00000, soivia 0 koko ajan** — testattu kahdesti eri
sessioissa, yli 2 min odotuksella kummallakin kerralla, sama tulos. Samassa sessiossa
nostokortin kaiutin (mk-lukija__kaari) toimi normaalisti (rms 0,125) — mittaustyökalu on siis
luotettava, radiosta ei vain tule oikeaa äänta.

Kuva: `docs/raportit/kuvat/radiolinssi-25c7c971-hiljaa.png`.

## 3) Radion sulku: PASS (ei todistava, ks. huomio)
`linssi pois` sulki siististi ("Hiljaa" → "auki: ei mitään"), ei poikkeuksia peli-/ui-lokissa.
Hiljeneminen on kuitenkin triviaalia koska äänta ei alun perinkään ollut — ei todista varsinaista
mykistys-toiminnallisuutta.

## 4) Astroselite + nostokortin kaiutin: PASS
`ui linssi kuvaselite auki/kiinni/tila` liukuu pehmeästi (146x27 → 326x144, ~2 s), luenta jatkuu
automaattisesti. Nostokortti (Delfoi) LISÄÄ + oma kaiutin: rms 0,125, kortti pysyi auki.

## Yhteenveto
1, 3, 4 PASS. 2 EI PASS: radiolinssin UI/mastot/renkaat/viritys täysin oikein, mutta ei todellista
ääntä (rms=0). Linssiseppä 2 ajaa kontrollimittauksen BUILD 41:llä radion rms=0-löydökselle —
uusinta tässä roolissa odottaa hänen/Julkaisijan tietoa.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
