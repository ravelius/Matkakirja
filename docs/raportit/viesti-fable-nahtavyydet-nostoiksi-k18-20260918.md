# Viesti Fablelle: nähtävyyskartan kohteet liuskan nostoiksi (PAATOKSET 34 kohta 18)

Haara `claude/bold-ride-vow4ki-nahtavyydet-nostoiksi-k18` (base main = v1942).
Ei PR:ää, ei versionnostoa, Raamattuun ja sarjat.jsoniin ei koskettu.

## Tila

- **a) TOTEUTETTU** — nähtävyyskartalle jäävät vain piirretyt nähtävyysrakennukset.
- **b) TOTEUTETTU** — kohteet ilman piirrosta ovat kaupungin sisäisiä nostoja
  kaupunkiliuskan kategorioissa ja avautuvat samalla kortilla kuin ennen kartalta.
- **c) TOTEUTETTU** — arkissa on enää yksi NÄHTÄVYYDET-otsikko (osion oma h3 pois).
- **d–g) TOTEUTETTU** — Kokoruutu on oikea nappi kartan yläpuolella, kartan
  päälliskyltit ja +/- -painikkeet pois nähtävyysarkilta.

## Mitä data erottaa lajit

Kartan kolme merkkilajia (omistajan iPhone-kuva 18.9.2026) vastasivat dataa näin:

| merkki kuvassa | data | Pariisissa |
| --- | --- | --- |
| piirretty rakennus | `MINIATYYRIT[kaupunki][nimi]` osoittaa toimitettuun kuvaan | 12 |
| vaalea ympyrä | kohteella EI ole miniatyyrimerkintää | 12 |
| sininen kysymysmerkki | miniatyyrimerkintä on, mutta ämpärissä ei ole tiedostoa (404) → WebKitin rikkinäisen kuvan merkki | 7 |

Kysymysmerkki on siis sama vika kuin `js/laattapyramidi.js`:n
"SININEN KYSYMYSMERKKI KARTALLA": merkintä lupasi piirroksen, jota ei ole.
Mitattu 18.9.2026 (HEAD `media.matkakirja.app/kohtaamiset/miniatyyrit/*.png`):
Carmenin ensi-ilta, Kirahvin kävelymatka, Torni romuraudaksi, Vrain-Lucas,
Impressionistit, Kyyhkyposti ja Tuileriain rauniot vastasivat 404:llä;
`pariisi-bastilji.png` on ämpärissä (200), joten Bastilji on aito piirros ja
pysyy kartalla.

Siksi erottelu on YKSI ehto — onko kohteella piirros — ja seitsemän
toimittamatonta tilausta poistettiin `js/packs/miniatyyrit.js`:stä, jotta taulu
kertoo totuuden. Kun kuvaputki toimittaa piirroksen, rivi palaa tauluun ja kohde
palaa kartalle ilman muuta muutosta.

## Toteutus (ei kovakoodattua Pariisi-listaa)

- `js/nahtavyydet.js`
  - `piirraKaupunkiKartta` ohittaa kohteen, jolla ei ole miniatyyriä
    (`avaajat` saa silti alkion, jotta kokoruudun kloonin indeksit pysyvät).
  - Puuttuva kuva (404) vie nyt koko merkin eikä pudota varatäpläksi.
  - Uusi `kaupunkikartanSiirretyt(ui, cityId)`: sama ehto datasta, palauttaa
    rivit `{ avain, id, nimi, avaa }` — `avaa` on sama kortti kuin kartalla
    (`avaaNahtavyys` jutulla, muuten `openWikiArticle`). Tunnus on kohteen oma
    `nosto`-tunnus, kun sellainen on.
  - Uudet liput: `otsikko`, `zoomiNapit`, `opasteet`, `kokoruutuNappi`
    (oletukset = vanha käytös, joten lehti ja kaupunkipop-up eivät muutu).
- `js/pallolauta/nostot.js`: `sisaisetKaupungeittain` saa kaupungin kohdalle myös
  kartalta siirretyt rivit. Aihe luetaan noston OMASTA datasta
  (`maanKohdetiedot` → `symboli`/`tyyppi` → `nostosymPaakategoria`), aiheeton
  menee "Muut"-kasaan (kohta 11). Uusi vartiokahva `liuskanSisaisetTiedot`.
- `js/kaupunkinosto.js`: nähtävyysnäkymä pyytää `otsikko: false`,
  `zoomiNapit: false`, `opasteet: false`, `kokoruutuNappi: true`.
- `js/karttazoom.js`: zoominapit ovat valinnaiset.
- `css/styles.css`: Kokoruutu-napin tyyli ja sijoitus rivin oikeaan reunaan.

### Poltto

Siirretyt rivit EIVÄT mene `sisaisetAvaimet`-joukkoon: niillä ei ole pääkartan
merkkiä, koska `js/fokuskohteet.js karsiKaupunkikartanNostot` on jo pudottanut ne
pääkartalta. Poltto lukee pääkartan merkkejä (`tools/fokuskartta/nostot.mjs`),
joten tämä erä ei muuta poltettavaa joukkoa lainkaan (PAATOKSET 33 rajaus a).

## Siirretyt kohteet (Pariisi, 19 kpl)

Kaikki 19 ovat karttanostoja (kenttä `nosto`), joten ne oli jo pudotettu
pääkartalta — liuskaan ne tulivat tässä erässä ensi kertaa. Kategoriat tulevat
noston omasta symbolista.

| kohde | nostotunnus |
| --- | --- |
| Carmenin ensi-ilta | nosto-carmenin-ensi-ilta |
| Kirahvin kävelymatka | nosto-kirahvin-kavelymatka |
| Torni romuraudaksi | nosto-lustig-eiffel |
| Vrain-Lucas | skandaali-vrain-lucas-kirjevaarennokset |
| Impressionistit | syvennys-pariisi-impressionistit |
| Kyyhkyposti | syvennys-pariisi-kyyhkyposti |
| Tuileriain rauniot | syvennys-pariisi-tuileriat, tuileries |
| Curie 1898 | hetki-marie-curie-hangaari-1898 |
| Lavoisier 1780 | hetki-lavoisier-laboratorio-1780 |
| Pasteur 1862 | hetki-pasteur-pullot-1862 |
| Torni 1888 | hetki-eiffel-torni-1888 |
| Bastilji 1789 | hetki-ranskan-vallankumous-bastilji-1789 |
| Lumière 1895 | hetki-lumiere-elokuva-1895 |
| 72 nimeä | nosto-pariisin-72-nimea |
| Metron sisäänkäynti | nosto-guimardin-metro |
| Notre-Damen kukko | nosto-notre-damen-kukko |
| Pariisi soi | nosto-pariisi-soi |
| Paras patonki | nosto-pariisin-patonki |
| Pariisin vuosisadat | nosto-pariisin-vuosisadat |

Liuskan kategoriat mittauksessa: Kadonneet ihmeet (2), Historia (8),
Kauppa ja tekniikka (6), Kulttuuri ja ruoka (9), Skandaalit (9), Muut (6)
— summa 40 = kaupungin sisäisten nostojen määrä, eli jokainen siirretty on
tasan yhdessä kategoriassa (kohta 11).

## Mittaus (390 px, Pariisi)

`tools/savukkeet/savuke-kaupunkipopup.mjs` (SAVUKE_RUUTU=390), vartiot 11-13.
Tulos Pariisin osalta (ajo 18.9.2026):

    {"kartta":1,"kohteita":12,"piirroksia":12,"ympyroita":0,"rikkinaisia":0,
     "selitteita":0,"zoominappeja":0,"kokoruutuNappeja":1,"nappiYlla":true,
     "otsikoita":1,"otsikko":"Nähtävyydet","luettelo":0}

- kartalla 12 merkkiä, kaikki piirroksia; ympyröitä 0 ja rikkinäisiä kuvia 0 (a);
- liuskan sisäiset 40, joista kartalta siirrettyjä 19 = datan odotus (b);
- kategorioiden summa 40 = sisäisten määrä (b, kohta 11);
- siirretyn rivin napautus avaa saman kortin kuin ennen kartalta (avaa-kahva on
  sama funktio; kartan kohteen napautus mitattiin erikseen vihreänä);
- NÄHTÄVYYDET-otsikoita 1 (c);
- kartan päällä selitteitä 0 (f), plus/miinus-painikkeita 0 (g),
  Kokoruutu-nappi 1 ja se on kartan yläpuolella (e).

Muut punaiset samassa ajossa (`Marseille @ 390 px` liuska ja `vastakoe 1`) ovat
tunnettuja ja vanhoja — sama pari oli punaisena kohdan 17 erässä
(docs/raportit/viesti-fable-nahtavyydet-arkki-k17-20260918.md).

### Kokoruutu (kohta 18 d) — JUURISYY LÖYTYI JA KORJATTIIN

Mittari näytti ensin `{"avautui":true,"kortinKorkeus":0}`: suurennoskortti
syntyi, mutta sen korkeus oli **0 px**. Syy on `js/ui.js suurennosIsanta`, joka
palautti `arrivalDialog`in — se ei ole auki lainkaan, kun näkymä on liuskan
avaama oma modaali `tiivis-lehtiarkki`. Suljettuun dialogiin liitetty kortti ei
piirry, ja auki ollessaankin modaali on selaimen ylimmässä kerroksessa, jonka
taakse toisen dialogin lapsi jäisi — tästä omistajan *"Kokoruutu-nappi ei toimi
iPhonella"*. Korjattu: päällimmäinen AUKI oleva dialogi on isäntä
(nähtävyysikkuna → matkalaukku → tiivis arkki → saapumisikkuna). Korjauksen
jälkeen mitattu 390 px: kortti 482 px / 844 px näkyvästä, kartta 291 px
(arkilla 261 px), sulku palauttaa arkin kartan.

**Avoin kysymys omistajalle/Fablelle:** mitta *"kartan laatikko ≥ 95 % näkyvästä
korkeudesta"* ei ole saavutettavissa puhelimen pystyruudulla, koska kohdekartan
kuvasuhde on vaaka (Pariisi 1,57) — 98 % leveydestä on jo täysi, ja korkeus jää
sen mukaiseksi (34 % ruudusta). Jos halutaan kartan täyttävän ruudun korkeuden,
se vaatii rajausta (kartta jatkuu ruudun reunojen yli, pelaaja panoroi) tai
kartan kääntämistä vaakaan — kumpikin on oma päätöksensä. Savukkeen väite mittaa
nyt sen, mitä korjaus lupaa: suurennos aukeaa, peittää yli puolet ruudusta ja on
suurempi kuin arkilla.

## Velkaa / huomioita

- Muissa kaupungeissa voi olla samoja toimittamattomia miniatyyritilauksia
  (ämpärissä 673 tunnuspohjaista merkintää). Ne eivät enää näy kartalla
  kysymysmerkkinä vasta, kun merkintä poistetaan — nyt merkki katoaa kartalta
  latausvirheessä, mutta kohde on liuskassa vain, jos merkintää ei ole. Oma erä:
  käy koko taulu läpi HEAD-kyselyllä ja poista toimittamattomat.
- `tools/savuke-karttazoom.mjs` mittaa yhä lehden kartan +/- -painikkeita; ne
  säilyivät siellä tarkoituksella (kohta 18 g koskee nähtävyysarkkia).
