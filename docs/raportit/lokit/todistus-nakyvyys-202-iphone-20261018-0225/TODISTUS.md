# Todistusajo: nakyvyys-202-iphone ab87a0fc

**nakyvyys-202-iphone ab87a0fc: OK**

Laite iphone `8D1FD618-A7BD-48F8-8BB4-3E91A95834FD`, skenaario `sk.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-nakyvyys-202-iphone-20261018-0225`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt ab87a0fc = ab87a0fc
- **OK** haaran b986e5e5b sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: cupola` | OK: raketti: cupola |
| `oletus: Helsinki valittavissa (EXTEND pois)` | OK: iss: pallohaku lukitsi Helsinki → kelaus |
| `oletus: Helsinki (EXTEND päällä)` | OK: iss: pallohaku lukitsi Helsinki → kelaus |
| `oletus: Reykjavik valittavissa (EXTEND päällä)` | OK: iss: pallohaku lukitsi Islanti → kelaus |
| `oletus: Canberra valittavissa` | OK: iss: pallohaku lukitsi Canberra → kelaus |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [k1-pois-helsinki.png](kuvat/k1-pois-helsinki.png): EXTEND pois: Helsinki todellisella radalla (lähin ohitus), harmaa alue 60,6°:n takana, EXTEND-nappi pallon alla (1206×2622 px, pysty)
- **OK** [k2-pois-reykjavik.png](kuvat/k2-pois-reykjavik.png): EXTEND pois: Reykjavik ei ehdokkaana (loki "ei ehdokkaana") (1206×2622 px, pysty)
- **OK** [k3-paalla-helsinki.png](kuvat/k3-paalla-helsinki.png): EXTEND päällä: ei harmaata, nappi oranssi, rata Helsingin yli (1206×2622 px, pysty)
- **OK** [k3b-kuvaa-helsinki.png](kuvat/k3b-kuvaa-helsinki.png): EXTEND päällä: Helsinki KUVAA → tarkka kuva (tila lokissa, jpg kansioon) (1206×2622 px, pysty)
- **OK** [k4-paalla-reykjavik.png](kuvat/k4-paalla-reykjavik.png): EXTEND päällä: Reykjavik, rata ja katse kohteen yli (1206×2622 px, pysty)
- **OK** [k4b-kuvaa-reykjavik.png](kuvat/k4b-kuvaa-reykjavik.png): EXTEND päällä: Reykjavík KUVAA → tarkka kuva (tila lokissa, jpg kansioon) (1206×2622 px, pysty)
- **OK** [k4c-paalla-nuuk.png](kuvat/k4c-paalla-nuuk.png): EXTEND päällä: Nuuk (KS:n ruutu vasta rungossa → voi olla EI KUVAUSPAIKKAA) (1206×2622 px, pysty)
- **OK** [k4d-kuvaa-nuuk.png](kuvat/k4d-kuvaa-nuuk.png): EXTEND päällä: Nuuk KUVAA → tarkka kuva (tila lokissa, jpg kansioon) (1206×2622 px, pysty)
- **OK** [k5-paalla-canberra.png](kuvat/k5-paalla-canberra.png): EXTEND päällä: Canberra (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 56.95 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 43.98): xcodebuild | kuormitus 43.98 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
