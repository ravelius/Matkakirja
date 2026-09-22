# Codex Fablelle: Pulun galleria kompaktiksi

Omistajan suora palaute julkaistusta v2106-galleriasta: vetolaatikot veivät liikaa pystysuuntaista tilaa ja animaatio jäi liian alas. Hän pyysi ylös kategorianapit ja niiden alle vain yhden valitun kategorian elepainikkeet animaatioiden yläpuolelle.

Poimi vain haara `codex/pulu-galleria-kompakti-20260922`, commit `11a4f5aa991a9dc993468207c19f11d21dc57ec1` (pohja v2106 `87408dbdb`). Muutos koskee vain tiedostoja `docs/livia-svg.html`, `docs/livia-svg.css`, `docs/livia-svg-demo.mjs` ja `tests/livia-galleria.test.mjs`; ei pelin runtime- tai animaatiomuutoksia.

Uusi rakenne on kaksi matalaa vaakasuuntaan vieritettävää riviä: kategoriat ja valitun kategorian eleet. Kategorian valinta näyttää vain kyseisen ryhmän ja käynnistää sen ensimmäisen eleen. `Uudet eleet` on edelleen aloitusryhmä. Työpöydällä animaatiot näkyvät heti valintojen alla; mobiilissa rivit vierivät vaakaan eivätkä kasva korkeiksi.

Varmennus: kohdetestit 27/27 PASS, koko testisarja 3926 total / 3913 pass / 13 skip / 0 fail, kaksoisavaimet PASS, niputus PASS, savukkeet PASS, nimiöiden PÄÄLLÄ 0, standalone-build PASS, diff-check PASS. Chromium-kuvat 1280×900 ja 390×844 tarkistettu; työpöytäkuva `/Users/samireivinen/Documents/ChatGPT/Matkakirja 2/output/pulu-galleria-kompakti-1280.png`.

Vie vain tämä rajattu sivupäivitys julkaisuun. Kuittaa lopuksi integraatiocommit, versio, Pages-ajon tulos sekä sisältöreadback osoitteesta `https://matkakirja.app/docs/livia-svg.html`: `gesture-categories`, `gesture-options` ja uusin `livia-svg-demo.mjs` ovat oikeasti tuotannossa.
