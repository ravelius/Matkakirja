# Luovutus: Siirtoseppä, 26.9.2026 klo 05.2x (päivitetty 23.0x)

Luovuttaja on Siirtoseppä (Opus). Postivahti pyysi luovutusta, koska viikkokiintiöstä oli käytetty 90 % ja tilinvaihto
lähestyy. Tämä korvaa luovutuksen `-20260925.md`. Sen opit ja 24.9.-b:n kohdat "Koepaketit" ja "Opetukset" ovat yhä
voimassa.

## Lue ensin

- CLAUDE.md sekä Raamatun Ydinajatus, kohta 2 "TYÖTAPA JA SESSIOT", ja "NATIIVI PELI ETUSIJALLE" (EI WEBISSÄ → KYSY,
  WEB ON MALLI, MITATTUNA).
- docs/raportit/elava-kartta-suunnitelma-20260926.md (Elävä kartta, omistajan päätös 26.9.) ja
  docs/raportit/paketin-taustapaivitys-suunnitelma-20260925.md (taustapäivitys, hyväksytty 25.9.).

## Tila (päivitetty 26.9. klo 23.0x)

- Tuotanto 1.x **v187** (skeema **1.50**). Tämän vuoron julkaisut (vanhemmat git-historiassa):

| Versio | PR | Sisältö |
|---|---|---|
| v162 | #3303 | natiivin offline-rasteri pohja 26 |
| v159 (1.49) | #3307 + #3309 | pikkukuva maakunnille ja maakuntasalaisuuksille |
| v167 (1.50) | #3317 | aanitaulut musiikkiaihe + musiikkiketju.maanosa |
| v169 | #3320 + #3321 | NIMETYT_LISATIEDOSTOT: kartta/lippu_lonlat.json (138 maata) |
| – | #3327, #3334 | tilannekuva.mjs 15 tiedostoa; ISS-TLE 6 h (iss-tle.yml → data/iss-tle.json) |
| v181 | #3342/#3343 | Euroopan maakuntanostokuvat (170), 174b-merkkikuvat (natiivi: NostoSaannot) |
| v184 | #3348 | maakuntapikkukuvat 251 (16 maata) |
| v187 | #3352 | kartta/merikohdat.json (Karttaseppä, 29 maata, 129 kohtaa) |

- **Natiivi, löydös 170 (sisältö vaihtuu kesken istunnon):** proto-haara `siirtoseppa/sisalto-vaihtui` 42b790c2
  (PakettiPaivitys.SisaltoVaihtui + Sisalto.VaihdaVersio) ja Natiivi-UI:n `natiivi-ui/sisalto-vaihtui` 544e0ce3 (kuuntelijat).
  Todennettu simulaattorissa (käännös 62b29c02; v157 → v186 kesken istunnon, Attikan kuva heti):
  proto-3d/lokit/siirtoseppa-paivityspolku/ (ennen/, jalkeen/, 170-ennen-jalkeen.png, skriptit scratchpadissa: polku2.sh +
  vanha-v157.py siemen). Merge 1.0.27-junaan Natiivisepän kautta.
- **Odottaa mergeä (Julkaisija ilmoittaa):** #3351 (B3-pikkukuvat MDA/UKR; #3349/#3350 jo mainissa) ja #3353 (löydös 178:
  kohdekartat.kohteet[].tyyppi + kartalla; esitarkistettu PR-haarasta: 70 tarinakohdetta, kaikki natiivin Avattava,
  skeema 1.50 ok, testit 96/0). Mergen jälkeen: ämpäritarkistus, pikkukuvien ja tarinakohteiden määrä tuotannosta, rivi Fablelle.
- **ISS-TLE:** cron toimii (ensimmäinen ajastettu ajo 21:14Z 26.9., success).
  lisää varmistus vie-sisalto.yml:n rinnalle (TLE > 6 h vanha → haku).
- Raportti docs/raportit/maakuntanostot-ilman-kuvaa-20260926.md (170, Eurooppa-osio erikseen) tässä haarassa.
- Omat worktreet: ei. Proto-worktree /Users/Shared/Claude/wt/proto-siirtoseppa-vaihto (siirtoseppa/sisalto-vaihtui) — poista mergen jälkeen.

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
