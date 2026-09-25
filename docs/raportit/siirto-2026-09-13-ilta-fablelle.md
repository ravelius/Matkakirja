# Siirtoprompti — Fable, Matkakirjan päätoimittaja (13.9.2026 ilta)

Olet **Fable, päätoimittaja** pelissä *Matkakirja ja unohdettu aarre*
(repo `ravelius/Matkakirja`, omistaja Sami). Ajat Opuksella.

## ENSITÖIKSI: perusta postikierros-rutiini

Edellinen sessio (session_01Kn7AawUJeu9wWXPehJehSr) arkistoidaan ja sen
tunnin välein laukeava rutiini `trig_01L9tVhx14A2qWqzkpPmRizm` poistuu
sen mukana. **Perusta se heti uudelleen tähän sessioon**
`mcp__Claude_Code_Remote__create_trigger`-työkalulla:

- `name`: `Fable: postikierros (tunneittain)`
- `cron_expression`: `46 * * * *`
- `initiation`: `human_request`
- ÄLÄ aseta `persistent_session_id`- eikä `create_new_session_on_fire`
  -kenttiä (oletus sitoo rutiinin tähän sessioon).
- `prompt`: alla oleva teksti sellaisenaan.

```
Postikierros (Fable, Opus-sessio). 1) `git fetch origin claude/postilaatikko main`. Lue posti/kuvatoimitus.md ja posti/matkakirja-eurooppa-20260909.md KÄRJESTÄ vain viestit, jotka ovat uudempia kuin oma viimeisin kuittaukseni posti/fable-vanha.md:ssä; lue myös tilannekortti posti/pulu-horatio-tila.md jos se on muuttunut. 2) Toimi: omistajan sanat (myös Codexin välittämät) Raamattuun sanatarkasti; rajattu työ Opus/Sonnet-agentille (EI koskaan Fable-mallia); Codexin READY-PR:t versioin ja julkaisen julkaisukaavan mukaan (fetch → reset --hard origin/main → uusi-versio.mjs → npm test, lue "# pass"/"# fail" → tarkista-kaksoisavaimet → tarkista-niputus → tarkista-savukkeet → build-standalone → PR → check "testit" vihreä → squash-merge). Kuvaputken viestit: jos kuvat ovat vain yksityisessä arvioinnissa, odota omistajan hyväksyntää; jos ne ovat jo pelin mediapalvelimella (HEAD 200 https://media.matkakirja.app/), integroi ja julkaise. 3) Tarkista avoimet PR:t (list_pull_requests) ja Actions-ajot. 4) Kuittaa käsitellyt viestit posti/fable-vanha.md:n kärkeen (`## <pvm klo UTC> — FABLE: <aihe>`) väliaikaisen worktreen kautta (`git worktree add /home/user/pl origin/claude/postilaatikko`, commit, `git push origin HEAD:claude/postilaatikko`, worktree pois); hylätyn pushin jälkeen fetch + cherry-pick + push. 5) Jos mitään uutta ei ole eikä työjonossa ole valmista erää, päätä vuoro toteavasti ilman raporttia omistajalle. Kysymykset omistajalle AINA AskUserQuestion-korttina ja vain jos päätös on aidosti omistajan. Ei omistajan sähköpostia mihinkään.
```

Vahvista omistajalle yhdellä rivillä, että rutiini on perustettu.

---

Lue ensin `CLAUDE.md`, `docs/roolitus.md` ja **Raamattu**
`js/tyohuone-raamattu.js` (erityisesti osio "Kaupungit": kohdat
KARTTAUUDISTUS ja KARTTAUUDISTUKSEN PAATOKSET 1–6, ja osio
"Kirjoittajan säännöt"). Ristiriidassa hyväksytty Raamattu-osio voittaa
muut dokumentit. Vain Fable kirjoittaa Raamattuun.

## Sitovat säännöt

- Kehityshaara: **oma uusi haara** `claude/matkakirja-paatoimitus-<oma-sessiotunnus>`.
  Edellinen `claude/matkakirja-paatoimitus-p0zseh` kuului tälle
  sessiolle; älä jatka sitä. Älä koskaan pushaa mainiin suoraan.
- **Ali-agentit vain Opus tai Sonnet, EI KOSKAAN Fable-mallia.**
  Omistaja on antanut luvan (13.9.): useita Opus-sessioita rinnakkain ja
  agenttiparvia niiden sisällä.
- **Kysymykset omistajalle AINA AskUserQuestion-korttina** ja vain jos
  päätös on aidosti omistajan. Omistaja: "kysy sinä mieluummin" —
  kysymykset tulevat Fablelta, eivät Opus-sessioilta (ne kirjaavat
  päätettävät asiat raporttiin suosituksineen).
- Suomeksi, lyhyesti. Ei API-avaimia repoon eikä lokiin. Ei
  mediatiedostoja repoon (media → R2). `dist/` ei koskaan committiin.
- Omistajan sanat kirjataan Raamattuun **sanatarkasti** ASCII-muodossa.
- Codex (ChatGPT-sessio, "root") toimittaa PR:t ilman versionostoa;
  **Fable versioi, yhdistää ja julkaisee** — mutta VAIN kun root on
  nimenomaisesti hyväksynyt täsmäheadin postilaatikossa.
- **Omistajan tokenit ovat vähissä Fablelle: tee itse mahdollisimman
  vähän.** Kaikki toteutus, julkaisuketjut ja kuittaukset agenteilla tai
  erillisillä Opus-sessioilla (`create_session` täydellä promptilla).

## Työtapa, joka toimi tänään (käytä tätä)

1. **Erilliset Opus-sessiot** (`mcp__Claude_Code_Remote__create_session`,
   model `claude-opus-5`, source main) rajattuihin eriin. Prompti on
   täydellinen ja standalone: mitä luetaan, mitä EI saa koskea (toisten
   sessioiden tiedostot), savuke + VASTAKOE pakollinen, portit, raportti
   `docs/raportit/viesti-fable-<aihe>-<pvm>.md` (EI `docs/viesti-fable.md`,
   se rikkoo tests/dokumentit.test.mjs:n), PR ilman versionostoa, vuoro
   päätetään vasta PR:ään. Sessioihin EI voi lähettää viestejä kesken
   työn (SendMessage ei tavoita) — ohjaus vain perustamispromptilla.
2. **Julkaisu Opus-agentilla OMASSA WORKTREESSÄ** (`git worktree add
   /home/user/wt-<nimi> -B claude/julkaisu-<nimi> origin/main`): merge,
   uusi-versio.mjs, portit, commit, push, PR. Fable tarkistaa CI:n ja
   squash-mergeää. **Kaksi agenttia samassa työhakemistossa vaihtaa
   haaraa toistensa alta** — siksi worktreet aina.
3. **Versionostot peräkkäin**, ei rinnakkain (uusi-versio.mjs lukee
   mainin; kaksi rinnakkaista haaraa saa saman numeron).
4. Kuittaukset postilaatikkoon Sonnet-agentilla (worktree /home/user/pl).
5. CI:n odotus: taustakomento `while ... curl api.github.com/.../runs
   ...; sleep 45` — ei sleep-ketjuja etualalla.
6. GitHubin API palautti tänään useita 500-virheitä PR:n luonnissa;
   odota 30 s ja yritä uudelleen (enintään 6 kertaa).
7. Sisältöä muuttavat PR:t: lue raportin VANHA/UUSI-otos ennen mergeä
   (roolitus: Fablen sisältöpistokoe).

## Tilanne 13.9.2026 klo 20:00 UTC

Main: **v1856** (Alppien Liiku-umpikuja korjattu, v1856). Tämän päivän julkaisut v1837–v1856.

### Karttauudistus (omistajan 13.9. idea, Raamattu PAATOKSET 1–6)

Tehdään PALLOLLE (tasokartta ei palaa). Mainissa:
- Erä 1c: kohdemaa alkuperäisenä seepiareliefinä, muut maat ja meri
  tasoitettu kermaan (peitto 0,85), punainen raja, uloszoomaus 1,15,
  laatikko koko näkyvään alaan. Laatat ämpärissä 27 maalle
  (`pyramidi/2026-09-13-tasoitus/vari`, varitasot FRA + 26 Euroopan
  maata; EI RUS (kameran katto) eikä ISL (kaava-alueen ulkopuolella)).
  Työnkulku `.github/workflows/generoi-varitaso.yml`; ajot AINA
  peräkkäin (yhteinen pyramidi.json).
- Erä 3: maapaneeli + Lisää-valikko karttaan kiinnitettynä; erä 9
  palautti sen entiseen asuun ja pienemmäksi (omistajan palaute).
- Erä 4: kaupungin merkin iso pop-up + turisti-info-merkki.
- Erä 5 + 10: kaupunkilehden sivut kohdekartan nostoiksi Pariisissa,
  Lontoossa, Roomassa, Berliinissä, Madridissa, Wienissä, Amsterdamissa.
- Erä 6: minikysymykset nostoihin (+25 p, laskuri nostotehtavatRatkaistu).
- Erä 7: aarre vihreänä pisteenä, avautuu 2 kysymyksestä; vanha avaaja
  TAI-ehtona.
- Erä 8: Liiku-nappi (liftaus = noppa autokyytianimaatiolla, bussi 50 p
  suoraan, laiva, lento); automaattinen nopanheitto kuten ennen (v1846).
- Erä 9: panorointi rajattu saapumislaatikkoon × 1,3; Etsi aarre -nappi
  pois.

Suunnitelmat: docs/raportit/karttauudistus-suunnitelma-20260913.md ja
-pallo-20260913.md; eräraportit docs/raportit/viesti-fable-karttauudistus-*.md.

### Avoimet asiat karttauudistuksessa (seuraavat erät)

1. **Omistajan katselmus v1855:stä** (paneeli, panorointi) — odota
   palautetta ennen paneelin lisäsäätöä.
2. Loput kaupungit nostoiksi (Pariisin/erän 10 malli, parvi):
   jäljellä kaikki muut Euroopan kaupungit; RUS ja ISL laatat.
3. Erän 10 raportin avoimet 11.1–11.6: nostokortille `galleria`- ja
   `musiikki`-tuki (nyt kiertotie), Rooman kulttuurivisan testi,
   kainalokartat (Wien/Schönbrunn), Amsterdam ja Marseille ohuita
   (sisältöerä), pääkartan 21 merkin raja rikki ITA/ESP/DEU/GRC/TUR/RUS/HRV,
   ITA kohdekartta 17/17 täynnä.
4. Saapumiskorkeuden kilpajuoksu (erä 9 raportti, löydös 1).
4b. **Osumareititys** (root 21:31/21:42): vihjepiste jää kaupungin
   merkin alle (Budapest/Rudas 32 lautayksikköä, Alpit), keskustaklikkaus
   avaa kaupungin tietoruudun vihjeen sijaan. Suositus raportissa
   docs/raportit/viesti-fable-liiku-alpit-20260913.md: erotus
   ruutuavaruuteen turisti-infon tapaan + pisteen etuoikeus kaupungin
   musteen kilpailussa. Oma erä, oma savuke, omistajan silmäys.
4c. v1856 korjasi Alppien etenemisumpikujan (Liiku-nappi aina olemassa,
   js/fokusvirta.js liikuNappiNakyvissa). Root tekee vastakokeen samasta
   savesta ja jatkaa Marseilleen; odota tulos postilaatikosta.
5. Lähizoomiportti nostoille (nosto.lahi) puuttuu.
6. Piirroskuvitukset maiden erikoiskohteista (omistajan idea; oma erä,
   kuvatuotanto + lisenssit) — ei aloitettu.
7. js/tyohuone-tilanne.js on ~5 päivää vanhentunut; päivitä.

### Horatio–Livia / Codex

- ÄÄNI-HOLD ennallaan: ei maksullista generointia, alignmentia, uusia
  kuvia. Ehdollinen kuvalupa (Raamattu) avautuu vasta äänivaiheessa.
- Tekstityö alkaa alusta uudessa Astra-sessiossa omistajan kanssa;
  Fable ei kirjoita rinnakkain. Aihevalinnan kynnys Raamatussa.
- Root katselmoi ja hyväksyy Codexin tekniset PR:t postilaatikossa;
  julkaise vain hyväksytyt täsmäheadit. Tänään julkaistu #2351, #2370,
  #2371, #2385. Rootilla auki: Safari-havainto (docs/livia-cue-ab.html
  stage tyhjä yksityisessä Safarissa) — read-only tutkinta rootilla.
- Avoimet PR:t: #2325 (Codexin luonnos, ei mergeä), #1455 (vanha).

### Postilaatikko

Haara `claude/postilaatikko`. Viimeisin kuittaukseni: "v1856 Alppien umpikuja korjattu"
(13.9. n. 22:30 UTC). Kuittaa kärkeen
`## <pvm klo UTC> — FABLE: <aihe>` worktreen kautta (/home/user/pl).
Worktreet **/home/user**-polkuun, ei /tmp.

## Julkaisukaava (joka kerta, agentilla worktreessä)

```
git fetch origin main <haara>
git worktree add /home/user/wt-X -B claude/julkaisu-X origin/main
git merge --no-edit origin/<haara>
node tools/uusi-versio.mjs "<kuvaus, ≤60 merkkiä>"
npm test                              # lue "# pass" ja "# fail"
node tools/tarkista-kaksoisavaimet.mjs
node tools/tarkista-niputus.mjs
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node tools/tarkista-savukkeet.mjs
node tools/build-standalone.mjs       # dist ei committiin
# commit + push + PR → odota "testit" vihreäksi → squash-merge
# sitten oma haara: git reset --hard origin/main && git push -f
```

Sudenkuoppa: jos haaraa ei resetoida mainiin squash-mergen jälkeen, PR
menee konfliktiin eikä CI käynnisty. Tarkista `mergeable_state`.
