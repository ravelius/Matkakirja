# Codex → PT / Natiivi-UI: alkulennon nimiteksti KIELLETTY KAUPUNKI / 1914 — tehtävä 947

Lähde `fable-codex-kuvat-alkulento-elokuvateksti-20261024.md`, commit 77e616e6879f82f97afd3e8742406a411e8ae9a1. Lähde luettu kokonaan ja 810/01-liitteen täydet tavut varmennettu.

Toimituskansio: **`posti/codex-fable-alkulento-elokuvateksti-20261024/`**.

- `alkulento-otsikko-rivi1.png`: **KIELLETTY KAUPUNKI**, RGBA 3000 × 264.
- `alkulento-otsikko-rivi2.png`: **1914**, RGBA 3000 × 1030; näytetään 14 %:n leveydellä pääotsikosta, ei samalla leveydellä.
- `alkulento-otsikko-koko.png`: molemmat rivit yhdessä, RGBA 3000 × 476.
- `esikatselu-vaaka.png`: 2732 × 2048.
- `esikatselu-pysty.png`: 2048 × 2732.

Väritys on lämmin vaalea ivory/kulta ja kirjasin klassinen antiikva ohuella tummalla ääriviivalla. Ei Beijing/Peking-lisäystä, muuta tekstiä, kehystä tai taustalaattaa. Molempien esikatselujen koko nimiteksti on ylimmässä kolmanneksessa. Teksti, aidot alpha-kanavat, täysin läpinäkyvät ulkoreunat ja mittakoot on tarkistettu. Vaalean ja tumman taustan täysikokoiset vertailut ovat `qa/`-kansiossa. `review.html` avaa koko paketin ja täysikokoiset esikatselut.

**Tarkkuus avoimesti:** kaksi kokonaista sisäänrakennettua image_gen-generointia, native 2146 × 733 (nimiasettelu) ja 2070 × 760 (suuri vuosiluku). 3000 px:n rivit ovat teknisiä rajattuja ja suhteellisesti skaalattuja vientiversioita; niitä ei väitetä 3000 px:n natiivigeneroinneiksi. Glyphien muotoja ei korjattu osittain. 810/01-taustaa ei generoitu uudelleen; pystyesikatselu on alkuperäisen keskeltä rajattu sovitus. Katso `README-FI.md`, `LAYOUT.json`, `DELIVERY-MANIFEST.json`, `PROMPTS.json` ja `qa/QA.json`.

PT hyväksyy täysikokoisena. Natiivi-UI tekee rivien erilliset sisääntulot ja noin 7 s:n näyttöajan sekä pelikytkennän junaan 210. **Omistajalle näytetään varsinainen pelikuva ennen junaa.** Tässä toimitetut kuvat ovat havainnekuvan päälle tehtyjä sommitteluesikatseluja, eivät se pelikuva. PT/omistajahyväksyntä, runtime-kytkentä ja julkaisu ovat vielä erillisiä avoimia vaiheita. Ei 3D- tai pelimuutoksia eikä R2-/pelijulkaisua. Aiempi 942b-tuotanto pysyy suljettuna.
