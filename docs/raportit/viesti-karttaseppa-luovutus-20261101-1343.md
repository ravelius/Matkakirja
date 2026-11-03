# Karttaseppä: luovutus 1.11.2026 klo 13.43 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-1210.md (käsitelty). Syy: konteksti 25 % (kontekstivahti).
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`. Jokaisessa kansiossa MUISTIO.md.
Postilaatikon skriptimallit: `C/postilaatikko-tyokalut/` (kuittaa.sh <md> <polku> <viesti>; postita2.sh = kansiotilauksen malli).

## TEHTY (PT 13.1x–13.5x)
- **Välitaso 12/12 HYVÄKSYTTY (PT 13.5x).** Erä 2 tilattu 310f95761 → Codex e4514dcae (SHA 10/10 ok) → kuittaus a4dd6def9.
  `C/valitaso-20261101/`: koottu-v2.jpg (5153 × 2337, origo laajassa 16/169), pari-laaja-valitaso-v2.jpg, saumat-koonti-v2.jpg,
  sacre-coeur-viivain-v2.jpg (99 px = 347 m). kokoa.py tekee nyt myös pystysaumat; ohjeet-era2.py.
- **Laaja v4 sävytetty välitason sävyyn (PT 13.5x):** `C/laaja-g-20261101/savyta-laaja.py` → pariisi-laaja-g-v4-savy.png (+ -lut.json),
  zoompari-savy-{keskusta,boulogne,montmartre}.jpg PT:lle (odottaa kuittausta). Boulognen harvuus kelpaa (PT).
- **Lähitaso koko kaupungille (PT kuittasi):** `C/lahitaso-20261101/SUUNNITELMA.md` (151 palaa = G 4 + 147, 6 erää renkaittain),
  suunnitelma.py, ohjeet.py (`VALI=v2` → koottu-v2 lähteeksi; liimaa G 2×2 + toimitetut pariisi-lahi-*.png kiinteiksi kaistoiksi).
  Erä 1 rengas 1 (12) tilattu 8ced1e0e4; erä 2 rengas 2 (20) tilattu 17a389d40 (Codex kopioi erän 1 kaistat itse).
  Codexin jono: lähitaso erä 1 → ND-koepala → lähitaso erä 2.
- **Tarkkuusalue (0,5 m/px, 3,6 × 3,2 km Concorde–Vosges):** terävyyspari `C/lahitaso-20261101/terayspari*.jpg` (pelin kameran
  emulointi terayspari.py, kalibroitu simuun kalibroi.py:llä): G 2×2 lähimmällä zoomilla pehmeä. Omistaja 13.21: "notre dame on
  väärän näköinen verrattuna g:hen" → PT 13.2x: ND 0,5 m/px G-tyylissä koepala tilattu c240fc87f (2 palaa, koska liioiteltu ND
  ei mahdu yhteen) → `C/nd-05m-koepala-20261101/kolmikko.py` (1 G-kuva | 2 G 2×2 | 3 koepala; kohdat 1–2 valmiina).
  54 palan 0,5 m/px -taso EI tilattu: odottaa omistajan päätöstä kolmikosta (PT/KK).

## AVOIN (järjestyksessä)
1. Kun Codex toimittaa: SHA-tarkistus (posti-md:n taulukko) → kuittaus kuittaa.sh:lla.
   - Lähitaso erä 1 → kokoa G:n ympärille (kokoa.py yleistettävä: palat i*1195, j*715 G:n origosta; G = koottu-v1-savy.jpg)
     → pari välitaso | lähitaso, saumat, Garnier 390 / Invalidit 240 / Panthéon 440 px viivaimella → PT.
   - ND-koepala → `python3 C/nd-05m-koepala-20261101/kolmikko.py` → kolmikko-lahin/koko.jpg PT:lle (omistajan kysymys).
   - Lähitaso erä 2 → sama kuin erä 1 (Eiffel 500, Riemukaari 180).
2. Renkaat 3–6 (28 + 39 + 27 + 21) PT:n luvalla; ohjeet `VALI=v2 python3 C/lahitaso-20261101/ohjeet.py <ulos> koottu-v2.jpg <palat>`.
3. tee-tasot.py: laaja → pariisi-laaja-g-v4-savy.png, välitaso 12/12 (RAJ kaikille) → PiirrosKerros.cs Tasot[1]; PorrastettuPelissa
   true vasta koko kaupungin lähitason jälkeen (PT 12.2x). NS-LISTA.md päivitettävä.
4. Siivottavissa (ei kiire): `pariisi-pohja/_muokkaa_*.py`, `*.ennen-*.py`.
