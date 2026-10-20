# Pelikoodarin luovutus 22.9.2026 (yö, konteksti 70 %)

Työhakemisto `/Users/samireivinen/Matkakirja-pelikoodari` (rooli-worktree;
työhaarat origin/mainista, erät omiin haaroihin). Node 22:
`node --test "tests/*.test.mjs"` (3911/0). Savukkeet paikallisesti:
`PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-fable/node_modules/playwright/index.js NODE_USE_ENV_PROXY=1 CHROMIUM="" node tools/savukkeet/<x>.mjs`.
Edellinen luovutus: docs/raportit/viesti-pelikoodari-luovutus-20260922-ilta.md.
Katsaus, jota tämä työ toteuttaa: docs/raportit/sulavuus-katsaus-20260922.md.

## Tila: sulavuuskatsauksen erät 1 ja 3 ovat tuotannossa

| Versio | Sisältö | Koeliput (vanha polku / mittaus) |
| --- | --- | --- |
| v2094 | HOTFIX: kerma-shader ei kääntynyt (`vUv` ei ole paketin three:ssä; `onBeforeCompile` näkee shaderin ennen #include-avausta) → laattakerros oli v2084–v2093 näkymätön, pelaaja näki z5-pohjan. Oma varying `vKermaUv`. | vartija `savuke-laattaohjelmat.mjs` (webkit + chromium, julkaisusarja) |
| v2097 | Erä 1, 13–15: syöte kerran kehyksessä (`ohjaimet.update`-kääre, `ui.pallonSyote`), kameralokin pino vain kehittäjätilassa, maapaneelin change-kirjoitus pois, kotelon mitat eleen alussa | `syotevanha` |
| v2098 | Erä 1, 1–3: ilmakehä pois kun sen reuna ei ole ruudulla (`ilmakehaNakyy`), kirjaston pohja piiloon kun `kerros.peittaaKokonaan()`, kerma ilman pow-pareja (sekoitus lineaarisessa, `kermanVariLineaariseksi`) | `ilmakehavanha`, `pohjavanha`, `kermapow` |
| v2099 | Erä 1, 7 ja 17 + asetus: compileAsync-esikäännös laattamateriaalien varianteille, Livian nousu/lasku paikataan (korkeus porrastettu avaimessa), pöllövahti lepää `pallolauta-liikkuu`-luokan ajan, omistajan asetus **Tarkkuus liikkeessä** (hampurilainen → Kartta: terävä / tasainen / kokeellinen; `js/tarkkuus-asetus.js`, `?tarkkuus=`) | `eiesikaannos`, `pollovahtivanha`, `leijuvanha` |
| v2101 | Erä 3, 18 ja 10: **lepopiirto** (`js/pallolauta/lepopiirto.js`: piirto vain muutoksesta, syke 4 fps, hehkupisteen syke 15 fps; esteet = kartta-liike.js LEVON_ESTEET) ja nollakopio-bittikartta yhden kuvan laatoille (flipY = false, käännös UV:ssä ja `kermaKaanto`) | `levovanha`, `lepopiirto` (pakollinen automaatiossa, ks. alla), `kangasaina` |
| v2102 | Erä 3, 11–12 ja 8: ei olioita kehyspolussa (`d.__pinta`, Map suoraan), yksi häivytysjono (`haiveet`, `haiveAskel`, `kerros.haiveita()`), nimiöatlaksen osittainen päivitys (`copyTextureToTexture`, mittarit `atlasOsapaivityksia` / `atlasKokopaivityksia`) | `atlaskoko` |
| v2103 | Pulun karttapaikka 3,6 rem (Codexin commit 69f9a2e, kaappaukset docs/raportit/kaappaukset/pulun-karttapaikka-20260922/) | — |
| v2104 | HOTFIX: esikäännös kääntää vain näytteiden ryhmän (`compileAsync(ryhma, kamera, scene)`); `compileAsync(scene)` pollasi kaikkia scenen materiaaleja ja kesken purettu laatta kaatoi sen (sivuvirhe "reading 'isReady'" v2099–v2103) | — |

Mittaustuloksia (headless ANGLE Metal, Ranska 0,2–0,05): drawcalls 84 → 66,
three.render 0,80 → 0,55 ms, lepo 60 → 15 fps (4 fps ilman hehkupisteitä),
zoomin latautuminen 60 → 24,5 fps, initTexture suora 0,13 vs kangas 0,54 ms
(WebKit), atlaksen koko vientejä 19 → 2, sisäinen px/ms-vaihtelu 35 → 30 %
(mittarin lattia ~25 % yhden kehyksen viiveestä). GPU-täytön säästö ei ole
headlessissä mitattavissa.

Mittarit: `tools/savukkeet/mittaa-tasaisuus.mjs` (KOE=…, sisäinen veto +
CDP-veto, render ka, dc, ilmakehä/pohja), `mittaa-sulavuus.mjs`,
`__kehysprofiili.veto`. Vartijat julkaisusarjassa: `savuke-laattaohjelmat`
(LINK_STATUS kaikille ohjelmille + laatan pikseli ilman pohjaa) ja
`savuke-lepopiirto` (levossa ≤ 20 fps ilman kamera-syitä, vedossa
pysähdyksiä ≤ 2, saapuminen piirretään ilmoituksesta, syke piirtää laatan,
ilman lippua joka kehys) — molemmat webkit + chromium.

## Tärkeät opit

- **Paketin three on uudempi kuin r155** (globe.gl 2.46.2:n bundle):
  `copyTextureToTexture(src, dst, srcRegion, dstPosition)` ja
  `compile(scene, camera, targetScene)`. Varyingien nimet r15x+
  (`vMapUv`, ei `vUv`).
- **Lepopiirto on automaatiossa pois** (`navigator.webdriver`): Playwrightin
  `page.screenshot` sommittelee uuden kehyksen ja WebGL-kangas ilman
  preserveDrawingBufferia antaa TYHJÄN puskurin, jos kehystä ei juuri
  piirretty (mitattu 47,38,33). Näytöllä sommittelija pitää viimeisen
  kehyksen. Mittaus ja vartija pyytävät `?koe=lepopiirto`; pikselit
  luetaan readPixelsillä piirron jälkeen. Savuke, joka kutsuu
  `renderer.render` itse, kutsuu ensin `pallo.__piirto.pakota()`.
- Muutoslähteet ilmoittavat lepopiirrolle `pallo.__piirto.tarvitaan(ms)`:
  laattakerroksen ja vektorien häiveet, nimiöiden `likaa()` ja `peitto`,
  nimiöiden crossfade (`ilmoitaHaivytys`), ryhmien add/remove (lauta.js
  `ryhmienVahti`), atlaksen osapäivitys. Uusi GL-animaatio → ilmoita tai
  lisää este; unohdettu lähde näkyy enintään 250 ms:n viiveenä.
- Julkaisija julkaisee omilla PR:illään ja SULKEE Pelikoodarin PR:t
  ("Korvattu yllä julkaistulla PR:llä") — suljettu ≠ hylätty; tarkista
  origin/main.

## CI: WebKit-rivien aikakatkaisut

#2786:n ja #2788:n savukeajoissa WebKit-rivit (musta-laatta, laattaohjelmat,
lepopiirto, hehkupiste, tyyppimerkit, zoomiraja…) kaatuivat
`browserType.launch: Timeout 180000ms exceeded` ennen yhtään väitettä.
Paikallisesti WebKit käynnistyy 151 ms:ssa; sama tunnettu kuormapunainen
kuin sarjat.json:n huomautuksissa (rinnakkaiset käynnistykset Mac-runnerilla,
load 8–20). Ei koodivika. Lisäksi paikallisesti nähtyjä muita punaisia,
joita en tutkinut: topografialinssi "seepiapohjan laattoja ei haeta linssin
aikana (seepia 1)" ja "linssin aikana kartan päällä jäänne
div.pallolauta-liike-pulu 7286 px²" (390 px, luenta), reittiverkko 11/12,
pariisi-lahizoom 8k (390-liuska). Tarkista, ovatko ne kuormaa vai
v2099–v2104:n seurausta (pulun jäänne linssin aikana voi liittyä
lepopiirron esteisiin tai Livian ramppiin — `?koe=leijuvanha` erottaa).

## Avoimet kohdat

- **Omistajan tuntumatesti odottaa.** Fablen linjaus 22.9.: omistaja kokeilee
  vasta kun kaikki on tuotannossa — nyt on. Ei uusia sulavuusmuutoksia ennen
  omistajan palautetta.
- Kohta 16 (ladonta liikkeessä): ei osoitettu — pisin pysähdys 0 ms
  Chromium, 17–20 ms WebKit myös ilman lepopiirtoa.
- Kohta 9 (esikomposoidut laatat, yksi kuva per laatta) on Karttasepän;
  sen jälkeen nollakopio (kohta 10) koskee kaikkia laattoja (nyt ~17 %).
- Kohta 5/dpr: asetus on pelaajalla ("Tarkkuus liikkeessä"); oletus terävä.
- **Pohjapallo-shaderin WIP** haara pelikoodari-kermashader-pohja 3d8288c1f
  on RIKKI (kerroksen laatat harmaina) ja vanhentunut: v2094:n varying-
  korjaus ja v2098:n pohjan piilotus tekevät siitä vähemmän tarpeellisen
  (pohja on lähikuvassa piilossa). Jos siihen palataan: bisektoi — palauta
  laattakerroksen fragmentti täsmälleen nykyiseen (vKermaUv-runko) ja
  lisää pohjavariantti erillisenä; France-reikä kohdallaan `?lauta=pallo`
  altitude 0,6 -kuvassa, peilikuva = lon-merkki väärin.
- Laitetestaajan luvut oikealla iPhonella erien jälkeen (tasaisuusmittari
  Ranska z6 / Camargue z8 viileänä ja 5 min jälkeen) puuttuvat.

## Uusi sessio tekee ensin

1. Odottaa omistajan palautetta tuntumatestistä (Fablen kautta). Ei
   sulavuusmuutoksia ilman sitä.
2. Jos palautetta ei ole: tutki yllä listatut paikalliset punaiset
   (topografialinssi, reittiverkko, pariisi-lahizoom) ja WebKit-
   aikakatkaisujen juurisyy CI:ssä (rinnakkaisten WebKit-käynnistysten
   määrä aja-sarja.mjs:ssä?).
3. Tilapäiset worktreet vain /Users/koodaus/wt-*-polkuihin; poista
   /Users/koodaus/wt-pelikoodari-luovutus kun tämä on mergetty.
