# Karttasepän luovutus 21.9.2026 ilta (sessio 2 → sessio 3)

Seuraava sessio: worktree `~/Matkakirja-karttaseppa` (omistaja luo), haarat `karttaseppa-<aihe>`
origin/mainista. Commit: `git -c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi commit`.
Uusia worktreitä ei voi luoda /Users/samireivinen-kotiin (ACL) — käytä /Users/koodaus/… tai
omistajan luomaa kansiota. Worktreissä ei ole node_modulesia: symlinkkaa väliaikaisesti
`/Users/samireivinen/Matkakirja-opus2/node_modules` (poista ennen committia, .gitignore ei
peitä symlinkkiä).

## Tuotannossa (illan erät)

- **Pohjapoltto `2026-09-22-pohja`** (v2015, PR #2670): meri isobaatteina
  (`--syvyyskayrat 200,1000,3000 --syvyyskohina lauta`, ei portaita — laikut ja tason vaihdon
  vilkkuminen poissa), joet pohjassa, vesiviivoitus tumma, litistys 0,8, GSHHG-ranta rantatasolla,
  **merikoristeet pohjan kalusteina** (`--koristeet assets/koristeet/meri/pallo-koristeet.json`,
  29 Codexin laivaa/ruusua valtamerillä, koko `kokoPx` laattapikseleinä, tasot z1–z6;
  maailmapiirto.js piirraMaailma osio 9). Versiot: pohja/viivat/nostot `2026-09-22-*`, ranta
  `2026-09-21-ranta`, nimiöt `2026-09-22g-nimiot`, pallo `2026-09-22-pohja-20260922a`.
  Resepti ja ajo: `/Users/koodaus/pyramidi-poltto/ajo-20260922/` (RESEPTI.md, aja-1.sh 75 min,
  aja-2.sh 83 min; kopio docs/raportit/kaappaukset/poltto-20260922/RESEPTI.md). Raportti
  docs/raportit/poltto-20260922.md. Luettelon edelliset versiot samassa kansiossa
  (`ampari-luettelo-edellinen.json` = 21-pohja, `ampari-luettelo-22f.json` = 22-pohja/f-nimiöt).
- **Nimiötaso g** (luettelo vaihdettu 21.9. klo 23.35): maakuntavedos 4 tuotannossa —
  ITA/ESP/GBR/POL/AUT nykyalueet (ruoste-vahva, nimet z7–z8, rajat z6), Sisältökirjurin
  nimikorjaukset (Podkarpackie, Lubuskie; Abruzzo/Molise erillisinä). Nimistö
  `ajo-20260922/nimiot-poltto-4.json` (222 riviä: tuotanto + 67 nimeä + 6 rajariviä).
  Nimiöillä ei ole koodiosoitinta: julkaisu = luettelon vaihto ämpäriin (aja-2.sh
  `--nimioversio <uusi> --nimiot <json>` → luettelo vientikansioon → `aws s3 cp`, ks.
  polta-paikallisesti vie_luettelo; pallo kieltäytyy "on jo ämpärissä" — harmiton).
- **Laattakatto** (v2023, PR #2679): katto (48) lasketaan aidosti näkyvistä laatoista, ei
  varalla laajennetusta alueesta; katon pudottama taso ei saa hystereesiä (`kattoRajoitti`).
  Korjasi "panoroidessa karkea taso, levossa hieno". Sulavuusmittarin yhteenvedossa
  `laatat` { purkuja, pyyntoja, tasoAlussa/Lopussa, tavutMt, kattoRajoitti } Laitetestaajalle.
  **Muistiraja:** puhelimella 54 näkyvää + 12 tukea ≈ 66 laattaa on lähellä 96 Mt:n tavukattoa
  (68) — jos laitteella `laatat.purkuja > 0` panoroinnissa, harvenna tukitasoa
  (LAATTAKERROS_TUKI_ASKEL/LAATTAKATTO_TUKI).
- **GL-runko 3** (karttaseppa-gl-runko-3 72d2468e, Julkaisijan jonossa gl-nostot-mergen
  jälkeen): horisontin häive (smoothstep ≈ 7°), atlaksen tiivistys (kuolleet rasterit pois,
  elävät säilyvät), mittarit tiivistyksia/pudotettuja/kuolleita, kerros.tiivista().

## Jonossa / kesken

1. **PR #2689 zoomiennakko** (kiireellinen, Julkaisijalla): laattakerros tilaa seuraavan
   tason keskilaatat (60 % näkymästä, ≤ 16) muistiin, kun kamera laskee ja vaihto on lähellä
   (tarve 35 %:n sisällä TAI taso laattakaton rajoittama). Mitattu: vaihdon hetkellä 18/54 ja
   8/50 laattaa heti scenessä (ennen 0). Jos vielä muhjua: nosta LAATTAKATTO_ZOOMIENNAKKO tai
   KESKIOSUUS, tai lisää sceneen jo ennen vaihtoa (syvyyssiirto HIENOMPI −10 sallii).
2. **MARSEILLE-välkkyminen zoomissa** = GL-sovittimen portaan vaihto (nimi putosi CSS2D:hen
   uuden rasterin ajaksi). Korjaus haarassa karttaseppa-gl-portaanvaihto d070ebda0
   (viimeSpritet: vanha rasteri kunnes uusi valmis, skaalattuna; sama nostoille), **Pelikoodari
   vie** omaan haaraansa pelikoodari-glnimiot-vanha-rasteri ja ajaa savukkeet.
3. **Maakuntavedos 4 -haara** karttaseppa-maakuntavedos-4 767d0341 (vain docs: työkalu
   vedos4/tee-nykyalueet.mjs, data nykyalueet-<iso>.json, avainlista vedos4/avaimet.md
   Sisältökirjurin luonnehdintoihin, avain `<ISO>:<tunnus>`) — Julkaisijan jonossa. NE admin-1
   GeoJSON: `/Users/koodaus/pyramidi-poltto/ne-data/ne_10m_admin_1_states_provinces.geojson`.
   **CHE 26 kanttonia** valmiina datassa (nykyalueet-che.json, nimet tarkistettu), ei vedoksessa:
   tee kuvat (Bern 46,8/8,2, z7–z8) jos omistaja haluaa, sitten nimiöversio h.
4. **Maakuntalinssi** (omistajan toive, suunnittelu vasta kun sulavuus kuitattu): suositus
   VEKTORITASO admin-1-polygoneista (kolmioitu, väri kärkiattribuuttina, yksi drawcall per maa
   pallovektorit-kerroksen tapaan; ≈ 0,1–0,3 ms/kehys puhelimella, ~1 Mt; napautus = piste
   polygonissa CPU:lla), ei poltettua värilaattatasoa (+50 % laattatekstuureja, ei osumaa).
   Sama data kuin nykyalueet-<iso>.json (harvennus 0,004°; linssille ehkä 0,01°).
5. **Seuraavaan pohjapolttoon:** Intian valtameren kompassiruusu (93, −17) hipoo z2:lla nimen
   INTIAN VALTAMERI alkua → siirrä (esim. 96, −12) pallo-koristeet.json:iin. Pohjapoltto = 2 h
   CI-tauko Julkaisijan kanssa, reseptin pohja ajo-20260922/aja-1.sh + aja-2.sh.
6. Curtea Veche: Bukarestin kohdekartan piste "Vanha ruhtinaanhovi" (maakartat.js ~6582) ilman
   `nosto: 'hahmotelma-curtea-veche'` -linkkiä — Sisältökirjurille (raportoitu Fablelle).
7. Kerma-reuna V5 punainen = GL-nimiön halo mittauspisteessä 8,7 E 49,6 N, ei pohjan vika —
   Pelikoodari korjaa savukkeen (kerros piilossa mittauksessa).

## Mittausskriptit (scratchpad, ei repossa — kopioi tarvittaessa)

`/private/tmp/claude-502/-Users-samireivinen-Matkakirja-opus2/bcc79c99-…/scratchpad/`:
- `kaappaa-meri.mjs` — pelin pallon kaappaus (env JUURI, KAUPUNKI, RUUTU, NAKYMAT, LUETTELO
  = paikallinen pyramidi.json, NIMIOT = nimiölaattakansio, SARJA = pallosarjakansio, GL=1
  mittarit). HUOM: kaappaukseen tarvitaan main-koodi (vanhan osoittimen worktree ei kokoa
  lepokerrosta: versiovahti).
- `taso-liikkeessa.mjs` (panorointi, laattakerroksen mittarit kesken liikkeen) ja
  `zoomi-tasot.mjs` (zoomi kehyksittäin: taso, scenessa, zoomiennakko, kaappaukset) —
  WebKit/Chromium, RUUTU=WxHxdpr.
- `webkit-zoomikatto.mjs` (zoomiraja WebKitillä), `kokoa-maailma.mjs` (tason maailmakuva
  laatoista), `nauha.mjs`/`tekstipeitto.mjs` (kehysnauhat ja tekstin peitto).

## Opit

- Laattakerroksen taso valitaan tarpeesta JA laattakatosta; katto-pudotus + hystereesi
  jätti karkean tason päälle. Mittaa aina liikkeessä (mittarit joka 60 ms), ei vain levossa.
- GL-sovitin: nimi ei saa koskaan pudota CSS2D:hen kesken zoomin; vanha rasteri skaalattuna
  on parempi kuin poissaolo.
- Koristeet, jotka pitää näkyä joka tilassa (yleiskuva + lepo), kuuluvat POHJAAN; nimiötaso
  näkyy vain lepokerroksessa (z ≥ 4) ja pallon sarja ei koskaan lue nimiötasoa.
- Retina-työpöytä lukee maailmankuvaan pyramidin z4–z5, puhelin z1–z2: koristeen koko
  laattapikseleinä (kokoPx) pitää ruutukoon vakiona.
