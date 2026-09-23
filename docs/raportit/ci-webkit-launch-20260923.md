# CI: WebKit-launch-aikakatkaisu, jatko 23.9.2026

Jatkoa 22.9.2026-raporttiin (`ci-webkit-launch-20260922.md`). Koko Macin
reboot (klo 12.43) EI korjannut vikaa — ensimmäinen PR-savuke rebootin
jälkeen (ajo 35842697649, käynnistyi 09.56 UTC) kaatoi 17/65 savuketta
täsmälleen samalla jäljellä ("kaatui poikkeukseen koodilla 1 ennen yhtään
OK/FAIL-riviä").

## Poissuljettu tänään: versioero paikallisen ja CI:n välillä

Codexin/Fablen kysymys oli, selittääkö Playwright- tai WebKit-
versioero sen, että paikallinen toisto ei koskaan toistanut vikaa mutta
CI kaatuu jatkuvasti. Ei selitä:

- **package-lock.json ei ole muuttunut** `playwright`/`playwright-core`-
  riveiltä sitten 22.9. klo 17 UTC (`git log --since='2026-09-22 17:00'
  -- package-lock.json` = tyhjä). Molemmat ovat pinnattu `1.62.1`:een
  koko ajan, myös silloin kun vika ilmestyi (22.9. klo 19.44).
- **`~/Library/Caches/ms-playwright/`-hakemistossa on VAIN YKSI
  webkit-versio** (`webkit-2336`, aikaleima 21.9. klo 15.25) — ei
  useampaa rinnakkaista revisiota joiden välillä CI ja paikallinen ajo
  voisivat erota. Sama binääri palvelee sekä ajuria että interaktiivista
  istuntoa.
- Oma paikallinen kontrollikoe (tavallisessa Aqua-istunnossa,
  `SECURITYSESSIONID=192f7`, sama `playwright@1.62.1`, sama
  `webkit-2336`): `browserType.launch({headless:true})` onnistui
  160 ms:ssa, ei toistoa.

Versioero on siis poissuljettu selityksenä. Juurisyy on edelleen
ympäristöero itse ajossa (WindowServer/GUI-sessio, kuten 22.9.
raportissa arveltiin) — EI koodi- tai riippuvuustaso.

## Kesken jäänyt: LaunchAgent SessionCreate-diagnoosikoe

Yritin ennen rebootia toistaa CI:n olosuhteet tarkemmin (`launchctl
bootstrap gui/502` omalla väliaikaisella LaunchAgentilla,
`SessionCreate=true` samoin kuin ajurin omassa plistissä) saadakseni
WebKitin oman virherivin (`log show`-poiminnalla). Auto mode
-classifier esti `launchctl bootstrap`-kutsun ("Unauthorized
Persistence") ennen kuin mitään ehdittiin rekisteröidä — ei jäänteitä.
Fable käski keskeyttää kokeen rebootin takia. **Ei vielä toistettu
rebootin jälkeen** — jos SessionCreate-hypoteesi halutaan varmistaa,
tarvitaan joko omistajan suora lupa `launchctl`-persistenssille tässä
sessiossa tai joku toinen, vähemmän rajoitettu session tekemään kokeen.

## Tänään tehty: selainkopion uudelleenlataus

`rm -rf ~/Library/Caches/ms-playwright/webkit-2336`, tehty heti kun
käynnissä ollut ainoa savuke-ajo (35846262871) valmistui — Julkaisijalle
ilmoitettu ennen ja jälkeen, jono ei ollut koskaan täysin tyhjä (muut
sessiot pushasivat koko ajan), joten korvasin "koko jono tyhjä"
-vaatimuksen "ei yhtään ajossa juuri nyt" -hetkellä.

**Oma virhe matkalla, korjattu ennen kuin mikään CI-ajo ehti kärsiä
siitä:** ensimmäinen `npx playwright install webkit` (ajettuna suoraan
`/Users/Shared/Claude/Matkakirja-laitetestaaja`-juuresta ilman
`npm install`-vaihetta ensin) haki VÄÄRÄN, uudemman version —
`npx` resolvasi paikallisen `node_modules`in puuttuessa uusimman
julkaistun `playwright`-paketin (1.63.0) eikä lockfilen pinnaamaa
1.62.1:tä, ja latasi `webkit-2359`:n (WebKit 26.6) `webkit-2336`:n
(WebKit 26.5) sijaan — täsmälleen se versioero-skenaario jota tässä
piti sulkea pois. Korjasin heti: asensin `playwright@1.62.1`:n
erilliseen scratch-hakemistoon täsmällisesti, ajoin SEN
`playwright install webkit` (haki oikein `webkit-2336`:n), ja poistin
väärän `webkit-2359`-kansion. Lopputila vahvistettu:
`~/Library/Caches/ms-playwright/` sisältää nyt vain `webkit-2336` (+
chromium/ffmpeg, ei muutettu). **Opetus:** älä koskaan aja paljasta
`npx playwright install` ilman että `node_modules` on ajantasalla
lockfilen kanssa — `npx` hakee silloin hiljaa väärän version eikä
varoita selvästi tarpeeksi (varoitus tulostuu mutta jatkaa silti).

**Kontrollikoe uudella 2336:lla** (tavallisessa Aqua-istunnossa, sama
`playwright@1.62.1`): `browserType.launch` onnistui 4,4 s:ssa (edellinen
koe ennen poistoa: 160 ms — ero selittyy uuden asennuksen
ensikäynnistyksen kylmällä tilalla, ei huolestuttava; molemmat
kymmeniä kertoja alle 180 s:n CI-aikakatkaisun).

**CI-tulos:** Selvä parannus, ei täydellinen korjaus. Ensimmäinen
PR-savuke uudella webkit-2336:lla (ajo 35845766860, siirtoseppa-webp-404
oli edellä sitä jonossa mutta tämä oli ensimmäinen joka todella käynnistyi
uuden asennuksen jälkeen; käynnistyi 10.25 UTC): **2/66 savuketta kaatui
launch-timeout-jäljellä** (`savuke-glnimiot-nimet`, `savuke-glnimiot-
nostot`) verrattuna edeltävän ajon 17/65:een — 88 % vähemmän. Molemmat
kaatuneet ovat SAMAT kaksi jotka kaatuivat myös ennen vaihtoa. Loput
22/24 punaisesta tässä ajossa ovat tavallisia sisältö-/aikatestivikoja,
ei launch-kaatumisia (varmistettu: vain nämä kaksi merkitty
"[KAATUMINEN]").

**Tulkinta:** selainkopio OLI osittain syyllinen — korruptoitunut tai
huonossa tilassa oleva `webkit-2336`-asennus selittää suurimman osan
(88 %) kaatumisista. Jäljellä oleva 2/66 viittaa siihen, että 22.9.
raportin WindowServer/GUI-sessio-hypoteesi selittää lopun: nämä kaksi
savuketta (`glnimiot-nimet`, `glnimiot-nostot`) voivat olla erityisen
herkkiä ajoituksille/resursseille (molemmat lataavat paljon
glTF-nimiöitä). Ei vielä täysin vahvistettu — seuraava askel jos
kaatumiset toistuvat: ajaa juuri nämä kaksi savuketta erikseen useita
kertoja peräkkäin nähdäkseen onko kyse flakystä satunnaisuudesta vai
systemaattisesta erosta muihin WebKit-savukkeisiin nähden.

## Uusi oppi: reboot jättää GitHubille "kadonneen" jobin

Kun koko Mac käynnistetään uudelleen kesken CI-ajon, ajurin
`Runner.Listener`-prosessi kuolee kesken jobin, mutta GitHub Actionsin
palvelinpuoli EI tiedä tätä — se pitää ajurin ("SamiMacStudio2",
label `savukkeet`) varattuna vanhalle, kuolleelle jobille, kunnes joku
vapauttaa sen erikseen. Tänään tämä esti kaikkia uusia PR-savukkeita
~20 minuutin ajan rebootin jälkeen, vaikka ajuri oli jo palannut
"Listening for Jobs" -tilaan.

**Korjaus:** `gh run cancel <run-id>` EI riitä yksin (jää `in_progress`-
tilaan loputtomiin, koska kuollut ajuri ei voi kuitata sitä) —
tarvitaan `gh api -X POST repos/ravelius/Matkakirja/actions/runs/
<run-id>/force-cancel`. Sekin lähettää ajurille peruutuspyynnön
5 minuutin aikakatkaisulla (`_diag`-lokissa: "Job cancellation request
… received, cancellation timeout 5 minutes"); vasta katkaisun jälkeen
ajuri vapautuu ja jono etenee.

**Sääntöehdotus jatkoa varten:** aina koneen rebootin jälkeen, ennen
kuin oletetaan jonon toimivan normaalisti: tarkista `gh api
repos/ravelius/Matkakirja/actions/runners -q '.runners[]|{name,busy}'`
— jos `savukkeet`-ajuri on `busy:true` eikä yksikään oma ajo ole
oikeasti käynnissä, käytä `force-cancel`-API:a sille vanhalle ajolle
joka oli kesken rebootin hetkellä (löytyy: vanhin `in_progress`-ajo
joka on kestänyt selvästi yli normaalin).

## Pysyvä sääntö: äänetön kierros (omistaja, välitetty Fablen kautta 23.9.2026)

Ennen jokaista simulaattori- tai selainkierrosta: ohjaa laitteen
ulostulo hiljaiseen laitteeseen tai mykistä
(`osascript -e 'set volume output muted true'` tai
`SwitchAudioSource`), palauta kierroksen jälkeen. Kaiuttimista
kuuluva ääni häiritsee omistajaa. Äänen TOIMIVUUS mitataan aina
`currentTime`-arvolla (ks. muistio `aanimittaus-currenttime`), EI
kuuntelemalla kaiuttimesta — mykistys ei siis heikennä äänitestien
kattavuutta.

## Viitteet

- Reboot: 23.9.2026 klo 12.43 paikallista.
- Ensimmäinen post-reboot-ajo: 35842697649 (17/65 kaatui, sama jälki).
- Jumiutunut/kuollut job: 35842568697 (käynnistyi 12.37, tappoi reboot,
  vapautettu `force-cancel`illa klo 09.56 UTC / 12.56 paikallista).
- Kontrollikoe: paikallinen `webkit.launch` 160 ms, `webkit-diag/`
  (scratchpad, ei committoitu).
