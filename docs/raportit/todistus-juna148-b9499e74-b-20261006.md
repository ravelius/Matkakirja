# Todistusajo: juna148c-b b9499e74

**juna148c-b b9499e74: PUUTE — 2: elementtiä 'Liiku' ei ui-puussa; 2: elementtiä 'Liiku' ei ui-puussa; 2: Laituri k1: ei lokiriviä**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna148b.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna148c-b-20261006-1350`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt b9499e74 = b9499e74

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 33.34 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: täkyt alussa` | OK: linssit: opas: täkyt 8 (ok) |
| `tap-teksti Akropolis → tap 236.1 246.7` | lähetetty |
| `tap-teksti Kysy → tap 112.7 777.9` | lähetetty |
| `tap-teksti Kysy → tap 251.0 137.5` | lähetetty |
| `tap-teksti Liiku` | EI LÖYDY ui-puusta |
| `tap-teksti Liiku` | EI LÖYDY ui-puusta |
| `tap 333 778` | lähetetty |
| `tap 333 778` | lähetetty |
| `tap 374 90` | lähetetty |
| `tap-teksti Poistu → tap 229.5 369.1` | lähetetty |
| `ui-puu: kartta palaa ehjänä oppaan jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |
| `tap 374 784` | lähetetty |
| `tap 317 650` | lähetetty |
| `tap 264 682` | lähetetty |
| `oletus: Laituri k1` | PUUTE: ei riviä 10 s:ssa |

- **PUUTE** elementtiä 'Liiku' ei ui-puussa
- **PUUTE** elementtiä 'Liiku' ei ui-puussa
- **PUUTE** Laituri k1: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-opas.png](kuvat/01-opas.png): Opas pysäkillä (1206×2622 px, pysty)
- **OK** [02-kysy.png](kuvat/02-kysy.png): Kysy painettu (1206×2622 px, pysty)
- **OK** [03-liiku.png](kuvat/03-liiku.png): Liiku painettu (kaupunkikierros/lista) (1206×2622 px, pysty)
- **OK** [04-nappaimisto.png](kuvat/04-nappaimisto.png): Näppäimistö painettu (1206×2622 px, pysty)
- **OK** [05-valikko.png](kuvat/05-valikko.png): Oppaan ≡-valikko (1206×2622 px, pysty)
- **OK** [06-kartta.png](kuvat/06-kartta.png): Kartta oppaan sulkemisen jälkeen (1206×2622 px, pysty)
- **OK** [07-linna.png](kuvat/07-linna.png): Olavinlinna (2622×1206 px, vaaka)
- **OK** [08-linna-laituri.png](kuvat/08-linna-laituri.png): Laituri (kortit vain napautuksesta) (2622×1206 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.27 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 151.78): xcodebuild | kuormitus 151.78 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
