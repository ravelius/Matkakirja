# Linssisepän luovutus 17.10.2026 klo 04.42 (KOVA RAJA 34 %, Postivahti)

Edellinen: viesti-linssiseppa-luovutus-20261017-0157.md (yleisohjeet, osoitteet, testikomennot siellä).
Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Viestit AINA send_message id:llä: PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä), Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914,
Äänittäjä local_16ee69c8-b917-4dcd-9060-3542c5e03e67, Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217.
JUNA 198 LUKITAAN NOIN 05–06 (PT). Kaikki alla on käännetty; vain simut ja raportit puuttuvat.

## 1. ENSIMMÄISEKSI: KAKSI SIMUA PERÄKKÄIN (Julkaisijan SIMU NYT ~04.50, yksi ajo kerrallaan)
Odottajat käynnissä (`pgrep -fl 'ajo-vapaalento198|ajo-kiinavalmis2'`, pid:t 80256 ja 6844 klo 04.42).
1. Kun Julkaisija lähettää SIMU NYT: `touch /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/simu-vapaalento198.nyt`
   → iPhone BD64C8E4, ~15 min, loki ajo-vapaalento198.log ("SIMU ALAS").
2. Heti perään (sama vuoro, JU:n mukaan peräkkäin): `touch …/linssiseppa-ajot/simu-kiinavalmis2.nyt` → iPad 00CF62C2, ~22 min,
   loki ajo-kiinavalmis2.log. Kun molemmat "SIMU ALAS": SIMU VAPAA Julkaisijalle HETI.
3. Tarkista lokit/todistus-vapaalento198-iphone-*/ ja todistus-kiinavalmis2-ipad-*/ (tulokset.tsv: ei PUUTE/VIRHE, poikkeukset 0).

### Vapaalento 198 (haara linssiseppa/vapaalento-197 c59d63e01, käännös 9550f6de; worktree wt/proto-linssiseppa-vapaalento)
- PT 02.5x: "Palaa kierrokselle" kompassin ohi → 2bb2c9f62 (PalloKori.KompassiNorm + OpasValikko.AsetaJatkaPaikka).
  Skenaario sk-vapaalento-198-iphone.txt mittaa `ui opasvalikko metro auto` → "kompassi … jatka @ …" (V1 ja V5): nappi ei saa
  osua kompassin alueeseen. Tarkista kuvista V1–V5, ettei kompassi peitä nappia.
- Valovahti (proton master): PT kuittasi 03.5x: lamppu Valopohjaan (ValoKohteet.KompassiLamppu*, Valopohja.KompassiLamppu*),
  jalusta/jalka/kosketusvarjo `// valopoikkeus` → c59d63e01. master yhdistetty haaraan (6d4c037d9). VS:lle kerrottu.
- Ylivalottuneet talot = testiajon ionin varadata, ei korjattu; kohdelistan taustaa ei lisätty (omistaja 7.10. "ei taustaa") — PT:lle kerrottu.
- Kuvat → _valmiit/vapaalento-20261017/ (v2-alikansio tai -198-pääte) → PT (3 riviä) → KK → NS junaan 198.

### Kiina valmis 198 kierros 2 (haara linssiseppa/kiina-valmis-198 d683c91f9, käännös bdab00883; worktree wt/proto-linssiseppa-kiinavalmis)
- 939a00898: taistelualueet katkoviivana (KS 8e856aa88, Punainen kallio 12 km, Fei-joki 15 km), kuva S8-400.
- 20604d573: KERTOJA (Äänittäjän kiina-kertoja-v1, 30 äänitettä): KiinaKertojaJono (Ydin) + KiinaKertoja (Puhe.Soita-jono) +
  luentaSoi pidättää pysäkkiä; selaus pysäyttää; QA `linssi kiina kertoja`. Keksintövuodet (oma valinta, PT:lle kerrottu):
  paperi 105, ruuti 808, kirjapaino 1041, kompassi 1088. Testit 12/12.
- d683c91f9: Ranskan kohdat.json (2578a6d71, SK:n tarkistama 1d887bdfd #4768, luonnos false) yhdistetty.
- Skenaario sk-kiina-valmis-ipad.txt: S0–S8 + kertoja: oleta "kertoja 30 äänitettä", ajo 1142 → 1280, äänikaappaus
  aani/kiina-kertoja-1280.wav (50 s), oleta "soi (rivi-14|marco-polo|yamen-1279)", kuva S9.
- Kuvat + wav → _valmiit/kiina-valmis-20261017/ → PT (polku + ääninäyte) → KK. Tarkista: musterintama S1/S2, sinetti S3/S6,
  nuolet/kerrokset S6, käärö S0, alueet S8, kertoja S9 + wav kuuluu (ei hiljaisuutta).
- Jos kertoja ei soi: kertojakytkin (Puhe.Soita palauttaa false, kun luennat pois) tai manifest (lokissa "kiinan dynastiat: kertoja N äänitettä").

## 2. MUUT
- Tuotantopohja "uusi linssi": luonnos-PR ravelius/Matkakirja#4771 (oma b35a5c585; SK/ÄÄ/KS-osuudet 9f44d6015; worktree
  /Users/Shared/Claude/wt/linssiseppa-tuotantopohja-linssi, vedetty). Täydennä opit Kiinan ajon jälkeen (luku 8). Docs-PR ei aja CI:tä.
- Louvren pariteetti linssiseppa/louvre-pariteetti fc6024f6a (rebasettu vapaalento-197:n 2bb2c9f62:n päälle + hyväksytty
  kohdat.json, sama tiedosto kuin 2578a6d71). Ei junaan ilman PT:n kuittausta; simu sk-louvre-pariteetti-iphone.txt myöhemmin.
  Huom: vapaalento-197 on sittemmin c59d63e01 (master yhdistetty) → `git rebase linssiseppa/vapaalento-197` ennen käännöstä.
- Vapaalennon 1. simu (6661e487) OK, kuvat _valmiit/vapaalento-20261017/. Avoimet havainnot: yökuvan kompassi tumma, vasen
  ohjainympyrä peittää osan kompassin lasikuvusta (ei pyydetty korjaamaan), museon otsikko "RIJKSMUSEU / M" (NUI).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261017-0442.md).
Ensin: `pgrep -fl 'ajo-vapaalento198|ajo-kiinavalmis2'` → kohta 1 (Julkaisijan SIMU NYT → touch vapaalento, sitten kiina).
