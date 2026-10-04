# Linnan esittely ja ilme Unityn työkaluilla — suunnitelma (Siirtoseppä 5.10.2026, HYVÄKSYTTY Päätoimittaja 5.10. klo 01.1x)

Omistajan päätös kortilla 5.10. klo 01.0x: linnan esittely ja ilme tehdään uusiksi Unityn ilmaisilla työkaluilla, ja vesi
tehdään ostetulla Stylized Water 3:lla. Työ menee junaan 143. Junan 142 linnakorjaukset ja Mylly-erä valmistuvat ensin.

## Lähtötilanne

- Kamera lasketaan omalla Ydin-koodilla (`Kameraliike`, `PoikkileikkausLinssi`). Sen JS-pari ja kultaiset vektorit
  vartioivat koodia.
- Junassa 142 kameran päälle tulee Unity-puolen jousi ja orbit (`DioraamaKameraJousi`). Se on väliaikainen silta, jonka
  Cinemachine korvaa.
- Paketeista Timeline 1.8 ja URP 17.3 ovat jo projektissa. Cinemachine 3 puuttuu (ilmainen paketti `com.unity.cinemachine`).
- Kaikki linnan sisältö tulee ämpäristä datana (`rakennus.json`, glb, atlakset, äänet). **Linja säilyy:** Timeline ja
  kamerat rakennetaan ajon aikana datasta, eikä linnaa kovakoodata appiin assetiksi. Näin uusi linna, esimerkiksi Allymes,
  on pelkkää dataa.

## 1. Kamera: Cinemachine 3

- `CinemachineBrain` dioraaman kameraan. Siirtymissä ease-in/out-blendi, oletuksena 2,5 s, ja huoneisiin 1,8 s.
- Jokainen kertojan jakso ja huone saa ajon aikana oman `CinemachineCamera`n:
  - asento tulee datasta (kohde, atsimuutti, korkeus, etäisyys ja fov kuten nyt)
  - `OrbitalFollow` hoitaa käsipyörityksen: vaimennus ja inertia, yleisnäkymässä 360° ja huoneissa datan kierto-rajat
  - jatkuva hidas orbit syötetään `OrbitalFollow`n akselille aina, kun pelaaja ei koske
- Eloisuus tulee `BasicMultiChannelPerlin`-kohinasta (käsivarakameran hengitys, amplitudi alle 0,3°).
  A/B: kohina päällä / pois.
- Ydin jää laskemaan vain ajoitusta, leikkausikkunaa ja tiloja. Kameran asento ei enää tule Ytimestä.
  - Tämä on tietoinen ero webiin, jonka linna on jäädytetty. Linjaus kirjataan.
  - Kultaiset vektorit pidetään ajossa Ytimen ajoitukselle.

## 2. Esittely: Timeline

- Ajon aikana rakennetaan datasta `TimelineAsset` ja `PlayableDirector`. Raidat:
  - **Kamera:** Cinemachine Shot -klipit jaksoittain. Blendit ovat klippien päällekkäisyyksiä.
  - **Kertoja:** AudioTrack, jossa kunkin jakson klippi.
  - **Avainsanat:** oma kevyt raita, jonka klipit näyttävät junan 142 avainsananäkymän. Ajoitus tulee kentästä
    `avainsanat[].t_s`.
  - **Äänet:** huoneiden äänten sisään- ja ulostulo. Väistö kertojan alla toimii kuten junassa 142.
- Napautus ohittaa jakson (`director.time` hyppää seuraavan jakson alkuun), ja "Esittely uudelleen" aloittaa alusta.
- Data säilyy nykyisellään: jakso = kamera + kertojan ääni + kesto + avainsanat. Linnanrakentaja ei tarvitse uusia
  kenttiä, paitsi valinnaisen blendin keston.

## 3. Kuvan viimeistely: URP:n Volume

- **Värisävy:**
  - Tonemapping Neutral vs. ACES (A/B)
  - Color Adjustments: kontrasti, saturaatio ja lämpö
  - Shadows/Midtones/Highlights hämärään sävyyn
- **Soihtujen hehku:** nykyinen Bloom viritetään. Kynnys ja lämmin sävy asetetaan niin, että vain liekit ja ikkunat
  hehkuvat.
- **Tilt-shift A/B:** URP:ssa sitä ei ole valmiina. Kevyt oma Full Screen Pass -renderöintiominaisuus sumentaa ylä- ja
  alareunaa liukuvasti. Huoneissa se korvaa nykyisen DoF:n, ja yleisnäkymässä pienoismallivaikutelma on A/B.

## 4. Leivottu valo: Linnanrakentaja → minä

- Linnanrakentaja leipoo AO:n ja epäsuoran valon Blenderissä suoraan uuteen kuoren atlakseen (sama koko, ei uutta kanavaa eikä koodia; sovittu 5.10.). Huoneiden COMBINED-atlakset näytetään kuten nyt (valaisematon × atlas).
- **A/B:** kaksi peiliä (`poikki peili HASH`), vanha ja leivottu paketti samalla kamerapolulla.

## 5. Vesi: Stylized Water 3

- Omistaja ostaa ja asentaa paketin Package Managerin My Assets -osiosta omalla tilillään. Me emme kirjaudu sinne.
- **Lisenssi:** Asset Storen paketin lähdekoodia ei saa jakaa julkisesti. Paketti pidetään proto-gitissä, joka ei ole
  julkinen, tai paikallisena pakettina `.gitignore`n takana. Tarkistetaan ennen ensimmäistä committia.
- Nykyinen järvi korvataan Stylized Water -materiaalilla: matala aallokko, rantavaahto ja heijastus
  `Planar Reflections` -komponentista vain, jos fps riittää. A/B: vanha / uusi.

## 6. Ääni: Steam Audio (omistajan valinta 5.10. klo 01.1x)

- Valve Steam Audio (ilmainen, Apache 2.0, iOS-liitännäinen) Unityn äänimoottoriin spatialisoijaksi.
- **Kaiku leivotaan geometriasta:** kappeli ja keittiö saavat oman kaikunsa. Geometria tulee tilan glb:stä törmäysverkkona,
  ja leivottu kaiku tallennetaan dataksi pakettiin (Linnanrakentajan kanssa: leivotaanko editorissa vai ajon aikana).
- **Vaimennus ja HRTF:** seinien takana äänet vaimenevat, ja HRTF suuntaa äänet kuulokkeissa.
- **Mittaus:** CPU- ja muistikustannus mitataan iPhonella.
- **A/B:** ääniraidallinen tallenne, vanha kaiku vs. Steam Audio, samalla kamerapolulla.
- **Lisenssi:** Tekijätietoihin rivi "Steam Audio © Valve Corporation, Apache License 2.0".

## 7. Mittarit ja hyväksyntä

- **Suorituskyky:** fps (FrameTimingManager, mediaani ja 1 %:n alin) ja muisti (`Profiler.GetTotalAllocatedMemoryLong`
  + tekstuurimuisti) esittelyn ajan.
  - Mittalaitteet: iPad 00008103 Julkaisijan vuorolla ja iPhone TestFlight-käännöksestä (omistaja tai Laitetestaaja).
    Simulaattorin fps ei kelpaa.
  - **Raja:** iPhonella vähintään 30 fps ja iPadilla vähintään 60 fps. Fps ei saa myöskään heiketä junan 142 tasoon
    nähden (mediaani ja 1 %:n alin; Päätoimittaja 5.10.). Muistia saa tulla enintään 60 Mt lisää junan 142 tasoon nähden.
- **A/B-stillit pelistä:** samat 6 kuvaa (yleisnäkymä, kolme esittelyjaksoa, Laituri, Kappeli) jokaisesta
  A/B-kohdasta.
- **Ääniraidallinen tallenne** koko esittelystä ennen ja jälkeen.

## 8. Järjestys junaan 143

1. Cinemachine ja kamera, sen jälkeen fps-mittaus. Jousi poistuu, kun Cinemachine on todennettu.
2. Timeline-esittely: kamera, kertoja ja avainsanat.
3. Volume-sävy ja tilt-shift A/B.
4. Leivottu valo, kun Linnanrakentajan atlakset ovat peilissä.
5. Vesi, kun omistaja on asentanut assetin.
6. Steam Audio: kaiku, vaimennus ja HRTF, A/B-tallenne ja CPU-mittaus.

Jokainen vaihe on oma käännös ja oma A/B-kuvasarja. Merge-pyyntö menee Natiivisepälle Päätoimittajan kuittauksella.
