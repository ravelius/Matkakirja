# Tilinvaihto – käytännön ohje (Päätoimittaja 14.10.2026; kylmäkäynnistystestin korjaus)

Kenelle: Päätoimittaja (PT), joka aloittaa omistajan uudella Claude-tilillä samalla Mac Studiolla. Raamattu, Ydinajatus kohta 2,
TILINVAIHDON TARKISTUSLISTA viittaa tänne; tämä on se lista järjestyksessä. Tilinvaihto ei vaikuta Macin käyttäjän asioihin
(avaimet, LaunchAgentit, checkoutit, hookien tiedostot, GitHub), vaan Claude-tilin asioihin (sessiot, cronit, artefaktit, sallinnat).

Lyhenteet: S = /Users/Shared/Claude, F = S/Matkakirja-fable/scratchpad. "Vain Mac" = ei gitissä; peili tools/tyotavat/ (LUEMINUT.md).

## 0. Tili ensin (ennen yhtään roolisessiota)
1. `claude auth status` → millä tilillä komentorivi on. Jos väärä: `claude auth login` (omistaja hyväksyy selaimessa) ja tarkista,
   että accountUuid = ympäristön CLAUDE_CODE_ACCOUNT_UUID ja orgId = CLAUDE_CODE_ORGANIZATION_UUID. Komentorivi kirjataan SOVELLUKSEN
   tilille (Raamattu TILI ENNEN KÄYNNISTYSTÄ, 9.10.; kumoaa 7.10. "toinen tili kuin sovellus").
2. OMISTAJAN TOIMET (yksi "## ⚠️ TOIMI TARVITAAN" -kortti Keskustelukanavassa, kaikki kerralla):
   - puhelimen Claude-sovellus kirjautuu uudelle tilille (muuten Remote Control -ilmoitukset eivät tule);
   - claude.ai → Code → ympäristö Default: Network access = Full ja GitHub-yhteys (muuten Wikimedia/WebFetch 403, pilvi ei näe repoa);
   - tilin lisäosat: web-artifacts-builder, Unity, unity-perf (Raamattu, UUSI TILI TARKISTAA);
   - tilaustaso (Max, Opus 1M) ja push-ilmoitukset pois tilin asetuksista (EI PUSH-ILMOITUKSIA 14.10.);
   - jos sallinnat puuttuvat (kohta 6): omistajan yksirivinen bash-lohko.
3. Kirjaa tili: päätili (omistajan muukin käyttö) = siirtoprompti 50 %:ssa; koodaustili = vain rivi 99 %:ssa. Kerro Postivahdille.

## 1. Talteen ennen vanhojen sessioiden tyhjennystä
1. Jokainen rooli, jolla on keskeneräistä: luovutus + push (docs/moduulit/siirtoraportti.md). Lue roolien uusimmat luovutukset.
2. PT:n ja Keskustelukanavan keskustelut: `python3 tools/tallenna-keskustelu.py <session-uuid> Päätoimittaja` ja
   `… <session-uuid> Keskustelukanava` (kirjoittaa S/keskustelut/). Muut roolit: luovutus riittää.
3. Vanhat sessiot tyhjiksi: `clear_session`, tarkistus `list_events` = 0. Jos vanhan tilin sessiot eivät näy uudella tilillä,
   ne jäävät vanhalle tilille – ei toimia (ne eivät kuluta uuden tilin kiintiötä).

## 2. Sessioiden luonti (roolitaulukko)
Kaava: Raamattu SESSIOIDEN LUONTI ILMAN OMISTAJAA (osascript + screencapture, valikot suomeksi: Tiedosto › Uusi istunto / Avaa kansio…,
2560×1440-koordinaatit). Edellytys: sallinnat Bash(osascript:*), Bash(screencapture:*), Bash(sleep:*) PT:n .claude/settings.local.json:ssa;
jos osascript ei saa ohjata appia, omistaja sallii Järjestelmäasetukset › Tietosuoja ja suojaus › Käyttöapu (Claude/Pääte).
Nimi: "Rooli (malli, effort)", PT isoin kirjaimin "PÄÄTOIMITTAJA (Opus, medium)". Effort `set_session_effort`. Roolien aloitusviestin
lähettää PT tilinvaihdossa (nollauksissa Postivahti, NOLLAUS.md).

| Rooli | Malli, effort | Checkout (S/…) | Aloitusviesti | Silmukat, jotka rooli käynnistää |
|---|---|---|---|---|
| PÄÄTOIMITTAJA | Opus, medium | Matkakirja-fable | docs/raportit/viesti-fable-aloitus.md + uusin luovutus | cron JONOKIERROS "7,27,47 * * * *" (F/jonokierros-teksti.md); Monitor ODOTTAJAVAHTI `python3 -u S/hooks/odottajat-vahti.py` (timeout 1800000, uusi joka vanhenemisella) |
| KESKUSTELUKANAVA | Opus, max | Matkakirja-fable | docs/aloitusviestit/keskustelukanava.md | ei |
| Postivahti | Sonnet 5.5, medium | Matkakirja-posti | docs/aloitusviestit/postivahti.md | ScheduleWakeup 4–5 min (KIERROS.md) |
| Asemataulu | Sonnet 5.5, low (auto) | Matkakirja-asemataulu | docs/aloitusviestit/asemataulu.md | cron "*/5" vienti, "13,43" tarkistus, "7 * * * *" kulutus |
| Julkaisija | Opus, high | Matkakirja-julkaisija | docs/raportit/viesti-julkaisija-aloitus.md + luovutus | vahdit `zsh S/julkaisija-tyokalut/valoseppa-vahti-kaynnista.zsh`, lukkovahti.zsh (olavinlinna-vahti ei, linna tauolla) |
| Natiiviseppä | Opus, high | Matkakirja-3d-selvittaja | docs/raportit/viesti-natiiviseppa-aloitus.md + luovutus | cron "4 9 * * *" `python3 S/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py` |
| Natiivi-UI | Opus, high | Matkakirja-natiivi-ui | docs/raportit/viesti-natiivi-ui-aloitus.md + luovutus | ei |
| Pelikoodari | Opus, high | Matkakirja-pelikoodari | docs/raportit/viesti-pelikoodari-aloitus.md + luovutus | ei |
| Linssiseppä | Opus, high | Matkakirja-linssiseppa | docs/raportit/viesti-linssiseppa-aloitus.md + luovutus | ei |
| Valoseppä | Opus, high | Matkakirja-linssiseppa-2 | docs/aloitusviestit/valoseppa.md | ei (Julkaisijan vahti) |
| Karttaseppä | Opus, high | Matkakirja-karttaseppa | docs/raportit/viesti-karttaseppa-aloitus.md + luovutus | ei |
| Linnanrakentaja | Opus, high | Matkakirja-linnanrakentaja | docs/aloitusviestit/linnanrakentaja.md | ei |
| Siirtoseppä | Opus, high | Matkakirja-siirtoseppa | docs/raportit/viesti-siirtoseppa-aloitus.md + luovutus | ei |
| Sisältökirjuri | Sonnet 5.5, high | Matkakirja-sisaltokirjuri | docs/raportit/viesti-sisaltokirjuri-aloitus.md + luovutus | ei |
| Äänittäjä | Sonnet 5.5, high (auto) | Matkakirja-aanittaja | docs/aloitusviestit/aanittaja.md | ei |
| Laitetestaaja | Sonnet 5.5, high | Matkakirja-laitetestaaja | docs/raportit/viesti-laitetestaaja-aloitus.md + luovutus | ei |

Aktiivisuus: luo vain roolit, joilla on jonoa (F/tyojonot.md) tai keskeneräinen luovutus; tauolla olevat (esim. Olavinlinna) odottavat.
Vanhat docs/raportit/viesti-*-aloitus.md -tiedostot ovat roolien haaroissa usein uudempia kuin mainissa: lue roolin oma haara.

## 3. Uudet session id:t (kaikki samassa vuorossa)
S/osoitekirja.md (taulukko: rooli, id, kansio, malli, alue) on ainoa id-lähde. Päivitä sen jälkeen id:t, joita tiedostot toistavat:
S/Matkakirja-posti/KIERROS.md (PT ja KK otsikossa), NOLLAUS.md (PT), F/asemataulu/ASEMATAULU-ROOLI.md (PT, KK), F/keskustelukanava/aloitus.md,
F/jonokierros-teksti.md (KK, Asemataulu), F/asemataulu/roolit.json. Lopuksi `bash tools/tyotavat/peili.sh` ja commit.

## 4. Asemataulu (tilikohtainen kopio)
Raamattu ASEMATAULU TILIKOHTAINEN: 1) Artifact list → onko tilillä oma taulu; julkaise tools/asemataulu/asemataulu.html (capabilities
comments + db, icon dashboard) samaan tai uuteen osoitteeseen; 2) täytä kokoelma talo yhdellä ArtifactData-batchilla F/asemataulu/data/talo/*.json;
3) kirjaa osoite F/asemataulu/osoitteet.md:hen, alla olevaan VOIMASSA OLEVA ARVO -tauluun, jonokierroksen kohtaan 7, ASEMATAULU-ROOLI.md:hen
ja omistajalle yhdellä rivillä (avauskomento: `open -na "Google Chrome" --args --app=<osoite> --window-size=560,1000`).
Vanhan tilin artefakteja (taulu, äänisivu) ei voi muokata uudelta tililtä.

## 5. Silmukat ja vahdit
Taulukon viimeinen sarake. Cronit ovat session-only (CronCreate): ne kuolevat session mukana ja vanhenevat 7 vrk:ssa – rooli uusii ne
aloitusviestissään. Tarkistus: PT `list_events` jokaiselle silmukkaroolille tunnin sisällä.

## 6. Sallinnat, Remote Control, hookit
- `set_remote_control <id> true` kaikille paitsi lepäävät.
- Sallinnat: projektin .claude/settings.json (gitissä) + PT:n .claude/settings.local.json. Gitissä oleva settings.local.json on vanha
  (vain aws/source/python3 -); Macin versiossa lisäksi Bash(osascript:*), Bash(screencapture:*), Bash(sleep:*),
  mcp__ccd_session_mgmt__set_session_effort sekä PostToolUse- ja UserPromptSubmit-hookit pt-taulu-muistutus.py:lle. Älä checkouttaa
  gitin versiota Macin päälle. Puuttuva rivi → omistajan bash-lohko (lupa-asetus).
- Hookit: `bash tools/hooks/asenna-viestiraja-hook.sh --tarkista`.

## 7. Macin tarkistukset (eivät riipu tilistä)
- `launchctl list | grep -i -E 'matkakirja|runner'`: fi.matkakirja.juna, juna-vahti, naytto-auki, siivous, app.matkakirja.natiivi-bundle,
  kaksi actions.runner-agenttia (plistit ~/Library/LaunchAgents).
- `pgrep -fl vahti.zsh`: Julkaisijan vahdit (käynnistys yllä).
- `bash tools/tyotavat/peili.sh --tarkista`: Mac-ohjeet ja peili samat.
- `bash tools/tarkista-tyotilat.sh`.

## 8. Lopuksi
Rivi Keskustelukanavalle: "Tilinvaihto valmis: N roolia, taulu <osoite>". Kirjaa tilinvaihto lokiin (`node tools/raamattu-kirjaa.mjs`).

## VOIMASSA OLEVA ARVO (ristiriitojen ratkaisu 14.10.2026; uusin päätös voittaa)

| Asia | Voimassa | Kumotut / huom |
|---|---|---|
| Postivahdin kierros | ScheduleWakeup 4–5 min, kehote "Lue S/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan"; KIERROS.md on sitova sisältö | 10 min (9.10.), Raamatun vanha sanatarkka kehote (loki TIIVISTYS 14.10.) |
| Mittareiden vienti Asemataululle | Asemataulu-sessio (5 min, aina, ilman syke-ehtoa); Postivahti vie vain Raati- ja Testaajat-luvut ja junan edistyksen | Postivahti 5 min syke-ehdolla (11.10.) |
| Asemataulun osoite | nykyinen tili (sami.reivinen@vvi.fi, 13.10. alkaen): https://claude.ai/artifact/EekZDPMuAcsjT3awvn4jPb; muut tilit F/asemataulu/osoitteet.md | Rq5ajPU4SraE2XKd7BYAix on päätilin taulu (10.10.), ei nykyisen |
| Kontekstirajat | roolit 50 % (luovutus → Postivahti nollaa); PT 65 % (oma nollaus, Postivahti suorittaa); KK 55 % aloitus.md, 65 % kortti "Nollaanko nyt?" (vain omistaja nollaa); Asemataulu 50 % | Postivahti ei nollaa KK:ta |
| Viikkokiintiö | päätili: siirtoprompti 50 %:ssa; koodaustilit: vain rivi 99 %:ssa (Postivahti hälyttää 96 % ja 99 %); ei keventämistä | "ei siirtopromptia" koskee vain koodaustilejä |
| Komentorivin tili | sama kuin sovelluksen tili; uudelleenkirjautuminen jokaisessa tilinvaihdossa | "toinen tili kuin sovellus" (7.10.) |
| TF-juna | lähtee vain omistajan pyynnöstä ("OMISTAJA PYYSI JULKAISUA", PT:n välittämä riittää), kaikki kuitattu samaan junaan, TF enintään 2/pv | "heti kun valmista" (6.10.); launchd fi.matkakirja.juna (2 h välein 08–22) ja juna-vahti (10 min) ovat simulaattorikäännöksiä, eivät TF-junia |
| Session id:t | vain S/osoitekirja.md | Raamatun ja vanhojen ohjeiden kovakoodatut id:t |
| PT:n malli | Opus, medium | "Opus max" (28.9.) |
| Roolien määrä | osoitekirjan taulukko (14.10.: PT + KK + 14 roolia) | CLAUDE.md "kuusi roolisessiota", roolitus.md "kolme sessiota" |
