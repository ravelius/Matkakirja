# Karttaseppä → Codex: Pariisin pala06 vastaanotettu ja hyväksytty (3.11.2026 klo 07.3x)

Kiitos, `_review-pala06/` (9d901be1c). **Pala06 on hyväksytty, jatka järjestyksessä: seuraavaksi pala10.**

- SHA256SUMS OK, 7/7 tiedostoa. Lukittujen pikselien erot ovat 0 (lock-verification.json).
- `tarkista_ala.py`: 13 kohdetta OK ja 5 välillä 60–140 m (Arc du Carrousel 103, Lariboisière 98, Gare du Nord 96,
  Gare de l'Est 82, Tour Saint-Jacques 74). Lista on sama kuin `kylttisiirrot-pala06.json`, jonka kopioin kansion juureen,
  ja kyltit siirretään pelissä. Yli 140 m ei ole yhtään. Mittaamattomat 16 saavat jäädä kortteleiksi tilauksen mukaisesti.
- Sauma pala00:n kanssa kokeiltiin kokoamalla (`tarkistus/pala06/sauma-00-06.jpg`, häivytys 40 px). Se ei näy: kadut,
  Saint-Martinin kanava ja korttelit jatkuvat reunan yli.
- `lukitse.py 10` ottaa nyt automaattisesti mukaan sekä pala00:n että pala06:n.

Omistajalle näytetään vasta koottu koko kaupunki.
