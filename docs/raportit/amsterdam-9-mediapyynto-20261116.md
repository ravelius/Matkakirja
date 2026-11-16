# Mediapyyntö PT:lle: Amsterdamin kaksi uutta tarinapaikkaa ja täydennyskuvat (SK 16.11.2026)

Data-luonnos (haara sk/amsterdam-data) viittaa kahteen Commons-kuvaan uusien tarinapaikkojen `kuva`-kentässä
(js/packs/fokusvirta-amsterdam.js `amsterdamin-portugalilainen-synagoga`, `amsterdamin-montelbaanstoren`) ja samaan
tiedostoon jutun `kuvat[0].tiedosto`-kentässä (js/packs/nahtavyysjutut.js, amsterdam). Kumpikaan ei ole vielä pelin mediassa
(tools/vienti/kuvamitat.json), joten PR jää luonnokseksi, kunnes kuvat on viety mediaan. Kuvia EI ladattu peliin. Lisenssit
ovat dokumentin docs/raportit/amsterdam-9-tarinapaikkaa-dataluonnos-20261116.md (haara origin/sk/amsterdam-tarinapaikat,
PR 6881) mukaiset; tässä PR:ssä ei käyty uudelleen Commonsissa.

## Pakolliset (datassa viitattuna)

| Kohde | Tiedosto | Lisenssi | Tekijä, aika | Huom. |
|---|---|---|---|---|
| Portugalilainen synagoga | `Exterieur OVERZICHT VOORGEVEL - Amsterdam - 20311779 - RCE.jpg` | CC BY-SA 4.0 | A. J. van der Wal / RCE, 1997 | Julkisivu. Tekijä ja lisenssi kuvan `lahde`-rivillä. |
| Montelbaanstoren | `Gezicht op de Montelbaanstoren in Amsterdam, RP-F-F11686.jpg` | CC0 | Rijksmuseum, stereokuva 1860–1885 | Aikalaiskuva. Tarkka ajoitus "1860–1885" on dokumentin tieto; tarkistettava File-sivulta ennen mediaan vientiä. |

## Valinnaiset täydennykset (EI datassa; dokumentin suositukset)

Nämä olisivat parantaneet olemassa olevia kortteja, mutta tiedostoja ei voi lisätä ilman kuvaputkea, joten niitä ei viitattu.

| Kohde | Tiedosto | Lisenssi | Huom. |
|---|---|---|---|
| Timanttihiomo | `Diamantslijperij Boas.jpg` | PD (J. van Dam, n. 1900) | Sama rakennus kuin tekstissä; "paras" (dokumentti). Ei `Boas.jpg` (lisenssi epäselvä). |
| Amsterdam-laiva | `De Amsterdam (1990 replica).jpg` | CC BY-SA 4.0 (Martinvl) | Kopio Amsterdamissa; kuvatekstissä sanottava, että kyse on kopiosta. |
| Maitotyttö | `Amsterdam - Rijksmuseum 1885 - The Gallery of Honour (1st Floor) - The Milkmaid 1657-58 by Johannes Vermeer.png` | CC BY-SA 4.0 (Txllxt TxllxT) | Rijksmuseon 1885 nykyrakennus; ei 1873. |
| Kissalaiva | `2023 Poezenboot, Asd (1).jpg` | CC BY-SA 4.0 (Ceescamel) | Nykyinen (uusi) laiva; nykyinen kuva datassa (2006) on vanha laiva, ja sen kuvateksti kertoo sen. |
| Herengracht 537 | `Herengracht 537.jpg` | CC BY-SA 4.0 (Yair Haklai) | Julkisivu. |
| Kapein talo | `Voorzijde kleinste huis van Amsterdam.jpg` | CC BY-SA 3.0 nl (Smallesthouse) | Oude Hoogstraat 22; nykyinen datan kuva (hijsbalk, RCE) ei ole tämä talo. Ei `Het kleinste huis van Amsterdam.jpg` (kuvatekstissä "Gebouwd in 1738"). |
| Portugalilainen synagoga | `Portugees-Israëlietische Synagoge 20180702.jpg` | CC BY-SA 4.0 (Suicasmo) | Vaihtoehto julkisivukuvalle. 200-vuotissouvenir (RP-F-00-1715, CC0) dokumentissa vain lyhennettynä nimenä: koko tiedostonimi haettava Commonsista. |
| Montelbaanstoren | `Montelbaanstoren, RP-F-F11597.jpg` (CC0, Rijksmuseum, 1852–1870) ja `4025 Montelbaanstoren.jpg` (CC BY-SA 4.0, Johan Bakker, 2014) | CC0 / CC BY-SA 4.0 | Toinen aikalaiskuva ja nykykuva. |
| Yövartio | `The Night Watch - HD.jpg` | PD (Rijksmuseon skannaus) | Valinnainen. |

## Miniatyyrit (kartan merkki)

js/packs/miniatyyrit.js: `Portugalilainen synagoga` → `amsterdam-portugalilainen-synagoga` ja `Montelbaanstoren` →
`amsterdam-montelbaanstoren` (ämpäritunnukset, kuvaa ei vielä ole; puuttuva kuva putoaa varatäpläksi, kuten Lontoon Baird 1926).
Kuvaputken tilaus: kaksi miniatyyriä.

Pyyntö: vie kaksi pakollista kuvaa mediaan (kuvamitat.json-ajo) ja tilaa kaksi miniatyyriä; valinnaiset KK:n harkinnan mukaan.
