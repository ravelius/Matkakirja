# Luovutus: Siirtoseppä, 26.9.2026 klo 05.2x (päivitetty 27.9. klo 11.4x)

Luovuttaja on Siirtoseppä (Opus). Postivahti pyysi luovutusta, koska viikkokiintiöstä oli käytetty 90 % ja tilinvaihto
lähestyy. Tämä korvaa luovutuksen `-20260925.md`. Sen opit ja 24.9.-b:n kohdat "Koepaketit" ja "Opetukset" ovat yhä
voimassa.

## Lue ensin

- CLAUDE.md sekä Raamatun Ydinajatus, kohta 2 "TYÖTAPA JA SESSIOT", ja "NATIIVI PELI ETUSIJALLE" (EI WEBISSÄ → KYSY,
  WEB ON MALLI, MITATTUNA).
- docs/raportit/elava-kartta-suunnitelma-20260926.md (Elävä kartta, omistajan päätös 26.9.) ja
  docs/raportit/paketin-taustapaivitys-suunnitelma-20260925.md (taustapäivitys, hyväksytty 25.9.).

## Tila (päivitetty 27.9. klo 11.4x) — KESKEN: natiivin pallo-Z10

1. **Z10-poltto (Karttaseppä):** alkaa klo 22.00, valmis arviolta 23–24. Sarja on sama
   julisteet/pallo/laatat/2026-09-26-pohja-20260926 (+ /10/), 13 856 laattaa (266 kaupunkia ±1°, vain z9:n päällä),
   laatat.json ennallaan. Lista: /Users/Shared/Claude/pyramidi-poltto/pallo-z10-20260927/pallo-z10.json.
2. **Ämpärivienti odottaa OMISTAJAN omaa hyväksyntää Karttasepän sessiossa** (omistajan päätös 11.1x: ei kiertoteitä,
   ei Julkaisijan ajoa). Siirtoseppä ei kirjoita ämpäriin.
3. **offline.json valmiina: PR #3395 (LUONNOS), haara siirtoseppa-pallo-z10, worktree wt/siirtoseppa-pallo-z10.**
   tools/vienti/pallo-z10.json (Karttasepän lista) → maxzoom 10, kaupunkitaso.tasot [9, 10], kaupunkitaso.z10;
   maan rasteri["10"] = rivijuoksut; 13 829/13 856 (Jerusalem 27 pois, ei maata; Karttaseppä kuittasi). Skeema 1.51,
   testit 100/0. **Kun laatat ovat ämpärissä:** (a) Karttaseppä kertoo, eroaako poltettu määrä listasta → päivitä lista;
   (b) pistokoe: jokainen offline-välin laatta 200 (curl-agentti; Pythonin urllib saa Cloudflarelta 403!);
   (c) koot: keskitavut[10] nyt z8:n arvolla → mittaa (offline-koot.json); (d) Natiivisepän kuittaus (pyydetty 11.3x:
   Alueet lukee rasteri["10"]-listan? Laattapalvelin maxzoomista vai kiinteä 9? koko ~0,4 Gt / maa ≤ ~30 Mt);
   (e) yhdistä main, gh pr ready, Julkaisijan junaan, ämpäritarkistus, rivi Fablelle.
4. **Deltajono:** vienti ajetaan automaattisesti jokaisesta mainin pushista; tehtävä on tarkistaa tuotanto ja raportoida.
   Tuotanto nyt **1.x v201+** (1.50). #3370 (astronautti erät 5–6) tulee seuraavaan: tarkista SATELLIITTI_KOHTEET
   (v201: 141) ja ämpäri. Uudet sisältö-PR:t: Julkaisija ilmoittaa → ämpäritarkistus + rivi Fablelle.
5. **Tehty tässä vuorossa (26.–27.9.):** v184 (maakuntapikkukuvat A), v187 (merikohdat), v189 (B-erät + löydös 178
   kartalla:false, 70 tarinakohdetta), v193 (C BLR+ROU, astro 2), v201 (maalehti-siirto, astro 3–4). Pikkukuvia 527
   aluetta 31 maassa. Natiivi 170 (sisältö vaihtuu kesken istunnon) mergetty junaan d211337c. ISS-TLE cron toimii.
   Pyramidisarjat 09-21…09-26 natiivin kannalta vapaita (ei osoittimen tasosarjoja).
6. Kuvapareihin versio, build ja kuvakulma SUORAAN kuvaan (omistaja 27.9.).

## Voimassa olevat työtavat (tämän vuoron uudet)

- **Lisäysversio, joka kasvattaa kokoa tai kattavuutta = Natiivisepän kuittaus ennen tuotantoa** (Fable 25.9., 1.42:n
  palautus). Kysy myös, piirtääkö vanha build uudet rivit: uudet rivit olemassa olevaan kokoelmaan voivat näkyä
  vanhoissa buildeissa (1.47), joten uusi kokoelma on turvallisempi.
- **Palautus:** `gh workflow run vie-sisalto.yml --ref main -f palauta=N` ja peruutus-PR mainiin. Kun peruutus laskee
  skeemaversiota, osoitinvartija ei päästä peruutuksen vientiä läpi, joten sen jälkeen tarvitaan vielä
  `palauta=<peruutuksen versio>`.
- **Viestiraja (Fable 26.9., omistaja 24.9. "VIESTIRAJA JA VARAKANAVAT"):** kun SendMessage ilmoittaa rajan (~10/vuoro),
  käytä varakanavaa mcp__ccd_session_mgmt__send_message (session_id = vastaanottajan local_-id; Fable
  local_5df52e10-10e4-4b72-9554-0049db300dfe, muut Postivahdin tilataulussa). Omistajaa ei pyydetä kirjoittamaan, eikä tilaa
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
