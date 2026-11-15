# Raportti 13 (Valoseppä 15.11.2026): KK 07.25 kierros 6, kuva-ajon tulos. EI JUNAAN.

Ajo: JU VS-TYYPPIMALLIT6, pelihaara valoseppa/tyyppimallit-peliin dbd331fc6, iPad, Pariisi 18/18 + Lontoo 8/8 (rc 0).
Kuvat lokit/valoseppa-tyyppimallit6-{pariisi,lontoo}; arkki lokit/valoseppa-tyyppimallit6-koonti/tyyppimallit6-nyt-uusi.jpg (arkki6.py, 13 paria + kattavuus).

## Kohta 2: ruskea pois (KS:n poistotaulut)
- Pelihaaraan KS merkit-poistot-20261115: TaloPoistot.cs 7db0f022 (3 270), TaloPoistotLontoo.cs 6a37fca4 (2 764), TaloPoistotLontooIsot.cs e9db0e7c (3 438).
  KS:n pohjataulut (peli-*.cs) = haaran nykyiset tavulleen, joten kopio sellaisenaan.
- Poistoavain -poisto3 → -poisto4m, -poisto-isot2 → -poisto-isot3m (kaupungit.json + testien vakiot), jotta maalaattojen rakennustaso piirtyy uudelleen.
- Tulos: Pariisin asemilla (p5–p7, p12, p13) ja King's Crossin / St Pancrasin ympärillä ei enää ruskeaa maalaattaa mallien alla.
  HUOM: taulu on pelissä myös NYT-kuvissa (sama asennus), joten NYT ≠ täsmälleen nykyinen peli merkkien kohdalla.
- Testit: Kartta 855/855, Linssit 2341/2341, unity-tarkistus 0.

## Kohta 4: Lontoo (sk-tyyppimallit6-lontoo.txt; Uusi = KS lontoo-v2-yhd-20261115/palat-merkit dfd32251)
- l1 KC + St Pancras kaukaa, l2/l3 läheltä, l4 Thames kaukaa. KC:n kaksoisholvi + kellojulkisivu ja St Pancrasin halli näkyvät.
- Mitatut näyttövärit (mediaani, l3 / l4):

| Kohta | NYT | UUSI |
|---|---|---|
| KC halli | #C6A07D (ruskea maalaatta) | #97948E |
| St Pancras halli | #BB9776 | #96928C |
| naapurin liuskekatto | #BB9776 | #8F8B86 |
| Regent's Canal | #B0AA8A | #B0AA8A |
| Thames | #B0AB8A | #B0AB8A |

  Hallien katto (materiaali #808183, KS:n l3d-liuske) on näytöllä 1–2 % vaaleampi kuin naapurien liuske → sulautuu. Vesi ennallaan.

## Auki
- Pariisin lähikuvat (p8–p11): tyyppimallin katto TyKatto #8E979D on tummempi kuin talojen kattovari() (p9 #959996 vs #ABAFB1) → ehdotus KK:lle.
- Alle 80 % katetut asemat ennallaan (raportti 12).
