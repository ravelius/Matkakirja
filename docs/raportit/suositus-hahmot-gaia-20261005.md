# Suositus: linnan hahmot (JustCreate + Mixamo) ja maasto (Gaia), 5.10.2026

Linnanrakentaja ja Siirtoseppä (natiivi). Omistajan ehdotukset 5.10. klo 10.28 ja 10.29 Päätoimittajan kautta. Kiireetön, juna 144+.
Lähteet: docs/raportit/tutkimus-hahmot-gaia-20261005.md (verkkotutkimus, lähde-URL:t väitteittäin), ja natiivin arviot ovat Siirtosepältä. Arviot pitää mitata iPadilla ennen
toteutusta.

## Suositus yhdellä rivillä

**Hahmopakettia ei osteta eikä Gaiaa tarvita.** Hahmot paranevat parhaiten nykyisessä putkessa: lisätään henkilökohtaiset työleikkeet ensin
CC0-lähteistä ja Mixamosta yhden hahmon kokeella (omistaja lataa leikkeet).

## 1. Hahmot: JustCreate Stylized Medieval Modular Characters (Asset Store 336650)

| Kysymys | Vastaus |
|---|---|
| Tyyli ja 11 roolia | Paketissa on vain **2 pohjahahmoa** (mies ja nainen), 5 hiusmallia, paita, housut, kengät, vyö ja käsilisukkeet. Kaapua (kappalainen), haarniskaa (vartija, portinvartija), esiliinaa (kokki) tai voudin asua ei mainita. Roolit pitäisi rakentaa samoista vaatteista, joten 11 henkilöä näyttäisi samalta. Nykyisillä Quaterniuksen CC0-asuilla roolit erottuvat jo. Kolmiomääriä, tekstuureja ja demokuvia ei saatu ennen ostoa (Fab ja ArtStation eivät avautuneet), joten tyylin sopivuutta linnan fotogrammetriakuoreen ei voi arvioida. |
| Mobiilibudjetti | Natiivin raja per hahmo: ≤ 15 k kolmiota, ≤ 75 luuta, 1 materiaali, **ei blendshapeja** (muisti ja CPU; mobiilissa skinWeights = 2). Nyt 11 × noin 9 k kolmiota, 65 luuta, noin 1 Mt glb kukin. Paketin 7 ilmettä ja visemet eivät siis olisi käytössä. |
| Animaatiot | Paketissa ei ole animaatioita. |
| Lisenssi | Asset Store EULA (Single Entity): proto-gitissä yksityisesti kuten vesi, ja appiin käännettynä osana tuotetta. **Ei julkiseen ämpäriin raakana glb:nä** (käytännössä assetin jakelua). Linnan hahmot kulkevat nyt ämpärin kautta ("linna on dataa"), joten jokainen hahmomuutos vaatisi natiivikäännöksen. |
| Kustannus | 64,39 € (lista); alennus on ollut noin 35 $. Työtä 11 hahmon uusiminen + appipolku noin 2–3 päivää ilman takeita näkyvästä parannuksesta. |

## 2. Animaatiot: Mixamo

- **Lisenssi:** rojaltivapaa kaupallisiin peleihin. Raakoja hahmo- ja animaatiotiedostoja ei saa jakaa sellaisinaan. Lataus vaatii Adobe ID:n (ilmainen), **joten
  lataukset tekee omistaja.** Leikkeet leivotaan omiin hahmoihimme hahmon glb:hen (ei erillisiä animaatiotiedostoja ämpäriin), mikä on
  tavanomainen pelikäyttö. Rajatapaus on julkisesti ladattava glb, joten se kirjataan LAHTEET.md:hen ja kokeillaan ensin yhdellä hahmolla.
- **Sisältö:** noin 2 400 animaatiota, esimerkiksi Sitting Idle, Sitting Talking ja miekkaliikkeitä. **Työliikkeitä (lakaisu, vasarointi, rukous, kokkaus,
  kirjoitus) ei voitu vahvistaa.** Ne kannattaa ottaa CC0-lähteistä: Quaterniuksen UAL (jo käytössä) ja KayKit Character Animations (CC0: chop, dig, hammer).
- **Integraatio:** natiivi ei käytä Animatoria vaan omaa soitinta (glb-nivelet, Liikkeet.cs, DioraamaSekoitin). Unity ei tuo FBX:ää
  ajon aikana, joten Humanoid-retarget Unityssä veisi leikkeet appiin. **Retarget tehdään Blenderissä** (hahmo_skin.py, 65 luun Quaternius-
  luuranko), jolloin leikkeet tulevat glb:ssä ja datapolku säilyy. Timeline (juna 143) voi ohjata leikkeitä sellaisenaan.

## 3. Maasto: Gaia for Unity 6 (22,54 €, alennus) tai Gaia Pro VS (91,54 €, alennus)

- **Mitä toisi:** spawnerin (puut, kasvillisuus biomeittain), eroosio- ja stamppityökalut sekä Prossa streamingin ja sään. Gaia on **editorityökalu**:
  se tuottaa Unity Terrainin (TerrainData), joka menee appiin tai AssetBundleen. Ajonaikaista glb:tä se ei tuota.
- **Nykyputki:** Olavinlinnan ympäristö on oikeaa Kyrönsalmea (MML:n korkeusmalli 2 m, ortokuva, laserkeilauksen latvuspinta, puukortit,
  n1500-kaupunki metsäksi, splat-lähimaasto, latvuskorjaus 5.10.). Se on staattinen mesh, joka on mobiilissa kevyempi kuin Terrain (vähemmän
  draw calleja, ei Terrain-shaderia). Gaian proseduraalinen maailma ei toisi tähän tarkkuutta lisää.
- **Mobiili:** Terrain on muistisyöppö (mobiilissa resoluutio 1/4–1/8). Gaian esimerkkipuut ovat työpöytäpuita, ja paketti on 4,2–4,8 Gt.
- **Yhteensopivuus:** Unity 2022.3+, URP. Cesiumia ei ole dioraamassa (vain kartta- ja pallolinsseissä), joten ristiriitaa ei synny. Yhteiskäytöstä ei löytynyt raportteja.
- **Johtopäätös: ei tarvita.** Jos kasvillisuutta halutaan parantaa, se tehdään nykyputkeen (paremmat CC0-puumallit lähipuiksi
  korttien tilalle), ei Terrainilla.

## 4. Seuraavat askeleet, jos omistaja hyväksyy

1. **Omistaja:** lataa Mixamosta (Adobe ID) yhden hahmon kokeeseen 3 leikettä, FBX Without Skin, 30 fps: *Sitting Idle*, *Sitting Talking*
   ja yksi työliike, joka löytyy omistajan haulla (esim. *Praying* kappalaiselle). Tiedostot kansioon
   `/Users/Shared/Claude/proto-3d/_lahteet/mixamo/`.
2. **Linnanrakentaja:** retarget Blenderissä kappalaiseen, still- ja videokoe linnan valossa sekä työliikkeet KayKit/UAL-CC0:sta muille
   (noin 4–6 h).
3. **Siirtoseppä:** iPad-mittaus (skinned-mesh-aika, muisti) ennen kuin leikkeet viedään kaikille 11 hahmolle.

Still-koetta (nykyinen hahmo vs. Mixamon hahmo) ei tehty: Mixamon lataus vaatii kirjautumisen, ja JustCreate-paketti on maksullinen.
