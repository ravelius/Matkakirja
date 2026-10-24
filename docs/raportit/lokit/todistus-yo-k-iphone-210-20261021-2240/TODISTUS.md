# Todistusajo: yo-k-iphone-210 dc9213c5

**yo-k-iphone-210 dc9213c5: PUUTE — 3: pitkiä ruutuja kameran liikkeessä 7 (> 20 ms = nykäys; pitkat-ruudut.txt)**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `yo-k.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-yo-k-iphone-210-20261021-2240`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt dc9213c5 = dc9213c5b
- **OK** haaran 6f8455f1a sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `tap-teksti Käynnistä → tap 74.0 436.6` | lähetetty |
| `oletus: vaaka-keksinnot 1 s: P3 P7 P8 P10 kunnossa` | OK: ui-komento: ui-periaatteet: P3 kortit 0 (yli 86 % 0), P7 napit 3 (alle 44 pt 0), P8 osat 5 (alle 8 pt reunasta 0), P10 yksiriviset 2 (leikkautuu 0) → ui-periaatteet-vaaka-keksinnot-1s.json |
| `oletus: vaaka-keksinnot 5 s: P3 P7 P8 P10 kunnossa` | OK: ui-komento: ui-periaatteet: P3 kortit 0 (yli 86 % 0), P7 napit 3 (alle 44 pt 0), P8 osat 14 (alle 8 pt reunasta 0), P10 yksiriviset 9 (leikkautuu 0) → ui-periaatteet-vaaka-keksinnot-5s.json |
| `oletus: vaaka-keksinnot 15 s: P3 P7 P8 P10 kunnossa` | OK: ui-komento: ui-periaatteet: P3 kortit 0 (yli 86 % 0), P7 napit 3 (alle 44 pt 0), P8 osat 15 (alle 8 pt reunasta 0), P10 yksiriviset 20 (leikkautuu 0) → ui-periaatteet-vaaka-keksinnot-15s.json |

- **OK** 1 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **PUUTE** pitkiä ruutuja kameran liikkeessä 7 (> 20 ms = nykäys; pitkat-ruudut.txt)

## 4. Stillit tiloista
- **OK** [k-vaaka-keksinnot-1s.png](kuvat/k-vaaka-keksinnot-1s.png): vaaka keksinnot 1 s: otsikko rivittyy (2622×1206 px, vaaka)
- **OK** [k-vaaka-keksinnot-5s.png](kuvat/k-vaaka-keksinnot-5s.png): vaaka keksinnot 5 s (2622×1206 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 30.30 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 3.96)

## 8. Ei testattu
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
