# 1.0.27-kokeilu: symbolimallit luettaviksi ylhäältä (Natiivisepän apuagentti, 26.9.2026 klo 21.5x)

Haara `natiiviseppa/ylhaalta-175`, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-ylhaalta, pohja juna/b13 cd41e4fa.
Editoria, batchia, xcodebuildia, simulaattoria ja laitetta EI ajettu, joten mitään ruudulla näkyvää ei ole todennettu.
Kuvat ovat Python-esikatseluja samasta geometriasta, eivät Unityn kuvia.

## Tila

| Mitä | Missä | Tila |
|---|---|---|
| A–D + ääriviiva + 15°:n oma kallistus (E:n 1. versio) | commit **f5900358** | commitoitu; unity-tarkistus 0 virhettä, Kartta-testit Arkkityyppi 4/4 |
| E uusiksi: liioiteltu perspektiivi Linssisepän käyrällä | `perspektiivi-f5900358.patch` (tässä kansiossa) | EI commitoitu, katso alla |

**Perspektiivi odottaa mergeä.** `git merge --no-edit linssiseppa/perspektiivi` estettiin käyttöoikeusluokittimessa
(jaetun resurssin muokkaus), joten en mergennyt enkä kiertänyt estoa. Patch käyttää luokkaa
`Matkakirja.Linssit.Kamera.LiioiteltuPerspektiivi`, joka on vain siinä haarassa. Käyttöönotto:

```
cd /Users/Shared/Claude/wt/proto-natiiviseppa-ylhaalta
git merge --no-edit linssiseppa/perspektiivi
git apply /Users/Shared/Claude/proto-3d/lokit/ylhaalta-175/perspektiivi-f5900358.patch
Peli-testit/unity-tarkistus.sh      # ajettu yksityisessä kopiossa (f5900358 + patch + käyrätiedosto): 0 virhettä
git commit -am "..."
```

`git apply --check` menee läpi f5900358:aa vasten. Patch korvaa 15°:n oman kallistuksen (komento `symbolit iso`
poistuu).

## Valitut keinot

- **A. Pohjapiirros symbolina.**
  - Linna: neliömuuri 0,7 × 0,7, 4 pyöreää kulmatornia (kartiokatto r 0,12) ja päätorni keskellä 0,22 × 0,22. Piha on auki.
  - Kirkko: latinalainen risti, eli laiva 0,72 × 0,2 ja poikkilaiva 0,16 × 0,5 (keskipiste x 0,15) sekä länsitorni neliönä pyramidikatolla. Ei apsista eikä sivulaivoja. Pohjapiirros on keskitetty origoon.
  - Majakka: samankeskiset renkaat, eli jalusta (laki Valo), raidallinen torni 0,17 → 0,1, tumma parveke (Varjo), vaalea lyhty ja pieni lakki. Talo on poistettu.
- **B. Paletti.**
  - Laet ovat Paperi #ede3c7 tai Valo, sivut Pinta.
  - Katoissa on vain TerrakottaHimmea, ja lappeen alareunassa vaalea räystäskaista (20 %; `HarjaRaystas`, `KartioRaystas`, `PyramidiRaystas`). Harjan suunta erottuu siis ilman valoakin.
  - Varjo on vain parvekkeessa ja portissa.
  - Varjostimen valo on nyt 0,62 + 0,38 · N·L (ennen 0,55 + 0,45), ja ylöspäin olevat tahkot nostetaan puoliksi kohti täyttä valoa, jotta katto on vaalein valon suunnasta riippumatta.
- **C. Ääriviiva, joka näkyy myös suoraan ylhäältä.**
  - Toteutus on toinen piirto samalla verkolla omalla materiaalillaan (`ReunaMateriaali`: `_Reuna` 1, Cull Off, ZWrite Off, ZTest LEqual). Jono: maakontakti −2, ääriviiva −1, malli.
  - Rakentaja tallentaa UV1:een jokaiselle osalle (laatikko, torni, katto …) vaakasuunnan osan keskipisteestä puolileveyksillä normitettuna. Varjostin kasvattaa osaa `_Tila.z` verran (= ReunaPt / mallin koko pt), joten viiva on 1,2 pt ruudulla jokaisella osalla ja myös LOD1:llä.
  - Alle 0,035 puolileveyden osat (hampaat, risti, ikkunat) ovat ilman viivaa, koska ne muuttuivat mustiksi möykyiksi. Maakontaktissa ei ole viivaa.
  - **Poikkeama ohjeesta:** Cull Front (klassinen inverted hull) ei piirrä suoraan ylhäältä mitään, koska malleissa ei ole pohjatahkoja. Siksi Cull Off ja piirto ennen mallia. Todiste: `kuvat/vertailu-Linna-reunaviiva-culloff-vs-cullfront-ylhaalta.png` (vasen Cull Off, oikea Cull Front).
  - **Tulkinta:** väri (0,23, 0,19, 0,14) on otettu näyttöarvona (sRGB #3b3024, lineaarisena 0,0395 / 0,026 / 0,0132). Lineaarisena, kuten kaiverrusreunan vakio, se näkyisi keskiharmaanruskeana #837968 eikä tummana. Arvo on varjostimen rivillä `if (_Reuna > 0.5) return half4(...)`.
  - Sisäviivoja osien välillä ei tule, koska malli peittää ne. Ne näkyvät vain pihojen kaltaisista aukoista.
- **D.** Maakontakti on siirretty 0,06 yksikköä kaakkoon (`PohjaSiirto`). Patchissa levy pysyy maassa, kun malli kallistuu: tasolla 1 se on mallin sisar, instansseilla matriisi lasketaan ilman kallistusta.
- **E. Liioiteltu perspektiivi (patch).**
  - Tasolla 1 ja instansseille Laske23:ssa (lepo säilyy) jalan ruutupisteestä lasketaan `LiioiteltuPerspektiivi.Kallistus`, samoin kuin Lipputangossa.
  - Kierto on `R = FromToRotation(n, n·cos k + d·sin k)`, missä d = dx · kameran oikea + dy · kameran ylös tangenttitasossa. Pivot on jalassa.
  - Jalkaa nostetaan pohjan ulottuman verran suuntaan d kertaa sin k (laatikon tukifunktio verkon rajoista, instansseilla LOD0:sta).
  - `symbolit perspektiivi <aste>` (oletus 55 = käyrä sellaisenaan; muu arvo skaalaa; 0 = pois). Vain `ylhaalta 3d`.
- **Kytkimet:**
  - `symbolit ylhaalta 3d|2d`: oletus 3d kokeiluhaarassa. 3d näyttää Linnan, Kirkon ja Majakan myös pystysuorasta ja käyttää perspektiiviä. 2d on 1.0.26:n sääntö.
  - `symbolit reuna <pt>`: oletus 1,2, 0 = pois.
  - `symbolit tila` näyttää kaikki kytkimet.
  - Komennot.cs:ään tuli yksi delegointirivi (`else Symbolimallit.Komento(o);`) ja ohjerivit. Tämä on ainoa muutos sallittujen tiedostojen ulkopuolella, ja ilman sitä uudet komennot eivät toimisi.
- **Korjaus matkalla, KOSKEE MYÖS 1.0.26:TA:** Laske23 ei tarkistanut kallistusta, vaikka OnMalli tarkisti (175b). Koodin mukaan pystysuorassa kamerassa tasojen 2–3 3D-instanssit piirtyvät kertoimesta 2,5 alkaen, ja samalla Natiivi-UI näyttää 2D-symbolin. Tämä on vain koodin luennan tulos, ruudulla sitä ei ole todennettu. Korjattu tässä haarassa: Laske23 käyttää samaa ehtoa kuin OnMalli.

## Kolmiot (stub-ajurilla samasta koodista: `kolmiot-ennen.txt`, `kolmiot-jalkeen.txt`)

| | LOD0 ennen → jälkeen | LOD1 ennen → jälkeen |
|---|---|---|
| Linna | 315 → **365** | 122 → **122** |
| Kirkko | 116 → **94** | 30 → **62** |
| Majakka | 195 → **218** | 84 → **84** |

Kaikki alittavat budjetin (LOD0 ≤ 600, LOD1 ≤ 150), ja muut arkkityypit ovat ennallaan. Ääriviiva piirtää saman verkon
toiseen kertaan, joten piirretyt kolmiot ja tasojen 2–3 piirtokutsut kaksinkertaistuvat (enintään 2 × 30 + 1).

## Esikatselu (`kuvat/`, skripti `skriptit/`)

- Kaikki sarjat piirretään kameralla, joka katsoo suoraan ylhäältä.
  - LOD0 (`pari-*-LOD0-ylhaalta.png`): ennen | jälkeen keskellä (0°) | puolivälissä (27,5°) | reunassa (55°).
  - LOD1 (`pari-*-LOD1-ylhaalta.png`): ennen | keskellä | reunassa.
- Kamera 30° (`pari-*-LOD0-kamera30.png`): ennen | jälkeen keskellä | jälkeen reunassa (käyrä häipyy 5,7°:seen).
- Yksittäiskuvat on rajattu ilman tyhjää reunaa, ja jokainen on vähintään 350 px. Kooste: `kooste-LOD0-ylhaalta.png`.
- Mittakaava vastaa 40 pt:n mallia (1,2 pt:n viiva = 0,03 yksikköä), ja kohde on ruudun yläpuolella (suunta pohjoiseen).
- Rajoitukset:
  - Kamera on ortografinen, joten todellinen perspektiivi, maasto ja usva puuttuvat.
  - Valon suunta on oletettu luoteesta ylhäältä, koska laitteen päävaloa en tiedä.
  - Kartan tausta on näyte 160-kuvasta.
  - Ennen-sarakkeet ovat vanhaa geometriaa vanhalla varjostinkaavalla. 1.0.26:ssa pystysuorasta näkyy oikeasti 2D-symboli.
- Toisto: `sh skriptit/kaanna.sh <Kartta-kansio> <tuloskansio>` ja sen jälkeen `SS=2 python3 skriptit/esikatselu.py <ennen> <jälkeen> <kuvat> Linna 0`.

## Katsottava simulaattorissa (käännöksen ja mergen jälkeen)

1. **Varjostin kääntyy**, eikä lokissa ole virheitä. `_Cull`- ja `_Reuna`-ominaisuudet ovat uusia, ja maakontaktin verkolla on nyt UV1-nollat.
2. **Ääriviiva:**
   - Leveys on noin 1,2 pt kaikilla kolmella, ylhäältä ja kallistettuna, myös tasojen 2–3 pienillä malleilla.
   - Järjestys on maakontakti, ääriviiva, malli: viiva ei piirry mallin päälle.
   - Viiva ei välky.
   - Sävy: tumma (#3b3024) vai liian raskas? Vaihtoehtona `symbolit reuna 0.8` tai lineaarinen tulkinta.
3. **Ylhäältä (kallistus 0°):**
   - Linna, Kirkko ja Majakka näkyvät 3D:nä, ja niiden 2D-symboli on piilossa (Natiivi-UI:n OnMalli).
   - Muut lajit näkyvät 2D:nä.
   - Kuvapari `symbolit ylhaalta 2d` ↔ `3d` samasta käännöksestä.
4. **Perspektiivi (patchin jälkeen):**
   - Keskellä malli näkyy suoraan ylhäältä, ja reunoja kohti se kallistuu ulospäin niin, että keskustaa kohti oleva kylki näkyy. Kulma kasvaa tasaisesti panoroitaessa.
   - Kartan kierto (suuntima) ei vaihda kallistuksen suuntaa väärin.
   - Pohja ei uppoa maahan reunalla (jalan nosto), ja maakontakti pysyy maassa kaakossa.
   - Häivytys kameran kallistuksessa 0 → 40° on pehmeä, eikä 25°:n kohdalla hypi (muut lajit tulevat näkyviin 28°:ssa).
5. **Kallistettu näkymä:** räystäskaistat, vaaleampi valo ja sivujen sävy (Pinta ei harmaa?). Erikoismallit (Akropolis, Delfoi, Meteora) ja muut arkkityypit saavat myös ääriviivan ja uuden valon, joten tarkista ne.
6. **Tasot 2–3 pystysuorassa kamerassa `ylhaalta 2d` -tilassa:** 3D-instansseja ei enää näy 2D-merkkien kanssa päällekkäin (korjaus). Tarkista myös 1.0.26:sta, esiintyykö kaksoisnäkymä siellä.
7. **Kehysmittaus:** `symbolit reuna 0` vs 1,2 samassa näkymässä. Ääriviiva kaksinkertaistaa piirtokutsut ja kolmiot. Levossa ei saa tulla ylimääräisiä kehyksiä (perspektiivi lasketaan vain Laske23:ssa).
