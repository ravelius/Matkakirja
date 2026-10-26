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

- Nyt pallon Z10 lasketaan pyramidin z9:stä, joten pohjoisessa ranta ja reliefi
  ovat pehmeät.
- **Koodi:** PR #3446, lippu `--z10-lahde`. Z10-laatta lasketaan z10:stä, jos
  koko sen alla oleva z10 on poltettu, muuten z9:stä.
- **Kuvapari:** `kuvat/eu-laatu-10-pallo-z10-lahde.jpg`: Riika, Kööpenhamina ja
  Helsinki. Kokeessa 221/235 laattaa saatiin z10:stä, eikä saumoja näy.
- **Poltto:** 13 856 laattaa (kaupungit ±1°) samaan pallosarjaan. Koepolton
  tahdilla noin 2 laattaa/s/ydin, eli noin 30 min 4 ytimellä ja noin 15 min
  8 ytimellä. Tehdään rivin 1 ja pallon Z0–Z9 jälkeen, jotta lähteenä on uusi
  pohja.

### 4. Joet: puuttuvat ja sivussa kulkevat (pohja, omistaja 27.9. klo 18.5x)

- **Puuttuvat joet:** Vltava (Praha), Kemijoki ja Ounasjoki (Rovaniemi) ja Moskva.
- **Sivussa kulkevat joet:** Tonava (Wien) ja Rein (Alpit), 1,5–2 km uomasta.
- **Lähde:** parempi lähde Euroopalle, HydroRIVERS tai OSM waterways. Lisenssi
  tarkistetaan ennen käyttöä (vain PD/CC tai vastaava, kirjataan lähteisiin).
- **N6:** joet leikataan järvimaskiin, ettei Nevan kaltainen viiva jatku järven yli.
- **Koodi ja koepoltto:** 28.9. päivällä.

### 5. Oslon pikkusaaret maaksi (pohja)

- **Syy:** merirenkaat on tehty karsinnalla `--pienin 0.004` (noin 400 m).
  GSHHG-lähteestä jäi pois 53 577 saarta, myös Oslonvuonon pikkusaaret.
- **Korjaus:** merirenkaat uudelleen pienemmällä karsinnalla (0,0015° eli
  työkalun oletus). Kokoraja tarkistetaan koepoltolla, ettei kaukotasoille
  synny pistepölyä.
- **Koodi ja koepoltto:** 28.9. päivällä.

### 6. Pintamallin kohina tasaisilla alueilla (pohja z9–z10, ehkä z8)

- **Päätös:** tasoitetaan vain tasaisilla alueilla, joissa läikät ovat
  rakennuksia tai metsänreunoja. Vuoret ja rinteet jäävät ennalleen, eikä kuvaa
  terävöitetä.
- **Menetelmä (suunnitelma):** DEM:n paikallinen vaihtelu suodatetaan alipäästöllä
  vain, kun ympäristön kaltevuus on pieni (tasamaa). Rinteissä suodatus
  häivytetään pois.
- **Koepoltto 28.9.:** Bukarest ja Kiova, kontrollina yksi vuoristokaupunki.

## Järjestys yhdessä ajossa (poltto ma–ti-yönä 28.–29.9. klo 22 alkaen, täysillä ytimillä)

Kohdat 4–6 muuttavat myös maata: joet ovat pohjassa (`--joet-pohjaan`), ja
kohina koskee maata. Delta ei silloin enää säästä juuri mitään, joten pohja
poltetaan TÄYTENÄ uudeksi versioksi. Viivataso (rivi 2) ja pallo tehdään
sen jälkeen.

1. **Pohja z0–z8 täytenä:** noin 93 000 laattaa. Vertailu 26.9.: 119 000
   laattaa kerroksineen 1,5 h täysillä ytimillä, joten arvio noin 1,5 h.
2. **Pohja z9–z10 täytenä:** olemassa olevat 376 000 laattaa. 27.9. syvä
   ajo 8 ytimellä teki 721 laattaa/min, ja täysillä ytimillä (16) noin
   kaksinkertaisesti, joten arvio noin 4,5–5 h.
3. **Viivataso z0–z8:** noin 45 min, voidaan ajaa rinnakkain kohdan 1 kanssa.
4. **Pallo Z0–Z9 uudesta pohjasta:** 349 000 laattaa, noin 2–3 h täysillä ytimillä.
5. **Pallo Z10:** 13 856 laattaa z10:stä, noin 15 min.

**KOKONAISKESTO:** noin 9–10 h täysillä ytimillä. Alku 22.00, valmis tiistaina
noin klo 7–8. Vienti ja osoittimen vaihto omistajan kortilla aamulla.

**Levy:** kopiot tehdään ämpärissä, ja `--siivoa` poistaa shardien laatat
viennin jälkeen, joten paikallisesti tarvitaan alle 10 Gt kerrallaan. Ennen
alkua tarkistetaan, että levyä on vapaana vähintään 90 Gi (Fable 27.9.).

## Tehtävät 28.9. (lopullinen jono Fablelle klo 18 mennessä)

- Kohdat 4–6: koodi ja koepoltot, kuvaparit Fablelle.
- Laaturaportin 27 PIENTÄ löydöstä käydään läpi, ja jokainen pohjaan vaikuttava
  lisätään jonoon:
  - rajan katkoviiva Reinin rinnalla
  - epävarmat läikät (Valletta, Riika, Pietari)
  - Oslon saaret (kohta 5)
- **Étang de Berre:** ei ole GSHHG-tasolla 2 eikä Natural Earthissa
  (tarkistettu 27.9.). Kolmas lähde (OSM tai HydroLAKES, lisenssi) tarkistetaan
  28.9.
- **Beiget maareittiviivat veden yli** (Tejo, Juutinrauma): jos kyse on sillasta
  tai lautasta, viivat jäävät ja se merkitään tähän. Muuten ne korjataan.
