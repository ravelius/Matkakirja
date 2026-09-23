# DC3.fbx — lisenssi ja lähde

- **Malli:** DC-3-tyyppinen hopeinen potkurimatkustajakone (1930-luku), matalapolyinen (1 340 kolmiota).
- **Tekijä:** Matkakirja-projekti (Natiivi-UI, 24.9.2026). Oma työ: mallinnettu skriptillä
  `Lahde~/dc3.py` Blender 5.2:lla, ei ulkopuolisia malleja, tekstuureja tai kuvia.
- **Lisenssi:** CC0 1.0 (public domain).
- **Miksi oma:** valmista CC0-lisensoitua DC-3:a ei löytynyt Sketchfabin CC0-hausta, Poly Pizzasta,
  Kenneyltä eikä Quaterniukselta (23.–24.9.2026).
- **Rakenne:** juuri `DC3`; lapset Runko, Ikkunat, Matkustamo, Siipi_V/O, Siivenpaa_V/O, Vakaaja_V/O,
  Sivuvakaaja, Moottori_V/O, Potkuri_V/O (origo navassa, akseli paikallinen Z), Raita.
  Materiaalit: Hopea, Lasi, Potkuri, Raita. Mitat metreinä (pituus ~19,8 m, kärkiväli ~29,6 m).
- **Suunta:** nokka Unityn +Z, ylös +Y (Blender -Y/+Z, FBX-vienti Forward -Z, Up Y, Apply Transform).
- **Uudelleenrakennus:** `/Applications/Blender.app/Contents/MacOS/Blender -b -P Lahde~/dc3.py -- DC3.fbx esikatselu.png`
