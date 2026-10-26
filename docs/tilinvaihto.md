# Tilinvaihto – käytännön ohje (Päätoimittaja 14.10.2026; kylmäkäynnistystestin korjaus)

Kenelle: Päätoimittaja (PT), joka aloittaa omistajan uudella Claude-tilillä samalla Mac Studiolla. Raamatun luku 12,
TILINVAIHDON TARKISTUSLISTA viittaa tänne; tämä on se lista järjestyksessä. Tilinvaihto ei vaikuta Macin käyttäjän asioihin
(avaimet, LaunchAgentit, checkoutit, hookien tiedostot, GitHub), vaan Claude-tilin asioihin (sessiot, cronit, artefaktit, sallinnat).

Lyhenteet: S = /Users/Shared/Claude, F = S/Matkakirja-fable/scratchpad. "Vain Mac" = ei gitissä; peili tools/tyotavat/ (LUEMINUT.md).

## 0.0 Käynnistys ilman PT:tä ja KK:ta (kylmäkäynnistystesti 2, 14.10.2026)
- Ensimmäinen sessio, jonka omistaja avaa uudella tilillä kansiossa S/Matkakirja-fable, ON PÄÄTOIMITTAJA: nimeä se heti
  "PÄÄTOIMITTAJA (Opus, medium)" (set_session_title, set_session_effort medium) ja lue tämä tiedosto loppuun ennen muuta työtä.
- Niin kauan kuin Keskustelukanavaa ja Asemataulua ei ole, omistajan toimet annetaan POIKKEUKSENA suoraan tähän chattiin
  (sama muoto: "## ⚠️ TOIMI TARVITAAN", lihavoitu ohje, kopioitava rivi). Kun KK ja Asemataulu ovat pystyssä (kohdat 2 ja 4),
  palataan tavalliseen: kortit KK:ssa ja VAATII TOIMIA (Asemataulun toimi-<rooli>).
- Sallinnat ja hookit yhdellä omistajan rivillä (tiedosto, ei käsin kirjoitettua lohkoa):
  `bash /Users/Shared/Claude/Matkakirja-fable/tools/tyotavat/palauta-sallinnat.sh`
  (jos tiedostoa ei vielä ole PT:n checkoutissa: `git -C /Users/Shared/Claude/Matkakirja-fable fetch origin main` ja
  `git -C /Users/Shared/Claude/Matkakirja-fable checkout origin/main -- tools/tyotavat/`).
- Chrome kirjautuu uudelle tilille (claude.ai, omistaja): artefaktit ovat oletuksena yksityisiä, joten Asemataulu ei aukea
  läppärin Chromessa vanhalla kirjautumisella (avauskomento kohdassa 4).

## 0. Tili ensin (ennen yhtään roolisessiota)
1. `claude auth status` → millä tilillä komentorivi on. Jos väärä: `claude auth login` (omistaja hyväksyy selaimessa) ja tarkista,
   että accountUuid = ympäristön CLAUDE_CODE_ACCOUNT_UUID ja orgId = CLAUDE_CODE_ORGANIZATION_UUID. Komentorivi kirjataan SOVELLUKSEN
   tilille (Raamattu TILI ENNEN KÄYNNISTYSTÄ, 9.10.; kumoaa 7.10. "toinen tili kuin sovellus").
2. OMISTAJAN TOIMET (yksi "## ⚠️ TOIMI TARVITAAN" -viesti, kaikki kerralla; ennen KK:n luontia suoraan PT:n chattiin, kohta 0.0):
   - Chrome kirjautuu claude.ai:hin uudella tilillä (Asemataulun avaus);
   - puhelimen Claude-sovellus kirjautuu uudelle tilille (muuten Remote Control -ilmoitukset eivät tule);
   - claude.ai → Code → ympäristö Default: Network access = Full ja GitHub-yhteys (muuten Wikimedia/WebFetch 403, pilvi ei näe repoa);
   - tilin lisäosat: web-artifacts-builder, Unity, unity-perf (Raamattu, UUSI TILI TARKISTAA);
   - tilaustaso (Max, Opus 1M) ja push-ilmoitukset pois tilin asetuksista (EI PUSH-ILMOITUKSIA 14.10.);
   - jos sallinnat puuttuvat (kohta 6): `bash /Users/Shared/Claude/Matkakirja-fable/tools/tyotavat/palauta-sallinnat.sh`.
3. Kirjaa tili: päätili (omistajan muukin käyttö) = siirtoprompti 50 %:ssa; koodaustili = vain rivi 99 %:ssa. Kirjaus lokiin
   (`node tools/raamattu-kirjaa.mjs "TILINVAIHTO …"`) ja F/asemataulu/osoitteet.md:n taulukkoon; Postivahdille, kun se on luotu.

## 1. Talteen ennen vanhojen sessioiden tyhjennystä
1. Jokainen rooli, jolla on keskeneräistä: luovutus + push (docs/moduulit/siirtoraportti.md). Lue roolien uusimmat luovutukset.
   Uusin luovutus löytyy aikajärjestyksessä (tiedostonimet -aamu/-ilta2/-yo eivät lajittele): `git fetch origin` ja
   `git log --remotes=origin --since=3.days --format='%ci %h %D' --name-only -- 'docs/raportit/viesti-<rooli>-luovutus-*' | head`.
2. PT:n ja Keskustelukanavan keskustelut: `python3 tools/tallenna-keskustelu.py <session-uuid> Päätoimittaja` ja
   `… <session-uuid> Keskustelukanava` (kirjoittaa S/keskustelut/). Muut roolit: luovutus riittää.
3. Vanhat sessiot tyhjiksi: `clear_session`, tarkistus `list_events` = 0. Jos vanhan tilin sessiot eivät näy uudella tilillä,
   ne jäävät vanhalle tilille – ei toimia (ne eivät kuluta uuden tilin kiintiötä).

## 1.5 Kotikansiot mainiin ENNEN sessioiden luontia (Raamattu 12.23 kohta 17 ja 7.47; KK 26.10.2026)
Sovellus lataa CLAUDE.md:n session kansiosta vain käynnistyessään, joten jäljessä oleva kotikansio antaa uudelle sessiolle vanhat
ohjeet koko sen eliniäksi. Siksi kotikansiot päivitetään vanhan tilin roolien luovutusten jälkeen ja ennen kohtaa 2:
1. `zsh tools/paivita-kotikansiot.sh` (kuiva-ajo): JÄLJESSÄ-rivit näyttävät, mitkä kansiot tarvitsevat --uusi-haaran tai siivouksen.
2. Likainen työpuu (muutoksia seuratuissa tiedostoissa): kansion oma rooli committaa tai siirtää muutoksensa ennen luovutusta;
   PT ei poista eikä palauta toisen roolin tiedostoja. Lepäävän roolin likainen kansio ohitetaan (`--ohita kansio`) ja kirjataan.
3. `zsh tools/paivita-kotikansiot.sh --aja --uusi-haara` vasta, kun kansion sessio on pysähtynyt (haara vaihtuu koti/<kansio>:ksi;
   vanha haara säilyy, mitään ei poisteta). Kuiva-ajo uudelleen: kaikki AJAN TASALLA tai kirjattu ohitus.
   POIKKEUS Matkakirja-posti (26.10.): KIERROS.md ja NOLLAUS.md ovat vain haarassa postivahti, joten sitä ei vaihdeta koti-haaraan:
   Postivahti mergeää origin/mainin omaan haaraansa ja pushaa; ajossa `--ohita Matkakirja-posti`.
4. Jokaisen uuden roolin aloitusviestissä ensimmäinen työ: tuotannonohjauksen osio 0 ja oma LUE ALOITTAESSA -rivi
   (`node tools/raamattu-luku.mjs 7.47`) ennen muuta työtä.

## 2. Sessioiden luonti (roolitaulukko)
Kaava (15.10.2026 alkaen ensisijainen): `start_session` (initiation user_asked, context fresh, cwd roolikansio, use_worktree false, model, effort enintään PT:n oma, permission_mode) ja heti `detach_session`; RC kytkeytyy itsestään. Tilin vanhat sessiot tyhjenevät send_message-pyynnöllä "lataa clear_session ja kutsu self" (list_events = 0), sitten aloitusviesti. PT:n oma effort on uusien sessioiden yläraja, joten luo Opus-max-sessiot ennen kuin PT:n effort lasketaan. Varalla: Raamattu SESSIOIDEN LUONTI ILMAN OMISTAJAA (osascript + screencapture, valikot suomeksi: Tiedosto › Uusi istunto / Avaa kansio…,
2560×1440-koordinaatit). Edellytys: sallinnat Bash(osascript:*), Bash(screencapture:*), Bash(sleep:*) PT:n .claude/settings.local.json:ssa;
jos osascript ei saa ohjata appia, omistaja sallii Järjestelmäasetukset › Tietosuoja ja suojaus › Käyttöapu (Claude/Pääte).
Osascriptissä valikkojen nimet suomeksi (`click menu item "Uusi istunto" of menu "Tiedosto"`); malli valitaan luonnoksessa ennen
ensimmäistä viestiä. Järjestys per sessio: luonti → `set_session_model` (jos väärä) → `set_session_effort` → `set_session_title`
"Rooli (malli, effort)" (PT ja KK isoin kirjaimin) → `set_session_permission_mode` → aloitusviesti → `set_remote_control`.
Lupatila: ohitustila (bypassPermissions) kaikille paitsi Äänittäjä auto (sessiotiedostot 14.10.). Roolien aloitusviestin
lähettää PT tilinvaihdossa (nollauksissa Postivahti, NOLLAUS.md).

| Rooli | Malli, effort | Checkout (S/…) | Aloitusviesti | Silmukat, jotka rooli käynnistää |
|---|---|---|---|---|
| PÄÄTOIMITTAJA | Opus, medium | Matkakirja-fable | docs/raportit/viesti-fable-aloitus.md + uusin luovutus | ei jonokierros-cronia (omistaja 14.10. klo 22.34: PT herää Postivahdin herätteestä); Monitor ODOTTAJAVAHTI `python3 -u S/hooks/odottajat-vahti.py` (timeout 1800000, uusi joka vanhenemisella) |
| KESKUSTELUKANAVA | Opus, max | Matkakirja-fable | docs/aloitusviestit/keskustelukanava.md | ei |
| Postivahti | Sonnet 5.5, medium | Matkakirja-posti | docs/aloitusviestit/postivahti.md | ScheduleWakeup 4–5 min, 20 min kun kaikki roolit lepäävät eikä junaa ole (KIERROS.md) |
| Asemataulu | Sonnet 5.5, low | Matkakirja-asemataulu | docs/aloitusviestit/asemataulu.md | A "*/5": ilman Boostia vain sessioiden omien kirjoitusten vienti, Boostin aikana täysi tarkistus heti ja 5 min välein (sammuu 1 h; omistaja 20.10. klo 09.56); ei B-cronia; kulutus "7" (klo 08 ja 20); speksi docs/moduulit/asemataulu.md luku 8 |
| Julkaisija | Opus, medium (high vain CI-vian ajaksi) | Matkakirja-julkaisija | docs/raportit/viesti-julkaisija-aloitus.md + luovutus | vahdit `zsh S/julkaisija-tyokalut/valoseppa-vahti-kaynnista.zsh`, lukkovahti.zsh (olavinlinna-vahti ei, linna tauolla) |
| Natiiviseppä | Opus, high | Matkakirja-3d-selvittaja | docs/raportit/viesti-natiiviseppa-aloitus.md + luovutus | cron "4 9 * * *" `python3 S/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py` |
| Natiivi-UI | Opus, high | Matkakirja-natiivi-ui | docs/raportit/viesti-natiivi-ui-aloitus.md + luovutus | ei |
| Pelikoodari | Opus, high | Matkakirja-pelikoodari | docs/raportit/viesti-pelikoodari-aloitus.md + luovutus | ei |
| Linssiseppä | Opus, high | Matkakirja-linssiseppa | docs/raportit/viesti-linssiseppa-aloitus.md + luovutus | ei |
| Valoseppä | Opus, high | Matkakirja-linssiseppa-2 | docs/aloitusviestit/valoseppa.md | ei (Julkaisijan vahti) |
| Karttaseppä | Opus, high | Matkakirja-karttaseppa | docs/raportit/viesti-karttaseppa-aloitus.md + luovutus | ei |
| Lavastaja | Opus, medium | Matkakirja-linnanrakentaja | docs/aloitusviestit/linnanrakentaja.md | ei |
| Projektiseppä | Opus, high | Matkakirja-siirtoseppa | docs/raportit/viesti-siirtoseppa-aloitus.md + luovutus | ei |
| Työkaluseppä | Opus, high | Matkakirja-tyokaluseppa | docs/aloitusviestit/tyokaluseppa.md | ei |
| Sisältökirjuri | Sonnet 5.5, high | Matkakirja-sisaltokirjuri | docs/raportit/viesti-sisaltokirjuri-aloitus.md + luovutus | ei |
| Äänittäjä | Sonnet 5.5, high (lupatila auto) | Matkakirja-aanittaja | docs/aloitusviestit/aanittaja.md | ei |
| Laitetestaaja | Sonnet 5.5, high | Matkakirja-laitetestaaja | docs/raportit/viesti-laitetestaaja-aloitus.md + luovutus | ei |

Aktiivisuus: luo vain roolit, joilla on jonoa (F/tyojonot.md) tai keskeneräinen luovutus; tauolla olevat (esim. Olavinlinna) odottavat.
Vanhat docs/raportit/viesti-*-aloitus.md -tiedostot ovat roolien haaroissa usein uudempia kuin mainissa: lue roolin oma haara.

## 3. Uudet session id:t (kaikki samassa vuorossa)
S/osoitekirja.md (taulukko: rooli, id, kansio, malli, alue) on ainoa id-lähde. Päivitä sen jälkeen id:t, joita tiedostot toistavat:
S/Matkakirja-posti/KIERROS.md (PT ja KK otsikossa), NOLLAUS.md (PT), F/keskustelukanava/aloitus.md,
F/jonokierros-teksti.md (KK, Asemataulu), F/asemataulu/roolit.json ja data/talo/roolit.json sekä aloitusviestit. Skripti tekee kaiken:
`node tools/tyotavat/paivita-idt.mjs "Julkaisija=local_<uusi>" "PÄÄTOIMITTAJA=local_<uusi>" …` (kuiva-ajo; sitten sama `--kirjoita`).
Lopuksi `bash tools/tyotavat/peili.sh` ja commit PT:n työhaaraan (worktree `tools/uusi-worktree.sh fable <aihe>`, ks. VOIMASSA OLEVA ARVO).

## 4. Asemataulu (tilikohtainen kopio)
Tee docs/moduulit/asemataulu.md:n luku 9 (ainoa speksi): osoite osoitekirjaan ("Asemataulu (tämän tilin taulu): …") ja
F/asemataulu/osoitteet.md:hen (KÄYTÖSSÄ), `python3 -I tools/asemataulu/asemataulu.py`, julkaisu ja tyhjälle taululle batch komennon
tulosteen mukaan; osoite jonokierroksen kohtaan 7, F/keskustelukanava/aloitus.md:n kohtaan 2, Postivahdille ja omistajalle yhdellä
rivillä. ASEMATAULU-ROOLI.md:hen ei kirjoiteta osoitetta eikä id:itä (ne ovat TAULU/nykyinen.json:ssa). KK avaa taulun aina omaan keskustelunsa sivupaneeliin Artifact-työkalun open-toiminnolla (ei lukua eikä uudelleenjulkaisua) heti luonnin ja jokaisen nollauksensa jälkeen (omistaja 15.10.2026 klo 14.39); ulkoista Chrome-ikkunaa ei käytetä eikä ehdoteta (omistaja 15.10.2026 klo 12.27).
Vanhan tilin artefakteja (taulu, äänisivu) ei voi muokata uudelta tililtä. Asemataulun HTML:n luku ja julkaisu sekä muut raskaat lukemat (list_sessions include_archived, kokonaiset muistikansiot) tehdään Sonnet-ali-agentilla, joka palauttaa tiivistelmän; PT ei lue niitä omaan kontekstiinsa.

## 5. Silmukat ja vahdit
Työkalut ovat lykättyjä: lataa ne ENNEN käyttöä yhdellä ToolSearchilla
(`select:CronCreate,ScheduleWakeup,Monitor,Artifact,ArtifactData` ja ccd_session_mgmt-työkalut `+ccd_session_mgmt`). Jos jokin
puuttuu, se ei ole tällä tilillä/versiolla: JUMI-rivi omistajalle (kohta 0.0), ei korvata scheduled-tasks-MCP:llä (eri semantiikka:
pysyvä, tuore konteksti). Ennen roolien luontia testicron: CronCreate "*/2 * * * *" kehotteella "TESTICRON: vastaa –", odota yksi
laukaisu, poista (CronDelete) ja jatka.
Taulukon viimeinen sarake. Cronit ovat session-only (CronCreate): ne kuolevat session mukana ja vanhenevat 7 vrk:ssa – rooli uusii ne
aloitusviestissään. Tarkistus: PT `list_events` jokaiselle silmukkaroolille tunnin sisällä.

## 6. Sallinnat, Remote Control, hookit
- `set_remote_control <id> true` kaikille paitsi lepäävät.
- Sallinnat: projektin .claude/settings.json (gitissä) + PT:n .claude/settings.local.json. Gitissä oleva settings.local.json on vanha
  (vain aws/source/python3 -); Macin versiossa lisäksi Bash(osascript:*), Bash(screencapture:*), Bash(sleep:*),
  mcp__ccd_session_mgmt__set_session_effort sekä PostToolUse- ja UserPromptSubmit-hookit pt-taulu-muistutus.py:lle. Älä checkouttaa
  gitin versiota Macin päälle. Macin versio on peilissä tools/tyotavat/settings.local.json.malli (peili.sh pitää ajan tasalla);
  palautus: `bash tools/tyotavat/palauta-sallinnat.sh` (vanha talteen .ennen-<pvm>, sitten PT:n session uudelleenkäynnistys).
  Gitin seurattua .claude/settings.local.json:ia ei committata.
- Hookit: `bash tools/hooks/asenna-viestiraja-hook.sh --tarkista`; pt-taulu-muistutus.py: totuus S/hooks/ (peili tools/hooks/).

## 7. Macin tarkistukset (eivät riipu tilistä)
- `launchctl list | grep -i -E 'matkakirja|runner'`: fi.matkakirja.juna, juna-vahti, naytto-auki, siivous, app.matkakirja.natiivi-bundle,
  kaksi actions.runner-agenttia (plistit ~/Library/LaunchAgents).
- `pgrep -fl vahti.zsh`: Julkaisijan vahdit (käynnistys yllä).
- `bash tools/tyotavat/peili.sh --tarkista`: Mac-ohjeet ja peili samat.
- `bash tools/tarkista-tyotilat.sh`.

## 8. Lopuksi
`node tools/tyotavat/tilinvaihto-valmis.mjs` (paluu 0 = valmis): osoitekirjan id:t elossa sovelluksen sessiotiedostoista (tili,
ei arkistoitu, malli ja effort kuten osoitekirjassa, lupatila ja RC tiedoksi), peili ajan tasalla, aloitusviestit olemassa, vanhoja
id:itä ei jäljellä. OHJEIDEN KOE (Raamattu 7.47 ja 12.23 kohta 18): PT ajaa
kokeen tuoreella Sonnet-ali-agentilla, joka lukee vain CLAUDE.md:n ja PT:n 7.47-rivin ja vastaa PT:n kysymyslistaan
(scratchpad/paatoimittaja/ohjeiden-koe/); väärä vastaus = lähde korjataan ja koe uusitaan. Tilinvaihto ei ole valmis ennen kuin
koe on läpi JA tilinvaihto-valmis.mjs palauttaa 0. Sitten rivi Keskustelukanavalle: "Tilinvaihto valmis: N roolia, taulu <osoite>". Kirjaa tilinvaihto lokiin (`node tools/raamattu-kirjaa.mjs`).
VIIMEINEN VAIHE (omistaja 15.10.2026 klo 14.39): PT luovuttaa ja nollautuu heti, kun sessiot ja Asemataulu ovat valmiit (luovutus + tallenna-keskustelu.py + LUOVUTUS VALMIS Postivahdille); 15.10. tilinvaihto nosti PT:n kontekstin 8 %:sta 50 %:iin puolessa tunnissa.

## VOIMASSA OLEVA ARVO (ristiriitojen ratkaisu 14.10.2026; uusin päätös voittaa)

| Asia | Voimassa | Kumotut / huom |
|---|---|---|
| Postivahdin kierros | ScheduleWakeup 4–5 min (20 min, kun kaikki roolit lepäävät eikä junaa ole käynnissä; omistaja 14.10. klo 22.34), kehote "Lue S/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan"; KIERROS.md on sitova sisältö | 10 min (9.10.), Raamatun vanha sanatarkka kehote (loki TIIVISTYS 14.10.) |
| Mittareiden vienti Asemataululle | Asemataulu-sessio: Boostin aikana täysi tarkistus (mittarit, roolit, laitteet, junat TF-lokeja vasten, työlista, tehtävät) heti ja 5 min välein (talo/boost, sammuu 1 h; omistaja 20.10. klo 09.56); ilman Boostia vain sessioiden omien kirjoitusten vienti; Raati ja Testaajat klo 08 ja TF:n saapuessa (omistaja 14.10. klo 22.34 ja 22.40); Postivahti vie junan edistyksen ja lukee talo/boostin | Postivahti 5 min syke-ehdolla (11.10.); "5 min aina" (13.10.); Raati ja Testaajat Postivahdin kierroksella |
| Asemataulun osoite | osoitekirjan rivi "Asemataulu (tämän tilin taulu): …" (sama TAULU/nykyinen.json:ssa ja osoitteet.md:n KÄYTÖSSÄ-rivillä; docs/moduulit/asemataulu.md luku 9); muut tilit F/asemataulu/osoitteet.md | EekZDPMuAcsjT3awvn4jPb on VVI-tilin taulu (13.10.), Rq5ajPU4SraE2XKd7BYAix päätilin (10.10.) |
| Kontekstirajat | liukumat pehmeä–kova (omistaja 14.10. klo 22.55 ja 22.57): Postivahti 20–30 %; koodi-, kartta- ja sisältöroolit, Julkaisija ja Asemataulu 25–35 %; PT (oma nollaus), Laitetestaaja ja Äänittäjä 30–40 %; KK 40–50 % kortilla "Nollaanko nyt?" (vain KK:n nollaus kysytään omistajalta). Pehmeän rajan yli nollaus ensimmäisellä luontevalla tauolla, uusi iso tehtävä → nollaus ensin; luovutus → Postivahti nollaa ilman omistajan vahvistusta. VALVONTA (omistaja 15.10. klo 14.39): KONTEKSTIVAHTI-koukku muistuttaa 30/35/40 % (muistutus on käsky), Postivahti lukee PT:n ja KK:n kontekstin joka kierroksella, PT ≥ 40 % = pakkonollaus; PT lukee get_usage selfin jokaisen pyynnön alussa (Raamattu VALVONTA JA PAKKONOLLAUS) | roolit 50 % (10.10.), 35 % (14.10. 22.4x); PT 65 %; KK 55/65 %; Postivahti ei nollaa KK:ta |
| Viikkokiintiö | päätili: siirtoprompti 50 %:ssa; koodaustilit: vain rivi 99 %:ssa (Postivahti hälyttää 96 % ja 99 %); ei keventämistä | "ei siirtopromptia" koskee vain koodaustilejä |
| Komentorivin tili | sama kuin sovelluksen tili; uudelleenkirjautuminen jokaisessa tilinvaihdossa | "toinen tili kuin sovellus" (7.10.) |
| TF-juna | lähtee vain omistajan pyynnöstä ("OMISTAJA PYYSI JULKAISUA", PT:n välittämä riittää), kaikki kuitattu samaan junaan, TF enintään 2/pv | "heti kun valmista" (6.10.); launchd fi.matkakirja.juna (2 h välein 08–22) ja juna-vahti (10 min) ovat simulaattorikäännöksiä, eivät TF-junia |
| Session id:t | vain S/osoitekirja.md | Raamatun ja vanhojen ohjeiden kovakoodatut id:t |
| PT:n malli | Opus, medium | "Opus max" (28.9.) |
| Roolien määrä | osoitekirjan taulukko (14.10.: PT + KK + 14 roolia) | CLAUDE.md "kuusi roolisessiota", roolitus.md "kolme sessiota" |
| Asemataulun malli ja effort | Sonnet 5.5, low (osoitekirja 14.10. ja sessiotiedosto; Raamattu korjattu 14.10.) | "Sonnet 5.5, high" (13.10. luonti), "low (auto)" |
| Julkaisijan effort | Opus, medium, high vain CI-vian ajaksi (omistaja 14.10. klo 22.4x, kortti "Säästöt 2") | Opus, high (29.9.) |
| PT:n jonokierros | ei cronia; PT herää Postivahdin herätteestä (rooli levossa/hiljaa > 20 min, Codex-posti, äänisivuvalinta, levy < 80 Gi, kontekstiraja, TF-vaihe, ODOTTAA; omistaja 14.10. klo 22.34) | cron JONOKIERROS "7,27,47 * * * *" |
| Roolin aloitus | lukulista aloitusviestissä (LUE ALUSSA ≤ 5, ÄLÄ LUE), roolitaulukko docs/vastuukartta.md, luovutus ≤ 60 riviä, tavoite ≤ 8 % kontekstista (omistaja 14.10. klo 22.4x) | koko aloitusviesti + Raamattu kohdennetusti |
| Session nimi | "Rooli (malli, effort)" kaikille, PT ja KK isoin kirjaimin (omistaja 29.9. ja 6.10.; Raamattu SESSION NIMI) | EFFORT NIMESSÄ (26.9.: effort nimessä vain yli highin) |
| Valikkokieli | suomi 14.10. alkaen: Tiedosto › Uusi istunto / Avaa kansio… (myös osascriptissä; Raamattu korjattu 14.10.) | File > New Session / Open Folder… |
| Uusien sessioiden lupatila | ohitustila (bypassPermissions) kaikille, Äänittäjä auto (omistajan lupa 11.10., tila 13.10.); sessiotiedostot 14.10. | osoitekirjan "Asemataulu auto-tila" (sessio on ohitustilassa) |
| Uusin luovutus | roolin haaran docs/raportit/viesti-<rooli>-luovutus-*.md commit-ajan mukaan (komento kohdassa 1.1) + muistin tilaraportti (MEMORY.md "Rooli-tilaraportit") | tiedostonimen aakkosjärjestys |
| PT:n haara | checkout S/Matkakirja-fable haarassa claude/bold-ride-vow4ki (sovelluksen nimi); PT:n muutokset worktreissa S/wt/fable-<aihe> omina PR:inä; nimenvaihto vasta, kun sovellus luo PT:n uudelle tilille uuden haaran | – |
| KK:n aloitusviesti | elävä F/keskustelukanava/aloitus.md (Tila-osio, peili tools/tyotavat/keskustelukanava-aloitus.md); pysyvä osa docs/aloitusviestit/keskustelukanava.md | – |
| KK:n nollaus | vain omistajan kortin Kyllä-vastauksella; heti sen jälkeen set_remote_control self true ja Artifact open Asemataulu (omistaja 14.10. klo 20.48) | Postivahdin nollaus |
