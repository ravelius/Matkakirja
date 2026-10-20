# Karttasepän luovutus 22.9.2026 ilta (sessio 3 → sessio 4)

Worktreet: rooli-worktree `/Users/samireivinen/Matkakirja-karttaseppa` pysyy
haarassa `karttaseppa-tyo-20260922`, jota EI mergetä (mergetyn haaran
worktree katosi kahdesti 21.–22.9.). Erät tehdään väliaikaisessa
worktreessä `/Users/koodaus/Matkakirja-karttaseppa-pr` (haarat `karttaseppa-<aihe>`
origin/mainista); mittaus-worktree `/Users/koodaus/Matkakirja-karttaseppa-ablaatio`
(main + `?kerrokset=porrasN`-lippu + tahditus). node_modules: symlinkki
`/Users/samireivinen/Matkakirja-fable/node_modules` (poista ennen committia).
Commit `-c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`. Älä kutsu
change_directorya rooli-worktreehen (ei mennyt läpi; omistaja tekee Choose folder).

## Mainissa tänään

- #2697 **M0** `tools/tee-maakuntavektorit.mjs` (admin-1 kolmioituna, MKV1), #2741
  `--taso=admin0` (maapolygonit), #2745 **M1** `js/pallomaakunnat.js`
  (`?maakunnat=1`, oletus pois; osuma/valitse linssille), #2699 laattalatausten
  aloitus 2 laattaa/kehys, #2690 CHE-vedos + siirrot versioon h.
- Ämpärissä `julisteet/pallo/maakunnat/2026-09-22a/` (502 tiedostoa, 15,9 Mt);
  maapolygoneja ei viety (Pelikoodari teki kerman shaderilla). Paikalliset
  aineistot `/Users/koodaus/pyramidi-poltto/{maakunnat,maapolygonit}-2026-09-22a/`,
  `ne-data/ne_10m_admin_0_countries.geojson`.

## Erä 2 (sulavuuskatsaus)

- **#2753 → tuotannossa v2086 (#2755)** `LAATTAKERROS_TEKSTUUREJA_PER_KEHYS` 1 → 2, `VALMISTELU_BUDJETTI_MS`
  4 → 6: zoomin karkean tason näkymisaika z7→z8 merellä 536–895 → 347–477 ms,
  maalla 751–1052 → 546–711; zoomin/panoroinnin p95 ennallaan.
- **#2760 → v2090 (#2764, Julkaisijan julkaisuversio)** esilataus levossa (katsaus 19): sw.js palvelee pyramidin laatat
  (`/julisteet/pyramidi/`, ei .json) LAATTACACHE:sta, esilatausviesti hyväksyy
  ne, rinnakkain 4; `js/laattaesilataus.js` jonottaa näkymän z+1 (laatikko × 1,5)
  ja kohdemaan z6–z8 (manner + saaret ≤ 12°), 20 osoitetta / 250 ms vain levossa;
  `?esilataus=0`. Mittari `laatat.esilataus`.
- **#2761** (avoin, Julkaisijalla) preconnect + dns-prefetch ämpäriin (katsaus 20).
- **#2762** (avoin, Julkaisijalla) laattakatkaisija (katsaus 21): media.js laji `'laatat'`, 3 virhettä
  tai 429/5xx → uudet lataukset seis 20 s, jono jatkuu; mittari `laatat.katkaistu`.
- **Konflikti:** v2090 (#2760) ja #2762 muokkaavat `tests/pallolepokerros.test.mjs`
  E0-tuontilistaa; lopullinen lista `['./fokusmitat.js', './laattaesilataus.js',
  './laattakerma-shader.js', './laattapyramidi.js', './media.js']` (Julkaisijalle kerrottu).
- **Kohta 9 (esikomposointi) EI tehdä pallolla** (Fable A): pallo ei käytä
  viivatasoa (`lepokerroksenKerrokset` viiva: false), laatta on jo pohja + ranta
  (10 % laatoista) + nimiöt + nostot; kääriminen peruisi V4-päätöksen (6.9.).

## Mittarit ja ajotavat

- `tools/savukkeet/mittaa-zoomiennakko-meri.mjs` (haarassa #2753): karkean tason
  näkymisaika = tason vaihdosta 90 %:n peittoon, Välimeri 40,5 N 6 E ja Ranska,
  WebKit 390 × 844 dpr 3; `PLAYWRIGHT_JS=… ULOS=<kansio> node …` (`DEBUG=1`
  tulostaa kehykset). Vartio merellä ≤ 700 ms.
- `tools/savukkeet/savuke-laattaesilataus.mjs` (#2760): Chromium + SW päällä,
  ämpäri Noden kautta kontekstin reitillä (WebKit ei reititä SW:n noutoja);
  A `?esilataus=0` vs B; korin koko ja `laatat.esilataus`.
- `tools/savukkeet/mittaa-ablaatio.mjs` (haara pelikoodari-ablaatio): portaat,
  p95 zoomissa ja panoroinnissa; `PORTAAT=2,1,2,1` vuorotellen.
- **Kuorma:** Mac Studion kuorma vaihtelee 5–450 muiden sessioiden takia —
  mittaa A/B vuorotellen, hylkää kuormapiikit (`uptime`), kirjaa kuorma tulokseen.
- Opit: verkko ei ole pullonkaula Macilla (z8-laatta 16–52 kt, TTFB 21–56 ms,
  10 rinnakkain 67 ms); lattia oli pelin putki. Ennakon laajennus merellä ei
  auttanut (haara `karttaseppa-zoomiennakko-2`, jää mittariksi).

## Pohjapoltto ja nimiöt

Tuotannossa pohja `2026-09-22-pohja` (isobaatit, merikoristeet), nimiöt g
(CHE 26 kanttonia mukana). Nimiöversio h (CHE-siirrot: Luzern 8,05/46,98, Valais
8,0/46,27, St. Gallen 9,05/47,17, Appenzell AR 9,25/47,31, AI 9,36/47,25) on
valmiina `ajo-20260922/nimiot-poltto-5.json` + RESEPTI.md:n lopussa — ajetaan
seuraavan nimiöpolton yhteydessä (aja-2.sh `--nimioversio 2026-09-22h-nimiot`).
Seuraavaan pohjapolttoon: Intian valtameren kompassiruusu (93, −17) → (96, −12).

## Avoimet

1. **Pohjan piilotuksen tarkistus:** kun Pelikoodarin erän 1 kohta 2 (kirjaston
   z5-laatat + pohjapallo piiloon kun kerros peittää) on mainissa, aja
   mittaa-zoomiennakko-meri.mjs ja katso kaappauksista, ettei merellä z7→z8-
   venytyksessä näy aukkoja.
2. **Isobaattivektorit (a)** odottavat omistajan päätöstä sulavuuden jälkeen
   (viikon työ + pohjapoltto, +50–100 k segmenttiä puhelimelle).
3. Laitetestaajan iPhone-mittaus #2760:lle (esilatauksen hyöty on LTE:llä).
4. Maakuntalinssi: karttaselitepaneelin Maakunnat-välilehti kytkee M1:n
   (Pelikoodari); `pallolauta.maakunnat().osuma/valitse`.

## Uusi sessio tekee ensin

1. `git fetch origin`; tarkista #2761/#2762 tila (v2090:n E0-lista → rebase #2762) (`gh pr list --author @me`);
   jos punainen, korjaa erähaarassa.
2. Odota Pelikoodarin kohtaa 2 → avoin 1. Ei muita sulavuustöitä ennen omistajan
   tuntumatestiä (Fable 22.9.).
