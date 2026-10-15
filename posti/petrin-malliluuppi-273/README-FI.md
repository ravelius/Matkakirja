# Petřín — tavoiteluuppi #273, kymmenen kierrosta täynnä

**Malliluuppi on pysäytetty lähteen kymmenen kokonaiskierroksen rajaan. Lopullinen mallihyväksyntä puuttuu.** K1:n raja on 85 %, K2–K5:n 90 %. Vain K2 läpäisee, joten koko mallin läpäisyä ei väitetä.

## Näytöt ja versioiden valinta

- `M09/petrin-M09.blend` ja `M09/qa/petrin-M09-comparison-sheet.png`: ennakolta kirjattuun valintakriteeriin perustuva paras versio. Kriteeri on suurin viiden näkymän heikoin raja-arvoon suhteutettu natiivi renderi-IoU; keskiarvo ratkaisee tasatilanteen. K5 on heikoin näkymä.
- `M10/petrin-M10.blend` ja `M10/qa/petrin-M10-comparison-sheet.png`: viimeinen kierros. Sen keskiarvo on hieman suurempi, mutta K5 on 0,040 prosenttiyksikköä M09:ää pienempi. Molemmat toimitetaan, eikä näin pientä eroa tulkita visuaalisen laadun varmaksi eroksi.
- Kummankin hakemistossa on kaikki viisi natiivia renderiä, todelliset geometrian alfa- ja täytetyt maskit, vertailut, kamerat, konfiguraatio, lähdekoodi, metrinen auditointi ja tavutiedot.
- `history/` säilyttää M02–M08:n todelliset mallit, kamerat, konfiguraatiot, mittarit ja vertailuarkit. M01:n alkuperäinen koko toimitus on edelleen muuttumaton commitissa `ecbaa74cf24dc30f6add62ed0596909da92516ed`, polussa `posti/petrin-M01/`.
- `loop-journal.json` sisältää jokaisen kymmenen kierroksen luvut ja tuottajan silmämääräiset havainnot. M05:ssä ja tämän toimituksen lopussa käytettiin uusia erillisiä arvioijia. Aiempi M01-arvio säilyy alkuperäisessä paketissa.

## Todelliset natiivi-IoU-luvut, prosenttia

| Kierros | K1 | K2 | K3 | K4 | K5 | Keskiarvo |
|---|---:|---:|---:|---:|---:|---:|
| M01 | 69.41 | 88.01 | 86.87 | 87.44 | 71.57 | 80.66 |
| M02 | 70.72 | 89.15 | 87.81 | 85.39 | 74.92 | 81.60 |
| M03 | 82.83 | 90.17 | 88.72 | 87.70 | 82.72 | 86.43 |
| M04 | 83.29 | 90.61 | 89.38 | 87.95 | 83.45 | 86.94 |
| M05 | 83.55 | 90.85 | 89.27 | 88.09 | 83.74 | 87.10 |
| M06 | 83.80 | 91.40 | 89.10 | 89.29 | 85.79 | 87.88 |
| M07 | 83.79 | 91.64 | 89.16 | 89.49 | 86.06 | 88.03 |
| M08 | 83.91 | 91.68 | 89.20 | 89.57 | 85.99 | 88.07 |
| M09 | 83.63 | 91.55 | 89.13 | 89.36 | 86.25 | 87.98 |
| M10 | 83.77 | 91.87 | 89.23 | 89.50 | 86.21 | 88.11 |

Kaikki 50 natiivinäkymän IoU:t laskettiin vielä uudelleen tallennetusta tavoite- ja mallimaskista; leikkaus- ja unionipikselien lukumäärät vastaavat kierrosraportteja. Tämä on tuottajan numeerinen varmennus, ei erillisen arvioijan itsenäisesti laskema mittari. `final-numerical-verification.json` sisältää näytön.

M01 lasketaan mukaan: uusia mallikierroksia tehtiin yhdeksän, M02–M10. Optimoinnin sisäiset yksinkertaistetun 3D-kuoren numeeriset kamera- ja leveyskokeet eivät ole raportoituja läpäisyjä. Jokainen tässä taulukossa oleva kierros on oikea tallennettu Blender-malliversio, joka renderöitiin kaikista viidestä kamerasta. Yhtäkään tavoitekuvaa tai tavoitemaskia ei muutettu tämän jatkotyön aikana. Uusia AI-kuvagenerointeja oli **0**. Aiemman kuvatuotannon seitsemän kutsun historia säilyy.

## Geometriamuutokset

M02:ssa jalkojen tyven säde pieneni 15 metristä 13 metriin ja hallin arvioitu vastakkaisten sivujen väli 22,5 metristä 20,8 metriin. Myöhemmissä kierroksissa näitä ja epävarmoja runko-/galleriasäteitä sovitettiin rajatusti; täsmälliset arvot ovat kierroskohtaisissa `configuration.json`-tiedostoissa ja optimointilokeissa. M09/M10:n tyvisäde on 12,508 m ja hallin väli 21,24 m. Ne ovat edelleen kuviin sovitettuja **arvioita**, eivät varmennettuja rakennusmittoja.

Näkyvä vaalea sorakiekko poistettiin M02:ssa. Kiekko oli jo M01:n geometria-alfan ulkopuolella, joten sen poistamista ei käytetä virheellisenä selityksenä IoU-parannukselle. Neutraali maataso ei kuulu tornimaskiin.

Maston aiempi noin 71 m kokonaiskorkeus oli epävarma. M02:ssa sitä kokeiltiin 68,5 metrissä, ja loppuvaiheessa M09 on 68,6125 m ja M10 noin 68,995 m. Masto arvioitiin kaikista viidestä näkymästä, eikä sitä kelpuuteta pelkän K2-kuvan perusteella.

Ristikkoa ja sisäisiä kierreportaita lisättiin sekä tummennettiin. M05:n tuore arvio havaitsi liian tasaisen ristikkorytmin ja raskaan vaalean yläkopin vyön; M07:ssa ristikkovälit ja sauvojen paksuudet vaihdeltiin korkeuden mukaan, sisäportaat tummennettiin, yläkopin umpinainen vyö pieneni 3,5 metristä 1,8 metriin ja sen alle lisättiin geometrinen taitettu alapinta. M08:ssa halliin tehtiin useampia todellisia ikkuna-aukkoja, syvennyksiä ja karmijakoja. Nämä ovat lähteiden rajoissa tehtyjä rekonstruoituja detaljeja; kaikkia koristeita tai K4-pohjoispuolta ei ole riippumattomasti varmennettu.

Joissakin vanhoissa konfiguraatioissa säilyvä `lattice_pitch=1.4` on M07:stä lähtien historiallinen lähtöparametri: aktiivinen koodi käyttää porrastettua tasoluetteloa [7, 10.5, 14, 17, 20, 24…51] ja yläosassa 2,4 m väliä, alhaalla 0,105 m sekä ylhäällä 0,082 m vinotankosädettä. Todellinen tallennettu geometria ja kunkin kierroksen lähdekoodi ratkaisevat, eivät vanhat epäaktiiviset parametrit.

**Sitovat mitat säilyvät jokaisessa kierroksessa: runko/katon yläpinta 58,7 m, alatasanteen lattia 20 m ja ylätasanteen lattia 51 m.** Kaikki kymmenen tallennettua `.blend`-tiedostoa avattiin uudelleen ja auditoitiin; korkeuserot ovat alle 0,0001 m liukulukutoleranssin. Jokaisessa on kahdeksan erillistä jalka-/jalkakenkäkomponenttia. Alatasanteen näkyvä paikka generoiduissa tavoitekuvissa on osin ristiriidassa näiden mittojen kanssa. Sitä ei kopioitu muuttamalla sitovia lattiakorkeuksia.

## Kameramuutokset erikseen

M02 käytti muuttumattomia lähtökameroita. M03–M10:ssa sallittua numeerista siluettisovitusta tehtiin todellisille perspektiivikameroille. Kuvia tai maskeja ei venytetty, leikattu eikä väännetty. Kameraa sovitettiin ensin yksinkertaistetun fyysisen 3D-kuoren avulla; lopulliset taulukon mittarit tulevat todellisen Blender-geometrian natiivirendereistä. Proxy-IoU ei kelpaa läpäisyksi.

| Versio/kamera | Atsimuutti °, alku → nyt | Etäisyys m | Silmän korkeus m | Pitch ° | Pystynäkökenttä ° |
|---|---:|---:|---:|---:|---:|
| M09/K1 | 200.00 → 195.14 | 200.00 → 196.22 | 90.00 → 74.23 | -15.75 → -13.29 | 29.37 → 32.96 |
| M09/K2 | 190.00 → 186.42 | 55.00 → 49.55 | 1.70 → 1.55 | 23.18 → 24.03 | 60.96 → 64.65 |
| M09/K3 | 270.00 → 273.37 | 110.00 → 100.61 | 1.70 → 1.36 | 15.45 → 15.28 | 37.36 → 39.78 |
| M09/K4 | 5.00 → 6.17 | 100.00 → 80.34 | 1.70 → 1.37 | 16.67 → 20.61 | 39.96 → 47.03 |
| M09/K5 | 100.00 → 95.59 | 130.00 → 125.69 | 150.00 → 120.70 | -42.03 → -37.21 | 24.80 → 30.26 |
| M10/K1 | 200.00 → 195.14 | 200.00 → 196.22 | 90.00 → 74.23 | -15.75 → -13.29 | 29.37 → 32.96 |
| M10/K2 | 190.00 → 186.42 | 55.00 → 49.55 | 1.70 → 1.55 | 23.18 → 24.03 | 60.96 → 64.65 |
| M10/K3 | 270.00 → 273.37 | 110.00 → 100.61 | 1.70 → 1.36 | 15.45 → 15.28 | 37.36 → 39.78 |
| M10/K4 | 5.00 → 6.17 | 100.00 → 80.34 | 1.70 → 1.35 | 16.67 → 20.61 | 39.96 → 47.03 |
| M10/K5 | 100.00 → 95.59 | 130.00 → 125.69 | 150.00 → 120.70 | -42.03 → -37.21 | 24.80 → 30.26 |

Pääpisteiden pikselimuutokset ja tarkat matriisien lähtöarvot löytyvät `inputs/cameras/K*.json`- ja `round-log.json`-tiedostoista. M03–M09:n hakurajat olivat lähtöatsimuutti ±5°, etäisyys ±20 %, lentokorkeus pääosin ±20 %, pitch ±5° ja pääpiste ±35 px. Viimeisessä M10-kokeessa epävarmojen lähtöestimaattien hakua laajennettiin rajatusti: atsimuutti ±12°, etäisyys ±30 %, lentokorkeus pääosin ±25 %, pitch ±6°, pääpiste ±45 px. Tarkat jokaisen muuttujan rajat ovat optimointilokeissa. Nämä ovat tuottajan kokeilemia sovitusrajoja, eivät todennettuja oikean kameran virherajoja. Kamerat jäävät **sovituksiksi**, eivät todellisen kuvauspaikan rekonstruktioksi.

M01 ja sen kamerat säilyvät tavutasolla muuttumattomina. M03–M09:n K5-kamera-JSONissa on vanhasta lähtötiedostosta periytyvä alkuperäisen maskin metatieto; aktiivinen hyväksytty v2-maski määräytyy `inputs/targets/K5-mask.png`-tiedostosta ja `qa/metrics.json`-SHA:sta. M10:n uudessa kamerassa tämä metatieto on erotettu vanhan kameran historiaan ja aktiivinen maski-SHA on v2:n SHA.

## Sävy ja jäljellä olevat erot

Jokaisen kierroksen `qa/metrics.json` sisältää CIE76/D65/sRGB-pikseli-ΔE:n keskiarvon, mediaanin, p90:n ja otoskoon. Se sisältää kohdistus-, valaistus- ja ristikon taustavirheitä eikä ole puhdas materiaalimittari. **Sitova materiaalivärin ΔE on edelleen `null`; värirajan läpäisyä ei väitetä.** Teräksen ja yläkopin materiaalien vihertävyyttä vähennettiin harmaa-/valkoisilla materiaaliarvoilla, mutta neutraalin puistomaan heijastus ja valaistus jättävät joihinkin pintoihin näkyvän vihertävän sävyn. Erillisen arvioijan huomio säilytetään avoimena.

Erillisten arvioijien täydet raportit ovat `history/M05/qa/independent-review.json` ja `final-independent-review.json`. Jäljellä ovat etenkin alatasanteen kuvatason paikka ja syvä tuenta, jalkojen/kaarten ja hallikaton liitokset, yläkopin panelointi/masto sekä K5-jalustan ääriviiva. Niitä ei merkitä ratkaistuiksi pienten numeeristen parannusten vuoksi. Ympäristö on esikatselun neutraali maatason ja taivaan kokonaisuus.

## Hyväksyntä- ja toimitustila

#272:n lähde hyväksyy K5-maskin v2: 1 544 lisättyä valkoista pikseliä, 0 poistoa; SHA `f54ea03d6558e636a943f83f561c72a80fc3c80d0bc5bdc7f5d5621f6ea534a3`. Se on nyt PT-hyväksytty maski. Sama lähde hyväksyy M01:n **välivaiheeksi**, ei lopulliseksi malliksi. K5:n peittyvä maapiste on edelleen arvio eikä maskihyväksyntä ole riippumaton pikselisertifikaatti.

Tämä toimitus kattaa #273:n sallitut yhdeksän jatkokierrosta ja pysähdyksen kymmeneen yhteensä. Malli ei ole lopullisesti hyväksytty, M11:tä ei ole valtuutettu eikä aloitettu. Ei R2-vientiä, peli-integraatiota, main-yhdistämistä tai julkaisua. Peking/Pulu-työnjakoon tai muihin töihin ei koskettu. Odotetaan PT:n palautetta.

Mallien lähdekoodi on toistettavissa erillisessä työkopiossa Blender 5.2.1 LTS:llä: luo `renders/` ja `qa/`, suorita kierroksen `build_and_render.py`, sen jälkeen `analyse_round.py` Pythonilla NumPy/Pillow-tuella ja `audit_saved_model.py` Blenderissä. Paketin hyväksytyt tavoitekuvat ovat sisäisiä AI-havainnekuvia; alkuperäisten lähdevalokuvien tekijät, URL:t ja lisenssit säilyvät `source-licenses.json`-tiedostossa. Geometria ei käytä tavoitekuvia tekstuureina.
