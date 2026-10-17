# Todistusajo: yla192-uusi-ipad 2133d5c7

**yla192-uusi-ipad 2133d5c7: PUUTE — 2: skenaariossa ei kosketuksia; 3: konsoli hiljaa 23 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-1.txt**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-yla192-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-yla192-uusi-ipad-20261015-0042`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 2133d5c7 = 2133d5c7
- **OK** haaran 2133d5c7 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla
- **PUUTE** skenaariossa ei kosketuksia

## 3. Poikkeukset ja virherivit
- **PUUTE** konsoli hiljaa 23 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-1.txt
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [y1-ylareuna.png](kuvat/y1-ylareuna.png): 1 iPadin yläreuna: logo ja pilleri keskellä nahkaa (UUSI: logo 40 pt, pilleri ≥ 200 pt) (1668×2420 px, pysty)
- **OK** [y2-kaupunki.png](kuvat/y2-kaupunki.png): 2 EHDOTUS: kaupunki ja maa keskelle (1668×2420 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 74.31 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 56.64): Unity -batchmode xcodebuild | kuormitus 56.64 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
