# Linssisepän luovutus 6.10.2026 klo 23.5x (tilinvaihto)

Rooli: Linssiseppä (Opus, high): oppaan natiivilogiikka (OpasSilmukka, OpasSovitin, CesiumKaupunki, KaupunkiKuva, yövalot).
Proto-worktree: `/Users/Shared/Claude/wt/proto-linssiseppa-astro-auto`. Haarat ovat paikallisia proto-gitissä, ei pushia.
Tarkistus: `Linssit-testit/kaanna.sh` (763–769 testiä läpi) ja `Linssit-testit/unity-tarkistus.sh` (0 virhettä) kaikissa alla.

## Valmis ja junissa

- **Juna 153 VIE**: `linssiseppa/opas-korjaus-153` 9b7fe531. Omistajan TF 152 -viat:
  - Kysy-vastaus soi loppuun (esihaku vasta vastauksen jälkeen, workerin kysymys odottaa puheen loppuun).
  - Pyyntöjen sijainti on valitun kaupungin keskusta, kunnes kamera on kaupungissa (oli Kööpenhamina).
  - Todiste: `proto-3d/lokit/linssiseppa-sydney-b153-20261006`.
- **Juna 154 (OK simussa)**:
  - 25dd817f (`savy-154`): automaattinen vuorokausi oletuksena.
  - 0dfdce20 (`pcm-154`): PCM-alkupuskuri mitatusta latausnopeudesta; yli 3 s:n odotus täytetään siltalauseella.
  - Hitaus johtuu ElevenLabsin hetkellisestä tuotosta (Pelikoodari, worker-PR #4076 kirjaa nopeuden).
- **Äänimaiseman kytkentä**: `linssiseppa/aanimaisema-silta` 73a0379f (KaupunkiNakyvissa, OpasAaniSoi, KaupunkiKamera).
  Siirtoseppä on mergennyt sen omaan haaraansa `siirtoseppa/aanimaisema`.

## Keskeneräinen (juna 156)

### 1. Esilataus, latauskuva, Seuraava ja pehmeät lennot

Haara `linssiseppa/esilataus-156`, kärki ab09a288 (masterin 8878ab70 = BUILD 154 päällä). Omistaja 6.10. klo 23.3x ja 23.4x:

- **Esilataus**: kierroksella seuraavan kohteen paikka otetaan jonosta heti (`OpasSilmukka.OdotettuPaikka`), ja esikamera lataa sen koko kerronnan ajan. Ennen se odotti workerin vastausta 5–10 s.
- **Latauskuva**: `OpasSovitin.LatausKuva` ja `LatausKuvaVaihtui` (alle 90 % laattoja saapuessa → ensimmäinen kuva; pois, kun laattoja on ≥ 90 % tai 8 s on kulunut). Natiivi-UI piirtää kuvan 80 %:n kokoisena; sille on kerrottu.
- **Seuraava-nappi**: `OpasSovitin.Seuraava()` ja `SeuraavaKaytettavissa`, ytimessä `OpasSilmukka.OhitaKohde`. Toimii kierroksella, keskeytetyllä kierroksella, vapaassa tilassa ja lennossa. Natiivi-UI tekee napin. Testikomento `opas seuraava`.
- **Pehmeät lennot** (omistajan tarkennus: pehmeys ennen kestoa):
  - Kaari on sin²-kumpu (alle 1 km 0,3 × matka, muuten 0,22 ×, enintään 1 200 m pystyyn) ja vähintään 150 m kohteen yläpuolella.
  - Nopeusprofiili: pehmeä kiihdytys, tasainen vauhti ja pehmeä jarrutus (`OpasKuvaus.Eteneminen`).
  - Kesto määräytyy jatkuvasti matkasta (`LennonKesto`: 300 m ≈ 4,2 s, 1 km ≈ 5,2 s).
  - Raamattuun Päätoimittaja kirjaa, että "korkea kaari ripeästi" on kumottu.
- **Lokimittarit**:
  - `opas: lento X m, kesto, suurin kiihtyvyys, suurin lasku`; mittari näytteistää radan (`OpasKuvaus.Mittari`).
  - `opas: tarkka näkymä X s saapumisesta`.

**AUKI:**
- Ennen/jälkeen-mittaus Pariisissa ja Sydneyssä. Ajoskripti on valmis (scratchpad `ajo-156.sh`: `APP=… NIMI=b154|koe156`, lippu `sim-nyt-156-<NIMI>`).
  - "Ennen"-appi: `proto-3d/lokit/natiiviseppa-app-154lopullinen-787db464`.
  - "Jälkeen": käännä `linssiseppa/koe-156`.
- Lentomittarin "ennen"-arvot: aja `OpasKuvaus.Mittari` vanhalla `Lennossa`-funktiolla (git show 8878ab70:…/OpasKuvaus.cs).
- Reittijärjestys (lähin seuraava) on Pelikoodarilla kierroslistassa.

### 2. Yövalot (kuvanlaatujärjestys kohta 2)

Haara `linssiseppa/yovalot-154`, kärki befabb3d (savy-154:n päällä). Koe `linssiseppa/koe-156` 70f0bca62 = master + yövalot + esilataus-156.

- **Data**:
  - NASA Black Marble 2016 Euroopan asteen laattoina ämpärissä `linssit/kaupunki/yovalot-2026-10-06/` (`tyokalut/kaupunki_yovalot.py`).
  - OSM-kadut ovat Pelikoodarin `kartta/tiet-v1/<id>.json`. Luettelo tulee Pöllöstä `GET /opas/aineistot` ("tiet", Pelikoodarin #4081). Pariisi, Lontoo ja Rooma tehdään uudelleen r 6000:lla, jotta Eiffel mahtuu mukaan; jos ne viedään kansioon `tiet-v2`, vaihda `KaupunkiTiet.Juuri`.
  - Id: `KaupunkiTiet.Tunnus` (sama kaava kuin Siirtosepän äänimaisemassa).
  - **TEE ENSIN** (Pelikoodari 23.5x): tiet-v1 (4 km) oli jo viety, joten Pariisi, Lontoo ja Rooma (6 km) ovat kansiossa `kartta/tiet-v2/<id>.json`. `/opas/aineistot` palauttaa lisäksi kentän `"tiet_polut": {"pariisi": "kartta/tiet-v2/pariisi.json", …}`. Natiivin pitää käyttää sitä, jos id on siinä, muuten `kartta/tiet-v1/<id>.json`. Muutos tulee `KaupunkiYovalot.LataaTiet`- ja `KaupunkiTiet.LueIndeksi`-koodiin (uusi polkukartta) ja testiin.
- **v4 kuvattu ja v5 tehty**:
  - Katunauhat ja lamput vain kaduilla, ikkunat julkisivuissa (25 %), kohteen kultainen valonheitto.
  - v5: himmeämmät nauhat, ei ikkunoita kohteessa, kapeampi heitto, tiukempi tasaisuus.
  - Kuvat: `proto-3d/lokit/linssiseppa-yovalot4-{ipad,iphone}-20261006/kuvat/vertailu-*.png`.
- **AUKI**:
  - v5-kuvapari Päätoimittajalle: scratchpad `ajo-yo5.sh`; testikadut `kaupunki-tiet-pariisi.json` kopioidaan Documentsiin.
  - Fyysisen iPad Pro 13:n (00008103) muisti ja kehysaika: scratchpad `ipad-yovalot.sh`, appi d78bd96e asennettuna. Ensimmäinen ajo oli mitätön, koska iPadista puuttui Wi-Fi; omistaja kytkee sen huomenna.
  - Juna 156 vain Päätoimittajan kuittauksella; muuten kytkin pois.

### 3. Gizan pilotti (Päätoimittaja 23.4x): TEKEMÄTTÄ

Tarkista ensin Googlen Map Tiles API -ehdoista ja Cesiumin dokumentaatiosta:
- saako Photorealistic 3D Tilesin piilottaa kohteen kohdalta (clipping polygon) omien Blender-mallien tieltä
- saako omia malleja sekoittaa samaan näkymään.

Lainaa ehtojen kohta lyhyesti Päätoimittajalle ENNEN kuin Linnanrakentaja tekee työtä. Jos piilotus on sallittu, tee CesiumGlobeAnchor-sijoitus ja piilotusalue.

### 4. COZY (kuvanlaatujärjestys kohta 4)

Siirtosepän `siirtoseppa/cozy` e9729420 (COZY: Stylized Weather 3 v3.6.23, ilman demoja). Yhteiset profiilit `Assets/Matkakirja/Saa/` ("linna" ja "kaupunki"). Vuorokausi tulee KaupunkiValon avainkuvista. Tarkista Cesiumin ja URP:n yhteensopivuus ja mittaa iPad ennen junaa. Ei aloitettu.

Lisäksi kiinteän kameran kulma ei toistu istunnosta toiseen (`opas kamera …`: 1,0-kolmikko tuli eri kulmasta). Korjaa ennen seuraavaa kolmikkoa.

## Tila tilinvaihdossa

- Simut 3A3E4671 ja D0D2CD1E on sammutettu ja appit poistettu. Käännöslukko on vapaa.
- Levyllä on koeappi `proto-3d/lokit/linssiseppa-app-yo4-4c51ceea`; poista se, kun v5 on kuvattu.
- Natiivisepällä on `natiiviseppa-app-154lopullinen-787db464` ennen/jälkeen-mittausta varten.
- Julkaisijan jonossa on pyyntöni koe-156:n käännöksestä ja noin 20 min simuvuorosta. Päivitä SHA 70f0bca62:ksi ja vahvista vuoro uudelleen.

## Aloitusviesti seuraavalle Linssisepälle

> Olet Linssiseppä (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja `docs/raportit/viesti-linssiseppa-luovutus-20261006-yo.md`. Proto-worktree on `/Users/Shared/Claude/wt/proto-linssiseppa-astro-auto`. Jatka järjestyksessä:
> 1. Gizan ehtojen tarkistus Päätoimittajalle.
> 2. Juna 156: koe-156:n ennen/jälkeen-mittaus (esilataus ja lennot) sekä yövalojen v5-kuvapari ja iPad-mittaus, kun Wi-Fi toimii.
> 3. COZY.
>
> Käännös- ja simuvuorot tulevat vain Julkaisijalta (KÄÄNNÖS NYT / SIMU NYT). Ilmoita "lukko vapaa" ja "simu vapaa".
