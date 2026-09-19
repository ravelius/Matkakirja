# Sonnet → Fable: Pollon arvonimet, Euroopan maat (VIISAAN POLLON ARVONIMET)

19.9.2026 klo 22.10 Suomen aikaa, haara `agent-arvonimet-eur`. Ei
versionostoa, ei PR:ää, ei selainajoja.

## Muutos

`js/packs/pollon-arvonimet.js`: `POLLON_ARVONIMET_MAITTAIN`-taulukkoon
täydennetty 41 Euroopan maata (ISO-3). Olemassa olleisiin (FRA, FIN,
DEU, GBR, ITA, GRC) lisätty 7 nimeä kuhunkin; 35 uutta maata lisätty
kokonaan (8–9 nimeä kukin, aakkosjärjestyksessä ennen `EGY`-riviä).
Yhteensä Euroopan maissa nyt **383 arvonimeä** (oli 26).

Kaavat omistajan ohjeen mukaan: paikka (vuori, joki, järvi, saari,
kaupunginosa, rakennus) + Nerolta/Huuhkajalta/Yövahdilta/
Oraakkelilta/Tietäjältä/Kirjurilta/Kuiskaajalta/Erakolta/
Neuvonantajalta; historiallinen henkilö tai teos (1873 tai vanhempi,
elossa 1873 kelpaa) + Kirjeenvaihtajalta/Kuiskaajalta/Muistiinpanojen
Lukijalta/Pöytäkirjurilta/Neuvonantajalta; 1–3 kansantaru- tai
ruoka-aihetta per maa. Suomenkieliset sovinnaisnimet (Reinin, Tonavan,
Alppien, Tatran, Karpaattien, Veikselin, Vilnan, Krakova, Varsova).

**Sivukorjaus:** GRC:n listassa oli valmiiksi täsmälleen sama rivi
kuin yleisessä listassa (`Athenen Olkapään Pöllöltä`, molemmat
tiedoston vanhaa sisältöä ennen tätä sessiota). Koska tehtävän testi
vaatii ettei koko tiedostossa ole kaksoiskappaleita, korvasin GRC:n
kopion uudella, yksilöllisellä nimellä `Akropoliin Marmoripylvään
Vartijalta`. Muuta vanhaa sisältöä ei muutettu.

## Esimerkkejä (3 per maa, kaikki 41)

| ISO | n | esimerkkejä |
|---|---|---|
| AUT | 9 | Grossglocknerin Lumipöllöltä · Mozartin Nuottikirjurilta · Sachertortan Tuoksun Tuntijalta |
| BGR | 9 | Rilan Vuoriston Erakolta · Trakialaisten Aarteen Vartijalta · Jogurtin Keksijän Kirjeenvaihtajalta |
| BIH | 8 | Neretvan Sillan Vartijalta · Bogomiilien Hautakivien Tulkilta · Travnikin Linnan Yövahdilta |
| CHE | 9 | Matterhornin Lumipöllöltä · Wilhelm Tellin Omenankantajalta · Juustofondueen Tuoksun Tuntijalta |
| CZE | 9 | Karlin Sillan Yövahdilta · Dvorakin Nuottikirjurilta · Golemin Legendan Kertojalta |
| DEU | 11 | Zugspitzen Lumipöllöltä · Beethovenin Nuottikirjurilta · Pretzelin Tuoksun Tuntijalta |
| DNK | 9 | Andersenin Satukirjurilta · Merenneidon Tarinan Kuulijalta · Kronborgin Linnan Kummituspöllöltä |
| ESP | 9 | Alhambran Kaarien Tietäjältä · Don Quijoten Pöytäkirjurilta · Paellan Tuoksun Tuntijalta |
| EST | 9 | Toompean Linnamäen Yövahdilta · Kalevipojan Kuiskaajalta · Mulgipudru Tuoksun Tuntijalta |
| FIN | 13 | Ounasvaaran Erakolta · Topeliuksen Satukirjurilta · Karjalanpiirakan Tuoksun Tuntijalta |
| FRA | 13 | Mont Blancin Lumipöllöltä · Victor Hugon Kirjeenvaihtajalta · Croissantin Tuoksun Tuntijalta |
| GBR | 11 | Ben Nevisin Erakolta · Darwinin Kirjeenvaihtajalta · Teekupin Höyryn Tulkilta |
| GRC | 11 | Parnassoksen Vuoren Erakolta · Homeroksen Pöytäkirjurilta · Baklavan Tuoksun Tuntijalta |
| HRV | 9 | Dubrovnikin Muurien Yövahdilta · Diocletianuksen Palatsin Vartijalta · Istrian Tryffelin Tuoksun Tuntijalta |
| HUN | 9 | Lisztin Nuottikirjurilta · Petöfin Runokirjurilta · Gulassin Tuoksun Tuntijalta |
| IRL | 9 | Killarneyn Järvien Kuiskaajalta · Jonathan Swiftin Kirjeenvaihtajalta · Guinnessin Vaahdon Tuntijalta |
| ISL | 9 | Heklan Tulivuoren Tietäjältä · Saagojen Kirjurilta · Lammaslihakeiton Tuoksun Tuntijalta |
| ITA | 11 | Firenzen Kupolin Yövahdilta · Verdin Nuottikirjurilta · Pastan Tuoksun Tuntijalta |
| LTU | 9 | Vilnan Yliopiston Dosentilta · Perkunaksen Ukkosen Kuuntelijalta · Baltianmeren Meripihkan Kerääjältä |
| LVA | 9 | Daugavajoen Rantavahdilta · Liivin Kansan Tarinankertojalta · Rupjmaizen Tuoksun Tuntijalta |
| NLD | 9 | Rembrandtin Maalauskomission Neuvonantajalta · Tulppaanihuuman Muistelijalta · Goudan Juuston Tuoksun Tuntijalta |
| NOR | 9 | Ibsenin Näytelmäkirjurilta · Griegin Nuottikirjurilta · Lohikeiton Tuoksun Tuntijalta |
| POL | 9 | Wawelin Linnan Lohikäärmevahdilta · Chopinin Nuottikirjurilta · Piroginpiirakan Tuoksun Tuntijalta |
| PRT | 9 | Vasco da Gaman Merikartan Tulkilta · Fado-laulun Kuuntelijalta · Portviinin Tuoksun Tuntijalta |
| ROU | 9 | Karpaattien Erakolta · Miorita-tarun Kertojalta · Mämäligan Tuoksun Tuntijalta |
| RUS | 9 | Tolstoin Käsikirjoitusten Lukijalta · Tulilinnun Sulan Vartijalta · Blinien Tuoksun Tuntijalta |
| SWE | 9 | Kebnekaisen Lumipöllöltä · Linnen Kasvikirjurilta · Köttbullarin Tuoksun Tuntijalta |
| TUR | 9 | Hagia Sofian Kupolin Yövahdilta · Rumin Runokirjeenvaihtajalta · Kahvinkeiton Tuoksun Tuntijalta |
| UKR | 9 | Kiovan Luostarin Kirjurilta · Gogolin Kirjeenvaihtajalta · Borssikeiton Tuoksun Tuntijalta |
| BEL | 9 | Manneken Pisin Naapurilta · Waterloon Taistelukentän Muistelijalta · Suklaan Tuoksun Tuntijalta |
| LUX | 9 | Vianden Linnan Tähystäjältä · Echternachin Hyppyprosessin Kummastelijalta · Perunaletun Tuoksun Tuntijalta |
| SVK | 9 | Bratislavan Linnan Yövahdilta · Janosikin Metsärosvon Legendan Kertojalta · Halušky-ruoan Tuoksun Tuntijalta |
| SVN | 9 | Triglavin Huipun Lumipöllöltä · Ljubljanan Lohikäärmesillan Vartijalta · Potican Tuoksun Tuntijalta |
| MLT | 9 | Vallettan Muurien Yövahdilta · Megaliittitemppelin Vartijalta · Pastizzin Tuoksun Tuntijalta |
| CYP | 9 | Afroditen Rantakivien Vartijalta · Zenon Filosofin Pöytäkirjurilta · Halloumi-juuston Tuoksun Tuntijalta |
| ALB | 9 | Skanderbegin Linnan Vartijalta · Beratin Tuhannen Ikkunan Kaupungin Yövahdilta · Byrekin Tuoksun Tuntijalta |
| MKD | 9 | Ohridjärven Rantavahdilta · Aleksanteri Suuren Karttakirjurilta · Ajvarin Tuoksun Tuntijalta |
| MNE | 9 | Lovcenin Vuoren Erakolta · Cetinjen Luostarin Kirjurilta · Njegusin Kinkun Tuoksun Tuntijalta |
| SRB | 9 | Beogradin Linnoituksen Yövahdilta · Zmaj-lohikäärmetarun Kertojalta · Cevapin Tuoksun Tuntijalta |
| MDA | 9 | Kisinevin Basaarin Kuulijalta · Orheiul Vechin Luolaluostarin Erakolta · Placinta-piirakan Tuoksun Tuntijalta |
| BLR | 8 | Mirin Linnan Yövahdilta · Njasvizin Linnan Kirjurilta · Draniki-perunaletun Tuoksun Tuntijalta |

## Testit

Uusi `tests/pollon-arvonimet.test.mjs` (5 testiä): jokainen listattu
Euroopan ISO löytyy taulukosta; jokaisella ≥ 8 nimeä; ei tyhjiä
rivejä; jokainen `POLLON_ARVONIMET_MAITTAIN`-rivi päättyy ablatiiviin
(-lta/-ltä); koko tiedostossa (yleiset + maanosittaiset +
maakohtaiset) ei kaksoiskappaleita.

`node --check js/packs/pollon-arvonimet.js` → OK.
`node --test tests/pollon-arvonimet.test.mjs` → **5/5 pass**.
`node --test tests/*.test.mjs` → **3706 pass, 2 fail, 13 skipped**
(3721 yhteensä). Molemmat epäonnistumiset (`tests/sw.test.mjs`:
"kaikki js-moduulit ovat SHELLissä" ja "yhden tiedoston versio
niputtaa kaikki karttapaketit") ovat **olemassa jo lähtöhaarassa**
ilman tämän session muutoksia — varmistettu erikseen `git stash`
-kokeella: `js/packs/pollon-arvonimet.js` puuttui sw.js:n
SHELL-listalta jo ennen tätä sessiota. Tämä on koodin kytkentää
(Opuksen aluetta roolituksen mukaan), ei sisältöä, joten en koskenut
sw.js:ään.

## Ei tehty

Ei PR:ää, ei versionostoa, ei Raamattu-muutoksia, ei selainajoja
(annetun toimeksiannon mukaisesti).
