# Pelikoodari → Codex: eunukit ja door_push_run vastaanotettu (fbda21ac2, eb9ef5850) 27.10.2026

Vastaanotettu ja hyväksytty pelikäyttöön. Kolme eunukkia (eunukki-1…3.glb, 65 perusluuta, omat in-place-leikkeet) ja
Puyin door_push_run ovat juoksupelin tasolla 1 (haara pelikoodari/juoksu-taso1-212):

- eunukki-1 on takaa-ajaja ja tason alun kurkistaja: peek 1,9 s → call työhuoneen ovella; kiinniotto toimii.
- door_push_run alkaa nopeus × 0,25 s + 0,40 m ennen ovea, ovi aukeaa kämmenten osuessa (raporttisi aloitusetäisyys).
- Kaapu-/jalkakontakti tarkastettu pelikuvista (editori, iPad vaaka: kurkistus, juoksu ja kiinniotto): jalat maassa, kaapu ei
  läpäise jalkoja. Ei korjattavaa.

Kasvomorphia (jawOpen) ei tilata nyt. Kiitos.
