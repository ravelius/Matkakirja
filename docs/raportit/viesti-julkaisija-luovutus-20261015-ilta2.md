# Julkaisijan luovutus 15.10.2026 klo 18.1x (PT:n pyyntö)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -60). Edellinen: `viesti-julkaisija-luovutus-20261015-ilta.md`.
Asemataulu (TÄMÄ TILI): https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm. Osoitekirja /Users/Shared/Claude/osoitekirja.md.

## 0. UUDET OPIT
- **Omistaja 17.24: juna 195 vasta hänen pyynnöstään** (ei lukitusta, käännöstä, TF:ää, osoitinvaihtoa). PT 17.3x: ämpärivienti
  UUSIIN polkuihin on sallittu (ei näy pelissä). Roolien kehityskäännökset/simuajot sallittuja.
- **Simulaattorit ovat vain T7-sarjassa**: skripti ilman `source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh || exit 2`
  → "Invalid device" (sisäinen sarja tyhjä). Roolien kuvaskriptit: aja `source simusarja.sh; source <skripti>` (ks. valoseppa-peking196-kuvat.zsh).
- **Massavienti**: `julkaisija-tyokalut/vie-paketti-massa.zsh <paketti> [64]` isoille paketeille (vie-paketti.sh ~1–2 s/tiedosto).
  Ajaa vie-paketti --kuiva -portit, vaatii tyhjät kohde-etuliitteet (4 segmenttiä), aws cp --recursive tyypeittäin, lopuksi määrä +
  CDN-otos 200. **Katkennut ajo: `JATKA=1 vie-paketti-massa.zsh <paketti>`** (sync --size-only). Kuiva-vaihe 611k tiedostolle ~25 min.
- SHA256SUMS ei saa sisältää LAHTEET.md:tä (vie-paketti hylkää .md-tyypin) → poista rivi (tehty SK:n historiakuville).
- Osoitekirja: roolit eivät viesti Keskustelukanavalle → sisäinen-ilmoitus vain PT:lle.
- Peking: omistaja 17.18 piilotettu testikaupunki vain omistajalle (Valoseppä, juna 196); muuten Peking OFFGAME.

## 1. Juna 194 – VALMIS 5/5
Vienti 38743063789 ✓ 17.05 (v745 = 100b07b42; CDN: tarinakaari 18/18 -v3 200, #4620 Granada-teksti) → TF 38749089375 ✓ 17.19 →
sisäinen 38750417306 ✓ 17.25 → beta-arvio hyväksytty + ulkoinen 17.26 → vanhennus 193 (iOS + Mac) ✓ 17.27. PT kuitattu, Asemataulu eteneminen "valmis".
Mac-TF: NS (ilmoitettu 17.11).

## 2. KESKEN
- **pallo-lohkoton-vienti-20261015 (KS, PT KYLLÄ 17.29)**: massavienti käynnissä 17.48 alkaen (loki
  julkaisija-tyokalut/massavienti-pallo-lohkoton.log). 18.05: 140 556 / 577 838 laattaa → arvio valmis ~19.20 (+ kerma 33 838 + tarkistus).
  Jos nollaus katkaisi (ei prosessia `pgrep -f vie-paketti-massa`, lokissa ei "MASSAVIENTI valmis"): `JATKA=1 /Users/Shared/Claude/julkaisija-tyokalut/vie-paketti-massa.zsh
  /Users/Shared/Claude/proto-3d/_valmiit/pallo-lohkoton-vienti-20261015 64` taustalle. Valmis → kuittaa **KS:lle** (siirtää T7:lle; ruudukko bfe2b2300
  junaan 195) + PT. Ei osoitinvaihtoa.
- **Valoseppä laukaisusavu-195** (PT, omistajan TF 194 -palaute 17.52): valoseppa-savu195.zsh = L2-käännös ea179a2e9 + todistusajo
  savu17-ipad A26BC7D0 (loki proto-3d/lokit/valoseppa-savu195-ajo.log). Jos katkesi, aja skripti uudelleen. Kuittaa Valosepälle todistuskansion polku.
- **PR #4636** bf177452f (historia_yksityiskohdat_polut Praha/Ateena/Kööpenhamina): junaan 195, merge vasta OMISTAJA PYYSI JULKAISUA.

## 3. Tänään iltapäivällä tehty
Louvre v1c Google (uusinta), v2, v2b, v2c, v2d, v2e -parit Valosepälle (A26BC7D0). Peking-testi 196: L2 dda9e145f + kuvat
lokit/valoseppa-peking-testi/ (omat mallit 404 → Ion-kaupunki). Linssiseppä: kulmat195 + historia195 simut, L2 kierrokset-195,
ateena-v10 VIETY 1/1. Pelikoodari L2 aloituskone-195 + simu. Historiakuvat Praha/Ateena/Kööpenhamina VIETY 45/45.
Asemataulu v4: Kulutus-palkit + järjestys viisi_h (omistaja 17.0x), PT kuitattu.

## 4. Linjat nyt
L1 vapaa. L2: Valosepän savu-käännös. Simut: A26BC7D0 savu-todistusajo perään; 00CF62C2, 39644E75 vapaat. Cron 04.03 NAS-bundle (session-only) → luo uudelleen.
