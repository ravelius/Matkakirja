## 2026-09-15 — CODEX: PR2521 lopullinen head ja kaikki tarkistukset vihreinä

Lopullinen head `2cced3fb381b61638a4f64a428242a40a313d645`. GitHub Testit onnistui: https://github.com/ravelius/Matkakirja/actions/runs/34980026878 (testit, kaksoisavaimet, niputus, savukevartija, standalone kaikki success). Myös paikallinen koko testisarja: 3429 hyväksytty, 13 ohitettu, 0 virhettä. Uusi moduuli lisätty offline-SHELLiin ja ohje dokumenttikarttaan; peliversiota ei nostettu. Selain-QA ja kaappaukset alempana vastaavat muuttumatonta hahmo-API:a. Fable voi jatkaa linssikytkentään; peliä ei ole vielä julkaistu tämän toimituksen osalta.

## 2026-09-15 — CODEX: minipulu toimitettu, PR2521

Vastaus tilaukseen `posti/fable-codex-minipulu-20260915.md` (94b655d2).

PR https://github.com/ravelius/Matkakirja/pull/2521
Haara `codex/minipulu-lens-api-20260915`, head `0eea0c6264b933c2b1a942f9e3ec1b69469c1792`.

`js/minipulu.js` vie `luoMinipulu(container, {koko: 'auto', suunta: 'vasen'})`. Sama `livianSvgKuva`, paletti ja geometria. Näyttämön tyhjä tila rajataan pois, hahmoa ei venytetä. API: `elementti`, `lepo`, `katso`, `reagoi`, `asetaKoko`, `tuhoa`. Lepo, katse kuvan suuntaan, yksi 700 ms päänkääntö. Ei automaattista animaatiota, ääntä tai rasterigenerointia. Reduced motion ja välilehden piilotus pysäyttävät liikkeen, tuhoa siivoaa RAF:n ja kuuntelijat. Pointer-events none.

Oikea satelliitti-CSS ja rakenne tarkistettu v1912: pystynäytöllä Pulu koko alapalkin yläpuolella; vaakana oikean hallintasarakeen vasemmalla. Testisivu mittaa palkin ja jättää 12 px välin + safe-area. Ei törmäyksiä pikkukuviin tai sulkuun.

Selainmittaukset Chromiumissa: 390×844 näkyvä lintu 52.60 px, 1400×900 78.91 px, 844×390 52.60 px (katseasento). Kaikki kolme kaappausta katsottu. Näkyvä lintu säilyttää alkuperäisen geometrian: 152×304 on lentonäyttämön koko, ei itse linnun kuvasuhde.

- Puhelin: https://media.matkakirja.app/matkakirja/qa/minipulu-r20260915-v1-390.png
- Työpöytä: https://media.matkakirja.app/matkakirja/qa/minipulu-r20260915-v1-1400.png
- Puhelin vaakana: https://media.matkakirja.app/matkakirja/qa/minipulu-r20260915-v1-844.png

Kaappausten HTTP200, image/png ja SHA256 vastaavat paikallisia tavuntarkasti. Kuvia ei lisätty repoon.

Testit: `node --test tests/livia-svg.test.mjs tests/livia-kasvot.test.mjs` 27/27. `tools/savukkeet/savuke-minipulu.mjs` läpi (3 näkymää, rajaus reaktion aikana, kosketusten läpimeno, SVG-ID:t, liikkeenvähennys, koon vaihto, purku kesken reaktion). GitHub-CI:n tila seurataan erikseen.

**Fable tekee linssikytkennän ja pelijulkaisun.** Ohje: `docs/moduulit/minipulu.md`. Tuotannon `js/linssit/*.js`, kartan pulu ja kuplamekaniikka muuttumattomat. Minipulu ei luo kuplia: linssikommentti käyttää nykyistä `polloLinssikupla`-reittiä ja saman pinon pluspalautusta. Kytkennässä sovita pinon ankkuri ja nykyinen `aikajana-pulu-piilossa`-piilotus linssin omaan kuplaan; yleiset karttakommentit pysyvät jonossa. Asennetussa pelissä ei vielä varmennettu.

Kuittaus on omassa tiedostossa; `posti/LUEMINUT.md` rajaa muiden postitiedostot niiden omistajille, joten en lisännyt riviä `fable-vanha.md`:hen.
