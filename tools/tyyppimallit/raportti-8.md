# Raportti 8: Lontoon palatsien seinäväri (Valoseppä 15.11.2026 klo 01.5x; LUONNOS, EI JUNAAN)

Tehtävä: KK 01.24 (palatsien seinä ei saa olla Pariisin beige) + KS 01.4x (paletti katot.py PERHEET['lontoo'].seinat).

## Toteutus
- tyypitys.py: Lontoon 13 palatsiriville `'seina'`: 12 × `portland`, Old Admiralty `tiili`.
- vie.py: `SEINA = {portland: 0xE4DCCA, tiili: 0xAC7862}` → tyypin 6 MK01-mallirivin p2 (sRGB f32-kokonaislukuna; 0 = oletuskivi). Pariisi ennallaan (p2 = 0).
- Tyyppimallit.cs: `TyyppiPalatsiPiha(..., int seina = 0)`; seinät, paviljongit, attikakaide, risaliitti ja pääty seinän värissä; katto ja aukot ennallaan.
  `TyyppiMalli(..., float p2 = 0f)`. Peli: KartanElama.Merkit.cs välittää P2:n (MerkkiTiedosto lukee sen jo).
- Vienti Lontoo: 431 merkkiä, 23 mallia (sama kuin ennen), sha256 c9a350d7…; ainoa ero p2-kentät. Pariisin tiedosto ennallaan.

## Testit
- Kartta-testit 854/854: TyyppimallitTestit.KaikkiTyypitRakentuvatBudjetissa (uusi: seinä vaihtaa vain seinäkärjet, kolmiot samat, p2 = 0 oletus).
- Linssit-testit 2340/2340: TyyppiMerkitTestit.PelinTiedostot (uusi: Lontoossa 12 Portland + 1 tiili = Old Admiralty, Pariisissa p2 = 0).

## Kuva
seina-1.jpg: Somerset House ja Old Admiralty ennen | jälkeen (Blender, MK01-rivit kuten pelissä).

## Avoin (KK päättää)
- Muiden palatsien seinä on oletettu Portland-kiveksi. Tarkistettava lähteestä ennen lukitusta: Marlborough House (muistan punatiilen),
  Lancaster House ja Apsley House (Bath-kivi?), Clarence House (rapattu). Ei muutettu ilman lähdettä.
- Lopulliset sävyt pelikuvista (Nyt | Uusi) iPad-erän jälkeen.
