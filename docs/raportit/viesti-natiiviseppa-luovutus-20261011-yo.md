# Natiiviseppä: luovutus 11.10.2026 klo 19.4x (Claude-sovelluksen päivitys, BUILD 182 valmis)

Edellinen: viesti-natiiviseppa-luovutus-20261011-ilta.md (juna 182 odotti Olavinlinna-yhdistelmää).
Proto /Users/Shared/Claude/proto-3d/Matkakirja-proto (Unity 6000.7.0b4). Junaworktree /Users/Shared/Claude/wt/proto-natiiviseppa-j175
(haara natiiviseppa/juna-182 = 549bb6a89, peili natiivi-backup peili/proto/natiiviseppa/juna-182).
Kaavat: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna182/ (build182-viesti.txt, muutosloki-182.txt, pelaa-sim.sh) ja juna183/jono-183.txt.

## ENSIMMÄISEKSI (Jatka-viestin jälkeen)
1. **Unity-beetaseuranta**: CronCreate "4 9 * * *" + aja kerran `python3 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py`
   (11.10. 17.3x: ei uutta, 6000.7.0b4; tyhjä tuloste = ei uutta).
2. **Mac TF 182**: workflow https://github.com/ravelius/Matkakirja/actions/runs/38156210986 — lataus Applelle valmis 19.4x, askel
   "Build sisäiselle testiryhmälle" odotti Applen käsittelyä. Tarkista `gh run view 38156210986 --repo ravelius/Matkakirja --json conclusion`
   ja ilmoita PT:lle rivi (Mac 1.1 (182) sisäisille / VIKA). Kopio lokit/natiiviseppa-mac-tf-182 (fi.matkakirja.peli 1.1 (182), kaannos 0ac269d2).
3. **iOS TF 182**: Julkaisija (38156401738, muutosloki #4439 689ae366a); muistiajorivi lähetetty Julkaisijalle → jakelu Arvioijat + Beta-testaajat.
4. Avaa **juna 183** BUILD 182:n päälle, kun PT käskee: haara natiiviseppa/juna-183 masterista 0ac269d2d, erät jono-183.txt:stä PT:n KUITATTU-järjestyksessä.

## BUILD 182 = master 0ac269d2d (juna/b13 549bb6a89, juna.log 19.35 + MUISTIPORTTI 19.4x)
- Omistaja 18.4x (PT LUKITSE 182): Olavinlinna-yhdistelmä → 183; linnapaketti 181:n tasolla. Pelaa £20 toimii Siirtosepän f2bae0ac6:lla
  (poimittu yksin 549bb6a89; Siirtoseppä vahvisti puhtaaksi). Simutodiste lokit/todistus-olavinlinna-pelaa-182-20261011-1921 (OK; huom.
  valotunnus on `kohde:olavinlinna@FIN`, ei @FI — ensimmäinen ajo 1912 epäonnistui siksi).
- Lisätty 17.3x jälkeen: LS1 0d83ffedb (Berliinin/Ateenan sininen houkutin pois), LS1 e4050506a (Pulu-väistö), f2bae0ac6.
- Muistiajo (iPad Pro 13 Release 549bb6a89): Pariisi A 0,89 / B 0,86 Gt, Olavinlinna OK, taidemuseo 33 ×2 fp huippu 2454 Mt, vapaa min 2665 Mt,
  ei jetsameja (lokit/natiiviseppa-ketju182-1843.log, natiiviseppa-museomuisti-20261011-1923-m4-182). Tileset-virheet = Googlen 429.
- Muutosloki PT KUITATTU 19.4x (£-muoto, Olavinlinnan sykkivä merkki): juna182/muutosloki-182.txt.

## JUNA 183 -JONO (juna183/jono-183.txt)
Pelikoodari musiikki-arvonta a3ab09f73 (korvaa a5995394f, KUITATTU); LS2 google-429-vara bc4adf850 + aluskerros-stencil 589aecae0 (odottavat
simukoetta + kuittausta; NS:n huomiot: tunnus Bearer-otsakkeeseen, koetuksiin ±25 % hajonta ja 60 s lattia, ei koetusta taustalla);
luovutuksesta: Olavinlinna-yhdistelmä (38108e9ad, botti, Siirtosepän linnahaara), Pelikoodari raketti-hinta 0202b59bb, soutaja-v2 ac52e6c86,
Visa cea99d656, soutajan FACEIT 52, Olavinlinnan £25-loppukysymys.

## GOOGLE 429 (selvitys PT:lle 18.3x)
Ei omaa Google-avainta: kaikki buildit hakevat Googlen laatat Cesium ionin assetin 2275207 kautta Cesiumin Google-projektilla 584945306220;
raja "3D Tiles root requests per minute" (RATE_LIMIT_EXCEEDED) on kaikkien ion-käyttäjien yhteinen. Pysyvä korjaus = oma Google Cloud
-projekti + Map Tiles API -avain (omistajalta Cloud-tili + laskutus), natiivi lataa tile.googleapis.com:sta suoraan, ion varana (183+).
Mittausskripti scratchpadissa: ion-endpoint → root.json status (avain peitetty).

## AVOIMET
- MSAA-varoitus käynnistyksessä (kokeet D/E), linnan SSAO ilman DepthNormals-ajoja, LS2:n linnan pystyleike — ennallaan (ks. edellinen luovutus).
- Worktreet proto-natiiviseppa-hehku/-kasvot/-vahti mergetty; ÄLÄ poista ilman omistajan lupaa.

## UUSI SÄÄNTÖ 19.5x (omistaja PT:n kautta)
Junasta 183 alkaen NS päivittää Asemataulun junan etenemisen jokaisessa vaiheessa: ArtifactData url https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix,
collection "talo", doc "eteneminen" {nimi:"Juna N", tila, edistys 0–5, vaihe, valmis_arvio ISO, kirjoittaja, ts} (get → set if_version).
Vaiheet 1 lukittu + testit, 2 käännös, 3 simutodiste/muistiajo, 4 TF-lataus, 5 Applella (Julkaisija). "junat"-dokumentti on PT:n.
