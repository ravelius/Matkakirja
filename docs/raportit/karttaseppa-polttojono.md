# Karttasepän polttojono

Tämä tiedosto kokoaa pohjaan vaikuttavat muutokset. Omistajan linjaus 27.9.2026
Fablen kautta: muutokset kerätään ja poltetaan kerralla, eikä mitään polteta
ennen omistajan hyväksyntää. Jokaisella rivillä on koepolton kuvapari ja
kestoarvio. Kun jono on valmis, yhteenveto (muutokset, kesto, levytarve) menee
Fablelle ja sieltä omistajalle.

Voimassa oleva tuotanto: pyramidi `2026-09-26s-pohja` (z0–z8 tavulleen samat
kuin `2026-09-26-pohja`, ETagit tarkistettu 27.9.) ja pallo
`2026-09-26-pohja-20260926` (Z0–Z9 + Z10 kaupungeille).

## Jonossa

### 1. Järvet GSHHG-tasolta 2 ja matalan veden viileys 0,5 (pohja)

- **Koodi:** PR #3436. Uudet liput:
  - `--jarvi-pienin 0.004 --jarvi-harvennus 0.001 --jarvi-pienin-px 4`
  - `--matala-viileys 0.5`
  - `--delta-lisajarvet <vanha data>`

  Aineistokansio `/Users/Shared/Claude/pyramidi-poltto/gshhs-data-j27`
  sisältää GSHHG-meren (sama kuin ennen) ja GSHHG-järvet.
- **Päätökset:**
  - omistaja valitsi 27.9. matalan veden vaihtoehdon (a) ja arvon 0,5
  - poltetaan koko maailman vesilaatat: poikkeus VAIN EUROOPPA -linjaukseen
    vain tämän vesimuutoksen osalta
- **Kuvaparit:**
  - `kuvat/eu-laatu-8-matala-viileys.jpg`: Tukholma, Turku ja Split
  - `kuvat/eu-laatu-6-rooma-jarvet-z8.jpg` ja `-7-…-z10.jpg`
- **Poltto:**
  - uusi pohjaversio, `--delta meri --delta-lahde 2026-09-26s-pohja`
  - `--delta-aineisto-sama` perustellaan näin: DEM sama (GLO-30 26 450,
    GLO-90 26 475), ja vain `ne_10m_lakes.geojson` vaihtuu. Järvilaatat ovat
    luokittimessa VESI|MAA, joten ne piirretään.
  - syvät tasot z9–z10 omana vaiheenaan, vain olemassa olevat laatat
- **Laajuus (`paikkaa-pyramidi arvio`, uusi aineisto):**
  - z0–z8: 78 000 / 93 000 laattaa piirretään, koska avomerikin on vettä
  - z9–z10: olemassa olevista 376 000 laatasta arviolta noin puolet (tarkka luku
    ennen polttoa)
- **Kesto:**
  - z0–z8 noin 1–1,5 h täysillä ytimillä ja noin 3 h neljällä (vertailu: täysi
    z0–z8 119 000 laattaa 1,5 h, 26.9.)
  - z9–z10 noin 4–5 h 8 ytimellä (721 laattaa/min, 27.9. syvä ajo)
- **Levy:** kopiot tehdään ämpärin sisällä (palvelinkopio), joten paikallisesti
  tarvitaan vain shardien väliaikaistiedostot `--siivoa`-lipulla (alle 10 Gt).
- **Jälkeen:** pallo Z0–Z9 ja Z10 on koottava uudelleen uudesta pyramidista,
  koska järvet ja viileys näkyvät myös pallolla. Pallon vesilaatat ovat
  arviolta 312 000 (89 %), eli noin 3 h 8 ytimellä, koska pallo kootaan
  valmiista laatoista.

### 2. Meriväylien maaosuus maareitin tyylillä (viivataso)

- **Päätös:** Fable 27.9. vaihtoehto (a). Matka kulkee maitse satamaan ja
  sitten laivalla. Ei via-pisteiden sisältötyötä.
- **Koodi:** PR #3436, lippu `--merireitit-maaosuus` (viivataso,
  `--data` = pohjan meri).
  - Maaosuus lasketaan vain reitin päistä ja vain Euroopan kaupungeista
    (pallopisteen 6 yksikön säteellä).
  - Keskellä reittiä olevat saarten ylitykset jäävät katkoviivaksi.
  - Reitin muoto ja heitot säilyvät.
- **Kuvapari:** `kuvat/eu-laatu-9-merireitit-maaosuus.jpg`: Lontoo, Rooma ja
  Helsinki z8.
- **Reitit (18):**
  - Lontoo–Amsterdam, Lontoo–Dublin, Dublin–Edinburgh
  - Barcelona–Rooma, Rooma–Sisilia, Sisilia–Ateena, Ateena–Kreeta, Kreeta–Sisilia
  - Istanbul–Odessa, Dubrovnik–Rooma
  - Tukholma–Helsinki, Helsinki–Tallinna, Riika–Tukholma
  - Bergen–Edinburgh, Islanti–Edinburgh, Islanti–Tromssa
  - Dublin–St. John's, Lissabon–New York
- **Poltto:** vain viivataso z0–z8 uudeksi viivaversioksi (pohja ei muutu), ja
  luettelon `viivataso.versio` vaihdetaan. Täysi viivataso on 26.9. mukaan osa
  1,5 h:n ajoa, joten arvio on noin 30–45 min 4–8 ytimellä.

### 3. Pallon Z10 pyramidin z10:stä

- Nyt pallon Z10 lasketaan pyramidin z9:stä. Mercator venyttää 60 °N:ssa noin
  kaksinkertaisesti, joten vesi on pohjoisessa pehmeä.
- **Koodi ja koepoltto:** työn alla.
- **Poltto:** 13 856 laattaa (kaupungit ±1°), noin 20 min. Tehdään rivin 1
  jälkeen, jotta lähteenä on jo korjattu pyramidi.

## Järjestys yhdessä ajossa

1 (pohja) → 2 (viivat, riippumaton, voidaan ajaa rinnakkain) → pallo Z0–Z9
uudesta pohjasta → 3 (pallo Z10). Vienti ja osoittimen vaihto tehdään
omistajan kortilla kerran lopuksi.
