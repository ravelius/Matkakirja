# Luovutus: Siirtoseppä, 26.9.2026 klo 05.2x (päivitetty 28.9. klo 00.0x, TAUKO + tilinvaihto)

Luovuttaja on Siirtoseppä (Opus). 27.9. klo 11.3x: tilinvaihto (viikko 93 %), uuden tilin sessio jatkaa illalla. Postivahti pyysi luovutusta, koska viikkokiintiöstä oli käytetty 90 % ja tilinvaihto
lähestyy. Tämä korvaa luovutuksen `-20260925.md`. Sen opit ja 24.9.-b:n kohdat "Koepaketit" ja "Opetukset" ovat yhä
voimassa.

## Lue ensin

- CLAUDE.md sekä Raamatun Ydinajatus, kohta 2 "TYÖTAPA JA SESSIOT", ja "NATIIVI PELI ETUSIJALLE" (EI WEBISSÄ → KYSY,
  WEB ON MALLI, MITATTUNA).
- docs/raportit/elava-kartta-suunnitelma-20260926.md (Elävä kartta, omistajan päätös 26.9.) ja
  docs/raportit/paketin-taustapaivitys-suunnitelma-20260925.md (taustapäivitys, hyväksytty 25.9.).

## TAUKO 28.9. klo 00.0x (omistaja 23.58 Fablen kautta)

Muut työt tauolla (vain striimiluenta julkaistaan), sitten tilinvaihto. Kaikki Siirtosepän PR:t ovat mainissa:
#3427, #3432 (1.52), #3434, #3441 (eheysvartija), #3442, #3445 (1.53+1.54), #3463, #3488 (1.55 yhdessä #3475:n kanssa),
#3496 (viennin aikaraja). Tuotanto v250 / skeema 1.55. Ei avoimia worktreitä eikä pushaamattomia muutoksia.
**Tauon jälkeen ensimmäisenä:** E2E-offline-testi (kohta 4c) Fablen luvalla ja Julkaisijan simulaattorivuorolla.

## Tila (päivitetty 27.9. klo 18.5x) — KESKEN: skeema 1.52 mediaKuvat (#3432)

1. **Euroopan eheystarkistus (Fable 27.9.) valmis:** raportti docs/raportit/siirtoseppa-eurooppa-eheys-20260927.md
   (#3434 mainissa). Löydökset lähetetty Sisältökirjurille (Nouméa, Antikythera, 23 miniatyyriä, 7 TIFFiä, Luxemburg,
   pienet kuvat); Pelikoodarille ei löydöksiä. Flickr-korjaus #3427 tuotannossa v241 (53 kuvaa ämpäristä, 200).
2. **#3432 (luonnos, worktree wt/siirtoseppa-offline-omat-urlit, head 76dc4028e):** skeema 1.52 maat.*.mediaKuvat
   [{url, pieni?}] + tavuja.mediaKuvat (ei yht:ssä), pienennetyt kuvat pieni/<avain>.jpg|png (tools/vienti/mediakuvat.mjs,
   mediakuvat.json; CI-vaihe "Pienennä ja vie mediaKuvat" vie-sisalto.yml:ssä), katto 100 Mt/maa (Fable), merentakaiset
   alueet BMU/FLK/GUF/NCL omiksi kohteiksi (Fable: VAIN EUROOPPA maantieteellinen), maaston keskitavut z7–z12 päivitetty.
   ODOTTAA Natiivisepän kuittausta (kysytty: maat-avain ilman countryShapes-muotoa, siirto- vai levykoko). Sitten
   gh pr ready → Julkaisijan juna → ensimmäinen CI-vienti tekee ~3 570 pientä → tarkista ämpäri → rivi Fablelle ja
   Natiivisepälle (todentaa lentotilassa 1.0.32).
3. Puhetta EI koskaan pyydetä workerilta (Fable 27.9.): vain ämpärissä olevat tiedostot.
4a. **#3441 eheysvartija** (wt/siirtoseppa-eheysvartija, head 38d5c43eb): tools/vienti/eheysvartija.mjs + .github/workflows/
   eheysvartija.yml (06.30 + jokaisen viennin jälkeen, self-hosted macOS) → proto-3d/lokit/eheysvartija/VIKA.txt;
   Postivahdille ohje lähetetty. Junassa.
4b. **#3445 skeemat 1.53 + 1.54** (wt/siirtoseppa-maasto-153, head bf0c2c1e2, PINOTTU #3432:n päälle): maasto z≤10 +
   kaupunkiMaasto z11–12 50 km; 1.54 mediaKuvat = natiivin koko offline-media (korvaaMedian, kuvat 1024 px/JPEG 75,
   vain puheet, katto 100 Mt/maa), tavuja.offline. Eurooppa ~1,3 Gt (tavoite ~1,2; 960/70 → ~1,1 Gt jos Fable haluaa).
   Natiiviseppä kuittasi, natiivi 1.0.32-junassa bbbfadde. Järjestys #3432 → #3445.
4b2. **#3479 skeema 1.55** (wt/siirtoseppa-salaisuudet-pois, PINOTTU #3445:n päälle): maakuntasalaisuudet pois (omistaja
   20.0x, Pelikoodarin pyyntö), skeemasopimus vanhentaa poistettujen kokoelmien ehdot. Julkaistava yhdessä web #3475:n
   kanssa. Natiiviseppä kuittasi. #3441 eheysvartija MERGETTY 20.13 ja toimii (v247: 3×404 Nouméa).
4b3. **TILA 27.9. klo 22.3x:** skeemat 1.52–1.55 TUOTANNOSSA v250 (#3496 korjasi viennin aikarajan: pienet erissä,
   ämpäriin minuutin välein, työ 60 min). 14 783 pientä kuvaa, Eurooppa offline 1 334 Mt. Fable ja Natiiviseppä tietävät.
   Fable selvittää 1.0.32:n pergamenttivikaa (pohjakartta ei piirry): lahteet.rasteri v249→v250 ennallaan, kerrottu.
   YÖTAUKO 22.30 → Karttasepän polton loppuun (ei testisarjaa, headless-ajoja eikä simulaattoria).
4c. **Seuraava (Fable 27.9.):** kun 1.52–1.54 tuotannossa ja 1.0.32 käännetty → päästä päähän offline-testi Tanska +
   Kroatia omalla simulaattorilla F989814A — SIIRTYI AAMUUN 28.9. (Julkaisija). Käännös: nohup proto-kaanna.sh
   21f09914 F989814A-4E6F-4617-8E5E-C7505E30DEF9; ajo: scratchpadin offline-e2e.sh pohja = Natiivisepän
   proto-3d/lokit/natiiviseppa-skriptit/sessio-m/offline-gzip.sh (komento.txt: alue lataa DNK / alue tila / palvelin),
   vuoro Julkaisijalta, booted < 2, sammuta jälkeen: koko ennen latausta ja
   levyllä, lentotila/debug-offline → kartta, maasto, nostokuvat, puheet. Kuvat raporttiin, löydökset rooleille.
4d. Docs-PR:t #3442 (maastoehdotus) ja #3463 (App Store -luvut) junassa. Jono App Storen jälkeen: kaupunkilehdet.json- ja
   media.json-monoliittien pilkkominen.
4. **Deltajono:** vienti ajetaan automaattisesti jokaisesta mainin pushista; tehtävä on tarkistaa tuotanto ja raportoida.
   Tuotanto nyt **1.x v250+** (1.55). #3394-delta TEHTY 27.9. klo 12.0x: v218 (saannot START_MONEY 400 ym., hintatasot raakamoduulina; natiivi lukee kovakoodattua AloitusRaha 300 → ei vaikutusta ennen 1.0.30), Pelikoodarille kerrottu. #3370 (astronautti erät 5–6) tulee seuraavaan: tarkista SATELLIITTI_KOHTEET
   (v201: 141) ja ämpäri. Uudet sisältö-PR:t: Julkaisija ilmoittaa → ämpäritarkistus + rivi Fablelle.
5. **Pelikoodarin pyyntö (27.9. klo 11.3x), #3394 (main v2314) sääntövakiot:** START_MONEY 300 → 400, STRANDED_AID
   poistui, uudet PAIVAKULU_RUOKA 8, PAIVAKULU_MAJOITUS 12, HINTATASON_KERTOIMET, RAHATTOMUUS_VUOROJA 8 ja data
   js/packs/hintatasot.js. Saannot-kokoelma: tarkista tools/vienti/lahteet.mjs m('js/rules.js', […]) ja kokoelmat.mjs
   saantoKokoelma (tuleeko uudet vakiot automaattisesti; STRANDED_AID:n poisto voi kaataa viennin) ja harkitse
   hintatasot-kokoelmaa (uusi kokoelma = skeema 1.5x + Natiivisepän kuittaus; natiivi käyttää nyt peilitaulua Peli/Talous.cs).
   Kerro Pelikoodarille, kun paketti on viety.
6. **Tehty tässä vuorossa (26.–27.9.):** v184 (maakuntapikkukuvat A), v187 (merikohdat), v189 (B-erät + löydös 178
   kartalla:false, 70 tarinakohdetta), v193 (C BLR+ROU, astro 2), v201 (maalehti-siirto, astro 3–4). Pikkukuvia 527
   aluetta 31 maassa. Natiivi 170 (sisältö vaihtuu kesken istunnon) mergetty junaan d211337c. ISS-TLE cron toimii.
   Pyramidisarjat 09-21…09-26 natiivin kannalta vapaita (ei osoittimen tasosarjoja).
7. **VAIN EUROOPPA (omistaja 27.9. klo 13.5x, Raamattu #3416):** uusi sisältö vain Eurooppaan; siirrot ja deltat ennallaan. Fable 27.9.: EI koske #3395:tä (pallo-Z10 koko maailma, 266 kaupunkia, web-pariteetti). #3405 (muutosloki-natiivi 1.0.12–1.0.29) → mergen jälkeen delta ja rivi Fablelle versiosta.
8. Kuvapareihin versio, build ja kuvakulma SUORAAN kuvaan (omistaja 27.9.).

## Voimassa olevat työtavat (tämän vuoron uudet)

- **Lisäysversio, joka kasvattaa kokoa tai kattavuutta = Natiivisepän kuittaus ennen tuotantoa** (Fable 25.9., 1.42:n
  palautus). Kysy myös, piirtääkö vanha build uudet rivit: uudet rivit olemassa olevaan kokoelmaan voivat näkyä
  vanhoissa buildeissa (1.47), joten uusi kokoelma on turvallisempi.
- **Palautus:** `gh workflow run vie-sisalto.yml --ref main -f palauta=N` ja peruutus-PR mainiin. Kun peruutus laskee
  skeemaversiota, osoitinvartija ei päästä peruutuksen vientiä läpi, joten sen jälkeen tarvitaan vielä
  `palauta=<peruutuksen versio>`.
- **Viestiraja (Fable 26.9., omistaja 24.9. "VIESTIRAJA JA VARAKANAVAT"):** kun SendMessage ilmoittaa rajan (~10/vuoro),
  käytä varakanavaa mcp__ccd_session_mgmt__send_message (session_id = vastaanottajan local_-id; Fable
  local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, muut Postivahdin tilataulussa). Omistajaa ei pyydetä kirjoittamaan, eikä tilaa
  jätetä vain PR-kommenttiin. Jos varakanavakin estyy: docs/raportit/posti-siirtoseppa-<pvm>.md, Postivahti välittää.
- **Simulaattori:** oma `siirtoseppa-iPhone` F989814A. Pyydä vuoro Julkaisijalta, käynnistä vasta kun booted < 2, ja
  sammuta ajon jälkeen. proto-kaanna.sh:n Build-kansio vaihtuu seuraavasta käännöksestä, joten tarkista heti
  (`strings …/global-metadata.dat | grep <luokka>`) ja asenna itse.
- Omistajalle kuvat PNG-pysäytyskuvina laitteen ruutuun rajattuna (Fable 26.9.).

## Ympäristö

- Koepaketit: `/Users/Shared/Claude/sisalto-koe` v49–v51 ja `sisalto-koe-2` v11–v12 (vanhat siivottu 25.9.).
- Julkaisun koeajo: `node tools/vienti/julkaise-sisalto.mjs --ulos <scratch> --edellinen <uusin.json> --suurin <N>`.
- Kartta-testit (natiivi): `Kartta-testit/kaanna.sh PakettiPaatokset`, oikea paketti `PAKETTI_KOE=<versiokansio>`.

## Velat ja opetukset

- Opetus 26.9. ilta: iPad-vuoro alkaa vasta laitteen omistajan erillisellä "vapaa"-rivillä; devicectl --terminate-existing
  katkaisee toisen ajon. Pitkät käännökset (proto-kaanna.sh) nohupilla, ei Bash-työkalun 10 min rajalla.
- Opetus 26.9. ilta: tuore asennus lukee laiskasti uusinta versiota, joten omistajan "vanha asennus" -tapaus toistetaan
  siementämällä vanha valmis versio (vanha-v157.py) — ei vanhalla buildilla.

- Opetus 26.9.: älä pushaa PR:n haaraan, kun Julkaisija on ilmoittanut ottavansa sen junaan (#3320:n head vaihtui kesken mergen). Kaksi PR:ää, jotka lisäävät saman tiedoston eri muotoilulla, konfliktoivat: data kuuluu tuottajan PR:ään.
- Opetus 26.9.: natiivi hakee Saapumistunnukset alueella, paketti antaa maanosan (vanhoissa buildeissa ita-eurooppa osuu).

0. Maakuntanimien suomennokset (Attika jne.) tulevat Sisältökirjurin #3297:stä (maakunnat-nimet.js ja
   maakuntarajat.json.gz samassa PR:ssä), eikä skeemaa muuteta. Ilmoita versio Natiivi-UI:lle, kun #3297 on tuotannossa.

1. `lisenssitarkistus.mjs` ei lue lisenssiä äänen nimestä, kun osoitteessa on `#voima=`-osa (neljä CC0-tehostetta ovat
   "tuntematon"). Korjaamatta.
2. Maakunta pisteestä: rannikon kohteet saavat lähimmän maakunnan ≤ 30 km (harvennettu raja). Strymonas-joki jää
   ilman maakuntaa.
3. Opetus: sisällön datamuutos voi lisätä kokoelmaan päätason kentän (#3162 monumentit.nimio), mikä vaatii
   skeemanoston. Aja sisältö-PR:n haarasta vienti ja sisaltopaketti-testit ennen kuin lupaat "ei skeemamuutosta".
4. Opetus: natiivin laiska välimuisti on polussa `persistentDataPath/sisalto/sisalto/1/vN` (Sisalto.Valimuisti).
