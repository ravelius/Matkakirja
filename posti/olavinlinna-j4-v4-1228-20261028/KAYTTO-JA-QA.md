# J4-v4 / #1228 — kaiverrusten luettavuus

Malli: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/olavinlinna-aarre-10171021-20261027/review-v4-j4/models/arkun-hopeasisalto-j4-v4.glb`
SHA256 `13cb3cc325ffed2b53734be759dad752758fafba14438980b4c2baa99141ff3e`, 3871136 tavua. Staattinen esine; ei liikettä, luurankoa tai animaatioita. 38 884 kolmiota / 26 238 kärkeä, yksi mesh ja materiaali. Mitat X/Y/Z 0,476043 × 0,223394 × 0,400000 m. J3 ja vanhat v2/v3-paketit säilyvät.

## Täsmällinen rajaus
Vain kolmen PNG-kuvan sisältö muuttui. Kaikki accessor-taulukot (POSITION, NORMAL, TEXCOORD_0, indeksit) ja neljä muuta kuin kuvadataa sisältävää bufferView-lohkoa ovat tavuilleen samat kuin J4-v3:ssa. JSON on sama lukuun ottamatta puskurin sijainteja ja pituuksia. Solmut, materiaalikertoimet, geometria ja UV säilyvät. V3:n hyväksytty syvä tumma suu ja sen karttapikselit säilyvät. Toimitus on silti kokonainen uusi GLB karttoineen.

## Karttojen muutos
- Albedo: kaiverruksen urissa kohdistettu cavity-tummennus, tavoite35%; syvimpien urapikselien mitattu keskiarvo34,38%. Neutraali hopeapohja227/255, urat noin148/255. Ei maalattua suuntavaloa eikä satunnaista rakeisuutta.
- ORM/MR: B=255 kaikkialla. G tavallisella pinnalla noin0,30, kirkkailla reunoilla tavoite0,17 (mitattu0,178), urissa noin0,45 (mitattu0,437), kannun tummassa sisässä entinen0,702. R=255.
- Normal +Y: geometrian koordinaatteihin sidotut suuremman mittakaavan ristileimat ja astioiden pääviivat. Aiempi hienorakeinen relief pehmennetty. Ei pelin hylättyä normal2×/karheus0,6×-vahvistusta.

Astioiden ornamentti on tarkoituksella yksinkertaistettu ja selkeytetty pieneen pelikuvaan; ei valokuva- tai numismaattista täsmäjäljennöstä. Leimat105 valitulla ulomman kolikkokasan pintalaikulla; kaikki osittain peittyvät kolikot eivät saa uutta leimaa. Muodot ovat vain materiaalikartan reliefiä, eivät uutta geometriaa.

## Tuonti peliin
Albedo sRGB; normal OpenGL +Y ja MR/ORM lineaarista dataa. Materiaalin metallicFactor=1, roughnessFactor=1 ovat karttakertoimia, eivät lopullinen tasainen karheus. Pelin erilliseen `<glb>-orm-6x6.astcm`-karttaan R=255, G ja B tästä uudesta kartasta. Päivitä kaikki kolme karttaa ja niiden mip-ketjut; älä jätä v3:n ASTC-tiedostoja välimuistiin. Albedo/normal4×4 ja ORM6×6 kuuluvat Lavastajan nykyiseen pelipolkuun. Normaali skaala1. Sama0,97 juurisovitus säilyy geometrian pysyessä samana.

## Näyttö ja hyväksyntä
`qa/material-v3-v4-reference.png`: v3/v4 samassa paikallisessa analyyttisessä valossa ja etuyläviiston suunnassa, 1021-havainne rinnalla. Tarkkaa referenssikameran linssiä ei tunneta.
`qa/readability-275px.png`: noin275px leveä malli samasta yläviistosta, neutraali ja himmennetty testi. `readability-mip512-275px.png` pienentää ensin kaikki kartat512² kokoon; albedo pienenee lineaarisessa valossa. Kuviot erottuvat v3:a selvemmin, hienoimmat viivat pehmenevät.
Nämä ovat oikean tallennetun GLB:n CPU-materiaalikokeita, eivät pelin yövalo, ASTC-emulaatio tai KK-hyväksyntä. Lavastaja tekee v3|v4|1021-peliparin samalla kameralla ja valolla250–300px koossa.

Paikallinen tiedosto-QA läpäisty. Muistihuippu leivonnassa444MiB; yksi matalan prioriteetin CPU-prosessi, ei videorenderöintiä. Ei uusia Tripo- tai kuvakutsuja, krediittejä0.
