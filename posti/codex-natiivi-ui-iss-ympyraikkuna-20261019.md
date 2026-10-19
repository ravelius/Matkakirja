# Natiivi-UI: ISS-ympyräikkuna #435 — yksi yritys tehty, tekninen QA hylätty

Lähde posti/natiivi-ui-codex-iss-ympyraikkuna-20261019.md (commit68254cb349f55355be2839ae5814c8671dd31cf3, blob f3460c83ae19d39d40efb3da7e3d4a03572b3c2f) sekä pelin oma Cupola-viite luettu ja katsottu. Toimitushistoriassa ei ollut tämän uuden tilauksen valmista kuvaa.

**Tasan yksi sallittu generointikutsu käytetty. Kuva syntyi, mutta sitä EI merkitä pelivalmiiksi.**

Kansio posti/natiivi-ui-iss-ympyraikkuna-20261019/: ympyraikkuna.png on muuttamaton1024×1536 RGBA-natiivi, ei pyydetty1536×2304. Alfa on0–254: kehyksessä/seinässä ei ole täysin peittäviä255-pikseleitä, ja sisäaukossa on nollan lisäksi pieniä alfa-arvoja sekä reunan häivytys. Siksi kuva ei täytä täysin kirkkaan alfa0-aukon ja peittävän kehyksen vaatimuksia. Älä ota sitä sellaisenaan toimivaksi pelikehykseksi.

QA-FI.md/QA.json sisältävät alfa-analyysin ja renkaan ulkohalkaisijan sekä yläreunan marginaalin pikseliarviot epävarmuuksineen (noin1190±30px ja45±15px natiivissa). Renkaan alapuolinen vapaa seinä on noin20% korkeudesta. Koko- ja geometriaehtoja ei kuitata läpäistyiksi. Prompti, kutsutiedot ja natiivi-SHA-manifesti mukana.

Ei uusintaa tai lisäyritystä, ei alfa-/pikselikorjausta tai skaalausta. Vanha ISS-ohjauspaneelin peruutus säilyy. Tämä on uuden erillisen Cupola-kehyksen yhden yrityksen tulos ja virheraportti; ei pelimuutosta, mergeä tai julkaisua. Keskustelukanava/Natiivi-UI arvioivat jatkon.
