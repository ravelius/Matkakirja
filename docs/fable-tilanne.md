# Fablen tilannekuva — jatka tästä /clearin jälkeen

*Kirjoitettu 9.8.2026. Tämä on Fable-session (koordinaattori)
käsittelykuva, jotta työ jatkuu kontekstin nollauksen yli. Lue tämä
ENSIN, sitten `CLAUDE.md`, `docs/roolitus.md`, `docs/isoisan-raamattu.md`
ja `js/tyohuone-tilanne.js`.*

## Kuka olen ja miten tiimi toimii

- **Fable = koordinaattori** (tarina + lehdet + koodi + julkaisut). Malli
  `claude-fable-5`. Omistaja (Sami) ohjaa kaiken Fablen kautta.
- **Malli-sääntö (sitova):** jos huomaan pudonneeni toiseen malliin
  (esim. Opus 4.8), PYSÄHDYN heti, ilmoitan selkeästi enkä jatka —
  pyydän omistajaa vaihtamaan takaisin Fableen. Malli-identiteetti:
  vastauksissa `claude-fable-5`; EI koskaan commiteihin, PR:iin tai
  koodiin.
- **Miksi malli putoaa Opukseen:** tietoturvaluokitin reagoi
  cyber-security-epäilyyn. Todennäköinen laukaisin oli tv-kanavien
  selvitys (agentit väärensivät Origin-otsakkeita, kaivoivat tunnuksia,
  yrittivät napata tekijänoikeussuojattuja videovirtoja). **TV-projekti
  on suljettu — älä käynnistä sen tyyppisiä hakuja uudelleen.**
- **Tiimi (raportoivat vain Fablelle triggereillä; persistent_session_id):**
  - Opus 1 (lehdet/rakenne): `session_01AEN2as7TAggi2SX3w3DqWV`
  - Opus 2 (kartat): `session_017kajFQA5rFWByGvVLXc9Df`
  - Sonnet 1 (QA): `session_01MAirFte9MpE1HnVRpCj2Mb`
  - Sonnet 2 (nähtävyysjutut): `session_01RQtKAgCVRDZzMGRKYJLoWS`
  - Fable-session: `session_01R1jVv12E56gbU5qtH5xGaG`
- Triggerit: `create_trigger` + persistent_session_id + `run_once_at`
  ~5 min tulevaisuuteen. HUOM: tiimin pitkäikäiset kontit ovat vanhempia
  kuin `.claude/settings.json`, joten Create Trigger -lupakysely toistuu
  heille kunnes kontit kierrätetään ("Approve once" siihen asti).

## Julkaisumekaniikka (TÄRKEÄ — törmäyksiä tulee jatkuvasti)

- Main on nyt **v429** (`matkakirja-2026-08-09.429`). Versiot ovat
  `2026-08-09.NNN`.
- Opus 2 julkaisee karttoja tiheään → versionumerotörmäykset ovat
  sääntö, eivät poikkeus. `git fetch origin main` **juuri ennen**
  numeron valintaa. Jos oma haara on vanhentunut: tallenna omat
  lähdemuutokset patchina, `git checkout -B <haara> origin/main`,
  `git apply`, nosta numero, buildaa, committaa, `push --force-with-lease`,
  PR, merge, `git checkout -B <haara> origin/main` uudelleen.
- Julkaisukaava: bumpaa `sw.js` CACHE + `js/main.js` APP_VERSION + lisää
  rivi `js/muutokset.js` (uusin ensin, ≤~60 merkkiä). Aja
  `node --test tests/*.test.mjs`, `node tools/tarkista-kaksoisavaimet.mjs`,
  `node tools/build-standalone.mjs`. PR → squash-merge "(vNNN) (#PR)".
- **Työhuone- ja docs-muutokset EIVÄT nosta versiota** (network-first),
  mutta ne pitää silti mergeä mainiin näkyäkseen.
- Oma työhaara: `claude/valtion-analyysi-lehtisivu-e5s1lw`.
- Attribuutio joka GitHub-postaukseen: footer; committeihin
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` +
  `Claude-Session: https://claude.ai/code/session_01R1jVv12E56gbU5qtH5xGaG`.

## AVOIN JUURI NYT (odottaa omistajan lupaa)

- **Helsinki live-ajo (PR #604, Sonnet 2).** Helsingin nähtävyysjutut
  (7 kohdetta) ovat valmiit ja tarkistetut MUTTA PR on yhä v427 ja
  törmää (Opus 2 vei 427/428, Fable 429). Pitää nostaa **v430**,
  rebasata mainiin ja mergeä. Omistaja pyysi pysähtymään; odottaa
  luvan "aja Helsinki liveen". VASTA mergen ja live-varmistuksen jälkeen
  lähetä omistajalle "Helsinki valmis" -viesti (hänen seisova
  pyyntönsä). Sonnet 2 voi varmistaa live-tilan.
- Omistaja sanoi viimeksi **"Pysähdy"** — älä käynnistä triggereitä,
  julkaise tai mergeä ilman uutta lupaa.

## Lukitut suunnat

- **Tarina:** yksi kertojaääni (Viisas Kertoja `Sz0tRTEpybtDJ9ru2kgD`,
  eleven_v3, stability 0.5). Isoisä = **Horatio Fogg** (mittaa kaiken,
  barometri, tähtäinristi, rakastaa arvoituksia, kirjoittaa "sinulle
  joka tätä luet"). Kilpailija Ezekiel Grimshaw / tummansininen
  sateenvarjo — **ei koskaan vaarallinen**; "askeleet sumussa kyllä,
  vaara ei". Koukut osoittavat suuntaan, ei nimettyyn kaupunkiin. Vain
  Fable kirjoittaa `docs/tarina.md`, `docs/isoisan-raamattu.md`,
  `js/packs/europe-kaari.js`, `js/packs/europe-saapumiset.js`.
- **Media-periaate:** kuvat/media vain PD/CC, tarkistettuna Commonsista.
  API-avaimia ei repoon eikä lokiin (ELEVEN_API_KEY vain ympäristöstä;
  maskaa ulostulot `sed 's/sk_[a-f0-9]*/sk_***/g'`).
- **Playwright:** executablePath `/opt/pw-browsers/chromium`,
  `args:['--no-proxy-server']`, `serviceWorkers:'block'`, storageState
  scratchpadin `pelitila.json`, serveri
  `(setsid nohup python3 -m http.server 8765 …)`. `window.matkakirja.ui`
  on peli-instanssi (ei `window.ui`).

## KESKEN / SEURAAVAT ISOT (omistajan uusin ohjaus)

1. **Pulmien laatuloikka (omistajan tilaus).** Nykyiset piirretyt
   pulmakuvat "liian kökköjä" — vaihda OIKEISIIN Commons-valokuviin tai
   hybridiin. Pulmat pohjaa **kulttuuriin ja tietoon**, EI laskemiseen
   (vähän hoksaamista sallitaan). Päätehtävät (visa/pulma) mahd.
   vaihtelevia, generoitavissa hieman eri joka kerta. Ateenan
   pylväspulma tehdään pilotiksi. **Pylväskuvat jo haettu ja tarkistettu
   Commonsista** (kaikki PD/CC, >800px):
   - doorilainen: `File:Chapiteau-Parthenon.jpg` (CC-BY-SA-3.0)
   - joonialainen: `File:Delphi - Ionisches Kapitell.jpg` (CC-BY-SA-3.0)
   - korinttilainen: `File:Corinthian capital, AM of Epidauros, 202545.jpg`
     (CC-BY-SA-4.0) tai `File:Roman - Corinthian Capital - Walters 23188.jpg` (PD)
   - hämäys/komposiitti: `File:ArcoTitoCapComp.jpg` (CC-BY-SA-4.0)
   - Nyk. pulmat: Afrikka 5 + Eurooppa 6 (`js/packs/*-puzzles.js`).
     Uudet ideat (kulttuuri+tieto): Sagrada Famílian taikaneliö
     (Barcelona), kadun kerrokset (Edinburgh), Orloj (Praha), Vasan
     tasapaino (Tukholma), kanaalirinkien ikä (Amsterdam), maailmankello
     (Berliini). Avoin: kertaluontoinen vai toistuva; vaikeustaso.
2. **Isoisä-kaupungit (5) työhuoneessa, ODOTTAA KUUNTELUA.** Praha,
   Istanbul, Wien, Venetsia, Budapest — isoisä äänessä saapumisessa
   (jännittävä/pelottava), cliffhanger myös visassa ja aarteessa. 15
   generoitua mp3:a (`assets/audio/puhe-kaari-*.mp3`), data
   `KAARI_KAUPUNGIT` (`js/tyohuone-kehitys-data.js`), generointi
   `tools/generoi-kaari.mjs`. Työhuone → Kehitys → "Isoisä äänessä — 5
   uutta" → ▶ Soita kaikki peräkkäin. EI VIELÄ PELISSÄ — omistaja
   kuuntelee autossa, sitten viedään peliin jos sävy kestää. Sama
   listen-first-malli kuin pilotti v419 (Edinburgh/Pariisi/Ateena/Pietari).
3. **Tunnelmavideot (parkissa).** Commonsista löytyi 20/21 maalle
   vapaa lyhyt tunnelma-/kielivideo (kevyet ~5–15 MB kelpaa; raskaat
   100–257 MB korvattava). Ei toteutettu. Tämä on turvallinen,
   policy-mukainen tapa "tuoda maan tunnelmaa" — toisin kuin tv-scraping.

## Tiimin tila (ks. myös js/tyohuone-tilanne.js)

- **Opus 1:** vaihe B (lehtitasapaino, `docs/lehtitasapaino.md`) käynnissä.
  Päätökset annettu: Helsinki/Suomi ensin; Madrid Urheilu + Venetsia
  Käsityö SÄILYTETÄÄN; Lontoo luonto→Britannia + nykytaide 6→4;
  valokuvarajatapaukset (~50) KORJATAAN KAIKKI. v420 valokuva-auditti
  (9 vaihdettua + 4 estolistalle) tehty.
- **Opus 2:** 20/31 kohdekarttaa. Jäljellä 11 (Rooma, Krakova, Varsova,
  Tallinna, Kiova, Pietari, Moskova, Sofia, Bukarest, Sarajevo, Odessa) —
  tekee Rooma/Krakova/Varsova/Tallinna-erää. Merentäyttö: 3 varianttia
  (nauha/vesipuoli/maapuoli). Tukholma+Venetsia piirretty uudestaan
  vetineen (hyväksytty). Istanbul = 2 maanosaa.
- **Sonnet 2:** nähtävyysjutut. Erät julki: Kairo/Venetsia/Madrid/
  Tukholma/Berliini/Lontoo (vanhat), Praha/Wien/Budapest/Pariisi (v426),
  **Helsinki (#604, ei mergetty — ks. AVOIN)**. Seuraavaksi
  Ateena/Amsterdam/Dublin, sitten Opus 2:n 36 uutta kohdetta.
  - **Wiki-ansat välitettäväksi Sonnet 2:lle** ennen Istanbul/Lissabon-
    juttuja: fi-wiki "Neitsyttorni" = Bakun torni (Istanbulin = Kız
    Kulesi); fi-wiki "Belém" = Brasilian kaupunki (Lissabonin =
    kaupunginosa); "Zeus Olympioksen temppeli" ja "Sininen moskeija" ovat
    täsmennyssivuja.
- **Sonnet 1:** loppu-QA-brief (Mercator-vääristymä, curl+karttapiste,
  haikara/Vasa-kuvakaksoiset, Flickr "No restrictions", maakartat.js
  nimiVasen kuollut kenttä).

## Julkaistu tänään (Fable, hands-on)

v422 (radio kartan ylle, liitelinkki), v423 (Poistu himmeämmäksi),
v425 (3 uutta pulmaa — HUOM: laskupohjaiset, omistaja haluaa nyt
tieto/kulttuuripohjaisia, työstä uusiksi), v429 (TV-napit CHE+SRF /
EST+ERR — TV-projekti tähän päättyi), 5 isoisä-kaupunkia työhuoneeseen
(#608). Tilannetauluja väliin.
