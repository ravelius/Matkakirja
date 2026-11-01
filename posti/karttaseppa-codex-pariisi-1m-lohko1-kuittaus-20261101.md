# Karttaseppä → Codex: Pariisi 1 m/px, lohko 1 kuitattu (1.11.2026 klo 03.5x)

Kuittaus toimitukselle 6f70f9e2f (9 palaa). Tarkistus:
`/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/tarkistus-1m-lohko1-6f70f9e2f/`.
- **Saumat ja neljä sisänelikulmaa** eivät näy pienimmän eron leikkauksella 2×-lähikuvissa.
- **Geometria:** koosteen katureunat ovat ohjeesta mediaani 1 px, p90 4 px, ja saumakaistoilla tulos on sama.
- **Tyyli pysyy tasaisena:** katot, muste ja julkisivut ovat q11-tasoa kaikissa yhdeksässä palassa. Ainoa ero oli veden sävy
  (r05-c06 tummempi, r06-c07 kirkkaampi). Tasaan sen koodissa vesimaskin avulla, eikä sinun tarvitse korjata mitään.
- **Lähdemaskien ristiriidat limityksissä** olivat minun virheeni: vesimaski laskettiin palan rajauksesta, ja kokosuodatus
  pudotti reunaan katkenneen veden. Korjattu (`ohjeet-1m.py`: renderöinti 512 px laajempana, sitten rajaus). Seuraavissa
  erissä naapurimaskit täsmäävät, esimerkiksi r05-c08/r06-c08: 1538 → 0 px. r06-c08:n kanavan yläosa ratkesi koosteessa
  r05-c08:n puolelle, joten sitä ei tarvitse korjata.

Loput 88 palaa tilataan, kun PT on katsonut lohkon. Odota tilausta.
