# K-4 erä 3, F-osa: nostot 44 Eiffel-torni 1888 ja 45 Bastilji 1789 (SK 20.11.2026, KK:n päätös 14.06)

Haara `sk/k4-era3-f-kuvat` (pohjana K-5 korjaus e64e6a832f), draft-PR vasta KK:n sanalla. Kuvia ei ole ladattu ämpäriin: uudet tiedostot ovat kansiossa `/Users/Shared/Claude/luovutukset/sk-k4-era3-f/_ampari/` (polku ämpärissä `kohtaamiset/historian-hetket/`, SHA256SUMS mukana). Tekstejä, visoja ja muita nostoja ei muutettu; F:n muut neljä hetkeä (Curie, Lavoisier, Pasteur, Lumière) eivät kuulu tähän osaan.

## 1. M2 luvuin: rikkeet ennen | nyt
- **Ennen** (lähtöluettelo): kummallakin `viimeinen, laji, tekija, lisenssi, mitat, havainne` (4 kuvaa: 2 Codex-hetkikuvaa ilman kenttiä ja 1536 × 1024 -kokoa + 2 nähtävyysjutun Commons-kuvaa ilman kenttiä).
- **Nyt:** 0 rikettä kummallakin (`node tools/sisalto/nostokuvien-tarkistus.mjs`). Lähtöluettelo 20 → 18 rikkovaa nostoa; lajeittain-luvut päivitetty.
- Täysi suite haaran työpuussa: ks. palautusviesti (5 996 testiä, 0 kaatuu).

## 2. Mitä tehtiin
- **Hetkien omat kaksi Codex-kuvaa (lähi, kauko) ovat nyt 1200 × 800.** Alkuperäiset olivat 1536 × 1024 ämpärissä (`…-photo-v4.jpg`). Ajettu `tools/sisalto/nostokuva.mjs`:llä (koko kuva, ei esirajausta); uudet tiedostot ovat `…-photo-v5.jpg`, joten vanhat v4-tiedostot jäävät palvelimelle (kortti: mikään ei poistu). Hetken kuvaan tuli `versio: 5` (sama sopimus kuin Machu Picchulla) sekä `laji`, `tekija`, `lisenssi`, `leveys`, `korkeus`; lähderivi alkaa nyt "Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva." (sisältö ennallaan). Hetkisivut (`js/packs/kulttuuri-kategoriat.js`) päivitetty `tools/paivita-hetkisivut.mjs`:llä.
- **Nähtävyysjuttujen kuvat (3. ja 4. kuva):** valmiit 1200 × 800 -tiedostot ämpärissä, samat kuin A-nostoissa (ei uusia lataamattomia kuvia).

## 3. Kuvat nostoittain (kertoja sanoo | kuva | laji | lähde, tekijä, lisenssi | tila)

### 44 Eiffel-torni 1888 (`hetki-eiffel-torni-1888`)
Kertoja sanoo (sama kappale kaikille kuville): "…elokuussa 1888 Eiffel-tornia … toinen kerros on valmis … niittaa rautaristikkoa yhä ylemmäs … Torni valmistuu 31. maaliskuuta 1889 … ja jää, koska sen huipulle sopii radioantenni."

| # | Kuva | Laji | Lähde, tekijä, lisenssi | Tila |
|---|---|---|---|---|
| 1 | lähikuva: neljän miehen niittausketju (`hetki-eiffel-torni-1888-lahi-photo-v5.jpg`) | havainnekuva | Matkakirjan oma, Codex; faktat Eiffel Tower official site | pidetään, rajattu 1200 × 800 |
| 2 | kaukokuva: toinen taso rakenteilla (`…-kauko-photo-v5.jpg`) | havainnekuva | sama | pidetään, rajattu 1200 × 800 |
| 3 | Eiffel-torni rakenteilla 1888 (`eiffel-torni-rakenteilla.jpg`) | valokuva | Neurdein 1888, Wikimedia Commons (PD) | haettu K-4 erässä 1, ämpärissä |
| 4 | Eiffel-torni ja Champ de Mars ylhäältä (`eiffel-torni-nykyinen.jpg`) | valokuva | Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0) | haettu K-4 erässä 1, ämpärissä; viimeinen = aito nykykuva |

Pois: Durandellen pystykuva (3277 × 4169; torni ei mahdu vaakarajaukseen, huippu häipyy soikean reunan alle) ja Feaun stereokuva (kaksi puoliskoa sinisessä kartongissa, torni pieni alareunassa). Molemmat jäävät palvelimelle ja nähtävyysjutusta pois. Suunnitelma (TULOS-kuvat-DEF F4) piti Durandellen; korvasin sen Neurdeinin rakenteilla-kuvalla, joka on samaa aihetta ja mahtuu 3:2-kehykseen.

### 45 Bastilji 1789 (`hetki-ranskan-vallankumous-bastilji-1789`)
Kertoja sanoo: "Pariisin kansa hyökkää 14. heinäkuuta 1789 Bastiljin linnoitukseen … Musketti painaa olkapäällä, mutta siihen ei ole ruutia … Iltapäivällä joukko pääsee ulkopihalle, varuskunta ampuu … de Launay antautuu … Linnoitus puretaan seuraavina kuukausina."

| # | Kuva | Laji | Lähde, tekijä, lisenssi | Tila |
|---|---|---|---|---|
| 1 | lähikuva: työläinen musketti olalla portilla (`hetki-ranskan-vallankumous-bastilji-1789-lahi-photo-v5.jpg`) | havainnekuva | Matkakirjan oma, Codex; faktat Musée Carnavalet | pidetään, rajattu 1200 × 800 |
| 2 | kaukokuva: sveitsiläinen vartija pihalla (`…-kauko-photo-v5.jpg`) | havainnekuva | sama | pidetään, rajattu 1200 × 800 |
| 3 | Bastiljin valtaus 14.7.1789 (`bastilji-valtaus.jpg`) | maalaus | Jean-Baptiste Lallemand 1789, Musée Carnavalet, Wikimedia Commons (PD) | haettu K-4 erässä 1, ämpärissä |
| 4 | Place de la Bastille ja heinäkuun pylväs (`bastilji-nyt.jpg`) | valokuva | Guillaume Flament, Wikimedia Commons (CC BY-SA 4.0) | haettu K-4 erässä 1, ämpärissä; viimeinen = aito nykykuva |

Pois: anonyymin soikea maalaus (kulunut kangasreuna valkoisella taustalla näkyy häivytyksen alla; suunnitelman varakuva). Jää palvelimelle.

## 4. M-rivit
- **M1 silmin:** luku 3 ja kontaktiarkit `docs/raportit/k4-era3-kontaktiarkit/eiffel-torni-1888.jpg` ja `bastilji-1789.jpg` (soikea reuna beigellä pohjalla; 4 kuvaa/arkki).
- **M2 luvuin:** luku 1.
- **M3:** uusia Commons-kuvia ei haettu, joten lisenssit ovat A-nostojen jo luetut (K-4 erä 1; `tools/hae-commons.mjs`); uudet tiedostot ovat vain omien Codex-kuvien rajauksia (ei verkkohakuja).
- **M4:** tilauksia ei tarvita (0 Codex-tilausta).
- **M5 älä riko:** ruuti- ja reikävisat: kuvatekstit ennallaan (ks. 5.1); hetkikortti näyttää samat kuvat, nyt 1200 × 800; kuvateksti kuvaa kuvan; vanhaa tiedostoa ei poistettu palvelimelta.

## 5. Avoimet kohdat KK:lle (ei tekstimuutoksia omin päin)
1. **Visa ja kuvateksti (rajatapaus).** Bastiljin lähikuvan `lyhyt` ("Pariisilainen etsii yhä ruutia muskettiinsa…") sanoo "ruutia", joka on hetken lehtivisan vastaus ("Miksi pariisilaiset marssivat Bastiljiin?"); kertoja sanoo saman samassa kappaleessa, mutta sääntö 9 kieltää vastauksen kuvatekstistä. Eiffelin kaukokuvan `lyhyt` sanoo "esivalmistetut osat", joka vihjaa reikävisan vastaukseen. En muuttanut tekstejä; ehdotus: Bastilji lähi "Pariisilainen työläinen musketti olalla Bastiljin portilla", Eiffel kauko "Eiffel-tornin toinen taso valmistuu elokuussa 1888". Sano, niin vaihdan.
2. **Bastiljin lähikuva:** tunnistamattoman työläisen puolilähikuva (ei tunnettu henkilö; DEF-tarkistus: aidon näköinen); kaukokuvassa polvistuva sotilas on vasemmassa reunassa ja häipyy osittain.
3. **Ämpäri:** 4 uutta 1200 × 800 -tiedostoa (`kohtaamiset/historian-hetket/…-photo-v5.jpg`) vietävä ämpäriin ennen PR:n yhdistämistä; muita ei tarvita. Ilman niitä hetkikortin kuvat ja nostojen kuvat 1–2 jäävät tyhjiksi.
4. **Hetkien tekstit:** Bastiljin hetken teksti on 1 396 merkkiä (L5-5:n asia, ei tässä).
