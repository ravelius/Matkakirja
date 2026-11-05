# Sainte-Chapelle22c — toimitus v1

**Tila:** paikallinen tuotanto ja tarkistus valmis; toimitetaan Karttasepän arvioon. Vastaanotto, KK:n/omistajan hyväksyntä, peliin kytkentä ja julkaisu ovat erillisiä vaiheita.

**LIIKE:** ei liikettä.

`sainte-chapelle.glb`: staattinen kartan rakennus, ei luurankoa, ei animaatiota. Ei junaan.

## Lopputulos ja mitoitus

- Lopullinen GLB: 28,002 kolmiota, 3,528,036 tavua (3.528 Mt), yksi primitiivi ja yksi OPAQUE-materiaali. Kaikki resurssit upotettu; ei Draco- eikä meshopt-pakkausta.
- SHA256: `d2c3be39d622b121028ce5e0dc153dd090115e5259cffd23745b85b0b647995a`.
- Viitattujen pisteiden rajat: X −91…91, Y 0…320, Z −53…53. Pituus182, leveys106, kokonaiskorkeus320 pelimetriä. Pivot pohjan keskellä. +Y ylös, itä +X, etelä +Z. Solmun skaala1 ja transformit sovellettu.
- Räystäsankkuri130 ja harja-ankkuri188; lähteen Y0.39→130, Y0.56→188. Nämä ovat leveiden katon rakennevyöhykkeiden kohdistustasot, eivät jokaisen epätasaisen pintapisteen täsmällinen korkeus. Koristeiden pienet korkeuserot säilyvät. Huipun korkein käytetty kärki mitattu320.
- Yksi yhdistetty suljettu kuori 0.0001m hitsaustarkkuudella: avoimet reunat0, ei-moniston reunat0, degeneroituneet kolmiot0. Tornin risti kuuluu samaan pääkomponenttiin. Ei irrallisia sirukomponentteja.

## Tripo ja kevennys

| Vaihe | Kolmiot | GLB-tavut | Huomio |
|---|---:|---:|---|
| Oto02, Tripo-raaka | 46463 | 5648124 | alkuperäinen muuttumaton |
| Oto02, Tripo Retopology | 28018 | 3191580 | Triangle, tavoite28000, Smart Mesh pois |
| Lopullinen toimitus | 28002 | 3528036 | mitoitus, UV-korjaukset, harja ja sirujen poisto |

Perusvärikuva2048×2048, normaalikuva1024×1024, metallic/roughness512×512. Kaikki ovat alkuperäisessä Retopology-viennissä upotettuja. Paikallinen viimeistely ei muuttanut kuvien tavuja. Sisäiset alkuperäiset puskurit säilytettiin, joten lopullinen tiedosto on hieman kevennysvientiä suurempi.

Otto01 hylättiin: pohjois- ja eteläkuvien Left/Right-tulkinta käänsi tornin väärään päähän. Se oli jo ehditty keventää, joten sen kokonaiskustannus50 krediittiä on mukana. Otto02: Front=länsi, Left=etelä, Right=pohjoinen, Back=hyväksytty itä22b. Torni on lännen puolella, itäpääty kivinen, länsipäädyn ruusu ja sivujen korkeat ikkunat säilyvät.

## Rajatut paikalliset korjaukset ja poikkeamat

1. Pienet harjakoristeet madallettiin yhtenäiseksi harjaksi tilauksen sallimalla tavalla. 548 kärjen muutos, enimmillään7.620 pelimetriä; korkea torni ja päätyristit rajattu ulkopuolelle. Tämä poikkeaa lähteen yksittäisistä matalista harjaristeistä.
2. Kevennyksen55 täsmälleen nollapintaista UV-kolmiota korjattiin. Puuttuville alueille käytettiin lähellä olevaa saman pinnan atlasaluetta; muita koski pieni alle pikselin kohdistuskorjaus. Katon kaksi väriä vuotavaa kolmiota ja yhden pohjoisikkunan seitsemän kolmion alue tarkennettiin erikseen.
3. Riippumaton komponenttitarkistus paljasti13 irrallista ohutta pintasirua. Niiden16 alkuperäistä kolmiota poistettiin. Kokeelliset12 sulkukolmiota poistettiin samassa vaiheessa, koska reunasilmukat kuuluivat siruihin eivätkä pääkuoren aukkoihin. Lopullinen pääkuori on suljettu ilman niitä.
4. Katon tummaan pintaan jää Tripo-viennin hienoa epätasaista juovaisuutta/pilkutusta erityisesti pinnakkeiden lähelle. Se näkyy yläkuvassa ja on jätetty Karttasepän arvioitavaksi; uutta teksturointia ei käynnistetty. Tripossa Remove Lighting oli päällä. Esikatseluihin ei lisätty heittovarjoja. Lähdekuvia ja viistokulman QA-kuvaa ei syötetty uudelleen.
5. Staattista karttamallia ei valmisteltu animaatiolle eikä huomaamattomia yksityiskohtia jatkettu tarpeettomasti.

## UV-luvut pelimittakaavassa

Tarkka nolla tarkoittaa laskettua UV-alaa täsmälleen0. Lähellä nollaa tarkoittaa UV-alaa ≤1e−7; näitä ei kutsuta nolliksi. 3D-alat ovat mallin pelimetrien neliöitä.

| Vaihe | Tarkat nollat | Niiden 3D-ala | Lähellä nollaa | Niiden 3D-ala |
|---|---:|---:|---:|---:|
| Raaka, mitoitettu | 11 | 1.574139 | 72 | 8.665350 |
| Retopology ennen korjauksia, mitoitettu | 55 | 191.294689 | 69 | 216.727475 |
| Lopullinen | 0 | 0 | 49 | 106.800338 |

Täysin mustaan atlasnurkkaan(0,1) romahtaneet kolmiot48→0. Pienet jäljelle jäävät UV-alueet on ilmoitettu avoimesti; kuvissa ei ole laajaa mustaa UV-aukkoa. Numeerinen QA ei yksin korvaa katselmointia.

## Esikatselut ja mustat pikselit

Kaikki11PNG:tä ovat1024×1024, katsottu täysikoossa. Sama kevyt tasavalo kuin Notre-Dame19b:n tarkistuskuvissa, base0.80/key0.15/fill0.05. Ei pelikuvakaappauksia. Raaka ja kevyt ovat samoissa akseleissa, samoissa kuvakulmissa ja samalla rajauksella. Yläkuva90°; lounas ja koillinen noin60°.

Laskenta koko kuvasta1,048,576pikseliä: musta=max(R,G,B)≤8; lisäksi täysin mustat ja ≤16 erikseen. Ikkunoiden tarkoitukselliset tummat pikselit sisältyvät lukuihin. Pienet1–23pikselin jäännökset eivät ole laajoja korjaamattomia pintaläiskiä; raja-arvot eivät yksin osoita pikselin syytä.

| Kuva | R=G=B=0 | maxRGB≤8 | maxRGB≤16 |
|---|---:|---:|---:|
| kevyt-etela.png | 6 | 23 | 74 |
| kevyt-ita.png | 0 | 0 | 3 |
| kevyt-lansi.png | 0 | 0 | 9 |
| kevyt-pohjoinen.png | 0 | 3 | 59 |
| pelikulma-koillinen.png | 0 | 0 | 30 |
| pelikulma-lounas.png | 1 | 9 | 39 |
| raaka-etela.png | 0 | 5 | 292 |
| raaka-ita.png | 0 | 1 | 25 |
| raaka-lansi.png | 0 | 0 | 15 |
| raaka-pohjoinen.png | 0 | 11 | 315 |
| ylhaalta.png | 0 | 0 | 0 |

## Kustannukset ja luovutus

Kaksi ottoa ×45 + kaksi kevennystä ×5 =100 Tripo-krediittiä. Saldo16405→16305, tarkistettu palvelun käyttöliittymästä. Paikalliset korjaukset0 krediittiä. Kolmatta ottoa ei tehty. Aloitus5.11.2026 05.06UTC; kummankin työn aloitus-, valmistumis- ja silloiset arvioajat sekä jobid:t ovat `qa/provenance-costs.json`:ssa. Viimeinen11kuvan kevyt CPU-ajo käytti noin226Mt ja25s; raskasta Blender-renderöintiä ei käynnistetty Unityn ollessa käytössä.

Luovutus Karttasepälle vain `claude/postilaatikko`-haaran kautta. Lopullinen hyväksyntä KK:n ja omistajan kautta; Karttaseppä vastaa peliin kytkennästä. Tekninen tarkistusportti ajetaan tämän paketin päälle ennen lähettämistä, tulos liitteessä `qa/delivery-gate.json`.
