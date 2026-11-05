# Codex-tilaus 24l (Tripo 3D -sessio): Invalidien malli kuvista #2114 (Karttaseppä 5.11.2026)

Omistaja 5.11. klo 19.14 (kortti, arkki ja pohjavertailu nähty): "Kelpaa (Suositus)". Omistajalle on kerrottu poikkeamat: kupoli noin 10 % oikeaa matalampi ja pohjoissiipi noin 10 % leveämpi. **Kokemus: Invalidit tunnistuvat heti ylhäältä ja viistosta: korkea kultainen kupoli kirkon päällä, sen takana iso avoin kunniapiha ja ympärillä matalat harmaakattoiset siivet avoimine pihoineen.** Tripon pysyvä lupa (Raamattu 7.15, 11.6). Yksi malli. Ei junaan. Tee 24g:n, 24i:n ja 24j:n jälkeen.

**Tärkein ehto: pihat ovat auki.** Kunniapiha ja pienet pihat ovat rakennuksen tunnistettavin osa ylhäältä katsottuna. Jos pihat täyttyvät tai katot sulkevat ne, otto on epäonnistunut.

## ENSIN: varmista syöte, ennen kuin käytät krediittejä
Syöte `invalides/tripo-syote/` (`SHA256SUMS` samassa kansiossa). Sama tapa kuin Louvren neljännessä otossa, koska pihat eivät näy sivukuvista.

| Tripon paikka | Tiedosto | Kuvassa |
|---|---|---|
| Front | `viisto-lounas.png` | lounaasta: kupoli ja etupylväikkö lähimpänä, J-siipi kuvan oikeassa alakulmassa |
| Back | `viisto-koillinen.png` | lähes pohjoisesta, ei täsmällinen vastakulma: pohjoissiipi ja portti lähimpänä, kupoli takana |
| Left, Right | tyhjinä | |

**Sivukuvat eivät ole syöte, eikä `pohjoinen.png`:n mittoja käytetä pohjan muotoon:** siinä pohjoissiipi täyttää koko leveyden, vaikka sivukorttelit pistävät sen ohi.

**Tarkista heti raakamallista, ennen kevennystä:** pihat auki, kupoli eteläpäässä, J-siipi kaakossa, pohjoissiipi yhtenä kappaleena. Jos Tripo ei ota näitä kahta kuvaa yhdessä tai piha täyttyy, viesti minulle ennen seuraavaa ottoa.

**Tarkistuslähde, ei syöte:** `_review-sarja-24/invalides-otto2/`:n `ylhaalta.png`, `etela.png`, `pohjoinen.png`, `ita.png`, `lansi.png`, `oikea.jpg` ja `_tyo/karttaseppa/sarja24-opera-pantheon-montparnasse/invalides/pohja-vertailu.jpg`. **`ylhaalta.png` ratkaisee pihojen määrän ja paikat** (etelän länsipuolella 4 pihaa, itäpuolella 6, pohjoisessa kunniapiha ja 2 + 2 pientä). Älä noudata tilauksen 24e lukuja 3 ja 4: ne olivat virheeni. Codexin oman `huomiot.md`:n FAIL koskee tilauksen lukuja; omistaja on hyväksynyt kuvat. Ei vanhoja kuvia eikä malleja. Ei Googlen laattoja (2.91). Pohja `docs/moduulit/tuotantopohjat/codex-3d-toimitus.md`.

**Kaksi epäonnistunutta ottoa → viesti minulle ennen kolmatta.** Epäonnistunut tarkoittaa esimerkiksi täyttyneitä pihoja, kadonnutta kupolia tai kärkeä, sulanutta pohjaa tai väärin päin tullutta rakennusta.

## Malli `invalides.glb`
- **Käyttö:** kartan esine, jota katsotaan ylhäältä ja viistosta kaikista suunnista. **LIIKE:** ei liikettä, ei luurankoa.
- **Suhteet sitovat, sallittu ero 7 %.** Itä-länsi-leveys 1,00. Etelä-pohjoinen J-siipi mukaan lukien 1,13. Korkeus maasta kupolin kärkeen 0,37. Siivet noin 0,09.
- **Kupoli:** kultainen kupoli, lyhty ja risti säilyvät. Tee risti paksuna, jotta se kestää mallinnuksen.
- **Pinnat:** vaalea kivi, harmaat katot, kulta ja pihojen vaalea kivi kuten kuvissa. Arkadit tummat tai oikeasti auki. Ei varjoja tekstuuriin, ei läpinäkyvyyttä.
- **Akselit ja pivot:** +Y ylös. Kupolipää (etelä) kohti +Z, pohjoissiipi kohti −Z, itä kohti +X, joten J-siipi on +X +Z -kulmassa. Origo rajauslaatikon keskellä, alin piste y = 0, skaala sovellettuna. Mittakaava: 1 yksikkö = 1 m, itä-länsi-leveys 363 m. Saat kiertää mallin näihin akseleihin, mutta älä peilaa, venytä tai litistä. Kirjaa lopulliset akselit `huomiot.md`:hen. Karttakierron teen itse.
- **Pelkkä rakennus:** ei maata, puita, ihmisiä, telineitä eikä kiveystä pihojen ulkopuolella. Pihojen lattiat kuuluvat malliin, jotta pihan pohja ei ole aukko. Maapohjan teen itse.
- **Tiedosto:** GLB, kaikki upotettuna, ei Dracoa, enintään 15 Mt, enintään 300 primitiiviä, tavoite yksi materiaali, tekstuuri enintään 2048. Portin raja on 100 000 kolmiota.

## Kevennys
Yli 30 000 kolmiota tai yli 2048 tekstuuria: kevennä Tripon omilla työkaluilla ja toimita molemmat, jos kevennys rikkoo pihat tai UV:t. Louvren oppi: kevennys teki pihaan varjostuskolmioita ja UV-railoja, eikä `codex-3d-tarkistus.mjs` huomaa sitä. Laske nollan UV-alan kolmiot, niiden 3D-ala ja mustat pikselit jokaisesta esikatselusta, ja kirjaa luvut `huomiot.md`:hen. Katso kaikki kuvat täysikoossa.

## Toimitus `invalides-3d-v1/` (aja ensin `node tools/codex-3d-tarkistus.mjs`)
`invalides.glb`, `SHA256SUMS`, `LAHTEET.md`; `esikatselu/{raaka,kevyt}-{etela,pohjoinen,ita,lansi}.png`, `esikatselu/ylhaalta.png`, pakolliset `esikatselu/pelikulma-{lounas,koillinen}.png` noin 60°:n kulmasta; `huomiot.md`: syötepaikat, akselit, pihojen tarkistus (avoimet pihat yläkuvassa ja näyte säteillä), kolmiot, tekstuuri, koko ennen kevennystä ja sen jälkeen, otot, mitatut suhteet, UV-luvut, krediitit.

Viesti vain claude/postilaatikko-haaraan. Muita sarjan kohteita ei tehdä Tripolla tämän tilauksen nojalla.
