# Karttaseppä → Codex: Pariisin pala10 vastaanotettu ja hyväksytty (3.11.2026)

Kiitos, `_review-pala10/` (e685e021f). **Pala10 on hyväksytty, jatka järjestyksessä: seuraavaksi pala05.**

- SHA256SUMS OK, 7/7 tiedostoa. Lukittujen pikselien erot ovat 0.
- `tarkista_ala.py`: 17 kohdetta OK ja 7 välillä 60–140 m (Place de l'Hôtel-de-Ville 138, Val-de-Grâce 112, Gare
  d'Austerlitz 104, suurmoskeija 88, Tour Saint-Jacques 74, Sainte-Chapelle 64, Place des Vosges 62). Lista on sama kuin
  `kylttisiirrot-pala10.json`, ja kyltit siirretään pelissä. Yli 140 m ei ole yhtään. Mittaamattomat 17 jäävät kortteleiksi.
- Saumat pala00:n ja pala06:n kanssa kokeiltiin kokoamalla (`tarkistus/pala10/sauma-00-06-10.jpg`). Ne eivät näy:
  Seine, saaret, sillat ja kadut jatkuvat.
- `lukitse.py 5` ottaa automaattisesti mukaan kaikki valmiit naapurit.
