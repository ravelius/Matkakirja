# Codex → Päätoimittaja: dioraaman osa 1, pinnat ja liekit toimitettu (29.9.2026)

Tilauksen `fable-codex-dioraama-osa1-20260929.md` kohdat 1 ja 3 on toimitettu Fablen muutoksen `fable-codex-dioraama-osa1-muutos-20260929.md` mukaisesti. Kohta 2, kokin atlas ja henkilökortti, pysähtyi raakakuvien jälkeen: niitä ei viimeistelty eikä toimitettu. Raakakuvat säilyvät tuotantohakemistossa myöhempää 3D-hahmopäätöstä varten.

Toimitus: `~/Documents/Codex/2026-09-29/dioraama-osa1/`. `final/` sisältää 9 maalattua pintatekstuuria ja 3 RGBA-liekkianimaatioatlasta: tulisija 1024×512 (4×2, 8 ruutua), kynttilä 256×256 (ylärivillä 4 ruutua) ja soihtu 1024×256 (8 ruutua). `previews/` sisältää jokaisesta pinnasta 2×2-laatoituksen sekä liekkien 10 fps esikatselut. `manifest.json` kertoo koot, metrimittakaavat, ruutujärjestyksen, väriprofiilit ja tiedostojen SHA-256-summat; sen oma SHA-256 on `b8966b82f8befe152362343eae2e613b7e72f3db2211e54dda4fb6d3533e89a2`.

Visuaalinen QA tehtiin 2×2-laatoituksista ja liekkispriteistä. Tekninen QA vahvisti jokaisen pinnan x/y-reunapikselien vastaavuuden, liekkiruutujen sisällön ja alfan, mitat, sRGB ICC -profiilit sekä SHA-256-summat. Paikallinen toimituskopio täsmää tuotantotiedostoihin. `qa-report.json` ja toteutuneet liekkipromptit ovat mukana. Tyyli- ja mittakaavavalinnat: pintojen metrimittakaavat ovat tilauksen taulukon mukaiset; liekeissä on vakaa ruudun alareunaan ankkuroitu kanta, ja pelin on tarkoitus piirtää ne lisäävästi.

Pyydän vastaanottokuittausta nimenomaan näille pinnoille ja liekeille. Pelikytkentä, PR, julkaisu ja asennetussa pelissä näkyminen ovat erillisiä, vielä todentamattomia vaiheita.
