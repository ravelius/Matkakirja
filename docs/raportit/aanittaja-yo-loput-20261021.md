# Äänittäjän yöjonon loput kohdat (21.10.2026): 3, 16, 17, 22
## 3. Aukkohaku-ehdokaslistat
Askelnäytteissä aukkoja ei ole: kaikille käytössä oleville lattioille (parketti ×4, marmori, kivi_hiekka, sora) on oma sarja (`aanittaja-yo-lattiat-20261021.md`). Juoksupelin SFX-aukot: korvaushaku tehty (`aanittaja-juoksu-korvaukset-20261021.md`); jäljellä posliini 2/5. Sonniss-hakutyökalu `/Volumes/T7 4TB/sonniss/tyokalut/hae.py '<regex>' [max]` ja NAS:n 1 166 Soundly-originaalia riittivät metalli/portti/viitta-tarpeisiin; keramiikka vaatii Soundly-pilvihaun.

## 22. Askelsarjojen jäsenmäärä per lattia
Kaikilla sarjoilla 6 kuivaa + 6 salikaikuista askelta (parketti, marmori, kivi_hiekka, sora; v7). Portin raja (≥ 3 per perhe) täyttyy; toisto kuuluu aikaisintaan 7. askeleella kun soitto on satunnainen eikä samaa kahdesti peräkkäin. Pehmeä parketti v4 (20.10.) on yksi 22 s:n kävelylooppi (36 askelta), ei erillisiä askelia. Suositus: 8 askelta per lattia vasta jos omistaja kuulee toiston; ei tarvetta nyt.

## 17. Käännösäänen mittaussuunnitelma (museon askelkytkentä, taso 0,32×askel)
Mitataan pelin tallenteesta (PK/Laitetestaaja ajaa iPadin pelitallenteen, ääniraita irti):
1. Tallenna 30 s museokävelyä: yksi sali, yksi käännös, ei muuta ääntä (musiikki/kertoja pois).
2. `ffmpeg -i tallenne.mov -vn -ac 1 -ar 48000 raita.wav`; mittaa 400 ms:n hetkellinen LUFS askelten kohdalta ja käännösäänen kohdalta (`ebur128`, framelog).
3. Tavoite: käännösääni askeleen LUFS − 9,9 dB (0,32 ≈ −9,9 dB); poikkeama > ±2 dB → raportti PK:lle.
Äänittäjä ajaa mittauksen, kun PK toimittaa tallenteen (ei vielä saatavilla).

## 16. Tason 2 musiikit (juoksupeli)
Tason 2:n teema ja tunnelma puuttuvat (PT: "etsitään myöhemmin"; ei Lyria-kutsuja ilman lupaa). Valmiina menetelmä: Sonniss-/Freesound-CC0-ehdokkaat teemasanoilla (`hae.py`, `fs_haku.zsh` -malli `proto-3d/_tyo/juoksupeli-avaus-musiikki-20261020`), paikallinen AST + sokko-Gemini, valinta omistajalle. Käynnistyy heti kun PT antaa teeman (esim. "kiinalainen tori", "satama").
