# Codex-tilaus 24n (Tripo 3D -sessio): Sacré-Cœurin malli kuvista #2127 (Karttaseppä 5.11.2026)

Omistaja 5.11. klo 20.13 (kortti, arkki nähty): "Kelpaa (Suositus)". **Kokemus: vaalea kirkko suippoine kupoleineen ja kellotorneineen vihreän mäen päällä, ja mäki laskeutuu pehmeästi kartan tasoon.** Tripon pysyvä lupa (Raamattu 7.15, 11.6). Yksi malli. Ei junaan. Tee 24j:n, 24l:n ja 24m:n jälkeen.

Codexin QA FAIL koskee kuvien yhteistä mittakaavaa ja viistojen kulmaa. Omistaja on hyväksynyt kuvat saatuaan tiedon, että mäki voi tulla 3D:ssä tilattua pyöreämmäksi.

## ENSIN: varmista syöte, ennen kuin käytät krediittejä
Syöte on `sacre-coeur/tripo-syote/` (`SHA256SUMS` samassa kansiossa). Kuvat ovat Codexin alkuperäisiä, muokkaamattomia.

| Tripon paikka | Tiedosto | Kuvassa |
|---|---|---|
| Front | `etela.png` | pääjulkisivu, portaat ja terassi |
| Back | `pohjoinen.png` | kellotorni edessä |
| Left | `ita.png` | pitkä sivu, kellotorni kuvan oikeassa reunassa |
| Right | `lansi.png` | pitkä sivu, kellotorni kuvan vasemmassa reunassa |

**Kuvien mittakaava ei ole sama:** etelä- ja pohjoiskuvat on piirretty noin 1,9-kertaisina itä- ja länsikuviin nähden. Älä skaalaa kuvia. Käytä niitä sellaisina.

**Tarkistuslähde, ei syöte:** `ylhaalta.png`, `viisto-lounas.png`, `viisto-koillinen.png`, `oikea.jpg` ja `geometria.json` Codexin toimituksesta `posti/codex-karttaseppa-sarja24k-sacre-coeur-20261105/` (kopio `sacre-coeur/tripo-syote/tarkistus/`). Ei vanhoja kuvia eikä malleja. Ei Googlen laattoja (2.91). Pohja `docs/moduulit/tuotantopohjat/codex-3d-toimitus.md`.

**Kaksi epäonnistunutta ottoa → viesti minulle ennen kolmatta.** Epäonnistunut tarkoittaa esimerkiksi väärinpäin olevaa kellotornia, sulaneita kupoleja, mäen läpi näkyvää kirkkoa tai pystyseinämäistä mäkeä.

## Malli `sacre-coeur.glb`
- **Käyttö:** kartan esine, jota katsotaan ylhäältä ja viistosta kaikista suunnista. **LIIKE:** ei liikettä, ei luurankoa.
- **Sitovat muodot:** suuri suippo keskikupoli, neljä pienempää kupolia, kellotorni pohjoispäässä samalla akselilla, eteläterassi kolmine kaarineen ja portaat etelään. Ratsastajapatsaat saavat yksinkertaistua.
- **Mäki on osa mallia:** yksi kappale kirkon kanssa. Reunan on ohennuttava maatasoon, ei paksua levyä eikä pystyseinää. Pohja ei saa näkyä reunasta kohonneena.
- **Suhteet:** tavoite on mäki 420 × 200 m ja kirkko noin 200 × 100 m, kupolin kärki 230 m maasta. **Mäen pitkän ja lyhyen sivun suhde saa poiketa, koska kuvien mittakaava poikkeaa: älä korjaa sitä litistämällä.** Mittaa ja kirjaa mäen ja kirkon toteutuneet suhteet `huomiot.md`:hen. Jos mäki on selvästi pyöreämpi kuin 0,86 tai kirkko on mäkeä leveämpi, viesti minulle kuva mukana ennen uutta ottoa.
- **Katto ja kupolit:** näkyvät pelissä eniten, joten tarkista ne heti raakamallista. Kirkko on lähes valkoista kiveä, sivukatot harmaat ja mäki vihreä.
- **Pinnat:** ei varjoja tekstuuriin, ei läpinäkyvyyttä, ei taustan väriä reunoissa.
- **Akselit ja pivot:** +Y ylös. Front-kuvan puoli (`etela.png`) kohti +Z, mäen pitkä sivu Z-akselin suuntaisena. Origo mäen jalanjäljen rajauslaatikon keskellä, alin piste y = 0, skaala sovellettuna. Mittakaava: 1 yksikkö = 1 m niin, että mäen pitkä sivu on 420 m. Skaalaa akselit yhtä paljon, älä litistä. Kirjaa lopulliset akselit `huomiot.md`:hen. Asennuskierron teen itse.
- **Vain tämä:** ei puita, ihmisiä, telineitä, katuja eikä kiveystä mäen ulkopuolella.
- **Tiedosto:** GLB, kaikki upotettuna, ei Dracoa, enintään 15 Mt, enintään 300 primitiiviä, tavoite yksi materiaali, tekstuuri enintään 2048. Portin raja on 100 000 kolmiota.

## Kevennys
Yli 30 000 kolmiota tai yli 2048 tekstuuria: kevennä Tripon omilla työkaluilla ja toimita molemmat, jos kevennys rikkoo kupolit tai UV:t. Louvren oppi: kevennys voi romahduttaa UV:t, eikä `codex-3d-tarkistus.mjs` huomaa sitä. Laske nollan UV-alan kolmiot, niiden 3D-ala ja mustat pikselit jokaisesta esikatselusta, ja kirjaa luvut `huomiot.md`:hen. Katso kaikki kuvat täysikoossa.

## Toimitus `sacre-coeur-3d-v1/` (aja ensin `node tools/codex-3d-tarkistus.mjs`)
`sacre-coeur.glb`, `SHA256SUMS`, `LAHTEET.md`; `esikatselu/{raaka,kevyt}-{etela,pohjoinen,ita,lansi}.png`, `esikatselu/ylhaalta.png`, pakolliset `esikatselu/pelikulma-{lounas,koillinen}.png` noin 60°:n kulmasta; `huomiot.md`: syötepaikat, akselit, kolmiot, tekstuuri, koko ennen kevennystä ja sen jälkeen, otot, mitatut suhteet, UV-luvut, krediitit.

Viesti vain claude/postilaatikko-haaraan. Muita sarjan kohteita ei tehdä Tripolla tämän tilauksen nojalla.
