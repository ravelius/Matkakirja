# J4-v3 – arkun hopeasisältö

Toimitettava malli: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/olavinlinna-aarre-10171021-20261027/review-v3-j4/models/arkun-hopeasisalto-j4-v3.glb`
SHA256 `350cfb6b8365e0ff69789db623f94bc4d563e513a5772b0fef499b6f91b25b57`, 5196772 tavua. 38 884 kolmiota (ennen 38 828), yksi mesh / primitiivi / materiaali. Mitat X/Y/Z 0,476043 × 0,223394 × 0,400000 m täsmälleen ennallaan; pohjakeskinen origo, skaala 1. J3:een ei koskettu.

Liikkuvuus: staattinen esine, ei liikettä (myös MANIFEST.json).

## Neljä korjausta
1. Albedo on neutraali hopea: pinnalla sRGB 215–227, tavallisesti 227. Saarikohtainen vanha vaalea/tumma väritys on poistettu. Pieni tummuus sallitaan vain kaiverruksissa, kannun sisäpinta on 51/255 (=0,20).
2. Normaalikartan pienikokoista rakeisuutta pehmennetty. Olemassa olevat astioiden koristeet säilyvät; 105:lle kasan ulkoreunan tunnistetulle kolikkopinnalle on lisätty pehmeä ristileima ja reunakoroke. Leimat ja kolikoiden reunakiiltoa pyöristävä muoto ovat normaalikartan pintareliefiä, eivät uusia geometrisia bevel-pintoja. Kaikkiin osittain peittyviin kolikoihin ei tehty keinotekoista uutta leimaa. Kartta glTF/OpenGL +Y.
3. MR-kartan B=255 kaikkialla; G=77 (0,302) kiillotetulla pinnalla, painaumissa enintään 128 (0,502). Kannun sisällä G=179 (0,702). Materiaalin metallicFactor ja roughnessFactor ovat 1.
4. Kannun pohjan matala sulku poistettu: 24 kolmion pohja korvattu syvemmillä sisäseinillä ja tummalla pohjalla. Aukon keskeltä sädetestissä vanha pohja Y=0,168898 m, uusi Y=0,075 m, eli syvennys noin 9,4 cm. Sisusta jatkuu kannun puolivälin alapuolelle. 49 uutta alempaa sisäseinän/pohjan kärkeä pysyvät lähteen ulkopinnan sisällä testatuissa säteissä.

Kolme PNG:tä 2048² sekä samat tavut GLB:ssä. Vanhat UV:t skaalattu V-suunnassa 1984/2048; alimmainen 64 px kaista on uuden sisustan oma alue. Kuvioiden sijainti on leivottu samalla muunnoksella. Älä käytä uusia karttoja suoraan vanhan GLB:n UV:llä.

## Käytännön tarkistus
Tuokaa GLB kokonaisena ja käyttäkää sen mukana olevia karttoja. Albedo sRGB, normal ja MR lineaarisina tietokarttoina, normal +Y. Metalli1 ja roughness1 kertoimina. Yövalon/bloom-halon pelikorjaukset jäävät vastaanottajalle. Vanha0,97 sovitusskaala voi säilyä, koska ulkomitat eivät muutu.

Tallennettu GLB luettu takaisin: kaikki vanhat kärjet/normaalit ja kaikki muut kuin poistetut 24 pohjakolmiota säilyvät samoina, vain sisuksen geometria lisätty. Kolmiomäärä kasvoi 56:lla. Ei uusia nollapintaisia kolmioita. Lähteessä on 41 avointa reunaa ja 7 ei-monistoreunaa; samat määrät säilyvät. Mallia ei väitetä suljetuksi tai fysikaalisesti täydelliseksi. Staattiselle aarteelle ei tehty tarpeetonta rigitystä tai laajaa retopologiaa.

Kuvat ovat oikean GLB:n paikallinen CPU-materiaalikoe, jossa luetaan albedo, normal ja MR. Ympäristövalo on analyyttinen vertailuvalo; kuvat eivät ole pelin renderöinti tai lopullinen yövalaistuksen hyväksyntä. `four-views-ja-hyvaksytty-kuva.png` sisältää pyydetyn neljän suunnan arkin ja hyväksytyn 1021-kuvan rinnakkain. Kaikki arkit on katsottu; astioiden sisäpintoihin ei jäänyt ensimmäisen paikalliskokeen virheellisiä kolikkoleimoja.

Vastaanottajalta tarvitaan samat pelin kamera-/yövaloparit ja KK:n arvio metallista, kaiverruksista ja suuaukosta. Paikallinen tekninen PASS ei ole pelin tai omistajan hyväksyntä. Uusia Tripo- tai kuvagenerointeja 0, krediittejä0. Lähdemallit ja aiemmat toimitukset säilyvät.
