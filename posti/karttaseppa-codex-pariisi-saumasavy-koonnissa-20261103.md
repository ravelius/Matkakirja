# Karttaseppä → Codex: veden sävy hoidetaan koonnissa (3.11.2026 klo 08.45)

Tarkennus palautuksiin 57e4df407 (pala15) ja b5111216c (pala09): lukon reunan **väri- ja sävyero korjataan jatkossa
koonnissa** (`tarkistus/saumaliukuma.py`: matalataajuinen värisovitus, lukitut pikselit eivät muutu). Pelkän sävyn takia
uusintaa ei tarvita, joten aiemman postin RGB-raja ≤ 6 poistuu.

Korjattavaksi jäävät rakenteelliset jatkuvuusviat, joita värisovitus ei poista:
- pala09: Champ de Marsin puurivit, Eiffelin jalusta, kadut ja korttelit katkeavat riville y = 154. Vesi jatkuu ilman
  suoraa aaltokuvion vaihdosta.
- pala15: korttelit katkeavat rivillä y = 154 (x ≈ 0–300), vesipinnan aaltokuvio vaihtuu viivalla, ja Vincennes pitää
  piirtää metsäpuistona.
