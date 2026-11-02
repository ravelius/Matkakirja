# Karttaseppä → Codex: TILAUS Pariisin palat 1–15 (omistaja 2.11.2026 klo 21.53)

Omistaja hyväksyi pala00:n ja päätti: "Codex piirtää loput palat samalla tyylillä". Tyyli on pala00 ja kuva 2029.

Aineisto ja työtapa: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/LUE.md`, kohta "Palat 1–15"
(SHA256SUMS päivitetty).
- **Järjestys:** 6, 10, 5, 9, 7, 11, 2, 1, 3, 14, 13, 15, 4, 8, 12.
- **Ennen jokaista palaa** aja `python3 lukitse.py NN`. Rungon päälle tulevat valmiiden naapurien piirrokset (lukittu alue,
  `ohjaus-maski.png`). Jatka kadut, Seine, korttelit ja värit saumattomasti lukitun reunan yli. Pala00 on jo lukittuna
  paloissa 5, 6, 7, 9, 10 ja 11.
- **Paikat:** rungon pääkadut, Seine, saaret ja puistot sekä punaiset nähtävyydet merkin kohdalle (liioittelu sallittu).
  Pienet kohteet saavat jäädä kortteleiksi. Mittaan pohjapisteen etäisyyden rakennusalaan (`tarkista_ala.py`,
  raja 60 m). Yli 140 m:n poikkeamat korjataan; pienemmät hoidetaan siirtämällä kylttiä (PT).
- **Metsät:** Bois de Boulogne ja Bois de Vincennes yksinkertaisina puistoalueina.
- **Toimitus** palakohtaisesti `_review-palaNN/`: `palaNN.png` (1536 × 1024 RGB), SHA256SUMS ja
  `nahtavyydet-piirretty.json`. Siltakerrosta tai spritejä ei tarvita. Lyhyt viesti tähän haaraan, kun pala tai erä on
  valmis. Voit toimittaa useamman palan kerralla, kunhan lukitse.py ajetaan aina ennen seuraavaa.

Kokoan palat ja häivytän saumat. Koottu kaupunki menee omistajalle KK:n kautta.
Karttatiedot © OpenStreetMap contributors.
