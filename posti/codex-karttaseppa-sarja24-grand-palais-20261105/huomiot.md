# Grand Palais #2092 — yksi kierros, QA-hylätty arviointierä

Kahdeksan kutsua, yksi per kuva. Alkuperäiset1536×1024 RGB-PNG:t säilytetty muuttamatta. Tämä toimitus on diagnostiikkaa: ei omistajahyväksyntää eikä Tripo-lupaa. Ei uusia yrityksiä ilman KK:n lähdepostia.

## Neljä sivua

| Kuva | Leveys px | Korkeus px | Maaviiva y | Päälista y | Päälista maasta px | W/H | Tavoite | Ero |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| etela | 1322 | 414 | 732 | 580 | 152 | 3.193 | 3.533 | -9.63% |
| pohjoinen | 1176 | 373 | 824 | 692 | 132 | 3.153 | 3.533 | -10.77% |
| ita | 1445 | 276 | 684 | 574 | 110 | 5.236 | 5.333 | -1.83% |
| lansi | 1443 | 276 | 684 | 574 | 110 | 5.228 | 5.333 | -1.97% |

Mitat alkuperäispikseleistä; bbox-väriraja max(RGB)−min(RGB)>10. Päälista valittu samasta jatkuvasta ylimmästä kivisestä listasta; lukutarkkuus±3px. Korkeus lasikupoliin, pientä campanileä ei tuotettu. Kuvat eivät ole kalibroitu3Dmittaus. Lyhyillä N/S-sivuilla tavoite159/45, pitkillä E/W240/45.

Vastakkaisten sivujen leveys: etelä–pohjoinen 11.69% (FAIL), itä–länsi 0.14% (PASS). Päälistan korkeusero kaikkien neljän välillä 33.33% keskiarvosta, FAIL. Maaviivojen ero140px. Sarjan yhteinen mittakaava ei täyty.

## Viistokuvat ja yläkuva

Lounaan kahden pohjareunan kulmakerrointen tuloksesta arvioitu sin(kulma)=0.556, eli noin33.8°; tavoite0.906 /65°. Arvioon liittyy noin±4° epävarmuus ja generoitu perspektiivi; se on poikkeaman havainto, ei kameran kalibrointi. Koillinen on lähes suoraan julkisivun suunnasta, ei vastakulma, ja osien paikat muuttuivat. Molemmat FAIL.

Yläkuva: lähteen bbox[639, 320, 897, 704], kuvan bbox[634, 323, 899, 725]. Kohde lähellä oikeaa paikkaa mutta ei täsmälleen jalanjäljen kokoinen; FAIL. Suuntataulukon ja maskin90asteen ristiriita kuvattu LAHTEET.md:ssä; maskia seurattu.

## Maapohja

Jalanjäljessä95912pikseliä; niistä3102nurmen väriseksi luokiteltua (3.23%). Tunnistus on väriehtoon perustuva arvio; koko jalanjäljen kiveys ei täyty. Neljä polkuleveyden näytettä ovat9px eli noin8.99m, noin±2m;6–12m tavoite niissä täyttyy. Kartan paikallinen skaala johdettu380×252mallimetrin jalanjäljen pinta-alasta. Itäpuolen puistojen jakauma/polut muuttuneet, joten geometriaa ei hyväksytty. Työalueella ei näy pystyosia. Ulkopuolen pikselien samuutta ei väitetä; Karttaseppä käyttää vain maskin sisäosaa.

## Muoto ja yksinkertaistus

Lasilaiva, keskikupoli, kermansävyinen kivijulkisivu ja harmaanvihreät rivat tunnistuvat lähdevalokuvasta. Pienet patsaat, liput, campanilepiikki, savupiiput ja kattokoristeet jätetty pois. Läntisten pihojen ja rotundan täsmällistä geometriaa ei voitu vahvistaa tästä peittyvästä valokuvasta, ja näkymissä on rakenteellista vaihtelua. Sarja ei ole yhtenäinen3Dmallinnusreferenssi.

arkki.jpg, sivumittaukset.png, ylakuva-QA.png ja maapohja-QA.png ovat erillisiä arviointikuvia, eivät tuotannon korjauksia. Kaikkien kahdeksan varsinaisen PNG:n tavut vastaavat imagegen-alkuperäisiä.
