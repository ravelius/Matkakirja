# Valosepän luovutus 3.11.2026 klo 01.45

Syy: konteksti 26 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261103-0045.md (pysyvät työtavat
-20261101-2124.md ja -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (03.11. 00.49–01.45).
Python: `_tyo/linssiseppa2/tulivuoret/venv/bin/python` (cv2, numpy).

## UUSI TYÖTAPA (PT ja JU 01.3x, sitova)
Käännös- ja esikatseluajot vain JU:n "ESIKATSELU NYT" -viestillä (pyyntö JU:lle: ajo, sha, kesto; valmiina "VAPAA" JU:lle).
Oma lukko-odotussilmukka ei riitä (viiva5 otti linjan 2 NUI:n edeltä). Parin puolet aina samasta kohdasta ja rajauksesta (PT 01.3x).

## TEHTY (kaikki PT:n kuittaamia kokeita, ei junaan)
- **Sarytševin vaalea viiva** korjattu: linssiseppa2/tulivuoret-sarja **3be61a0e3** (natiivi-backupissa). Syy: kuvan 9026
  NASA-kuvatunnisteen valkoinen kaista ("ISS020E009026", rivit 1684–1722 / 2048) osui maskin kovaan alareunaan (m ≤ 0,009).
  Edellinen päätelmä "uv.y = 1" oli kameran liikkeen harhaa. Rajaus viiva4:llä (e08d88cf6, testitilat 4–8): viiva katosi vain
  maskilla 0; NaN, mip 0 ja uv-puristus eivät vaikuttaneet. Kaista mustaksi 9026.jpg:ssä, testitilat pois.
  `tulivuoret/skriptit/leivo-sarja3.py`: kaista leikataan 60 px:n marginaalilla ja mustataan myös kuvista.
  Pari tulivuoret/viiva5/viiva-pari.jpg; PT 01.3x kuittasi.
- **Sateen hahmon varjo**: linssiseppa2/sade-218 **5ed5f95e2** (natiivi-backupissa). Leivotun valon hahmon varjon taso
  _JuoksuLeivonta.z → 1 (× 0,85 sateen voima, ValoKohteet.JuoksuSadeHahmoVarjo), JuoksuSadeVarjoK 0,3 → 0,1, varjokartan
  näytteet levitetään 3× (JuoksuSadeVarjoLevitys, _JuoksuMarka.w → JuoksuValo.hlsl JuoksuVarjo). Valovahti ok.
  Pari sade1/hv-pari.jpg (0 | 0,5 | 1); PT 01.4x kuittasi. Sade on valmis kokeena; junaan vasta sadeäänen laitetarkistuksen jälkeen.

## JONO (PT 01.4x; aidot NASA-kuvat kuten tulivuoret, kokeina, ei junaan, pari PT:lle kustakin)
Suunnitelma: `_tyo/linssiseppa2/SUUNNITELMA-ISS-ILMIOT-20261103.md` (lähetetty PT:lle).
1. **Salamat yöpuolella**: ISS:n yösarja Gatewaysta, välähdyksettömien kuvien mediaani pohjaksi, aidot välähdykset
   kuvaerotuksella maskeiksi nykyiseen SalamaSolut-ajoitukseen (Salamat.cs). Aloitettu: robots.txt tarkistettu 01.43
   (eol.jsc.nasa.gov sallii kaiken), kansio `_tyo/linssiseppa2/salamat-aito/` tyhjä. Hakutapa: kuten
   `tulivuoret/skriptit/hae-etna.zsh` (photo.pl → DatabaseImages large). Seuraavaksi: etsi sarja, jossa salamat välähtelevät.
2. Hurrikaani (ISS-silmäsarja, esim. Florence 2018 / Dorian 2019).
3. Pimennyksen varjo 12.8.2026 (kysymys PT:lle, jos 2026-kuvaa ei ole: ulkonäkö 2017/2024-kuvasta).
4. Tähdenlennot (Perseidit ISS-kuvista).
Etnan z2-pylväs: PT 01.4x "ei vielä".

## Worktreet (proto)
- wt/proto-linssiseppa2-seinat218: linssiseppa2/sade-218 5ed5f95e2.
- wt/proto-linssiseppa2-tulivuoret: linssiseppa2/tulivuoret-sarja 3be61a0e3 (salamat voi jatkua tässä haarassa tai uudessa).
