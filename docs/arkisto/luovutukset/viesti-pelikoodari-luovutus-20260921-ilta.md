# Pelikoodarin luovutus 21.9.2026 ilta (session nollaus)

Työhakemisto: `/Users/koodaus/Matkakirja-opus` (worktree; vanha
`/Users/samireivinen/Matkakirja-opus` poistettiin uudelleenkäynnistyksessä,
samireivinen-hakemistoon ei saa luoda). Node 22: `node --test "tests/*.test.mjs"`.
Savukkeet: `PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-fable/node_modules/playwright/index.js CHROMIUM="" node tools/savukkeet/<x>.mjs`.

## Haarat ja commitit

| Haara | Commit | Tila |
| --- | --- | --- |
| pelikoodari-sumu-pois | 0c00d12c | julkaistu v1999 |
| pelikoodari-nostot-nakyviin | 9a2d398d | julkaistu v2007 (portti auki kun maa kokonaan ruudulla) |
| pelikoodari-reaktiot-sydan | adb913d2 | julkaistu v2006 (Sonnet-parvi) |
| pelikoodari-nostokortti-leveat | e9e8ec56 | julkaistu v2010 (Sonnet-parvi, omistaja hyväksyi v2) |
| pelikoodari-gl-nimiot | 827850f1 | julkaistu v2014: GL vaihe 2, kaupunkinimet, oletus päällä |
| pelikoodari-gl-nostot | e862f8a3 | julkaistu v2018: GL vaihe 3 (nostot ikoni+nimiö, kylkivaihdon crossfade) + vaihe 4 (pelinappula rungolle, kohteet/linssimerkit CSS2D:hen, nappulan este datumista) + nappulan rasterin korjaus. Rebasattu main v2014 + #2670 päälle. Savukkeet glnimiot-nostot 8/8 (tyopoyta, puhelin), glnimiot 8/8, testit 3832/0, tarkista-savukkeet ok, standalone ok. |
| karttaseppa-gl-runko-3 | 72d2468e | julkaistu v2019 (horisontin häive, atlaksen tiivistys). |
| pelikoodari-savukkeet-punaiset | 9062d9a8 (+ tämä luovutus) | Julkaisijalle: kolme mainin punaista korjattu (alla). Pohja main v2014+. |
| pelikoodari-gl-nappulan-vari | 4509674a | KIIREELLINEN Julkaisijalla: GL-nappula piirtyi WebKitissä mustana (liukuväri #nappula-puu ei svg:ssä) → url(#id)-maalit kloonataan rasterin defs-osaan; savuke-glnimiot-nostot 9/9 värivartioineen. Pohja main v2019. |

## GL-kerroksen tila (docs/raportit/gl-kerros-suunnitelma-20260921.md)

- Vaihe 1 runko (Karttaseppä) + vaihe 2 nimet: tuotannossa v2014, OLETUS PÄÄLLÄ
  (omistaja 21.9. ilta). `?glnimiot=0` = CSS2D-perääntymistie; `?glnimiot=testi`
  rungon testinimiöt. Ilman WebGL-tekstuuria runkoa ei synny → CSS2D; runko
  kaatuessaan puretaan (lauta.js glKehys, glVirhe) → CSS2D.
- Rakenne: `js/pallolauta/glnimiot-sovitin.js` (jako ladonnan datumeista rungon
  instansseiksi: nimet(), nostot(), peli(); crossfade `#nimio-vanha` 180 ms
  kehyskoukusta; pelinLaatikot() nappulan este) ← `js/pallolauta/nimiorasterit.js`
  (rasterit: nimi canvas, nosto = nostosymRasteri, nappula = svg inline-tyyleillä)
  → `js/pallonimiot-gl.js` (Karttaseppä: atlas, shader, asetaKaikki/atlas.varaa/
  peitto/kerroin/nakyvyys/mittarit). Kytkennät: nimet.js `glSovitin`/`jaaUudestaan`,
  nostot.js `naytaNostot`/`jaaUudestaan`, merkit.js `jakaja`-koukku ('peli'),
  lauta.js `glSovitin`, `ui.glKerros` + `ui.pallolautaGL()` (UI-metodi vartijaa varten).
- Vaihe 3+4 = pelikoodari-gl-nostot (yllä). CSS2D:hen jäävät: kohteet (sykkivä
  halo), linssimerkit (vapaa HTML), ankkurit, avatut viuhkat, luonnokset, pisteet,
  liikkuva nappula (siirto.js, pelin oma DOM).
- Seuraavat: (1) Laitetestaajan iPad/iPhone-luku GL oletuksella; (2) kohteet
  rungolle (halo animoituna peittona) jos halutaan; (3) DOM-savukkeiden siirto.

## DOM-savukkeiden GL-siirto

25 CSS2D:n DOMia lukevaa savuketta avaavat laudan `&glnimiot=0`:lla (commit
6aac029d) ja vartioivat perääntymistietä. GL-tilan mittarit ovat
savuke-glnimiot (runko), savuke-glnimiot-nimet, savuke-glnimiot-nostot
(nimet/nostot/nappula rungolla, DOM tyhjä, kaappausvertailu laatikoihin,
kehys-ms, rakennukset). Siirtoa ei ole aloitettu: GL:ssä nimiön siirtymä
maapisteestä on rakenteellisesti 0 (shader), joten nimiot-vakaat/sulavat-
tyyppinen DOM-mittaus ei käänny suoraan — GL-vastine on kehys-ms +
kuvavertailu. Ehdotus: jättää DOM-savukkeet perääntymistien vartijoiksi ja
laajentaa glnimiot-nostot-savuketta (kylkivaihdon crossfade GL:ssä:
`glSovitin.haivytykset()`), nimikyltti/turisti-info GL:ään ei ole siirretty
(turistiinfo on yhä CSS2D).

## Mainin 8 punaista (savukkeet-mac 9f973a43, polton aikana)

| Savuke | Syy | Korjaus |
| --- | --- | --- |
| nimiot-sulavat (2) | vartio 7 kylkivaihdon häivytys: siirtymä alkaa vasta kehyksessä; kuormassa kehys 130–200 ms → 60 ms:n luku näki opacity 1, poisto 260 ms ehti ennen siirtymän kehystä. Tuote kunnossa. | 9062d9a8: seuranta kehyksittäin 400 ms, tuomio vain ≥ 15 fps. 16/16. |
| ranskan-nostot-lukossa | uusi nosto hahmotelma-cluny ilman lukittua ankkuria (visat/hahmotelmat v2008–v2013) | 9062d9a8: `tools/lukitse-nostoankkurit-maalle.mjs --maa FRA`. 27/27. |
| kerma-reuna V5 | GL-nimiö (Mannheim) mittauspisteessä 8,7 E 49,6 N; css-piilotus ei ulotu kankaalle (Karttaseppä vahvisti: ei pohjan vika) | 9062d9a8: kerros piiloon mittauksen ajaksi. V5 vihreä; V4 tunnettu punainen. |
| laivamatka-tanger 3/4 | ei tutkittu tässä sessiossa; aiemmin (21.9. aamu) sama 3/4 johtui puuttuvasta WebKitistä ajokoneella | tarkista `NAKYMA`/webkit-ehto savukkeessa ja onko Playwrightin webkit-2336 asennettu koodaus-käyttäjälle (`ls ~/Library/Caches/ms-playwright`) |
| musta-laatta#webkit, astro-sumu, nostokuva-karuselli | kaatuivat poikkeukseen ennen väitteitä (0/0); kaikki WebKit-ajoja | todennäköisesti sama WebKit-syy: koodaus-käyttäjän cache (webkit-2336 on olemassa) vs. savukkeiden `executablePath`/`PLAYWRIGHT_JS`-polku samireivinen-hakemistossa (ACL); aja yksi käsin `SELAIN=webkit`/ko. savuke ja katso poikkeus. Ei tehty: kone oli kuormassa. |
| nimikyltti 46/48 (ei listalla) | vartio 4 "kyltti / maapaneelin teksti sama zoomista riippumatta" hajonta 50 % — punainen myös main v2014:llä (mitattu), todennäköisesti E2:n kuoren skaalaus turisti-infoon (ei GL) | tutkimatta |

## Avoimet

- Ajon katto (lauta.js asetaAjonKatto "katto jää voimaan perillä"): omistajan vanha
  tallenne oli maan rajan yläpuolella; ei toistunut maamatkalla eikä
  matkavalikolla Chromiumissa; lento/laiva Pariisista ei ollut tallenteella
  käytettävissä → testaamatta. v2007 kattaa oireen. Fable: jätetty.
- kerma-reuna V4 tunnettu punainen (meren väri).
- Sonnet-parvet: molemmat valmiit ja julkaistu (reaktiot v2006, nostokortti v2010);
  vanha `tools/savuke-reaktiot.mjs` (ei sarjoissa) vanheni — chip jätetty.
- Sähke-CORS 403 (matkakirja.app): sahke-worker.yml:n ajo 6.9. epäonnistui →
  Julkaisijalle ilmoitettu, ei tiedossa onko ajettu.
- GL-nappulan väri WebKitissä: korjaus 4509674a Julkaisijalla; Laitetestaajan
  varmistus iPadilla julkaisun jälkeen.
