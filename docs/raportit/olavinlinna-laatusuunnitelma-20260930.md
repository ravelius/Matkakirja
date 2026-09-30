# Olavinlinna: laatudiagnoosi ja laatusuunnitelma (Linnanrakentaja + Siirtoseppä 30.9.2026)

Omistaja: "miksi osa linnasta on niin huono laatuinen … ja miksi vesi näyttää niin huonolta?", sitten "tee linnasta
mahdollisimman laadukas kuvallisesti" ja (hyväksyntä) "älä pudota laatua yhtään. vasta jos puhelin on iphone 15 pro
tai heikompi niin sitten pudota."

## 1. Diagnoosi

**Lähde (mitattu):** Senaatin fotogrammetria (CC BY 4.0) on 1 351 224 kolmiota ja **yksi 4096²-diffuusi koko
saarelle**. Käytössä on jo kaikki: huippu-taso = koko geometria + täysi 4k-tekstuuri. Tarkempaa tasoa ei ladatussa
aineistossa ole (Sketchfabin "Original"-lataus, OBJ + PNG).

**Tekselitiheys (tools/dioraama/blender/tekselitiheys.py, huippu):** 35 700 m² pintaa yhdessä 4k-atlaksessa, UV-käyttö
62 %, eli **5,5–6,5 cm tekseliä kohden kaikkialla** (vaaka mediaani 5,5, seinät 5,9). Katot ja piha eivät siis ole
muita harvempia. Lähizoomissa (huonekamera 15–30 m) yksi tekseli venyy useiden näyttöpikselien yli, ja kuva on
suttuinen. Osa näyttää "huonommalta" myös siksi, että katot ja piha on kuvattu vinosti ja katveet ovat tummia, ja
nämä virheet näkyvät isoina tasaisina alueina.

**Unity (Siirtoseppä):** "Kuori: auto" valitsi tason muistin mukaan (≥ 7 Gt huippu). Tekstuurit ovat ASTC 4×4
(varapolkuna ETC2, joka on huonompi, tarkistetaan lokista). Huoneiden valoatlakset olivat iPhoneilla 2k-puolikkaita.
**Vesi** on valaisematon maalattu tekstuuri 8 m:n toistona: ei heijastusta, ei spekulaaria eikä fresneliä, joten toisto
ja "maalattu matto" näkyvät.

## 2. Tavoitekuvat (omistajan hyväksyttäväksi ennen reaaliaikatyötä)

`proto-3d/_valmiit/linna-laatu/tavoite-v1/`: yleis-vaaka.png, yleis-pysty.png ja lahi-muuri.png (Cycles,
`tools/dioraama/blender/tavoitekuva.py`). Hämäräilta (Blenderin oma taivas, aurinko juuri laskenut lounaaseen) ja
kuori, jonka päällä on CC0-yksityiskohtapinnat pinnan suunnan mukaan (kivimuuri, liuskekatto, kivetys, Poly Haven).
Ikkunat hehkuvat hämärätekstuurista, soihdut tulevat datan liekkipisteistä ja heijastava vesi on kaksikerroksista
aallokkoa. Mukana on bloom. Puuttuu vielä: ympäristön saaret ja puut, rantavaahto ja ikkunamaskin pisteiden siivous.

## 3. Suunnitelma (omistaja hyväksyi 30.9.) ja työmäärä

| Vaihe | Kuka | Sisältö | Arvio |
|---|---|---|---|
| 0 | Linnanrakentaja | Tavoitekuvat v1 → omistajan hyväksyntä, sitten v2 korjauksin | valmis / 0,5 pv |
| 1 | Linnanrakentaja | **Lähde:** ASTC häviöttömästä PNG:stä (nyt JPEG → ASTC). **Kysytään Senaatilta tarkempi aineisto** (8k/16k-tekstuurit tai alkuperäiset kuvat), mikä olisi suurin yksittäinen parannus (omistajan päätös yhteydenotosta) | 0,5 pv (+ Senaatin aikataulu) |
| 2 | Linnanrakentaja | **Hybridi:** heikot osat (katot, piha, puurakenteet, rantakalliot) CC0 PBR -pinnoiksi. A: yksityiskohtasekoitus maskeilla kuten tavoitekuvassa (1–1,5 pv). B: katot ja piha mallinnetaan uudelleen omin UV:in ja PBR-materiaalein (+2–3 pv) | 1,5–4,5 pv |
| 3 | Linnanrakentaja | **Delighting:** leivotun päivänvalon ja varjojen poisto kuoren tekstuurista (AO- ja aurinkovarjo-estimaatti, jako), jotta pelin hämärävalo toimii | 1 pv |
| 4 | Linnanrakentaja + Siirtoseppä | **Valo:** hämärän lightmapit kuorelle (Cycles bake), siistit ikkunamaskit, soihtujen leivottu valo + 6 elävää liekkiä, reflection probe, sävytys, bloom ja kevyt AO | 2–3 pv |
| 5 | Siirtoseppä (minulta CC0-mallit) | **Vesi ja ympäristö:** analyyttinen vesi (taivas, fresnel, valojen juovat, kaksi aallokkokerrosta, syvyysväri, rantavaahto) noin 0,2–0,4 ms, tasoheijastus selvitetään täyden laadun laitteille. Saaren kalliot ja puut sekä hämärän taivas | 2–3 pv |
| 6 | Siirtoseppä + Laitetestaaja | **Laatutasot:** täysi laatu A17 Prota uudemmille (iPhone 16+, M-iPadit, Mac), kevennys iPhone 15 Pro ja heikommat. Tavoite 60 fps, mittaukset laitteella | 1–2 pv |

**Yhteensä noin 8–14 työpäivää** vaiheittain. Kukin vaihe näytetään kuvaparina (nyt vs. uusi) ennen seuraavaa.
Kustannusarviot iPhonella (Siirtoseppä): yksityiskohtapinnat 0,2–0,5 ms, analyyttinen vesi 0,2–0,4 ms ja
tasoheijastus +3–6 ms (vain täyden laadun laitteille, jos mahtuu).

## Lähteet
Senaatti-kiinteistöt: Olavinlinna (CC BY 4.0, muokattu). Poly Haven -tekstuurit (CC0): stacked_stone_wall,
roof_slates_02, slate_floor_02 (`proto-3d/_lahteet/polyhaven/manifest.json`).
