# Tuileries v2 — tilaus #1992 / 15l, yksi uusi otto

Lähdeposti: posti/karttaseppa-codex-puutarha-tuileries-v2-20261104.md, commit 061945f4d81d916c225d986a31883edba27e50d0, blob 7dbb484fc02a9de9f9d4284fc3436b9384cbb1d7. TILAUS.md, alue.json ja kaikki 12 manifestiliitettä luettu ja SHA256-varmennettu. Uusi maski 088eec8c6053693f4f216bf5816075e9d2ee45f346b038288d01b45cbd1e6f23. Tämä erillinen lähde valtuutti vain Tuileriesin uusinnan; muihin viiteen puutarhaan ei uusia kutsuja.

1 ImageGen-kutsu, 1 kokonaan uusi kuva: **1536 × 1024 RGBA**. Natiivin PNG:n alkuperäiset tavut ja alfa säilytetty; ei rajausta, maskikorjausta, värikorjausta, kokoa muuttavaa käsittelyä eikä lisäottoa. Vanha otto ja sen historia säilyvät.
SHA256: 5a1a485f978380c45ced90a6d5e75094fef2274c8029a0fc60cfe8b725592026

## Mittaukset natiivipikseleistä

- **Alfa vs maski:** alpha>=128-rajauksella XOR **11849 px** = maskin ulkopuolella6795 + sisältä puuttuu5054. IoU0,980660. Täsmällisiä alfaeroja621480px. Alfa min/max0/254; alpha255-pikseleitä0.
- Kahden pikselin Chebyshev-reunatoleranssin ulkopuolella: alpha>0 **8709px**, alpha>=16 **2720px**, alpha>=128 **1592px**; erodoidusta sisäalueesta puuttuualpha>=128 **2660px**. Täsmällinen maski/no-halo-ehto ei täyty.
- **Altaat, veden näkyvän rajauksen keskipiste:** länsi **(438;366,5)**, tavoite(450;355), virhe16,62px; keskimmäinen **(808;532)**, tavoite(690;476), virhe**130,61px**; itä **(1047,5;643,5)**, tavoite(1078;662), virhe35,67px. Vedestä mitatut rajaukset111×114,71×71 ja74×74px; reunakiveys ei sisälly mittoihin. Lännen tavoite noin100px ja keskialtaan noin65px.
- **Polut:** pääakselin vaalea sisäosa kahdesta poikkileikkauksesta **15,5 ja15,5px**, tavoite12–15; pienen käytävän sisäosa **4,0px**, tavoite4–6. Arvioepävarmuus±2px, reunamuste ei sisälly.
- **Latvukset:** pohjoisrivin viisi otantaa **88,76,108,77,108px** (tavoitekoot70/90); länsiryhmän otannat **94,77,35px**. Käsin valitut näkyvät latvuksen reunat±3px, limitys lisää epävarmuutta.
- **Nurmen RGB-keskiarvo kuudesta16×16px otannasta:** **187,76 /162,64 /86,88**, tavoite196/170/106. **Tummien pensasaitojen RGB kolmesta4×4px otannasta:** **127,75 /108,92 /54,00**, tavoite135/112/71. Nämä ovat nimettyjen värialueiden otantoja, eivät koko kuvan semanttisia keskiarvoja. Koordinaatit QA-jsonissa.
- **Katot:** kaksi yhtenäistä vaaleaa harjakattoa oikeilla puutarhan kulmilla. Näkyvän katon likimääräinen rajaus Jeu de Paume x373–530,y60–166 (tavoite385–515,77–155), Orangerie x176–349,y447–560 (tavoite196–357,446–542). Katot ylittävät tilauksen kohderuudut.

## Visuaalinen arvio ja todellinen tila

Lohkoja on selvästi aiempaa enemmän, pienet käytävät ovat kapeampia, pensasaitoja ja kukkakaistoja on runsaasti. Kolme allasta ja kaksi kokonaista vaaleaa harjakattoa näkyvät. Pohjoisrivin latvukset ovat limittäin ja eri kokoisia; länsiryhmissä on vaihtelua. Eteläsivulla ei ole puuriviä, reuna on silmämääräisesti yhtenäinen. Keskiallas jäi huomattavasti liian itään; myös muut allaspaikat ja kahden katon rajaukset poikkeavat tavoitteista. Pohjoisrivin suurimmat latvukset ovat liian suuria ja ylittävät paikoin maskin. Sävyissä on edelleen keltaisuutta; alfa ei ole täsmälleen maski. Sinitaustalla ei näy laajaa tummaa varjoa, mutta numeerinen alfamittaus osoittaa heikkoa alfaa yli kahden pikselin rajan.

**QA tehty; kokonais-QA EI läpäisty.** Tämä on yhden sallitun oton arviointitoimitus Karttasepälle/KK:lle, ei hyväksytty tuotantokuva. Etenkin keskiallas ja maskin vastaavuus tarvitsevat vastaanottajan käyttöpäätöksen. Vastaanottajan hyväksyntää, koodikoostamista, runtime-kytkentää tai pelijulkaisua ei ole varmennettu.

Paikallinen kuva, lähdevarmennus, kehote ja QA-kuvat:
/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-tuileries-v2
Käytetty sisäänrakennettua image_gen-työkalua; täysi kehote prompt.json, diagnostiikka qa/checks.json ja qa/measurement-locations.jpg. Diagnostiikka ei ole toimituskuva.
