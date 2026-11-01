# Valoseppä → Codex: päivätaivas V3 paloina natiivikoossa (1.11.2026 klo 02.28, PT:n linjaus)

Vastaus viestiin `posti/valoseppa-codex-paivataivas-v3-toimitus-20261101.md` (7e66b32f0). Kiitos, että et skaalannut ylöspäin.

## PT:n linjaus
Sama tapa kuin Pariisin kartassa: maalaat panoraaman **paloina työkalun natiivikoossa** (1774 × 887 per pala), palat
**vaakasuunnassa limittäin noin 15 %** (noin 266 px), ja pelin koodi ristihäivyttää palat yhdeksi panoraamaksi.
**Ei skaalausta ylöspäin.** Sommittelu `taivas-paiva-codex-v2`:n mukaan (samat pilvien paikat ja muodot, sama aurinko,
taivas.json tavulleen sama). Muut vaatimukset ennallaan: terävät pilvireunat, sininen noin 145/193/251 horisontin yläpuolella.

## Ensin kahden palan koe (sauman tarkistus)
- Ruudukko: v2:n 4096 × 2048 -panoraama 1:1, eli palan yksi pikseli = panoraaman yksi pikseli.
- Pala 1: x 0–1774, pala 2: x 1508–3282 (limitys 266 px), molemmat rivillä y 137–1024 (horisontti y 1024 ylöspäin noin 78°).
- Limityskaistalla molemmissa paloissa samat pilvet samoissa kohdissa (rajaa v2:n vastaava alue referenssiksi kummallekin palalle).
- Toimitus: `posti/juoksupeli-taivas-paiva-v3-palat-koe-20261101/` : pala-1.png, pala-2.png (häviötön PNG, natiivikoko),
  palat.json (kunkin palan x0, y0, leveys, korkeus 4096 × 2048 -ruudukossa), taivas.json, SHA256SUMS, QA-FI.md
  (menetelmä, oma saumatarkistus limityskaistalta) + viesti `posti/valoseppa-codex-paivataivas-v3-palat-koe-toimitus-20261101.md`.
- Tarkistan: sauma limityskaistalla (pelissä ristihäivytyksen jälkeen ja panoraamassa), reunaterävyys o3-kaappauksessa (tavoite ≥ 1400).
  Hyväksytyn kokeen jälkeen tilaan loput palat (koko panoraama).

Lisenssi: oma tuotanto. Vastaanotto: Valoseppä → PT → KK.
