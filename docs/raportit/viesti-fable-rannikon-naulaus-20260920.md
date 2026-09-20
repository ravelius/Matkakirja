# Opus → Fable: Rannikon naulaus (kaksoisviiva pois)

20.9.2026 klo 05.10. Haara `opus-local-rannikon-naulaus` (pohja
origin/v1972-prep, 88d32b1d). Ei versionostoa, ei PR:ää, ei mergeä.

Toteutettu **sinun valintasi: vaihtoehto 2 (rakenteellinen, yksi
auktoriteetti)** Opus 2:n mittauksesta
[viesti-fable-maalehti-viivat-20260920.md](viesti-fable-maalehti-viivat-20260920.md)
luku A.

## Juurisyy (Opus 2:n mittaus, vahvistettu tässä)

Sama rannikko piirtyi kahdesta aineistosta: rantaviiva `ne_10m_ocean`ista
(pallon vektorisolut) ja pelaajan oman maan korostuskehä
`ne_10m_admin_0`:sta (`assets/data/maapolygonit.json`). Aineistot ovat eri
mieltä rannan kulusta. Omalla mittauksellani Ranskan kehän kärjistä,
jotka ovat rannan tuntumassa (n = 497): **mediaani 107 m, p95 445 m,
suurin 3 939 m**. Korostus on paksumpi (2,1–3,1 css-px) ja piirtyy
päällä, joten ero näkyy kaksoisviivana — ja suistossa ero on
rakenteellinen: ocean kulkee suistoa ylös, admin_0 sulkee suun jänteellä.

## Korjaus: naulaus (js/pallovektorit.js)

Uusi osio `RANNIKON NAULAUS` ja neljä vientiä:

| | mitä tekee |
|---|---|
| `NAULAUKSEN_RUUTU_ASTETTA` 0,05 | hilan solu |
| `NAULAUKSEN_TOLERANSSI_ASTETTA` 0,015 (≈ 1,7 km) | milloin kärki on "rannalla" |
| `NAULAUKSEN_AUKON_RAJA_ASTETTA` 0,5 / `NAULAUKSEN_MUTKAN_RAJA_ASTETTA` 2 | suiston mutkan silloitus |
| `rannikkoHakemisto`, `rannallaHilassa`, `naulaaKorostus` | puhtaat funktiot |

Naulaus tekee kaksi asiaa:

1. **Pudottaa** korostuksen janat, joiden MOLEMMAT päät ovat
   rannikkoviivan tuntumassa. Tämä kattaa sekä rinnakkain kulkevan rannan
   että suiston sulkevan jänteen (päät suun rannoilla, keskikohta vedessä).
2. **Piirtää tilalle** rannikkoaineiston omat janat siltä osin kuin ne
   ovat korostuskehän tuntumassa — eli tämän maan rantaa. Suiston mutka,
   jota admin_0:ssa ei ole, silloitetaan: mutka otetaan mukaan, jos sen
   päät ovat tuntumassa lähekkäin (≤ 0,5°) ja rannan polku niiden välillä
   on korkeintaan 2° (≈ 220 km). Näin Gironde tulee mukaan, mutta
   naapurimaan rannikko ei silloitu maarajan yli.

**Hinta ja portti.** Naulaus maksaa: koko Ranskan rannikko tarkimmalla
tasolla (87 000 kärkeä) on mitattuna **65 ms** (Mac Studio, kolme ajoa
80,8 / 65,0 / 64,7 ms) — kehysbudjetin yli, ja `paivita` huomaisi uuden
rannikkosolun joka kehyksellä. Siksi kaksi porttia:

- `NAULAUKSEN_TIHEYS_RAJA` 120 laitepikseliä astetta kohti: naulataan
  vasta, kun aineistojen ero (p95 445 m) olisi yli puoli pikseliä. Sitä
  karkeammassa näkymässä korostus piirtyy täsmälleen kuten ennen — ja
  silloin tarkat rannikkosolut eivät muutenkaan ole muistissa, joten
  työjoukko on aina näkyvän alueen kokoinen.
- `NAULAUKSEN_VAIMENNUS_MS` 400: naulausta ei rakenneta useammin kuin
  0,4 s välein, vaikka soluja saapuisi tiuhaan. Harvennusportaan vaihto
  rakentaa yhä heti (viiva on jo ruudulla).

Sisämaan rajat jäävät admin_0:aan, jossa ne ovat ainoa lähde. Ilman
ladattuja rannikkosoluja korostus on **täsmälleen entisellään**.
`rakennaKorostus` rakentaa korostuksen uudelleen, kun rannikkosolujen
määrä muuttuu, joten naulaus tarkentuu sitä mukaa kuin soluja saapuu.
Mittareihin tuli `korostusPudotettuja` ja `korostusRannikkojanoja`.

## Mitatut luvut (FRA, oikea aineisto, tarkin taso l4)

`node tools/savukkeet/mittaa-rannikon-naulaus.mjs` (uusi, ajaa saman
puhtaan funktion ilman selainta; 16 rengasta, 75 rannikkosolua):

| mitta | ennen | jälkeen |
|---|---|---|
| korostusjanoja rannan päällä omalla geometriallaan (= kaksoisviiva) | **487** | **0** |
| piirretty kokonaispituus | 9 438 km | 9 504 km |
| sisämaan janoja | — | 681 |
| rannikkoaineistosta piirrettyjä janoja | 0 | 2 791 |
| Gironden ikkunassa (−1,35…−0,55°, 45,0…45,75°) janoja | 35 | 63 |

Pituus **kasvaa** 66 km: viivaa ei katoa, vaan suistojen mutkat tulevat
mukaan (Gironde 35 → 63 janaa). Kaksoisviivaa ei jää yhtään janaa.

## Vartiot

- `tests/maakorostus.test.mjs`: uusi yksikkötesti naulauksen puhtaille
  funktioille (Gironden pienoismalli: rinnakkainen ranta + suun sulkeva
  jänne + sisämaan raja + päivämeridiaani). Lähdetekstivartio päivitetty.
  Peitto pysyy täytenä (omistajan päätös 13.9.).
- `node --test tests/*.test.mjs`: **3 735 testiä, 0 punaista** (13 ohitettua).
- `tools/savukkeet/mittaa-rannikon-naulaus.mjs`: kolme vartiota
  (kaksoisviiva 0, pituus ei lyhene, sisämaan rajat säilyvät) — ajettavissa
  millä tahansa maalla `--iso=`.
- `tools/savukkeet/savuke-maan-aariviiva.mjs` (kohdemaan kehän peitto,
  8 nimettyä kohtaa, neljä näkymää): **70/70 vartiota läpi**, kuvat
  `docs/raportit/kaappaukset/rannikon-naulaus-20260920/`. Kerroksen omat
  mittarit kertovat, että savuke ajoi naulauksen MOLEMMILLA puolilla
  porttia:

  | näkymä | tiheys | pudotettuja | rannikkojanoja | korostusjanoja | peitto |
  |---|---|---|---|---|---|
  | zoom (Ranska lähellä) | 140,8 px/aste | 1 174 | 2 226 | 2 361 | 100 % |
  | saapuminen (kauempaa) | 75 px/aste | 0 | 0 | 2 110 | ≥ 90 % |

  Portti on 120 px/aste, eli se osuu näiden väliin: kauempi näkymä oli
  naulaamaton jo ilman porttia (rannikkosoluja ei ollut muistissa) ja
  lähempi naulattu. Savukkeen tulos pätee siis sellaisenaan committiin.
  Tärkein luku on **peitto 100 % ja 16/16 rengasta**: naulattu kehä on
  yhtä ehjä kuin admin_0:n oma, eikä yksikään nimetty kohta (mm.
  Gironde) kadonnut.

Sivukorjaus: `savuke-maan-aariviiva.mjs` lukee nyt `PLAYWRIGHT_JS`:n kuten
muut savukkeet (kovakoodattu `/opt/node22/...` ei ole tällä koneella).

## Mitä jäi tekemättä

- **Selaimen kuva ennen/jälkeen lähizoomissa**: naulauksen vaikutus on
  todistettu geometriasta (mittari), kerroksen mittareista selaimessa
  (1 174 janaa pudotettu, 2 226 rannikosta) ja yksikkötestillä — en
  vertaillut Gironden lähikuvaa silmämääräisesti ennen/jälkeen. Portin
  raja 120 px/aste on laskettu (0,5 px / 445 m), ei mitattu ruudulta.
- **Silmämääräinen kaappausvertailu** on vain ääriviiva-savukkeen omista
  kuvista (`docs/raportit/kaappaukset/rannikon-naulaus-20260920/`); en
  ajanut erillistä Gironde-lähikuvaa ennen/jälkeen, koska poltto varasi
  koneen (kuorma 34) ja mittasin eron geometriasta lukuina.
- **Riviera**: naulauksen rannikkopala voi ylittää kehän pään Monacon ja
  Italian rajalla enintään tuntuman verran (2 palan päätä 50:stä ilman
  jatkajaa, 7,3–7,4° E). Se on ylimenoa, ei aukkoa — pituus kasvoi.
- Muut maat kuin FRA on mitattu vain yksikkötestin pienoismallilla;
  mittari ajaa minkä tahansa maan, mutta en ajanut kaikkia 99:ää.
