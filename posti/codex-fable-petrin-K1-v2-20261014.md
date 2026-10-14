# Petřín K1 v2 — uusi korjaus ja palautearvio, 14.10.2026

#258 on luettu kokonaan ja sen blob 4dbb83aa469874da185293f1383768c93d455f05 varmennettu commitista 8e3bf535bc5edbdd9c49b2e8d105ff74252dc599. Uusi K1-generointi on tehty alusta, yksi kutsu tälle korjaukselle. V1:n alkuperäinen, tiedostot, maski, QA ja cc4f74fdaba2f110294abb117c488976aac08a06:n postitoimitus säilyvät muuttumattomina. V1 on PT-vastaanotettu ja PT-hylätty sitovana tavoitteena.

## V2:n tiedostot

- Kuva: petrin-K1-v2.png, **natiivi 1536×1024**, RGB/sRGB/opaque. Natiiviksi pyydettiin 2400×1600, mutta tätä kokoa ei palautunut. Toimitus on natiivikoossa: vain PNG-metatiedot ja sRGB-profiili lisätty, kaikki RGB-pikselit identtiset natiivin kanssa. **Ei Lanczosia, suurennusta, rajausta tai kuvasisällön korjausta.**
- Maski: petrin-K1-v2-maski.png, 1536×1024, sama koko/rajaus, puhdas 0/255 L-PNG ja pehmeä reuna 0 px. V2:n omista ääriviivoista tehty uusi täytetty ulkosiluettiluonnos; V1-maskia ei ole skaalattu tai käytetty uudelleen. Ristikon sisäiset aukot ovat täytetyn ulkosiluetin sisällä. Kohdistus on katsottu natiivin päälle piirretyistä ääriviivoista; pikselintarkkuus ei ole sertifioitu.

## Root-QA: edelleen hylätty sitovana tavoitteena

V2 on kokonaan uusi kuva, mutta torni vie edelleen noin 73 % kuvan korkeudesta tavoitellun 40 %:n sijaan. Masto alkaa noin 15 %:n kohdalta, tavoite on 30 %. Alatasanne on näkyvän akselin korkeudesta noin 43 % ja ylätasanne noin 81 %; annetun kameran projektiossa vastaavat tavoitteet ovat noin 26 % ja 70 %. Natiiviksi pyydettiin 2400×1600, mutta työkalu palautti 1536×1024. Kuva toimitetaan muuttamattomassa natiivikoossa eikä sitä suurenneta. Maski on saman natiivikuvan täytetty ulkosiluettiluonnos. Sen kohdistus on katsottu päällekkäiskuvana, mutta pikselintarkkuutta ei ole sertifioitu IoU-vertailutotuudeksi. V2 hylätään sitovana mallin tavoitteena ja toimitetaan palautearvioon.

| Kohta | K1-kameran tavoite y / korkeus | V2 havaittu y / korkeus |
|---|---:|---:|
| mastTop | 0.301 | 0.150 |
| bodyRoofTop | 0.375 | 0.242 |
| upperPlatformFloorApprox | 0.421 | 0.291 |
| lowerPlatformFloorApprox | 0.595 | 0.565 |
| groundContact | 0.700 | 0.878 |

Suhteet ovat natiivin pikselihavaintoja ja tunnetun K1-kameran analyyttistä projektiota. Generoidun kuvan todellista kameraa tai absoluuttisia metrimittoja ei esitetä varmennetuiksi. #253:n 58,7 / 51 / 20 m olivat promptissa ja korjatussa leikkausviitteessä. Masto noin 12 m ja kokonaiskorkeus noin 71 m pysyvät arvioina.

## Käytetty menetelmä ja lähteet

Generaattorille annettiin ensin 2400×1600-kokoinen 2D-rajausohje (mastokärki 30 %, jalat 70 %, tasannepaikat laskettu muuttamattomalla 200° / 200 m / 90 m / −14,8° / VFOV 45° -kameralla), sitten korjattu leikkaus ja CC0-rakennevalokuva. Rajausta ei silti noudatettu riittävästi. 2D-rajausohje on sommittelun apukuva, **ei 3D-malli eikä puuttuvan SVG/OSM-lähteen rekonstruktio**. V1-kuvaa ei annettu editoinnin kohteeksi eikä kuvaviitteeksi.

Imagegen-kuvaviitteeksi annettu valokuva: [petrin-1-sisaankaynti.jpg](https://commons.wikimedia.org/wiki/File:Petrinska_rozhledna_a_nejblizsi_okoli_20250427_121942.jpg), VANOCE2022, CC0; rakenteen ja värin viite. Kaikki alkuperäisen paketin tekijä/lisenssit säilyvät JSON-tarkistusarkissa. Puuttuvia SVG/OSM-liitteitä ei ole rekonstruoitu; kuva 4 ei ole pohjoiskulman todiste eikä kuva 5 ole ilmakuva.

Täydet promptit, viitepolut/roolit, lähdeversiot, SHA:t, maskin koordinaatit, natiivikoko ja tarkistusluvut: petrin-K1-v2-tarkistus-20261014.json.

## Pysähdys

V2 ja sen maski ovat nyt palautearvioitava pari, eivät hyväksytty mallin tavoite tai IoU:n vertailutotuus. Pysähdymme #258:n mukaisesti PT:n arvioon. K2–K5-tuotantoa ei aloitettu; mallikierrokset, peli ja julkaisu odottavat omia lupiaan. Vanhoja #70/#71-töitä ei jatkettu.
