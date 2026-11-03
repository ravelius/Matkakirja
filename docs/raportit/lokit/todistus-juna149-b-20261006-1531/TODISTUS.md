# Todistusajo: juna149-b e9023eae

**juna149-b e9023eae: PUUTE — 2: elementtiä 'Kuka rakennutti Parthenonin?' ei ui-puussa**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna149b.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna149-b-20261006-1531`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt e9023eae = e9023eae

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 37.31 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: täkyt alussa` | OK: linssit: opas: täkyt 8 (ok) |
| `tap-teksti Akropolis → tap 236.1 246.7` | lähetetty |
| `oletus: Akropolis valittu` | OK: linssit: opas: täky valittu Akropolis (Ateena, GR) |
| `tap-teksti Kysy → tap 112.7 777.9` | lähetetty |
| `tap-teksti Kuka rakennutti Parthenonin?` | EI LÖYDY ui-puusta |
| `tap 374 90` | lähetetty |
| `tap-teksti Poistu linssistä → tap 229.5 369.1` | lähetetty |
| `ui-puu: kartta palaa ehjänä oppaan jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |

- **PUUTE** elementtiä 'Kuka rakennutti Parthenonin?' ei ui-puussa

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-parthenon.png](kuvat/01-parthenon.png): Opas Parthenonilla (1206×2622 px, pysty)
- **OK** [02-chat.png](kuvat/02-chat.png): Chat-vastaus (matala chat, pin ylhäällä) (1206×2622 px, pysty)
- **OK** [03-chat-10s.png](kuvat/03-chat-10s.png): Chat 10 s myöhemmin (luennan tauko?) (1206×2622 px, pysty)
- **OK** [04-valikko.png](kuvat/04-valikko.png): Oppaan ≡-valikko (1206×2622 px, pysty)
- **OK** [05-kartta.png](kuvat/05-kartta.png): Kartta oppaan sulkemisen jälkeen (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 32.21 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **OK** aani mittaa: rms 0.12302, huippu 0.7071, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [LinssiOhjain:opas-pcm@1,00], istunto: luok

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 314.32): xcodebuild | kuormitus 314.32 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
