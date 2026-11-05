# Codex-tilaus 24m (Tripo 3D -sessio): Tour Montparnassen malli kuvista #2124 (Karttaseppä 5.11.2026)

Omistaja 5.11. klo 19.28 (kortti, arkki nähty): "Kelpaa (Suositus)". **Kokemus: tumma, sileä lasitorni, joka erottuu heti Pariisin vaaleasta kivestä, ja sen muoto tunnistuu ylhäältä ja viistosta.** Tripon pysyvä lupa (Raamattu 7.15, 11.6). Yksi malli. Ei junaan. Tee 24g:n, 24i:n, 24j:n ja 24l:n jälkeen.

Codexin QA FAIL koskee kapean idän mittaa ja viistojen kulmaa. Omistaja on hyväksynyt kuvat tiedoksi saatuaan.

## ENSIN: varmista syöte, ennen kuin käytät krediittejä
Syöte on `montparnasse/tripo-syote/` (`SHA256SUMS` samassa kansiossa, mitat `mitat.json`). Kuvat ovat Codexin alkuperäisiä, samassa mittakaavassa ja samalla maaviivalla (y = 920).

| Tripon paikka | Tiedosto | Kuvassa |
|---|---|---|
| Front | `etela.png` | leveä sivu, oikeasti kaakko |
| Back | `pohjoinen.png` | leveä sivu, oikeasti luode |
| Left | `lansi.png` | kapea sivu |
| Right | `lansi.png` | sama kuva |

Sama kuva kahdessa paikassa on tarkoituksellinen, koska `ita.png` on noin 13 % liian kapea. **Älä käytä `ita.png`:tä.** Jos Tripo ei ota samaa kuvaa kahteen paikkaan, pysähdy ja viesti minulle ennen krediittejä.

**Tarkistuslähde, ei syöte:** `_review-sarja-24/montparnasse-otto2/`:n `ylhaalta.png`, `viisto-lounas.png`, `viisto-koillinen.png`, `oikea.jpg` ja `montparnasse/jalanjalki.png`. Ei vanhoja kuvia eikä malleja. Ei Googlen laattoja (2.91). Pohja `docs/moduulit/tuotantopohjat/codex-3d-toimitus.md`.

**Kaksi epäonnistunutta ottoa → viesti minulle ennen kolmatta.** Epäonnistunut tarkoittaa esimerkiksi väärää pohjan muotoa, kadonneita pystylinjoja, vaaleita riipoja tai väärää suhdetta.

## Malli `montparnasse.glb`
- **Käyttö:** kartan esine, jota katsotaan ylhäältä ja viistosta kaikista suunnista. **LIIKE:** ei liikettä, ei luurankoa.
- **Suhteet sitovat, sallittu ero 5 %.** Leveä sivu 1,00, kapea sivu 0,63, korkeus 3,39 (62 × 39 × 210 m). Mitataan ylimpään tasoon ilman antenneja.
- **Pohja:** loivasti kuperat pitkät sivut ja kapeat pyöristetyt päädyt kuten `ylhaalta.png`:ssä. Ei suorakulmaista laatikkoa eikä soikiota. Sama muoto koko korkeudelta.
- **Julkisivu:** tumma, hieman pronssiin vivahtava lasi ja tiheät ohuet pystylinjat. Ei leveitä vaaleita ripoja eikä vaakanauhoja. Kerrosjako enintään aivan hentona. Ei sinistä, ei kiven väriä.
- **Katto:** tumma kansi, vaalea reunus ja rengas kuten `ylhaalta.png`:ssä, koska katto näkyy pelissä eniten. **Sivukuvat eivät näytä kattoa, joten tarkista se heti raakamallista.** Jos katto jää tyhjäksi tai sotkuiseksi, älä generoi uudelleen: viesti minulle kuva mukana.
- **Pinnat:** ei varjoja tekstuuriin, ei läpinäkyvyyttä, ei taustan väriä reunoissa.
- **Akselit ja pivot:** +Y ylös. Front-kuvan puoli (`etela.png`) kohti +Z, leveä sivu X-akselin suuntaisena. Origo jalanjäljen rajauslaatikon keskellä, alin piste y = 0, skaala sovellettuna. Mittakaava: 1 yksikkö = 1 m leveydellä 177 m, jolloin korkeus on noin 600 m ja syvyys noin 111 m. Sarjan koot ovat tarkoituksella suuret, kuten Eiffelissä. Skaalaa akselit yhtä paljon, älä litistä. Kirjaa lopulliset akselit `huomiot.md`:hen. Asennuskierron teen itse.
- **Pelkkä torni:** ei maata, ostoskeskusta, antenneja, puita, ihmisiä, telineitä eikä kiveystä. Maapohjan teen itse.
- **Tiedosto:** GLB, kaikki upotettuna, ei Dracoa, enintään 15 Mt, enintään 300 primitiiviä, tavoite yksi materiaali, tekstuuri enintään 2048. Portin raja on 100 000 kolmiota.

## Kevennys
Yli 30 000 kolmiota tai yli 2048 tekstuuria: kevennä Tripon omilla työkaluilla ja toimita molemmat, jos kevennys rikkoo pystylinjat tai UV:t. Louvren oppi: kevennys voi romahduttaa UV:t, eikä `codex-3d-tarkistus.mjs` huomaa sitä. Laske nollan UV-alan kolmiot, niiden 3D-ala ja mustat pikselit jokaisesta esikatselusta, ja kirjaa luvut `huomiot.md`:hen. Katso kaikki kuvat täysikoossa.

## Toimitus `montparnasse-3d-v1/` (aja ensin `node tools/codex-3d-tarkistus.mjs`)
`montparnasse.glb`, `SHA256SUMS`, `LAHTEET.md`; `esikatselu/{raaka,kevyt}-{etela,pohjoinen,ita,lansi}.png`, `esikatselu/ylhaalta.png`, pakolliset `esikatselu/pelikulma-{lounas,koillinen}.png` noin 60°:n kulmasta; `huomiot.md`: syötepaikat, akselit, kolmiot, tekstuuri, koko ennen kevennystä ja sen jälkeen, otot, mitatut suhteet, UV-luvut, krediitit.

Viesti vain claude/postilaatikko-haaraan. Muita sarjan kohteita ei tehdä Tripolla tämän tilauksen nojalla.
