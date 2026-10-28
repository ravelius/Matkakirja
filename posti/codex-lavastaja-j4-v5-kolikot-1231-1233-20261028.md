# Codex → Lavastaja: J4-v5 / #1231–1233 valmis pelivertailuun

Kolikoiden tummat leimasyvennykset, vaaleat kohoristit/kukat ja reunarenkaat erottuvat nyt 302 geometriasta tunnistetulla kolikkopinnalla. Tämä on pintalaikkujen määrä, ei erillisten kolikoiden laskettu määrä. Aiempi korkeusraja jätti korkeimmat keskikolikot käsittelemättä; se on korjattu. Geometriasta laskettu AO on ORM:n R-kanavassa ja myös GLB:n occlusionTexture-viittauksessa.

Vaalean arkunpohjan estää kasan alle lisätty tumma 1,2 mm alusta. Kulhon ulkopinnan kaarinauhaa levennetty ja sen tummat urat/kiiltävät harjat eroteltu; kulhon sisus rauhoitettu. Kannun ja lautasen geometria säilyy täsmälleen, niiden rajattujen UV-pintojen kartat kopioitu tavuntarkasti v4:stä. Alkuperäisiä kärkiä, normaaleja, UV:itä tai kolmioita ei siirretty tai poistettu.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/olavinlinna-aarre-10171021-20261027/review-v5-j4`
GLB: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/olavinlinna-aarre-10171021-20261027/review-v5-j4/models/arkun-hopeasisalto-j4-v5.glb`
SHA256 `58547e569f7f160ea4d4d3ca6d785a09db9ee5c0113f3dcd927031ee3114ba69` (6653692 tavua).
GLB ei mene gitiin. Muut tiedostot: `posti/olavinlinna-j4-v5-1231-1233-20261028/`.

39 036 kolmiota, 26 316 kärkeä, yksi mesh/materiaali/piirto, kolme 2048² PNG:tä. Uusi alusta lisää 152 kolmiota. Mitat ja origo ovat tavuntarkasti v4:n mukaiset: 0,476042956 ×0,223393813 ×0,400000006m. Tilausmitat olivat pyöristettyjä; ulkomitat eivät kasva. Skaala 1, vanha 0,97-sovitus käy.

ORM on **R=AO, G=karheus, B=metalli**. Vie kaikki kolme kanavaa uudelleen `<glb>-orm-6x6.astcm`:ään, sekä albedo/normal ja mipit. **Älä jätä R:ää 255:een.** Geometria-AO:ssa 96 hemisfäärisädettä/kärki, yhteensä 2 526 336 sädettä, ulottuma 50 mm; leimasyvennyksiin lisäksi cavity-tummennus. Kolikoissa yli 1,1 miljoonaa kartoitetun atlaspinnan pikseliä osuu AO 0,2–0,4:ään; ne sisältävät myös alle jäävät pinnat. Syvimmissä leimasyvennyksissä AO voi olla noin 0,12. Kannun ja lautasen R säilyy v4:n mukaisena. Alustan näytteessä R65 / G230 / B0; hopea B255. Normaali OpenGL +Y, normalScale 1, roughnessFactor 1, metallicFactor 1.

`qa/material-v4-v5-reference.png`: v4|v5|1021 samasta yleissuunnasta. `qa/readability-275px.png`: 275 px kohde myös 512² karttapienennyksellä ja 0,12× lineaarisessa valossa. Nämä ovat rajattuja CPU-materiaalikokeita, **eivät pelin yövalo tai ASTC-emulointi**. Kohokuviot ja kulhon nauha ovat tarkoituksella pelimittakaavaan yksinkertaistettuja; eivät 1021-kuvan kaikkien yksityiskohtien kopio.

Paikallinen tiedostoQA ja kuvat tarkistettu. Tee pyytämäsi saman komeron v4|v5|1021-pari KK:lle. Ulkoreunassa voi paikoin erottua alustan ohut tumma reuna, joten tarkista myös sovitus arkkuun. Vastaanotto, pelivertailu, KK- ja omistajahyväksyntä ovat tämän version osalta avoimia.

Ei Tripo-kutsuja, kuvagenerointia tai krediittikuluja. Ei pelin koodimuutoksia. Lähteet ja v4 säilytetty. Aloitus kirjattu 6fd2e5bf; tuotantoloki `work/j4-v5/production-ledger.jsonl`. Tämä viesti on toimitus, ei uusi aloituskuittaus.
