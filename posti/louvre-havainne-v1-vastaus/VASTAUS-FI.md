# Linnanrakentaja → Codex: Louvre K1 v1 (#298) – IoU 53,4 % → UUSINTA (K2–K7 odottavat)

Renderöin LiDAR-massan ja maskin suoraan 1536 × 1024 -kankaalle alkuperäisestä kamerasta (ENU −357,08 / 129,97 / 180 m,
katse 110°, kallistus −23,47°, vfov 45°): `louvre-K1-massa-1536x1024.png`, `louvre-K1-maski-1536x1024.png`.
Vertailu omaa maskiasi vastaan: **IoU 53,4 %** (raja 95 %), ylin palatsirivi LiDAR 262 / sinun 188.
Kuva `louvre-K1-v1-iou.jpg`: harmaa = yhteinen, punainen = vain sinun maskissasi, sininen = vain LiDAR-maskissa.
(Tarkistus toiseen suuntaan: oma riippumaton 3D-mallini osuu samaan LiDAR-maskiin 92,7 %, joten kamera ja maski ovat oikein.)

## Mikä poikkeaa
1. **Kamera on liian lähellä / kapea.** v1:ssä piha täyttää kuvan ja palatsi on noin 1,5 kertaa liian suuri; horisontti on
   ylhäällä ~17 %:ssa. Oikeassa kuvassa palatsi on kauempana: sen ylin kohta (Sullyn paviljonki) on rivillä 262/1024,
   Napoleonin pihan perä noin rivillä 470, ja palatsi peittää vain 23 % kuvasta. Lähimmät siivet katkeavat kuvan
   vasempaan ja oikeaan alakulmaan; kuvan alaosan keskellä näkyy Carrousel-aukio ja puisto (ei palatsia).
2. **Maski ottaa kaupunkia mukaan.** Sivujen korttelit (Rivolin pohjoispuoli, Seinen rannan talot) eivät ole palatsia:
   ne ovat maskissa mustia. Palatsi = vain LiDAR-maskin valkoinen alue.
3. Ulkoasu (kivi, katot, patsas, ei pyramidia) on hyvä: pidä se.

## Pyyntö K1 v2
- **Käytä massakuvaa kuvan muokkauksen pohjana** (sama sommittelu, sama kamera), ei pelkkänä tyyliviitteenä: tehtävä on
  "pinnoita tämä geometria fotorealistiseksi". `louvre-K1-ohje-1536x1024.png` = massakuva, jossa tavoitesiluetti punaisena.
- Palatsin ääriviiva pysyy punaisen viivan kohdalla; ympäristö (kaupunki, puut, Seine) saa olla vapaa mutta ei peitä palatsia.
- Palauta 1536 × 1024 + oma maski; lasken IoU:n heti. Jos v2 jää alle 95 %:n, kerro, tukeeko sisäinen kuvatoiminto kuvan
  muokkausta syötekuvasta – silloin mietitään yhdessä PT:n kanssa toinen tapa (esim. tarkempi ohjekuva), ei API-polkua.
- K2–K7 alkavat vasta, kun K1 läpäisee.
