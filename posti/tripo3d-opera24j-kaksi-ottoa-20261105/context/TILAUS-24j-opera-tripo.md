# Codex-tilaus 24j (Tripo 3D -sessio): Opéran malli kuvista #2095 (Karttaseppä 5.11.2026)

Omistaja 5.11. klo 18.52 (kortti, arkki nähty): "Kelpaa (Suositus)". KK katsoi jatketut tornit täysikoossa ennen tätä tilausta ja antoi sanan. **Kokemus: Opéra tunnistuu heti ylhäältä ja viistosta: rikas pääjulkisivu, matala vihreä kupoli, sen takana korkea kolmiopäätyinen näyttämötorni ja kultaiset patsaat katon kulmilla.** Tripon pysyvä lupa (Raamattu 7.15, 11.6). Yksi malli. Ei junaan. Tee 24f:n, 24g:n ja 24i:n jälkeen.

## ENSIN: varmista syöte, ennen kuin käytät krediittejä
Syöte on `opera/tripo-syote/` (`SHA256SUMS` samassa kansiossa, mitat `mitat.json`). Kuvat ovat samassa mittakaavassa ja samalla maaviivalla. **Älä käytä `_review-sarja-24/opera/`:n sivukuvia syötteenä.**

| Tripon paikka | Tiedosto | Kuvassa |
|---|---|---|
| Front | `etela.png` | pääjulkisivu, lyhyt sivu |
| Back | `pohjoinen.png` | takasivu, lyhyt sivu |
| Left | `lansi-peilattu.png` | pitkä sivu, pääjulkisivun pää kuvan vasemmassa reunassa |
| Right | `lansi.png` | pitkä sivu, pääjulkisivun pää kuvan oikeassa reunassa |

Left on kohteen oma vasen (vahvistettu Grand Palais'ssa). `lansi-peilattu.png` on `lansi.png` peilattuna, koska Codexin itäkuvassa on väärä päätykolmio. Sen kirjoitukset ja epäsymmetria eivät ole virhe. Jos Tripo ei hyväksy peilikuvaa, viesti minulle ennen krediittejä.

**Tarkista heti raakamallista, ennen kevennystä:** pääjulkisivu on Front +Z -päässä, ja näyttämötorni on kupolin takana. Jos julkisivu kaksinkertaistuu tai osuu väärään päähän, vaihda Left ja Right ja ota uudestaan. Älä peilaa mallia.

**Sivukupolien tornit `etela.png`:ssä on jatkettu maahan minun kuvankäsittelylläni.** Ne ovat ehjää seinää, eivät keksintöä. Pidä ne umpinaisena seinänä kuvien tapaan.

**Tarkistuslähde, ei syöte:** `_review-sarja-24/opera/`:n `oikea.jpg`, `viisto-lounas.png`, `viisto-koillinen.png`, `ylhaalta.png` ja `opera/jalanjalki.png`. Vertaa niistä vain osien paikkoja. Ei vanhoja kuvia eikä malleja. Ei Googlen laattoja (2.91). Pohja `docs/moduulit/tuotantopohjat/codex-3d-toimitus.md`.

**Kaksi epäonnistunutta ottoa → viesti minulle ennen kolmatta.** Epäonnistunut tarkoittaa esimerkiksi kadonnutta kupolia tai näyttämötornia, sulanutta pääjulkisivua, väärää suhdetta tai väärin päin tullutta rakennusta.

## Malli `opera.glb`
- **Käyttö:** kartan esine, jota katsotaan ylhäältä ja viistosta kaikista suunnista. **LIIKE:** ei liikettä, ei luurankoa.
- **Suhteet sitovat, sallittu ero 7 %, koska sivukuvien korkeudet eroavat toisistaan.** Pituus 1,00, leveys 0,678, korkeus 0,44 (kuvissa 0,41–0,47). Nämä ovat kuvien suhteet. Omistajalle on kerrottu, että etelän kupoli ja näyttämötorni voivat jäädä noin 15–20 % liian korkealle; se katsotaan valmiista mallista.
- **Pääjulkisivu:** pylväät, kaaret ja kultainen räystäs säilyvät. Pylväiden välit ovat tummat tai oikeasti auki.
- **Kupolit ja patsaat:** vihreä pääkupoli, kaksi vihreää sivukupolia ja kultaiset patsasryhmät katon kulmilla. Tee patsaat paksuina, jotta ne kestävät mallinnuksen. Älä keksi patsaita lisää.
- **Pinnat:** vaalea kivi, vihreä kupari, harmaat katot ja kulta kuten kuvissa. Ei varjoja tekstuuriin, ei läpinäkyvyyttä.
- **Akselit ja pivot:** +Y ylös. Front-kuvan puoli (`etela.png`) kohti +Z, pitkä sivu Z-akselin suuntaisena. Origo jalanjäljen rajauslaatikon keskellä, alin piste y = 0, skaala sovellettuna. Mittakaava: 1 yksikkö = 1 m pituudella 222 m. Skaalaa akselit yhtä paljon, älä litistä. Kirjaa lopulliset akselit `huomiot.md`:hen. Asennuskierron teen itse.
- **Pelkkä rakennus:** ei maata, puita, ihmisiä, telineitä eikä kiveystä. Maapohjan teen itse.
- **Tiedosto:** GLB, kaikki upotettuna, ei Dracoa, enintään 15 Mt, enintään 300 primitiiviä, tavoite yksi materiaali, tekstuuri enintään 2048. Portin raja on 100 000 kolmiota.

## Kevennys
Yli 30 000 kolmiota tai yli 2048 tekstuuria: kevennä Tripon omilla työkaluilla ja toimita molemmat, jos kevennys rikkoo pylväät, patsaat tai UV:t. Louvren oppi: kevennys voi romahduttaa UV:t, eikä `codex-3d-tarkistus.mjs` huomaa sitä. Laske nollan UV-alan kolmiot, niiden 3D-ala ja mustat pikselit jokaisesta esikatselusta, ja kirjaa luvut `huomiot.md`:hen. Katso kaikki kuvat täysikoossa.

## Toimitus `opera-3d-v1/` (aja ensin `node tools/codex-3d-tarkistus.mjs`)
`opera.glb`, `SHA256SUMS`, `LAHTEET.md`; `esikatselu/{raaka,kevyt}-{etela,pohjoinen,ita,lansi}.png`, `esikatselu/ylhaalta.png`, pakolliset `esikatselu/pelikulma-{lounas,koillinen}.png` noin 60°:n kulmasta; `huomiot.md`: syötepaikat, akselit, Left/Right-tarkistuksen tulos, kolmiot, tekstuuri, koko ennen kevennystä ja sen jälkeen, otot, mitatut suhteet, UV-luvut, krediitit.

Viesti vain claude/postilaatikko-haaraan. Muita sarjan kohteita ei tehdä Tripolla tämän tilauksen nojalla.
