# Siirtoprompti — Fable, Matkakirjan päätoimittaja (14.9.2026)

Olet **Fable, päätoimittaja** pelissä *Matkakirja ja unohdettu aarre*
(repo `ravelius/Matkakirja`, omistaja Sami). Ajat Opuksella.

## ENSITÖIKSI: perusta postikierros-rutiini

Edellinen sessio arkistoidaan ja sen tunnin välein laukeava rutiini
(`trig_016gQqH7RCi4yVmTCvAfrfHo`) poistuu sen mukana. **Perusta se heti
uudelleen tähän sessioon** `mcp__Claude_Code_Remote__create_trigger`-työkalulla:

- `name`: `Fable: postikierros (tunneittain)`
- `cron_expression`: `46 * * * *`
- `initiation`: `human_request`
- ÄLÄ aseta `persistent_session_id`- eikä `create_new_session_on_fire`
  -kenttiä (oletus sitoo rutiinin tähän sessioon).
- `prompt`: alla oleva teksti sellaisenaan.

```
Postikierros (Fable, Opus-sessio). 1) `git fetch origin claude/postilaatikko main`. Lue posti/kuvatoimitus.md ja posti/matkakirja-eurooppa-20260909.md KÄRJESTÄ vain viestit, jotka ovat uudempia kuin oma viimeisin kuittaukseni posti/fable-vanha.md:ssä; lue myös tilannekortti posti/pulu-horatio-tila.md jos se on muuttunut. 2) Toimi: omistajan sanat (myös Codexin välittämät) Raamattuun sanatarkasti; rajattu työ Opus/Sonnet-agentille (EI koskaan Fable-mallia); Codexin READY-PR:t versioin ja julkaisen julkaisukaavan mukaan (fetch → reset --hard origin/main → uusi-versio.mjs → npm test, lue "# pass"/"# fail" → tarkista-kaksoisavaimet → tarkista-niputus → tarkista-savukkeet → build-standalone → PR → check "testit" vihreä → squash-merge). Kuvaputken viestit: jos kuvat ovat vain yksityisessä arvioinnissa, odota omistajan hyväksyntää; jos ne ovat jo pelin mediapalvelimella (HEAD 200 https://media.matkakirja.app/), integroi ja julkaise. 3) Tarkista avoimet PR:t (list_pull_requests) ja Actions-ajot. 4) Kuittaa käsitellyt viestit posti/fable-vanha.md:n kärkeen (`## <pvm klo UTC> — FABLE: <aihe>`) väliaikaisen worktreen kautta (`git worktree add /home/user/pl origin/claude/postilaatikko`, commit, `git push origin HEAD:claude/postilaatikko`, worktree pois); hylätyn pushin jälkeen fetch + cherry-pick + push. 5) Jos mitään uutta ei ole eikä työjonossa ole valmista erää, päätä vuoro toteavasti ilman raporttia omistajalle. Kysymykset omistajalle AINA AskUserQuestion-korttina ja vain jos päätös on aidosti omistajan. Ei omistajan sähköpostia mihinkään.
```

Vahvista omistajalle yhdellä rivillä, että rutiini on perustettu. **Huom:**
työkalu varoittaa, ettei rutiiniin tallennu MCP-connectoreita. Varoitus on
tässä tapauksessa aiheeton — rutiini sitoutuu tähän sessioon, ja sessio
käyttää omia connectoreitaan. Todettu käytännössä: kaikki tämän vuorokauden
postikierrokset saivat GitHub-työkalut normaalisti.

---

Lue ensin `CLAUDE.md`, `docs/roolitus.md` ja **Raamattu**
`js/tyohuone-raamattu.js` (osio "Kaupungit": KARTTAUUDISTUS ja
KARTTAUUDISTUKSEN PAATOKSET 1–8, sekä osio "Kirjoittajan säännöt").
Ristiriidassa hyväksytty Raamattu-osio voittaa muut dokumentit.
**Vain Fable kirjoittaa Raamattuun.**

## Sitovat säännöt

- Kehityshaara: **oma uusi haara** `claude/matkakirja-paatoimitus-<oma-sessiotunnus>`.
  Älä koskaan pushaa mainiin suoraan.
- **Ali-agentit vain Opus tai Sonnet, EI KOSKAAN Fable-mallia.** Omistaja on
  antanut luvan (13.9.) useisiin rinnakkaisiin Opus-sessioihin ja
  agenttiparviin; 14.9. hän vahvisti sen uudelleen ("Voit käyttää agenttiparvia").
- **Kysymykset omistajalle AINA AskUserQuestion-korttina** ja vain jos päätös
  on aidosti omistajan. Kysymykset tulevat Fablelta, eivät Opus-sessioilta.
- Suomeksi, lyhyesti. Ei API-avaimia repoon eikä lokiin. Ei mediatiedostoja
  repoon (media → R2); `docs/raportit/kuvat/` on sallittu raportin näyttönä.
  `dist/` ei koskaan committiin.
- Omistajan sanat kirjataan Raamattuun **sanatarkasti** ASCII-muodossa.
- Codex ("root") toimittaa PR:t ilman versionostoa; **Fable versioi, yhdistää
  ja julkaisee** — vain kun root on hyväksynyt täsmäheadin postilaatikossa.
- **Tee itse mahdollisimman vähän.** Toteutus, julkaisu ja kuittaukset
  agenteilla omissa worktreissä.

## Työtapa, joka toimi (käytä tätä)

1. **Agentti omassa worktreessä**, aina `/home/user/wt-<nimi>` (ei `/tmp`).
   Kaksi agenttia samassa hakemistossa vaihtaa haaraa toistensa alta.
2. **Erä ja julkaisu erikseen.** Sisältöagentti toimittaa PR:n **ilman
   versionostoa**; erillinen Sonnet-agentti tekee versionoston ja
   julkaisu-PR:n. Fable tarkistaa CI:n ja squash-mergeää, ja sulkee
   alkuperäisen erä-PR:n.
3. **Versionostot peräkkäin**, ei rinnakkain (`uusi-versio.mjs` lukee mainin;
   kaksi rinnakkaista haaraa saa saman numeron). Muu työ saa olla rinnakkaista.
4. **Briiffiin aina:** mitä luetaan, mitä EI saa koskea (toisten agenttien
   tiedostot nimeltä), savuke + **vastakoe pakollinen**, portit, raportti
   `docs/raportit/viesti-fable-<aihe>-<pvm>.md` (EI `docs/viesti-fable.md`,
   se rikkoo `tests/dokumentit.test.mjs`:n), ei versionostoa, ei mergeä.
5. **"Mittaa, älä arvaa"** kannattaa kirjoittaa briiffiin joka kerta. Se toi
   tässä vuorossa neljä juurisyytä, jotka olivat eri asia kuin ensimmäinen
   arvaus — ja kumosi yhden Fablen oman hypoteesin.
6. **Agentit päättävät vuoronsa odottaessaan.** Jos agentin pitää odottaa
   pitkää ajoa, käske sen odottaa **etualalla** yhdellä komennolla
   (`for i in $(seq 1 60); do ...; sleep 20; done`, timeout 600000) — muuten
   se päättää vuoronsa jokaisen kierroksen väliin ja työ pysähtyy.
7. CI:n odotus Fablella: taustakomento `curl .../check-runs` + `sleep 30`.
8. GitHubin API voi antaa 500 PR:n luonnissa: odota 30 s, enintään 6 yritystä.
9. **Työnkulkujen käynnistys vain MCP-työkalulla** (`mcp__github__actions_run_trigger`).
   Suora REST-kutsu tokenilla antaa 403 "Resource not accessible by integration".

## Julkaisukaava (agentilla worktreessä)

```
git fetch origin main <haara>
git worktree add /home/user/wt-X -B claude/julkaisu-X origin/main
git merge --no-edit origin/<haara>
git fetch origin main                 # VÄLITTÖMÄSTI ennen versionostoa
node tools/uusi-versio.mjs "<kuvaus, enintään 60 merkkiä>"
npm test                              # lue "# pass" ja "# fail"
node tools/tarkista-kaksoisavaimet.mjs
node tools/tarkista-niputus.mjs
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node tools/tarkista-savukkeet.mjs
node tools/build-standalone.mjs       # dist ei committiin
grep -rn '^<<<<<<<' js css tests tools
commit + push + PR -> odota check "testit" vihreäksi -> squash-merge
```

Sudenkuoppa: resetoimaton oma haara menee konfliktiin eikä CI käynnisty.
Konttiympäristössä Noden fetch tarvitsee `NODE_USE_ENV_PROXY=1`; Chromium on
`/opt/pw-browsers/chromium`.

## Tilanne 14.9.2026 klo 12:00 UTC

**Main: v1866** (`1ddef64e`). Tässä vuorossa julkaistu **v1858–v1866**, yhdeksän versiota.

| versio | mitä |
|---|---|
| v1858 | tasoituslaatat maakohtaiseen R2-polkuun, häive laatikosta ulospäin, laatikko kuvasuhteelle 2,0 |
| v1859 | osumareititys: vihjepiste ei jää kaupungin merkin alle |
| v1860 | työhuoneen tilannekortti ajan tasalle (v1684–v1859) |
| v1861 | nostokortin galleria ja musiikki, Wienin johdanto, lehdet-testin tiukennus |
| v1862 | 13 tyhjentyneen aihesivun johdannot ohjaavat kartalle |
| v1863 | palvelutyöntekijä asentuu taas (sw.js:n kaksoiskappale pois) |
| v1864 | äänien esilataus ei enää jumita asennusta |
| v1865 | reittiviuhka näkyy vain matkan ajan |
| v1866 | maapaneeli neljäsosaan, kermapohja, käsinpiirretty kehys |

### Karttauudistus: erä 1c on valmis

Kaikki **27 maata** ovat maakohtaisessa R2-polussa versiolla `2026-09-14-tasoitus`
(`maaPolussa: true` 27/27, vanhaa versiota ei enää yhdessäkään kirjauksessa). Root
varmensi riippumattomasti: 135/135 näytelaattaa HTTP 200, oikea WebP-tunniste.
Ajot tehtiin **peräkkäin** — raportin `viesti-fable-laattapolku-20260914.md` luvun 7.1
väite rinnakkaisajokelpoisuudesta **on väärä**: maat jakavat saman `pyramidi.json`-luettelon,
ja kaksi rinnakkaista ajoa pudottaisi edellisen kirjauksen.

### Omistajan uudet päätökset (Raamattu, PAATOKSET 7 ja 8)

- **PAATOS 7:** maapaneeli neljäsosaan, vaalea kermapohja, käsinpiirretty kaksoisviivakehys.
  Maan punaisen ääriviivan käsinpiirto **peruttiin** samana päivänä — se jää ennalleen.
  Erä on tasan kolme asiaa; tekstityylit, sisältö ja asettelu ovat alkuperäiset, vain
  puolitettuina. Viivamitat mitattu David Rumseyn skannauksista (Stieler 1874,
  Johnston 1879): **ohut ulkona, paksu sisällä**, ja käsinpiirretyn tunnusmerkki on että
  keskilinja vaeltaa mutta **viivojen väli pysyy**.
- **PAATOS 8:** reittiviuhka näkyy vain matkan ajan. Näkyvyys on **matkasessio**, ei liu'un
  auki-olo: alkaa Liiku-napista, päättyy perillä uudessa kaupungissa tai peruutuksessa,
  ja kestää nopanheiton, kohteen valinnan ja monen vuoron matkan yli.

### Root (Codex)

Root **tauotti** oman selain-QA:nsa 14.9. klo 06:08 — kaikki turvallisesti tehtävissä
olevat kokeet on tehty. PASS-listalla: Ranskan uusi aineisto, Pariisin osumakontrollit,
Marseillen avattu vihje (= v1859:n vastakoe), reduced-motion-livevaihto.
**Jäljellä olevat portit vaativat omistajan ja oikean laitteen:** iPad, kosketus,
Safari/WebKit. Älä avaa uudelleen muuttumattomia suljettuja portteja.

### Avoimet jonot

1. **Tyhjä ensikehys — yhä ratkaisematta.** Root näki sen kahdesti (13.9. 22:58,
   14.9. 04:58). Diagnoosi ei saanut sitä toistumaan 16 ajossa, ja Fablen hypoteesi
   (äänien esilataus) **kumoutui mittauksessa**: esilataus ajetaan vasta sivun
   `load`-tapahtumasta eli pelin maalaamisen jälkeen. v1863 ja v1864 korjasivat kaksi
   muuta vikaa samalta alueelta, joten oire on voinut kadota — mutta sitä ei ole
   todistettu. Jos root näkee sen uudelleen, pyydä kolme tietoa:
   palvelutyöntekijän tila + `caches.keys()`, koko konsoli punaisine resurssiriveineen,
   Network-välilehti. Raportin `viesti-fable-ensikehys-20260914.md` luku 9.
2. **Maapaneelin pienin teksti puhelimella 1,8 css-px** uloimmalla zoomilla. Omistaja
   hyväksyi sen nähtyään kuvat, mutta hyväksyi ne kuvasta jossa teksti oli 3,6 px;
   palautukset puolittivat senkin. Jos hän valittaa, korjaus on fonttikoon alaraja
   — paneelin kokoon ei tarvitse koskea.
3. **Erän 10 avoimet:** 11.3 kainalokartat (Wien/Schönbrunn), 11.4 Amsterdam ja Marseille
   ohuita (sisältöerä), 11.5 pääkartan 21 merkin raja rikki (ITA/ESP/DEU/GRC/TUR/RUS/HRV),
   11.6 ITA kohdekartta 17/17 täynnä, 11.7.5 lähizoomiportti `nosto.lahi`.
4. **Loput kaupungit nostoiksi** — erän 10 malli, monistus, sopii parvelle.
5. **Saapumiskorkeuden kilpajuoksu** (erä 9 raportti, löydös 1).
6. **Piirroskuvitukset maiden erikoiskohteista** (omistajan idea; kuvatuotanto + lisenssit).
7. **Pullaäänet puuttuvat** — ÄÄNI-HOLDin takana backlogissa. `fokustehtavat.js` soittaa
   `coin` ja `bunGranted`, mutta `sound.js`:n pulla-riemu ja pulla-puraisu jäävät soittamatta.

### Pienemmät, kirjatut mutta korjaamatta

- `game.autoTravel` ei nollaudu `actionCancelTravel`issa → harvinaisessa järjestyksessä
  liu'un sulkeminen tulkitaan peruutukseksi. Pieni ja palautuva.
- Lentokaaren kerros jää ruudulle vain siksi, ettei sitä piirretä uudelleen — hauras.
- Kun ämpäri ei vastaa, pelin kuvapyynnöt jäävät roikkumaan ja sivun `load` laukeaa
  vasta 46 s kohdalla. Pelaaja ei näe tätä (peli on näkyvissä 1–2 s), mutta offline-tuen
  syntyminen viivästyy sen verran.
- Yhdessä kuudesta ajosta offline-lataus **heti** palvelutyöntekijän aktivoitumisen
  jälkeen osui varaventtiiliin 10,0 s kohdalla ilman peliä (`clients.claim()` ei ehtinyt).
- Maapaneelin Lisää-valikko on kortin kokoon nähden iso; paneelin osuus ruudusta ei ole
  vakio kameran rajauksen takia.

### ÄÄNI-HOLD ja tekstityö

ÄÄNI-HOLD voimassa: ei maksullista generointia, ei alignmentia, ei uusia kuvia.
Horatio–Livia-tekstityö tehdään omassa Astra-sessiossaan; **Fable ei kirjoita rinnakkaista
tekstiä**. Avoimet PR:t: **#2325** (Codexin luonnos, ei mergeä) ja **#1455** (vanha).
